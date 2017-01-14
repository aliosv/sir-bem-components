describe('Model', function(){
    var should = require('should'),
        m = modules,
        block;

    before(function(done) {
        m.require('model', function() {
            block = arguments[0];

            done();
        });
    });

    describe('validation', function() {
        describe('required', function() {
            it('should be error message', function() {
                var data = ['', undefined, {}, { a : '', b : [], c : {}, d : undefined }, [], [['', undefined, {}]]];
                data.forEach(function(value) { (typeof block.validation.required(value)).should.equal('string'); });
            });
            it('should be true', function() {
                var data = [0, '0', false, NaN, null, Infinity, { a : 0 }, [0]];
                data.forEach(function(value) { block.validation.required(value).should.equal(true); });
            });
        });
    });
    describe('toSerializedData', function() {
        describe('should equal', function() {
            it('without exceptChecking', function() {
                should.deepEqual(block.toSerializedData({ a : 0, b : [0], c : { a : 0, b : [0] } }), {
                    a : 0, 'b-0' : 0, 'c-a' : 0, 'c-b-0' : 0
                });
            });
            it('with exceptChecking should equal', function() {
                should.deepEqual(block.toSerializedData({ a : 0, b : [0], c : { a : 0, b : [0] } }, function(node) {
                    return Array.isArray(node);
                }), { a : 0, 'b' : [0], 'c-a' : 0, 'c-b' : [0] });
            });
        });
    });
    it('getDataArrayIndexes', function() {
        should.deepEqual(block.getDataArrayIndexes({
            'a-1' : 1,
            'a-1-a-1' : 'a',
            'a-1-a-0' : 'a',
            'a-0' : 0,
            'a-b' : 'a'
        }), {
            'a-1' : 0,
            'a-1-a-1' : 0,
            'a-1-a-0' : 1,
            'a-0' : 1
        });
    });
    it('getNamesList', function() {
        should.deepEqual(block.getNamesList({
            'image-1-url' : '',
            'image-1-url-1-a' : '',
            'image-1-url-0-a' : '',
            'image-0-url' : '',
            'image-0-url-0-a' : ''
        }), {
            'image-1-url' : 'image-0-url',
            'image-1-url-1-a' : 'image-0-url-0-a',
            'image-1-url-0-a' : 'image-0-url-1-a',
            'image-0-url' : 'image-1-url',
            'image-0-url-0-a' : 'image-1-url-0-a'
        });
    });
    describe('toData', function() {});
    describe('cast', function() {
        describe('Should be not modified', function() {
            var model = { cast : function() { return 1; } };

            it('empty string', function() { should.equal(block.cast(model, ''), ''); });
            it('undefined', function() { should.equal(block.cast(model, undefined), undefined); });
            it('empty object', function() {
                var emptyObj = {};
                should.deepEqual(block.cast(model, emptyObj), emptyObj);
            });
            it('empty array', function() {
                var emptyArr = [];
                should.deepEqual(block.cast(model, emptyArr), emptyArr);
            });
            it('empty object', function() {
                var deepEmptyObj = { a : '', b : undefined };
                should.deepEqual(block.cast(model, deepEmptyObj), deepEmptyObj);
            });
            it('empty object', function() {
                var deepEmptyArr = ['', undefined];
                should.deepEqual(block.cast(model, deepEmptyArr), deepEmptyArr);
            });
        });

        it('Should be number', function(done) {
            block.cast(block.types.number, '1.21').should.equal(1.21);
            done();
        });

        it('Should be string', function(done) {
            block.cast(block.types.string, 1).should.equal('1');
            done();
        });

        it('Should be boolean', function(done) {
            block.cast(block.types.boolean, 'true').should.equal(true);
            block.cast(block.types.boolean, 'false').should.equal(true);
            block.cast(block.types.boolean, 0).should.equal(false);
            block.cast(block.types.boolean, null).should.equal(false);
            block.cast(block.types.boolean, NaN).should.equal(false);
            done();
        });

        it('Should be array', function(done) {
            [
                'rent', '["rent"]', ['rent']
            ].forEach(function(value) { block.cast(block.types.array, value).should.eql(['rent']); });
            done();
        });

        it('Should be object', function(done) {
            block.cast(block.types.hash, { a : 1 }).should.eql({ a : 1 });
            block.cast(block.types.hash, '{ "a" : 1 }').should.eql({ a : 1 });
            done();
        });

        it('Should pass', function(done){
            should(block.cast({
                fields : {
                    number : { type : 'number' },
                    string : { type : 'string' },
                    boolean : { type : 'boolean' },
                    array : { of : 'number', type : 'array' }
                },
                type : 'hash'
            }, {
                number : '1',
                string : 1,
                boolean : 'true',
                array : '1',
                undefined : 'undefined'
            })).eql({
                    number : 1,
                    string : '1',
                    boolean : true,
                    array : [1],
                    undefined : undefined
                });

            done();
        });
    });
    describe('getBasicType', function() {});
    describe('validate', function() {});
    describe('getModelsFromData', function() {});
    describe('getUpdateData', function() {});
});
