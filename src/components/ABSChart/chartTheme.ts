export const chartColors = [
  '#2A9CFF', '#4258EB', '#00D5BF', '#00C773', '#BFD52A', '#F19603',
  '#EB5F03', '#C761FF', '#4664E3', '#00B8DF', '#29DA8C', '#AFD52A',
  '#FBC902', '#CF50CD', '#713FFF', '#1486F0', '#00C354', '#DBC92C'
];

export const chartColors2 = [
  '#2A9CFF', '#F19603', '#EB5F03', '#CF50CD', '#8A3FFF', '#1486F0',
  '#00D5BF', '#29DA8C', '#FBC902', '#EB5F03', '#CF50CD', '#8A3FFF',
  '#4258EB', '#00C773', '#DBC92C', '#F19603', '#CF50CD', '#713FFF'
];

export const specialColor = '#FC9023';
export const heatmapColors = ['#009AE3', '#027EBB', '#056392', '#09486A', '#0B2D41', '#0A1B27'];
export const backgroundColor = '#0A0C0F';
export const tickColor = '#1F232B';

const ChartTheme = {
  colors: chartColors,
  chart: {
    backgroundColor: {
      linearGradient: {
        x1: 0,
        y1: 0,
        x2: 1,
        y2: 1,
      },
      stops: [
        [0, backgroundColor],
        [1, backgroundColor],
      ],
    },
    style: {
      fontFamily: '"Microsoft YaHei", 微软雅黑, 宋体, Verdana, Arial, Helvetica, sans-serif',
      // height: '400px',
    },
    plotBorderColor: '#606063',
    borderWidth: 1,
    borderColor: '#2B3E55',
    spacingTop: 20,
    spacingLeft: 35,
    spacingRight: 35
  },
  title: {
    style: {
      color: '#FFE2B2',
      fontSize: '14px',
      lineHeight: '14px',
      fontFamily: `'Microsoft YaHei-Bold !important', 'Microsoft YaHei !important'`,
      fontWeight: 'bold',
      letterSpacing: '0.61px',
      textAlign: 'center',
    },
    // margin: 18
  },
  subtitle: {
    style: {
      color: '#E0E0E3',
      textTransform: 'uppercase',
    },
  },
  exporting: {
    enabled: false,
  },
  xAxis: {
    gridLineColor: '#313742',
    gridLineWidth: 1,
    labels: {
      style: {
        color: '#FFF',
        fontSize: '12px',
      },
      autoRotation: [-30],
      y: 14,
    },
    lineColor: '#313742',
    minorGridLineColor: '#505053',
    // tickColor: '#999',
    // tickLength: 4,
    tickLength: 0,
    title: {
      style: {
        color: '#A0A0A3',
        fontSize: '14px',
      },
    },
    plotBands: {
      color: '#202020'
    },
  },
  yAxis: {
    gridLineColor: '#313742',
    gridLineWidth: 1,
    labels: {
      style: {
        color: '#FFF',
        fontSize: '12px',
      },
      x: -6,
    },
    lineWidth: 1,
    lineColor: '#313742',
    minorGridLineColor: '#313742',
    tickColor: tickColor,
    tickWidth: 1.5,
    tickLength: 0,
    title: {
      enabled: !1,
      style: {
        color: '#999',
        fontSize: '12px',
      },
    },
  },
  tooltip: {
    backgroundColor: 'rgba(33,38,45,0.90)',
    style: {
      color: '#F0F0F0',
      fontSize: '12px',
    },
  },
  plotOptions: {
    // series: {
    //   marker: {
    //     enabled: true,
    //     lineColor: '#202020',
    //     symbol: 'circle',
    //     radius: 3,
    //     lineWidth: 0
    //   },
    //   // lineWidth: 1
    // },
    scatter: {
      marker: {
        enabled: true,
        lineColor: '#202020',
        symbol: 'circle',
        radius: 3,
        lineWidth: 0
      },
      // lineWidth: 1
    },
    spline: {
      marker: {
        enabled: false,
        lineColor: '#202020',
        symbol: 'circle',
        radius: 3,
        lineWidth: 0
      },
      lineWidth: 3
    },
    line: {
      marker: {
        enabled: false,
        lineColor: '#202020',
        symbol: 'circle',
        radius: 3,
        lineWidth: 0
      },
    },
    boxplot: {
      fillColor: '505053',
    },
    candlestick: {
      lineColor: 'white',
    },
    errorbar: {
      color: 'white',
    },
  },
  legend: {
    margin: 10,
    itemStyle: {
      color: '#FFF',
      fontSize: '12px',
      fontWeight: null,
    },
    itemHoverStyle: {
      color: '#FFF',
    },
    itemHiddenStyle: {
      color: '#606063',
    },
    maxHeight: 72,
    symbolRadius: 6,
    itemMarginTop: 5,
    navigation: {
      arrowSize: 8,
      style: {
        color: 'white'
      }
    },
    y: -20
  },
  credits: {
    style: {
      color: '#999',
      fontSize: '12px',
    },
  },
  labels: {
    style: {
      color: '#707073',
      fontSize: '12px',
    },
    position: {
      x: -20,
      y: -10
    }
  },
  drilldown: {
    activeAxisLabelStyle: {
      color: '#F0F0F3',
    },
    activeDataLabelStyle: {
      color: '#F0F0F3',
    },
  },
  navigation: {
    buttonOptions: {
      symbolStroke: '#DDDDDD',
      theme: {
        fill: '#47423C',
      },
    },
  },
  rangeSelector: {
    buttonTheme: {
      fill: '#514C44',
      stroke: '#000000',
      style: {
        color: '#CCC',
      },
      states: {
        hover: {
          fill: '#707073',
          stroke: '#000000',
          style: {
            color: 'white',
          },
        },
        select: {
          fill: '#727272',
          stroke: '#000000',
          style: {
            color: 'white',
          },
        },
      },
    },
    inputBoxBorderColor: '#707073',
    inputStyle: {
      backgroundColor: '#202020',
      color: 'silver',
    },
    labelStyle: {
      color: 'silver',
    },
  },
  navigator: {
    handles: {
      backgroundColor: '#666',
      borderColor: '#AAA',
    },
    outlineColor: '#CCC',
    maskFill: 'rgba(255,255,255,0.1)',
    series: {
      color: '#7798BF',
      lineColor: '#B7AFA5',
    },
    xAxis: {
      gridLineColor: '#505053',
    },
  },
  scrollbar: {
    barBackgroundColor: '#727272',
    barBorderColor: '#727272',
    buttonArrowColor: '#CCC',
    buttonBackgroundColor: '#606063',
    buttonBorderColor: '#606063',
    rifleColor: '#FFF',
    trackBackgroundColor: '#514C44',
    trackBorderColor: '#514C44',
  },
  legendBackgroundColor: 'rgba(0, 0, 0, 0.5)',
  background2: '#505053',
  dataLabelsColor: '#B0B0B3',
  textColor: '#C0C0C0',
  contrastTextColor: '#F0F0F3',
  maskColor: 'rgba(255,255,255,0.3)',
};

export default ChartTheme;