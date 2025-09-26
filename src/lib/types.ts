import { FC, SVGProps } from 'react';

export interface SockLength {
    id: string;
    name: string;
    image: string;
    templates: SockTemplate[]
}

export interface SockTemplate {
  id: string;
  name: string;
  image: FC<SVGProps<SVGElement>>;
  colorRegions: SockColorRegion[];
}

export interface SockColorRegion {
    /**
     * The name of this color region
     * @example "Primary Color"
     */
    name: string;
    /**
     * The description of this color region
     * @example "the base of the sock"
     */
    description: string;
    /**
     * CSS selectors for this color region
     * @example [".primary-color"]
     */
    selector: string[];
    /**
     * The selector that this region initially gets color from
     * @example ".primary-color"
     */
    initialColorSelector?: string;
}