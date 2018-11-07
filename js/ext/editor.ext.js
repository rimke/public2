/*
*
*	Editor 1.0.0.1  扩展
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
ET.extend(ET.extension, {editor:{
	initialize:function(){				
		if(!ET.unit) ET.loadLib('unit'); 
		this.cid();
		var _me = this;
		_me.editor = _me.ECLS.createview(_me, function(){
			_me.editor.setContent(_me.value);
		});
		if( $('#'+_me.id).length ){
			this.loadEditor();
		}else{//未被加载到页面 
		}
		$(_me).hide();
	}
	/**
	 * 加载富编辑器 
	 * @return {[type]} [description]
	 */
	,loadEditor:function(){
		if(!this.editor.loaded){
			$(this).before(this.editor);
			this.editor.loaded=true;
		}
		return this.editor.loaded;
	}
	,onchange:function(){ this.editor.setContent(this.value); }
	/**
	 * 编辑器
	 * @type {Object}
	 */
	,ECLS:{
		createview:function(e, fun){
			var forobj = e ,w = $(forobj).width() ,h = $(forobj).height()
			,div = ET.ce('div', {'class':'ET_EDITOR','style':''
							+'width:'+ET.unit.pxorem(w+'rem')+';'
							// +'height:'+ h+'px;'
							// +'height:'+ ET.unit.pxorem(h+'rem;')
						})
			,tlbr = this.createToolbar(e)
			,ifm = this.createIframe(function(){
				var doc = ifm.contentDocument || ifm.contentWindow.document;
				$(doc.body).blur(function(){ $(forobj).val( $(this).html() ); });
				fun && fun();
			})
			,hsltFS=ET.ce('select');
			for(var i=1;i<8;i++){
				var opt=ET.ce('option', {'value':i, 'innerHTML':i});
				$(hsltFS).append(opt);
			}
			$(hsltFS).change(function(e) {				
				var doc = ifm.contentDocument || ifm.contentWindow.document;
				console.log(this.value)
				doc.execCommand('fontSize', false, this.value);
			});
			div.forobj=forobj;
			$(tlbr).append( [hsltFS] );
			$(tlbr).append( this.addTools(this.tools.item, forobj) );
			$(div).append([tlbr,ifm]);
			ET.extend(div, this.fn);
			return div;
		}
		,tools:{
			item:[
				{'innerHTML':'&nbsp;', 'class':'ET_ICONS ET_ICONS_B', 'command':'bold'}
				,{'innerHTML':'&nbsp;', 'class':'ET_ICONS ET_ICONS_I', 'command':'italic'}
				,{'innerHTML':'&nbsp;', 'class':'ET_ICONS ET_ICONS_U', 'command':'underline'}
				,{'innerHTML':'&nbsp;', 'class':'ET_ICONS ET_ICONS_LEFT', 'command':'justifyleft'}
				,{'innerHTML':'&nbsp;', 'class':'ET_ICONS ET_ICONS_CENTER', 'command':'justifycenter'}
				,{'innerHTML':'&nbsp;', 'class':'ET_ICONS ET_ICONS_RIGHT', 'command':'justifyright'}
				,{'innerHTML':'&nbsp;', 'class':'ET_ICONS ET_ICONS_LCR', 'command':''}
				,{'innerHTML':'&nbsp;', 'class':'ET_ICONS ET_ICONS_HTML','onclick':function(e){
					var _me=this, ifm =$(this.forobj.editor).find('>iframe')[0];
					var h=$(ifm).height() ,w=$(ifm).width(), doc = ifm.contentDocument || ifm.contentWindow.document;
					if(this.source){$(this.source).remove(); this.source=undefined; $(ifm).show();return ; }
					this.source = ET.ce('textarea', {'style':''
								+'width:'+ET.unit.pxorem(w+'rem')+'; height:'+ ET.unit.pxorem(h+'rem;')});
					
					$(this.source).val( $(doc.body).html() ).blur(function(e) {
						_me.forobj.editor.setContent( $(this).val() );
					});;
					$(ifm).before(this.source).hide();
				}}
			]
			,event:{
				execCommand:function(){
					var _me=this,  ifm =$(this.forobj.editor).find('>iframe')[0]
					,doc = ifm.contentDocument || ifm.contentWindow.document
					,code = this.command?this.command:$(this).attr('command'), value=null;
					if(code){
						doc.execCommand(code, false, value);
					}
				}
			}
		}
		,fn:{
			//设置内容
			setContent:function(val){
				$(this.forobj).val(val);
				var ifm=$(this).find('>iframe');
				if(ifm.length<1)return this;
				ifm = ifm[0];
				ifm.setContent(val);

			}
		}
		//添加工具
		,addTools:function(data, forobj){
			if( ET.object.getType(data)=="array" ){
				var tls=[];
				for(var i=0; i<data.length; i++){
					var t = this.addTools(data[i]);
					t.forobj=forobj;
					tls.push(t);
				}
				return tls;
			}
			var tl=ET.ce('span', {'unselectable':'on'});
			ET.extend(tl, data, this.tools.event);
			var clk=tl.onclick;
			$(tl).click(function(){this.execCommand(); });
			$(tl).addClass(data['class']);
			return tl;
		}
		// 创建工具条
		,createToolbar:function(){
			var div=ET.ce('div', {'class':'tools'});
			return div;
		}
		/**
		 * 创建可编辑区域
		 * @return {[type]} [description]
		 */
		,createIframe:function(fun){
			var ifm = ET.ce('iframe',{'frameBorder':0});
			ifm.loaded=false;
			ET.addEvents('onload', function(e){
				ifm.loaded=true;
				if(ifm.init){return ;}
				ifm.init=true;
				var doc = ifm.contentDocument || ifm.contentWindow.document;
				doc.designMode = "on";
				doc.open();
				doc.write('<html><head></head><body ></body></html>');
				doc.close();
				$(doc.body).attr({'contenteditable':'true','spellcheck':'true'});
				if(fun){
					this.tmpfun=fun;
					this.tmpfun();
					this.tmpfun=undefined;
				}
			}, ifm);
			ifm.setContent=function(val){	
				if(!ifm.loaded){return ;}
				var doc = ifm.contentDocument || ifm.contentWindow.document;
				$(doc.body).html(val);				
			}
			return ifm;
		}

	}

}});
