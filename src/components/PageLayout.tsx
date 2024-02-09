export default function PageLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <header></header>
      <main className="flex min-h-screen flex-col items-center justify-between p-5 mt-[80px]">
        {children}
      </main>
      <footer></footer>
    </>
  )
}