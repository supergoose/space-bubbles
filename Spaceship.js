/* global PIXI, keyboard, Bullet, GameSprite, Utils */

var Sprite = PIXI.Sprite;

function Spaceship(startX, startY, spr, cam)
{
    GameSprite.call(this, spr);
    
    var openingPosition = {x:startX, y:startY};
    
    this.x = startX;
    this.y = startY;
    
    this.anchor = {x:0.55, y:0.5};
    
    this.rigidbody = true;
    
    const maxspeed = 4;

    var thrust = 0.3;
    var fireRate = .1;
    var fireCooldown = 0;
    var camera = cam;
    
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

    this.playerInput = function()
    {
        this.lookAtFollow();
        this.applyThrust();
        this.applyBrake();
        this.checkShooting();
    
    }
    
    this.lookAtFollow = function()
    {
    	var difx =  follow.x-camera.width/2;
    	var dify = follow.y-camera.height/2;
    	
    	this.rotation = Math.atan2(dify, difx) + Math.PI/2;
    	
    	
    	direction = this.rotation + Math.PI/2;
    }
    
    this.applyThrust = function()
    {
        if(forward.isDown)
        {
            //clamp the velocity
            var curVel = this.getVelocity();
            var vel = {
                x:curVel.x+ Math.cos(direction) * thrust,
                y:curVel.y+ Math.sin(direction) * thrust
            }
            
            
            var speed = Utils.hypot(vel.x, vel.y);
            
            if(speed > maxspeed)
            {
                speed = maxspeed;

                var dir  = Math.atan2(vel.y, vel.x);
                vel.x = Math.cos(dir) * speed;
                vel.y = Math.sin(dir) * speed;
            }
            
            this.setVelocity(vel.x, vel.y);
        }
    }
    
    this.applyBrake = function()
    {
        if(brake.isDown)
        {
            var vel = this.getVelocity();
            vel.x *= 0.9;
            vel.y *= 0.9;
            this.setVelocity(vel.x, vel.y);
        }
    }
    
    this.checkShooting = function()
    {
        if(follow.down)
        {
            if(fireCooldown > fireRate)
            {
                
                fireCooldown = 0;
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
    
    this.getMass = function()
    {
        return 2;
    }
    
    this.getOpeningPosition = function()
    {
        return openingPosition;
    }
}

Spaceship.prototype = Object.create(GameSprite.prototype);
Spaceship.prototype.constructor = Spaceship;

Spaceship.prototype.updateTransform = function()
{
    this.playerInput();
    GameSprite.prototype.updateTransform.apply(this, arguments);
}

Spaceship.prototype.reset = function()
{
    GameSprite.prototype.reset.apply(this, arguments);
    this.x = this.getOpeningPosition().x;
    this.y = this.getOpeningPosition().y;
}