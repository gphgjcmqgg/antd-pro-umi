import RouteConfig from '../../abs/config/routeConfig';
export default {
    chart: {
        style: {
            height: '400px'
        }
    },
    title: {
        text: '',
        useHTML: true
    },
    xAxis: {
        labels: {
            rotation: -35,
        },
    },
    credits: {
        href: RouteConfig.chartCnabsLink,
        text: 'CNABS',
        position: {
            x: -12,
            y: -12
        }
    },
    series: [],
};