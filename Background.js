/* global PIXI, Bullet, GameSprite, ObjectPool, Resources, ParticleContainer */

var Container = PIXI.Container;
var Sprite = PIXI.Sprite;


function Background(f)
{
    var follow = f;
    var numStarPools = 6;
    
    var starPool = [];
    for(var i = 0; i < numStarPools; i++)
    {
        starPool[i] = new ParticleContainer();
    }
    
    var starFactory = function(tex)
    {
        var star = new Sprite(tex);
        star.x = Math.random()*(window.innerWidth-20);
        star.y = Math.random()*(window.innerHeight-20);
        
        return star;
    }
    
    for(var poolId = 0; poolId < numStarPools; poolId++)
    {
        for(var i = 0; i < 50; ++i)
        {
            var tex1 = Resources["Star2"].texture;
            starPool[poolId].addChild(starFactory(tex1));
        }
    }
    
        
    /*
    for(var poolId = 0; i < starPools.length; i++)
    {
        for(var i = 0; i < 50; ++i)
        {
            var tex1 = Resources["Star"+poolId].texture;
            starPools[poolId].addChild(starFactory(tex1));
        }
    }
    */
    
    this.getStarPool = function(n)
    {
        return starPool[n];
    }
    
    this.getNumberOfStarPools = function()
    {
        return numStarPools;
    }
    
    this.getFollow = function()
    {
        return follow;
    }
    
    this.getParalax = function(n)
    {
        var totalSpeed = 0.9;
        var baseSpeed = 0.8;
        var numPools = this.getNumberOfStarPools();
        var relIndex = n;
        var spd = (totalSpeed-baseSpeed)/numPools * relIndex;
        return baseSpeed + spd;
    }
}

Background.prototype.update = function(dt, camX, camY)
{
    for(var poolId = 0; poolId < this.getNumberOfStarPools(); poolId++)
    {
        this.getStarPool(poolId).x = this.getFollow().x*this.getParalax(poolId);
        this.getStarPool(poolId).y = this.getFollow().y*this.getParalax(poolId);
    }
    
    
}



