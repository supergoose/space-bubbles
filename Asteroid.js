/* global PIXI, Bullet, GameSprite */

var Sprite = PIXI.Sprite;

function Asteroid(spr, ang)
{
    GameSprite.call(this, spr);
    
    this.x = Math.random()*window.innerWidth-20;
    this.y = Math.random()*window.innerHeight-20;
    
    this.anchor.x = this.anchor.y = 0.5;
    
    var angularRotation = 0.01-Math.random()*0.02;
    var speed = 1;
    var direction = Math.random()*Math.PI*2;
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