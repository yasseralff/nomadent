"use client";

import { useState } from "react";

/**
 * A simple toggle hook.
 * @example const [isOpen, toggle] = useToggle(false);
 */
export function useToggle(initialValue = false): [boolean, () => void] {
  const [value, setValue] = useState(initialValue);
  const toggle = () => setValue((prev) => !prev);
  return [value, toggle];
}
