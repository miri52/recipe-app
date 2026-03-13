import { useState } from "react";

export function useStringList(initial: string[] = [""]) {
  const [items, setItems] = useState(initial);
  const [autoFocusIndex, setAutoFocusIndex] = useState<number | null>(null);

  const update = (index: number, value: string) =>
    setItems((prev) => prev.map((item, i) => (i === index ? value : item)));

  const add = () => {
    setAutoFocusIndex(items.length);
    setItems((prev) => [...prev, ""]);
  };

  const remove = (index: number) => {
    setAutoFocusIndex(null);
    setItems((prev) => prev.filter((_, i) => i !== index));
  };

  return [items, update, add, remove, autoFocusIndex] as const;
}
