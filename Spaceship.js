/* global keyboard, Bullet */

function Spaceship(startX, startY)
{
    var sprite = null;
    
    var x = startX;
    var y = startY;
    var rotation = 0;
    
    const anchor = {x:0.5, y:0.5};
    const maxspeed = 200;
    
    var velocity = {x:0, y:0};//x = spaceship.velocity.y = 0;
    var thrust = 15;
    var fireRate = .1;
    var fireCooldown = 0;
    
    var speed = 0;
    var direction = 0;
    
    var forward = null;
    var brake = null;
    var follow = null;
    
    var bullets = []; // of type Bullet
    var bulletId = 0;
    
    this.loadSprite = function(spr)
    {
        sprite = spr;
        sprite.anchor = anchor;
    }
    
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
    
    this.getSprite = function()
    {
        return sprite;
    }
    
    this.getBullets = function()
    {
        return bullets;
    }
    
    this.update = function(dt)
    {
        lookAtFollow(dt);
        applyThrust();
        applyBrake();
        checkShooting(dt);
        
        x += velocity.x * dt;
        y += velocity.y * dt;
    }
    
    this.render = function()
    {
        sprite.x = x;
        sprite.y = y;
        sprite.rotation = rotation;
    }
    
    var lookAtFollow = function()
    {
    	var difx =  follow.x - x;
    	var dify = follow.y - y;
    	rotation = Math.atan2(dify, difx) + Math.PI/2;
    	direction = rotation + Math.PI/2;
    	console.log("Look at: " + direction);
    }
    
    var applyThrust = function()
    {
        if(forward.isDown)
        {
            
            velocity.x -= Math.cos(direction) * thrust;
            velocity.y -= Math.sin(direction) * thrust;
            
            //clamp the velocity
            speed = Math.sqrt((velocity.x*velocity.x)+(velocity.y*velocity.y));
            
            if(speed > maxspeed)
            {
                speed = maxspeed;
                //direction = Math.atan2(velocity.y, velocity.x) + Math.PI/2;
                //rotation = direction - Math.PI/2;
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
    
    var checkShooting = function(dt)
    {
        if(follow.down)
        {
            console.log("direction: " + direction + ", firerate: " + fireRate);
            if(fireCooldown > fireRate)
            {
                fireCooldown = 0;
                var fired = false;
                var i = 0;
                while(!fired && i < 50)
                {
                    var b = bullets[i];
                    if(!b.getActive())
                    {
                        //angle of guns
                        b.fire(x, y, direction);
                        fired = true;
                    }
                    i++;
                }
            }else{
                
            }
        }
        
        fireCooldown += dt;

    }
    
    
}