var Collision = {
    
    circular: function(a, b, r)
    {
        var difx = a.x - b.x;
        var dify = a.y - b.y;
        var dif = Math.sqrt((difx*difx+dify*dify));
        if(dif > r)
        {
            return true;
        }
        return false;
    }
    
}