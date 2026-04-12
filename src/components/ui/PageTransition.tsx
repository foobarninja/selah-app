export function PageTransition({ children }: { children: React.ReactNode }) {
  return <div className="animate-page-enter h-full">{children}</div>
}
