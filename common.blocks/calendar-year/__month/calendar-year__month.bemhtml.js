block('calendar-year').elem('month').def()(function() {
    return applyCtx({
        block : 'calendar-month',
        mods : { selectable : 'single', theme : this.ctx.theme },
        js : { date : this.ctx.date },
        mix : { block : 'calendar-year', elem : 'month' },
        val : this.ctx.val
    });
});
