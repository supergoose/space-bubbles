/* global PIXI */
var Sprite = PIXI.Sprite;

function GameSprite(spr)
{
    Sprite.call(this, spr);
    
    var velocity = {x:0, y:0};
    
    this.active = true;
    this.rigidbody = false;
    
    
    
    this.setVelocity = function(velX, velY)
    {
        velocity.x = velX;
        velocity.y = velY;
    }
    
    this.getVelocity = function()
    {
        return velocity;
    }
    
    this.setVector = function(v)
    {
        velocity.x = Math.cos(v.r)*v.s;
        velocity.y = Math.sin(v.r)*v.s;
    }
    
    this.getMass = function()
    {
        return 10;
    }
    
}

GameSprite.prototype = Object.create(Sprite.prototype);
GameSprite.prototype.constructor = GameSprite;

GameSprite.prototype.updateTransform = function()
{
    Sprite.prototype.updateTransform.apply(this, arguments);
    
    if(this.active)
    {
        this.x -= this.getVelocity().x;
        this.y -= this.getVelocity().y;
    }
}

GameSprite.prototype.collided = function(o)
{
    //has a collided method, but doesn't do anything yet
}

GameSprite.prototype.kill = function()
{
    this.active = false;
    this.visible = false;
}

GameSprite.prototype.setVelocity = function(velX, velY)
{
    this.setVelocity(velX, velY);
}

GameSprite.prototype.getVelocity = function()
{
    return this.getVelocity();
}

GameSprite.prototype.getVector = function()
{
    var vel = this.getVelocity();
    var s = Math.sqrt((vel.x*vel.x)+(vel.y*vel.y));
    return {speed: s, direction: this.rotation};
}

GameSprite.prototype.distanceTo = function(o)
{
    var d = Math.sqrt((this.x - o.x)*(this.x - o.x)+(this.y - o.y)*(this.y - o.y));
    return d;
}

GameSprite.prototype.reset = function()
{
    this.setVelocity(0,0);
}