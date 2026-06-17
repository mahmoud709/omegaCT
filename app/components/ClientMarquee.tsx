import { clients } from "../data/site";

export function ClientMarquee() {
  const rowOne = [...clients, ...clients];
  const rowTwo = [...clients.slice().reverse(), ...clients.slice().reverse()];

  return (
    <div className="space-y-5 overflow-hidden">
      <MarqueeRow items={rowOne} />
      <MarqueeRow items={rowTwo} reverse />
    </div>
  );
}

function MarqueeRow({ items, reverse = false }: { items: string[]; reverse?: boolean }) {
  return (
    <div className="marquee-mask">
      <div className={`marquee-track ${reverse ? "marquee-reverse" : ""}`}>
        {items.map((client, index) => (
          <div key={`${client}-${index}`} className="client-mark">
            {client}
          </div>
        ))}
      </div>
    </div>
  );
}
