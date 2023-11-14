export const transition = (...attrs: string[]) => attrs
  .map(
    (attr) => `${attr} ease .3s`
  )
  .join(",")
