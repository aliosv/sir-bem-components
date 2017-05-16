block('calendar-month')(
    js()(true),

    match(function() {
        return !this.ctx.js || !this.ctx.js.hasOwnProperty('date');
    }).def()(function() {
        return applyCtx(this.extend(this.ctx, {
            js : this.extend(this.ctx.js, {
                date : new Date()
            })
        }));
    }),

    content()(function() {
        var _months = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь',
            'Ноябрь', 'Декабрь'],

            date = this.ctx.js.date,
            targetYear = date.getFullYear(),
            // индекс месяца в году (0-11)
            targetMonth = date.getMonth(),
            targetMonthDate = new Date(targetYear, targetMonth),
        // кол-во дней в месяце (1-31)
            nDays = new Date(targetYear, targetMonth + 1, 0).getDate(),
        // индекс первого дня месяца в неделе (0(monday) - 6(sunday))
            firstDayIndex = (targetMonthDate.getDay() || 7) - 1;

        return [
            { elem : 'day-names' },
            {
                elem : 'month-name',
                elemMods : {
                    startDay : firstDayIndex !== 0 ?
                    firstDayIndex + 1 :
                        undefined
                },
                content : _months[targetMonth]
            },
            (new Array(nDays)).join(' ').split(' ').map(function(v, i) {
                return {
                    elem : 'day',
                    elemMods : {
                        weekend : [5, 6].indexOf((firstDayIndex + i) % 7) > -1 ? true : undefined
                    },
                    calendarCtx : this.ctx,
                    calendarDate : date,
                    dayIndex : i + 1
                };
            }, this)
        ];
    })
);
