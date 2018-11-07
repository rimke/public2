/*
*
*	player 播放器 Beta 1.0.0.1
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
ET.extend({player:{
	initialize:function(){
		ET.loadLib('object');
		ET.loadLib('css');
		ET.loadLib('event');	
		ET.loadLib('location')	
	}
	/**
	 * 获取实例
	 * @param  {[type]} data  播放列表
	 * @param  {[type]} title 光盘标题
	 * @param  {[type]} ico   图片
	 * @return {[type]}       [description]
	 */
	,getInstance:function(data, title, ico){
		var _me=this,div=ET.ce('div', {'class':'ET_PLAYER'})
		,tit=ET.ce('h2')
		,cd=ET.ce('div', {'class':'cd'})
		,discA=ET.ce('a', {'href':'javascript:void(0)'})
		,disc=this.createDisc(title, ico)
		,player=ET.ce('div', {'class':'player'})
		,lst=ET.ce('div', {'class':'lst'})
		;
		$(cd).append( discA );
		$(lst).append( this.createPlaylist(data, function(){
			_me.play(data, div, $(this).attr('idx')*1); 
			ET.location.href.setArguments({'eplay':$(this).attr('idx')});
		}));
		$(discA).append( disc ).click(function(e){
			ET.event.preventDefault(e); _me.play(data, div, 0); 
			ET.location.href.setArguments({'eplay':0});
		});
		if(title){ $(tit).html(title); }
		$(div).append([tit, cd, player, lst]);
		var his = ET.location.href.getArguments();
		
		if( his['eplay'] ){
			if(his['eplay']=='disc'){
				setTimeout(function(){   }, 100);
			}else{
				setTimeout(function(){ _me.play(his['eplay'], null);  }, 100);
			}
		}
		return div;
	}
	,play:function(data, div, idx){
		var hv=ET.ce('video', {'et':''});
		ET(hv); $(div).find('>.player').empty().append(hv);
		if(data.length<2) hv.loop=true;
		hv.addPlayList(data)._play(idx); 
		$(hv).on('seeked',function(){
			var disc=$(div).find('.disc')[0];
			if(disc){ disc.rePlay(hv.duration-hv.currentTime,1); }
		});
		var disc=$(div).find('.disc')[0];
		if(disc)disc.play(hv.duration,1);

	}
	//创建光盘图标
	,createDisc:function(title, img){
		var disc=ET.ce('div', {'class':'disc'})
		,c1=ET.ce('div', {'class':'c1'})
		,c2=ET.ce('div', {'class':'c2'})
		,spn=ET.ce('span',{'innerHTML': title }) ;
		if(img){
			$(disc).css({'background-image':'url('+img+')'} ); 
		}
		$(disc).append([c1,c2,spn]);
		disc.rePlay=function(time, speel){this.pause(); this.play(time, speel);return this;}
		disc.play=function(time, speel){
			time=time?time:1000; speel=speel?speel:1;
			$(this).css(ET.css.autoCompatible('transition','all '+time+'s linear'))
			.css(ET.css.autoCompatible('transform','rotate('+( speel*360*time )+'deg)'));
			return this;
		}
		disc.pause=function(){
			$(this).css('transition',null)
			.css('transform', null);
			return this;
		}
		return disc;
	}
	//创建播放列表
	,createPlaylist:function(data, onclick){
		var ul=ET.ce('ul');
		for(var i=0, l=data.length;i<l;i++){
			var itm = data[i];
			if(ET.object.getType(itm) =="string"){itm={title:'', url:itm}; }
			var li=ET.ce('li')
			,a=ET.ce('a', {'href':'javascript:void(0)', 'idx':i, 'innerHTML':itm.title}) ;
			$(li).click(function(){
				$(this).prevAll().removeClass('selected');
				$(this).addClass('selected');
			});
			$(a).click(function(e) {ET.event.preventDefault(e); 
				if(onclick){
					ET.exec(onclick, null, this);
				}
			 });
			$(ul).append( $(li).append(a) );

		}
		return ul;

	}
}});