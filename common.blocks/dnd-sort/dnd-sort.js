// TODO: drag image must be empty or __item node
// TODO: stop propagation for drop
// TODO: add up/down arrows
// TODO: add inputs

modules.define('dnd-sort', ['i-bem-dom', 'dnd-sort__item', 'jquery'], function(provide, BEMDOM, __item, $) {
    provide(BEMDOM.declBlock(this.name, {}, {
        lazyInit : true,

        move : function(target, place, method) {
            if(place[method === 'after' ? 'next' : 'prev']() === target) return;

            target.detach();
            place[method](target);
        },

        onInit : function() {
            // extend jQuery event-object
            $.event.addProp('dataTransfer');

            this._domEvents('item').on('dragstart dragenter dragover drop dragend', function(e) {
                if(e.type === 'dragstart') {
                    this._dragElement = e.currentTarget;

                    e.dataTransfer.dropEffect = 'move';
                    e.dataTransfer.effectAllowed = 'move';

                    $(e.currentTarget).bem(__item).setMod('dragging', true);
                }
                if(e.type === 'dragenter') {
                    if(this._dragElement !== e.currentTarget) {
                        this.__self.move($(this._dragElement), $(e.currentTarget),
                            $(this._dragElement).nextAll().is($(e.currentTarget)) ? 'after' : 'before');
                    }
                }
                if(e.type === 'dragover') {
                    // Necessary. Allows us to drop.
                    e.preventDefault();
                }
                if(e.type === 'drop') {
                    // stops the browser from redirecting.
                    e.stopPropagation && e.stopPropagation();
                    return false;
                }
                if(e.type === 'dragend') {
                    $(e.currentTarget).bem(__item).delMod('dragging');
                }
            });
        }
    }));
});

modules.define('dnd-sort__item', ['i-bem-dom'], function(provide, BEMDOM) {
    provide(BEMDOM.declElem('dnd-sort', 'item', {}, {}));
});
