/*
*
*	object Beta 1.0.0.1
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
ET.extend({object:{
	initialize:function(){
		if(!ET.array) ET.loadLib('array');
		if(!ET.json) ET.loadLib('json');
		if(!ET.string) ET.loadLib('string');
	}
	,toString:function(obj){
		var t = this.getType(obj);
		if( t=='object' ){
			return ET.json.serialize(obj);
		}else if( t=='array' ){
			return ET.array.serialize(obj);
		}else{
			return obj;
		}
	}
	,getType:function(obj){
		var ret=Object.prototype.toString.call(obj)
		,m=/\[([^\s\t]+)[\s\t]*([^\s\t]+)\]/gi.exec(ret)
		,type = m?m[2].toLowerCase():''
		,tn = (obj && obj.tagName)?obj.tagName.toLowerCase():null;
		if(type=='object'){
			if(tn){
				type='html'+tn+'element';
			}else if(obj===null){
				type='null';
			}
		}		
		return type;
	}
	/**
	 * 判断对象是否为 HTMLELEMENT 元素
	 * @param  {[type]}  obj 传入要认证的对象
	 * @return {Boolean}        如果是Element对象返回为true, 不是返回为false
	 */
	,isElement:function(obj){ return (ET.object.getType(obj).indexOf('element')>-1)?true:false; }
	,isInputElement:function(obj){ return ET.object.getType(obj).indexOf('htmlinputelement')>-1?true:false; }
	/**
	 * 判断是否为日期对象
	 * @param  {[type]}  obj 传入要认证的对象
	 * @return {Boolean}        如果是日期对象返回为true, 不是返回为false
	 */
	,isDate:function(obj){ return ET.object.getType(obj)==='date' ; }
	/**
	 * 判断是否为 数字类型
	 * @param  {[type]}  obj 传入要认证的对象
	 * @return {Boolean}        如果是返回为true, 不是返回为false
	 */
	,isNumber:function(obj){ return ET.object.getType(obj)==='number' ; }
	/**
	 * 判断是否为 布尔类型
	 * @param  {[type]}  obj 传入要认证的对象
	 * @return {Boolean}        如果是返回为true, 不是返回为false
	 */
	,isBoolean:function(obj){ return ET.object.getType(obj)==='boolean' ; }
	/**
	 * 将object序列化
	 * @param  {[type]} Obj    序列化对象
	 * @param  {[type]} pre    前标签 如数组为'[' json为'{'， 默认系统自动识别
	 * @param  {[type]} sub    后标签 如数组为']' json为'}'， 默认系统自动识别
	 * @param  {[type]} itmtpl 模板， 默认系统自动识别
	 * @param  {[type]} tab    自动缩进， 默认系统自动缩进
	 * @return {[type]}        返回为个已经序列后的字符串
	 */
	,serialize:function(Obj, pre, sub, itmtpl, tab){
		var reVal = "", key='{{key}}', value='{{value}}';
		if(!itmtpl){ itmtpl='"'+key+'":'+value+''; }
		tab = tab?tab:'\t';
		if(typeof(Obj)!='object')return Obj;
		if(pre===undefined && sub===undefined){
			if( this.getType(Obj) =="array" ){ pre='['; sub=']'; }else{pre='{'; sub='}'; }
		}
		for(var k in Obj){
			var val = Obj[k];			
			if( val instanceof Array ){val = ET.array.serialize(val, tab+'\t'); }
			else if( typeof(val)=='object' && val === null ){ val= 'null'; }
			else if( typeof(val)=='object' ){ val = ET.json.serialize(val, tab+'\t'); }
			else if( typeof(val)=='string' ){ 
				val=val.replace(/([\"\'\\])/gi, "\\$1").replace(/\n/gi,"\\n").replace(/\r/gi,"\\r");
				val = "\""+val+"\"";
			}
			else if( typeof(val)=='number'){val*=1;}
			else if( typeof(val)=='boolean'){ val =val?'true':'false';}
			else if( typeof(val)=='function' ){val = val.toString(); }
			else{ val=val?val:'';}
			try{				
				var data={};
				data[key]=k;  data[value]=val;
				reVal += ",\n"+ tab + ET.string.format(itmtpl, data);
			}catch(e){throw e; }
		}
		reVal += "\n"+ tab.substring(1) + sub;
		reVal = pre + ( (reVal.length>1)?reVal.substring(1):reVal );
		var re = new RegExp("\\"+pre+"[^\\"+pre+"\\"+sub+"\\,]+\\"+sub, "gi")
		,mc = reVal.match(re);
		if(mc){
			for(var i=0; i<mc.length;i++){
				var nstr = mc[i].replace(/[\r\n\t]+/gi,'');
				reVal = reVal.replace(mc[i], nstr);
			}
		}
		return reVal;
	}
	/**
	 * 反序列化为oject
	 * 从已存储的表示中创建 
	 * @param  {[type]} str [description]
	 * @return {[type]}     [description]
	 */
	,unserialize:function(str){

	}

}});