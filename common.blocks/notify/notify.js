/** @class notify */
modules.define('notify', ['i-bem-dom', 'BEMHTML', 'jquery'], function(provide, BEMDOM, BEMHTML, $) {
    provide(BEMDOM.declBlock(this.name, /** @lends notify.prototype */{
        onSetMod : {
            js : {
                inited : function() {
                    this._container = $(BEMHTML.apply({
                        block : 'notify',
                        elem : 'container',
                        mix : { block : 'z-index-group', mods : { level : 9 } }
                    }));

                    BEMDOM.append(this.domElem, this._container);

                    this._domEvents('close').on('click', function(e) {
                        $(e.currentTarget).parents('.notify__message').remove();
                    });
                }
            }
        },

        _messages : [],

        add : function(message, type) {
            var _this = this,
                elemMods = {},
                $message,
                timer;

            if(type === 'error') elemMods.error = true;
            else if(type === 'success') elemMods.success = true;

            $message = $(BEMHTML.apply({
                block : 'notify',
                elem : 'message',
                elemMods : elemMods,
                content : [
                    message,
                    { elem : 'close', content : '&#10060;' }
                ]
            }));

            timer = setTimeout(function() {
                _this.remove($message);
            }, this.params.duration || 5000);

            this._messages.push([$message, timer]);

            BEMDOM.append(this._container, $message);

            setTimeout(function() {
                $message.css({
                    opacity : 1,
                    top : 0
                });
            }, 50);

            if(this._messages.length > (this.params.limit || 5)) {
                this.remove(0);
            }

            return this;
        },

        remove : function(index) {
            var $message;

            if(typeof index === 'number') {
                $message = this._messages.splice(index, 1)[0];
                clearTimeout($message[1]);
                $message[0].css({
                    opacity : 0,
                    top : 100 + 'px'
                });
                setTimeout(function() {
                    $message[0].remove();
                }, 300);
            } else {
                for(var i = 0; i < this._messages.length; i += 1) {
                    if(this._messages[i][0] === index) {
                        this.remove(i);
                        break;
                    }
                }
            }

            return this;
        }
    }, /** @lends notify */{}));
});
