import {ComponentProps} from "react";
import {RuleSet} from 'styled-components'

export type ContainerPropsType = ComponentProps<'div'> & {
    children?: any;
    background_style?: RuleSet,
    tag_type?: string
}