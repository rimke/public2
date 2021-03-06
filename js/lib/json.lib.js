/*
*
*	json 1.0.0.1
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
ET.extend({json:{
	initialize:function(){
		if(!ET.object) ET.loadLib('object');
	}
	/**
	 * 将object转换成字符串
	 * @param  {[type]} obj [description]
	 * @return {[type]}     [description]
	 */
	,serialize:function(obj, tab){
		if(typeof(obj)!='object')return obj;
		if( obj instanceof Object ){
			return ET.object.serialize(obj, '{', '}', '"{{key}}":{{value}}', tab);
		}
		return null;
	}
}});