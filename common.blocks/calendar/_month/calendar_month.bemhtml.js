block('calendar').mod('month')(
    js()(true),

    content()(function() {
        var _days = ['пн', 'вт', 'ср', 'чт', 'пт', 'сб', 'вс'],
            _months = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь',
                'Ноябрь', 'Декабрь'];

        var currentDate = new Date(),
            targetDate = this.ctx.js && this.ctx.js.date ?
                new Date(this.ctx.js.date) :
                currentDate,
            targetMonthDate = new Date(targetDate.getFullYear(), targetDate.getMonth()),
        // 0-11
            targetMonthIndex = targetDate.getMonth(),
        // кол-во дней в месяце (1-31)
            nDays = new Date(targetDate.getFullYear(), targetMonthIndex + 1, 0).getDate(),
        // индекс первого дня месяца в неделе (0(monday) - 6(sunday))
            firstDayIndex = (targetMonthDate.getDay() || 7) - 1;

        return [
            {
                elem : 'day-names',
                content : _days.map(function(dayCaption, index) {
                    return {
                        elem : 'day-name', elemMods : { weekend : index > 4 || undefined },
                        content : dayCaption
                    };
                })
            },
            {
                elem : 'month-name',
                elemMods : {
                    startDay : firstDayIndex !== 0 ?
                    firstDayIndex + 1 :
                        undefined
                },
                content : _months[targetMonthIndex]
            },
            (new Array(nDays)).join(' ').split(' ').map(function(v, i) {
                targetMonthDate.setDate(i + 1);

                return {
                    elem : 'day',
                    elemMods : {
                        'in-past' : currentDate > targetMonthDate || undefined,
                        weekend : [5, 6].indexOf((firstDayIndex + i) % 7) > -1 ?
                            true :
                            undefined
                    },
                    content : i + 1
                };
            })
        ];
    })
);
