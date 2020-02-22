import echarts from 'echarts';
import routeConfig from '../../abs/config/routeConfig';

interface ICategoryItem {
  id?: string;
  name?: string;
}

function echartRelationship(data: any, isJustMe: boolean = true) {
  var myChart = echarts.init(document.getElementById('abs-expert-chain'));

  // if (!vm.userInfo.IsPreview) {
  //   isJustMe = false;
  // }

  // var url = '../UserRelationship/Relationship/' + vm.userInfo.UserId;
  var graph = data;
  graph.links = data.links;
  graph.nodes = data.notes;

  var categories: Array<ICategoryItem> = [];

  graph.nodes.forEach(function(node: any, index: number) {
    if (node.category === 3) {
      node.category = 0;
    }
    var category = node.category;
    if (index === 0) {
      categories.push({ id: category });
    } else {
      if (category !== categories[categories.length - 1].id) {
        categories.push({ id: category });
      }
    }
  });

  categories = categories.map((category, index) => {
    switch (index) {
      case 0:
        category.name = '与TA有关的人';
        break;
      case 1:
        category.name = 'TA';
        break;
      case 2:
        category.name = '我';
        break;
      case 3:
        category.name = '其他与我有关的人';
        break;
      default:
        break;
    }
    return category;
  });

  var orangeCircle = {
    normal: {
      //    opacity: 0.96
      color: {
        type: 'linear',
        x: 0,
        y: 0,
        x2: 0,
        y2: 1,
        colorStops: [
          {
            offset: 0,
            color: '#FC9023' // 0% 处的颜色
          },
          {
            offset: 1,
            color: '#FC9023' // 100% 处的颜色
          }
        ],
        globalCoord: false // 缺省为 false
      }
    }
  };

  var gradientCircle = {
    normal: {
      //    opacity: 0.96
      color: {
        type: 'linear',
        x: 0,
        y: 0,
        x2: 0,
        y2: 1,
        colorStops: [
          {
            offset: 0,
            color: '#10B78B' // 0% 处的颜色
          },
          {
            offset: 1,
            color: '#0276CA' // 100% 处的颜色
          }
        ],
        globalCoord: false // 缺省为 false
      }
    }
  };
  var blueCircle = {
    normal: {
      //    opacity: 0.96
      color: {
        type: 'linear',
        x: 0,
        y: 0,
        x2: 0,
        y2: 1,
        colorStops: [
          {
            offset: 0,
            color: '#4F80D9' // 0% 处的颜色
          },
          {
            offset: 1,
            color: '#0276CA' // 100% 处的颜色
          }
        ],
        globalCoord: false // 缺省为 false
      }
    }
  };

  graph.nodes.forEach(function(node: any, index: number) {
    let blueCircleCount = 0;
    node.symbolSize = 30;
    node.tooltip = {
      show: false
    };
    if (!isJustMe) {
      if (node.des !== '') {
        node.tooltip = {
          show: true,
          formatter: function() {
            return node.des;
          }
        };
      }
    }

    // Use random x, y
    node.x = node.y = null;
    node.value = index;
    // if (node.value%2==0) node.value = index * 1000;
    if (node.name.length > 3) {
      node.symbolSize = 45;
    } else if (node.name.length > 2) {
      node.symbolSize = 35;
    }
    if (index === 0) {
      node.symbolSize = 50;
      node.name = '我';
      node.category = 1;
    }

    if (!isJustMe) {
      if (index === 0 || index === 1) {
        node.symbolSize = 55;
      }
      if (index === 0) {
        node.symbolSize = 46;
        node.x = 500;
        node.y = 150;
        
      }
    }

    if (node.category === 1) {
      node.label = {
        normal: { fontSize: 16 }
      };
      node.itemStyle = orangeCircle;
    } else {
      if (Math.random() > 0.5 && blueCircleCount < 3) {
        node.itemStyle = blueCircle;
        blueCircleCount++;
      } else {
        node.itemStyle = gradientCircle;
      }
    }

    node.draggable = true;
  });

  // graph.links.forEach(function(link, index) {
  //   // link.lineStyle = { normal: { color: 'white' } };
  // });
  var option = {
    title: {
      text: 'CNABS',
      link: routeConfig.chartCnabsLink,
      subtext: 'description',
      top: 'bottom',
      right: -20,
      textStyle: {
        color: '#b3b3b3',
        fontSize: 12
      }
    },
    tooltip: {},
    circular: { rotateLabel: true },
    animation: true,
    // animationThreshold: 2000,
    // animationDuration: 1000,
    // animationEasing: 'cubicOut',
    // animationDelay: 0,
    // animationDurationUpdate: 300,
    // animationEasingUpdate: 'cubicOut',
    // animationDelayUpdate: 0,
    series: [
      {
        name: 'CNABS',
        type: 'graph',
        layout: 'force',
        force: {
          repulsion: [60, 120],
          edgeLength: [1, 100],
          gravity: 0.1
        },
        zoom: 1.5,
        data: graph.nodes,
        links: graph.links,
        categories: categories,
        roam: true,
        itemStyle: orangeCircle,
        symbolSize: 50,
        label: {
          normal: {
            position: 'inside',
            show: true,
            textStyle: {
              color: 'white'
            },
            formatter: function(node: any) {
              return node.name;
            }
          }
        }
      }
    ]
  };

  if (graph.links.length === 0 && isJustMe === true && graph.nodes.length > 0) {
    option.series = [
      {
        name: 'CNABS',
        type: 'graph',
        layout: 'force',
        symbolSize: 50,
        zoom: 1.5,
        data: [
          {
            name: graph.nodes[0].name,
            tooltip: {
              show: true,
              formatter: function() {
                return '您目前没有与任何人建立链接， <br />请完善您的专家履历';
              }
            }
          }
        ],
        itemStyle: orangeCircle,
        force: {
          repulsion: [60, 120],
          edgeLength: [1, 100],
          gravity: 0.1
        },
        links: graph.links,
        categories: categories,
        roam: true,
        label: {
          normal: {
            position: 'inside',
            show: true,
            textStyle: {
              color: 'white'
            },
            formatter: function(node: any) {
              return node;
            }
          }
        }
      }
    ];
  }

  // if (graph.links.length === 0 && !isJustMe) {
  //   option.series = [
  //     {
  //       name: 'CNABS',
  //       type: 'graph',
  //       layout: 'force',
  //       symbolSize: 50,
  //       links: graph.links,
  //       zoom: 1.5,
  //       force: {
  //         repulsion: [80],
  //         edgeLength: [1, 100],
  //         gravity: 0.1
  //       },
  //       data: [
  //         {
  //           name: graph.nodes[0].name,
  //           id: graph.nodes[0].id,
  //           category: 1,
  //           symbolSize: 46,
  //           x: 500,
  //           y: 150,
  //           value: 0,
  //           tooltip: {
  //             show: true,
  //             formatter: function() {
  //               return '您目前没有与任何人建立链接， <br />请完善您的专家履历';
  //             }
  //           }
  //         },
  //         {
  //           name: graph.nodes[1].name,
  //           id: graph.nodes[1].id,
  //           category: 1,
  //           symbolSize: 46,
  //           x: 650,
  //           y: 150,
  //           value: 10,
  //           tooltip: {
  //             show: true,
  //             formatter: function() {
  //               return '您目前没有与任何人有关系， <br />请完善您的专家履历';
  //             }
  //           }
  //         }
  //       ],
  //       itemStyle: orangeCircle,
  //       categories: categories,
  //       roam: true,
  //       label: {
  //         normal: {
  //           position: 'inside',
  //           show: true,
  //           textStyle: {
  //             color: 'white'
  //           },
  //           formatter: function (node: any) {
  //             if (new RegExp(/等\d+位专家/g).test(node.name)) {
  //               return node.name.replace(/(\d+)/g, '$1\n');
  //             } else {
  //               return node.name;
  //             }
  //           },
  //         }
  //       }
  //     }
  //   ];
  // }

  myChart.setOption(option);

  function focus(param: any) {
    var optionData: any = param.data;
    if (optionData != null) {
      if (
        optionData.id &&
        optionData.category === 0 &&
        optionData.id !== 'oters'
      ) {
        window.open(
          `${routeConfig.expertPreview}?id=${optionData.id}`,
          '_blank'
        );
      }
    }
  }
  myChart.on('click', focus);
}

// function echartRelationship(data: any) {
//   var myChart = echarts.init(document.getElementById('echartRelation'));

//   // 指定图表的配置项和数据
//   var option = {
//     title: {
//       text: 'ECharts 入门示例'
//     },
//     tooltip: {},
//     legend: {
//       data: ['销量']
//     },
//     xAxis: {
//       data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
//     },
//     yAxis: {},
//     series: [{
//       name: '销量',
//       type: 'bar',
//       data: [5, 20, 36, 10, 10, 20]
//     }]
//   };

//   // 使用刚指定的配置项和数据显示图表。
//   myChart.setOption(option);
// }
export default echartRelationship;
