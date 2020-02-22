
interface IResult {
  id: string;
  title: string;
  description: string;
  url: string;
  avatarUrl?: string;
}

export interface ISearchResult {
  title: string;
  children: Array<IResult>;
}

/**
 * 菜单帮助类
 */
class Menuhelper {
  /**
   * 搜索结果格式转换
   * @param {any} data 数据源
   * @returns {Array<ISearchResult>} 转换结果
   */
  static parseResults = (data: any) => {
    let results: Array<ISearchResult> = [];

    if (!data) {
      return results;
    }

    if (data.securities && data.securities.length > 0) {
      let securities: any = [];
      data.securities.forEach((element, index) => {
        if (index < 3) {
          securities.push(element);
        }
      });

      let resultItem: ISearchResult = {
        title: '证券',
        children: securities.map((item, index) => {
          return {
            id: String(item.id),
            title: item.deal_short_name + ' ' + item.short_name,
            description: item.code ? '证券代码：' + item.code : '暂无代码',
            url: item.url
          };
        })
      };
      results.push(resultItem);
    }

    if (data.deals && data.deals.length > 0) {
      let resultItem: ISearchResult = {
        title: '产品',
        children: data.deals.map((item) => {
          return {
            id: String(item.id),
            title: item.short_name,
            description: item.full_name,
            url: item.url
          };
        })
      };

      results.push(resultItem);
    }

    if (data.organizations && data.organizations.length > 0) {
      let resultItem: ISearchResult = {
        title: '机构',
        children: data.organizations.map((item) => {
          return {
            id: String(item.id),
            title: item.short_name,
            description: item.full_name,
            url: item.url
          };
        })
      };

      results.push(resultItem);
    }

    // if (data.functions && data.functions.length > 0) {
    //   let resultItem: ISearchResult = {
    //     type: '功能',
    //     results: data.functions.map((item) => {
    //       return {
    //         title: item.name,
    //         url: item.url
    //       };
    //     })
    //   };

    //   results.push(resultItem);
    // }

    if (data.experts && data.experts.length > 0) {
      let resultItem: ISearchResult = {
        title: '专家',
        children: data.experts.map((item) => {
          return {
            id: String(item.id),
            title: item.name,
            description: item.company,
            url: item.url,
            avatarUrl: item.avatar_url
          };
        })
      };

      results.push(resultItem);
    }

    return results;
  }
}

export default Menuhelper;
