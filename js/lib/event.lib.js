/*
*
*	event 扩展 1.0.0.1 
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
ET.extend({event:{
	initialize:function(){
		// ET.loadLib('string');
	}
	/**
	 * 停止传播事件
	 * @param  {[type]} e Event
	 * @return {[type]}   [description]
	 */
	,stopPropagation:function(e){
		try{
			e=(e&&e.stopPropagation)?e:window.event;
	        if(!e)return ;
	        e.stopPropagation?e.stopPropagation():e.cancelBubble = true;
	    }catch(e){
	    	console.log(e);
	    }
	}
	/**
	 * 防止默认
	 * @param  {[type]} e Event
	 * @return {[type]} [description]
	 */
	,preventDefault:function(e){
		try{
			e=(e&&e.preventDefault)?e:window.event;
	        if(!e)return ;
	        e.preventDefault? e.preventDefault(): e.returnValue = false;
		}catch(e){
	    	console.log(e);
	    }
	}
}});