class ShapeModel extends PIXI.Graphics
{
    constructor(){
        super();
        const shape = this;
        shape.beginFill(randomColor());
        shape.lineStyle(0);
    }

    getCircleShape() {
        const shape = this;
        shape.drawCircle(0, 0, 30);
        shape.endFill();
        return shape;
    }

    getRectangleShape() {
        const shape = this;
        shape.drawRect(0, 0, randomNumberFromRange(50, 100), randomNumberFromRange(50, 100));
        shape.endFill();
        return shape;
    }

    getEllipseShape() {
        const shape = this;
        shape.drawEllipse(0, 0, randomNumberFromRange(30, 60), randomNumberFromRange(30, 60));
        shape.endFill();
        return shape;
    }

    getTriangleShape() {
        const shape = this;
        shape.drawPolygon([-32, 64, 32, 64, 0, 0]);
        shape.endFill();
        return shape;
    }

    getPentagonShape() {
        const shape = this;
        shape.drawPolygon([0, -50, -48, -15, -29, 40, 29, 40, 48, -15]);
        shape.endFill();
        return shape;
    }

    getHexagonShape() {
        const shape = this;
        shape.drawPolygon([25, -43, -25, -43, -50, 0, -25, 43, 25, 43, 50, 0]);
        shape.endFill();
        return shape;
    }

    getRandomShape() {
        const shape = this;
        let randomLineNr = Math.floor(randomNumberFromRange(4, 12));
        shape.drawStar(0, 0, randomLineNr, randomNumberFromRange(20, 50), randomNumberFromRange(30, 50), 0);
        shape.endFill();
        return shape;
    }

    getShape(randomType){
        const shape = this;

        if (randomType === "circle") {
            return shape.getCircleShape();
        } else if (randomType === "rectangle") {
            return shape.getRectangleShape();
        } else if (randomType === "ellipse") {
            return shape.getEllipseShape();
        } else if (randomType === "triangle") {
            return shape.getTriangleShape();
        } else if (randomType === "pentagon") {
            return  shape.getPentagonShape();
        } else if (randomType === "hexagon") {
            return shape.getHexagonShape();
        } else if (randomType === "random") {
            return shape.getRandomShape();
        }
    }



}