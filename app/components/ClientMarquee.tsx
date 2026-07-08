import { clients as staticClients } from "../data/site";
import { getClients } from "../actions/clients";

export async function ClientMarquee() {
  const dbClients = await getClients();
  const activeClients = dbClients.length > 0 ? dbClients.map(c => c.name) : staticClients;

  // Repeat the base array so it's wide enough for any screen (min 10 items)
  const repeatCount = Math.max(1, Math.ceil(12 / activeClients.length));
  const baseArray = Array(repeatCount).fill(activeClients).flat();

  // Marquee needs exactly two identical halves to loop properly with translateX(-50%)
  const rowOne = [...baseArray, ...baseArray];
  const rowTwo = [...baseArray.slice().reverse(), ...baseArray.slice().reverse()];

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
