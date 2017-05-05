// TODO: start-end dates range
block('calendar').mod('year')(
    // TODO: live init
    js()({ lazyInit : false }),

    match(function() {
        return !this.ctx.js || !this.ctx.js.hasOwnProperty('year');
    }).def()(function() {
        var targetDate = this.ctx.date || new Date();

        return applyCtx(this.extend(this.ctx, {
            js : this.extend(this.ctx.js, {
                year : targetDate.getFullYear()
            })
        }));
    }),

    content()(function() {
        var theme = this.ctx.mods.theme,
            _months = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь',
                'Ноябрь', 'Декабрь'],
            now = new Date(),
            targetDate = this.ctx.js.date,
            targetYear = this.ctx.js.year,
            // 0-11
            currentMonthIndex = now.getMonth(),
            currentYear = now.getFullYear(),
            // данные календаря
            calendar = _months.slice(currentMonthIndex)
                .concat(_months.slice(0, currentMonthIndex))
                .map(function(value, index) {
                    var year = Number(currentYear) + Math.floor((index + currentMonthIndex) / 12),
                        // индекс месяца в году (0-11)
                        monthIndex = (index + currentMonthIndex) % 12,
                        month = ('0' + (monthIndex + 1)).slice(-2);

                    return {
                        // имя месяца
                        caption : value,
                        index : monthIndex,
                        date : new Date([year, month, '01'].join('-'))
                    };
                });

        return [
            {
                elem : 'years',
                targetYear : currentYear
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
                            content : index > 0 && month.index === 0 ?
                                [
                                    month.caption,
                                    { elem : 'year', content : now.getFullYear() + 1 }
                                ] :
                                month.caption
                        };
                    })
                ]
            },
            {
                elem : 'dates',
                content : [
                    { elem : 'day-names' },
                    {
                        elem : 'visible',
                        content : {
                            elem : 'months',
                            content : calendar.map(function(month) {
                                return {
                                    block : 'calendar',
                                    mods : { month : true, theme : theme },
                                    date : month.date
                                };
                            })
                        }
                    }
                ]
            }
        ];
    }),

    elem('years')(
        js()(true),

        content()(function() {
            var targetYear = Number(this.ctx.targetYear);

            return [
                { elem : 'years-toggle', content : targetYear - 2 },
                { elem : 'years-toggle', content : targetYear - 1 },
                {
                    block : 'input',
                    mods : { size : 'm', theme : 'islands' },
                    val : targetYear,
                    placeholder : 'Год',
                    maxLength : 4
                },
                { elem : 'years-toggle', content : targetYear + 1 },
                { elem : 'years-toggle', content : targetYear + 2 }
            ];
        })
    ),

    elem('years-toggle').attrs()({ title : 'Установить год' })
);
