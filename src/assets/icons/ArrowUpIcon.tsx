interface ArrowUpIconProps {
  width?: number;
  height?: number;
}

export const ArrowUpIcon = ({ width = 25, height = 25 }: ArrowUpIconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width={width}
    height={height}
  >
    <path
      d="M13.0001 7.82843V20H11.0001V7.82843L5.63614 13.1924L4.22192 11.7782L12.0001 4L19.7783 11.7782L18.3641 13.1924L13.0001 7.82843Z"
      fill="currentColor"
    ></path>
  </svg>
);
