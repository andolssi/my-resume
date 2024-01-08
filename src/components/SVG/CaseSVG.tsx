import * as React from "react";
import { SVGProps } from "react";
const CaseSVG = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={20}
    height={20}
    viewBox="0 0 24 24"
    {...props}
  >
    <path d="M24 22H0V7h24v15zM9 2a2 2 0 0 0-2 2v2h2V4.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 .5.5V6h2V4a2 2 0 0 0-2-2H9z" />
  </svg>
);
export default CaseSVG;
