import React from 'react'

function Logo({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 357 232" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="74.5" cy="157.5" r="74.5" fill="#DD4D18"/>
      <circle cx="282.5" cy="157.5" r="74.5" fill="#DD4D18"/>
      <path fill-rule="evenodd" clip-rule="evenodd" d="M199.867 139.753C193.12 141.863 185.943 143 178.5 143C171.057 143 163.88 141.863 157.133 139.753C151.329 112.599 132.48 90.2791 107.462 79.6703C107.157 76.9891 107 74.2628 107 71.5C107 32.0116 139.012 0 178.5 0C217.988 0 250 32.0116 250 71.5C250 74.2628 249.843 76.9891 249.538 79.6703C224.52 90.2791 205.671 112.599 199.867 139.753Z" fill="#DD4D18"/>
    </svg>
  )
}

export default Logo
