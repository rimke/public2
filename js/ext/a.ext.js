/*
*
*	a 扩展 1.0.0.1 
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
ET.extend(ET.extension, {a:{
	initialize:function(){
		if(!ET.event) ET.loadLib('event');
		var callback=$(this).attr('oncallback');
		callback  && this.async(callback);
	}
	,async:function(obj){
		if( !obj ){
			return ;
		}else if( ET.object.getType(obj)=='string' ){
			this.callback=new Function('e', obj);
		}else if( ET.object.getType(obj)=='function' ){
			this.callback=obj;
		}
		$(this).click(function(e){
			var _me = this;
			e=e?e:event;
			ET.event.preventDefault(e);
			$.ajax({
				'type':'get'
				,'url':$(this).attr('href')
				,'success':function(e){
					_me.callback && _me.callback(e);
				}
			});
			return false;
		});
	}
}});