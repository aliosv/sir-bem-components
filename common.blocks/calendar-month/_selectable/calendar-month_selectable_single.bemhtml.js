block('calendar-month').mod('selectable', 'single')(
    // Удалить val из контекста, если оно вне границ текущего месяца
    match(function() {
        var val = this.ctx.val,
            date = this.ctx.js.date;

        return val && (val.getFullYear() !== date.getFullYear() || val.getMonth() !== date.getMonth());
    }).def()(function() {
        return applyCtx(this.extend(this.ctx, { val : undefined }));
    }),

    match(function() {
        return this.ctx.calendarCtx.val;
    }).elem('day')
        // TODO: why i can't use elemMods here?
        .def()(function() {
        return applyNext({
            ctx : this.extend(this.ctx, {
                elemMods : this.extend(this.ctx.elemMods, {
                    selected : this.ctx.calendarCtx.val.getDate() === this.ctx.dayIndex
                })
            })
        });
    })
);
