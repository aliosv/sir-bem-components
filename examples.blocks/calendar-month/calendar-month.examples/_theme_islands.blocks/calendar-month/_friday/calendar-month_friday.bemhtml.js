block('calendar-month').mod('friday', true).elem('day').match(function() {
    // Является ли данный день пятницей
    return this.ctx.calendarDate.getDay() + this.ctx.dayIndex % 7 - this.ctx.calendarDate.getDate() % 7 === 5;
}).def()(function() {
    return applyNext({
        ctx : this.extend(this.ctx, {
            attrs : this.extend(this.ctx.attrs, {
                title : 'Пятница!'
            }),
            elemMods : this.extend(this.ctx.elemMods, {
                friday : true
            })
        })
    });
});
