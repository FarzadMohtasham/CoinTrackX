import {RuleSet} from "styled-components";

export type CheckboxTypes = 'primary' | 'danger' | 'black'

export type CheckboxProps = {
    label: string | null;
    check_box_setter: (val: boolean) => void;
    default_value?: boolean;
    type?: CheckboxTypes;
}

export type Properties = {
    active: RuleSet<object>,
    'active-inner': string,
    focus: string,
    border: string,
    'border-hover': string,
    background: string,
    disabled: string,
    'disabled-inner': string,
}

export type CheckboxStyledProps = {
    $properties: Properties
}