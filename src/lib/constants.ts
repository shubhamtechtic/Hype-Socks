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
        colorRegions: [
          {
            name: "Body",
            description: "The main body color region",
            selector: [
              "path.part-stirrup9.option-stirrup-9.view-back.leg-left.color2",
              "path.part-stirrup9.option-stirrup-9.view-side.leg-left.color2",
              "path.part-stirrup9.option-stirrup-9.view-front.leg-left.color2",
              "path.part-toe.view-side.leg-left.color2",
              "path.part-toe.view-front.leg-left.color2",
              "path.part-heel.view-side.leg-left.color2",
              "path.part-heel.view-back.leg-left.color2",
              "text.part-toetext.view-front.leg-left.color2",
              "text.part-toetext.view-side.leg-left.color2",
            ],
          },
          {
            name: "Foot",
            description: "The foot color region",
            selector: [
              "path.part-body.view-side.leg-left.color1",
              "path.part-body.view-front.leg-left.color1",
              "path.part-body.view-back.leg-left.color1",
              "path.part-toe.view-side.leg-left.color1.part-outline",
              "path.part-toe.view-front.leg-left.color1.part-outline",
              "path.part-heel.view-side.leg-left.color1.part-outline",
              "path.part-heel.view-back.leg-left.color1.part-outline",
            ],
          },
          {
            name: "Accent",
            description: "The accent color region",
            selector: [
              "text.type-text.part-text0.location-back.orientation-horizontal.leg-left",
              "text.type-text.part-text0.location-side.orientation-horizontal.leg-left",
              "text.type-text.part-text0.location-front.orientation-horizontal.leg-left",
            ],
          },
        ],
      },
      {
        id: "2n1-stripes-a",
        name: "Stripes A",
        image: TwoNOneStripesASvg,
        colorRegions: [
          {
            name: "Foot",
            description: "The foot color region",
            selector: [
              "path.part-body.view-side.leg-left.color1",
              "path.part-body.view-front.leg-left.color1",
              "path.part-body.view-back.leg-left.color1",
              "path.part-toe.view-side.leg-left.color1.part-outline",
              "path.part-toe.view-front.leg-left.color1.part-outline",
              "path.part-heel.view-side.leg-left.color1.part-outline",
              "path.part-heel.view-back.leg-left.color1.part-outline",
            ],
          },
          {
            name: "Body",
            description: "The main stirrup base color region",
            selector: [
              "path.part-stirrup7.option-stirrup-7.view-back.leg-left.color2",
              "path.part-stirrup7.option-stirrup-7.view-side.leg-left.color2",
              "path.part-stirrup7.option-stirrup-7.view-front.leg-left.color2",
              "path.part-solepattern.view-back.leg-left.color2",
              "path.part-solepattern.view-side.leg-left.color2",
            ],
          },
          {
            name: "Stirrup Design",
            description: "The stirrup design/pattern color region",
            selector: [
              "path.part-design7.option-stirrup-7.view-back.leg-left.color3",
              "path.part-design7.option-stirrup-7.view-side.leg-left.color3",
              "path.part-design7.option-stirrup-7.view-front.leg-left.color3",
            ],
          }
        ],
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
            selector: [],
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
