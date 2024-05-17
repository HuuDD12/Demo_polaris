import _ from 'lodash';
import i18next from 'i18next';

export const ADMIN_PAGE = {
  CUSTOMER: `https://admin.shopify.com/store/${window.OT_SHOP.replace(
    '.myshopify.com',
    '',
  )}/customers`,
  PAGES: `https://admin.shopify.com/store/${window.OT_SHOP.replace(
    '.myshopify.com',
    '',
  )}/pages`,
};
export const getWindowParam = (key: string): string | null => {
  const params = new URLSearchParams(window.location.search);
  return params.get(key);
};
export const isWorkDate = () => {
  const workDates = _.range(2, 7, 1);
  const workHours = _.range(8, 18, 1);
  const now = new Date();
  const date = now.toLocaleString('en-US', {
    timeZone: 'Asia/Bangkok',
    hour12: false,
  });
  const dateFormat = new Date(date);
  const hour = dateFormat.getHours();
  const day = dateFormat.getDay() + 1;
  return workDates.includes(day) && workHours.includes(hour);
};
export const windowParams = () => {
  const params = new URLSearchParams(window.location.search);
  const paramsArray = Array.from(params.entries());
  return _.fromPairs(paramsArray);
};

export const loadHelpDeskScript = () => {
  const isAdmin = window.location.search.indexOf('isAdmin=true') !== -1;
  if (isAdmin) return;
  const stamp = new Date().getTime();
  const script = document.createElement('script');
  script.src = `https://apps3.omegatheme.com/cookie-helpdesk/plugin.js?appId=22&v=${stamp}`;
  script.async = false;
  document.body.appendChild(script);

  return () => {
    document.body.removeChild(script);
  };
};

export const mapClass = (classNames: string[]) => {
  return classNames.join(' ');
};
export const removeScript = (value: any) => {
  if (typeof value !== 'string') {
    return value;
  }
  return value.replace(
    /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*>([\s\S]*?)<\/script>/gi,
    '$1',
  );
};

export function toCamelCase(object: Record<string, any> | Record<string, any>[]) {
  if (_.isArray(object)) {
    return _.map(object, (item) => {
      return _.mapKeys(item, (value, key) => _.camelCase(key));
    });
  }
  return _.mapKeys(object, (value, key) => _.camelCase(key));
}

