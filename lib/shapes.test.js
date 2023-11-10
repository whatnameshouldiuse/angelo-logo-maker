const { Triangle, Circle, Square } = require('./shapes.js');

describe('Shapes', () => {
  describe('Triangle', () => {
    it('should create a string of svg that represents a triangle', () => {
      var test = new Triangle('TST', 'Green', 'Red');
      var result ='<polygon points="150, 18 244, 182 56, 182" fill="Red"/><text text-anchor="middle" x="150" y="100" fill="Green">TST</text>';
      expect(test.render()).toEqual(result);
    });
  });

  describe('Circle', () => {
    it('should create a string of svg that represents a Circle', () => {
      var test = new Circle('TST', 'Green', 'Red');
      var result = '<circle cx="150" cy="100" r="50" fill="Red"/><text text-anchor="middle" x="150" y="100" fill="Green">TST</text>'
      expect(test.render()).toEqual(result);
    });
  });

  describe('Square', () => {
    it('should create a string of svg that represents a Square', () => {
      var test = new Square('TST', 'Green', 'Red');
      var result = '<rect x="50" y="0" width="200" height="200" fill="Red"/><text text-anchor="middle" x="150" y="100" fill="Green">TST</text>'
      expect(test.render()).toEqual(result);
    });
  });

  describe('No Text', () => {
    it('should create a string of svg without any text and only a shape', () => {
      var test = new Circle('', 'Blue', 'Yellow');
      var result = '<circle cx="150" cy="100" r="50" fill="Yellow"/>'
      expect(test.render()).toEqual(result);
    });
  });

  describe('Too Much Text', () => {
    it('should automatically use only the first 3 letters for its text', () => {
      var test = new Circle('Testing', 'Blue', 'Yellow');
      var result = '<circle cx="150" cy="100" r="50" fill="Yellow"/><text text-anchor="middle" x="150" y="100" fill="Blue">Tes</text>'
      expect(test.render()).toEqual(result);
    });
  });

  describe('CSS Color', () => {
    it('should follow the CSS library of colors to parse the input and use it for the logo', () => {
      var test = new Square('ICE', 'HoneyDew', 'HotPink');
      var result = '<rect x="50" y="0" width="200" height="200" fill="HotPink"/><text text-anchor="middle" x="150" y="100" fill="HoneyDew">ICE</text>'
      expect(test.render()).toEqual(result);
    });
  });

  describe('Mis-typed CSS Color', () => {
    it('should automatically use black for the shape, and white for the text', () => {
      var test = new Square('YAY', 'Yin', 'Yang');
      var result = '<rect x="50" y="0" width="200" height="200" fill="Black"/><text text-anchor="middle" x="150" y="100" fill="White">YAY</text>'
      expect(test.render()).toEqual(result);
    });
  });

  describe('Hex Color', () => {
    it('should follow the hex color exactly', () => {
      var test = new Triangle('BRY', '#FF4500', '#663399');
      var result ='<polygon points="150, 18 244, 182 56, 182" fill="#663399"/><text text-anchor="middle" x="150" y="100" fill="#FF4500">BRY</text>';
      expect(test.render()).toEqual(result);
    });
  });

  describe('Mis-typed Hex Color', () => {
    it('should automatically use black for the shape, and white for the text', () => {
      var test = new Triangle('BRY', '#FF45OO', '#666333999');
      var result ='<polygon points="150, 18 244, 182 56, 182" fill="Black"/><text text-anchor="middle" x="150" y="100" fill="White">BRY</text>';
      expect(test.render()).toEqual(result);
    });
  });
});

