class Shape {
    constructor(text, textColor, shapeColor) {
        this.text = setText(text);
        this.textColor = validateColor(color);
        this.shapeColor = validateColor(color);
    }

    setText(text) {
        this.text = text.substring(0, 3);
    }

    setTextColor(color) {
        this.textColor = validateColor(color);
    }
    
    setShapeColor(color) {
        this.shapeColor = validateColor(color);
    }

    validateColor(color) {
        try {
            if (color.substring(0, 1) != '#') {
                fetch('https://csscolorsapi.com/api/colors/${color}')
                .then((res) => {
                    return res.json();
                }
                .then((cData) => {
                    if (cData != null) {
                        return cData.data.name;
                    }
                    else {
                        break new Error('Not a valid CSS Color');
                    }
                });
            } else {
                const hexRegex = new RegExp('/^#(?:(?:[\da-f]{3}){1,2}|(?:[\da-f]{4}){1,2})$/i');
                if (!hexRegex.test(color)) {
                    break new Error('Not a valid hex color');
                }
                return color;
            }
        }
        catch (e) {
            console.error(e.message);
        }
    }

    render() {
    }

    baseRender(insert) {
        return '<?xml version="1.0" standalone="no"?>
<svg width="300" height="200" version="1.1" xmlns="http://www.w3.org/2000/svg">
    ${insert}
</svg>';
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
        return '<polygon points="150, 18 244, 182 56, 182" fill="${shapeColor}"/>
            <text text-anchor="middle" x="150" y="100" fill="${textColor}">${text}</text>';
    }
}

class Circle extends Shape {
    constructor(text, textColor, shapeColor) {
        super(text, textColor, shapeColor);
    }

    render() {
        return '<circle cx="150" cy="100" r="50" fill="${shapeColor}"/>
            <text text-anchor="middle" x="150" y="100" fill="${textColor}">${text}</text>';
    }
}

class Square extends Shape {
    constructor(text, textColor, shapeColor) {
        super(text, textColor, shapeColor);
    }

    render() {
        return '<rect x="50" y="0" width="200" height="200" fill="${shapeColor}"/>
            <text text-anchor="middle" x="150" y="100" fill="${textColor}">${text}</text>';
    }
}
