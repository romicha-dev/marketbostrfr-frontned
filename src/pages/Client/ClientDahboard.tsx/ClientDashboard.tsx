

import { HeroSection } from './HeroSection'
import { CardSection } from './CardSection'
import { Recentpackage } from './Recentpackage'
import { StatisticProfile } from './StatisticProfile'

const ClientDashboard = () => {
  return (
    <div>
        <main className="flex-1  py-8 w-full">
        <div className="mb-8">
          
        </div>

       

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <HeroSection />
             <CardSection/>
             <Recentpackage/>
          </div>
          <div className="lg:col-span-1">
            <StatisticProfile />
          </div>
        </div>
      </main>
      
       
      
    </div>
  )
}

export default ClientDashboard
