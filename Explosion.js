/* global PIXI */

var MovieClip = PIXI.extras.MovieClip;

function Explosion(frames)
{
    MovieClip.call(this, frames);
    this.x = this.y = 300;

    this.anchor.set(0.5);
    this.animationSpeed = 0.2;
    this.visible = false;
    this.loop = false;

}

Explosion.prototype = Object.create(MovieClip.prototype);
Explosion.prototype.constructor = Explosion;

Explosion.prototype.updateTransform = function()
{
    MovieClip.prototype.updateTransform.apply(this, arguments); 
    
    if(this.visible)
    {
        if(this.playing)
        {
            if(this.currentFrame == this.totalFrames-1)
            {
                this.visible = false;
            }
        }
    }
}