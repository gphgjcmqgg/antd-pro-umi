
// import FilterSectionConfig from '../../components/ABSFilterPanel/dto/FilterSectionConfig';
export declare type FilterTabItem = {
  filter: {
    value: string;
    key: string | number;
    selected: boolean;
  },
  content: React.ReactElement<any>;
};

export declare type FilterTabList = {
  key: string;
  list: FilterTabItem[];
};

export declare type FilteItem = {
  value: string;
  key: string | number;
  selected: boolean;
};

export function getFilteItem(filterTabData: FilterTabList) {
  let newData: Array<any> = [];
  let list: any = {};
  list.key = filterTabData.key;
  let filterData: Array<FilteItem> = [];
  filterTabData.list.map((item, index) => {
    filterData.push(item.filter);
  });
  list.value = filterData;
  newData.push(list);
  return newData;
}

export function getSelectedFilterKey(filterData: Array<any>) {
  let key = '';
  for (let i = 0; i < filterData[0].value.length; i++) {
    if (filterData[0].value[i].selected) {
      key = filterData[0].value[i].key.toString();
    }
  }
  return key;
}