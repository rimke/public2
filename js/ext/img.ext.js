/*
*
*	img 扩展 1.0.0.1
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
ET.extend(ET.extension, {img:{
	initialize:function(){
		if(!ET.delayedLoading) ET.loadLib('delayedLoading');
		this.cid();
		this.readystate =0;
		if( $(this).attr('data-lazyload') || $(this).attr('delayedLoading') ) this.data_lazyload();
		
	}
	,data_lazyload:function(){
		ET.delayedLoading.createinstance(this, function(){
			if(this.readystate>0)return ;
			var url = this.getUrl();			
			this.src = url;
			this.readystate =4;
		});
	}
	,getUrl:function(){
		if($(this).attr('data-lazyload'))return $(this).attr('data-lazyload');
		if($(this).attr('delayedLoading'))return $(this).attr('delayedLoading');
		if($(this).attr('href'))return $(this).attr('href');
		if($(this).attr('src'))return $(this).attr('src');
		if($(this).attr('action'))return $(this).attr('action');
		if($(this).attr('url'))return $(this).attr('url');
	}

}});