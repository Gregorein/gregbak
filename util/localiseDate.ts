const localiseDate = (date: string, locale="en", full=false) => new Date(date).toLocaleDateString(locale, {
    ...(full? {day: "numeric"} : {}),
    year: "numeric",
    month: "long",
  })

export default localiseDate
