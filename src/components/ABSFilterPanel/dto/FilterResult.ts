/**
 * filter dto
 */
export default class FilterResult {
  key: number;

  value: number[];

  static of(key: number, value: number[]) {
    const result = new FilterResult();
    result.key = key;
    result.value = value;
    return result;
  }
}