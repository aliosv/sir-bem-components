/** @class autocomplete */
modules.define('autocomplete', [
    'i-bem-dom', 'BEMHTML', 'jquery', 'functions__debounce', 'vow', 'autocomplete__message', 'menu', 'popup', 'input',
    'textarea', 'spin'
], function(provide, BEMDOM, BEMHTML, $, debounce, vow, Message, Menu, Popup, Input, Textarea, Spin, Block) {
    provide(BEMDOM.declBlock(this.name, /** @lends autocomplete.prototype */{
        onSetMod : {
            js : {
                inited : function() {
                    var _this = this;

                    this._menu = this.findChildBlock(Menu);
                    // Пункты меню автокомплита создаются только один раз,
                    // в процессе работы блока происходит изменение их контента и видимости
                    this._items = this._menu.getItems().toArray();
                    this._visibleItems = [];
                    this._popup = this.findMixedBlock(Popup);
                    this._inputs = [];
                    this._spin = this._elem(Message).findChildBlock(Spin);

                    // TODO: событие тригерит клик по menu-item импользуя pointer, проблема: клик должен быть коротким
                    this._menu._events().on('item-click', function(e, data) { _this._selectItem(data.item); });

                    // Создать блок можно полностью в bemjson, при этом нужно указать:
                    // 1)данные
                    if(this.params.data) this.setData(this.params.data);
                    // 2) [разделитель]
                    if(this.params.separator) this._separator = new RegExp(this.params.separator);
                    // 3) указать целевые инпуты, путем примиксовывания к ним блока с тем же ctx.js.id
                    if(this.domElem.length > 1) {
                        this.setAnchor(_this.findMixedBlocks(Input).concat(_this.findMixedBlocks(Textarea)).toArray());
                    }
                }
            }
        },

        // TODO: время жизни кэша, ограничение по памяти?
        _getSuggests : function(query) {
            var _this = this,
                defer = vow.defer();

            // TODO: кэшировать без учета регистра?
            if(!this._cache[query]) {
                if(typeof this._data === 'string') {
                    $.ajax({ url : this._data, data : { query : query } }).then(function(res) {
                        _this._cache[query] = res;
                        defer.resolve(_this._cache[query]);
                    }, function() {
                        defer.reject.apply(defer, arguments);
                    });
                } else {
                    this._cache[query] = Block.search(query, this._data);
                    defer.resolve(this._cache[query]);
                }
            } else defer.resolve(this._cache[query]);

            return defer.promise();
        },

        /**
         * Устанавливает значение вместо редактируемого текста
         * @param {String} suggest
         * @param {Object} data Второй аргумент input.setVal(val, data)
         * @returns {this}
         * @private
         */
        // TODO: нужно скролить до курсора, если он вышел из зоны видимости
        // TODO: учитывать регистр?
        _set : function(suggest, data) {
            if(!this._separator) {
                this._targetInput.setVal(suggest, data);
                this._setCaretPosition(suggest.length);

                return this;
            }

            var val = this._targetInput.getVal(),
                caretPosition = this._getCaretPosition(),
                left = val.substr(0, caretPosition),
                right = val.substr(caretPosition);

            var nl = left, i, sepLength;
            while((i = nl.search(this._separator)) > -1) {
                sepLength = nl.match(this._separator);
                sepLength = sepLength && sepLength[0].length || 0;
                nl = nl.substr(i + sepLength);
            }
            left = left.substr(0, left.length - nl.length);
            right = right.substr(right.search(new RegExp(this._separator)));

            this._targetInput.setVal(left + suggest + right, data);
            this._setCaretPosition((left + suggest).length);

            return this;
        },

        /**
         * Возвращает редактируемое слово/фразу(если не указан separator)
         * @returns {String}
         * @private
         */
        _get : function() {
            if(!this._separator) return this._targetInput.getVal();

            var val = this._targetInput.getVal(),
                caretPosition = this._getCaretPosition(),
                left = val.substr(0, caretPosition).split(this._separator),
                right = val.substr(caretPosition).split(this._separator);

            return left.pop() + right[0];
        },

        /**
         * Возвращает позицию курсора в инпуте
         * @returns {Number}
         * @private
         */
        _getCaretPosition : function() {
            var input = this._targetInput._elem('control').domElem.get(0),
                iCaretPos = 0;

            // IE Support
            if(document.selection) {
                input.focus();

                var oSel = document.selection.createRange();

                oSel.moveStart('character', -input.value.length);
                iCaretPos = oSel.text.length;
            } else if(input.selectionStart || input.selectionStart === 0) iCaretPos = input.selectionStart;

            return iCaretPos;
        },

        /**
         * Устанавливает позицию курсора в инпуте
         * @param {Number} caretPos
         * @private
         */
        _setCaretPosition : function(caretPos) {
            var input = this._targetInput._elem('control').domElem.get(0);

            if(input.createTextRange) {
                var range = input.createTextRange();
                range.move('character', caretPos);
                range.select();
            } else {
                if(input.selectionStart) {
                    input.focus();
                    input.setSelectionRange(caretPos, caretPos);
                } else
                    input.focus();
            }
        },

        /**
         * Делает "выбор" элемента в автокомплите
         * при этом выбранное значение устанавливается в инпут, а сам попап закрывается
         * @param {BEM} item Блок menu-item
         * @returns {Boolean}
         * @private
         */
        _selectItem : function(item) {
            if(!item || !this.isOpened()) return false;
            this._set(item.getVal(), {
                // передать флаг, что значение инпута было изменено при выборе значения в автокомплите
                select : true
            });
            this._hoverItem().close();
            this._emit('select', item);
            return true;
        },

        /**
         * Обновляет содержимое попапа
         * @returns {this}
         * @private
         */
        _update : function() {
            if(!this._targetInput) return;

            var _this = this,
                defer = vow.defer(),
                query = this._get(),
                promise = this._getSuggests(query);

            this._elem(Message).setMod('state', 'pending');
            this._items.forEach(function(item) { item.setMod('hidden', true); });
            this._visibleItems = [];

            promise.then(function(res) {
                // пришедший ответ от сервера должен быть по последнему запросу
                if(_this._get() !== query) {
                    defer.reject();
                    return defer.promise();
                }

                var search = res.slice(0, _this._items.length);

                search.forEach(function(item, index) {
                    _this._items[index].params.val = item.val;
                    _this._items[index].domElem.html(item.text);
                });

                _this._visibleItems = _this._items.slice(0, search.length);
                _this._items.forEach(function(item) {
                    _this._visibleItems.indexOf(item) > -1 && item.delMod('hidden');
                });

                // сообщение об отсутствии данных
                _this._elem(Message).setMod('state', !_this._visibleItems.length ? 'empty' : '');

                // на случай смены направления или размера попапа
                _this._popup.redraw();

                _this._lastQuery = query;

                defer.resolve();
            }, function() {
                // сообщение об ошибке поиска
                _this._elem(Message).setMod('state', 'error');

                defer.reject();
            });

            return defer.promise();
        },

        /**
         * Подсвечивает/снимает посдветку и проскроливает меню до нужного пункта
         * @param {BEM} item Блок menu-item
         * @returns {this}
         * @private
         */
        _hoverItem : function(item) {
            this._menu._hoveredItem && this._menu._hoveredItem.delMod('hovered');
            item && item.setMod('hovered', true);
            return this;
        },

        /**
         * Обработчик события focus инпута
         * @param {BEM} input
         * @private
         */
        _focusHandler : function(input) {
            var _this = this;

            this._targetInput = input;
            this._popup.setAnchor(input);

            this._update().then(function() {
                _this._needToOpen() && _this.open();
            });
        },

        /**
         * Проверяет, есть ли смысл открывать автокомплит
         * @returns {Boolean}
         * @private
         */
        _needToOpen : function() {
            var query = this._get();

            // если: есть привязанный инпут
            return this._targetInput &&
                // есть подходящие предложения
                this._visibleItems.length &&
                // если автокомплит не был закрыт пользователем
                !this._closedManually &&
                // слово/фраза не пустое
                query.length &&
                // при асинхронных запросах нужно отсекать неактуальные данные
                this._lastQuery === query &&
                // предложение не одно, или оно не совпадает со словом/фразой
                !(this._visibleItems.length === 1 && this._visibleItems[0].getVal() === query);
        },

        /**
         * Закрывает попап автокомплита
         * @returns {this}
         */
        close : function() {
            this._popup.delMod('visible');
            this._hoverItem();
            return this;
        },

        /**
         * Открывает попап автокомплита, стараясь найти и сфокусироваться на нужном варианте
         * @returns {this}
         */
        // TODO: в textarea нужно открывать инпут относительно курсора
        open : function() {
            this._popup.setMod('visible', true);
            return this;
        },

        /**
         * Возвращает состояние видимости попапа
         * @returns {Boolean}
         */
        isOpened : function() {
            return this._popup.hasMod('visible');
        },

        /**
         * Привязывает автокомплит к инпутам
         * @param {<BEM>|Array<BEM>} inputs Массив блоков/блок input
         * @returns {this}
         */
        // TODO: delegate events
        // TODO: unsubscribe inputs?
        setAnchor : function(inputs) {
            if(!inputs && !inputs.length) return this;

            var _this = this,
                focused;

            (Array.prototype.isPrototypeOf(inputs) ? inputs : [inputs]).forEach(function(input) {
                if(_this._inputs.indexOf(input) > -1) return;

                // текущая редактируемая фраза
                var currentToken,
                // предыдущая ред. фраза
                    prevToken;

                _this._inputs.push(input);
                if(input.hasMod('focused')) focused = input;

                input._events().on('change', debounce(function(e, data) {
                    // при выборе варианта из автокомплита не нужно его обновлять и снова открывать
                    if(data && data.select) return;

                    // если инпут еще ни разу не был в фокусе, то метод _update вернет undefined,
                    // это может произойти когда данные в инпут устанавливаются автоматически до действий пользователя
                    try {
                        // не нужно обновлять закрытый пользователем попап в фоне
                        !_this._closedManually && _this._update().then(function() {
                            // открыть попап если в инпуте есть значение и походящие варианты
                            // TODO: не закрывать при отсутствии данных?
                            _this[_this._needToOpen() ? 'open' : 'close']();
                        });
                    } catch(e) {}
                }, 100));

                input._domEvents('control').on('focusout focusin keydown keyup', function(e) {
                    if(e.type === 'focusout') (function(target) {
                        // не скрывать 300 мс попап, чтобы событие pointerclick успело стригерится
                        setTimeout(function() {
                            if(target === _this._targetInput || !_this._needToOpen()) _this.close();
                        }, 300);
                    }(_this._targetInput));
                    if(e.type === 'focusin') _this._focusHandler(input);
                    if(e.type === 'keydown' && [13, 32, 38, 40].indexOf(e.keyCode) !== -1) {
                        var hoveredIndex = _this._visibleItems.indexOf(_this._menu._hoveredItem);

                        switch(e.keyCode) {
                            // enter
                            // preventDefault происходит в зависимости от того, был ли выбран пункт автокомплита
                            case 13 : _this._selectItem(_this._menu._hoveredItem) && e.preventDefault(); break;

                            // ctrl + space - Открыть автокомплит
                            case 32 : if(e.ctrlKey) {
                                delete _this._closedManually;
                                !_this.isOpened() && _this._update() && _this.open(); return false;
                            } else break;

                            // не двигать курсор в инпуте по нажатию arrow up/down
                            // arrow up
                            /* falls through */
                            case 38 : {
                                if(!_this.isOpened()) break;
                                e.preventDefault();
                                _this._hoverItem(_this._visibleItems[(hoveredIndex > 0 ?
                                    hoveredIndex : _this._visibleItems.length) - 1]);
                                break;
                            }
                            // arrow down
                            case 40 : {
                                if(!_this.isOpened()) break;
                                e.preventDefault();
                                _this._hoverItem(_this._visibleItems[(hoveredIndex < _this._visibleItems.length - 1 ?
                                    hoveredIndex : -1) + 1]);
                                break;
                            }
                        }
                    }
                    // Esc, pageUp, pageDown, End, Home, arrowLeft, arrowRight
                    if(e.type === 'keyup' && [27, 33, 34, 35, 36, 37, 39].indexOf(e.keyCode) !== -1) {
                        switch(e.keyCode) {
                            // Esc - закрыть попап
                            case 27 : _this.close(); _this._closedManually = true; return;
                            // pageUp/pageDown перемещают каретку только в textarea
                            case 35 :
                            case 36 : if(_this._targetInput._elem('control').domElem.get(0)
                                    .tagName.toLowerCase !== 'textarea')
                                break;
                            // при движении курсора на новую фразу обновлять попап
                            /* falls through */
                            default : if((currentToken = _this._get()) !== prevToken) {
                                _this._separator && _this.isOpened() && _this._update();
                                prevToken = currentToken;
                            }
                        }
                    }
                });
                // prevent popup destructing(when his anchor destructed), until some anchored to autocomplete inputs
                // are exist.
                input._events().on({ modName : 'js', modVal : '' }, function() {
                    _this._inputs.splice(_this._inputs.indexOf(input), 1);
                    if(_this._targetInput === input && _this._inputs.length) {
                        _this.close();
                        _this._popup.setAnchor(_this._inputs[0]);
                    }
                });
            });

            if(focused) this._focusHandler(focused);

            return this;
        },

        /**
         * Загружает данные в автокомплит
         * @param {Array<Object>|Array<String>} data Массив объектов с полями val и text или массив строк, которые
         * являються одновременно val и text
         * @returns {this}
         */
        setData : function(data) {
            this.dropCache();
            this._data = data;

            return this;
        },

        /**
         * Удаляет кэшированные данные от асинхронного источника
         * @returns {this}
         */
        dropCache : function() {
            this._cache = {};

            return this;
        }
    }, /** @lends autocomplete */{}));
});
