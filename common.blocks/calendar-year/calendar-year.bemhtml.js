block('calendar-year')(
    // TODO: live init
    js()({ lazyInit : false }),

    content()(function() {
        var js = this.ctx.js || {};

        return {
            elem : 'inner',
            holidays : js.holidays,
            theme : this.ctx.mods.theme,
            date : js.start ? new Date(js.start) : new Date(),
            val : this.ctx.val
        };
    })
);
