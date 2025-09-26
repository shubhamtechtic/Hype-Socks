import { SockLength } from "@/lib/types";
import TwoNOneBlankSlateSvg from "@/components/svgs/templates/2n1_blank-slate.svg";
import TwoNOneStripesASvg from "@/components/svgs/templates/2n1-stripes-a.svg";
import CrewBlankSlateSvg from "@/components/svgs/templates/crew_blank-slate.svg";
import CrewStripesBSvg from "@/components/svgs/templates/crew_stripes-b.svg";
import HighAnkleBlankSlate1Svg from "@/components/svgs/templates/high-ankle_blank-slate-1.svg";
import HighAnkleBlankSlate2Svg from "@/components/svgs/templates/high-ankle_blank-slate-2.svg";
import LowAnkleBlankSlate1Svg from "@/components/svgs/templates/low-ankle_blank-slate-1.svg";
import LowAnkleBlankSlate2Svg from "@/components/svgs/templates/low-ankle_blank-slate-2.svg";
import CalfSleevePattern1Svg from "@/components/svgs/templates/calf-sleeve_pattern-1.svg";
import CalfSleevePattern6Svg from "@/components/svgs/templates/calf-sleeve_pattern-6.svg";
import KneeHighEuroPattern1Svg from "@/components/svgs/templates/knee-high-euro_pattern-1.svg";
import KneeHighEuroPattern6Svg from "@/components/svgs/templates/knee-high-euro_pattern-6.svg";
import KneeHighEliteSvg from "@/components/svgs/templates/knee-high_elite.svg";
import KneeHighStripesLSvg from "@/components/svgs/templates/knee-high_stripes-l.svg";
import StirrupBlankSlateSvg from "@/components/svgs/templates/stirrup_blank-slate.svg";
import StirrupStripesDSvg from "@/components/svgs/templates/stirrup_stripes-d.svg";

export const sockLengths: SockLength[] = [
  {
    id: "2n1",
    name: "Baseball 2n1",
    image: "/lengths/2n1.svg",
    templates: [
      {
        id: "2n1_blank-slate",
        name: "Blank Slate",
        image: TwoNOneBlankSlateSvg,
        colorRegions: [],
      },
      {
        id: "2n1-stripes-a",
        name: "Stripes A",
        image: TwoNOneStripesASvg,
        colorRegions: [],
      },
    ],
  },
  {
    id: "crew",
    name: "Crew",
    image: "/lengths/crew.svg",
    templates: [
      {
        id: "crew_blank-slate",
        name: "Blank Slate",
        image: CrewBlankSlateSvg,
        colorRegions: [],
      },
      {
        id: "crew_stripes-b",
        name: "Stripes B",
        image: CrewStripesBSvg,
        colorRegions: [
          {
            name: "Stripe 1",
            description: "The first stripe",
            selector: [
              "path.part-design.view-side.leg-left.color2",
              "path.part-design.view-front.leg-left.color2",
              "path.part-design.view-back.leg-left.color2",
            ],
          },
        ],
      },
    ],
  },
  {
    id: "high-ankle",
    name: "Quarter",
    image: "/lengths/high-ankle.svg",
    templates: [
      {
        id: "high-ankle_blank-slate-1",
        name: "Blank Slate",
        image: HighAnkleBlankSlate1Svg,
        colorRegions: [],
      },
      {
        id: "high-ankle_blank-slate-2",
        name: "Blank Slate",
        image: HighAnkleBlankSlate2Svg,
        colorRegions: [],
      },
    ],
  },
  {
    id: "low-ankle",
    name: "Ankle",
    image: "/lengths/low-ankle.svg",
    templates: [
      {
        id: "low-ankle_blank-slate-1",
        name: "Blank Slate",
        image: LowAnkleBlankSlate1Svg,
        colorRegions: [],
      },
      {
        id: "low-ankle_blank-slate-2",
        name: "Blank Slate",
        image: LowAnkleBlankSlate2Svg,
        colorRegions: [],
      },
    ],
  },
  {
    id: "calf-sleeve",
    name: "Calf Sleeve",
    image: "/lengths/calf-sleeve.svg",
    templates: [
      {
        id: "calf-sleeve_pattern-1",
        name: "Pattern 1",
        image: CalfSleevePattern1Svg,
        colorRegions: [],
      },
      {
        id: "calf-sleeve_pattern-6",
        name: "Pattern 6",
        image: CalfSleevePattern6Svg,
        colorRegions: [],
      },
    ],
  },
  {
    id: "knee-high-euro",
    name: "Euro Fold-Over",
    image: "/lengths/knee-high-euro.svg",
    templates: [
      {
        id: "knee-high-euro_pattern-1",
        name: "Pattern 1",
        image: KneeHighEuroPattern1Svg,
        colorRegions: [],
      },
      {
        id: "knee-high-euro_pattern-6",
        name: "Pattern 6",
        image: KneeHighEuroPattern6Svg,
        colorRegions: [],
      },
    ],
  },
  {
    id: "knee-high",
    name: "Knee-High",
    image: "/lengths/knee-high.svg",
    templates: [
      {
        id: "knee-high_elite",
        name: "Elite",
        image: KneeHighEliteSvg,
        colorRegions: [],
      },
      {
        id: "knee-high_stripes-l",
        name: "Stripes L",
        image: KneeHighStripesLSvg,
        colorRegions: [],
      },
    ],
  },
  {
    id: "stirrup",
    name: "Baseball Stirrup",
    image: "/lengths/stirrup.svg",
    templates: [
      {
        id: "stirrup_blank-slate",
        name: "Blank Slate",
        image: StirrupBlankSlateSvg,
        colorRegions: [],
      },
      {
        id: "stirrup_stripes-d",
        name: "Stripes D",
        image: StirrupStripesDSvg,
        colorRegions: [],
      },
    ],
  },
];
