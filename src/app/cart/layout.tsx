export default function CartPageLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className='page-layout'>{children}</div>
  )
}
