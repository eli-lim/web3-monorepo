import { ReactElement, ReactNode } from 'react';
import './globals.css';

export default async function RootLayout(props: {
  children: ReactNode;
}): Promise<ReactElement> {
  return (
    <html lang="en" suppressHydrationWarning className="antialiased">
      <body>{props.children}</body>
    </html>
  );
}
