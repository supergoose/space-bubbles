/* global PIXI, Bullet */

var Sprite = PIXI.Sprite;

function Asteroid(spr, ang)
{
    Sprite.call(this, spr);
    
    this.x = Math.random()*window.innerWidth-20;
    this.y = Math.random()*window.innerHeight-20;
    
    this.anchor.x = this.anchor.y = 0.5;
    
    var velocity = {x:0, y:0};
    var angularRotation = 0.01;
    var speed = 1;
    var direction = Math.random()*Math.PI*2;
    var active = true;
    
    this.getVelocity = function()
    {
        return velocity;
    }
    
    this.getAngularRotation = function()
    {
        return angularRotation;
    }
    
    this.getSpeed = function()
    {
        return speed;
    }
    
    this.getDirection = function()
    {
        return direction;
    }
    
    this.setVelocity = function(velX, velY)
    {
        velocity.x = velX;
        velocity.y = velY;
    }
    
    this.updateVelocity = function()
    {
        velocity.x = Math.cos(direction)*speed;
        velocity.y = Math.sin(direction)*speed;
    }
    
    this.kill = function()
    {
        this.visible = false;
        active = false;
    }
    
    this.getActive = function()
    {
        return active;
    }
    
    this.collided = function(o)
    {
        this.kill();
    }
}

Asteroid.prototype = Object.create(Sprite.prototype);
Asteroid.prototype.constructor = Asteroid;

Asteroid.prototype.updateTransform = function()
{
    Sprite.prototype.updateTransform.apply(this, arguments);
    
    this.updateVelocity();

    var vel = this.getVelocity();
    this.x += vel.x;
    this.y += vel.y;
    this.rotation += this.getAngularRotation();
    
    
}