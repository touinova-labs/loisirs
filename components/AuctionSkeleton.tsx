export function AuctionSkeleton() {
  return (
    <div className="border rounded-lg overflow-hidden animate-pulse" style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-primary)' }}>
      <div className="aspect-square" style={{ backgroundColor: 'var(--bg-tertiary)' }} />
      <div className="p-6 space-y-4">
        <div className="h-6 rounded-lg w-3/4" style={{ backgroundColor: 'var(--bg-tertiary)' }} />
        <div className="h-4 rounded-lg w-1/2" style={{ backgroundColor: 'var(--bg-tertiary)' }} />
        <div className="h-12 rounded-lg w-full mt-4" style={{ backgroundColor: 'var(--bg-tertiary)' }} />
      </div>
    </div>
  )
}