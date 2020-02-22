export function getCodeData(code: string|null): string[] {
  if (!code) {
    return [];
  }
  const arr = code.split('');
  return arr;
}

export function getRandomArray(max: number, min: number, num: number) {
  const arr: number[] = [];
  for (let i = 0; i < num; i++) {
    arr.push(getRandomNumber(max, min));
  }
  return arr;
}

export function getRandomNumber(max: number, min: number) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}