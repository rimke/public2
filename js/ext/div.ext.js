/*
*
*	div 扩展 1.0.0.1 
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
ET.extend(ET.extension, {div:{
	initialize:function(){
		if(!ET.delayedLoading) ET.loadLib('delayedLoading');
		this.cid();
		this.readystate=0;		
		this._getCallback();
		if( $(this).attr('data-lazyload')!==undefined || $(this).attr('delayedLoading')!==undefined ) this.data_lazyload();
	}
	,_getCallback:function(){
		if(this.callback){return ;};
		var code=$(this).attr('callback');
		if( code==undefined ){
			this.callback=function(e){ return e; };
		}else if(code){
			this.callback=new Function('e', $(this).attr('callback'));
		}
	}
	,data_lazyload:function(){	
		var _me=this;
		ET.delayedLoading.createinstance(this, function(){	
			var _me = this;
			if(_me.readystate>0)return ;
			var url = _me.getUrl();
			if(!url) { 
				_me.readystate =2;
				if(typeof(_me.callback)=='function'){_me.callback(null);} 
				_me.readystate =4;
				return 1; 
			}
			_me.readystate =1;
			if( $(_me).is(':visible') ) _me.load(url, function(e){				
				_me.readystate =3;
				if(e.errcode==0){
					_me.data=e.data;
					_me.callback?_me.callback( e.data ):$(_me).html(e.data);
				}else{
					var div=ET.ce('div',{'class':'tx'}), err = type +" <span class=info><a href='" + url + "'>" + e.data + "</a></span> ";						
					$(div).html(err);
					$(_me).append(div);
				}
				_me.readystate =4;
			} );
			return 0; 
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
	,load:function(url, fun){
		var _me=this;
		ET.getFile(url, function(e){
			// _me.readystate =2;
			var ret ={errcode:1000, data:null};
			if(e){
				ret ={errcode:0, data:e};
			}
			fun && fun(ret);
		});
	}

}});