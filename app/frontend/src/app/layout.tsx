export const metadata = {
  title: 'In-Silico Modelling of Endovascular Aneurysm Repair',
  description: 'UCL MECH0073 Group Design project 2023/24, supervised by Dr Tom Peach and team of Toby Bunn, Stephane Courtines, Mete Karabiyik, Fidhal Kotta, Ioanna Pierou, Marton Pohl, Onur Zaifoglu.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
