/*
*
*	array Beta 1.0.0.1
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
ET.extend({array:{
	initialize:function(){
		if(!ET.object) ET.loadLib('object');
		if (!Array.prototype.indexOf){
			Array.prototype.indexOf=this.fn.indexOf;
		}
	}
	,fn:{
		/**
		 * 方法可返回某个指定的字符串值在字符串中首次出现的位置。
		 * @param  {[type]} searchvalue 必需。规定需检索的字符串值。
		 * @param  {[type]} fromindex   可选的整数参数。规定在字符串中开始检索的位置。它的合法取值是 0 到 stringObject.length - 1。如省略该参数，则将从字符串的首字符开始检索
		 * @return {[type]}             [description]
		 */
		indexOf:function(searchvalue, fromindex){
			fromindex=fromindex?fromindex:0;
			var type = typeof(searchvalue);
			for (var i = 0; i <this.length; i++) {
				if( searchvalue==this[i]&& type== typeof(this[i]) ){return i; }
			}
			return -1;
		}
	}
	/**
	 * 将object转换成字符串
	 * @param  {[type]} obj [description]
	 * @return {[type]}     [description]
	 */
	,serialize:function(obj, tab){
		if(typeof(obj)!='object')return obj;
		if( obj instanceof Array ){
			return ET.object.serialize(obj, '[', ']', '{{value}}', tab);
		}
		return null;
	}
	/**
	 * 去重复
	 * 将数组中重复项去除掉，返回为没有重复的新数组
	 * @return {[type]} 成功返回为数组
	 */
	,removeRepeat:function(data){
		if(!data || data==null || data==undefined){return data;}
		var n = {}, r = [], len = data.length, val, type;
		for (var i = 0, l=data.length; i < l; i++) {
			val = data[i];
			type = typeof val;
			if (!n[val]) {
				n[val] = [type];
				r.push(val);
			} else if (n[val].indexOf(type) < 0) {
				n[val].push(type);
				r.push(val);
			}
		}
		return r;
	}

}});