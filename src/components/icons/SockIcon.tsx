import { cn } from "@/lib/utils";
import type { SockPart } from "@/lib/types";

interface SockIconProps extends React.SVGProps<SVGSVGElement> {
  selectedParts: SockPart[];
  onPartClick: (part: SockPart) => void;
}

const partDetails: { id: SockPart; d: string; label: string; x: number; y: number }[] = [
  { id: 'cuff', d: 'M100 20 H200 V50 H100 Z', label: 'Cuff', x: 150, y: 35 },
  { id: 'ankle', d: 'M100 50 L100 200 L120 200 L120 50 Z M180 50 L180 200 L200 200 L200 50 Z', label: 'Ankle', x: 150, y: 125 },
  { id: 'heel', d: 'M100 200 L100 250 L200 250 C150 250 120 220 100 200 Z', label: 'Heel', x: 125, y: 230 },
  { id: 'instep', d: 'M120 50 L180 50 L200 200 L100 200 Z M200 200 L300 200 L300 225 L200 225 Z', label: 'Instep', x: 220, y: 150 },
  { id: 'foot', d: 'M200 200 L350 200 L350 250 L200 250 Z', label: 'Foot', x: 275, y: 225 },
  { id: 'sole', d: 'M100 250 L350 250 L350 270 L100 270 Z', label: 'Sole', x: 225, y: 260 },
  { id: 'toe', d: 'M350 200 L400 225 L350 250 Z', label: 'Toe', x: 365, y: 225 },
];

export function SockIcon({ selectedParts, onPartClick, className, ...props }: SockIconProps) {
  const simplifiedParts: { id: SockPart; d: string; }[] = [
    { id: 'cuff', d: 'M100,50 C100,50 100,20 100,20 L200,20 C200,20 200,50 200,50 L100,50 Z' },
    { id: 'ankle', d: 'M100,50 L200,50 L200,180 L180,200 L120,200 L100,180 L100,50 Z' },
    { id: 'heel', d: 'M100,180 L120,200 L180,200 L160,250 C140,260 110,240 100,220 L100,180 Z' },
    { id: 'foot', d: 'M160,250 L180,200 L350,200 C370,210 370,240 350,250 L160,250 Z' },
    { id: 'instep', d: 'M180,200 L350,200 L350,180 L180,180 L180,200Z'},
    { id: 'sole', d: 'M160,250 L350,250 L350,270 L160,270 L160,250Z'},
    { id: 'toe', d: 'M350,200 L380,225 L350,250 L350,200 Z' },
  ];

  const partLabels = {
    cuff: { x: 150, y: 35, text: 'Cuff' },
    ankle: { x: 150, y: 120, text: 'Ankle' },
    heel: { x: 120, y: 230, text: 'Heel' },
    foot: { x: 260, y: 230, text: 'Foot' },
    instep: {x: 265, y: 190, text: 'Instep'},
    sole: {x: 265, y: 260, text: 'Sole'},
    toe: { x: 360, y: 225, text: 'Toe' },
  };

  return (
    <svg
      viewBox="0 0 450 300"
      className={cn("w-full h-auto", className)}
      {...props}
    >
      <g>
        {simplifiedParts.map((part) => (
          <path
            key={part.id}
            id={part.id}
            d={part.d}
            onClick={() => onPartClick(part.id)}
            className={cn(
              "cursor-pointer fill-transparent stroke-foreground/50 transition-colors hover:fill-primary/20",
              selectedParts.includes(part.id) && "fill-primary/40 stroke-primary"
            )}
            strokeWidth="2"
          />
        ))}
      </g>
      <g className="pointer-events-none select-none">
        {Object.entries(partLabels).map(([id, { x, y, text }]) => (
          <text
            key={id}
            x={x}
            y={y}
            textAnchor="middle"
            alignmentBaseline="middle"
            className={cn(
              "text-xs font-semibold fill-muted-foreground",
              selectedParts.includes(id as SockPart) && "fill-primary-foreground"
            )}
          >
            {text}
          </text>
        ))}
      </g>
    </svg>
  );
}
