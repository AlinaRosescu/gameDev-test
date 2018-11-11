(function() {
    const app = new PIXI.Application({
        width:600,
        height:400,
        backgroundColor: 0xD3D3D3,
        antialias: true,
        resolution: 1
    });

    document.getElementById('canvas').appendChild(app.view);
    app.renderer.autoResize = true;
    app.stage.interactive = true;
    app.view.style.backgroundColor ="#D3D3D3";

    let graphicsContainer = new PIXI.Container();
    let sprite;
    let hit;
    let gravity = 0.1;
    const graphicTypesArray = ["circle","ellipse","rectangle","triangle","pentagon", "hexagon", "random"];
    let graphicType = graphicTypesArray[Math.floor(Math.random() * graphicTypesArray.length)];

    //random number function
    const randomNumberFromRange = (min, max) => {
        let range = max-min;
        let random = Math.random() * range;
        return min + random;
    };

    //random color generator
    function randomColor() {
        return "0x" + Math.random().toString(16).slice(2, 8);
    }

    //create random graphic primitive
    const getShape = () => {
        let shape = new PIXI.Graphics();
        let graphicType = graphicTypesArray[Math.floor(Math.random() * graphicTypesArray.length)];
        shape.beginFill(randomColor());
        shape.lineStyle(0);

        if(graphicType === "circle") {
            shape.drawCircle(0,0,randomNumberFromRange(30,60));
            //area =
        } else if (graphicType === "rectangle") {
            shape.drawRect(0,0,randomNumberFromRange(50,100), randomNumberFromRange(50,100));
        } else if (graphicType === "ellipse") {
            shape.drawEllipse(0,0,randomNumberFromRange(30,60), randomNumberFromRange(30,60));
        } else if (graphicType === "triangle") {
            shape.drawPolygon([-32,64, 32,64, 0,0]);
        } else if(graphicType === "pentagon") {
            shape.drawPolygon([0,-50, -48,-15, -29,40, 29,40, 48,-15]);
        } else if(graphicType === "hexagon") {
            shape.drawPolygon([25,-43, -25,-43, -50,0, -25,43, 25,43, 50,0]);
        } else if(graphicType === "random") {
            let randomLineNr = Math.floor(randomNumberFromRange(4,12));
            shape.drawStar(0,0,randomLineNr, randomNumberFromRange(20,50),randomNumberFromRange(30,50),0);
        }
        shape.endFill();

        return shape;
    };

    //create sprite from graphic texture
    const getGraphicSprite = (graphic) => {
        let graphicSprite = new PIXI.Sprite(app.renderer.generateTexture(graphic));
        graphicSprite.anchor.x = 0.5;
        graphicSprite.y = 0-graphicSprite.height;
        graphicSprite.x = randomNumberFromRange(50,550);
        graphicSprite.vy = 0;
        graphicSprite.interactive = true;
        graphicSprite.buttonMode = true;
        graphicSprite.on('pointerdown', () => {
            hit = true;
            graphicSprite.parent.removeChild(graphicSprite);
        });
        graphicSprite
            .on('mouseover',() => {hit = true;})
            .on('mouseout',() => {hit = false;});

        return graphicSprite;
    };

    //add click event on canvas
    app.renderer.plugins.interaction.on('pointerdown', (event) => {
        if (!hit) {
            let sprite = graphicSprite(getShape());
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
    decreaseNrOfShapesPerSecond.addEventListener('click',()=> shapesControl = "decrease");
    let increaseNrOfShapesPerSecond = document.getElementById("increase-nr-shapes");
    increaseNrOfShapesPerSecond.addEventListener('click',() => shapesControl = "increase");

    //add gravity controls
    let decreaseGravityButton = document.getElementById("decrease-gravity");
    decreaseGravityButton.addEventListener('click',() => gravity -= 0.01);
    let increaseGravityButton = document.getElementById("increase-gravity");
    increaseGravityButton.addEventListener('click',() => gravity += 0.01);

    //select control buttons
    let nrShapesElement = document.getElementById("nr-of-shapes");
    let surfaceElement = document.getElementById("surface-area");


    //game loop
    app.ticker.add((delta) => {
        counter = Math.floor(randomNumberFromRange(0,2)+1);
        if(shapesControl === "decrease") {
            counter -=1;
        } else if(shapesControl === "increase") {
            counter += 1;
        }

        for (let i = 0;i< counter;i++) {
            sprite = getGraphicSprite(getShape());
            graphicsContainer.addChild(sprite);
        }
        graphicsContainer.children.forEach((item) => {
            item.vy += gravity;
            item.y += item.vy;
            if(item.y > app.renderer.height + item.height/2) {
                item.parent.removeChild(item);
            }
        });
        nrShapesElement.value = graphicsContainer.children.length;
        surfaceElement.value = app.renderer.extract.pixels(graphicsContainer).length + "px";

        app.renderer.render(app.stage);
    }, setTimeout(20));

})();


