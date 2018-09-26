function getProgress(X, max) {

    $('.BlockMain span').width(' ' + X / max * 100 + '%');

}

/*Получение количество баллов*/
var CountUser = 10;

/*Максимальное количесвто баллов*/
var CountMax = 16;

getProgress(CountUser, CountMax);