/*
*
*	progress bar Beta 1.0.0.1
*	Release date: 
*	Author		: 半条虫(466814195)
*	Keywords	: Etsoftware 半条虫(466814195) rimke 39doo 39度
*	Description	: 本脚本功能由EtSoftWare团队研发，仅供学习不得用于商业用途。
*	Blog		: http://rimke.blog.163.com/		
*	Website		: http://www.39doo.com/
*	Mail		: rimke@163.com
*	Copyright	: Power By Etsoftware
*	
* 	eg:
* 	ET.loadLib('progressbar');
*	var b1= ET.progressbar.create();
*	$('section').append(b1);
*	setInterval(function(){b1.setPos(); }, 50);
*/
ET.extend({progressbar:{
	initialize:function(){
		ET.loadLib('event'); 
	}
	/**
	 * 创建进度条
	 * @param  {[type]} min 范围，最小值,默认为0
	 * @param  {[type]} max 范围，最大值,默认为100
	 * @param  {[type]} width 控件宽,默认为100%
	 * @param  {[type]} height 控件高,默认为100%
	 * @param  {[type]} style 样式
	 * @return {[type]}   [description]
	 */
	,create:function(min, max, width, height, style){
		style=style?style:0;
		var _me=this, div=ET.ce('div', {'class':'ET_PROGRESS_BAR ET_PROGRESS_BAR_'+(style?style:0)})
		,bar=ET.ce('div', {'class':'bar'})
		,a=ET.ce('a', {'href':'javascript:void(0)'})
		,info=ET.ce('div', {'class':'info'})
		,csttr=['width','height','left','top'];
		$.extend(div, this.fn);
		div.setRange(min, max, null, csttr[style]);
		
		$(div).append([$(bar).append(a),info])
		.mousedown(function(e) {if(e.button!=0)return ; ET.event.stopPropagation(e);ET.event.preventDefault(e); this.seek=true; $(a).focus();})
		.on('touchstart', function(e){ET.event.stopPropagation(e);ET.event.preventDefault(e); this.seek=true;  $(a).focus();})
		;
		$(document).mousemove(function(e) {  
			if(!div.seek)return ;
			ET.event.stopPropagation(e);ET.event.preventDefault(e);
			var d=style%2
			,x=d?e.pageY:e.pageX
			,m=d?$(div).height():$(div).width()
			,ofs=d?$(div).offset().top:$(div).offset().left;
			_me.seek(div, x, m, ofs); 
			$(info).show();
		})
		.on('touchmove', function(event) {  
			if(!div.seek)return ;
			ET.event.stopPropagation(e);ET.event.preventDefault(e);
			var d=style%2, e=event.touches[0]
			,x=d?e.pageY:e.pageX
			,m=d?$(div).height():$(div).width()
			,ofs=d?$(div).offset().top:$(div).offset().left;
			_me.seek(div, x, m,ofs);  
			$(info).show();
		})
		.mouseup(function(e) { div.seek=false; $(info).fadeOut(800); })
		.on('touchend', function(e){div.seek=false; $(info).fadeOut(800); })
		;
		$(a).keydown(function(e) {
			if(e.keyCode==39){ // -> 
				var ratio = div.setPos(div.Range.pos+div.Range.step);
				div.onSeek && div.onSeek(ratio);
			}else if(e.keyCode==37){ // ->
				var ratio = div.setPos(div.Range.pos-div.Range.step);
				div.onSeek && div.onSeek(ratio);
			}
		});
		return div;
	}
	,seek:function(probar, idx, mlen, ofs){
		var ratio=0
		,w =mlen
		,l=(probar.Range.max-probar.Range.min)
		idx=idx?idx:event.pageX;
		idx-=ofs;
		ratio = idx/w;
		if(ratio>1 || ratio<0){return ;}
		var val=l*ratio;
		probar.setPos(val);
		probar.onSeek && probar.onSeek(ratio);
		return ratio;
	}
	,fn:{
		/**
		 * 设置进度条的起始值和终止值。
		 * @param {[type]} min  起始值 默认为0
		 * @param {[type]} max  终止值 默认为100
		 * @param {[type]} step 步进 默认为0.1
		 * @param {[type]} attr 样式 默认为 width
		 */
		setRange:function(min, max, step, attr){
			!this.Range && (this.Range={'step':0.1, 'ofsp':0, 'pos':0});
			this.Range.min=min?min:0;
			this.Range.max=max?max:100;
			this.Range.cssattr=attr?attr:'width';
			step && this.setStep(step);
		}
		//设置进度条的当前位置。
		,setPos:function(pos){ 
			this.Range.pos=(pos===undefined)?this.Range.pos+this.Range.step:pos;
			return this._setView();
		}
		//设置步长
		,setStep:function(step){this.Range.step=step?step:0.1; }
		//移动进度条一段距离
		,offSetPos:function(pos){this.Range.ofsp=pos?pos:0;}
		,onSetPos:function(e){}
		,onSeek:function(e){}
		,_setView:function(){
			var w=$(this).width()
			,ratio=this.Range.pos/(this.Range.max-this.Range.min)
			,bar = $(this).find('>.bar')
			,info = $(this).find('>.info')
			,css={};
			if(ratio>1){ratio=1; this.Range.pos=this.Range.max-this.Range.min; }
			if(ratio<0){ratio=0; this.Range.pos=0; }
			css[this.Range.cssattr] = (ratio*100)+'%';
			$(bar).css(css);
			$(info).html(parseInt(ratio*100)+'%');
			this.onSetPos(ratio);
			return ratio;
		}
	}
}});