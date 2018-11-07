/*
*
*	responsive Beta 1.0.0.1 响应式插件
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
ET.extend({responsive:{
	initialize:function(){
		if(!ET.clientarea) ET.loadLib('clientarea');
		var _me = this;
		$(window).resize(function(){_me.resize(this);});
	}
	,funs:{xs:{},sm:{},md:{},lg:{}}
	,respSize:{
		'xs':{min:0,max:767}//手机
		,'sm':{min:768,max:0}//平板
		,'md':{min:992,max:0}//桌面
		,'lg':{min:1200,max:0}//桌面
	}
	,resize:function(obj){
		var w = $(obj).width();
		for(var s in this.respSize){
			var rs = this.respSize[s];
			var event = 'hidden';
			if( (rs.min <= w || rs.min==0) &&
			 (w <= rs.max || rs.max==0)
			 ){
			 	event = 'visible';
			}
			this.funs[s][event] && this.funs[s][event](obj);
		}
		return obj;
	}
	,xs:{'visible':function(fun){return ET.responsive.exec('xs', fun);}, 'hidden':function(fun){return ET.responsive.exec('xs', fun, true);}}
	,sm:{'visible':function(fun){return ET.responsive.exec('sm', fun);}, 'hidden':function(fun){return ET.responsive.exec('sm', fun, true);}}
	,md:{'visible':function(fun){return ET.responsive.exec('md', fun);}, 'hidden':function(fun){return ET.responsive.exec('md', fun, true);}}
	,lg:{'visible':function(fun){return ET.responsive.exec('lg', fun);}, 'hidden':function(fun){return ET.responsive.exec('lg', fun, true);}}
	/**
	 * Executive javascript code by Responsive
	 * @param  {respsize} type [responsevi type]
	 * @param  {[void]} fun  [Executive function ]
	 * @return {[bool]}      [Returns true if successful execution]
	 */
	,exec:function(type, fun, onhidden){
		var event = onhidden?'hidden':'visible';
		var funs_t=(this.funs[type][event])?this.funs[type][event]:function(e){return e;};
		this.funs[type][event]=function(e){ return fun( funs_t(e) );}
		return this.resize(window);
	}
}});