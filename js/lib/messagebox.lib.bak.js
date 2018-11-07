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

({
	initialize:function(){
		if(!ET.event) ET.loadLib('event');
		if(!ET.clientarea) ET.loadLib('clientarea');
		if(!ET.drag) ET.loadLib('drag');
		if(!ET.unit) ET.loadLib('unit');
		if(!ET.object) ET.loadLib('object');
	}
	/**
	 * 显示对话框
	 * @param  {[type]}   txt      文本或ELEMENT内容
	 * @param  jsong   defVal   input 元素默认值
	 * @param  {Function} callback 回调函数
	 * @param  {[type]}   target   显示位置
	 * @return {[type]}            [description]
	 */
	,show:function(txt,defVal,callback,target){
		return new this.Dialog(txt,defVal,callback,target, this);
	}
	/**
	 * 加载并显示列表以供选择
	 * 会自动识别接口返回的数组和，next_page_url， prev_page_url
	 * @param  {[type]} url    数据来源url或array数据， 接口返回必须是{data:[], next_page_url:'', prev_page_url:''}
	 * @param  {[type]} fun    回调数据,当用户选择OK按钮后，程序会调用此函数 
	 * @param  {[type]} defVal 默认值 默认为 array
	 * @param  {[type]} tpl	   显示模板 默认为{label}
	 * @return {[type]}        [description]
	 */
	,showlist:function(url, fun, defVal, tpl, target){
		if(!url){ET.messagebox.show('URL error!'); return false; }
		defVal=defVal?defVal:[];
		if( ET.object.getType(defVal)=="object" ){defVal=[defVal]; }
		var _me=this, msgbox =ET.messagebox.show('Loading...', null, null, target)
		, utype = ET.object.getType(url)
		,data = ( utype=="array" )?{'data':url }:getData(url);
		if(data==null){
			msgbox.show("Unable to read interface, url: "+ url, null, null, target);
			return msgbox;
		}
		msgbox.onOk=function(){this.destroy(1); fun && fun(defVal); }
		var items = getItems(data)
		,next_page_url = getnav(data, "next_page_url")
		,prev_page_url = getnav(data, "prev_page_url")
		,div=ET.ce('div', {'class':'lstbox'}),lst=ET.ce('div', {'class':'data'}) ,nav=ET.ce('div',{'class':'nav'}) 
		,nsty=''
		,prev=ET.ce('a', {'style':nsty,'class':'pre', 'innerHTML':'&lt;', 'href':prev_page_url})
		,next=ET.ce('a', {'style':nsty,'class':'next', 'innerHTML':'&gt;', 'href':next_page_url})
		,tbl=ET.ce('table',{et:''}) ,tbd=ET.ce('tbody') 
		, search=ET.ce('div', {'class':'frm'})
		, frm=ET.ce('form', {'method':'get', 'action':(utype=='string')?url.replace(/[\?\&]?(page|keywords)=([^&$]+)+/gi,''):''})
		, ipt=ET.ce('input', {'name':'keywords', 'placeholder':'搜索关键字'})
		;
		$(ipt).focus(function(event) {
			$(this).css('border-color','#ea7201');
		}).blur(function(event) {
			$(this).css('border-color','');
		});
		$(frm).append(ipt);
		$(search).append(frm);		
		ET(frm); $(frm).submit(function(e) {
			ET.event.preventDefault(e);
			msgbox.onCancel();
			if(utype=='array'){
				var newdata=ET.clone(data.data);					
				for(var i=0; i<data.data.length;i++){
					if( (data.data[i]+'').indexOf(ipt.value)>-1 ){
						newdata.splice(i, 1);
						newdata.splice(0, 0, data.data[i]);
					}
				}
				_me.showlist(newdata, fun, defVal, tpl, target); 
				return ;
			}			
			_me.showlist(this.getUrl(), fun, defVal, tpl, target);
		});		
		$(lst).append( $(tbl).append(tbd) );
		if(prev_page_url ) $(nav).append( prev );
		if(next_page_url ) $(nav).append( next );
		$(div).append( [search, lst, nav] );
		$(nav).find('>a').click(function(e){
			ET.event.preventDefault(e);
			var nurl = $(this).attr('href');
			if( nurl ){
				msgbox.onCancel();
				_me.showlist(nurl, fun, defVal, tpl, target); 
			}
		});		
		for(var i=0; i<items.length; i++){		
			var itm = items[i], tr=ET.ce('tr'),td=ET.ce('td',{'innerHTML':getLabel(itm, tpl)});
			tr.data = itm;
			$(tbd).append($(tr).append(td));
			for(var j=0; j<defVal.length; j++){
				var dat =defVal[j], ismh=true; 
				for(var k in dat){if( typeof(itm[k])=='undefined' || itm[k]!=dat[k] ){ismh=false;break;} }
				if(ismh){defVal[j]=itm; $(tr).addClass('selected'); }
			}
		}
		$(tbd).find('tr').click(function(){
			if( $(this).hasClass('selected') ){
				$(this).removeClass('selected');
				for(var j=0; j<defVal.length; j++){
					var dat=defVal[j], ismh=true;
					for(var k in dat){
						if( typeof(this.data[k])=='undefined' || this.data[k]!=dat[k] ){ismh=false;break;}
					}
					if(ismh){defVal.splice(j,1); }
				}
			}else{
				$(this).addClass('selected');
				defVal.push(this.data);
			}
		});
		ET(tbl);
		msgbox.show(div, null, null, target);
		

		function getLabel(data, tpl){
			var dtype=ET.object.getType(data), ret='';
			if(dtype!="object" && dtype!="array"){return data; }
			tpl=tpl?tpl:'{label}'
			if( ET.object.getType(tpl)=="function" ){
				ret = tpl(data); if(ret==undefined){ret='';}
			}else{
				var restr="\\{([^\\}]*)\\}"			
				,re = new RegExp(restr, "gi")
				,mc =tpl.match(re);
				ret = tpl;
				for(var k=0;k<mc.length;k++){				
					re = new RegExp(restr, "gi")
					var m = re.exec( mc[k] );
					if( data[m[1]] ){
						ret=ret.replace(m[0], data[m[1]]);
					}
				}
			}
			ret = ret.replace(/\{\w*\}/gi, '');
			if(ret==''){for(var k in data){ret = data[k]; break; } }
			return ret;
		}
		function getnav(data, key){
			if(data==null || typeof data!="object"){return null;}
			if(data[key]!==undefined){return data[key]; }
			for(var k in data){
				if(typeof data[k]!="object"){continue;}
				var ret= getnav(data[k], key);
				if(ret){return ret;}
			}
			return null;
		}
		function getItems(data){
			if(typeof data!="object"){return null;}
			if(data instanceof Array){return data;}
			for(var key in data){
				if(typeof data[key]!="object"){continue;}
				var ret = getItems(data[key]);
				if(ret){ return ret;}
			}
			return null;
		}
		function getData(url, fun){
			var ret=null;
			$.ajax({
				type:'get'
				,url:url
				,dataType:"json"
				,async:fun?true:false
				,success:function(e){ret=e;fun&&fun(ret);}
			});
			return ret;
		}
		return msgbox;

	},
	/**
	 * 对话框
	 * @param {[type]}   txt      显示文本或对象
	 * @param {[type]}   defVal   默认值
	 * @param {Function} callback 回调函数
	 * @param {[type]}   target   被屏蔽对象
	 * @param {[type]}   msgbox   [description]
	 */
	Dialog:function(txt,defVal,callback,target,msgbox){
		var hdivDialog = ET.ce('div',{'style':'background-color:#fff;display:block;overflow:hidden;position:'+((!target)?'fixed':'absolute')
			+';min-width:'+ET.unit.pxorem('100px')+';max-width:' +ET.unit.pxorem(ET.clientarea.getCurrentRect().clientWidth*0.8+'px')
			,'class':'ET_STYLE_MSGBOX'}),
		hdivTit = ET.ce('div',{'innerHTML':'@Etsoftware','class':'thead'}),
		hdivBody = ET.ce('div',{'style':'padding: '+ET.unit.pxorem('8px')+';overflow: auto;'}),
		hdivFoot = ET.ce('div',{'style':'text-align: center;padding: '+ET.unit.pxorem('8px')+';'}),
		hspnClose = ET.ce('span',{'innerHTML':'×','style':'float: right;cursor: pointer;','onclick':function(){hdivDialog.onCancel(0); }}),
		hdivBtnOK=ET.ce('a',{'class':'btn','innerHTML':'确定(<u>O</u>K)','onclick':function(){hdivDialog.onOk(); hdivDialog.destroy(1); }})
		,mask = msgbox.mask(target);
		hdivDialog.Position=function(x, y){
			var msk=$(hdivDialog).prev();
			$(hdivDialog).css({'z-index':msk.css('z-index')*1+1, 'top':ET.unit.pxorem(y?y:0), 'left':ET.unit.pxorem(x?x:0)});
		};
		hdivDialog.Position.top=function(){
			var ret=target?offset(target):{top:0,left:0};
			this(ret.left, ret.top); 
		}
		hdivDialog.Position.right=function(){this(0, 0); }
		hdivDialog.Position.bottom=function(){this(0, 0); }
		hdivDialog.Position.left=function(){this(0, 0); }
		hdivDialog.Position.center=function(){
			var dlg=$(hdivDialog) , dh=dlg.outerHeight() , dw=dlg.outerWidth() , area=ET.clientarea.getCurrentRect();
			this( (area.clientWidth-dw)/2+'px', (area.clientHeight-dh)/2+'px' );
		}
		function offset(obj){
			var ret=$(obj).offset(), pobj=$(obj).parent();
			if(pobj.length>0){
				var p=offset(pobj);
				ret.top+=p.top;
				ret.left+=p.left;
			}
			return ret;

		}
		var events={
			// 当用户按下OK按键时触发
			onOk:function(val){this.destroy(1); }
			// 当用户按下Cancel按键时触发
			,onCancel:function(val){this.destroy(0); }
			// 当用户按下No按键时触发
			,onNO:function(val){this.destroy(2); }
			// 当用户按下Yes按键时触发
			,onYes:function(val){this.destroy(1); }
			// 对话框销毁时触发
			,onDestroy:function(val){}
			,destroy:function(val){
				if(hdivDialog==null)return 0;
				$(hdivDialog).hide();
				if(mask && mask.destroy){mask.destroy(); }
				if(callback)callback({'statu':val,'ele':hdivBody});
				var obj = $(hdivBody).find('>'); obj = obj.length>0?obj[0]:null;
				if( obj && obj.destroy ){obj.destroy(val); }
				$(hdivDialog).empty().remove();hdivDialog=null;
			}
			,onload:function(){}
			,show:function(obj){
				var _me = this;
				if(obj==undefined) return ;
				if( ET.object.isElement(obj) ){
					if(hdivDialog==null)return 0;					
					$(hdivBody).empty().append(obj);
					// ET.extend(obj, events);
				}else if( ET.object.getType(obj)=="object" ){
					$(hdivBody).html(ET.object.toString(obj));
				}else{
					$(hdivBody).html(obj);
				}
				setTimeout(function(){ _me.Position.center(); }, 10);
			}
		};
		ET.extend(hdivDialog, events);
		hdivDialog.Position.obj=hdivDialog;

		hdivDialog.show(txt);
		hdivFoot.appendChild(hdivBtnOK);
		$(hdivTit).prepend(hspnClose);
		hdivDialog.appendChild(hdivTit);
		hdivDialog.appendChild(hdivBody);
		hdivDialog.appendChild(hdivFoot);		
		$(mask).after(hdivDialog);
		// $('body').prepend(hdivDialog);
		hdivBtnOK.focus();
		if(defVal){
			for (var k in defVal) {
				$(hdivBody).find('#'+k).val(defVal[k]);
			};
		}
		hdivDialog.Position.center();
		$(window).resize(function(){
			if(hdivDialog) hdivDialog.Position.center();
		});
		$(window).keyup(function(){ 
			if(event.keyCode==27 && hdivDialog!=null){
				hdivDialog.destroy(); hdivDialog=null;
			}
		});
		ET.drag.element(hdivTit, hdivDialog);
		return hdivDialog;
	}
	/**
	 * 屏蔽层
	 * @param  {[type]} target 被屏蔽对象，如果为null,默认为body
	 * @param  {[type]} info   显示的提示信息
	 * @param  {[type]} execfun 显示后处理函数
	 * @return {[type]}        [description]
	 */
	,mask:function(target, info, execfun){
			execfun&& !info && (info='<span class="	glyphicon glyphicon-refresh" ></span>&nbsp;loading...  ');
			target = (target)?target:top.document.body;
			var $target = $(target), id=ET.random.stringByW(6);
			var hdivMask = ET.ce('div', {id:'ET_MASK_' + id, 'class':'ET_MSG_MASK'})
				,hdivInfo = info?ET.ce('div', {id:hdivMask.id+'_info', 'class':'ET_MSG_MASK_INFO'}):null;
			if( $target.attr('id') ){
				$(hdivMask).attr('for', $target.attr('id'));
			}
			$(hdivInfo).append(info);
			hdivMask.infoBox = hdivInfo;
			hdivMask.target = target;
			if(target.id){$(hdivMask).attr("for", target.id); }
			function get_zIndex(obj){
				var zIndex=0;
				obj = obj?obj:document;
				$(obj).find('*').each(function(){
					var zi = $(this).css('z-index').replace(/[^\d]+/gi,"") * 1;
					zIndex=(zi>zIndex)?zi:zIndex;
				});
				return zIndex+document.all.length;
			}
			// target=null;		
			ET.extend(hdivMask, {
				resize:function(){
					var $target = $(this.target)
					,toffset = $target.offset()
					,zIndex = get_zIndex(target)+1, height = $target.height() 
						+ $target.css('margin-top').replace(/[^\d]+/gi,'') * 1 + $target.css('margin-bottom').replace(/[^\d]+/gi,'') * 1
						+ $target.css('padding-top').replace(/[^\d]+/gi,'') * 1 + $target.css('padding-bottom').replace(/[^\d]+/gi,'') * 1
					,width = $target.width() 
						+ $target.css('margin-left').replace(/[^\d]+/gi,'') * 1 + $target.css('margin-right').replace(/[^\d]+/gi,'') * 1
						+ $target.css('padding-left').replace(/[^\d]+/gi,'') * 1 + $target.css('padding-right').replace(/[^\d]+/gi,'') * 1
					,css={
						'position'	: 'fixed'
						// ,'margin'	: '-3px'
						,'top'		: ET.unit.pxorem('0rem'), 'left'		: ET.unit.pxorem('0rem')
						,'height'	: '100%', 'width'	: '100%'
						,'background-color': '#555'
						,'z-index': zIndex
						,'opacity'	: 0.5
						,'filter'	: 'alpha(opacity=50)'  
						,'-moz-opacity':0.5
						,'-khtml-opacity': 0.5
					}
					,tcss={};
					if(target != document.body){
						tcss={
							'position'	: 'absolute'
							,'top'		: ET.unit.pxorem(toffset.top +'px')
							,'left'		: ET.unit.pxorem(toffset.left+'px')
							,'height'	: height
							,'width'	: width						
						}
					}
					ET.extend(css, tcss);
					if( this.infoBox ){
						var icss={};
						ET.extend(icss, tcss);
						icss['border'] = ET.unit.pxorem("1px")+" solid #8c8c8c";
						icss['z-index'] = zIndex+1;
						icss['overflow'] = "hidden";
						icss['max-width'] = icss['width'];
						icss['max-height'] = icss['height'];
						delete( icss['height'] ); delete( icss['width'] );
						$(this.infoBox).css(icss);
						// this.setTarget(this.target, this.infoBox);
					}
					if( $target[0].tagName =='BODY' ){css.top = css.left = '0rem'; }
					$(hdivMask).css(css);
					// this.setTarget(this.target, this);
				}
				,setTarget:function(target, obj){
					target=target?target:this.target;
					obj=obj?obj:this;
					$(obj).css({'top':'0rem', 'left':'0rem'});
					var moffset = $(obj).offset()
					,toffset = $(target).offset();
					if( moffset.top != toffset.top){
						var c = (moffset.top - toffset.top)*-1
						,top = $(obj).css('top').replace(/[^\d]*/gi,'')*1;
						$(obj).css('top', ET.unit.pxorem((top+c) +'rem'));
					}
					if( moffset.left != toffset.left){
						var c = (moffset.left - toffset.left)*-1
						,left = $(obj).css('left').replace(/[^\d]*/gi,'')*1;
						$(obj).css('left', ET.unit.pxorem((left+c) +'rem'));
					}
					return obj;
				}
				,'destroy':function(){
					if(this.infoBox)$(this.infoBox).remove();
					$(this).remove();
					hdivMask=null;
				}
			});
			if( $target[0].tagName ==='BODY'){
				$target.prepend(hdivMask);
			}else{
				$target.before(hdivMask);
			}
			$(hdivMask).after(hdivInfo);
			$(window).resize(function(){ hdivMask && hdivMask.resize();});
			hdivMask.resize();
			var gre=$(hdivInfo).find('>.glyphicon-refresh');
			if(gre){ 
				gre.css(ET.css.autoCompatible('transition','all 3600s linear'))
				.css(ET.css.autoCompatible('transform','rotate(720000deg)')); 
			}
			execfun && setTimeout(function(){(typeof(execfun)=='function') && execfun(); hdivMask.destroy(); }, 1);
			return hdivMask;
		}
	

})