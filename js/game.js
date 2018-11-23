(function () {
    const app = new PIXI.Application({
        width: 600,
        height: 400,
        backgroundColor: 0xD3D3D3,
        antialias: true,
        resolution: 1
    });

    document.getElementById('canvas').appendChild(app.view);
    app.renderer.autoResize = true;
    app.stage.interactive = true;
    app.view.style.backgroundColor = "#D3D3D3";

    let graphicsContainer = new PIXI.Container();
    let shape;
    let sprite;
    let hit;
    let gravity = 0.1;

    //add click event on canvas
    app.renderer.plugins.interaction.on('pointerdown', (event) => {
        if (!hit) {
            let shape = new ShapeModel();
            let sprite = new SpriteModel(app,shape.getShape(randomShapeType()));
            sprite.x = event.data.global.x;
            sprite.y = event.data.global.y;
            graphicsContainer.addChild(sprite);
        }
    });

    //add graphicContainer to stage
    app.stage.addChild(graphicsContainer);

    //create counter for number of shapes per second and user controls
    let counter;
    let shapesControl;
    let decreaseNrOfShapesPerSecond = document.getElementById("decrease-nr-shapes");
    decreaseNrOfShapesPerSecond.addEventListener('click', () => shapesControl = "decrease");
    let increaseNrOfShapesPerSecond = document.getElementById("increase-nr-shapes");
    increaseNrOfShapesPerSecond.addEventListener('click', () => shapesControl = "increase");

    //add gravity controls
    let decreaseGravityButton = document.getElementById("decrease-gravity");
    decreaseGravityButton.addEventListener('click', () => gravity -= 0.01);
    let increaseGravityButton = document.getElementById("increase-gravity");
    increaseGravityButton.addEventListener('click', () => gravity += 0.01);

    //select control buttons
    let nrShapesElement = document.getElementById("nr-of-shapes");
    let surfaceElement = document.getElementById("surface-area");


    //game loop
    app.ticker.add(delta => gameLoop(delta));

    function gameLoop(delta) {
        counter = Math.floor(randomNumberFromRange(0, 2) + 1);
        if (shapesControl === "decrease") {
            counter -= 1;
        } else if (shapesControl === "increase") {
            counter += 1;
        }

        for (let i = 0; i < counter; i++) {
            shape = new ShapeModel();
            sprite = new SpriteModel(app,shape.getShape(randomShapeType()));
            graphicsContainer.addChild(sprite);
            hit = sprite.getHitValue();
        }
        graphicsContainer.children.forEach((item) => {
            item.vy += gravity;
            item.y += item.vy * delta;
            if (item.y > app.renderer.height + item.height / 2) {
                item.parent.removeChild(item);
            }
        });
        nrShapesElement.value = graphicsContainer.children.length;
        surfaceElement.value = app.renderer.extract.pixels(graphicsContainer).length;

        app.renderer.render(app.stage);
    }
})();


