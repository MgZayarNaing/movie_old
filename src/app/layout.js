'use client';

import Header from './components/Header';
import Footer from './components/Footer';
import './globals.css';
import { usePathname } from 'next/navigation';

const RootLayout = ({ children }) => {
  const pathname = usePathname();

  const hideHeaderFooter = pathname === '/login' || pathname === '/register';

  return (
    <html lang="en">
      <head>
        <title>My Application</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body>
        {!hideHeaderFooter && <Header />}
        <main>{children}</main>
        {!hideHeaderFooter && <Footer />}
      </body>
    </html>
  );
};

export default RootLayout;
