/**
 * Created by mt on 2017-4-26.
 */
$(function () {
        //下拉菜单
    $('#site-greenhouse').on('click', function () {
        var _seft = $(this);
        var obutton = _seft.find('button').find('.txt');
        _seft.find('li').on('click', function(ev){
            obutton.html($(this).html());
        })
    });
    $('#sensor').on('click', function () {
        var _seft = $(this);
        var obutton = _seft.find('button').find('.txt');
        _seft.find('li').on('click', function(ev){
            obutton.html($(this).html());
        })
    });
    $('#sampling').on('click', function () {
        var _seft = $(this);
        var obutton = _seft.find('button').find('.txt');
        _seft.find('li').on('click', function(ev){
            obutton.html($(this).html());
        })
    });
    //日期范围限制
    var start = {
        skinCell: 'jedategreen',
        format: 'YYYY-MM-DD ',
        minDate: $.nowDate(0), //设定最小日期为当前日期
        maxDate: '2099-06-16 23:59:59', //最大日期
        choosefun: function(elem,datas){
            end.minDate = datas; //开始日选好后，重置结束日的最小日期
        }
    };
    var end = {
        skinCell: 'jedategreen',
        format: 'YYYY-MM-DD ',
        minDate: $.nowDate(0), //设定最小日期为当前日期
        maxDate: '2099-06-16 23:59:59', //最大日期
        choosefun: function(elem,datas){
            start.maxDate = datas; //将结束日的初始值设定为开始日的最大日期
        }
    };
    //时间控件调用
    $("#start").jeDate(start);
    $("#end").jeDate(end);
    //  scrollbar
    $("#report").mCustomScrollbar({
        theme:"minimal"
    });
    // 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(document.getElementById('chart-container'));
    // 指定图表的配置项和数据（温度实时）
    var liveTempOption = {
        tooltip : {
            trigger: 'item',
            formatter: function (params) {
                return params.name + '<br/>' + params.value+'°'
            }
        },

        xAxis: { //X轴
            type: 'category',
            axisLine:{
                lineStyle:{
                    type:'dashed',
                    color:'#DDD'
                }
            },
            axisTick:{
                inside:true
            },
            axisLabel:{
                textStyle:{
                    color: '#333'
                }
            },
            data : []    //先设置数据值为空
        },
        yAxis: {
            type: 'value',
            axisLine:{
                lineStyle:{
                    type:'dashed',
                    color:'#DDD'
                }
            },
            splitLine:{
                show: true,
                lineStyle:{
                    type:'dashed',
                    color:'#efefef'
                }
            },
            axisTick:{
                inside:true
            },
            axisLabel:{
                formatter: '{value}°',   //控制输出格式
                textStyle:{
                    color: '#333'
                }
            }
        },
        series: {
            type:'scatter',    //散点图表示（对应的温度展示）
            symbol:'circle',    //设置图中表示每个坐标点的符号
            itemStyle:{
                normal : {
                    color: '#79cfae'
                }
            },
            markPoint:{
                symbolSize:70,
                itemStyle:{
                    normal:{
                        label:{
                            show: true,
                            formatter: function (params) {
                                console.log(params);
                                return params.value+'°';
                            }
                        }
                    }
                },
                data : [
                    {type : 'min', name: '最小值'}
                ]
            },
            data : []    //先设置数据值为空
        }
    };
    // 指定图表的配置项和数据（温度历史）
    var historyTempOption = {
        tooltip: {
            trigger: 'axis'
        },
        legend: {    //图表上方的类别显示
            left:'left',
            data:[
                {
                    name:'最高温度--选每日最高的温度记录',
                    icon:'circle'
                },
                {
                    name:'最低温度--选每日最低的温度记录',
                    icon:'circle'
                },
                {
                    name:'平均温度--选每日2点、8点、14点、20点4个点气温平均',
                    icon:'circle'
                }],
            itemGap: 20 //图例每项之间的间隔
        },
        color:[
            '#79cfae',    //最高温度曲线颜色
            '#fc6b6b',    //最低温度曲线颜色
            '#79b0cf'    //平均温度曲线颜色
        ],
        xAxis: { //X轴
            type: 'category',
            axisLine:{
                lineStyle:{
                    type:'dashed',
                    color:'#DDD'
                }
            },
            axisTick:{
                inside:true
            },
            axisLabel:{
                textStyle:{
                    color: '#333'
                }
            },
            data : [1,2,3,4,5]    //先设置数据值为空
        },
        yAxis: {
            type: 'value',
            axisLine:{
                lineStyle:{
                    type:'dashed',
                    color:'#DDD'
                }
            },
            splitLine:{
                show: true,
                lineStyle:{
                    type:'dashed',
                    color:'#efefef'
                }
            },
            axisTick:{
                inside:true
            },
            axisLabel:{
                formatter: '{value}°',  //控制输出格式
                textStyle:{
                    color: '#333'
                }
            }
        },
        series:[
            {
                name:'最高温度--选择每日最高的温度记录',
                type:'line',    //折线图表示（生成温度曲线）
                symbol:'circle',    //设置折线图中表示每个坐标点的符号
                data:[],        //数据值通过Ajax动态获取
                smooth:true
            },
            {
                name:'最低温度--选每日最低的温度记录',
                type:'line',    //折线图表示（生成温度曲线）
                symbol:'circle',    //设置折线图中表示每个坐标点的符号
                data:[],        //数据值通过Ajax动态获取
                smooth:true
            },
            {
                name:'平均温度--选每日2点、8点、14点、20点4个点气温平均',
                type:'line',    //折线图表示（生成温度曲线）
                symbol:'circle',    //设置折线图中表示每个坐标点的符号
                smooth:true,
                markPoint:{
                    symbolSize:70,
                    itemStyle:{
                        normal:{
                            label:{
                                show: true,
                                formatter: function (params) {
                                    console.log(params);
                                    return params.value+'°';
                                }
                            }
                        }
                    },
                    data : [
                        {type : 'min', name: '最小值'}
                    ]
                },
                data:[]        //数据值通过Ajax动态获取
            }
        ]
    };
    // 指定图表的配置项和数据（湿度实时）
    var liveHumsOption = {
        tooltip : {
            trigger: 'item',
            formatter: function (params) {
                return params.name + '<br/>' + params.value+'%'
            }
        },

        xAxis: { //X轴
            type: 'category',
            axisLine:{
                lineStyle:{
                    type:'dashed',
                    color:'#DDD'
                }
            },
            axisTick:{
                inside:true
            },
            axisLabel:{
                textStyle:{
                    color: '#333'
                }
            },
            data : []    //先设置数据值为空
        },
        yAxis: {
            type: 'value',
            axisLine:{
                lineStyle:{
                    type:'dashed',
                    color:'#DDD'
                }
            },
            splitLine:{
                show: true,
                lineStyle:{
                    type:'dashed',
                    color:'#efefef'
                }
            },
            axisTick:{
                inside:true
            },
            axisLabel:{
                formatter: '{value}%',   //控制输出格式
                textStyle:{
                    color: '#333'
                }
            }
        },
        series: {
            type:'scatter',    //散点图表示（对应的温度展示）
            symbol:'circle',    //设置图中表示每个坐标点的符号
            itemStyle:{
                normal : {
                    color: '#79cfae'
                }
            },
            markPoint:{
                symbolSize:70,
                itemStyle:{
                    normal:{
                        label:{
                            show: true,
                            formatter: function (params) {
                                console.log(params);
                                return params.value+'%';
                            }
                        }
                    }
                },
                data : [
                    {type : 'max', name: '最大值'}
                ]
            },
            data : []    //先设置数据值为空
        }
    };
    // 指定图表的配置项和数据（湿度历史）
    var historyHumsOption = {
        tooltip: {
            trigger: 'axis'
        },
        legend: {    //图表上方的类别显示
            left:'left',
            data:[
                {
                    name:'最高湿度--选每日最高的湿度记录',
                    icon:'circle'
                },
                {
                    name:'最低湿度--选每日最低的湿度记录',
                    icon:'circle'
                }],
            itemGap: 20 //图例每项之间的间隔
        },
        color:[
            '#79cfae',    //最高湿度曲线颜色
            '#fc6b6b'    //最低湿度曲线颜色
        ],
        xAxis: { //X轴
            type: 'category',
            axisLine:{
                lineStyle:{
                    type:'dashed',
                    color:'#DDD'
                }
            },
            axisTick:{
                inside:true
            },
            axisLabel:{
                textStyle:{
                    color: '#333'
                }
            },
            data : []    //先设置数据值为空
        },
        yAxis: {
            type: 'value',
            axisLine:{
                lineStyle:{
                    type:'dashed',
                    color:'#DDD'
                }
            },
            splitLine:{
                show: true,
                lineStyle:{
                    type:'dashed',
                    color:'#efefef'
                }
            },
            axisTick:{
                inside:true
            },
            axisLabel:{
                formatter: '{value}%',  //控制输出格式
                textStyle:{
                    color: '#333'
                }
            }
        },
        series:[
            {
                name:'最高温度--选每日最高的湿度记录',
                type:'line',    //折线图表示（生成温度曲线）
                symbol:'circle',    //设置折线图中表示每个坐标点的符号
                data:[],        //数据值通过Ajax动态获取
                smooth:true
            },
            {
                name:'最低温度--选每日最低的湿度记录',
                type:'line',    //折线图表示（生成温度曲线）
                symbol:'circle',    //设置折线图中表示每个坐标点的符号
                data:[],        //数据值通过Ajax动态获取
                smooth:true
            }
        ]
    };
    //指定图表的配置项和数据（土壤PH/EC实时、光辐射照度、CO2浓度）
    var liveOption = {
        tooltip : {
            trigger: 'item',
            formatter: function (params) {
                return params.name + '<br/>' + params.value
            }
        },
        xAxis: { //X轴
            type: 'category',
            axisLine:{
                lineStyle:{
                    type:'dashed',
                    color:'#DDD'
                }
            },
            axisTick:{
                inside:true
            },
            axisLabel:{
                textStyle:{
                    color: '#333'
                }
            },
            data : []    //先设置数据值为空
        },
        yAxis: {
            type: 'value',
            axisLine:{
                lineStyle:{
                    type:'dashed',
                    color:'#DDD'
                }
            },
            splitLine:{
                show: true,
                lineStyle:{
                    type:'dashed',
                    color:'#efefef'
                }
            },
            axisTick:{
                inside:true
            },
            axisLabel:{
                formatter: '{value}',   //控制输出格式
                textStyle:{
                    color: '#333'
                }
            }
        },
        series: {
            type:'scatter',    //散点图表示（对应的温度展示）
            symbol:'circle',    //设置图中表示每个坐标点的符号
            itemStyle:{
                normal : {
                    color: '#79cfae'
                }
            },
            data : []    //先设置数据值为空
        }
    };

    //指定图表的配置项和数据（土壤PH/EC历史、光辐射照度、CO2浓度）
    var historyOption = {
        xAxis: { //X轴
            type: 'category',
            axisLine:{
                lineStyle:{
                    type:'dashed',
                    color:'#DDD'
                }
            },
            axisTick:{
                inside:true
            },
            axisLabel:{
                textStyle:{
                    color: '#333'
                }
            },
            data : [1,2,3,4,5]    //先设置数据值为空
        },
        yAxis: {
            type: 'value',
            axisLine:{
                lineStyle:{
                    type:'dashed',
                    color:'#DDD'
                }
            },
            splitLine:{
                show: true,
                lineStyle:{
                    type:'dashed',
                    color:'#efefef'
                }
            },
            axisTick:{
                inside:true
            },
            axisLabel:{
                formatter: '{value}',  //控制输出格式
                textStyle:{
                    color: '#333'
                }
            },
            data : []    //先设置数据值为空
        },
        series:{
            type:'line',    //折线图表示（生成温度曲线）
            symbol:'circle',    //设置折线图中表示每个坐标点的符号
            color:'#79b0cf',
            data:[12,8,14,6],        //数据值通过Ajax动态获取
            smooth:true,
            itemStyle:{
                normal: {
                    color:'#79b0cf'
                }
            }
        }
    };

    //请求时获取对应的数据

    $.ajax({


        success: function () {
            //把拿到的数据填入对应的位置
            myChart.setOption({
                xAxis: {
    //                    data: dates    //填入X轴数据
                },
                series:{
    //                    data:dates     //每个点对应的数据
                }
            })
        }

    });

    //载入图表
    myChart.setOption(historyOption);
});

