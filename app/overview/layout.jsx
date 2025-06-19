
export const metadata = {
  title: 'Overview | Pinpoint AI',
  description: 'Pinpoint AI is your personal AI workspace — ultra-fast, deeply personalized, and designed for the future.',
  keywords: ['AI platform', 'Pinpoint AI', 'real-time AI', 'personalized AI', 'fast AI workspace'],
  openGraph: {
    title: 'Overview | Pinpoint AI',
    description: 'Discover the capabilities of your personal AI workspace — smart, secure, and lightning-fast.',
    url: 'https://yourdomain.com/overview',
    siteName: 'Pinpoint AI',
    images: [
      {
        url: 'pinpointai.png', 
        width: 1200,
        height: 630,
        alt: 'Pinpoint AI Overview Banner',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Pinpoint AI Overview',
    description: 'Explore your ultra-personalized AI assistant.',
    images: ['https://yourdomain.com/og-image.png'],
  },
};

export default function OverviewLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-[#08080A] text-gray-200">
        {children}
      </body>
    </html>
  );
}
