import React from 'react'
import {RuleSet} from 'styled-components'

export type ContainerPropsType = {
    children?: React.ReactNode;
    backgroundStyle?: RuleSet;
    tagType?: React.ElementType;
}

export type ContainerStyledProps = {
    $backgroundStyle: RuleSet;
}