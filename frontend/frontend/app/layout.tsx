import "./globals.css";

export default function RootLayout({
  children,
// }: Readonly<{
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-br">
      <head>
        <title>Saire</title>
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}