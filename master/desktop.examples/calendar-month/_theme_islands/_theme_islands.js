/*borschik:include:../../../node_modules/bem-core/common.blocks/i-bem-dom/i-bem-dom.js*/
/*borschik:include:../../../node_modules/bem-core/common.blocks/inherit/inherit.vanilla.js*/
/*borschik:include:../../../node_modules/bem-core/common.blocks/jquery/jquery.js*/
/*borschik:include:../../../node_modules/bem-core/common.blocks/loader/_type/loader_type_js.js*/
/*borschik:include:../../../node_modules/bem-core/common.blocks/jquery/__config/jquery__config.js*/
/*borschik:include:../../../node_modules/bem-core/desktop.blocks/jquery/__config/jquery__config.js*/
/*borschik:include:../../../node_modules/bem-core/desktop.blocks/ua/ua.js*/
/*borschik:include:../../../node_modules/bem-core/common.blocks/objects/objects.vanilla.js*/
/*borschik:include:../../../node_modules/bem-core/common.blocks/functions/functions.vanilla.js*/
/*borschik:include:../../../node_modules/bem-core/common.blocks/dom/dom.js*/
/*borschik:include:../../../node_modules/bem-core/common.blocks/i-bem-dom/__init/i-bem-dom__init.js*/
/*borschik:include:../../../node_modules/bem-core/common.blocks/i-bem/i-bem.vanilla.js*/
/*borschik:include:../../../node_modules/bem-core/common.blocks/i-bem/__internal/i-bem__internal.vanilla.js*/
/*borschik:include:../../../node_modules/bem-core/common.blocks/identify/identify.vanilla.js*/
/*borschik:include:../../../node_modules/bem-core/common.blocks/next-tick/next-tick.vanilla.js*/
/*borschik:include:../../../node_modules/bem-core/common.blocks/i-bem-dom/__events/i-bem-dom__events.js*/
/*borschik:include:../../../node_modules/bem-core/common.blocks/i-bem-dom/__collection/i-bem-dom__collection.js*/
/*borschik:include:../../../node_modules/bem-core/common.blocks/i-bem/__collection/i-bem__collection.js*/
/*borschik:include:../../../node_modules/bem-core/common.blocks/i-bem-dom/__events/_type/i-bem-dom__events_type_dom.js*/
/*borschik:include:../../../node_modules/bem-core/common.blocks/i-bem-dom/__events/_type/i-bem-dom__events_type_bem.js*/
/*borschik:include:../../../node_modules/bem-core/common.blocks/events/events.vanilla.js*/
/*borschik:include:../../../node_modules/bem-core/common.blocks/i-bem-dom/__init/_auto/i-bem-dom__init_auto.js*/
/*borschik:include:../../../common.blocks/calendar-month/calendar-month.js*/
/*borschik:include:../../../common.blocks/calendar-month/__day/calendar-month__day.js*/
/*borschik:include:../../../common.blocks/calendar-month/_selectable/calendar-month_selectable_single.js*/
var BEMHTML;

(function(global) {
    function buildBemXjst(__bem_xjst_libs__) {
        var exports = {};

        exports.apply = function () { return ""; };

        return exports;
    };

    

    var defineAsGlobal = true;

    // Provide with CommonJS
    if (typeof module === 'object' && typeof module.exports === 'object') {
        exports['BEMHTML'] = buildBemXjst({
    
}
);
        defineAsGlobal = false;
    }

    // Provide to YModules
    if (typeof modules === 'object') {
        modules.define(
            'BEMHTML',
            [],
            function(
                provide
                
                ) {
                    provide(buildBemXjst({
    
}
));
                }
            );

        defineAsGlobal = false;
    }

    // Provide to global scope
    if (defineAsGlobal) {
        BEMHTML = buildBemXjst({
    
}
);
        global['BEMHTML'] = BEMHTML;
    }
})(typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : this);
