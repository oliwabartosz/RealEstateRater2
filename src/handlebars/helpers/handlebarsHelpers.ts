export const handlebarsHelpers = {
    equals: (a: string | number, b: string | number): boolean => a === b,
    add: (a: string | number, b: string | number): number => Number(a) + Number(b),
    convertToStr: (text: string): string | null => text !== null ? String(text) : null,
    convertBoolToEmoji: (bool: boolean): string => Boolean(bool) ? "✅" : "❌",
    convertFalseToBlackSquare: (text: string): string => Boolean(text) ? text : "➖",
}