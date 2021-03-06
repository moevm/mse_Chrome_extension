var isCorrectData = true;
var customTooltips = function (tooltip) {

    var tooltipEl = document.getElementById('chartjs-tooltip');

    if (!tooltipEl) {
        tooltipEl = document.createElement('div');
        tooltipEl.id = 'chartjs-tooltip';
        tooltipEl.innerHTML = "<table></table>";
        document.body.appendChild(tooltipEl);
        console.log("+");
    }

    if (tooltip.opacity === 0) {
        tooltipEl.style.opacity = 0;
        console.log("-");
        return;

    }

    tooltipEl.classList.remove('above', 'below', 'no-transform');
    if (tooltip.yAlign) {
        tooltipEl.classList.add(tooltip.yAlign);
        console.log("+");
    } else {
        tooltipEl.classList.add('no-transform');
        console.log("-");
    }

    function getBody(bodyItem) {
        return bodyItem.lines;
    }


    if (tooltip.body) {
        let titleLines = tooltip.title || [];
        let bodyLines = tooltip.body.map(getBody);

        let innerHtml = '<thead>';

        titleLines.forEach(function (title) {
            innerHtml += '<tr><th>' + title + '</th></tr>';
        });
        innerHtml += '</thead><tbody>';

        bodyLines.forEach(function (body, i) {
            var colors = tooltip.labelColors[i];
            var style = 'background:' + colors.backgroundColor;
            style += '; border-color:' + colors.borderColor;
            style += '; border-width: 2px';
            var span = '<span class="chartjs-tooltip-key" style="' + style + '"></span>';
            innerHtml += '<tr><td>' + span + body + '</td></tr>';
        });
        innerHtml += '</tbody>';

        var tableRoot = tooltipEl.querySelector('table');
        tableRoot.innerHTML = innerHtml;
    }

    // Display, position, and set styles for font
    tooltipEl.style.opacity = 1;
    tooltipEl.style.left = '50vw';
    tooltipEl.style.top = '80vh';
    tooltipEl.style.fontFamily = tooltip._fontFamily;
    tooltipEl.style.fontSize = tooltip.fontSize;
    tooltipEl.style.fontStyle = tooltip._fontStyle;
    tooltipEl.style.padding = tooltip.yPadding + 'px ' + tooltip.xPadding + 'px';
};
/*Function get Max Elements form two Array*/
/**
 * @return {number}
 */
function GME(x, y) {
    return (Math.max(Math.max.apply(null, x), Math.max.apply(null, y)));
}

function updateChartData(chart, solutionCount){

    let newCorrectData = [];
    let newWrongData = [];
    let step_id_buffer = STEP_ID;
    STEP_ID = getStepId(get_lesson_step()[0],get_lesson_step()[1], ACCESS_TOKEN);
    if (step_id_buffer === STEP_ID)
        buttonClicked = 1;
    //console.log("Прежний список решений = "+SOLUTION_LIST.length);
    while (SOLUTION_LIST.length > 0)
        SOLUTION_LIST.pop();
    //console.log("Прежний список решений = "+SOLUTION_LIST.length);
    if (solutionCount === undefined) {
        getPartSolutionList(STEP_ID, ACCESS_TOKEN, 20);
        getData(getStepSolutionMap(), newCorrectData, newWrongData, 20);
    }
    else {
        getPartSolutionList(STEP_ID, ACCESS_TOKEN, solutionCount);
        getData(getStepSolutionMap(), newCorrectData, newWrongData, solutionCount);
    }
    //console.log("Новый список решений = "+SOLUTION_LIST.length);
    getData(getStepSolutionMap(), newCorrectData, newWrongData);
    //console.log(newWrongData);
    while (chart.data.datasets[0].data.length > 0)
        chart.data.datasets[0].data.pop();
    for (let i=0; i < newCorrectData.length; i++){
        chart.data.datasets[0].data[i] = newCorrectData[i];
    }
    while (chart.data.datasets[1].data.length > 0)
        chart.data.datasets[1].data.pop();
    for (let i=0; i < newWrongData.length; i++){
        chart.data.datasets[1].data[i] = newWrongData[i];
    }
    chart.options.scales.yAxes[0].ticks.max = GME(newCorrectData, newWrongData) + 5;
    chart.update();

}

function getData(mapData, a1, a2, solutionCount){
        for (let start = 0; start < solutionCount; start++) {
            a1.push(0);
            a2.push(0);
        }
        for (let [key, value] of mapData.entries()) {
            let pos = getMinusDays(new Date(key.substr(0, 4) + '/' + key.substr(5, 2) + '/' + key.substr(8, 2)));
            if (pos <= solutionCount)
            {
                if (value[1] === "correct") {

                    a1[pos - 1] += 1;
                } else {
                    a2[pos - 1] += 1;
                }
            }
        }
}

function createLabels(){
    let month = [];
    let inWeek = new Date();

    for (let start = 0; start < 20; start++) {

        if (start === 0)
        {
            inWeek.setDate(inWeek.getDate());
        }
        else
            inWeek.setDate(inWeek.getDate() - 1);
        month.push(inWeek.getDate() + "." + (inWeek.getMonth()+1) + "." + (inWeek.getFullYear()));
    }
    return month;
}

function getChart(arrSuc, arrUnSuc) {
    let ctx = document.getElementById("Line").getContext('2d');
    return new Chart(ctx, {
        type: 'line',

        data: {
            labels: createLabels(),

            datasets: [{
                data: arrSuc,
                label: 'удачно',
                borderColor: '#19FF28',
                fill: false,
            }, {
                data: arrUnSuc,
                label: 'неудачно',
                borderColor: '#FF686D',
                fill: false,
            }

            ]
        },
        options: {
            title: {
                display: true,
                text: 'График сдачи'
            },
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true,
                        max: GME(arrSuc, arrUnSuc) + 5,
                    }
                }]
            },
            tooltips: {
                enabled: false,
                mode: 'index',
                position: 'nearest',
                custom: customTooltips
            }
        }
    });
}

function get_lesson_step() {
    var URL = document.location.href; //Отсюда получаем lesson_id и step_index
    let ids = URL.split(/[/?]/);
    var lesson_id = ids[4];
    var step_index = ids[6];
    return [lesson_id, step_index];
}

function getMinusDays(datax) {
    var data1 = new Date(datax);
    let data2 = new Date();
    var timeDiff = Math.abs(data2.getTime() - data1.getTime());
    return Math.ceil(timeDiff / (1000 * 3600 * 24));
}


var a1 = [], a2 = [];
for (let start = 0; start < 20; start++) {
    a1.push(0);
    a2.push(0);
}

function updateInfo(){
    getServiceInfo(get_lesson_step()[0], get_lesson_step()[1]).then(function () {
        let mapData = getStepSolutionMap();
        if (mapData === null || SOLUTION_LIST === undefined){
            isCorrectData = false;
            return;
        }
            getData(mapData, a1, a2, 20);
    }).catch(function () {
        console.log("No service info was loaded");
        isCorrectData = false;
        console.log(isCorrectData);
    })
}

updateInfo();
