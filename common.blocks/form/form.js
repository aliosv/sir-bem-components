/** @class form */
modules.define('form', ['i-bem-dom'], function(provide, BEMDOM) {
    provide(BEMDOM.declBlock(this.name, /** @lends form.prototype */{
        getVal : function() {
            var formElements = this.domElem[0].elements,
                parsedData = {};

            Array.prototype.forEach.call(formElements, function(control) {
                var value = ['checkbox', 'radio'].indexOf(control.type) > -1 ?
                    (control.checked ? control.value : undefined) :
                    control.type.indexOf('select-') === 0 ?
                        Array.prototype.filter.call(control, function(option) { return option.selected; })
                            .map(function(option) { return option.value; }) :
                        control.value;

                if(control.name) {
                    if(!parsedData.hasOwnProperty(control.name)) parsedData[control.name] = undefined;

                    // игнорируем шаг для не чекнутых чекбоксов и переключателей
                    if(!(['checkbox', 'radio'].indexOf(control.type) > -1 && value === undefined)) {
                        parsedData[control.name] = parsedData[control.name] !== undefined ?
                            (Array.isArray(parsedData[control.name]) ?
                                parsedData[control.name] :
                                [parsedData[control.name]]).concat(value) :
                            value;
                    }

                    if(control.type === 'file') {
                        parsedData[control.name] = control.files;
                    }
                }
            });

            return parsedData;
        }
    }));
});
