/*Function get Max Elements form two Array*/
function GME(x, y) {
    return (Math.max(Math.max.apply(null, x), Math.max.apply(null, y)));
}


function getChart(arrSuc, arrUnSuc) {

    var month = [];
    for (var start = 1; start <= arrSuc.length; start++) {
        month.push(start);
    }

    var ctx = document.getElementById("Line").getContext('2d');
    var myLineChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: month,

            datasets: [{
                data: arrSuc,
                label: 'Succesfull',
                borderColor: '#19FF28',
                fill: false,
            }, {
                data: arrUnSuc,
                label: 'UnSuccesfull',
                borderColor: '#FF686D',
                fill: false,
            }

            ]
        },
        options: {
            title: {
                display: true,
                text: 'Jrafick of jobs'
            },
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true,
                        max: GME(arrSuc, arrUnSuc) + 5,
                    }
                }]
            }
        }
    });
}


/*Принимаем массив значений успеха*/
var a1 = [5, 7, 9, 10, 14, 17, 4, 6, 1, 4, 4, 5, 9, 16, 14, 24, 26, 21, 28, 29, 27, 30, 31, 35, 40, 41, 39, 40];

/*Принимаем массив значений провала*/
var a2 = [69, 68, 73, 74, 80, 83, 90, 94, 93, 92, 92, 92, 80, 76, 72, 71, 64, 48, 39, 38, 35, 34, 26, 25, 25, 28, 29, 25];


/*Передаём в функцию*/
getChart(a1, a2);