import {RuleSet} from 'styled-components'
import React from "react";

export type ContainerPropsType = {
    children?: React.ReactNode;
    backgroundStyle?: RuleSet;
    tagType?: React.ElementType;
}

export type ContainerStyledProps = {
    $backgroundStyle: RuleSet;
}