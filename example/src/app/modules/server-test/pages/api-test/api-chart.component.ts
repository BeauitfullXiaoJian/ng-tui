import { Component, Output, EventEmitter, Input } from '@angular/core';
import { EChartsInstance } from 'ng-tui';
import { RequestService, GlobalService } from 'src/app/cores/services';

@Component({
    selector: 'app-api-chart',
    templateUrl: 'api-chart.component.html'
})
export class ApiChartComponent {

    @Input() apiTest: { url: string, method: string, params: string };

    @Output() close = new EventEmitter<void>();

    chart: { echartsInstance: EChartsInstance, echarts: any };

    backgroundColors = [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)'
    ];

    borderColors = [
        'rgba(255,99,132,1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)'
    ];

    lineOption: any = {
        grid: {
            left: 50,
            right: 10,
        },
        legend: {
            data: ['数据'],
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'cross',
                label: {
                    backgroundColor: '#6a7985'
                }
            }
        },
        toolbox: {
            feature: {
                saveAsImage: {
                    pixelRatio: 2
                }
            }
        },
        xAxis: {
            boundaryGap: false,
            data: [],
        },
        yAxis: {
            axisLine: {
                show: true

            },
            axisTick: {
                show: true
            },
            axisLabel: {
                textStyle: {
                    color: '#999'
                }
            }
        },
        dataZoom: [
            {
                type: 'inside'
            }
        ],
        series: [
            {
                name: '数据',
                type: 'line',
                itemStyle: {
                    normal: { color: '#3e9cff' }
                },
                areaStyle: {},
                data: []
            }
        ]
    };

    constructor(
        private request: RequestService,
        private global: GlobalService
    ) { }

    sendRequest() {
        const headers = this.global.getValue('apiTest.headers', {});
        const request = this.request.withoutHeader.withHeader(headers);
        const method = this.apiTest.method.toLowerCase();
        request[method](this.request.url, JSON.parse(this.apiTest.params || '{}'));
    }
}
