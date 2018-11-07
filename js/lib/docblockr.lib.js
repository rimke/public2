/*
*
*	docblockr Beta 1.0.0.1 自动注释
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
ET.extend({docblockr:{
	initialize:function(){
		// ET.loadLib('clientarea'); 
	}
	/**
	 * 获取代码中的所有函数列表
	 * @param  {[type]} code [description]
	 * @param  {[type]} fun  [description]
	 * @return {[type]}      [description]
	 */
	,getFunction:function(code, fun){
		fun=fun?fun:"\\w+";
		var re="("+
				"(,?\\s*(("+fun+")\\s*:\\s*function\\s*\\(.*?\\)))"+
				"|"+
				"(function\\s*("+fun+")\\s*\\(.*?\\))"+
				")", ret=[];
		var mc=code.match(new RegExp('(^|\r|\n|;)\\s*'+re+'\\s*', 'gi'));
		if(mc){
			for(var i=0, l=mc.length;i<l;i++){
				var m = mc[i];
				m=(new RegExp(re, 'gi')).exec(m);
				// console.log(m);
				if(m){
					ret.push( m[3]?m[3]:m[5]);
					// ret.push( m[1]);
				}
			}
		}
		return ret;
	}
		
	
}});