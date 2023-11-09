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
                    if (res != null) {
                        return color;
                    }
                    else {
                        break 'Not a valid CSS Color';
                    }
                });
            } else {
                var hexCheck = color.substring(1, 6).split('');
                var hexString = '0123456789ABCDEFabcdef';
                hexCheck.forEach((check) => {
                    if (!hexString.contains(check)) {
                        break 'Not a valid hex color';
                    }
                });
                return color;
            }
        }
        catch (e) {
            if (!(e instanceof Error)) {
                e = new Error(e);
            }
            console.error(e.message);
        }
    }

    render() {
        
    }
}

class Triangle extends Shape {

}

class Circle extends Shape {

}

class Square extends Shape {

}
