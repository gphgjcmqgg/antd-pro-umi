import * as React from 'react';
import ReactHighcharts from 'react-highcharts';
import HighchartMore from 'highcharts/highcharts-more';
import Exporting from 'highcharts/modules/exporting';
import Heatmap from 'highcharts/modules/heatmap';
import ChartTheme from '../chartTheme';
import ABSIconTooltip from '../../../components/ABSIconTooltip';
import ABSIconText from '../../../components/ABSIconText';
import { connect } from 'dva';
import './index.less';
import _ from 'lodash';
import RangeFilter, { IRange } from './RangeFilter';
import ChartUtils from '../chartUtils';
import { getChartData }  from './utils';

HighchartMore(ReactHighcharts.Highcharts);
Heatmap(ReactHighcharts.Highcharts);
Exporting(ReactHighcharts.Highcharts);
ReactHighcharts.Highcharts.setOptions(ChartTheme);

interface IMagnifierProps {
  dispatch?: any;
  config: any;
  xAxisDisabled?: boolean;
  yAxisLeftDisabled?: boolean;
  hideMagnifierPngDownload?: boolean;
  hideRangeFilter?: boolean;
}
interface IMagnifierState {
  chart: any;
  orgChart: any;
  range: IRange;
  chartRepeatRender: boolean;
}
const initialData: IRange = {
  title: '',
  xMin: '',
  xMax: '',
  yMin: 0,
  yMax: 0,
  ySubMin: 0,
  ySubMax: 0,
};
class Magnifier extends React.PureComponent<IMagnifierProps, IMagnifierState> {
  private unit: number[] = [1, 1];
  private isSubYAxis: boolean;
  private isRangeFilter: boolean;
  constructor(props: any) {
    super(props);
    const { config } = props;
    this.state = {
      chart: config,
      orgChart: config,
      range: initialData,
      chartRepeatRender: false,
    };
  }

  componentWillReceiveProps(nextProps: any) {
    // 处理y轴单位
    if (this.isRangeFilter) {
      this.unit = this.unitFormat(nextProps.config);
      this.isSubYAxis = this.unit[1] !== 0;
    }
    this.setState({chart : nextProps.config});
  }
  componentDidMount() {
    // TODO HERE
    const { config } = this.props;
    this.isRangeFilter = this.isRenderRangeFilter(config.series);
    if (this.isRangeFilter) {
      this.unit = this.unitFormat(config);
      this.isSubYAxis = this.unit[1] !== 0;
    }
    this.setState({chart : config});
  }
  render() {
    const { chart, range } = this.state;
    const { xAxisDisabled, yAxisLeftDisabled, hideMagnifierPngDownload } = this.props;
    // 处理y轴单位
    range.yMin = range.yMin / this.unit[0];
    range.yMax = range.yMax / this.unit[0];
    range.ySubMin = range.ySubMin / (this.isSubYAxis ? this.unit[1] : 1);
    range.ySubMax = range.ySubMax / (this.isSubYAxis ? this.unit[1] : 1);
    const rangeArea = this.isRangeFilter ?
      <RangeFilter range={range} updateChart={this.updateChart} xType={chart.xAxis.xType} isSubYAxis={this.isSubYAxis} xAxisDisabled={xAxisDisabled} yAxisLeftDisabled={yAxisLeftDisabled}/> : null;
    const configSVG = ChartUtils.getChartSVGConfig(_.cloneDeep(chart));
    const configBgWhiteSVG = ChartUtils.getBgWhiteConfig(_.cloneDeep(configSVG));
    return (
      <div className="magnifierContainer">
        {this.renderDownload(hideMagnifierPngDownload)}
        {rangeArea}
        <ReactHighcharts config={chart} callback={this.afterRender} ref="ABSChart" />
        <div style={{ display: 'none' }}>
          <ReactHighcharts config={configSVG} callback={this.afterRender2} ref="ABSSVGChart" />
          <ReactHighcharts config={configBgWhiteSVG} callback={this.afterRender2} ref="ABSWhiteSVGChart" />
        </div>
      </div>
    );
  }
  updateChart = (range: IRange) => {
    let temp = _.cloneDeep(range);
    range.yMin = range.yMin * this.unit[0];
    range.yMax = range.yMax * this.unit[0];
    range.ySubMin = range.ySubMin * this.unit[1];
    range.ySubMax = range.ySubMax * this.unit[1];

    const { orgChart } = this.state;
    temp.yMin = temp.yMin * this.unit[0];
    temp.yMax = temp.yMax * this.unit[0];
    if (this.isSubYAxis && orgChart.yAxis.length > 1) {
      temp.ySubMin = temp.ySubMin * this.unit[1];
      temp.ySubMax = temp.ySubMax * this.unit[1];
    }

    const updateChart = _.cloneDeep(orgChart);
    if (orgChart.xAxis.xType === 'datetime') {
      getChartData(updateChart, temp.xMin , temp.xMax);
    } else {
      updateChart.xAxis.min = temp.xMin;
      updateChart.xAxis.max = temp.xMax;  
    }
    
    updateChart.title.text = temp.title;
    
    if (updateChart.yAxis.length > 1) {
      updateChart.yAxis[0].min = temp.yMin;
      updateChart.yAxis[0].max = temp.yMax;
      if (this.isSubYAxis) {
        updateChart.yAxis[1].min = temp.ySubMin;
        updateChart.yAxis[1].max = temp.ySubMax;
      }
    } else {
      updateChart.yAxis.min = temp.yMin;
      updateChart.yAxis.max = temp.yMax;
    }

    this.setState({ chart: updateChart, range: range });
  }
  afterRender = (highchart: any) => {
    const { chartRepeatRender } = this.state;
    if (!chartRepeatRender) {
      this.updateRange(highchart);
    }
    // this.chartData = highchart;
    this.setState({ chartRepeatRender: true });
  }

  afterRender2 = (highchart: any) => {
    // 去除SVG标题letterSpacing样式
    _.set(highchart, 'title.styles.letterSpacing', '0px');
  }

  updateRange = (highchart: any) => {
    // 处理坐标轴最大值，最小值问题
    const { chart, range } = this.state;
    let temp = _.cloneDeep(range);
    if (chart.series && chart.series.length > 0) {
      temp.title = highchart.title.textStr;
      temp.xMin = highchart.xAxis[0].min;
      temp.xMax = highchart.xAxis[0].max;
      temp.yMin = highchart.yAxis[0].min;
      temp.yMax = highchart.yAxis[0].max;
      if (highchart.yAxis.length > 1 && chart.yAxis.length > 1 && chart.yAxis[1].title) {
        temp.ySubMin = highchart.yAxis[1].min;
        temp.ySubMax = highchart.yAxis[1].max;
      }
    }
    this.setState({ range: temp });
  }
  renderDownload(hideMagnifierPngDownload?: boolean) {
    if (hideMagnifierPngDownload) {
      return null;
    } else {
      return (
        <div className="abs-chart-download">
          <ABSIconTooltip
            text=""
            type="cloud-download"
            width={113}
            placement={'bottomLeft'}
            details={this.renderPngExport()}
            overlayClassName="tooltip-container"
          />
        </div>
      );
    }
  }
  // 单位转化 - 左纵坐标，右纵坐标
  unitFormat(config: any) {
    let yAxis = config.yAxis;
    if (Array.isArray(yAxis)) {
      if (yAxis.length > 1) {
        if (yAxis[1].title) {
          return [this.getUnit(yAxis[0].title.text), this.getUnit(yAxis[1].title.text)];
        } else {
          return [this.getUnit(yAxis[0].title.text), 0];
        }
      } else if (yAxis.length === 1) {
        return [this.getUnit(yAxis[0].title.text), 0];
      }
      return [1, 0];
    } else {
      return [this.getUnit(yAxis.title.text), 0];
    }
  }
  // 图片数据下载菜单
  renderPngExport() {
    return (
      <div className="download-container">
        <ABSIconText
          className="download-container-img-png"
          icon="pic"
          text="黑底图片"
          onClick={() => this.chartPngDownload()}
        />
        <ABSIconText
          className="download-container-img-png"
          icon="pic"
          text="白底图片"
          onClick={() => this.chartBgWhitePngDownload()}
        />
      </div>
    );
  }
  chartPngDownload() {
    const { config } = this.props;
    const payload = this.getPngChartDownloadData(config.chartData, this.refs.ABSSVGChart);
    this.props.dispatch({
      type: 'global/getChartPng',
      payload,
    });
  }
  chartBgWhitePngDownload() {
    const { config } = this.props;
    const payload = this.getPngChartDownloadData(config.chartData, this.refs.ABSWhiteSVGChart);
    this.props.dispatch({
      type: 'global/getChartPng',
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
  getUnit(text: string) {
    let unit = 1;
    if (text) {
      if (text.indexOf('亿') !== -1) {
        unit = 100000000;
      } else if (text.indexOf('万') !== -1) {
        unit = text.indexOf('百') !== -1 ? 1000000 : 10000;
      }
    }
    return unit;
  }
  // 是否显示rangeFilter筛选区域
  isRenderRangeFilter(series: any): boolean {
    let isRange: boolean = true;
    const { hideRangeFilter } = this.props;
    if (hideRangeFilter) { return false; }
    if (Array.isArray(series) && series.length > 0) {
      if (series[0].type 
        && (series[0].type === 'pie' 
        || series[0].type === 'bar' 
        || series[0].type === 'heatmap')) {
        isRange = false;
      }
    }
    return isRange;
  }
}
export default connect()(Magnifier); 