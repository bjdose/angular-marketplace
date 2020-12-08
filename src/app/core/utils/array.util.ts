export const uniqueValues = (array: any[], key: string): any[] =>
  array.reduce((accumulator, current) => {
    if (!accumulator.some((x: any) => x[key] === current[key])) {
      accumulator.push(current);
    }
    return accumulator;
  }, []);

export const intersect = (a: any[], b: any[]): any[] => {
  const setA = new Set(a);
  const setB = new Set(b);
  const intersection = new Set([...setA].filter((x) => setB.has(x)));
  return Array.from(intersection);
};
