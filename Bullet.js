/* global PIXI, GameSprite */
var Sprite = PIXI.Sprite;

function Bullet(spr)
{
    GameSprite.call(this, spr);
    
    this.x = 200;
    this.y = 200;
    this.visible = false;
    this.active = false;
    
    //var active = false;
    var speed = 20;
    var lifespan = 1;
    var lifetime = 0;
    var timer;
    
    this.fire = function(startX, startY, dir)
    {
        this.active = true;
        this.x = startX;
        this.y = startY;
        this.rotation = dir;
        this.visible = true;
        
        this.setVelocity(Math.cos(dir) * speed, Math.sin(dir) * speed);
        
        timer = new PIXI.ticker.Ticker();
    }
    
    this.stopTimer = function()
    {
        timer.stop();
    }
    
    this.resetLifetime = function()
    {
        lifetime = 0;
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
            this.kill();
        }
    }
}

Bullet.prototype = Object.create(GameSprite.prototype);
Bullet.prototype.constructor = Bullet;

Bullet.prototype.updateTransform = function()
{
    GameSprite.prototype.updateTransform.apply(this, arguments);
    
    if(this.active)
    {
        this.checkLife();
    }
}

Bullet.prototype.kill = function()
{
    GameSprite.prototype.kill.apply(this, arguments);
    
    this.stopTimer();
    this.resetLifetime();
    
}

Bullet.prototype.collided = function(o)
{
    GameSprite.prototype.collided.apply(this, arguments);
    this.kill();
}