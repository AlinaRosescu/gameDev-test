
//random number function
function randomNumberFromRange (min, max) {
    let range = max - min;
    let random = Math.random() * range;

    return min + random;
}

//random color generator
function randomColor() {
    return "0x" + Math.random().toString(16).slice(2, 8);
}

function randomShapeType() {
    const graphicTypesArray = ["circle", "ellipse", "rectangle", "triangle", "pentagon", "hexagon", "random"];

    return graphicTypesArray[Math.floor(Math.random() * graphicTypesArray.length)];
}