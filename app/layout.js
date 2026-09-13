import Providers from '@/app/components/Providers';
import './globals.css';

export const metadata = {
  title: 'استمارة اختيار التيم',
  description: 'استمارة اختيار التيم',

};

export default function RootLayout({ children }) {
  return (
    <html lang="ar" dir="rtl">
      <body>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
