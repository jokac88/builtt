function PlusIcon({width = '15', height = '15', color = '#000000'}) {
  const viewBox = `0 0 ${width} ${height}`;

  return (
      <svg width={width} height={height} viewBox={viewBox} fill="none" xmlns="http://www.w3.org/2000/svg">
        <g id="Plus" clipPath="url(#clip0_1_581)">
          <path id="Vector 2 (Stroke)" fillRule="evenodd" clipRule="evenodd"
                d="M14.6304 7.98021H0V6.65018H14.6304V7.98021Z" fill={color}/>
          <path id="Vector 3 (Stroke)" fillRule="evenodd" clipRule="evenodd"
                d="M6.65016 14.6304L6.65016 -5.81376e-08L7.98019 0L7.98019 14.6304L6.65016 14.6304Z" fill={color}/>
        </g>
        <defs>
          <clipPath id="clip0_1_581">
            <rect width="14.6304" height="14.6304" fill="white"/>
          </clipPath>
        </defs>
      </svg>
  )
}

export default PlusIcon;
