/* global PIXI, Bullet, GameSprite */

var Sprite = PIXI.Sprite;

function Asteroid(spr, ang)
{
    GameSprite.call(this, spr);
    
    var openingPosition = {x: Math.random()*window.innerWidth-20, y: Math.random()*window.innerHeight-20};
    this.x = openingPosition.x;
    this.y = openingPosition.y;
    var openingDirection = Math.random()*Math.PI*2;;
    
    this.anchor.x = this.anchor.y = 0.5;
    
    this.rigidbody = true;
    
    var angularRotation = 0.01-Math.random()*0.02;
    var speed = 1;
    
    var direction = openingDirection;
    this.setVelocity(Math.cos(direction)*speed, Math.sin(direction)*speed);
    
    var active = true;
    
    this.getAngularRotation = function()
    {
        return angularRotation;
    }
    
    this.getDirection = function()
    {
        return direction;
    }
    
    this.setDirection = function(d)
    {
        direction = d;
        this.setVelocity(Math.cos(direction)*speed, Math.sin(direction)*speed);
    }
    
    this.getOpeningDirection = function()
    {
        return openingDirection;
    }
    
    this.getOpeningPosition = function()
    {
        return openingPosition;
    }
}

Asteroid.prototype = Object.create(GameSprite.prototype);
Asteroid.prototype.constructor = Asteroid;

Asteroid.prototype.updateTransform = function()
{
    GameSprite.prototype.updateTransform.apply(this, arguments);

    this.rotation += this.getAngularRotation();

}

Asteroid.prototype.collided = function(o)
{
    GameSprite.prototype.collided.apply(this, arguments);
    this.kill();
}

Asteroid.prototype.reset = function()
{
    GameSprite.prototype.reset.apply(this, arguments);
    this.x = this.getOpeningPosition().x;
    this.y = this.getOpeningPosition().y;
    this.setDirection(this.getOpeningDirection());
}