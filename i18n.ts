export const locales = ["en", "pl"]
export const defaultLocale = locales[0]

export const matchLocale = (locale: string) => locales.includes(locale) ? locale : defaultLocale