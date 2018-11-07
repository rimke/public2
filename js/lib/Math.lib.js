/*
*
*	Math Beta 1.0.0.0
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
ET.extend({Math:{
	initialize:function(){
		// if(!ET.object) ET.loadLib('object');
	}
	/**
	 * 反math.pow函数
	 * @param  {[type]} 参数
	 * @return {[type]}     [description]
	 */
	,unpow:function(){
		var arg=arguments, e=2, n=0;
		if(arg.length==0){ return NaN;}
		if(arg.length>1){ e=arg[0]; n=arg[1]; }else{ n=arg[0];}
		return Math.log(n)/Math.log(e);
	}
	// 异或 运算 x^x
	,xor:function(){
		var arg=arguments;
		if(arg.length<2 ){return;}
		var ret = arg[0];
		for(var i=1;i<arg.length; i++){
			ret ^= arg[i];
		}
		return ret;
	}
}});