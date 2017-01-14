var _ = require('lodash');

modules.define('util', ['objects'], function(provide, objects, block) {
    provide(objects.extend(block, {
        /**
         * Проверяет вхождение первого параметра функции во все остальные
         * Параметры функции будут приведены к массивам
         * @returns {boolean|undefined}
         */
        presence : function() {
            var args = arguments;

            if(args.length < 2) return;

            args = Array.prototype.map.call(args, function(value) {
                return Array.isArray(value) ? value : [value];
            });

            return _.intersection.apply(_, args).length === args[0].length;
        }
    }));
});
