import * as React from 'react';
import ReactHighcharts from 'react-highcharts';
import HighchartMore from 'highcharts/highcharts-more';
import Exporting from 'highcharts/modules/exporting';
import Heatmap from 'highcharts/modules/heatmap';
import { connect } from 'dva';
import './index.less';
import ChartTheme from './chartTheme';
import ABSNoContent from '../../components/ABSNoContent';
import ABSLoading from '../ABSLoading';
import ABSIconText from '../../components/ABSIconText';
import { ABSModal } from '../ABSModal';
import IAxisTitle from '../../abs/views/market/Summary/entities/IAxisTitle';
import ABSIconTooltip from '../../components/ABSIconTooltip';
import _ from 'lodash';
import Magnifier from './Magnifier';
import ChartUtils from './chartUtils';

HighchartMore(ReactHighcharts.Highcharts);
Heatmap(ReactHighcharts.Highcharts);
Exporting(ReactHighcharts.Highcharts);
ReactHighcharts.Highcharts.setOptions(ChartTheme);

interface IABSChartProps {
  config: any;
  title?: any;
  loading?: boolean;
  dispatch?: any;
  hideDownload?: boolean;
  hideEnlarge?: boolean;
  callback?: any;
  hidePngExport?: boolean;
  xAxisDisabled?: boolean;
  yAxisLeftDisabled?: boolean;
  hideMagnifierPngDownload?: boolean;
  hideRangeFilter?: boolean;
}
interface IIABSChartState {
  isSelectAll: boolean;
}

class ABSChart extends React.PureComponent<IABSChartProps, IIABSChartState> {
  modal: ABSModal | null;
  constructor(props: any) {
    super(props);
    this.renderSelectButton = this.renderSelectButton.bind(this);
    this.state = { isSelectAll: true };
  }

  getChartDownloadData(chartData: any, axisTitle: IAxisTitle) {
    let yColoumName: string[] = [];
    if (axisTitle && axisTitle.y) {
      axisTitle.y.map(item => {
        if (item) {
          const index = item.indexOf('（');
          if (index > -1) {
            item = item.substring(0, index);
          }
          yColoumName.push(item);
        }
      });
    }
    return {
      data_str: JSON.stringify(chartData),
      x_str: axisTitle && axisTitle.x ? axisTitle.x : '',
      y_str: yColoumName.length > 1 ? yColoumName.join('/') : yColoumName.join('')
    };
  }

  chartExcelDownload() {
    const { chartData, axisTitle } = this.props.config;
    const payload = this.getChartDownloadData(chartData, axisTitle);
    this.props.dispatch({
      type: 'global/getChartExport',
      payload,
    });
  }

  getPngChartDownloadData(chartData: any, chart: any) {
    return {
      file_name: chartData.title,
      type: 'image/png',
      svg: chart.chart.getSVG(),
      scale: 2,
      width: 1200,
      height: 800,
    };
  }

  chartPngDownload() {
    const { chartData } = this.props.config;
    const payload = this.getPngChartDownloadData(chartData, this.refs.ABSSVGChart);
    this.props.dispatch({
      type: 'global/getChartPng',
      payload,
    });
  }

  chartBgWhitePngDownload() {
    const { chartData } = this.props.config;
    const payload = this.getPngChartDownloadData(chartData, this.refs.ABSWhiteSVGChart);
    this.props.dispatch({
      type: 'global/getChartPng',
      payload,
    });
  }

  renderDownload(hideDownload?: boolean) {
    if (hideDownload) {
      return null;
    } else {
      return (
        <div className="abs-chart-excel-download">
          <ABSIconTooltip
            text=""
            type="cloud-download"
            width={113}
            placement={'bottomLeft'}
            details={this.renderDownLoadDetails()}
            overlayClassName="tooltip-container"
          />
        </div>
      );
    }
  }

  chartDetailDownload() {
    const { chartDetailUrl } = this.props.config;
    this.props.dispatch({
      type: 'global/getChartDetailExport',
      payload: chartDetailUrl,
    });
  }

  // 是否显示详细数据菜单
  renderDetailInfo() {
    const { chartDetailUrl } = this.props.config;

    if (!chartDetailUrl) {
      return null;
    }
    return (
      <ABSIconText className="download-container-img-excel" icon="xls" text="详细数据" onClick={() => this.chartDetailDownload()} />
    );
  }

  // 是否显示详细数据菜单
  renderPngExport() {
    const { hidePngExport } = this.props;

    if (hidePngExport) {
      return null;
    }
    return (
      <>
        <ABSIconText className="download-container-img-png" icon="pic" text="黑底图片" onClick={() => this.chartPngDownload()} />
        <ABSIconText className="download-container-img-png" icon="pic" text="白底图片" onClick={() => this.chartBgWhitePngDownload()} />
      </>
    );
  }

  renderDownLoadDetails() {
    // const { chartDetailUrl } = this.props.config;
    return (
      <div className="download-container">
        <ABSIconText className="download-container-img-excel" icon="xls" text="作图数据" onClick={() => this.chartExcelDownload()} />
        {/* {this.renderDetailInfo()} */}
        {this.renderPngExport()}
      </div>
    );
  }

  renderEnlarge(config: any, hideEnlarge?: boolean) {
    if (hideEnlarge || !config) {
      return null;
    } else {
      return (
        <div className="chart-magnifier-icon">
          <ABSIconText
            icon="magnifier"
            text=""
            onClick={() => this.onMganifierChart(config.title.text)}
          />
        </div>
      );
    }
  }

  renderSelectButton() {
    let refs: any = this.refs;
    if (refs.ABSChart) {
      let result = refs.ABSChart.chart;
      if (result.series.length > 0) {
        if (this.state.isSelectAll) {
          result.series.forEach(item => {
            item.hide();
          });
        } else {
          result.series.forEach(item => {
            item.show();
          });
        }
        this.setState({ isSelectAll: !this.state.isSelectAll });
      }
    }
  }

  onMganifierChart(title: string) {
    if (this.modal) {
      this.modal.setState({ visible: true });
      const params = {
        title_str: title,
        url: window.location.href
      };
      this.props.dispatch({
        type: 'global/getChartZoom',
        payload: params,
      });
    }
  }

  render() {
    const { config, callback, loading, hideDownload, hideEnlarge, xAxisDisabled, yAxisLeftDisabled, hideMagnifierPngDownload, hideRangeFilter } = this.props;

    if (config == null || config === undefined) {
      return null;
    }

    if (loading) {
      return <ABSLoading />;
    }
    
    const enLargeConfig = ChartUtils.getEnLargeConfig(_.cloneDeep(config));
    const configSVG = ChartUtils.getChartSVGConfig(_.cloneDeep(config));

    // 设置白底图片下载配置
    const configBgWhiteSVG = ChartUtils.getBgWhiteConfig(_.cloneDeep(configSVG));

    const afterRender = (chart) => {
      // 去除SVG标题letterSpacing样式
      _.set(chart, 'title.styles.letterSpacing', '0px');
    };

    const afterRender2 = (chart) => {
      // 处理数据绘图坐标轴最大值，最小值问题
      if (config.xAxisType && config.yAxisType && config.series && config.series.length > 0) {
        callback(chart, config.xAxisType, config.yAxisType);
      }
    };
    
    // const modalChart = <ReactHighcharts config={enLargeConfig} />;
    const modalChart = <Magnifier config={enLargeConfig} xAxisDisabled={xAxisDisabled} yAxisLeftDisabled={yAxisLeftDisabled} hideMagnifierPngDownload={hideMagnifierPngDownload} hideRangeFilter={hideRangeFilter}/>;
    const chartDiv = (
      <div className="abs-chart">
        {this.renderDownload(hideDownload)}
        {this.renderEnlarge(enLargeConfig, hideEnlarge)}
        <ReactHighcharts config={config} ref="ABSChart" callback={afterRender2} />
        <div style={{ display: 'none' }}>
          <ReactHighcharts config={configSVG} callback={afterRender} ref="ABSSVGChart" />
          <ReactHighcharts config={configBgWhiteSVG} callback={afterRender} ref="ABSWhiteSVGChart" />
        </div>
        <ABSModal
          content={modalChart}
          width={900}
          footer={null}
          ref={view => this.modal = view}
          wrapClassName="enlarge-container"
        />
        {/* <button onClick={this.renderSelectButton} className="select-all">{this.state.isSelectAll ? 'yes' : 'no'}</button> */}
      </div>
    );
    if (!config.series
      || config.series.length === 0
      || (config.series.length === 1 && config.series[0].data.length === 0)) {
      if (config.title) {
        return (
          <div className="no-chart-data">
            <p className="abs-chart-title">{config.title.text}</p>
            <ABSNoContent />
          </div>
        );
      } else {
        return (
          <div className="no-chart-data">
            <ABSNoContent />
          </div>
        );
      }
    }
    return <div style={{ width: '100%' }}>{chartDiv}</div>;
  }
}
export default connect()(ABSChart); 