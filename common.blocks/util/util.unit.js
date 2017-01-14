describe('Util', function() {
    var should = require('should'),
        m = modules,
        block;

    before(function(done) {
        m.require('util', function() {
            block = arguments[0];

            done();
        });
    });

    describe('_isEmpty', function() {
        it('Should be empty', function(done) {
            should(block._isEmpty()).equal(true);

            [undefined, '', {}, []].forEach(function(value) {
                should(block._isEmpty(value)).equal(true);
            });
            done();
        });

        it('Should be not empty', function(done) {
            [1, '1', null, new Date(), true, false, { a : [] }, [{}]].forEach(function(value) {
                should(block._isEmpty(value)).equal(false);
            });
            done();
        });
    });

    describe('_isHash', function() {
        it('Should be false', function(done) {
            [1, '1', true, false, null, NaN, Infinity, undefined, [], new Date()].forEach(function(value) {
                should(block._isHash(value)).equal(false);
            });
            done();
        });

        it('Should be true', function(done) {
            should(block._isHash({})).equal(true);
            done();
        });
    });

    describe('clear', function() {
        it('Should be unedfined', function(done) {
            should(block.clear()).equal(undefined);

            [undefined, '', {}, [], ['']].forEach(function(value) {
                should(block.clear(value)).equal(undefined);
            });
            done();
        });

        it('Should be same', function(done) {
            [1, '1', null, new Date(), true, false].forEach(function(value) {
                should(block.clear(value)).equal(value);
            });

            [
                { a : 1, b : true, c : false, d : 0, e : '1', f : [1], g : [1, { a : '2' }] },
                [1], ['1'], [{ a : 1 }]
            ].forEach(function(value) {
                    should(block.clear(value)).eql(value);
                });
            should(block.clear(['', 1, ''])).eql([1]);

            done();
        });

        it('Should be equal', function(done) {
            should(block.clear({ test : { arr : [{ empty : '', n : 1 }], str : '1' } }))
                .eql({ test : { arr : [{ n : 1 }], str : '1' } });
            done();
        });
    });

    describe('escapeHTML', function() {
        it('Should be equal', function(done) {
            var escapedString = '&amp;&lt;&gt;&quot;&#39;&#x2F;';

            should(block.escapeHTML('&<>"\'/')).equal(escapedString);
            should(block.escapeHTML(escapedString)).equal(escapedString);
            should(block.escapeHTML('&')).equal('&amp;');
            should(block.escapeHTML('&;')).equal('&amp;;');
            should(block.escapeHTML('&s;')).equal('&s;');
            should(block.escapeHTML('&sadasd;')).equal('&sadasd;');
            should(block.escapeHTML('&sadasdsadasd;')).equal('&amp;sadasdsadasd;');
            done();
        });
    });

    describe('formatNumber', function() {
        it('Should be equal', function(done) {
            should(block.formatNumber(1)).equal('1');
            should(block.formatNumber(1111)).equal('1&thinsp;111');
            should(block.formatNumber(1.1)).equal('1.1');
            should(block.formatNumber(1.1111)).equal('1.1&thinsp;111');
            should(block.formatNumber(1111.1111)).equal('1&thinsp;111.1&thinsp;111');
            should(block.formatNumber(1111111)).equal('1&thinsp;111&thinsp;111');
            done();
        });
    });

    describe('getArrayOfUniq', function() {
        it('Should be equal', function(done) {
            should(block.getArrayOfUniq([1, 2], [1, 2, 3])).eql([1, 2, 3]);
            done();
        });
    });

    describe('getHTMLMnemonicCode', function() {
        it('Should be undefined', function(done) {
            should(block.getHTMLMnemonicCode()).equal(undefined);
            should(block.getHTMLMnemonicCode('')).equal(undefined);
            should(block.getHTMLMnemonicCode('123')).equal(undefined);
            done();
        });

        it('Should be equal', function(done) {
            should(block.getHTMLMnemonicCode('&nbsp;')).equal('&#160;');
            done();
        });
    });

    describe('isEmptyDeep', function() {
        it('Should be empty', function(done) {
            should(block.isEmptyDeep()).equal(true);

            [undefined, '', {}, []].forEach(function(value) {
                should(block.isEmptyDeep(value)).equal(true);
            });

            [{ a : [] }, [{}]].forEach(function(value) {
                should(block.isEmptyDeep(value)).equal(true);
            });
            done();
        });

        it('Should be not empty', function(done) {
            [1, '1', null, new Date(), true, false, { a : [1] }, [{ a : 1 }]].forEach(function(value) {
                should(block.isEmptyDeep(value)).equal(false);
            });
            done();
        });
    });

    describe('isEqualDeep', function() {
        it('Should be false', function(done) {
            [
                [1],
                ['1', ''],
                [{ a : 1 }, {}],
                [[1], []],
                [{ a : '1', b : ['', null] }, { a : '1', b : [1, null] }],
                [1, 2],
                ['1', '2'],
                [true, false],
                [-Infinity, +Infinity],
                [['', 1], [1, 1]],
                [{ a : '', b : 1 }, { a : 1, b : 1 }]
            ].forEach(function(values) {
                    should(block.isEqualDeep(values[0], values[1])).equal(false);
                    should(block.isEqualDeep(values[1], values[0])).equal(false);
                });
            done();
        });

        it('Should be true', function(done) {
            var date = new Date();

            [
                [],
                ['', ''],
                [{}, {}],
                [[], []],
                [{ a : '', b : ['', undefined] }, { a : '', b : ['', undefined] }],
                [1, 1],
                ['1', '1'],
                [null, null],
                [date, date],
                [true, true],
                [false, false],
                [Infinity, Infinity],
                [NaN, NaN],
                [{ a : 1, b : ['1', true], c : { a : false, b : date } },
                    { a : 1, b : ['1', true], c : { a : false, b : date } }],
                [['', 1], [1]],
                [{ a : '', b : 1 }, { b : 1 }]
            ].forEach(function(values) {
                    should(block.isEqualDeep(values[0], values[1])).equal(true);
                    should(block.isEqualDeep(values[1], values[0])).equal(true);
                });
            done();
        });
    });

    describe('sortObjectKeys', function() {
        it('Should be equal', function(done) {
            var date = new Date(),
                o = block.sortObjectKeys({
                    c : {
                        c : [1, { b : 1, a : 1 }],
                        a : 1,
                        b : date,
                        d : null
                    },
                    a : 1
                });

            should(Object.keys(o)).eql(['a', 'c']);
            should(Object.keys(o.c)).eql(['a', 'b', 'c', 'd']);
            should(Object.keys(o.c.c[1])).eql(['a', 'b']);
            done();
        });
    });
});
