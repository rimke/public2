/*
*
*	messagebox Beta 1.0.0.1 消息提示框
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
ET.extend({messagebox:{
	initialize:function(){
		if(!ET.clientarea) ET.loadLib('clientarea');
		if(!ET.drag) ET.loadLib('drag');
		if(!ET.unit) ET.loadLib('unit');
		if(!ET.object) ET.loadLib('object');
		if(!ET.hotkey) ET.loadLib('hotkey');
	}
	,BUTTON_OK:1
	,BUTTON_NO:2
	,BUTTON_CANCEL:4
	,throw:function(e){
		if(ET.object.getType(e)=="error"){
			console.log('%c'+e.message+e.stack, 'background:#ffefef;color:red');
		}else{
			console.log(e);
		}
	}
	/**
	 * 显示对话框
	 * @param  {[type]}   obj      显示文本或对象
	 * @param  {Function} callback 回调函数，默认为空可以是function(){} 或 {'onok':function(){} ...}
	 * @param  {[type]}   target   作用域对象
	 * @return {[type]}            返回为一个对象
	 */
	,show:function(obj, callback, target){
		var _me=this; msk = this.mask(target)
		,dialog = this.dialog(obj, '', {
			'ondestroy':function(){
				msk.destroy && msk.destroy(); 
				try{
					if(typeof(callback)=='function'){
						if(callback){ ET.exec(callback, null, this); }
					}else if(callback){
						if((this.buttons & _me.BUTTON_OK) && callback.onok){ callback.onok(); }
						if((this.buttons & _me.BUTTON_NO) && callback.onno){ callback.onno(); }
						if((this.buttons & _me.BUTTON_CANCEL) && callback.oncancel){ callback.oncancel(); }
						callback.ondestroy && callback.ondestroy();
					}
				}catch(e){_me.throw(e); }
			}
		},target);
		var zIndex = $(msk).css('z-index');
		zIndex = zIndex>0?zIndex:document.all.length+9999;
		$(dialog).css({'z-index': zIndex});
		$(msk).after(dialog);
		// 热键
		ET.hotkey.addKey(ET.hotkey.Escape, null, function(){dialog.destroy(); });
		ET.hotkey.addKey(ET.hotkey.Tab, null, function(){
			if($(dialog).find(document.activeElement).length==0){
				$(dialog).find('a:first').focus();
			}
		});
		return { 'destroy':function(){ dialog.destroy(); } };
	}
	/**
	 * 对话框
	 * @param  {[type]} txt    显示文本或对象
	 * @param  {[type]} tit    显示标题
	 * @param  {[type]} events 响应事件
	 * @param  {[type]} target 目标
	 * @param  {[type]} buttons 热键组合 默认为BUTTON_OK
	 * @return {[type]}        [description]
	 */
	,dialog:function(txt, tit, events, target, buttons){
		target=target?target:document.body;
		if( !ET.object.isElement(target) ){ target=document.body; }
		buttons=buttons?buttons:this.BUTTON_OK;
		var _me=this, div=ET.ce('div', {'class':'ET_STYLE_MSGBOX', 'for':target.id?target.id:''})
		,thead=ET.ce('div', {'class':'thead'})
		,tbody=ET.ce('div', {'class':'tbody'})
		,hspnClose=ET.ce('a', {'href':'javascript:void(0)','innerHTML':'×', 'style':'float: right; padding: '+ ET.unit.pxorem('0.01rem')+' '+ ET.unit.pxorem('0.03rem')})
		,hContent=ET.ce('div', {'class':'content'})
		,hTools=ET.ce('div', {'class':'tools'})
		,rect=ET.clientarea.getRect(target)
		,hbtn=[]
		,css={
			'min-width': ET.unit.pxorem( '100px')
			,'min-height': ET.unit.pxorem( '10px')
			,'max-width': ET.unit.pxorem( (rect.clientWidth/2)+'px')
			,'max-height': ET.unit.pxorem( (rect.clientHeight/8*7)+'px')
		};
		if(target==document.body){
			$.extend(css, {'position':'fixed','top':'50%','left': '50%'
				// ,'margin-top':'50%'
				// ,'margin-left':''
			});
		}
		//生成热键
		if( buttons & this.BUTTON_OK){
			var btn = ET.ce('a', {'href':'javascript:void(0)','innerHTML':'Ok'});
			$(btn).click(function(e){ div.ok(); });
			hbtn.push(btn);
		}
		if( buttons & this.BUTTON_NO){
			var btn = ET.ce('a', {'href':'javascript:void(0)','innerHTML':'No'});
			$(btn).click(function(e){ div.no(); });
			hbtn.push(btn);
		}
		if( buttons & this.BUTTON_CANCEL){
			var btn = ET.ce('a', {'href':'javascript:void(0)','innerHTML':'Cancel'});
			$(btn).click(function(e){ div.cancel(); });
			hbtn.push(btn);
		}
		$(hContent).append(txt);
		$(thead).append([tit?tit:'@Etsoftware', hspnClose]);
		$(hTools).append( hbtn );
		$(tbody).append([hContent, hTools]);
		$(div).append([thead, tbody]);
		$(div).css(css).hide();
		$.extend(div, {
			//点击OK按键时触发
			'onok':function(){}
			//窗口加载完成后执行
			,'onload':function(){}
			//点击No按键时触发
			,'onno':function(){}
			//点击Cancel按键时触发
			,'oncancel':function(){}
			//窗口被销毁时触发
			,'ondestroy':function(){}
		}, events);
		div.destroy=function(){try{this.ondestroy && this.ondestroy(); }catch(e){_me.throw(e); } $(div).remove(); }
		div.ok=function(){ this.buttons=_me.BUTTON_OK;try{this.onok && this.onok();}catch(e){_me.throw(e); } this.destroy();  }
		div.no=function(){ this.buttons=_me.BUTTON_NO;try{this.onno && this.onno();}catch(e){_me.throw(e); } this.destroy();  }
		div.cancel=function(){ this.buttons=_me.BUTTON_CANCEL;try{this.oncancel && this.oncancel();}catch(e){_me.throw(e); } this.destroy();  }
		div.loaded=function(){ $(hTools).find('>:first').focus(); try{this.onload && this.onload();}catch(e){_me.throw(e); }}
		div.move=function(x, y){
			var r = ET.clientarea.getRect(this);
			x=x?x:rect.clientWidth/2-r.clientWidth/2;
			y=y?y:rect.clientHeight/2-r.clientHeight/2;
			$(this).css({'top':y, 'left':x});
		}
		ET.onappend(div, function(){div.loaded(); div.move();$(div).show()} );
		$(hspnClose).click(function(event) {div.cancel(); });
		ET.drag.element(thead, div);
		$(target).after(div);
		return div;
	}
	/**
	 * 屏蔽层
	 * @param  {[type]} target  被屏蔽对象
	 * @param  {[type]} info    显示信息
	 * @param  {[type]} mskevent响应事件
	 * @return {[type]}         [description]
	 */
	,mask:function(target, info, mskevent){
		target=target?target:document.documentElement;
		if( !ET.object.isElement(target) ){ target=document.documentElement; }
		info=info?info:mskevent?'Loading...':'';
		if(!target || !ET.object.isElement(target) ){return null;}
		var zIndex = document.all.length+999;
		var div=ET.ce('div', {'class':'ET_MSG_MASK', 'for':target.id?target.id:''});
		var hdivInfo=ET.ce('div', {'class':'ET_MSG_MASK_INFO', 'innerHTML':info});		
		$(div).css({'z-index': zIndex}).hide();
		$(hdivInfo).css({'z-index': zIndex+1});
		if(!info){ $(hdivInfo).hide();}
		// 触发事件
		var events={
			// 改变大小时触发
			onresize:function(){}
			// 加载完成后触发
			,onload:function(){}
			// 销毁后触发
			,ondestroy:function(){}
			// 显示时触发
			,onshow:function(){}
		};
		$.extend(div, events, mskevent);
		ET.onappend(div, 
			function(){
				var divcss={};
				if(target==document.documentElement){
					divcss={'position': 'fixed'};
				}else{
					divcss={'position': 'absolute'
						,'margin-top': '-'+ET.unit.pxorem($(target).css('padding-top'))
						,'margin-left': '-'+ET.unit.pxorem($(target).css('padding-left'))
					};
				}
				$(div).css({'z-index': zIndex});
				$(hdivInfo).css({'z-index': zIndex+1});
				$(div).css(divcss).show();
				if(div.onload){setTimeout(function(){ div.onload(); },1);}

			}
		);
		//销毁
		div.destroy=function(){ try{this.ondestroy && this.ondestroy();}catch(e){_me.throw(e); } $(this).remove();$(hdivInfo).remove(); };
		div.show=function(){ try{this.onshow && this.onshow();}catch(e){_me.throw(e); } this.resize(); $(target).prepend([div,hdivInfo]); };
		div.resize=function(){ 
			var rect = ET.clientarea.getRect( target );
			$(this).css({
				'width': ET.unit.pxorem(rect.clientWidth+'px')
				,'height': ET.unit.pxorem(rect.clientHeight+'px')
			});
			try{this.onresize && this.onresize(); }catch(e){_me.throw(e); }
		};
		div.show();
		// 监听事件
		$(window).resize(function(event) { div.resize();});
		
		return div;
	}
}});