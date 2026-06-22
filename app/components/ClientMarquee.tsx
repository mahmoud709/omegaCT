import { clients as staticClients } from "../data/site";
import { getClients } from "../actions/clients";

export async function ClientMarquee() {
  const dbClients = await getClients();
  const activeClients = dbClients.length > 0 ? dbClients.map(c => c.name) : staticClients;

  const rowOne = [...activeClients, ...activeClients];
  const rowTwo = [...activeClients.slice().reverse(), ...activeClients.slice().reverse()];

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
