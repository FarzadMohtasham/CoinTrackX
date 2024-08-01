import React from 'react';

export type BadgePropsType = {
   children: React.ReactNode;
   type?: 'success' | 'danger';
   iconSrc?: string | null;
   iconSize?: string;
   iconDir?: 'left' | 'right';
   borderRadius?: 'none' | 'sm' | 'md' | 'lg' | 'full';
   outline?: boolean;
};

export type BadgeProps = {
   $bgColor: string;
   $textColor: string;
   $borderRadiusVariations: any;
   $borderRadius: string;
   $borderColor: string;
};
