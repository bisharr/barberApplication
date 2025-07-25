import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    tailwindcss(),
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: ["/favicon-32x32.png"],
      manifest: {
        name: "Barber Booking App",
        short_name: "BarberBook",
        description:
          "Easily book your haircut or beard trim at our barber shop",
        start_url: "/",
        display: "standalone",
        background_color: "#ffffff",
        theme_color: "#ef4444", // Tailwind red-500
        orientation: "portrait",
        icons: [
          {
            src: "/favicon-32x32.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "/favicon-32x32.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
      },
    }),
  ],
  base: "/",
});
