// TODO: метод для рекурсивного обхода структур данных

/** @class util */
modules.define('util', [], function(provide) {
    provide({
        _isEmpty : function(data) {
            return [undefined, ''].indexOf(data) > -1 || (Array.isArray(data) && !data.length) ||
                (typeof data === 'object' && !!data && data.constructor === Object && !Object.keys(data).length);
        },

        /**
         * Проверяет, является ли структура данных хэшом ({})
         * @param {*} data Произвольные данные
         * @returns {Boolean}
         * @private
         */
        _isHash : function(data) {
            return typeof data === 'object' && !!data && data.constructor === Object;
        },

        /**
         * Возвращает новый объект без "пустых"(см. метод _isEmpty) данных
         * @param {Object} data Данные
         * @return {Object}
         */
        clear : function(data) {
            var _this = this;

            return (function recursion(data) {
                var value;

                if(Array.isArray(data)) {
                    value = data.reduce(function(prev, value) {
                        var val = recursion(value);
                        return _this._isEmpty(val) ? prev : prev.concat(val);
                    }, []);
                } else if(_this._isHash(data)) {
                    value = Object.keys(data).reduce(function(prev, key) {
                        var value = recursion(data[key]);

                        if(!_this._isEmpty(value)) prev[key] = value;
                        return prev;
                    }, {});
                } else {
                    value = data;
                }

                return _this._isEmpty(value) ? undefined : value;
            }(data));
        },

        escapeHTML : (function() {
            var entityMap = {
                '&' : '&amp;',
                '<' : '&lt;',
                '>' : '&gt;',
                '"' : '&quot;',
                '\'' : '&#39;',
                '/' : '&#x2F;'
            };

            return function(string) {
                // look ahead на случай, если эскейпится текст содержащий мнемоники, не хочется заменять их амперсанд
                // т.е. без него было бы '&amp;bla' -> '$amp;amp;bla'
                // TODO: использовать список всех(255) мнемоник, вместо квантификатора? или можно конвертиировать
                // мнемоники в коды, так получим более точный look ahead с матчем на '&#..;' вместо '&..;'
                return String(string).replace(/&(?![^&]{1,10};)|[<>"'\/]/g, function(s) {
                    return entityMap[s];
                });
            };
        })(),

        /**
         * Форматирует число, добавляя пробелы между разрядами
         * @param {Number} value Исходное число
         * @param {String} [separator='&thinsp;'] Разделитель меду разрядами(по умолчанию - узкий пробел)
         * @returns {string}
         */
        formatNumber : function(value, separator) {
            return String(value).replace(/(\d{1,3}(?=(\d{3})+(?:\.\d|\b)))/g, '$1' + (separator || '&thinsp;'));
        },

        /**
         * Возвращает массив уникальных значений из переданных массивов
         * @returns {Array}
         */
        getArrayOfUniq : function() {
            return Array.prototype.reduce.call(arguments, function(prev, array) {
                array.forEach(function(value) {
                    prev.indexOf(value) === -1 && prev.push(value);
                });

                return prev;
            }, []);
        },

        getHTMLMnemonicCode : (function() {
            var mnemonics = {
                '&AElig;' : '&#198;',
                '&Aacute;' : '&#193;',
                '&Acirc;' : '&#194;',
                '&Agrave;' : '&#192;',
                '&Alpha;' : '&#913;',
                '&Aring;' : '&#197;',
                '&Atilde;' : '&#195;',
                '&Auml;' : '&#196;',
                '&Beta;' : '&#914;',
                '&Ccedil;' : '&#199;',
                '&Chi;' : '&#935;',
                '&Dagger;' : '&#8225;',
                '&Delta;' : '&#916;',
                '&ETH;' : '&#208;',
                '&Eacute;' : '&#201;',
                '&Ecirc;' : '&#202;',
                '&Egrave;' : '&#200;',
                '&Epsilon;' : '&#917;',
                '&Eta;' : '&#919;',
                '&Euml;' : '&#203;',
                '&Gamma;' : '&#915;',
                '&Iacute;' : '&#205;',
                '&Icirc;' : '&#206;',
                '&Igrave;' : '&#204;',
                '&Iota;' : '&#921;',
                '&Iuml;' : '&#207;',
                '&Kappa;' : '&#922;',
                '&Lambda;' : '&#923;',
                '&Mu;' : '&#924;',
                '&Ntilde;' : '&#209;',
                '&Nu;' : '&#925;',
                '&OElig;' : '&#338;',
                '&Oacute;' : '&#211;',
                '&Ocirc;' : '&#212;',
                '&Ograve;' : '&#210;',
                '&Omega;' : '&#937;',
                '&Omicron;' : '&#927;',
                '&Oslash;' : '&#216;',
                '&Otilde;' : '&#213;',
                '&Ouml;' : '&#214;',
                '&Phi;' : '&#934;',
                '&Pi;' : '&#928;',
                '&Prime;' : '&#8243;',
                '&Psi;' : '&#936;',
                '&Rho;' : '&#929;',
                '&Scaron;' : '&#352;',
                '&Sigma;' : '&#931;',
                '&THORN;' : '&#222;',
                '&Tau;' : '&#932;',
                '&Theta;' : '&#920;',
                '&Uacute;' : '&#218;',
                '&Ucirc;' : '&#219;',
                '&Ugrave;' : '&#217;',
                '&Upsilon;' : '&#933;',
                '&Uuml;' : '&#220;',
                '&Xi;' : '&#926;',
                '&Yacute;' : '&#221;',
                '&Yuml;' : '&#376;',
                '&Zeta;' : '&#918;',
                '&aacute;' : '&#225;',
                '&acirc;' : '&#226;',
                '&acute;' : '&#180;',
                '&aelig;' : '&#230;',
                '&agrave;' : '&#224;',
                '&alefsym;' : '&#8501;',
                '&alpha;' : '&#945;',
                '&amp;' : '&#38;',
                '&and;' : '&#8743;',
                '&ang;' : '&#8736;',
                '&apos;' : '&#39;',
                '&aring;' : '&#229;',
                '&asymp;' : '&#8776;',
                '&atilde;' : '&#227;',
                '&auml;' : '&#228;',
                '&bdquo;' : '&#8222;',
                '&beta;' : '&#946;',
                '&brvbar;' : '&#166;',
                '&bull;' : '&#8226;',
                '&cap;' : '&#8745;',
                '&ccedil;' : '&#231;',
                '&cedil;' : '&#184;',
                '&cent;' : '&#162;',
                '&chi;' : '&#967;',
                '&circ;' : '&#710;',
                '&clubs;' : '&#9827;',
                '&cong;' : '&#8773;',
                '&copy;' : '&#169;',
                '&crarr;' : '&#8629;',
                '&cup;' : '&#8746;',
                '&curren;' : '&#164;',
                '&dArr;' : '&#8659;',
                '&dagger;' : '&#8224;',
                '&darr;' : '&#8595;',
                '&deg;' : '&#176;',
                '&delta;' : '&#948;',
                '&diams;' : '&#9830;',
                '&divide;' : '&#247;',
                '&eacute;' : '&#233;',
                '&ecirc;' : '&#234;',
                '&egrave;' : '&#232;',
                '&empty;' : '&#8709;',
                '&emsp;' : '&#8195;',
                '&ensp;' : '&#8194;',
                '&epsilon;' : '&#949;',
                '&equiv;' : '&#8801;',
                '&eta;' : '&#951;',
                '&eth;' : '&#240;',
                '&euml;' : '&#235;',
                '&euro;' : '&#8364;',
                '&exist;' : '&#8707;',
                '&fnof;' : '&#402;',
                '&forall;' : '&#8704;',
                '&frac12;' : '&#189;',
                '&frac14;' : '&#188;',
                '&frac34;' : '&#190;',
                '&frasl;' : '&#8260;',
                '&gamma;' : '&#947;',
                '&ge;' : '&#8805;',
                '&gt;' : '&#62;',
                '&hArr;' : '&#8660;',
                '&harr;' : '&#8596;',
                '&hearts;' : '&#9829;',
                '&hellip;' : '&#8230;',
                '&iacute;' : '&#237;',
                '&icirc;' : '&#238;',
                '&iexcl;' : '&#161;',
                '&igrave;' : '&#236;',
                '&image;' : '&#8465;',
                '&infin;' : '&#8734;',
                '&int;' : '&#8747;',
                '&iota;' : '&#953;',
                '&iquest;' : '&#191;',
                '&isin;' : '&#8712;',
                '&iuml;' : '&#239;',
                '&kappa;' : '&#954;',
                '&lArr;' : '&#8656;',
                '&lambda;' : '&#955;',
                '&lang;' : '&#9001;',
                '&laquo;' : '&#171;',
                '&larr;' : '&#8592;',
                '&lceil;' : '&#8968;',
                '&ldquo;' : '&#8220;',
                '&le;' : '&#8804;',
                '&lfloor;' : '&#8970;',
                '&lowast;' : '&#8727;',
                '&loz;' : '&#9674;',
                '&lrm;' : '&#8206;',
                '&lsaquo;' : '&#8249;',
                '&lsquo;' : '&#8216;',
                '&lt;' : '&#60;',
                '&macr;' : '&#175;',
                '&mdash;' : '&#8212;',
                '&micro;' : '&#181;',
                '&middot;' : '&#183;',
                '&minus;' : '&#8722;',
                '&mu;' : '&#956;',
                '&nabla;' : '&#8711;',
                '&nbsp;' : '&#160;',
                '&ndash;' : '&#8211;',
                '&ne;' : '&#8800;',
                '&ni;' : '&#8715;',
                '&not;' : '&#172;',
                '&notin;' : '&#8713;',
                '&nsub;' : '&#8836;',
                '&ntilde;' : '&#241;',
                '&nu;' : '&#957;',
                '&oacute;' : '&#243;',
                '&ocirc;' : '&#244;',
                '&oelig;' : '&#339;',
                '&ograve;' : '&#242;',
                '&oline;' : '&#8254;',
                '&omega;' : '&#969;',
                '&omicron;' : '&#959;',
                '&oplus;' : '&#8853;',
                '&or;' : '&#8744;',
                '&ordf;' : '&#170;',
                '&ordm;' : '&#186;',
                '&oslash;' : '&#248;',
                '&otilde;' : '&#245;',
                '&otimes;' : '&#8855;',
                '&ouml;' : '&#246;',
                '&para;' : '&#182;',
                '&part;' : '&#8706;',
                '&permil;' : '&#8240;',
                '&perp;' : '&#8869;',
                '&phi;' : '&#966;',
                '&pi;' : '&#960;',
                '&piv;' : '&#982;',
                '&plusmn;' : '&#177;',
                '&pound;' : '&#163;',
                '&prime;' : '&#8242;',
                '&prod;' : '&#8719;',
                '&prop;' : '&#8733;',
                '&psi;' : '&#968;',
                '&quot;' : '&#34;',
                '&rArr;' : '&#8658;',
                '&radic;' : '&#8730;',
                '&rang;' : '&#9002;',
                '&raquo;' : '&#187;',
                '&rarr;' : '&#8594;',
                '&rceil;' : '&#8969;',
                '&rdquo;' : '&#8221;',
                '&real;' : '&#8476;',
                '&reg;' : '&#174;',
                '&rfloor;' : '&#8971;',
                '&rho;' : '&#961;',
                '&rlm;' : '&#8207;',
                '&rsaquo;' : '&#8250;',
                '&rsquo;' : '&#8217;',
                '&sbquo;' : '&#8218;',
                '&scaron;' : '&#353;',
                '&sdot;' : '&#8901;',
                '&sect;' : '&#167;',
                '&shy;' : '&#173;',
                '&sigma;' : '&#963;',
                '&sigmaf;' : '&#962;',
                '&sim;' : '&#8764;',
                '&spades;' : '&#9824;',
                '&sub;' : '&#8834;',
                '&sube;' : '&#8838;',
                '&sum;' : '&#8721;',
                '&sup1;' : '&#185;',
                '&sup2;' : '&#178;',
                '&sup3;' : '&#179;',
                '&sup;' : '&#8835;',
                '&supe;' : '&#8839;',
                '&szlig;' : '&#223;',
                '&tau;' : '&#964;',
                '&there4;' : '&#8756;',
                '&theta;' : '&#952;',
                '&thetasy;' : '&#977;',
                '&thinsp;' : '&#8201;',
                '&thorn;' : '&#254;',
                '&tilde;' : '&#732;',
                '&times;' : '&#215;',
                '&trade;' : '&#8482;',
                '&uArr;' : '&#8657;',
                '&uacute;' : '&#250;',
                '&uarr;' : '&#8593;',
                '&ucirc;' : '&#251;',
                '&ugrave;' : '&#249;',
                '&uml;' : '&#168;',
                '&upsih;' : '&#978;',
                '&upsilon;' : '&#965;',
                '&uuml;' : '&#252;',
                '&weierp;' : '&#8472;',
                '&xi;' : '&#958;',
                '&yacute;' : '&#253;',
                '&yen;' : '&#165;',
                '&yuml;' : '&#255;',
                '&zeta;' : '&#950;',
                '&zwj;' : '&#8205;',
                '&zwnj;' : '&#8204;'
            };

            /**
             * Возвращает код html мнемоники (например, &nbsp; -> &#160;')
             * @param {String} mnemonic HTML мнемоника
             * @returns {String|undefined} Возвращает код или undefined
             * @private
             */
            return function(mnemonic) { return mnemonics[mnemonic]; };
        }()),

        /**
         * Рекурсивно проверяет на "пустоту"(undefined, '', [], {})
         * @param {*} data
         * @returns {Boolean}
         */
        isEmptyDeep : function(data) {
            var _this = this;

            return (function recursion(data) {
                if(_this._isEmpty(data)) return true;

                if(Array.isArray(data)) {
                    return data.every(function(value) { return recursion(value) === true; });
                } else if(_this._isHash(data)) {
                    return Object.keys(data).every(function(key) { return recursion(data[key]) === true; });
                }

                return false;
            }(data));
        },

        /**
         * Сравнивает две структуры данных без учета "пустых" данных(см. _isEmpty)
         * @param {*} data1
         * @param {*} data2
         */
        isEqualDeep : function(data1, data2) {
            var _this = this;

            return (function recursion(data1, data2) {
                if(_this._isEmpty(data1) && _this._isEmpty(data2)) return true;

                if(Array.isArray(data1) && Array.isArray(data2) && data1.length === data2.length) {
                    return data1.every(function(value, index) {
                        return recursion(data1[index], data2[index]) === true;
                    });
                } else if(_this._isHash(data1) && _this._isHash(data2)) {
                    return _this.getArrayOfUniq(Object.keys(data1), Object.keys(data2)).every(function(key) {
                        return recursion(data1[key], data2[key]) === true;
                    });
                }

                return data1 === data2 ||
                    (typeof data1 === 'number' && typeof data2 === 'number' && isNaN(data1) && isNaN(data2));
            }(this.clear(data1), this.clear(data2)));
        },

        /**
         * Рекурсивно обходит структуру данных и собирает в массив прошедшие проверку результаты
         * @param {*} data Исходные данные
         * @param {Function} check Функция для проверки каждой ноды
         * @returns {Array} Возвращает массив прошедших проверку узлов структуры данных
         */
        recursiveFind : function(data, check) {
            var result = [];

            (function recursion(data) {
                if(check(data) === true) result.push(data);

                if(Array.isArray(data)) {
                    data.forEach(function(value) {
                        recursion(value);
                    });
                } else if(typeof data === 'object' && data !== null) {
                    Object.keys(data).forEach(function(key) {
                        recursion(data[key]);
                    });
                }
            }(data));

            return result;
        },

        /**
         * Округляет число в рамках заданной погрешности
         * @param {Number} value Число, которое нужно округлить
         * @param {Number} inaccuracy Погрешность
         * @returns {number}
         */
        roundTo : function(value, inaccuracy) {
            var quotient = Math.floor(value / inaccuracy),
                remainder = value % inaccuracy;

            return (quotient + (remainder > inaccuracy / 2 ? 1 : 0)) * inaccuracy;
        },

        /**
         * Сортировка ключей объектов по алфавиту
         * @param {*} data Произвольные данные
         * @returns {*} Возвращает НОВЫЙ хэш/массив или те же данные
         */
        sortObjectKeys : function(data) {
            var _this = this;

            return (function recursion(data) {
                if(Array.isArray(data)) {
                    return data.map(recursion);
                } else if(_this._isHash(data)) {
                    return Object.keys(data).sort().reduce(function(prev, key) {
                        prev[key] = recursion(data[key]);
                        return prev;
                    }, {});
                }

                return data;
            }(data));
        },

        /**
         * Делает первую букву заглавной
         * @param {String} str
         * @returns {string}
         */
        toUpperCaseFirst : function(str) {
            return str.charAt(0).toUpperCase() + str.slice(1);
        }
    });
});
