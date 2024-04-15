import {ComponentProps} from 'react'

export type HeadingBoxType = ComponentProps<any> & {
    label?: string | null;
    heading?: string | null;
    desc?: string | null;
    headingTag?: 'h1' | 'h2' | 'h3' | 'h4';
}