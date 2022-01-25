import { useEffect, useState } from "react";
import zxcvbn from "zxcvbn";

const MIN_PASSWORD_STRENGTH = 3;
export const MIN_PASSWORD_LENGTH = 7;

export interface ErrorObject {
  length: boolean;
  strength: boolean;
}

export function usePasswordStrength({ value }: { value: string }) {
  const [firstRender, setFirstRender] = useState(true);
  const [error, setError] = useState<ErrorObject>({
    length: false,
    strength: false,
  });

  useEffect(() => {
    if (!firstRender) {
      setError({
        strength: zxcvbn(value).score < MIN_PASSWORD_STRENGTH,
        length: value.length < MIN_PASSWORD_LENGTH,
      });
    } else {
      setFirstRender(false);
    }
  }, [value]);

  return error;
}
