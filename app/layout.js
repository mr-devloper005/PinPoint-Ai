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

export const metadata = {
  title: "Pinpoint AI - Smart AI Workspace",
  description:
    "Use Pinpoint AI for instant chat, productivity, and smart learning.",
  openGraph: {
    title: "Pinpoint AI - Smart AI Workspace",
    description: "Real-time AI chat, learning, and productivity.",
    url: "https://pinpointaii.vercel.app",
    siteName: "Pinpoint AI",
    images: [
      {
        url: "ai.png",
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Pinpoint AI - Smart AI Workspace",
    description: "Real-time AI chat, learning, and productivity.",
    images: ["https://pinpointaii.vercel.app/twitter-image.jpg"],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="overflow-x-hidden">
      <head>
        <script
          src="https://accounts.google.com/gsi/client"
          async
          defer></script>
        <meta
          name="description"
          content="Pinpoint AI is a smart AI workspace for real-time chat, learning, and productivity. Experience instant inference with high accuracy."
        />

        <title>Pinpoint AI - Smart AI Workspace | Chat, Infer, Learn</title>

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
