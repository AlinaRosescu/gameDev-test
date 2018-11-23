class SpriteModel extends PIXI.Sprite
{
    constructor(app,shape,hit) {
        super(app.renderer.generateTexture(shape));
        const sprite = this;
        sprite.anchor.x = 0.5;
        sprite.position.y = 0 - sprite.height;
        sprite.position.x = randomNumberFromRange(50, 550);
        sprite.vy = 0;
        sprite.interactive = true;
        sprite.buttonMode = true;
        sprite.hit = false;
        sprite.on('pointerdown', () => {
            sprite.parent.removeChild(sprite);
        });
        sprite
            .on('mouseover', () => {
                sprite.hit = true;
            })
            .on('mouseout', () => {
                sprite.hit = false;
            });
    }

    getHitValue() {
        const sprite = this;
        return sprite.hit;
    }
}





