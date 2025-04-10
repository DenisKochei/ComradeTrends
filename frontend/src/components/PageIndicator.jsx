import React from 'react'

export function PageIndicator() {
  const url = window.location.pathname;
  const segments = url.split("/").filter(segment => segment);
  const breadcrumb = segments.map(segment => 
    segment
      .replace(/-/g, " ")
      .replace(/\b\w/g, char => char.toUpperCase())
  ).join(" » ");
  console.log(breadcrumb);
  return (
    <div className='text-lg mx-5 mt-2'>
      <span>{"Home » "}</span>
      {breadcrumb}
    </div>
  )
}
