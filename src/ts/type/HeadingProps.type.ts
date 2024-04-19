import React from "react";

export type HeadingPropsType = {
    children: React.ReactNode;
    heading_type?: string;
    font_weight?: string;
    class_name?: string;
}

export type HeadingStyledProps = {
    font_weight: string;
}