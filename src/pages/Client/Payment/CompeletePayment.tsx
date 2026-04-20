import React, { useState } from 'react';
import { X, CreditCard, DollarSign, AlertCircle } from 'lucide-react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useCreatePaymentIntentMutation } from '@/redux/features/clients/paymentsApi';
import { DropOffAppointment } from '@/redux/features/clients/dropOffApi';
import { PackageResponse } from '@/redux/features/clients/packageApi';
import { toast } from 'react-toastify';

const stripeKey = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY;
const stripePromise = stripeKey ? loadStripe(stripeKey) : null;

type PendingItem =
  | { kind: 'package'; data: PackageResponse }
  | { kind: 'dropoff'; data: DropOffAppointment };

interface Props {
  item: PendingItem;
  closeModal: () => void;
}

// ─────────────────────────────────────────────────────────────────────────────

const StripeCardForm: React.FC<Props> = ({ item, closeModal }) => {
  const stripe   = useStripe();
  const elements = useElements();

  const [createPaymentIntent, { isLoading: isCreatingIntent }] = useCreatePaymentIntentMutation();

  const [paymentMethod,  setPaymentMethod]  = useState<'card' | 'paypal'>('card');
  const [cardholderName, setCardholderName] = useState('');
  const [isPaying,       setIsPaying]       = useState(false);
  const [errorMsg,       setErrorMsg]       = useState('');
  const [successMsg,     setSuccessMsg]     = useState('');

  const isPackage = item.kind === 'package';
  const pkg       = isPackage ? (item.data as PackageResponse)    : null;
  const dropoff   = !isPackage ? (item.data as DropOffAppointment) : null;

  const label       = isPackage ? pkg!.packageCode  : dropoff!.appointmentCode;
  const description = isPackage ? pkg!.description  : dropoff!.description;
  const amount      = isPackage ? pkg!.shippingCost : '—';

  const handlePay = async () => {
    setErrorMsg('');
    setSuccessMsg('');

    if (!stripe)   { setErrorMsg('Stripe not loaded. Check VITE_STRIPE_PUBLISHABLE_KEY in .env'); return; }
    if (!elements) { setErrorMsg('Stripe Elements not ready'); return; }

    setIsPaying(true);

    try {
      // ── Step 1: create payment intent ──────────────────────────────────────
      // Send exactly one of packageId or dropoffAppointmentId (not both)
      // Backend expects: { packageId?, dropoffAppointmentId?, dueDate? }
      const intentPayload = isPackage
        ? {
            packageId:             pkg!.id,
            dropoffAppointmentId:  undefined,   
            dueDate:               new Date().toISOString(),
          }
        : {
            packageId:             undefined,   
            dropoffAppointmentId:  dropoff!.id,
            dueDate:               dropoff!.appointmentDate,
          };

      const intentRes = await createPaymentIntent(intentPayload as any).unwrap();

      // ✅ FIX: clientSecret is inside intentRes.stripe.clientSecret
      // NOT intentRes.clientSecret (that was the bug)
      const clientSecret = intentRes?.stripe?.clientSecret;

      if (!clientSecret) {
        throw new Error(
          `clientSecret missing. Backend returned: ${JSON.stringify(intentRes)}`
        );
      }


      const cardElement = elements.getElement(CardElement);
      if (!cardElement) throw new Error('CardElement not mounted');

      const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement,
          billing_details: { name: cardholderName || 'Customer' },
        },
      });

      if (error) {
        setErrorMsg(error.message ?? 'Payment failed. Please try again.');
      } else if (paymentIntent?.status === 'succeeded') {
        setSuccessMsg('Payment successful! Your invoice will be sent to your email.');
        toast.success("Payment successful!")
        setTimeout(() => closeModal(), 2500);
      } else {
        setErrorMsg(`Unexpected payment status: ${paymentIntent?.status}`);
      }

    } catch (err: any) {
      console.error('[Payment] Error:', err);
      const msg =
        err?.data?.message ||
        err?.data?.error   ||
        err?.error         ||
        err?.message       ||
        'Something went wrong. Please retry.';
      setErrorMsg(msg);
    } finally {
      setIsPaying(false);
    }
  };

  const isLoading = isCreatingIntent || isPaying;

  return (
    <div
      className="bg-white rounded-2xl shadow-xl w-full max-w-lg max-h-[90vh] flex flex-col"
      onClick={(e) => e.stopPropagation()}
    >
      {/* Header */}
      <div className="p-4 sm:p-6 border-b border-gray-200 flex-shrink-0">
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center flex-shrink-0">
              <DollarSign className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-semibold text-[#101828]">Complete Payment</h2>
              <p className="text-sm text-[#4A5565]">Secure payment for your shipment</p>
            </div>
          </div>
          <button onClick={closeModal} className="p-1 hover:bg-gray-100 rounded-lg transition-colors">
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>
      </div>

      {/* Scrollable Content */}
      <div className="overflow-y-auto flex-1 p-4 sm:p-6 space-y-5">

        {/* Item Info */}
        <div className="p-4 bg-[#EFF6FF] rounded-xl border border-[#BEDBFF]">
          <div className="space-y-3">
            <InfoRow label={isPackage ? 'Package Code' : 'Appointment Code'} value={label} />
            <InfoRow label="Description" value={description} />
            {isPackage  && <InfoRow label="Destination" value={pkg!.destination} />}
            {!isPackage && (
              <InfoRow
                label="Date"
                value={new Date(dropoff!.appointmentDate).toLocaleDateString('en-GB')}
              />
            )}
            <div className="flex justify-between items-center pt-3 border-t border-gray-200">
              <span className="text-sm text-[#101828]">Total Amount</span>
              <span className="text-lg font-semibold text-gray-900">€{amount}</span>
            </div>
          </div>
        </div>

        {/* Payment Method */}
        <div>
          <h3 className="text-sm font-semibold text-[#101828] mb-3">Choose Payment Method</h3>
          <div className="grid grid-cols-2 gap-4">
            <MethodCard
              active={paymentMethod === 'card'}
              onClick={() => setPaymentMethod('card')}
              icon={<CreditCard className={`w-5 h-5 ${paymentMethod === 'card' ? 'text-blue-600' : 'text-gray-600'}`} />}
              title="Credit/Debit Card"
              sub="Pay securely with Stripe"
            />
            <MethodCard
              active={paymentMethod === 'paypal'}
              onClick={() => setPaymentMethod('paypal')}
              icon={<DollarSign className={`w-5 h-5 ${paymentMethod === 'paypal' ? 'text-blue-600' : 'text-gray-600'}`} />}
              title="PayPal"
              sub="Fast and secure"
            />
          </div>
        </div>

        {/* Card Form */}
        {paymentMethod === 'card' && (
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-[#101828]">Card Information</h3>
            <div>
              <label className="block text-sm text-[#1C60DF] mb-2">Cardholder Name</label>
              <input
                type="text"
                value={cardholderName}
                onChange={(e) => setCardholderName(e.target.value)}
                placeholder="Name on card"
                className="w-full px-4 py-3 bg-blue-50 border border-blue-200 rounded-xl outline-none
                  focus:ring-2 focus:ring-blue-500 text-sm text-[#101828] placeholder:text-gray-400"
              />
            </div>
            <div>
              <label className="block text-sm text-[#1C60DF] mb-2">Card Details</label>
              <div className="w-full px-4 py-3 bg-blue-50 border border-blue-200 rounded-xl focus-within:ring-2 focus-within:ring-blue-500">
                <CardElement
                  options={{
                    style: {
                      base: {
                        fontSize: '14px',
                        color: '#101828',
                        fontFamily: 'Roboto, sans-serif',
                        '::placeholder': { color: '#80868B' },
                      },
                      invalid: { color: '#EF4444' },
                    },
                  }}
                />
              </div>
              <p className="text-xs text-gray-400 mt-1">
                Test: 4242 4242 4242 4242 — any future date — any CVC
              </p>
            </div>
          </div>
        )}

        {paymentMethod === 'paypal' && (
          <div className="p-4 bg-blue-50 border border-blue-200 rounded-xl text-center text-sm text-gray-600">
            You will be redirected to PayPal to complete your payment securely.
          </div>
        )}

        {/* Error / Success */}
        {errorMsg && (
          <div className="flex items-start gap-2 p-3 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
            {errorMsg}
          </div>
        )}
        {successMsg && (
          <div className="p-3 bg-green-50 border border-green-200 rounded-xl text-green-700 text-sm">
            ✓ {successMsg}
          </div>
        )}

      </div>

      {/* Footer */}
      <div className="p-4 sm:p-6 border-t border-gray-200 flex-shrink-0">
        <div className="flex gap-3">
          <button
            onClick={closeModal}
            disabled={isLoading}
            className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-xl font-medium
              hover:bg-gray-50 transition disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            onClick={handlePay}
            disabled={isLoading || !stripe || paymentMethod === 'paypal'}
            className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-xl font-medium
              hover:bg-blue-700 transition shadow-lg shadow-blue-500/20
              disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Processing…' : `Pay €${amount}`}
          </button>
        </div>
      </div>
    </div>
  );
};

// ─── Helper components ─────────────────────────────────────────────────────────

const InfoRow = ({ label, value }: { label: string; value?: string | null }) => (
  <div className="flex justify-between items-center">
    <span className="text-sm text-[#4A5565]">{label}</span>
    <span className="text-sm font-medium text-[#101828] text-right max-w-[60%]">{value || '—'}</span>
  </div>
);

const MethodCard = ({
  active, onClick, icon, title, sub,
}: {
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  title: string;
  sub: string;
}) => (
  <button
    onClick={onClick}
    className={`p-4 rounded-xl border-2 transition-all flex flex-col items-center gap-3 ${
      active
        ? 'border-blue-500 bg-blue-50'
        : 'border-gray-200 bg-white hover:border-gray-300'
    }`}
  >
    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${active ? 'bg-blue-100' : 'bg-gray-100'}`}>
      {icon}
    </div>
    <div className="text-center">
      <p className="text-sm text-[#101828]">{title}</p>
      <p className="text-xs text-gray-500 mt-0.5">{sub}</p>
    </div>
  </button>
);

// ─── Wrapper with Stripe Elements ─────────────────────────────────────────────

const CompeletePayment: React.FC<Props> = ({ item, closeModal }) => {
  if (!stripePromise) {
    return (
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg p-8 text-center">
        <AlertCircle className="w-10 h-10 text-red-500 mx-auto mb-3" />
        <h3 className="text-lg font-semibold text-red-600 mb-2">Stripe Not Configured</h3>
        <p className="text-sm text-gray-500 mb-4">
          Add <code className="bg-gray-100 px-1 rounded">VITE_STRIPE_PUBLISHABLE_KEY</code> to your{' '}
          <code className="bg-gray-100 px-1 rounded">.env</code> file and restart.
        </p>
        <button onClick={closeModal} className="px-6 py-2 bg-gray-100 rounded-lg text-sm text-gray-700 hover:bg-gray-200 transition">
          Close
        </button>
      </div>
    );
  }

  return (
    <Elements stripe={stripePromise}>
      <StripeCardForm item={item} closeModal={closeModal} />
    </Elements>
  );
};

export default CompeletePayment;







// import React, { useState } from 'react';
// import { X, CreditCard, DollarSign } from 'lucide-react';

// interface Props {
//   closeModal: () => void;
// }

// const CompeletePayment: React.FC<Props> = ({ closeModal }) => {
//   const [isOpen, setIsOpen] = useState(true);
//   const [paymentMethod, setPaymentMethod] = useState<'card' | 'paypal'>('card');
//   const [cardNumber, setCardNumber] = useState('');
//   const [expireDate, setExpireDate] = useState('');
//   const [cvv, setCvv] = useState('');

//   if (!isOpen) return null;

//   return (
//     <div
//       className="fixed inset-0 bg-black/30 flex items-center justify-center z-50 p-4"
//       onClick={() => setIsOpen(false)}
//     >
//       {/* Modal with proper height handling */}
//       <div
//         className="bg-white rounded-2xl shadow-xl w-full max-w-lg max-h-[90vh] flex flex-col"
//         onClick={(e) => e.stopPropagation()}
//       >
//         {/* Header Section - Fixed */}
//         <div className="p-4 sm:p-6 border-b border-gray-200 flex-shrink-0">
//           <div className="flex items-start justify-between">
//             <div className="flex items-start gap-3 sm:gap-4">
//               <div className="w-10 h-10 sm:w-12 sm:h-12 bg-green-100 rounded-xl flex items-center justify-center flex-shrink-0">
//                 <DollarSign className="w-5 h-5 sm:w-6 sm:h-6 text-green-600" />
//               </div>
//               <div>
//                 <h2 className="text-base sm:text-lg md:text-xl font-normal font-roboto leading-[150%] text-[#101828] mb-1">
//                   Complete Payment
//                 </h2>
//                 <p className="text-sm sm:text-base leading-[150%] font-normal font-roboto text-[#4A5565]">
//                   Secure payment for your shipment
//                 </p>
//               </div>
//             </div>
//             <button
//               onClick={closeModal}
//               className="p-1 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer flex-shrink-0"
//             >
//               <X className="w-5 h-5 text-gray-500" />
//             </button>
//           </div>
//         </div>

//         {/* Scrollable Content Area */}
//         <div className="overflow-y-auto flex-1 p-4 sm:p-6">
//           {/* Package Information */}
//           <div className="p-4 bg-[#EFF6FF] rounded-[10px] border border-[#BEDBFF] mb-6">
//             <div className="space-y-3">
//               <div className="flex justify-between items-center">
//                 <span className="text-sm font-normal font-roboto leading-[150%] text-[#4A5565]">
//                   Package:
//                 </span>
//                 <span className="text-sm sm:text-base font-roboto font-normal leading-[150%] text-[#101828]">
//                   AMZ-FR-1234567890
//                 </span>
//               </div>
//               <div className="flex justify-between items-center">
//                 <span className="text-sm font-normal font-roboto leading-[150%] text-[#4A5565]">
//                   Weight:
//                 </span>
//                 <span className="text-sm sm:text-base font-roboto font-normal leading-[150%] text-[#101828]">
//                   1.5 kg
//                 </span>
//               </div>
//               <div className="flex justify-between items-center pt-3 border-t border-gray-200">
//                 <span className="text-sm sm:text-base font-roboto font-normal leading-[150%] text-[#101828]">
//                   Total Amount:
//                 </span>
//                 <span className="text-base sm:text-lg md:text-xl font-normal font-roboto leading-[150%] text-gray-900">
//                   €45.50
//                 </span>
//               </div>
//             </div>
//           </div>

//           {/* Payment Method Selection */}
//           <div>
//             <h3 className="text-base sm:text-lg md:text-xl font-normal font-roboto leading-[150%] text-[#101828] mb-4">
//               Choose Payment Method
//             </h3>
            
//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
//               {/* Credit/Debit Card */}
//               <button
//                 onClick={() => setPaymentMethod('card')}
//                 className={`p-4 sm:p-5 rounded-xl border-2 transition-all ${
//                   paymentMethod === 'card'
//                     ? 'border-blue-500 bg-blue-50'
//                     : 'border-gray-200 bg-white hover:border-gray-300'
//                 }`}
//               >
//                 <div className="flex flex-col items-center gap-3">
//                   <div
//                     className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center ${
//                       paymentMethod === 'card' ? 'bg-blue-100' : 'bg-gray-100'
//                     }`}
//                   >
//                     <CreditCard
//                       className={`w-5 h-5 sm:w-6 sm:h-6 ${
//                         paymentMethod === 'card' ? 'text-blue-600' : 'text-gray-600'
//                       }`}
//                     />
//                   </div>
//                   <div className="text-center">
//                     <p className="text-sm sm:text-base font-normal font-roboto leading-[150%] text-[#101828]">
//                       Credit/Debit Card
//                     </p>
//                     <p className="text-xs sm:text-sm leading-[150%] font-normal font-roboto text-gray-600 mt-1">
//                       Pay securely with Stripe
//                     </p>
//                   </div>
//                 </div>
//               </button>

//               {/* PayPal */}
//               <button
//                 onClick={() => setPaymentMethod('paypal')}
//                 className={`p-4 sm:p-5 rounded-xl border-2 transition-all ${
//                   paymentMethod === 'paypal'
//                     ? 'border-blue-500 bg-blue-50'
//                     : 'border-gray-200 bg-white hover:border-gray-300'
//                 }`}
//               >
//                 <div className="flex flex-col items-center gap-3">
//                   <div
//                     className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center ${
//                       paymentMethod === 'paypal' ? 'bg-blue-100' : 'bg-gray-100'
//                     }`}
//                   >
//                     <DollarSign
//                       className={`w-5 h-5 sm:w-6 sm:h-6 ${
//                         paymentMethod === 'paypal' ? 'text-blue-600' : 'text-gray-600'
//                       }`}
//                     />
//                   </div>
//                   <div className="text-center">
//                     <p className="text-sm sm:text-base font-normal font-roboto leading-[150%] text-[#101828]">
//                       PayPal
//                     </p>
//                     <p className="text-xs sm:text-sm font-normal font-roboto text-[#4A5565] leading-[150%] mt-1">
//                       Fast and secure PayPal checkout
//                     </p>
//                   </div>
//                 </div>
//               </button>
//             </div>

//             {/* Card Information Form */}
//             {paymentMethod === 'card' && (
//               <div className="space-y-4">
//                 <h3 className="text-base sm:text-lg md:text-xl font-normal font-roboto leading-[150%] text-[#101828]">
//                   Card Information
//                 </h3>
                
//                 {/* Card Number */}
//                 <div>
//                   <label className="block text-sm font-normal font-roboto leading-[150%] text-[#1C60DF] mb-2">
//                     Card Number
//                   </label>
//                   <input
//                     type="text"
//                     value={cardNumber}
//                     onChange={(e) => setCardNumber(e.target.value)}
//                     placeholder="e.g., 1Z999AA10123456784"
//                     className="w-full px-4 py-3 bg-blue-50 border border-blue-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 text-xs transition-all text-[#80868B] placeholder:text-[#80868B]"
//                   />
//                 </div>

//                 {/* Expire Date and CVV */}
//                 <div className="grid grid-cols-2 gap-4">
//                   <div>
//                     <label className="block text-sm font-normal font-roboto leading-[150%] text-[#1C60DF] mb-2">
//                       Expire Date
//                     </label>
//                     <input
//                       type="text"
//                       value={expireDate}
//                       onChange={(e) => setExpireDate(e.target.value)}
//                       placeholder="MM/YY"
//                       className="w-full px-4 py-3 bg-blue-50 border border-blue-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 text-xs transition-all text-[#80868B] placeholder:text-[#80868B]"
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-sm font-normal font-roboto leading-[150%] text-[#1C60DF] mb-2">
//                       CVV
//                     </label>
//                     <input
//                       type="text"
//                       value={cvv}
//                       onChange={(e) => setCvv(e.target.value)}
//                       placeholder="123"
//                       className="w-full px-4 py-3 bg-blue-50 border border-blue-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 text-xs transition-all text-[#80868B] placeholder:text-[#80868B]"
//                     />
//                   </div>
//                 </div>
//               </div>
//             )}

//             {/* PayPal Message */}
//             {paymentMethod === 'paypal' && (
//               <div className="p-4 bg-blue-50 border border-blue-200 rounded-xl">
//                 <p className="text-sm text-gray-700 text-center">
//                   You will be redirected to PayPal to complete your payment securely.
//                 </p>
//               </div>
//             )}
//           </div>
//         </div>

//         {/* Action Buttons - Fixed at bottom */}
//         <div className="p-4 sm:p-6 border-t border-gray-200 flex-shrink-0">
//           <div className="flex flex-col sm:flex-row gap-3">
//             <button
//               className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-all"
//               onClick={() => setIsOpen(false)}
//             >
//               Cancel
//             </button>
//             <button className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/20">
//               Pay €45.50
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CompeletePayment;