const items = ['BRANDING', 'UI DESIGN', 'POSTERS', 'SOCIAL MEDIA', 'TYPOGRAPHY', 'ART DIRECTION'];

const Marquee = () => (
  <div className="overflow-hidden border-y border-line dark:border-line-dark py-6 select-none">
    <div className="flex whitespace-nowrap animate-[marquee_28s_linear_infinite] w-max">
      {[...Array(2)].map((_, dup) => (
        <div key={dup} className="flex">
          {items.map((item, i) => (
            <span key={`${dup}-${i}`} className="font-display text-3xl md:text-5xl mx-8 text-ink/15 dark:text-paper/15">
              {item} <span className="text-signal/40">•</span>
            </span>
          ))}
        </div>
      ))}
    </div>
    <style>{`
      @keyframes marquee {
        from { transform: translateX(0); }
        to { transform: translateX(-50%); }
      }
    `}</style>
  </div>
);

export default Marquee;
