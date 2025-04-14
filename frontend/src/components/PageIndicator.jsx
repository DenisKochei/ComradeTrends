import React from "react";

export function PageIndicator() {
  const url = window.location.pathname;
  const segments = url.split("/").filter((segment) => segment);
  const breadcrumb = segments
    .map((segment) =>
      segment.replace(/-/g, " ").replace(/\b\w/g, (char) => char.toUpperCase())
    )
    .join(" » ");
  return (
    <div className="text-sm mx-5 text-slate-600 mt-2">
      <div className="line-clamp-1">
        <span>{"Home » "}</span>
        {breadcrumb}
      </div>
    </div>
  );
}
