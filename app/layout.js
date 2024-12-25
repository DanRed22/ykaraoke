import "./globals.css";
import { Poppins } from "next/font/google";
import {QueueProvider} from "@/contexts/QueueContext";

const poppinsFont = Poppins({
  weight: ['400', '700'],
  style: ['normal', 'italic'],
  subsets: ["latin"],
  display: 'swap',
});

export const metadata = {
  title: "YKaraoke",
  description: "A handy karaoke app for your next party.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${poppinsFont.className} antialiased`}
      >
        <QueueProvider>
        {children}
        </QueueProvider>    
      </body>
    </html>
  );
}