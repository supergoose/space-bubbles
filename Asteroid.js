function Asteroid()
{
    var sprite = null;
    var velocity = {x:0, y:0};
    var angularRotation = 0.01;
    var speed = 100;
    var direction = 0;
    
    this.x = 0;
    this.y = 0;
    this.rotation = 0;
    
    this.loadSprite = function(spr)
    {
        sprite = spr;    
        sprite.anchor.x = sprite.anchor.y = 0.5;
        
        
    }
    
    this.getSprite = function()
    {
        return sprite;
    }
    
    this.update = function(dt)
    {
        velocity.x = Math.cos(direction) * speed;
        velocity.y = Math.sin(direction) * speed;
        
        this.x += velocity.x * dt;
        this.y += velocity.y * dt;
        this.rotation += angularRotation;
    }
    
    this.render = function()
    {
        sprite.x = this.x;
        sprite.y = this.y;
        sprite.rotation = this.rotation;
    }
}