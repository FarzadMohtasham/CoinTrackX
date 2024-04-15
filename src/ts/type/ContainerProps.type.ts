import {ComponentProps} from "react";
import {RuleSet} from 'styled-components'

export type ContainerPropsType = ComponentProps<any> & {
    children?: any;
    background_style?: RuleSet
}