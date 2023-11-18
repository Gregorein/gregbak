const localiseDate = (date: string) => new Date(date).toLocaleDateString("en", {
    year: "numeric",
    month: "long",
  })

export default localiseDate
