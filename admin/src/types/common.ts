import React from 'react';

export {};
export type TPagination = {
  totalItems?: number;
  total: number;
  current: number;
  pageSize: number;
};

declare global {
  interface Window {
    OT_HOST: string;
    OT_SHOP: string;
    OT_HMAC: string;
    $crisp: any;
    app: any;
  }

  namespace JSX {
    interface IntrinsicElements {
      'ui-nav-menu': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      >;
    }
  }
}
