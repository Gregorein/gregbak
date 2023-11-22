type LogoProps = {
  color?: string
  size?: number
  strokeWidth?: number
}

const Logo = ({
  color = "currentColor",
  size = 32,
  strokeWidth = 4
}: LogoProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size * 1.1875}
    height={size}
    viewBox={`0 0 ${size * 1.1875} ${size}`}
  >
    <line
      y1="30"
      x2="17.308"
      transform="translate(1.732 0.999)"
      fill="none"
      stroke={color}
      strokeWidth={strokeWidth}
    />
    <path
      d="M2307.5,288.032l8.606-14.865,8.6,14.865"
      transform="translate(-2288.354 -257.09)"
      fill="none"
      stroke={color}
      strokeWidth={strokeWidth}
    />
  </svg>
)

export default Logo
