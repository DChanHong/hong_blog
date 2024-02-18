import "@/public/styles/global.css";
import DarkModeProvider from "@/components/dark/DarkModeProvider";
import { DarkModeButton } from "@/components/dark/DarkModeButton";

export const metadata = {
  title: "",
  description: "",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko-KR">
      <body className="">
        <DarkModeProvider attribute="class" defaultTheme="system">
          {children}
        </DarkModeProvider>
      </body>
    </html>
  );
}
