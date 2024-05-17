import _ from 'lodash';

const checkRequired = (value: any) => !_.isEmpty(value);
const checkRegex = (value: any, regex: RegExp) => regex.test(value);
export const colorRegex = (value: string) =>  /^#?([A-Fa-f0-9]{3}){1,2}$|^#?([A-Fa-f0-9]{4}){1,2}$/.test(value);

type ValidationRule = {
  required?: boolean;
  regex?: RegExp;
  message: string;
};
type ValidationRules<T> = {
  [key in keyof T]: ValidationRule[];
};
const Validator = {
  required: checkRequired,
  regex: checkRegex,
};
export const validateInput = (value: any, rule: ValidationRule) => {
  const keys = _.omit(rule, 'message');
  for (const key in keys) {
    if (_.has(Validator, key)) {
      //@ts-ignore
      const validationFn = Validator[key];
      //@ts-ignore
      return validationFn(value, rule[key]);
    }
  }
};

export function validate<T>(state: T, ruleFields: ValidationRules<T>) {
  const entries = _.entries(ruleFields);
  const validResults: Record<string, boolean | string> = entries.reduce(
    (callback, [key, rules]: any) => {
      const errors = rules.map((rule: ValidationRule) => {
        const isValid = validateInput(state[key as keyof T], rule);
        const message = rule.message;
        return { key, isValid, message };
      });
      const exist = _.find(errors, (error) => error.key === key && !error.isValid);
      return { ...callback, [key]: !exist?.isValid ? exist?.message : false };
    },
    {},
  );
  const passed = _.every(validResults, (item) => !item);
  return { validResults, passed };
}
