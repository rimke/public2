/*
*
*	video 扩展 1.0.0.1 
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
ET.extend(ET.extension, {video:{
	initialize:function(){
		ET.loadLib('progressbar');
		ET.loadLib('mediatypes');
		var _me=this;
		_me.Repeat=this.REPEAT_NONE;
		$(this).dblclick(function(){ this.DisplayingFullscreen()?this.exitFullScreen():this.FullScreen(); });
		$(this).on('canplay',function(){
			$(this).mousemove(function(){ this.showControlPanel(); })		
			.on('touchstart', function(e){ this.showControlPanel(); });
		}).on('ended', function(){ 			
			if(_me.Repeat==_me.REPEAT_ONE){
				_me.currentPlay-=1;
			}else{
				if(_me.currentPlay>=_me.data.list.length-1  ){
					if(_me.Repeat==_me.REPEAT_ALL){
						_me.currentPlay=-1;
					}else{
						return ;
					}
				}
			}
			_me.playNext();
		}).on('click, touchend', function(){
			if(this.tseek)return ;
			if(this.paused){
				this.play();
			}else{
				this.pause();
			}
		});
		this.ontouch();
		if(this.src){ this.addPlayList(this.src.split(';')); }
	}
	//触摸搜索
	,touchseek:function(n){this.currentTime+=n;}
	,ontouch:function(){
		$(this).on({
			touchstart:function(e){ ET.event.preventDefault(e);ET.event.stopPropagation(e); this.tse=event; }
			,touchmove:function(){ this.tee=event;this.tseek=true; }
			,touchend:function(e){
				if(!this.tseek)return ;
				ET.event.preventDefault(e);ET.event.stopPropagation(e);
				var ts=this.tse.touches[0]
				,te=this.tee.touches[0]
				,dx = ts.pageX-te.pageX
				,dy = ts.pageY-te.pageY
				,dire=0; // 移动方向 0向上 1向右 2向下 3向左
				if( (dx>=0 && dy>0 && dx<dy) || (dx<=0 && dy>0 && dx*-1<dy) ){
					dire=0;
				}else if( (dx>0 && dy>=0 && dx>dy)||(dx>0 && dy<=0 && dx>dy*-1) ){
					dire=3;  
				}else if( (dx<0 && dy<=0 && dx<dy)||(dx<0 && dy>=0 && dx*-1>dy) ){
					dire=1;  
				}else if( (dx<=0 && dy<0 && dx>dy)||(dx>=0 && dy<0 && dx<dy*-1) ){
					dire=2;  
				}
				if( dire==1 ){ this.touchseek(5);  }
				if( dire==3 ){ this.touchseek(-5);  }
				this.tseek=false;
			}
		});

	}
	,REPEAT_ONE:1// 单曲循环
	,REPEAT_ALL:2// 全部循环
	,REPEAT_NONE:0// 不循环 (默认)
	,currentPlay:0
	,data:{list:[]}
	,getPlayList:function(){return this.data.list; }
	// 设置播放列表
	// var lst=[{title:'', url:''}];
	,setPlayList:function(lst){
		this.data.list=[];
		if(!lst){ return ; }
		this.addPlayList(lst);
	}
	,addPlayList:function(itm){
		if(!itm){return this;}
		if( ET.object.getType(itm)=="array" ){
			for(var i=0, l=itm.length; i<l; i++){ this.addPlayList(itm[i]); }
			return this;
		}
		if(ET.object.getType(itm)== "string"){itm={'url':itm};}
		if(!itm.url){return this;}
		if(!this.src){this._loadfile(itm.url);}
		this.data.list.push({'title':itm.title?itm.title:'', 'url':itm.url});
		return this;
	}
	,playPrevious:function(){
		if(this.currentPlay===undefined){this.currentPlay=this.data.list.length;}
		this.currentPlay--;
		this._play();
		this.play();
	}
	,playNext:function(){
		if(this.currentPlay===undefined){this.currentPlay=-1;}
		this.currentPlay++;
		this._play();
		this.play();
	}
	//加载完成后执行此函数
	,onloadeddata:function(){
	}
	,_loadfile:function(data){
		var _me = this;
		if( typeof(data)=='string' ){
			var ext = data.replace(/.*\.(\w+)$/gi, '$1');
			var type = ET.mediatypes.getIANAMIME(ET.mediatypes.IANAMIME_VIDEO|ET.mediatypes.IANAMIME_AUDIO, ext);
			if(type && type.length){type=type[type.length-1].Template; }
			return this._loadfile({
				'url':data
				,'type':type
			});
		}
		var source = ET.ce('source', {'src':data.url, 'type':data.type});
		$(this).empty().append([source, 'not support.']);
	}
	,_play:function(i){
		this.currentPlay=(i!=undefined)?i*1:this.currentPlay;
		this.currentPlay=this.currentPlay<0?0:this.currentPlay>=this.data.list.length?this.data.list.length-1:this.currentPlay;		
		var itm = this.data.list[this.currentPlay];
		var playbackRate=this.playbackRate;
		$(this).on('canplay',function(){ this.play(); });
		this._loadfile(itm.url);
		this.load();
		this.playbackRate=playbackRate;
		
	}

	//全屏显示
	,DisplayingFullscreen:function(){
		return this.webkitDisplayingFullscreen;
	}
	//退出全屏
	,exitFullScreen:function(){
		if(!this.webkitDisplayingFullscreen) return this;
		this.webkitExitFullScreen && this.webkitExitFullScreen();
		return this;
	}
	//进制全屏
	,FullScreen:function(){
		if(this.webkitDisplayingFullscreen)return this;
		this.webkitEnterFullScreen && this.webkitEnterFullScreen();
		return this;
	}
	// 当指定的音频/视频的元数据已加载时
	,loadedmetadata:function(){}
	// 当目前的播放位置已更改时
	,timeupdate:function(){}
	//创建控制面板
	,showControlPanel:function(){
		this.createControlPanel();
		$(this._scp).css({
			// 'margin-top':ET.unit.pxorem($(div).height()*-1+'px')
			'width':ET.unit.pxorem($(this).outerWidth()+'px')
		});
		if(this.paused){
			$(this._scp).find('.btnPlay')[0].pause();
		}else{
			$(this._scp).find('.btnPlay')[0].play();
			$(this._scp).find('.bar>.ET_PROGRESS_BAR')[0].intervalRefresh();

		}
	}
	,createControlPanel:function(){
		if(this._scp){this._scp.show();return this;}
		if(this.controls){ this.controls=false; }
		var _me=this, div=ET.ce('div', {'class':'ET_STYLE_VIDEO_CP'})
		,ul=ET.ce('ul'), li=ET.ce('li'), ha=ET.ce('a', {'href':'javascript:void(0)', 'class':'btnPlay glyphicon glyphicon-play'})
		;
		
		$(ul).append( $(li).append(ha) );
		$(ha).click(function(e){ ET.event.preventDefault(e);div.playopause(); });
		ha.play=function(){ $(this).removeClass('glyphicon-play').addClass('glyphicon-pause'); }
		ha.pause=function(){ $(this).removeClass('glyphicon-pause').addClass('glyphicon-play'); }

		//进度条
		li=ET.ce('li', {'class':'bar'}), this._progressbar=ET.progressbar.create();		
		$(ul).append( $(li).append(this._progressbar) );
		$(this).on('play playing',function(){ _me._progressbar.intervalRefresh(); })
		.on('pause', function(){ clearInterval(this.tpb); });
		this._progressbar.onSeek=function(e){ if(!e)return ; _me.currentTime=_me.duration*e; }
		this._progressbar.intervalRefresh=function(){var p=this; clearInterval(this.tpb);this.tpb=setInterval(function(e){p.refresh();}, 100); }
		this._progressbar.refresh=function(){if(!_me.duration) return ; this.setRange(0, _me.duration); this.setPos(_me.currentTime); this.setStep(1); }
		this._progressbar.clear=function(){ clearInterval(this.tpb);}

		//播放速度
		li=ET.ce('li');
		var hspnSpeed=ET.ce('a', {'href':'javascript:void(0)', 'class':'btnspeed', 'innerHTML':'X1'})
		$(ul).append( $(li).append(hspnSpeed) );
		$(hspnSpeed).click(function(e) {
			var progressbar=ET.progressbar.create(0,100,null,null,1)
			, hdivsped=ET.ce('div', {'class':'speed'});
			progressbar.setPos(_me.playbackRate);
			progressbar.onSeek=function(r){ 
				var val = r<0.5?r:r<0.6?1:(r-0.6)*10+1;
				$(hspnSpeed).html( 'X'+val.toFixed(1) );
				div.playbackRate(val.toFixed(1)); 
			}
			progressbar.setPos(100*_me.playbackRate);
			$(hdivsped).append(progressbar);
			$(this).after(hdivsped);
			$(progressbar).find('a').focus();
			$(document).mousedown(function(e) { $(hdivsped).remove(); })
			.on('touchend', function(e){ $(hdivsped).remove(); });
		});		

		//音量
		li=ET.ce('li');
		var hspnVolume=ET.ce('a', {'href':'javascript:void(0)', 'class':'btnVolume', 'innerHTML': (this.volume*100)+'%'})
		$(ul).append( $(li).append(hspnVolume) );
		$(hspnVolume).click(function(e) {
			var progressbar=ET.progressbar.create(0, 100,null,null,1)
			, hdivsped=ET.ce('div', {'class':'volume'});
			progressbar.setPos(_me.volume);
			progressbar.onSeek=function(r){
				$(hspnVolume).html( parseInt(r*100)+'%' );
				div.setVolume(r.toFixed(1)); 
			}
			progressbar.setPos(100*_me.volume);
			$(hdivsped).append(progressbar);
			$(this).after(hdivsped);
			$(progressbar).find('a').focus();
			$(document).mousedown(function(e) { $(hdivsped).remove(); })
			.on('touchend', function(e){ $(hdivsped).remove(); });
		});

		//重复
		li=ET.ce('li');
		var btnRepeat=ET.ce('a', {'href':'javascript:void(0)', 'innerHTML':'-'})
		$(ul).append( $(li).append(btnRepeat) );
		$(btnRepeat).click(function(e) {
			if(_me.Repeat==_me.REPEAT_ONE){  //全部重复
				_me.Repeat=_me.REPEAT_ALL;
				_me.loop=false; 
				$(this).html('A');
			}else if(_me.Repeat==_me.REPEAT_ALL){//不重复
				_me.Repeat=_me.REPEAT_NONE;
				_me.loop=false; 
				$(this).html('-');
			}else { //单曲重复
				_me.Repeat=_me.REPEAT_ONE;
				_me.loop=true;
				$(this).html('1');

			}

		});


		$(div).append(ul);
		$(this).after(div);
		$.extend(div, this._controlpanel);
		div.initialize(this);
		this._scp=div;
		return this;
	}

	,_controlpanel:{
		_v:null
		,initialize:function(e){ this._v=e; }
		,show:function(){$(this).show(); }
		,playopause:function(){ this._v.paused?this.play():this.pause(); }
		,play:function(){ this._v.play(); $(this).find('.btnPlay')[0].play();}
		,pause:function(){ this._v.pause(); $(this).find('.btnPlay')[0].pause(); }
		,playbackRate:function(e){ this._v.playbackRate=e; return e;}
		,playbackRateAdd:function(e){ return this.playbackRate(this._v.playbackRate+0.25) }
		,playbackRateLess:function(e){ return this.playbackRate(this._v.playbackRate-0.25); }
		,setVolume:function(e){ this._v.volume=e>1?1:e<0?0:e; return this;}

	}
}});