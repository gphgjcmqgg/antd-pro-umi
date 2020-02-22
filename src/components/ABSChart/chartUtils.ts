import _ from 'lodash';

class ChartUtils {
  // 取得放大chart配置信息
  getEnLargeConfig = (config: any) => {
    if (config && config.title && config.title.text === null) {
      // 饼图显示标题
      _.set(config, 'title.text', config.chartData.title);
    }
    return config;
  }

  getChartSVGConfig = (config: any) => {
    if (!config) {
      return null;
    }
    const { axisTitle } = config;
    const yAxisTitle1 = axisTitle ? axisTitle.y[0] : '';
    const yAxisTitle2 = axisTitle ? axisTitle.y[1] : '';

    if (config.yAxis && config.yAxis.length > 1) {
      _.set(config, 'yAxis[0].title.text', yAxisTitle1);
      _.set(config, 'yAxis[1].title.text', yAxisTitle2);
    } else {
      _.set(config, 'yAxis.title.text', yAxisTitle1);
    }

    if (config && config.title && config.title.text === null) {
      // 饼图显示标题
      _.set(config, 'title.text', config.chartData.title);
    }

    // // 图例完整显示设置
    _.set(config, 'legend.maxHeight', 300);
    return config;
  }

  getBgWhiteConfig = (config: any) => {
    const blackColor = { color: 'black' };
    _.set(config, 'chart.backgroundColor', 'white');
    _.set(config, 'title.style', blackColor);
    _.set(config, 'xAxis.title.style', blackColor);
    _.set(config, 'xAxis.labels.style', blackColor);
    if (config.yAxis && config.yAxis.length > 1) {
      _.set(config, 'yAxis[0].title.style', blackColor);
      _.set(config, 'yAxis[1].title.style', blackColor);
      _.set(config, 'yAxis[0].labels.style', blackColor);
      _.set(config, 'yAxis[1].labels.style', blackColor);
    } else {
      _.set(config, 'yAxis.title.style', blackColor);
      _.set(config, 'yAxis.labels.style', blackColor);
    }
    _.set(config, 'legend.itemStyle', blackColor);
    return config;
  }
}

export default new ChartUtils();