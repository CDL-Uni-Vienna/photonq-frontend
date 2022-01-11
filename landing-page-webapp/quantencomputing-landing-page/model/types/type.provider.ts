import React from "react";

export interface BaseProviderType<T> {
  value: T;
  setValue: React.Dispatch<React.SetStateAction<T>>;
}

export interface OptionalBaseProviderType<T> {
  value?: T;
  setValue: React.Dispatch<React.SetStateAction<T | undefined>>;
}
