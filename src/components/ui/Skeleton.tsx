export function IncidentCardSkeleton() {
  return (
    <div className="bg-surface rounded-lg border border-border p-4 animate-pulse">
      <div className="flex items-start justify-between mb-3">
        <div className="h-4 w-16 bg-surface-hover rounded-full" />
        <div className="h-4 w-20 bg-surface-hover rounded-full" />
      </div>
      <div className="h-5 w-3/4 bg-surface-hover rounded mb-2" />
      <div className="space-y-2">
        <div className="h-3 w-full bg-surface-hover rounded" />
        <div className="h-3 w-5/6 bg-surface-hover rounded" />
      </div>
      <div className="flex items-center justify-between mt-4 pt-3 border-t border-border">
        <div className="h-3 w-24 bg-surface-hover rounded" />
        <div className="h-3 w-16 bg-surface-hover rounded" />
      </div>
    </div>
  );
}

export function IncidentDetailSkeleton() {
  return (
    <div className="animate-pulse space-y-6">
      <div className="flex items-center gap-4">
        <div className="h-10 w-10 bg-surface-hover rounded-lg" />
        <div className="flex-1">
          <div className="h-6 w-3/4 bg-surface-hover rounded mb-2" />
          <div className="flex gap-2">
            <div className="h-5 w-16 bg-surface-hover rounded-full" />
            <div className="h-5 w-20 bg-surface-hover rounded-full" />
          </div>
        </div>
      </div>
      <div className="bg-surface rounded-lg border border-border p-6 space-y-4">
        <div className="h-4 w-full bg-surface-hover rounded" />
        <div className="h-4 w-full bg-surface-hover rounded" />
        <div className="h-4 w-3/4 bg-surface-hover rounded" />
      </div>
    </div>
  );
}

export function StatCardSkeleton() {
  return (
    <div className="bg-surface rounded-lg p-4 border border-border animate-pulse">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="h-3 w-20 bg-surface-hover rounded mb-2" />
          <div className="h-7 w-12 bg-surface-hover rounded" />
        </div>
        <div className="h-10 w-10 bg-surface-hover rounded-lg" />
      </div>
    </div>
  );
}
