import "./globals.css";

export const metadata = {
  title: "Karan Suji - Graphic Designer Portfolio",
  description: "Portfolio of Karan Suji, a passionate graphic designer.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
