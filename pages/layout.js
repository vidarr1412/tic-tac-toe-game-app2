import './globals.css'

export const metadata = {
  title: 'Simple Tailwind Next App',
  description: 'Just one page styled with Tailwind CSS',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
