/** @class textarea */
modules.define('textarea', [], function(provide, Block) {
    provide(Block.declMod({
        modName : 'expandable',
        modVal : true
    }, /** @lends textarea.prototype */{}, /** @lends textarea */{
        onInit : function() {
            this.__base.apply(this, arguments);

            this._events().on('change', function(e) {
                if(!this._heightCalcElem) {
                    this._heightCalcElem = document.createElement('pre');
                    this._heightCalcElem.className = 'textarea__heightCalc' +
                        (this.hasMod('size') ? ' textarea__heightCalc_size_' + this.getMod('size') : '');

                    document.body.appendChild(this._heightCalcElem);
                }

                // TODO: save height when user resize textarea manually?
                this._heightCalcElem.innerHTML = e.target.getVal()
                    // make not empty last line for calc it's height
                    .replace(/(\s)$/, '$1 ');
                this._heightCalcElem.style.width = e.target.domElem.outerWidth() + 'px';

                this.domElem.css('height', this._heightCalcElem.offsetHeight);
            });
        }
    }));
});
