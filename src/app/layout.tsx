import "@/public/styles/global.css";
import DarkModeProvider from "@/components/dark/DarkModeProvider";
import QueryClientProvider from "@/components/provide/ReactQueryClientProvider";
import { ChatBot } from "@/components/chatbot/ChatBot";
import { Metadata } from "next";

import RecoilRootWrapper from "@/components/provide/RecoilRootWrapper";

export function generateMetadata(): Metadata {
  return {
    title: "Chanhong's Blog",
    description: "찬홍 블로그입니다.",
    icons: {
      icon: "/favicon.ico",
    },
  };
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko-KR">
      <body>
        <RecoilRootWrapper>
          <QueryClientProvider>
            <DarkModeProvider attribute="class" defaultTheme="system">
              <ChatBot />
              {children}
            </DarkModeProvider>
          </QueryClientProvider>
        </RecoilRootWrapper>
      </body>
    </html>
  );
}
