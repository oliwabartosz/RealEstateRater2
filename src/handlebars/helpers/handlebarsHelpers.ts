export const handlebarsHelpers = {
  getUrl: () =>
    `${process.env.DOMAIN}${process.env.PORT ? `:${process.env.PORT}` : ''}`,
  equals: (a: string | number, b: string | number): boolean => a === b,
  or: (a: string | number | boolean, b: string | number | boolean): boolean =>
    Boolean(a || b),
  add: (a: string | number, b: string | number): number =>
    Number(a) + Number(b),
  roundFloat: (value: number) => Math.floor(value * 100),
  convertToStr: (text: string): string | null =>
    text !== null ? String(text) : null,
  convertBoolToEmoji: (bool: boolean): string => (Boolean(bool) ? '✅' : '❌'),
  convertRateStatusToEmoji: (text: string): string =>
    String(text) === 'yes' ? '✅' : String(text) === 'part' ? '⌛' : '❌',
  convertFalseToBlackSquare: (text: string): string =>
    Boolean(text) ? text : '➖',
};
