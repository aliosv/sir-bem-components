/** @class mini-map */
modules.define('mini-map', ['i-bem-dom'], function(provide, BEMDOM) {
    provide(BEMDOM.declBlock(this.name, /** @lends mini-map.prototype */{
        onSetMod : {
            js : {
                inited : function() {
                    this._enabledX = true;
                    this._enabledY = true;

                    if(!this._enabledX && !this._enabledY) return;

                    this.reflow().repaint();

                    if(this.params.scrollStepX || this.params.scrollStepY) {
                        this._domEvents().on('mousewheel', function(e) {
                            this._enabledX && this.setVal({
                                x : (this._x >= 0 ? this._x : 0.5) + (e.originalEvent.deltaX === 0 ? 0 :
                                    e.originalEvent.deltaX > 0 ? this.params.scrollStepX : -this.params.scrollStepX)
                            });
                            this._enabledY && this.setVal({
                                y : (this._y >= 0 ? this._y : 0.5) + (e.originalEvent.deltaY === 0 ? 0 :
                                    e.originalEvent.deltaY > 0 ? this.params.scrollStepY : -this.params.scrollStepY)
                            });
                        });
                    }

                    this._domEvents().on('mousedown mousemove', function(e) {
                        if(e.type === 'mousemove' && e.which !== 1) return;

                        this._enabledX && this.setVal({
                            x : (e.pageX - this._offset.left - this._tHalfWidth * this._mWidth) /
                                (this._mWidth - this._tWidth * this._mWidth)
                        });

                        this._enabledY && this.setVal({
                            y : (e.pageY - this._offset.top - this._tHalfHeight * this._mHeight) /
                                (this._mHeight - this._tHeight * this._mHeight)
                        });

                        this.repaint();
                    });
                }
            }
        },

        disableAxis : function(axis) {
            if(axis === 'x') this._enabledX = false;
            if(axis === 'y') this._enabledY = false;

            return this;
        },

        enableAxis : function(axis) {
            if(axis === 'x') this._enabledX = true;
            if(axis === 'y') this._enabledY = true;

            return this;
        },

        reflow : function() {
            this._mHeight = this.domElem.innerHeight();
            this._tHeight = this._elem('thumb').domElem.height() / this._mHeight;
            this._tTop = this._mHeight - this._elem('thumb').domElem.height();
            this._tHalfHeight = this._tHeight / 2;

            this._mWidth = this.domElem.innerWidth();
            this._tWidth = this._elem('thumb').domElem.width() / this._mWidth;
            this._tLeft = this._mWidth - this._elem('thumb').domElem.width();
            this._tHalfWidth = this._tWidth / 2;

            this._offset = this.domElem.offset();

            return this;
        },

        repaint : function() {
            if((this._enabledX && typeof this._x !== 'number') || (this._enabledY && typeof this._y !== 'number')) {
                this._elem('thumb').setMod('hidden', true);

                return this;
            } else this._elem('thumb').delMod('hidden');

            this._elem('thumb').domElem.css({
                left : this._tLeft * this._x,
                top : this._tTop * this._y,
                width : this._tWidth * 100 + '%',
                height : this._tHeight * 100 + '%'
            });

            return this;
        },

        /**
         * @param {Object} size
         * @param {Number} [size.height]
         * @param {Number} [size.width]
         */
        setThumbSize : function(size) {
            this._elem('thumb').domElem.css(size);

            this.reflow().repaint();

            return this;
        },
        
        getVal : function() {
            return { x : this._x, y : this._y };
        },

        setVal : function(params) {
            if([undefined, this._x].indexOf(params.x) > -1 && [undefined, this._y].indexOf(params.y) > -1) return this;

            if(params.x !== undefined) this._x = params.x < 0 ? 0 : params.x > 1 ? 1 : params.x;
            if(params.y !== undefined) this._y = params.y < 0 ? 0 : params.y > 1 ? 1 : params.y;

            this.repaint()._emit('change');

            return this;
        }
    }, /** @lends mini-map */{
        lazyInit : true,
        onInit : function() {
            this._domEvents().on('mousedown', function() {});
        }
    }));
});
