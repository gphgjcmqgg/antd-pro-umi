import FilterSelectListType from '../enums/FilterSelectListType';
import IFilterUpdater from './IFilterUpdater';
import CheckboxUpdater from './impl/CheckboxUpdater';
import RadioUpdater from './impl/RadioUpdater';
import CheckboxUpdaterLimit from './impl/CheckboxUpdaterLimit';

/**
 * @author peng.wu
 */
export default abstract class FilterUpdaterFactory {
  static of(type: FilterSelectListType): IFilterUpdater | null {
    let stateUpdater: IFilterUpdater | null = null;
    switch (type) {
      case FilterSelectListType.checkbox:
        stateUpdater = new CheckboxUpdater();
        break;
      case FilterSelectListType.checkboxlimit:
        stateUpdater = new CheckboxUpdaterLimit();
        break;
      case FilterSelectListType.radio:
      case FilterSelectListType.select:
        stateUpdater = new RadioUpdater();
        break;
        
      default:
        break;
    }
    return stateUpdater;
  }
}