import React, { useLayoutEffect, useState } from "react";

interface SettingsImageProps {
  src: string;
  normal?: boolean;
  onError?: (setSrc: (val: string) => void) => void;
}

export default function SettingsImage({
  src,
  normal,
  onError,
}: SettingsImageProps) {
  const [source, setSource] = useState(src);

  useLayoutEffect(() => {
    setSource(src);
  }, [src]);

  return (
    // eslint-disable-next-line
    <img
      alt={"Configuration Image"}
      src={source}
      onError={() => onError?.(setSource)}
      style={{
        filter: normal
          ? ""
          : "invert(100%) sepia(0%) saturate(7500%) hue-rotate(63deg) brightness(103%) contrast(103%)",
      }}
    />
  );
}
