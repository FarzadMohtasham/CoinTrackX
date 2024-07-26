import React from 'react';

export type TipPropsType = {
   children: React.ReactNode;
   closable?: boolean;
   redirect?: boolean;
   link?: string;
   replaceHistory?: boolean;
   extended?: boolean;
};
