/* global PIXI, keyboard, Bullet */

var Sprite = PIXI.Sprite;

function Spaceship(startX, startY, spr)
{
    Sprite.call(this, spr);
    
    this.x = startX;
    this.y = startY;
    
    this.anchor = {x:0.55, y:0.5};
    
    const maxspeed = 4;
    
    var velocity = {x:0, y:0};//x = spaceship.velocity.y = 0;
    var thrust = 0.1;
    var fireRate = .1;
    var fireCooldown = 0;
    
    var speed = 0;
    var direction = 0;
    
    var forward = null;
    var brake = null;
    var follow = null;
    
    var bullets = []; // of type Bullet
    var bulletId = 0;
    
    var ticker;
    
    this.setBullets = function(bul)
    {
        bullets = bul;
    }
    
    this.setForward = function(k)
    {
        forward = k;
    }
    
    this.setBrake = function(k)
    {
        brake = k;
    }
    
    this.setFollow = function(m)
    {
        follow = m;
    }
    
    this.setTicker = function(t)
    {
        ticker = t;
    }
    
    this.getBullets = function()
    {
        return bullets;
    }
    
    this.getVelocity = function()
    {
        return velocity;
    }
    
    this.playerInput = function()
    {
        this.lookAtFollow();
        applyThrust();
        applyBrake();
        this.checkShooting();
    
    }
    
    this.lookAtFollow = function()
    {
    	var difx =  follow.x - this.x;
    	var dify = follow.y - this.y;
    	
    	this.rotation = Math.atan2(dify, difx) + Math.PI/2;
    	
    	
    	direction = this.rotation + Math.PI/2;
    }
    
    var applyThrust = function()
    {
        if(forward.isDown)
        {
            
            velocity.x += Math.cos(direction) * thrust;
            velocity.y += Math.sin(direction) * thrust;
            
            //clamp the velocity
            speed = Math.sqrt((velocity.x*velocity.x)+(velocity.y*velocity.y));
            
            if(speed > maxspeed)
            {
                speed = maxspeed;

                var dir  = Math.atan2(velocity.y, velocity.x);
                velocity.x = Math.cos(dir) * speed;
                velocity.y = Math.sin(dir) * speed;
            }
        }
    }
    
    var applyBrake = function()
    {
        if(brake.isDown)
        {
            velocity.x *= 0.9;
            velocity.y *= 0.9;
        }
    }
    
    this.checkShooting = function()
    {
        if(follow.down)
        {
            if(fireCooldown > fireRate)
            {
                
                fireCooldown = 0;
                var fired = false;
                var i = 0;
                var b = bullets.getInvisibleChild();
                
                var dir = this.rotation-Math.PI*3/2;
                var gunPosY = this.y+ Math.sin(dir)*-24;
                var gunPosX = this.x+ Math.cos(dir)*-24;
                
                b.fire(gunPosX, gunPosY, dir);
                
                
            }else{
                
            }
        }
        
        fireCooldown += ticker.elapsedMS/1000;

    }
    
    
}

Spaceship.prototype = Object.create(Sprite.prototype);
Spaceship.prototype.constructor = Spaceship;

Spaceship.prototype.updateTransform = function()
{
    Sprite.prototype.updateTransform.apply(this, arguments);
    
    this.playerInput();
    
    this.x -= this.getVelocity().x;
    this.y -= this.getVelocity().y;
}