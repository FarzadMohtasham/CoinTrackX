import React from "react";

export type HeadingPropsType = {
    children: React.ReactNode;
    heading_type?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
    font_weight?: string;
    class_name?: string;
}

export type HeadingStyledProps = {
    $font_weight: string;
}