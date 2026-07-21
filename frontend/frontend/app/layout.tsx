import "./globals.css";
import { ToastProvider } from "../components/Toast/ToastContext";
import { ToastContainer } from "../components/Toast/ToastContainer";
import { ConfirmProvider } from "../components/Confirm/ConfirmContext";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-br">
      <head>
        <title>Saire</title>
      </head>
      <body>
        <ToastProvider>
          <ConfirmProvider>
            {children}
            <ToastContainer />
          </ConfirmProvider>
        </ToastProvider>
      </body>
    </html>
  );
}