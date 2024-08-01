import React from 'react';

export type HeadingPropsType = {
   children: React.ReactNode;
   tagName?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
   fontWeight?: string;
   className?: string;
};

export type HeadingStyledProps = {
   $fontWeight: string;
};
