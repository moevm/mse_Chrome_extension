var isCorrectData = true;

/*Function get Max Elements form two Array*/
function GME(x, y) {
    return (Math.max(Math.max.apply(null, x), Math.max.apply(null, y)));
}

function getChart(arrSuc, arrUnSuc) {


    var customTooltips = function (tooltip) {

        var tooltipEl = document.getElementById('chartjs-tooltip');

        if (!tooltipEl) {
            tooltipEl = document.createElement('div');
            tooltipEl.id = 'chartjs-tooltip';
            tooltipEl.innerHTML = "<table></table>"
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
            var titleLines = tooltip.title || [];
            var bodyLines = tooltip.body.map(getBody);

            var innerHtml = '<thead>';

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

        var position = this._chart.canvas.getBoundingClientRect();

        // Display, position, and set styles for font
        tooltipEl.style.opacity = 1;
        tooltipEl.style.left = '50vw';
        tooltipEl.style.top = '80vh';
        tooltipEl.style.fontFamily = tooltip._fontFamily;
        tooltipEl.style.fontSize = tooltip.fontSize;
        tooltipEl.style.fontStyle = tooltip._fontStyle;
        tooltipEl.style.padding = tooltip.yPadding + 'px ' + tooltip.xPadding + 'px';
    };


    var month = [];
    var today = new Date();
    var inWeek = new Date();

    for (var start = 0; start < 20; start++) {


        inWeek.setDate(today.getDate() - start);
        month.push(inWeek.getDate() + "." + (inWeek.getMonth() + 1) + "." + (inWeek.getFullYear()));
    }


    var ctx = document.getElementById("Line").getContext('2d');
    var myLineChart = new Chart(ctx, {
        type: 'line',

        data: {
            labels: month,

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

var mapData, a1 = [], a2 = [];
getServiceInfo(get_lesson_step()[0], get_lesson_step()[1]).then(function () {
    mapData = getStepSolutionMap();
    console.log(mapData.size);
    for (let start = 0; start < 20; start++) {
        a1.push(0);
        a2.push(0);
    }

    for (let [key, value] of mapData.entries()) {
        console.log(key + " = " + value);

        let pos = getMinusDays(new Date(key.substr(0, 4) + '/' + key.substr(5, 2) + '/' + key.substr(8, 2)));
        console.log(pos);
        if (value[1] === "correct") {
            a1[pos - 1] += 1;
        } else {
            a2[pos - 1] += 1;
        }
    }
}).catch(function () {
    console.log("No service info was loaded");
    isCorrectData = false;
    console.log(isCorrectData);
});              //выгрузка служебной информации в асинхронном режиме



