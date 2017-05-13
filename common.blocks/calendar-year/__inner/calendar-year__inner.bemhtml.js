block('calendar-year').elem('inner')(
    js()(true),

    content()(function() {
        var _months = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь',
                'Октябрь', 'Ноябрь', 'Декабрь'],
            date = this.ctx.date,
        // 0-11
            monthIndex = date.getMonth(),
            year = date.getFullYear(),
        // данные календаря
            calendar = _months.slice(monthIndex)
                .concat(_months.slice(0, monthIndex))
                .map(function(value, index) {
                    var date = new Date(
                        Number(year) + Math.floor((index + monthIndex) / 12),
                        (index + monthIndex) % 12
                    );

                    return {
                        caption : value,
                        date : date
                    };
                });

        return [
            {
                elem : 'years',
                targetYear : year
            },
            {
                elem : 'list',
                mix : { block : 'mini-map', js : { scrollStepY : 0.015 } },
                content : [
                    { block : 'mini-map', elem : 'thumb' },
                    calendar.map(function(month, index) {
                        return {
                            elem : 'item',
                            // отображать год, если текущий месяц не январь
                            content : index > 0 && month.date.getMonth() === 0 ?
                                [
                                    month.caption,
                                    { elem : 'year', content : year + 1 }
                                ] :
                                month.caption
                        };
                    })
                ]
            },
            {
                elem : 'dates',
                content : [
                    { block : 'calendar-month', elem : 'day-names' },
                    {
                        elem : 'visible',
                        content : {
                            elem : 'months',
                            content : calendar.map(function(month) {
                                return {
                                    block : 'calendar-month',
                                    mods : { theme : this.ctx.theme },
                                    date : month.date
                                };
                            }, this)
                        }
                    }
                ]
            }
        ];
    })
);
