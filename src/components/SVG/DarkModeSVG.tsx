import React, { SVGProps } from 'react';

const DarkModeSVG = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" strokeWidth={0} {...props}>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M17.715 15.15A6.5 6.5 0 0 1 9 6.035C6.106 6.922 4 9.645 4 12.867c0 3.94 3.153 7.136 7.042 7.136 3.101 0 5.734-2.032 6.673-4.853Z"
      className={`fill-slate-500 ${props.className}`}
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M17 3a1 1 0 0 1 1 1 2 2 0 0 0 2 2 1 1 0 1 1 0 2 2 2 0 0 0-2 2 1 1 0 1 1-2 0 2 2 0 0 0-2-2 1 1 0 1 1 0-2 2 2 0 0 0 2-2 1 1 0 0 1 1-1Z"
      className={`fill-slate-500 ${props.className}`}
    />
  </svg>
);

export default DarkModeSVG;
