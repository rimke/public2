/*
*
*	window Beta 1.0.0.1
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
ET.extend({window:{
	initialize:function(){
		// ET.loadLib('object'); 
	}
	,requestAnimationFrame:function(fun){
		return window.requestAnimationFrame(fun) ||
		window.webkitRequestAnimationFrame(fun) ||
		window.mozRequestAnimationFrame(fun) ||
		function (fun) {window.setTimeout(fun, 100);};
	}
	,print:function(){
		if(window.print){
			return window.print();
		}
	}
}});