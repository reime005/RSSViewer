interface Item {
  date: string;
}

export function sortListbyDateDesc<T extends Item>(list: T[]): T[] {
  return [...list].sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });
}
