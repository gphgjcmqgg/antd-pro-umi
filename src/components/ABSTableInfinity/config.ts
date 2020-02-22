export const TableInfinityConfigs = {
  // 证券列表
  securityTable: {
    namespace: 'product',
    effects: 'product/getDealSecurityList',
    model: {
      dealSecurityList: 'dealSecurityList',
    },
  },
  // 产品列表
  productTable: {
    namespace: 'product',
    effects: 'product/getDealProductList',
    model: {
      dealProductList: 'dealProductList',
    },
  },
  // 过会列表
  issuingTable: {
    namespace: 'product',
    effects: 'product/getDealIssuingList',
    model: {
      dealIssuingList: 'dealIssuingList',
    },
  },
  // 产品搜索列表
  dealSearchTable: {
    namespace: 'global',
    effects: 'global/searchByPage',
    model: {
      dealSearchResult: 'dealSearchResult'
    },
    hasLoadData: true,
    customLoad: 'dealSearchLoading'
  },
  // 证券搜索列表
  securitySearchTable: {
    namespace: 'global',
    effects: 'global/searchByPage',
    model: {
      securitySearchResult: 'securitySearchResult'
    },
    hasLoadData: true,
    customLoad: 'securitySearchLoading'
  },
  // 机构搜索列表
  organizationSearchTable: {
    namespace: 'global',
    effects: 'global/searchByPage',
    model: {
      organizationSearchResult: 'organizationSearchResult'
    },
    hasLoadData: true,
    customLoad: 'organizationSearchLoading'
  },
  // 专家搜索列表
  expertSearchTable: {
    namespace: 'global',
    effects: 'global/searchByPage',
    model: {
      expertSearchResult: 'expertSearchResult'
    },
    hasLoadData: true,
    customLoad: 'expertSearchLoading'
  },
};