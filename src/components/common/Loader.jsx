export default function Loader({ label = "Loading..." }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 gap-3 text-ink-soft">
      <div className="w-8 h-8 border-2 border-ink/20 border-t-oxblood rounded-full animate-spin" />
      <span className="text-sm">{label}</span>
    </div>
  );
}
