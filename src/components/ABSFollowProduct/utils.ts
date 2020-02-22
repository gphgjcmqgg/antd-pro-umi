
export function getABSFollowProductData(data: any) {
  if (data && data.items && Array.isArray(data.items) && data.items.length > 0) {
    const newData = data.items.filter(item => item.next_paymentday_diff !== null && item.next_paymentday_diff <= 7);
    if (newData && Array.isArray(newData) && newData.length > 0) {
      const followProductData = newData.map((item, index) => {
        const obj = {
          key: index + 1,
          deal_name: item.deal_name_chinese,
          next_paymentday_diff: item.next_paymentday_diff,
          deal_id: item.deal_id,
        };
        return obj;
      });
      return followProductData;
    } else {
      return null;
    }
  }
  return null;
}