/*
*
*	localStorage Beta 1.0.0.1
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
ET.extend({localStorage:{
	initialize:function(){		
		if(!ET.object) ET.loadLib('object');
		this._cache={};
		// if(!ET.sha1) ET.loadLib('sha1');
		
		// if(!ET.string) ET.loadLib('string');
		// var md=ET.string.fingerprint( ET.object.serialize(this) );
		// var debug=this.get('ET_LIB_LS');
		// if(debug!==md){ this.clear(); this.set('ET_LIB_LS', md); }
	}
	/**
	 * 保存cookie数据
	 * 成功返回为true, 失败返回为false
	 * @param {[type]} key     字段名
	 * @param {[type]} value    值
	 * @param {[type]} expires 生存周期1970-1-1至今的毫秒数; 设置为“0”或负值,不进行保存 默认为86400000
	 */
	,set:function(key, value, expires){
		if(!localStorage)return false;
		expires=(expires!=undefined)?expires:(new Date()).getTime()+86400000;
		expires=(typeof expires=='number')?expires:0;
		if(expires<1){
			this._cache[key]=value;
			return true;
		}		
		var obj={data:value, dataType:typeof(value), expires:expires};		
		localStorage.setItem(key, ET.object.toString(obj));
		return true;
	}
	/**
	 * 删除数据
	 * @param  {[type]} key 指定字段
	 * @return {[type]}              [description]
	 */
	,unset:function(key){return this.removeItem(key);}
	,removeItem:function(key){
		if(!localStorage)return false;
		// delete localStorage[key];
		localStorage.removeItem(key);
		return true;
	}
	/**
	 * 清除所有数据
	 * @return {[type]} [description]
	 */
	,clear:function(){
		this._cache={};
		if(!localStorage)return false;
		localStorage.clear();
		return true;
	}
	/**
	 * 获取数据
	 * 成功返回为对应数据，失败返回为 undefined
	 * @param  {[type]} key 关键词
	 * @return {[type]}     [description]
	 */
	,get:function(key){
		if(this._cache[key]!=undefined)return this._cache[key];
		if(!localStorage)return undefined;
		var code = localStorage.getItem(key)
		,obj = ET.execJS(code) ;		
		if(!obj) return undefined;		
		if( obj.expires-(new Date()).getTime()<1 ){
			this.unset(key); return undefined;
		}
		return obj.data;
	}
}});