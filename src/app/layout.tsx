import "@/public/styles/global.css";
import DarkModeProvider from "@/components/dark/DarkModeProvider";
import QueryClientProvider from "@/components/provide/ReactQueryClientProvider";
import { ChatBot } from "@/components/ chatbot/ChatBot";

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
      <body>
        <QueryClientProvider>
          <DarkModeProvider attribute="class" defaultTheme="system">
            <ChatBot />
            {children}
          </DarkModeProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
}
