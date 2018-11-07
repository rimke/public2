/*
*
*	cache Beta 1.0.0.1
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
ET.extend({cache:{
	initialize:function(){
		this.data={};
		if(!ET.localStorage) ET.loadLib('localStorage');
	}
	/**
	 * 设置缓存
	 * @param {[type]} key   关键字
	 * @param {[type]} value 缓存对象
	 * @param {[type]} expires 生存周期1970-1-1至今的毫秒数; 设置为“0”或负值，在关闭浏览器时，就马上清除; 
	 */
	,set:function(key, value, expires){
		expires=expires?expires:0;
		expires=(typeof expires=='number')?expires:0;		
		if(expires<1){
			this.data[key]=value;
			return true;
		}
		this.data[key] && delete(this.data[key]);
		if(ET.localStorage){
			if(ET.localStorage.set(key, value, expires)){
				return true;
			}
		}

	}
	/**
	 * 删除缓存
	 * @param  {[type]} key [description]
	 * @return {[type]}     删除成功返回为true, 返回失败返回false
	 */
	,unset:function(key){
		var ret=false;
		if( this.data[key] ){ ret = delete(this.data[key]); }
		if(ET.localStorage){ET.localStorage.unset(key); }
		return ret;
	}
	/**
	 * 清除所有数据
	 * @return {[type]} [description]
	 */
	,clear:function(){
		this.data={};
		if(ET.localStorage){ET.localStorage.clear();}
	}
	/**
	 * 获取缓存
	 * 成功返回为对应数据，失败返回为 undefined
	 * @param  {[type]} key [description]
	 * @return {[type]}     [description]
	 */
	,get:function(key){
		var ret=undefined;
		if( this.data[key]!==undefined ){ ret = this.data[key]; 
		} else if(ET.localStorage){
			ret=ET.localStorage.get(key);
			if(ret!==undefined){ return ret; }
		}
		return ret;
	}
}});