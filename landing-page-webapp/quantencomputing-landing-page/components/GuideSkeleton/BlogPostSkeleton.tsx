import React from "react";

export function GuideSkeleton() {
  return (
    <div className="space-y-6 transition transform animate-pulse">
      <div className={"w-full flex flex-col items-center space-y-3"}>
        <div className="w-1/4 h-10 bg-gray-300 rounded" />
        <div className="w-3/6 h-10 bg-gray-300 rounded" />
        <div className="w-4/5 h-20 bg-gray-300 rounded" />
      </div>

      <div className="pt-20 space-y-3">
        <div className="w-1/3 h-20 bg-gray-300 rounded" />
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="w-full h-10 bg-gray-300 rounded" />
        ))}
      </div>
    </div>
  );
}
