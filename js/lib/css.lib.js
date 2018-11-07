/*
*
*	css Beta 1.0.0.1
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
ET.extend({css:{
	initialize:function(){
		if(!ET.unit) ET.loadLib('unit');
		if(!ET.object) ET.loadLib('object');
		this.tobj = document.createElement('div');
		this.vendors = 'Ms O Moz Webkit'.split(' ');
	}
	/**
	 * 判断样式是否存在
	 * @param  {[type]} attr css属性
	 * @return {[type]}      存在返回为true, 失败返回为false
	 */
	,exists:function(attr){
		if ( attr in this.tobj.style ) return true;
		attr = attr.replace(/^[a-z]/, function(val) {
			return val.toUpperCase();
		});
		var ilen = this.vendors.length;
		while(ilen--) {
			if ( "-"+this.vendors[ilen]+"-"+attr in this.tobj.style ) {
				return true;
			} 
		}
		return false;
	}
	/**
	 * 自动兼容
	 * 返回处理后的json数据
	 * @param  {[type]} attr css属性
	 * @param  {[type]} val  属性值
	 * @return {[type]}      json
	 */
	,autoCompatible:function(attr, val){
		if(!attr)return {};
		var ret={}; 
		if( ET.object.getType(attr)=="object" ){
			for(var k in attr){
				var o=this.autoCompatible(k, attr[k]);
				for(var k1 in o){ ret[k1]=o[k1]; }
			}
			return ret;
		}
		val=val+'';
		attr=attr.toLowerCase()
		if( this.exists(attr) ){ret[attr]=val;}
		for(var k in this.vendors){
			var nattr=('-'+this.vendors[k]+'-'+attr).toLowerCase();
			if( this.exists(nattr) ){ret[nattr]=val; }
		}
		if(attr=='opacity'){
			if( this.exists('filter') ){ ret['filter']='alpha(opacity='+val+')'; }
		}
		return ret;
	}
	/**
	 * 输出css文件到当前页
	 * @param  {[type]} val [description]
	 * @return {[type]}     [description]
	 */
	,write:function(val){
		if(/^([\w\.\/\:]+\.css(\?.*)?)$/gi.test(val)){
			var ret=ET.getFile(val);
			ret = this.autoRPLPath(ret, val);
			return this.write(ret);
		}
		var id=ET.random.Hex(10), style="<style type=\"text/css\" id=\""+id+"\">"+val+"</style>";
		$('html>head').append(style);
		var obj=$('#'+id);
		if(obj && obj.length){return obj[0];}
	}
	/**
	 * 判断是否支持Media
	 * @return {Boolean} 支持返回为true, 不支持返回为false
	 */
	,isSupportMedia:function(){
		if(this._is_support_media!==undefined)return this._is_support_media;
		var fs='1px', dfs='';
		var div=ET.ce('div', {'id':'et_css_test', 'style':'opacity: 0;display: none;'});
		var style="<style type=\"text/css\">@media (min-width: 1px){ #et_css_test{font-size:"+fs+";} }</style>";
		$(div).append(style);		
		$(document.body).append( div );
		dfs=$(div).css('font-size');
		$(div).remove();
		this._is_support_media=(dfs==fs)?true:false;
		return this._is_support_media;
	}
	/**
	 * 判断是否支持rem
	 * @return {Boolean} 支持返回为true, 不支持返回为false
	 */
	,isSupportRem:function(){
		if(this._is_support_rem!==undefined)return this._is_support_rem;
		try{
			this.tobj.style.width='1rem';
			_is_support_rem=true;
		}catch(e){
			_is_support_rem=false;
		}
		return _is_support_rem;
	}
	/**
	 * 自动更换路径
	 * 将css中相对目录，替换成以path为基础的目录
	 * @param  {[type]} css  css内容
	 * @param  {[type]} path 基础位置
	 * @return {[type]}      返回为替换后的css
	 */
	,autoRPLPath:function(css, path){
		if(!css)return css; css+='';
		path = path?path:location.href;		
		var m=/^(.+?)((\/)|(\/[\w\.]+\.\w+(\?.*)?))?$/gi.exec(path);
		if(!m)return css;
		path = m[1];
		var re = new RegExp('url[\\s\\t]*\\([\\s\\t]*([^\\)]+)[\\s\\t]*\\)', 'gi');
		return css.replace(re, function(val){
			var mc = val.match(/\.\.\//gi);
			return val.replace(/(\.\.\/)+/gi, function(e){
				var re = new RegExp('(.+)(\\/\\w+){'+mc.length+'}', 'gi');				
				return path.replace(re, "$1/");
			});
		})
	}

}});