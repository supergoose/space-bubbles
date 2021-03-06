/* global PIXI */
var Container = PIXI.Container;
var Sprite = PIXI.Sprite;

var ObjectPool = function(objClass, args, poolSize = 50)
{
    Container.call(this);
    
    for(var i = 0; i < poolSize; i++)
    {
        var o = new objClass(args);
        this.addChild(o);
    }
}

ObjectPool.prototype = Container.prototype;
ObjectPool.prototype.constructor = ObjectPool;

ObjectPool.prototype.getInvisibleChild = function()
{
    function isInvisible(c)
    {
        return !c.visible;
    }
    return this.children.filter(isInvisible)[0];
}

ObjectPool.prototype.getVisibleChildren = function()
{
    function isVisible(c)
    {
        return c.visible;
    }
    return this.children.filter(isVisible);
}

ObjectPool.prototype.resetChildren = function()
{
    for(var i = 0; i < this.children.length; i++)
    {
        var child = this.children[i];
        child.reset();
    }
}