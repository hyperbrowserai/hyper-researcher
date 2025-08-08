export function BackgroundOrbs() {
  // Soft blurred, multi-color background layer
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      <div className="absolute -top-24 -left-24 h-96 w-96 rounded-full bg-emerald-500/15 blur-3xl" />
      <div className="absolute top-1/3 -right-16 h-[28rem] w-[28rem] rounded-full bg-sky-500/10 blur-3xl" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[32rem] w-[32rem] rounded-full bg-fuchsia-500/10 blur-3xl" />
      <div className="absolute top-10 left-1/3 h-72 w-72 rounded-full bg-amber-500/5 blur-3xl" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0)_40%,rgba(0,0,0,0.6)_80%)]" />
    </div>
  );
}
