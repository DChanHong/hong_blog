import "@/public/styles/global.css";
import DarkModeProvider from "@/components/dark/DarkModeProvider";
import QueryClientProvider from "@/utils/ReactQueryClientProvider";

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
        <QueryClientProvider>
          <DarkModeProvider attribute="class" defaultTheme="system">
            {children}
          </DarkModeProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
}
