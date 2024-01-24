export const handlebarsHelpers = {
    usernameLetter: (username: string) => username.slice(0, 1),
    equals: (a, b) => a === b,
    add: (a, b) => a + b,
    convertToStr: (text) => String(text),

}