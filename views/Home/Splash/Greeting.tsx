import { Typography } from "@mui/joy"

type GreetingProps = {
  splashTitle: string
}

const Greeting = ({ splashTitle }: GreetingProps) => (
  <Typography
    sx={{
      gridArea: "greeting",
      color: "primary.500"
    }}
    fontSize={72}
    fontWeight="bold"
  >
    {splashTitle}
  </Typography>
)

export default Greeting
