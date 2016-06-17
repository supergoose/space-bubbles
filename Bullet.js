function Bullet(spr)
{
    this.x = 200;
    this.y = 200;
    var active = false;
    var rotation = 0;
    var sprite = spr;
    var velocity = {x:0, y:0};
    var speed = 1000;
    var lifespan = 1;
    var lifetime = 0;
    
    this.fire = function(startX, startY, dir)
    {
        active = true;
        this.x = startX;
        this.y = startY;
        rotation = dir;
        lifetime = 0;
        
        velocity.x = Math.cos(rotation) * speed;
        velocity.y = Math.sin(rotation) * speed;
    }
    
    function kill()
    {
        console.log("Kill");
        active = false;
    }
    
    this.update = function(dt)
    {
        if(active)
        {
            this.x -= velocity.x * dt;
            this.y -= velocity.y * dt;
            
            checkLifespan(dt);
        }
        
        sprite.visible = active;
    }
    
    var checkLifespan = function(dt)
    {
        lifetime += dt;
        if(lifetime > lifespan)
        {
            kill();
        }
    }
    
    this.render = function()
    {
        if(active)
        {
            sprite.x = this.x;
            sprite.y = this.y;
            sprite.rotation = rotation;
        }
        //sprite.visible = active;
    }
    
    this.getActive = function()
    {
        return active;
    }
    
    this.getSprite = function()
    {
        
        return sprite;
    }
}