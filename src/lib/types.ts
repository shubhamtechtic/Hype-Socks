import { ComponentType, SVGProps } from 'react';

export interface SockLength {
    id: string;
    name: string;
    image: string;
    templates: SockTemplate[]
}

export interface SockTemplate {
    id: string;
    name: string;
    image: ComponentType<SVGProps<SVGSVGElement>>
}