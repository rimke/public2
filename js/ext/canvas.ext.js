/*
*
*	Canvas 扩展 1.0.0.1 
*	Release date: 
*	Author		: 半条虫(466814195)
*	Keywords	: Etsoftware 半条虫(466814195) rimke 39doo 39度
*	Description	: 本脚本功能由EtSoftWare团队研发，仅供学习不得用于商业用途。
*	Blog		: http://rimke.blog.163.com/		
*	Website		: http://www.39doo.com/
*	Mail		: rimke@163.com
*	Copyright	: Power By Etsoftware
*
*/
ET.extend(ET.extension, {canvas:{
	initialize:function(){
		ET.loadLib('object');
		ET.loadLib('mediatypes');
		ET.loadLib('window');
		if( !$(this).html() ){ $(this).html( 'Does not support canvas'); }
		// ET.onappend(this);
		
	}	
	/**
	 * 画线
	 * @param  {[type]} x  起始点x位置
	 * @param  {[type]} y  起始点y位置
	 * @param  {[type]} x1 结束点x1位置
	 * @param  {[type]} y1 结束点y1位置
	 * @param  {[type]} conf 相关配置，如 lineWidth 线条宽 ， strokeStyle 线条色
	 * @return {[type]}    [description]
	 */
	,line:function(x,y, x1,y1, conf){
		x=x?x:0; y=y?y:0;
		return this.draw2d(function(){
			this.moveTo(x,y); this.lineTo(x1,y1);
		}, conf);		
	}
	/**
	 * 方法创建弧/曲线（用于创建圆或部分圆）
	 * @param  {[type]} x                圆的中心的 x 坐标。
	 * @param  {[type]} y                圆的中心的 y 坐标。
	 * @param  {[type]} r                圆的半径。
	 * @param  {[type]} sAngle           起始角，以弧度计。（弧的圆形的三点钟位置是 0 度）。
	 * @param  {[type]} eAngle           结束角，以弧度计。
	 * @param  {[type]} counterclockwise 可选。规定应该逆时针还是顺时针绘图。False = 顺时针，true = 逆时针。
	 * @param  {[type]} conf   			相关配置，如 lineWidth 线条宽 ， strokeStyle 线条色
	 * @return {[type]}                  返回为 this
	 */
	,arc:function(x, y, r, sAngle, eAngle, counterclockwise, conf){
		x=x?x:0; y=y?y:0;
		return this.draw2d(function(){
			this.arc(x, y, r, sAngle, eAngle, counterclockwise);
		}, conf);
	}
	/**
	 * 创建矩形
	 * @param  {[type]} x      矩形左上角的 x 坐标
	 * @param  {[type]} y      矩形左上角的 y 坐标
	 * @param  {[type]} width  矩形的宽度，以像素计
	 * @param  {[type]} height 矩形的高度，以像素计
	 * @param  {[type]} conf   相关配置，如 lineWidth 线条宽 ， strokeStyle 线条色
	 * @return {[type]}        [description]
	 */
	,rect:function(x, y, width, height, conf){
		x=x?x:0; y=y?y:0;
		return this.draw2d(function(){
			this.rect(x,y,width,height);
		}, conf);
	}
	/**
	 * 绘制文本
	 * @param  {[type]} text 规定在画布上输出的文本。
	 * @param  {[type]} x 开始绘制文本的 x 坐标位置（相对于画布）。
	 * @param  {[type]} y 开始绘制文本的 y 坐标位置（相对于画布）。
	 * @param  {[type]} maxWidth 可选。允许的最大文本宽度，以像素计。
	 * @param  {[type]} conf   相关配置，如 lineWidth 线条宽 ， strokeStyle 线条色
	 * @return {[type]}      [description]
	 */
	,strokeText:function(text, x, y, maxWidth, conf){
		x=x?x:0; y=y?y:0;
		maxWidth=maxWidth?maxWidth:100;
		return this.draw2d(function(){
			this.strokeText(text, x, y, maxWidth);
		}, conf);
	}
	/**
	 * 绘制图像、画布或视频
	 * @param  {[type]}	img	规定要使用的图像、画布或视频。
	 * @param  {[type]}	sx	可选。开始剪切的 x 坐标位置。
	 * @param  {[type]}	sy	可选。开始剪切的 y 坐标位置。
	 * @param  {[type]}	swidth	可选。被剪切图像的宽度。
	 * @param  {[type]}	sheight	可选。被剪切图像的高度。
	 * @param  {[type]}	x	在画布上放置图像的 x 坐标位置。
	 * @param  {[type]}	y	在画布上放置图像的 y 坐标位置。
	 * @param  {[type]}	width	可选。要使用的图像的宽度。（伸展或缩小图像）
	 * @param  {[type]}	height	可选。要使用的图像的高度。（伸展或缩小图像）
	 * @param  {[type]} conf    
	 * @return {[type]}         [description]
	 */
	,drawImage:function(img, sx, sy, swidth, sheight, x, y, width, height, conf){
		if(ET.object.getType(img)=="string"){
			var ext = img.replace(/.*\.(\w+)$/gi, '$1')
			if(ext){
				ext=ext.toLowerCase();
				if(ext=='jpg'){ext='jpeg';}
				var o=null;
				if(ET.mediatypes.getIANAMIME(ET.mediatypes.IANAMIME_IMAGE, ext)){o=new Image(); o.src=img; }
				else if(ET.mediatypes.getIANAMIME(ET.mediatypes.IANAMIME_VIDEO, ext)){ o=ET.ce('video', {'src':img}); }
				else if(ET.mediatypes.getIANAMIME(ET.mediatypes.IANAMIME_AUDIO, ext)){ o=ET.ce('audio', {'src':img}); }
				else{o=new Image(); o.src=img; }
				if(o){
					var _me=this, div=ET.ce('div');
					$(div).css({
						'visibility': 'visible','position': 'fixed'
						,'top': ET.unit.pxorem('-999rem')
						,'left': ET.unit.pxorem('-999rem')
					});
					ET.onappend(div, function(){
						_me.drawImage(o, sx, sy, swidth, sheight, x, y, width, height, conf);
						$(this).remove();
					})
					$(div).append(o);
					$('body').append(div);
					return this;
				}
			}
		}
		sx=sx?sx:0; sy=sy?sy:0;
		x=x?x:0; y=y?y:0;
		return this.draw2d(function(){
			this.drawImage(img, sx, sy, swidth, sheight, x, y, width, height);
		}, conf);
	}
	// 清空画布
	,clear:function(){ return this.clearRect(0,0, $(this).width(), $(this).height()); }
	/**
	 * 清空给定矩形内的指定像素
	 * @param  {[type]} x	要清除的矩形左上角的 x 坐标
	 * @param  {[type]} y	要清除的矩形左上角的 y 坐标
	 * @param  {[type]} width	要清除的矩形的宽度，以像素计
	 * @param  {[type]} height	要清除的矩形的高度，以像素计
	 * @return {[type]}        [description]
	 */
	,clearRect:function(x, y, width, height){
		var ctx = this.getContext('2d');
		ctx.clearRect(x, y, width, height);
		return this;
	}
	/**
	 * 绘制2d路径
	 * @param  {[type]} fun [description]
	 * @param  {[type]} conf 相关配置，如 lineWidth 线条宽 ， strokeStyle 线条色
	 * @param  {[type]} requestAnimationFrame 是否启用，默认为flase
	 * @return {[type]}     [description]
	 */
	,draw2d:function(fun, conf, requestAnimationFrame){
		var ctx = this.getContext('2d');
		ctx.save(); //保存状态
		if(conf){
			if(ET.object.getType( conf )=='function'){
				ET.exec(conf, ctx, ctx);
			}else if(ET.object.getType( conf )=='object'){
		 		$.extend(ctx, conf);
			}
		}		
		ctx.beginPath();//起始一条路径，或重置当前路径
		fun=fun?fun:function(){};
		if( ET.object.getType(fun)!= "function" ){fun=function(){}; }
		ET.exec(fun, this, ctx);
		if(conf){
			conf.fillStyle && ctx.fill(); //填充已定义的路径
			conf.strokeStyle && ctx.stroke(); //绘制已定义的路径 
		}else{
			ctx.stroke(); //绘制已定义的路径 
		}
		ctx.restore(); //恢复画布状态
		if(requestAnimationFrame){
			var _me=this;
			ET.window.requestAnimationFrame(function(){
				_me.draw2d(fun, conf, requestAnimationFrame);
			});
		}
		return this;
	}
}});