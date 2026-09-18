export default function Avatar({ name }: { name: string }) {
  const initial = name?.charAt(0)?.toUpperCase() || "U";

  return (
    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-navy-700 text-sm font-semibold text-white dark:bg-navy-600">
      {initial}
    </div>
  );
}