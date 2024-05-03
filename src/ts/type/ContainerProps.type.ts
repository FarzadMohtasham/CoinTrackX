import {RuleSet} from 'styled-components'
import React from "react";

export type ContainerPropsType = {
    children?: React.ReactNode;
    background_style?: RuleSet,
    tag_type?: React.ElementType
}

export type ContainerStyledProps = {
    background_style: RuleSet
}