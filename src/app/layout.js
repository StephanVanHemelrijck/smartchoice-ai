import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "SmartChoice AI",
  description: "Webshop with AI recommendations",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <header className="h-[60px] w-full bg-[#232F3E] flex items-center">
          <h1 className="text-2xl text-white px-2">SmartChoice AI</h1>
        </header>
        <main className="m-10">{children}</main>
      </body>
    </html>
  );
}
