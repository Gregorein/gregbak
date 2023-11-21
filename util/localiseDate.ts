const localiseDate = (date: string, full=false) => new Date(date).toLocaleDateString("en", {
    ...(full? {day: "numeric"} : {}),
    year: "numeric",
    month: "long",
  })

export default localiseDate
