export default interface ITimeService {
  /**
   * bottom inactive ratio
   * @param currentTime 
   * @param nextTime 
   */
  getBottomInactiveRatio(currentTime: number, nextTime: number): number;

  /**
   * top inactive ratio
   * @param currentTime 
   * @param prevTime 
   */
  getTopInactiveRatio(currentTime: number, prevTime: number): number;
}