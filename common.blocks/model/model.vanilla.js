/** @class model */
modules.define('model', ['util'], function(provide, util) {
    var api = {};

    // TODO: понятные сообщения об ошибках
    // TODO: аналогично validation сделать warnings методы?
    // TODO: в кастомный required для хэша нужно пробрасывать данные всей модели, а не только поля, см. форму отправки
    // сообщения

    var basicTypes = {
        array : {
            caption : 'Массив',
            cast : function(data) {
                // например, группа чекбоксов с одним чекнутым инпутом возвратит не массив
                if(Array.isArray(data)) return data;

                if(typeof data === 'string' && data[0] === '[') {
                    try {
                        return this.cast(JSON.parse(data));
                    } catch(e) {
                        return [data];
                    }
                }

                return [data];
            },
            validation : [function(value) { return Array.isArray(value) || 'Ожидается массив'; }]
        },
        boolean : {
            caption : 'Boolean',
            cast : function(data) { return !!data; },
            validation : [function(value) { return typeof value === 'boolean' || 'Ожидается boolean'; }],
            values : { true : 'True', false : 'False' }
        },
        hash : {
            caption : 'Хэш',
            cast : function(data) {
                if(typeof data === 'object' && !Array.isArray(data)) return data;

                if(typeof data === 'string' && data[0] === '{') {
                    try {
                        return this.cast(JSON.parse(data));
                    } catch(e) {
                        return data;
                    }
                }

                return data;
            },
            validation : [function(value) { return typeof value === 'object' && value && !Array.isArray(value) ||
                'Ожидается объект'; }]
        },
        number : {
            caption : 'Число',
            cast : function(value) {
                var casted = +String(value).replace(',', '.');
                return typeof casted !== 'number' || isNaN(casted) ? value : casted;
            },
            hint : '123.4',
            validation : [function(value) { return typeof value === 'number' && isFinite(value) ||
                'Ожидается число'; }]
        },
        string : {
            caption : 'Текст',
            cast : function(value) { return String(value); },
            hint : 'Текст',
            validation : [function(value) { return typeof value === 'string' || 'Ожидается строка'; }]
        },
        undefined : {
            caption : 'Неопределенные данные',
            cast : function(data) {
                // TODO: Need to test hard this method!!!!
                if(typeof data === 'string') {
                    try {
                        return JSON.parse(data);
                    } catch(e) {
                        var constants = {
                            'undefined' : undefined,
                            'Infinity' : Infinity,
                            'NaN' : NaN
                        };

                        if(constants.hasOwnProperty(data)) {
                            return constants[data];
                        } else if(data !== '' && !isNaN(+data)) {
                            return +data;
                        }
                    }
                }

                return data;
            }
        }
    };

    api.basicTypes = basicTypes;
    // Список всех существующих типов данных (расширяется на уровне проекта)
    api.types = basicTypes;
    // Список моделей, по которым производится валидация (расширяется на уровне проекта)
    api.models = {};

    api.validation = {
        required : function(data) { return !util.isEmptyDeep(data) || 'Обязательно к заполнению'; },
        uniq : function() { return function() { return true; }; }
    };

    /**
     * Возвращает базовый тип в цепочке наследования(например: rating->integer->number(базовый тип))
     * @param {String} type Тип данных
     * @returns {String}
     */
    api.getBasicType = function(type) {
        return (function recursion(type) {
            return api.types[type] && api.types[type].type ? recursion(api.types[type].type) : api.types[type];
        }(type));
    };

    /**
     * Преобразует структурированные данных (объект) в плоский объект
     * @param {Object} data Структурированные данные, например: { images : [{uri : '...'}] }
     * @param {Function} exceptChecking Если возвращает true - не сериализовать структуру ноды дальше, пример:
     * { address : { point : { lat : ..., lon : ... } } } -> { address-point : { lat : ..., lon : ... } }
     * @returns {Object} Пример: { images-0-uri : '...' }
     */
    api.toSerializedData = function(data, exceptChecking) {
        return Object.keys(data).reduce(function(prev) {
            (function recursion(nameTokens, data) {
                if(!exceptChecking || !exceptChecking(data)) {
                    if(Array.isArray(data)) {
                        return data.map(function(value, index) {
                            return recursion(nameTokens.concat(index), value);
                        });
                    }

                    if(typeof data === 'object') {
                        return Object.keys(data).map(function(key) {
                            return recursion(nameTokens.concat(key), data[key]);
                        });
                    }
                }

                prev[nameTokens.join('-')] = data;
            }([], data));

            return prev;
        }, {});
    };

    /**
     * Находит индексы элементов массивов исходя из положения этих элементов в плоском списке данных.
     * @param {Object} serializedData Данные в виде плоского списка с ключами вида (string|number)-...,
     * пример: { 'image-1-url' : 'http://', 'image-0-url' : 'http://' }
     * @returns {Object} Объект, содержащий в качестве значений индексы,
     * пример: { 'image-1-url' : 0, 'image-0-url' : 1 }
     */
    api.getDataArrayIndexes = function(serializedData) {
        var arraysLength = {};

        return Object.keys(serializedData).reduce(function(prev, name) {
            var nameTokens = name.split('-'),
                nameLength = nameTokens.length;

            (function recursion(nodeNameTokens) {
                var token = nodeNameTokens.shift(),
                    parentNodeTokens = nameTokens.slice(0, nameLength - nodeNameTokens.length - 1),
                    nodeName = parentNodeTokens.concat(token).join('-'),
                    parentNodeName = parentNodeTokens.join('-');

                if(!token) return;

                if(!isNaN(+token)) {
                    prev[nodeName] = prev[nodeName] !== undefined ?
                        prev[nodeName] :
                        (arraysLength[parentNodeName] = (arraysLength[parentNodeName] || 0) + 1) - 1;
                }

                recursion(nodeNameTokens);
            }(nameTokens.slice()));

            return prev;
        }, {});
    };

    /**
     * Возвращает объект с маппингом исходных ключей в ключи с реальными индексами элементов массивов.
     * @param {Object} serializedData Данные в виде плоского списка с ключами вида (string|number)-...,
     * пример: { 'image-1-url' : 'http://', 'image-0-url' : 'http://' }
     * @returns {Object} Объект, содержащий в качестве значений ключи с реальными индексами элементов массивов,
     * пример: { 'image-1-url' : 'image-0-url', 'image-0-url' : 'image-1-url' }
     */
    api.getNamesList = function(serializedData) {
        var arrayIndexes = this.getDataArrayIndexes(serializedData);

        return Object.keys(serializedData).reduce(function(prev, key) {
            prev[key] = (function recursion(nameTokens) {
                var lastToken = nameTokens.pop();

                if(!lastToken) return nameTokens;

                if(!isNaN(+lastToken)) lastToken = arrayIndexes[nameTokens.concat(lastToken).join('-')];

                return recursion(nameTokens).concat(lastToken);
            }(key.split('-'))).join('-');

            return prev;
        }, {});
    };

    // TODO: хочется иметь возможность использовать разделитель в именах полей данных, для этого придется
    // парсить сериализованные данные с учетом модели
    /**
     * Преобразует объект сериализованных данных в объект со вложенной структурой согласно модели
     * @param {Object} serializedFormData Плоский объект, например: { title : '...', images-0-uri : '...' }
     * @returns {Object} Пример: { title : '...', images : [{uri : '...'}] }
     */
    api.toData = function(serializedFormData) {
        var arrayIndexes = this.getDataArrayIndexes(serializedFormData);

        // преобразование (парсинг) сериализованной формы в DB-oriented данные (JSON), пример:
        // сериализованная форма { 'images-0-uri': '...' }
        // преобразуется в { images: [{uri: '...'}] }
        return Object.keys(serializedFormData).reduce(function(prev, key) {
            /**
             * Массив токенов, например: ['images', '0', 'uri']
             * @type {Array}
             */
            var name = key.split('-');

            // алгоритм рекурсивного построения дерева(JSON) из плоского списка имен полей формы(напр. images-0-uri)
            // суть: имя поля формы разбивается на токены('images-0-uri' -> ['images', '0', 'uri']),
            // далее происходит итерация и построение дерева вглубь в зависимости от обрабатываемого токена
            // если обрабатываемый токен - цифра, то создать в дереве массив, иначе - объект
            // если обрабатываемый токен последний, то взять данные формы
            (function recursion(keys, data) {
                /**
                 * Первый токен из текущего имени поля(имя поля укорачивается на один токен за цикл)
                 * токен используется для определения типа ноды(объект/массив) в строящемся дереве
                 * @type {String}
                 */
                var token = keys.shift();
                /**
                 * Заново построенное имя поля формы из обработанных токенов
                 * @type {string}
                 */
                var namePart = name.slice(0, name.length - keys.length).join('-');

                // точка завершения рекурсии
                if(!token) return;

                // здесь происходит замена токена-индекса на реальный его индекс в массиве
                // это нужно, чтобы сохранить такой же порядок в результируюющем массиве дерева,
                // как и в сериализованной форме; По сути нужно воспринимать цифру в имени поля(images-0-uri) не как
                // индекс, а как уникальный идентификатор для группировки вложенных полей, например:
                // images-0-uri, images-0-title -> images: [{ uri: '..', title: '..' }]
                if(!isNaN(+token)) token = arrayIndexes[namePart];

                // построение ноды дерева
                data[token] = data[token] || (keys.length > 0 ? isNaN(+keys[0]) ? {} :
                    [] : serializedFormData[namePart]);

                // построение ветки дерева вглубь
                recursion(keys, data[token]);
            }(name.slice(), prev));

            return prev;
        }, {});
    };

    /**
     * Приводит типы данных к соответствующим типам описанным в модели
     * @param {Object} model Модель данных
     * @param {*} data Данные
     * @returns {*}
     */
    api.cast = function(model, data) {
        var _this = this,
            cast = function(model, data) { return model.cast ? model.cast(data) : data; };

        return (function recursion(model, data) {
            // точка выхода из рекурсии: нет модели для обработки вглубь дерева
            // TODO: все данные будут кастоваться по undefined типу, исправить!
            if(!model) return cast(_this.types.undefined, data);

            // точка выхода из рекурсии: данные значения позволяют удалять свойства из бд
            if(util.isEmptyDeep(data)) return data;

            if(model.type === 'array') {
                return (function(data) {
                    return Array.isArray(data) ?
                        data.map(function(arrayItem) {
                            return recursion(_this.types[model.of], arrayItem);
                        }) :
                        data;
                }(cast(_this.types[model.type], data)));
            }

            if(model.type === 'hash') {
                return (function(data) {
                    return typeof data === 'object' && !Array.isArray(data) ?
                        Object.keys(data).reduce(function(prev, key) {
                            prev[key] = recursion(model.fields[key], data[key]);

                            return prev;
                        }, {}) :
                        data;
                }(cast(_this.types[model.type], data)));
            }

            // Сейчас в базовых моделях есть проектные типы, чтобы при построении админки их фильтровать и не выводить.
            // например, поле lastEditor, которое выставляетяся сервером
            // TODO: нужно перенести все проектные типы из basicTypes в projectTypes, и как-то их пометить для скрытия

            // дошли до корневой базовой модели
            if(Object.keys(_this.basicTypes).some(function(key) {
                return _this.basicTypes[key] === model && model.type === undefined;
            })) return cast(model, data);

            // обработка базовой модели
            return cast(model, recursion(model.type && _this.types[model.type], data));
        }(model, data));
    };

    /**
     * Конструктор ошибки валидации
     * @param {Array<String>} errors Массив сообщений об ошибках
     * @param {*} data Не прошедшие валидацию данные
     * @constructor
     */
    api.ValidationError = function(errors, data) {
        this.errors = errors;
        this.data = data;
    };

    /**
     * Проверяет переданные данные на валидность
     * @param {Object} model Модель для валидации
     * @param {Object} update Все измененения
     * @param {Object} document Исходные данные документа
     * @param {Boolean} [hideWarnings] Флаг, отвечающий за отключение вывода предупреждений
     * @returns {Boolean|Object} Возвращает true или плоский список ошибок({ images-0-title : { errors : ['...'] } })
     */
    api._validate = function(model, update, document, hideWarnings) {
        var _this = this,
            /**
             * Валидирует данные массивом методов
             * @param {Object} model Модель, по которой будут валидироваться данные
             * @param {String} fieldName Имя поля в документе, которое содержит проверяеме данные
             * @param {*} data Данные конкретной ноды в update для проверки
             * @param {*} parentData Данные parent ноды в структуре update
             * @param {Object} update Все изменения
             * @param {Object} document Исходные данные документа
             * @returns {Boolean|Array<String>} Возвращает true или массив сообщений об ошибках
             */
            check = function(model, fieldName, data, parentData, update, document) {
                var checkResult,
                    isEmpty = util.isEmptyDeep(data);

                if(isEmpty && !model.required) return true;

                if(model.required) {
                    checkResult = model.required === true ?
                        _this.validation.required(data) :
                        model.required(data, parentData, update, document);

                    if(checkResult !== true) return [checkResult];
                }

                // TODO: хак, чтобы не проверять values "пустых" данных
                // нужно уметь перестраивать форму на клиенте при изменении категории
                if(checkResult === true && isEmpty) return true;

                if(model.uniq && fieldName) {
                    checkResult = model.uniq === true ?
                        _this.validation.uniq(fieldName)(data, parentData, update, document) :
                        model.uniq(fieldName)(data, parentData, update, document);

                    if(checkResult !== true) return [checkResult];
                }

                // валидация values: проверяем, что данные описаны в values
                // для "пустых" значений проверку делать не нужно
                // TODO: проверку делаем только один раз, для первых попавшихся values в цепочке моделей?
                // т.е. в этом случае values моделей могут переопределяться
                // или проверять values каждой модели, в этом случае базовые модели должны расширять предыдущие values
                if(model.values) {
                    if(Array.isArray(data)) {
                        checkResult = data.filter(function(v) { return model.values[String(v)] === undefined; });
                        checkResult = checkResult.length === 0 || 'Недопустимые значения: ' + checkResult.join(', ');
                    } else {
                        checkResult = model.values[String(data)] !== undefined;
                        checkResult = checkResult === true || 'Недопустимое значение: ' + data;
                    }

                    if(checkResult !== true) return [checkResult];
                }

                checkResult = (model.validation || [])
                    .reverse()
                    .map(function(method) { return method(data, parentData, update, document); })
                    .filter(function(value) { return value !== true; });

                return checkResult.length ? checkResult : true;
            },
            /**
             * @param {Object} model Модель, по которой нужно получить результат валидации
             * @param {*} [data] Данные для валидации
             * @param {*} [parentData] "Родительские" данные для валидации
             * @param {Object} [resultModel] Модель с учетом наследования, по которой данные будут валидироваться
             * @param {String} [fieldName] Имя поля в документе, которое содержит проверяемые данные
             * @returns {Boolean|ValidationError} Возвращает true или объект с описанием ошибок
             */
            recursion = function(model, data, parentData, resultModel, fieldName) {
                var checkResult;

                if(resultModel && model) {
                    // использовать первые попавшиеся required, uniq, values в цепочке моделей для валидации
                    ['required', 'uniq', 'values'].forEach(function(key) {
                        if(!resultModel[key] && model[key]) resultModel[key] = model[key];
                    });

                    // добавить методы валидации текущей модели
                    resultModel.validation = (resultModel.validation || []).concat(model.validation || []);
                }

                resultModel = resultModel || model && Object.create(model);

                // замена имен методов на функции из хелперов для валидации
                if(resultModel) resultModel.validation = resultModel.validation &&
                    resultModel.validation.map(function(method) {
                        return typeof method === 'string' ? _this.validation[method] : method;
                    }).filter(function(v) { return !!v; });

                // точка выхода из рекурсии - отсутствие базовой модели
                if(!model || !model.type) {
                    // результат валидации
                    checkResult = check(resultModel, fieldName, data, parentData, update, document);

                    return checkResult === true || new _this.ValidationError(checkResult, data);
                }

                // валидация структуры данных, например, запрещен пустой массив
                if(['array', 'hash'].indexOf(model.type) > -1) {
                    // если данные "пустые" и не required, то валидировать дальше не нужно
                    if(util.isEmptyDeep(data) && !resultModel.required) return true;

                    checkResult = check(resultModel, fieldName, data, parentData, update, document);

                    // не валидировать данные далее внутри массива/хеша при наличии ошибки
                    if(checkResult !== true) return new _this.ValidationError(checkResult, data);
                }

                // если массив прошел валидацию - валидировать вложенные в него данные
                if(model.type === 'array' && data) {
                    return data.map(function(arrayItem) {
                        return recursion(_this.types[model.of], arrayItem, {
                            value : data,
                            parent : parentData
                        });
                    });
                }

                // если хэш прошел валидацию - валидировать вложенные в него данные
                if(model.type === 'hash') {
                    return Object.keys(model.fields).reduce(function(prev, key) {
                        prev[key] = recursion(model.fields[key], data[key], {
                            value : data,
                            parent : parentData
                        }, undefined, key);

                        return prev;
                    }, {});
                }

                // обработка базовой модели
                return recursion(_this.types[model.type], data, parentData, resultModel, fieldName);
            };

        /**
         * Результат валидации в виде плоского списка
         * @type {Object} Ключ - конкантенированные ключи дерева('coords-lat'), значение - результат валидации
         */
        var serializedValidationResult = _this.toSerializedData(recursion(model, update), function(data) {
            return typeof data === 'object' && data instanceof _this.ValidationError;
        });

        // оставляем в списке только ошибки
        serializedValidationResult = Object.keys(serializedValidationResult).reduce(function(prev, key) {
            if(serializedValidationResult[key] !== true) prev[key] = serializedValidationResult[key];
            return prev;
        }, {});

        // TODO: проверяются только корневые данные, переписать на проверку внутри рекурсии
        if(!hideWarnings) {
            // поиск не описанных в моделях данных
            Object.keys(update)
                .filter(function(key) { return model.fields[key] === undefined; })
                .reduce(function(prev, key) {
                    prev[key] = prev[key] || {};
                    prev[key].warnings = ['Неопределенный тип данных'];
                    return prev;
                }, serializedValidationResult);
        }

        // Если нет ошибок и предупреждений, то получим пустой объект, преобразуем его в true
        if(Object.keys(serializedValidationResult).length === 0) {
            serializedValidationResult = true;
        }

        return serializedValidationResult;
    };

    /**
     * Валидация
     * @param {Object} namesList // TODO:
     * @param {Object} update Подготовленные данные для обновления документа
     * @param {Object} [document] Данные документа
     * @param {Object} [hideWarnings] // TODO:
     * @returns {Object}
     */
    api.validate = function(namesList, update, document, hideWarnings) {
        var dataModels = this.getModelsFromData(update, document),
        // TODO: валидация по нескольким моделям
        // валидация данных по моделям всех категорий, к которым относится документ
            serializedValidationResult = dataModels
                // сформировать массив результатов валидации для каждой модели
                .map(function(model) {
                    var report = this._validate(model, update, document, hideWarnings);

                    return report === true ? true : Object.keys(report).reduce(function(prev, key) {
                        if(!(key in update) && document && document[key]) return prev;

                        prev = prev !== true ? prev : {};
                        prev[key] = report[key];

                        return prev;
                    }, true);
                }, this)
                // оставить только ошибки
                .filter(function(report) { return report !== true; })
                // преобразуем структуру в объект, ключ - имя поля, значение - массив результатов валидации этого поля
                // по разным моделям
                .reduce(function(prev, report) {
                    Object.keys(report).forEach(function(key) {
                        prev[key] = prev[key] || [];
                        prev[key].push(report[key]);
                    });

                    return prev;
                }, {});

        serializedValidationResult = Object.keys(serializedValidationResult)
            // найти данные, которые не проходят валидацию по всем моделям, т.е. если данные при валидации
            // по медели_1 валяться с ошибкой, а по модели_N проходят, то считать данные валидными
            // TODO: или данные должны быть валидны по всем моделям? да
            // тогда появится проблема о взаимоисключающих ошибках
            .reduce(function(prev, dataFieldName) {
                if(serializedValidationResult[dataFieldName].length === dataModels.length) {
                    prev[dataFieldName] = serializedValidationResult[dataFieldName]
                        .reduce(function(prev, report) {
                            prev.errors = (prev.errors || []).concat(report.errors ? report.errors : []);
                            prev.warnigns = (prev.warnings || []).concat(report.warnings ? report.warnings : []);

                            return prev;
                        }, prev[dataFieldName] || {});
                }

                return prev;
            }, {});

        namesList = Object.keys(namesList)
            .reduce(function(prev, key) {
                prev[namesList[key]] = key;
                return prev;
            }, {});

        if(Object.keys(serializedValidationResult).length) {
            serializedValidationResult = Object.keys(serializedValidationResult)
                .reduce(function(prev, key) {
                    prev[namesList[key] ? namesList[key] : key] = serializedValidationResult[key];
                    return prev;
                }, {});
        }

        return Object.keys(serializedValidationResult).length ? serializedValidationResult : true;
    };

    /**
     * Поиск моделей данных
     * @description Принимает произвольное кол-во объектов с данными в качестве аргументов
     * модели подбираються исходя из поля categories, указанного в данных
     * @returns {Array<Object>} Возвращает массив моделей(или модели default), описывающих все данные
     */
    api.getModelsFromData = function() {
        return Array.prototype.reduce.call(arguments, function(prev, data) {
            return prev.concat(data && data.categories);
        }, [])
            // отфильтровать дубликаты
            .filter(function(value, index, array) { return array.indexOf(value) === index; })
            // заменяем имена категорий на соответствующие модели
            .map(function(categoryName) { return this.models[categoryName]; }, this)
            // фильтруем undefined
            .filter(function(model) { return model; })
            // использовать дефолтную модель, если других не нет
            .reduce(function(prev, model, index, array) {
                return array.length ? array : prev;
            }, [this.models.default]);
    };

    /**
     * Производит преобразование плоского списка данных в иерархическую структуру
     * @param {Object} update Данные апдейта, плоский список (например, данные из html формы)
     * @param {Object} document Данные документа, иерархическая структура
     * @returns {Object} Возвращает структуру данных с приведенными к нужным типам значениями
     */
    api.getUpdateData = function(update, document) {
        var _this = this;

        return this.getModelsFromData(update, document)
            .reduce(function(prev, model) {
                return _this.cast(model, prev);
            }, this.toData(update));
    };

    provide(api);
});
