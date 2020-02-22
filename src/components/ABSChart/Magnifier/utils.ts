import moment from 'moment';

export function getChartData(chartData: any, xMinNum: any , xMaxNum: any) {
  const dateFomat = chartData.xAxis.timeFormat ? chartData.xAxis.timeFormat : `YYYY-MM-DD`;
  let xMin = new Date(moment(xMinNum).format(`${dateFomat} 00:00:00`)).getTime();
  let xMax = new Date(moment(xMaxNum).format(`${dateFomat} 00:00:00`)).getTime();

  if (xMin === xMax) {
    xMin = new Date(moment(xMinNum).format(`${dateFomat} 00:00:00`)).getTime();
    xMax = new Date(moment(xMaxNum).format(`${dateFomat.substr(0, 8)}31 00:00:00`)).getTime();
    chartData.xAxis.tickInterval = 1000 * 60 * 60 * 24 * 30;
  }
  let dataList: any = [];
  chartData.xAxis.min = xMin;
  chartData.xAxis.max = xMax;
  if (chartData.series && chartData.series.length > 0) {
    chartData.series.map((series, index) => {
      dataList = [];
      series.data.map((point) => {
        const x = new Date(moment(point.tooltip ? point.x : point[0]).format(`${dateFomat} 00:00:00`)).getTime();
        if (x >=  xMin && x <= xMax) {
          dataList.push(point);
        }
      });
      series.data = dataList;
    });
  }
  return chartData;
}