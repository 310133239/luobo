/**
 * 
 * @param {divSelector} 需要轮播div的选择器
 * @param {preSelector} 上一页按钮的选择器
 * @param {nextSelector} 下一页按钮的选择器
 * @param {isAuto} 是否自动播放  (可选参数，默认不自动播放)
 * @param {autoMS} 自动播放频率，单位（毫秒）（可选参数，默认2000毫秒）
 * @author 你们敬爱的胖哥
 * 
 * 
 * 注意：
 * 	本插件依赖jquery 版本不限 1.7以上即可
 * 
 * 要求格式
 * <div id=""> 这个div就是我们需要轮播的div
 * 		<div> 这个div是固定写法用于轮播内容伸缩
 * 			<ul> 这个ul是轮播的主体，里面放一屏的数据，如果有多屏 请写多个ul 如果不足3屏 代码会自动补全（轮播最少三屏数据）
 * 				
 * 			</ul> 
 * 		</div>
 * </div>
 * 
 * 使用方法：
 * 	再页面底部加入js代码段
 * 
 * 	常规方式，不需要自动轮播
 * 	$(function(){
 *		// 参数：div选择器，上一页按钮选择器，下一页按钮选择器 
 * 		new Lunbo(".main-3-2", ".pre", ".next");
 * 	})
 *  其他方式，需要自动轮播
 * 	$(function(){
 *		// 参数：div选择器，上一页按钮选择器，下一页按钮选择器，自动轮播开关，自动轮播周期
 * 		var lunbo = new Lunbo(".main-3-2", ".pre", ".next",true，5000);
 * 	})
 * 
 * 	js 手动控制停止轮播代码
 *  上面控制轮播后  可以操作播对象停止自动轮播
 *  lunbo.clearJob();
 *  手动下一页
 *  lunbo.nextFunc();
 *  手动上一页
 *  lunbo.preFunc();
 * 
 */

function Lunbo(divSelector,preSelector,nextSelector,isAuto,autoMS){
	this._init(divSelector,preSelector,nextSelector,isAuto,autoMS)
}

Lunbo.prototype._init = function(divSelector,preSelector,nextSelector,isAuto,autoMS){
	if(divSelector){
		var me = this;
		me.lunboDiv = $(divSelector);
		me.overDiv = this.lunboDiv.find(">div");
		if(nextSelector){
			me.next = $(nextSelector);
			if(me.next.length>0){
				me.next.click(function(){
					me.nextFunc(me);
				});
			}
		}
		if(preSelector){
			me.pre = $(preSelector);
			if(me.pre.length>0){
				me.pre.click(function(){
					me.preFunc(me);
				});
			}
		}		
		var ul = me.overDiv.find(">ul");
		var ul0 = ul.eq(0);
		me.overWidth = ul0.width();
		if(ul.length < 3){
			for(var i=0;i<(3-ul.length);i++){
				me.overDiv.append("<ul>"+ul0.html()+"</ul>");
			}
		}else if(ul.length == 3){
			var ul1 = ul.eq(1);
			me.overDiv.append(ul0);
			me.overDiv.append(ul1);
		}
		me.lunboDiv.css({"overflow":"hidden","width":this.overWidth+"px"});
		ul = me.overDiv.find(">ul");
		ul.css({"position":"relative","float":"left"});
		me.overDiv.css({
			"width":(ul.length*this.overWidth)+"px",
			"margin-left": "-"+ul.width()+"px"
		});
		this.isAuto = isAuto;
		this.autoMS = autoMS;
		this.startJob();
		me.lunboDiv.hover(function(){
			me.clearJob();
		},function(){
			me.startJob();
		});
	}
	
};
Lunbo.prototype.preFunc = function(){
	var me = null;
	if(!me){
		me = this;
	}
	var marginLeft = parseInt(me.overDiv.css("margin-left")) + me.overWidth;
	me.overDiv.animate({"margin-left": marginLeft+"px"},2000,function(){
		me.overDiv.find(">ul:last").prependTo(me.overDiv);
		me.overDiv.css({"margin-left": "-"+ me.overWidth +"px"});
	});
};
Lunbo.prototype.nextFunc = function(){
	var me = null;
	if(!me){
		me = this;
	}
	var marginLeft = parseInt(me.overDiv.css("margin-left")) - me.overWidth;
	me.overDiv.animate({"margin-left":marginLeft+"px"},2000,function(){
		if(marginLeft < -me.overWidth){
			me.overDiv.find(">ul:first").appendTo(me.overDiv);
			me.overDiv.css({"margin-left": "-"+ me.overWidth +"px"});
		}
	});
};
Lunbo.prototype.clearJob = function(){
	if(this.job){
		clearInterval(this.job);
	}
};
Lunbo.prototype.startJob = function(){
	if(this.isAuto){
		var ms;
		if(this.autoMS){
			ms = this.autoMS;
		}else{
			ms = 3000;
		}
		var me = this;
		me.job = setInterval(function(){
			me.nextFunc(me);
		},ms);
	}
}
