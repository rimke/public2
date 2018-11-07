/*
*
*	delayedLoading Beta 1.0.0.1 延迟加载
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
ET.extend({delayedLoading:{
	initialize:function(){
		if(!ET.clientarea) ET.loadLib('clientarea');
		if(!ET.unit) ET.loadLib('unit');
		var img = new Image();
		img.src = ET.imgPath+'data-lazyload.gif';
	}
	/**
	 * 创建实例
	 * @param  {[type]} ele Element元素
	 * @param  {[type]} fun 回调函数
	 * @return {[type]}     [description]
	 */
	,createinstance:function(ele, fun){
		if(!ele)return;
		$(ele).addClass('ET_DELAYEDLOADING');
		var imgurl=ET.imgPath+'data-lazyload.gif', img = ET.ce('img', {'style':'min-width:'+ET.unit.pxorem('10px')+';max-width:'+ET.unit.pxorem('50px')+';', src:imgurl, title:'Loading...'});
		if( ele.tagName.toUpperCase()=='IMG' ){ele.src=imgurl; }
		else {
			$(ele).append(img);
			ele.tmpobj=img;
		}
		ET.extend(ele, this.fn);		
		ET.clientarea.inside(ele, function(){
			var ret = false;
			if(fun) { ET.exec(fun, null, ele); }
			!ret && ele.removePreloading();
		});

		return ele;
	}
	,fn:{
		removePreloading:function(){
			if( this.tagName.toUpperCase()=='IMG' ){
				this.onload=function(){
					$(this).removeClass('ET_DELAYEDLOADING');
				}
			}else{
				$(this).removeClass('ET_DELAYEDLOADING');
			}
			if(this.tmpobj){
				$(this.tmpobj).remove();
				this.tmpobj=undefined;
			}
		}
	}
	

}});