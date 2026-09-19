export default function FullScreenLoader() {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center gap-4 bg-[var(--color-bg)]">
      <div className="relative h-12 w-12">
        <div className="absolute inset-0 rounded-full border-4 border-primary-200 dark:border-primary-800" />
        <div className="absolute inset-0 animate-spin rounded-full border-4 border-transparent border-t-primary-600 dark:border-t-primary-400" />
      </div>
      <p className="text-sm font-medium text-[var(--color-text-muted)] tracking-wide">
        Loading Nimbus…
      </p>
    </div>
  );
}