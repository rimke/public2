/*
*
*	albumized Beta 1.0.0.1 栅格化系统
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
ET.extend({albumized:{
	initialize:function(){
		if( this.events ){ return this;}
		var _me=this;
		$(window).resize(function() { _me.resize(); });
		this.events = []; return this;
	}
	,resize:function(){
		for (var i = 0; i<this.events.length; i++) {
			var ent = this.events[i];
			this.VH(ent.m, function(e){ e?ent.vfun?ent.vfun():null:ent.hfun?ent.hfun():null; });
		}
	}
	,im:function(mode, m, fun){
		var w = $('body').width(), cmode=null;
		mode=mode?mode:{
			xs:{min:0, max:767}
			,sm:{min:768, max:9999}
			,md:{min:992, max:9999}
			,lg:{min:1200, max:9999}
		};
		for(var key in mode){
			var cm = mode[key];
			cm.statu = ( cm.min <= w && cm.max >= w )?true:false;
		}
		if(fun && mode[m]!==undefined ){fun(mode[m].statu);}
		return this;
	}
	,VH:function(m, fun){
		var mode = {xs:{min:-999, max:767} ,sm:{min:768, max:9999} ,md:{min:768, max:991} ,lg:{min:992, max:9999} };
		this.im(mode, m, function(e){ fun && fun(e); }); return this;
	}
	,VHF:function(m, vfun, hfun){		
		this.events || this.init();
		this.events[this.events.length]={m:m, vfun:vfun, hfun:hfun};
		this.VH(m, function(e){ e?vfun?vfun():null:hfun?hfun():null; }); 
		return this;
	}
	/**
	 * xs 超小屏幕 手机 (<768px)
	 * @param  {[type]} vfun    显示函数，默认为null
	 * @param  {[type]} hfun	隐藏函数，默认为null
	 * @return {[type]}         返回当前实例
	 */
	,xs:function(vfun, hfun){ this.VHF('xs', vfun, hfun); return this;}
	//小屏幕 平板 (≥768px)
	,sm:function(vfun, hfun){ this.VHF('sm', vfun, hfun); return this;}
	// 中等屏幕 桌面显示器 (≥992px)
	,md:function(vfun, hfun){ this.VHF('md', vfun, hfun); return this;}
	//大屏幕 大桌面显示器 (≥1200px)
	,lg:function(vfun, hfun){ this.VHF('lg', vfun, hfun); return this;}
}});