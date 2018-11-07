/*
*
*	data 1.0.0.1  数据验证
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
ET.extend({data:{
	initialize:function(){
		ET.loadLib('object');
	}
	/**
	 * 数据验证
	 * 验证数据是否符合要求规则
	 * @param  {[type]} data 数据
	 * @param  {[type]} re 验证规则
	 * @return {[type]}      成功返回为true, 失败返回为false
	 */
	,verification:function(data, re){
		var mf = 'gi';
		if( ET.object.getType(re) == "string" ){
			var m= /^(\/)(.+)\/([ig]*)$/gi.exec(re);			
			if(m){ re=m[2]; mf=m[3]; }
		}
		var re = (ET.object.getType(re)=='regexp')?re:new RegExp(re.toString(), mf);
		return re.test(data);
	}
	,isNumber:function(data){ return this.verification(data, /(^\d+$)|(^\d+\.\d+$)/gi); }
	,isMail:function(data){ return this.verification(data, /^[\w\.]+@[\w\.]+$/gi); }	
	,isURL:function(data){ return this.verification(data, /^((http[s]?)|(ftp)):\/\/.+$/gi); }	
	,isDateTime:function(data){
		var m= /(.*?)([\t\s]+|T)(.*)/gi.exec(data);
		if(!m) return false;
		if( !this.isDate(m[1]) )return false;
		if( !this.isTime(m[3]) )return false;
		return true;
	}
	,isDate:function(data){ 
		var y='\\d{4}', m='((0?[1-9])|(1[0-2]))', d = '((0?[1-9])|([1-2][0-9])|(3[0-1]))';
		if( this.verification(data, "^"+y+"\\-"+m+"\\-"+d+"$") ){return true;}
		if( this.verification(data, "^"+y+"/"+m+"/"+d+"$") ){return true;}
		if( this.verification(data, "^"+m+"/"+d+"/"+y+"$") ){return true;}
		return false;
	}	
	,isTime:function(data){
		var h='(([0-1]?[0-9])|(2[0-4]))', m='[0-5]?\\d', s='[0-5]?\\d';
		if( this.verification(data, "^"+h+"\\:"+m+"\\:"+s+"$") ){return true;}
		if( this.verification(data, "^"+h+"\\:"+m+"$") ){return true;}
		return false;
	}
	/**
	 * 长度范围限制，检测
	 * @param  {[type]} data   数据
	 * @param  {[type]} min    最短长度，默认为0
	 * @param  {[type]} max	   最大长度，默认为无限大
	 * @return {[type]}        [description]
	 */
	,lengthrangelimit:function(data, min, max){ return this.verification(data, "^[\\w\\W]{"+(min?min:0)+','+(max?max:'')+"}$"); }	

}});