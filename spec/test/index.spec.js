describe("peek-object tests /", function() {
  var peekObject = require('../../index');

  it("required module should not be null", function () {
    expect(peekObject).not.toBeNull();
  });
  
  it("if null, print null", function () {
    expect(peekObject(null)).toBe('null');
  });

  it("if undefined, print undefined", function () {
    expect(peekObject(undefined)).toBe('undefined');
  });
  
  it("if string, print the string", function () {
    expect(peekObject('string content')).toBe('(string): string content');
    expect(peekObject('12')).toBe('(string): 12');
    expect(peekObject('true')).toBe('(string): true');
    expect(peekObject('null')).toBe('(string): null');
    expect(peekObject('undefined')).toBe('(string): undefined');
    expect(peekObject('')).toBe('(string): ');
  });

  it("if number, print the number", function () {
    expect(peekObject(12)).toBe('(number): 12');
    expect(peekObject(0)).toBe('(number): 0');
  });

  it("if irregular number, print gracefully", function () {
    expect(peekObject(NaN)).toBe('(number): NaN');
    expect(peekObject(Infinity)).toBe('(number): Infinity');
    expect(peekObject(1/Infinity)).toBe('(number): 0');
  });

  it("if boolean, print the boolean value", function () {
    expect(peekObject(true)).toBe('(boolean): true');
    expect(peekObject(false)).toBe('(boolean): false');
  });

  it("if symbol, print the symbol content", function () {
    expect(peekObject(Symbol())).toBe('(symbol): Symbol()');
    expect(peekObject(Symbol(''))).toBe('(symbol): Symbol()');
    expect(peekObject(Symbol('foo'))).toBe('(symbol): Symbol(foo)');
  });

  
  it("if date, print the date value", function () {
    var d = new Date();
    expect(peekObject(d)).toBe(`(Date): ${d.toString()}`);
  });
  
  describe("function tests /", function () {
    var a, b, c;

    beforeEach(function() {
    });

    it("conventional function", function () {
      a = function (params) {
        console.log('success: ', params);
      };

      expect(peekObject(a)).toBe(`(function): ${a.toString()}`);
    });
    
    it("arrow function", function () {
      b = (params) => {
        console.log('success: ', params);
      };

      expect(peekObject(b)).toBe(`(function): ${b.toString()}`);
    });

    it("member function", function () {
      c = { a:"a", b:"b" };
      c.fn = function name(params) {
        console.log('success: ', params);
      };

      expect(peekObject(c.fn)).toBe(`(function): ${c.fn.toString()}`);
    });
  });

  describe("empty object tests /", function () {
    var a, b, c;
    
    beforeEach(function() {
    });

    it("empty object", function () {
      a = {};
      expect(peekObject(a)).toBe(`(object): {\n}`);
    });

    it("empty new object", function () {
      b = new Object();
      expect(peekObject(b)).toBe(`(object): {\n}`);
    });

    it("empty array", function () {
      c = [];
      expect(peekObject(c)).toBe(`(array): {\n  length (number): 0\n}`);
    });
  });

  describe("non-empty object tests /", function () {
    var a, aRes, b, bRes;
    
    beforeEach(function() {
    });

    it("mixed object", function () {
      a = { a:1, b:'name', c: function () { return 'done'; }, d: true, e: null, f: undefined };
      aRes = `(object): {\n  a (number): 1\n  b (string): name\n  c (function): function () { return 'done'; }\n  d (boolean): true\n  e (null): null\n  f (undefined): undefined\n}`;
      
      expect(peekObject(a)).toBe(aRes);
    });

    it("non-empty array", function () {
      b = [1, 2, 3, 4];
      bRes = `(array): {\n  0 (number): 1\n  1 (number): 2\n  2 (number): 3\n  3 (number): 4\n  length (number): 4\n}`;
    
      expect(peekObject(b)).toBe(bRes);
    });

    it("reg objects", function() {
      var reg1 = /ab+c/;
      var reg2 = new RegExp('\\w+');

      expect(peekObject(reg1)).toBe(`(RegExp): ${/ab+c/.toString()}`);
      expect(peekObject(reg2)).toBe(`(RegExp): ${/\w+/.toString()}`);
    });

    it("promise", function() {
      var p = new Promise((resolve, reject) => {
        resolve(42);
      });

      expect(peekObject(p)).toBe('(Promise): [object Promise]');
    });
  });
});