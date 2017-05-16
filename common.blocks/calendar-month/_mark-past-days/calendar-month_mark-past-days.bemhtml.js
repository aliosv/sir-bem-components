block('calendar-month').mod('mark-past-days', true)(
    elem('day').def()(function() {
        var now = new Date();

        return applyNext({
            ctx : this.extend(this.ctx, {
                elemMods : this.extend(this.ctx.elemMods, {
                    'in-past' : now > new Date(this.ctx.calendarDate.getFullYear(),
                        this.ctx.calendarDate.getMonth(), this.ctx.dayIndex) || undefined
                })
            })
        });
    })
);
