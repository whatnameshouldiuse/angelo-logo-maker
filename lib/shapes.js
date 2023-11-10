const fetch = require('node-fetch');

class Shape {
    constructor(text, textColor, shapeColor) {
        this.text = text;
        this.textColor = textColor;
        this.shapeColor = shapeColor;
    }

    setText(text) {
        this.text = text.length > 3 ? text.substring(0, 3) : text;
    }

    async setTextColor(color) {
        var testColor = await this.validateColor(color);
        this.textColor = testColor;
    }
    
    async setShapeColor(color) {
        var testColor = await this.validateColor(color);
        this.shapeColor = testColor;
    }

    validateColor(color) {
        if (color.substring(0, 1) != '#') {
            fetch(`https://csscolorsapi.com/api/colors/${color}`)
            .then((res) => {
                return res.json();
            })
            .then((cData) => {
                if (cData.status == 200) {
                    return cData.data.name;
                }
                else {
                    console.error('Not a valid CSS Color');
                    return null;
                }
            });
        } else {
            const hexRegex = new RegExp('^#([A-Fa-f0-9]{6})$');
            if (!hexRegex.test(color)) {
                console.error('Not a valid hex color');
                return null;
            }
            return color;
        }
    }

    render() {
    }

    baseRender(insert) {
        return `<?xml version="1.0" standalone="no"?>
<svg width="300" height="200" version="1.1" xmlns="http://www.w3.org/2000/svg">
    ${insert}
</svg>`;
    }

    static getSVG() {
        const instance = new this(this.text, this.textColor, this.shapeColor);
        return baseRender(instance.render());
    }
}

class Triangle extends Shape {
    constructor(text, textColor, shapeColor) {
        super(text, textColor, shapeColor);
    }

    render() {
        var svg = `<polygon points="150, 18 244, 182 56, 182" fill="${this.shapeColor}"/>`;
        if (this.text.length > 0) {
            svg = svg.concat(`<text text-anchor="middle" x="150" y="100" fill="${this.textColor}">${this.text}</text>`);
        }
        return svg;
    }
}

class Circle extends Shape {
    constructor(text, textColor, shapeColor) {
        super(text, textColor, shapeColor);
    }

    render() {
        var svg = `<circle cx="150" cy="100" r="50" fill="${this.shapeColor}"/>`;
        if (this.text.length > 0) {
            svg = svg.concat(`<text text-anchor="middle" x="150" y="100" fill="${this.textColor}">${this.text}</text>`);
        }
        return svg;
    }
}

class Square extends Shape {
    constructor(text, textColor, shapeColor) {
        super(text, textColor, shapeColor);
    }

    render() {
        var svg = `<rect x="50" y="0" width="200" height="200" fill="${this.shapeColor}"/>`;
        if (this.text.length > 0) {
            svg = svg.concat(`<text text-anchor="middle" x="150" y="100" fill="${this.textColor}">${this.text}</text>`);
        }
        return svg;
    }
}

module.exports = {
    Triangle,
    Circle,
    Square
}
