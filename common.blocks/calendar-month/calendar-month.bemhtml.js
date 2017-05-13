block('calendar-month')(
    js()(true),

    match(function() {
        return !this.ctx.js || !this.ctx.js.hasOwnProperty('month') || !this.ctx.js.hasOwnProperty('year');
    }).def()(function() {
        var targetDate = this.ctx.date || new Date();

        return applyCtx(this.extend(this.ctx, {
            js : this.extend(this.ctx.js, {
                year : targetDate.getFullYear(),
                month : targetDate.getMonth()
            })
        }));
    }),

    content()(function() {
        var _months = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь',
            'Ноябрь', 'Декабрь'],

            now = new Date(),
            // текущая дата
            currentDate = new Date(now.getFullYear(), now.getMonth(), now.getDate()),
            // выбранная дата в календаре
            selectedDate = this.ctx.js.date && new Date(this.ctx.js.date),
            targetYear = this.ctx.js.year,
            // индекс месяца в году (0-11)
            targetMonth = this.ctx.js.month,
            // индекс выбранного дня месяца (0-...)
            selectedDayIndex,
            targetMonthDate = new Date(targetYear, targetMonth),
        // кол-во дней в месяце (1-31)
            nDays = new Date(targetYear, targetMonth + 1, 0).getDate(),
        // индекс первого дня месяца в неделе (0(monday) - 6(sunday))
            firstDayIndex = (targetMonthDate.getDay() || 7) - 1;

        if(selectedDate &&
            selectedDate.getFullYear() === targetYear &&
            selectedDate.getMonth() === targetMonth) {
            selectedDayIndex = selectedDate.getDate() - 1;
        }

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
                targetMonthDate.setDate(i + 1);

                return {
                    elem : 'day',
                    elemMods : {
                        'in-past' : currentDate > targetMonthDate || undefined,
                        selected : selectedDayIndex === i || undefined,
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
