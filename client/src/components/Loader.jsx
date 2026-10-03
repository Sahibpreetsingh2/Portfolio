const Loader = ({ label = 'Loading' }) => (
  <div className="flex items-center justify-center py-24">
    <div className="flex items-center gap-3 text-sm text-ink/50 dark:text-paper/50">
      <span className="w-2 h-2 rounded-full bg-signal animate-pulse" />
      {label}…
    </div>
  </div>
);

export default Loader;
