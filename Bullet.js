/* global PIXI */
var Sprite = PIXI.Sprite;

function Bullet(spr)
{
    Sprite.call(this, spr);
    
    this.x = 200;
    this.y = 200;
    this.visible = false;
    
    var active = false;
    var velocity = {x:0, y:0};
    var speed = 20;
    var lifespan = 1;
    var lifetime = 0;
    var timer;
    
    this.fire = function(startX, startY, dir)
    {
        active = true;
        this.x = startX;
        this.y = startY;
        this.rotation = dir;
        this.visible = true;
        
        velocity.x = Math.cos(dir) * speed;
        velocity.y = Math.sin(dir) * speed;
        
        timer = new PIXI.ticker.Ticker();
        
        
    }
    
    this.kill = function()
    {
        timer.stop();
        active = false;
        this.visible = false;
        lifetime = 0;
    }
    
    this.getActive = function()
    {
        return active;
    }
    
    this.getVelocity = function()
    {
        return velocity;
    }
    
    this.getLifetime = function()
    {
        return lifetime;
    }
    
    this.checkLife = function()
    {
        lifetime += timer.elapsedMS/1000;
        if(lifetime > lifespan)
        {
            //console.log("Kill");
            this.kill();
        }
    }
    this.collided = function(o)
    {
        console.log("Bullet collided");
        this.kill();
    }
    
}

Bullet.prototype = Object.create(Sprite.prototype);
Bullet.prototype.constructor = Bullet;

Bullet.prototype.updateTransform = function()
{
    Sprite.prototype.updateTransform.apply(this, arguments);
    
    if(this.getActive())
    {
        this.checkLife();
        
        this.x -= this.getVelocity().x;
        this.y -= this.getVelocity().y;
    }
    
    
}