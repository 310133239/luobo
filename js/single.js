function L(selector,pre,next){
    this.div = $(selector);
    this.px = this.div.find("li:first").outerWidth();
    this.initPx = 275;
    this.lb = this.div.find(">ul:first");
    this.lb.css({
        left:"-"+this.initPx+"px"
    });
    var me = this;
    $(pre).click(function(){
        me.pre();
    });
    $(next).click(function(){
        me.next();
    });
    setInterval(function(){
        me.next();
    },3000);
}
L.prototype.exec = function(flag){
    var me = this;
    if(flag){
        this.lb.animate({left:"0px"},400,function(){
            me.lb.find("li:last").prependTo(me.lb);
            me.lb.css({
                left:"-"+me.initPx+"px"
            });
        });
    }else{
        this.lb.animate({left:"-"+(me.initPx+me.px)+"px"},400,function(){
            me.lb.find("li:first").appendTo(me.lb);
            me.lb.css({
                left:"-"+me.initPx+"px"
            });
        });
    }
};
L.prototype.pre = function(){
    this.exec(true);
};
L.prototype.next = function(){
    this.exec(false);
};