import "../styles/app.scss";
import Header from "./Header";
import { ContextProvider } from "@/components/Clients";

export const metadata = {
  title: "Todo App",
  description: "This is a Todo App Project made by NextJS 13",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ContextProvider>
          <>
            <Header />
            {children}
          </>
        </ContextProvider>
      </body>
    </html>
  );
}
