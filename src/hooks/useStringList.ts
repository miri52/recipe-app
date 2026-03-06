import { useState } from "react";

export function useStringList(initial: string[] = [""]) {
  const [items, setItems] = useState(initial);

  const update = (index: number, value: string) =>
    setItems((prev) => prev.map((item, i) => (i === index ? value : item)));

  const add = () => setItems((prev) => [...prev, ""]);

  const remove = (index: number) =>
    setItems((prev) => prev.filter((_, i) => i !== index));

  return [items, update, add, remove] as const;
}
