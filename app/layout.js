"use client";

import "./globals.css"; // Global styles

import { Toaster } from "react-hot-toast";
import { Poppins } from "next/font/google";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { Provider } from "react-redux";
import { store } from "./store/store";
import Script from "next/script";

const rowdies = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="overflow-x-hidden">
      <head>
        <meta
          name="google-site-verification"
          content="VZMKmq_jzjHXiGWuhvKy0QPI7j6T1KPwuAmf0g211Qg"
        />
        <script
          src="https://accounts.google.com/gsi/client"
          async
          defer></script>

        <title>Pinpoint AI - Smart AI Chat App | Chat, Play With Gemini </title>

        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        className={`${rowdies.className} font-normal bg-gray-100 text-gray-900 min-h-screen overflow-x-hidden w-screen`}>
        <GoogleOAuthProvider clientId={process.env.GOOGLE_CLIENT_ID}>
          <Provider store={store}>
            <Toaster position="top-right" reverseOrder={false} />
            {children}
          </Provider>
        </GoogleOAuthProvider>
      </body>
    </html>
  );
}
