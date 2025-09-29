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
  textRegions?: SockTextRegion[];
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

export interface SockTextRegion {
  id: string;
  /**
   * CSS selectors for this color region
   * @example [".primary-color"]
   */
  selectors: string[];

  /**
   * Color of the text. This can be either a hex color or 'auto' to automatically determine the color from the text.
   * @example "#000000"
   * @example "auto"
   */
  color: 'auto' | string;

  /**
   * text of the region
   * @example "Hello"
   */
  text: string;

  /**
   * selector of the element whose color would be used for this text
   * if color is set to 'auto', this selector will be used to determine the color of the text
   * @example ".primary-color"
   */
  autoColorSelector?: string;

  textLocation: TextLocation;
}

export const textLocations = {
  FRONT_VERTICAL: 'Front (Vertical)',
  BACK_VERTICAL: 'Back (Vertical)',
  SIDES_VERTICAL: 'Sides (Vertical)',
  OUTSIDE_VERTICAL: 'Outside (Vertical)',
  RIM_FRONT: 'Rim (Front)',
  RIM_BACK: 'Rim (Back)',
  RIM_SIDES: 'Rim (Sides)',
  RIM_OUTSIDE: 'Rim (Outside)',
  RIM_INSIDE: 'Rim (Inside)',
  FRONT: 'Front',
  BACK: 'Back',
  SIDES: 'Sides',
  OUTSIDE: 'Outside',
  INSIDE: 'Inside',
  FOOT_ABOVE: 'Foot (Above)',
  FOOT_VERTICAL: 'Foot (Vertical)',
  FRONT_LOW: 'Front (Low)',
  BACK_LOW: 'Back (Low)',
  SIDES_LOW: 'Sides (Low)',
  OUTSIDE_LOW: 'Outside (Low)',
  INSIDE_LOW: 'Inside (Low)',
} as const;

export type TextLocation = keyof typeof textLocations;