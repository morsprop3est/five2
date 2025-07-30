import "./globals.scss";
import Providers from "../components/Providers/Providers";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="uk">
      <body>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}