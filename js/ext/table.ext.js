/*
*
*	table 扩展 1.0.0.1 
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
ET.extend(ET.extension, {table:{
	initialize:function(){
		if(!ET.code) ET.loadLib('code'); 
		if(!ET.unit) ET.loadLib('unit'); 
		if(!ET.albumized) ET.loadLib('albumized'); 
		if(!ET.object) ET.loadLib('object'); 
		if(!ET.string) ET.loadLib('string'); 
		this.cid();
		this.iniTbl();
	}
	/**
	 * 初始化表表单
	 * @return {[type]} [description]
	 */
	,iniTbl:function(){
		var _me=this, th = $(this).find('th');
		th.each(function(idx){if( !this.id ){this.id = _me.id+'_th_' + idx; } });
		$(this).find('>tr, >tbody>tr').each(function(){
			ET.extend(this, _me.tr); this.initialize(_me);
		});
		this.oncontextmenu = this.tdyContextmenu;
		$(document).click(function(){$(_me.ctm).remove();});
		$(this).find('>tbody>tr>td,>tr>td,>tbody>tr>th,>tr>th').each(function(){
			ET.extend(this, _me.td); this.initialize(_me);
		});
		this.renderCss();
		if( !jQuery.isEmptyObject(this.getFields()) ){
			ET.albumized.xs(function(){
				$(_me).hide();
				if(!_me.mview){_me.mview=_me.MV.generate(_me); $(_me).after(_me.mview);}
				$(_me.mview).show();
	 		},function(){
				if(_me.mview){$(_me.mview).remove();_me.mview=undefined;}
				$(_me).show();
			});
		}
	}
	,td:{
		initialize:function(obj){this.tbl=obj; }
		,ontouchstart:function(){this.tbl.srcElement=this;  }
		,onmousedown:function(){this.tbl.srcElement=this;}
	}
	,tr:{
		initialize:function(obj){this.tbl=obj; }
		,onclick:function(e){			
			e=e?e:event;
			if( e.ctrlKey){ if($(this).hasClass('selected')){this.tbl.unselect(this);}else{this.tbl.select(this);} }
		}
	}
	,MV:{
		/**
		 * 生成小屏幕视图
		 * @return {[type]} [description]
		 */
		generate:function(obj){
			obj && (this.tbl = obj);
			var div=ET.ce('div', {'class':'ET_STYLE_TABLE_MV'})
			,data = this.tbl.getData();			
			div.tbl = this.tbl;
			this.add(data, div);
			return div;
		}
		,setPaginate:function(data, ele){
			if( !data || !ele )return ;
			var _me = this;
			if(data.next_page_url){
				var div=ET.ce('div', {'data-lazyload':data.next_page_url});
				div.callback=function(e){					
					e=ET.execJS(e);
					var data = getData(e), np = getNP(e);
					for(var i=0; i<data.length;i++){
						ele.tbl.add(data[i]); 
					}
					if(np){_me.setPaginate({next_page_url:np}, ele);}
					$(this).remove();
					function getNP(data){
						for( var k in data ){
							if(k =="next_page_url"){
								return data[k];
							}else if(ET.object.getType(data[k]) =="array"
								|| ET.object.getType(data[k]) =="object"){
								var ret = getNP(data[k]);
								if(ret) return ret;
							}
						}
						return null;
					}
					function getData(data){
						for( var k in data ){
							if(ET.object.getType(data[k]) =="array"){
								return data[k];
								break;
							}else if(ET.object.getType(data[k]) =="object"){
								var ret = getData(data[k]);
								if(ret) return ret;
							}
						}
						return null;
					}
				}
				$(ele).append(div);
				ET(div);
			}
		}
		,add:function(data, ele){
			if(!data||!ele)return null;
			if(ET.object.getType(data)!="array"){data=[data];}
			var o=this.createView(data);
			$(ele).append(o).find('>.itm').removeClass('odd');
			$(ele).find('>.itm:odd').addClass('odd');
			return o;
		}
		/**
		 * 添加数据
		 * @param {[type]} data [description]
		 */
		,createView:function(data){
			var reVal=[];
			for(var i=0; i<data.length; i++){
				var dat=data[i], itm=ET.ce('div', {'class':'itm'});				
				for(var k in dat){
					var dl = ET.ce('dl')
					, dt = ET.ce('dt', {'innerHTML':k})
					, dd = ET.ce('dd', {'innerHTML':dat[k]});
					$(dl).append([dt,dd]);
					$(itm).append(dl);
				}
				reVal.push(itm);
			}
			return reVal;	
		}
	}
	/**
	 * 渲染CSS
	 * @return {[type]} [description]
	 */
	,renderCss:function(){
		$(this).find('>tbody>tr, >tr').removeClass('tr_odd');
		$(this).find('>tbody>tr:odd, >tr:odd').addClass('tr_odd');
	}
	/**
	 * 右键菜单
	 * @param  {[type]} e [description]
	 * @return {[type]}   [description]
	 */
	,tdyContextmenu:function(e){
		e = e || window.event;		
		function getMousePos(e) {
			e = e || window.event;
			return {'x':e.clientX+$(document).scrollLeft(),'y':e.clientY+$(document).scrollTop()}
		}
		if(this.ctm){ $(this.ctm).remove();}
		var _me=this, pos=getMousePos(e), div=ET.ce('div', {'class':'ET_CONTEXTMENU'})
		,ul = ET.ce('ul'), li
		,menu={
			'Delete':{fun:function(){
				var e = $(_me.srcElement).parent()
				,se=e.parent().find('.selected');				
				_me['delete'](se.length?se:e);
			}, shift:false, ctrl:true, alt:false, hotkey:'d' }
			,'Edit':{fun:function(){_me.edit($(_me.srcElement));}, shift:false, ctrl:true, alt:false, hotkey:'e' }
			,'Insert':{fun:function(){ _me.insert($(_me.srcElement).parent());  }, shift:false, ctrl:true, alt:false, hotkey:'i' }
			,'Select':{fun:function(){ _me.select($(_me.srcElement).parent());  }, shift:false, ctrl:true, alt:false, hotkey:'s' }
			,'Select All':{fun:function(){ _me.select($(_me.srcElement).parent().parent().find('tr'));  }, shift:false, ctrl:true, alt:false, hotkey:'a' }
		};
		$(div).append(ul);
		$(this).after(div);
		$(div).css({'top':ET.unit.pxorem((pos.y-1)+'px'), 'left':ET.unit.pxorem((pos.x-1)+'px')});

		for(var k in menu){
			var o=menu[k], hspnKey = ET.ce('span', { 'innerHTML': (o.ctrl?'ctrl+':'')+(o.shift?'shift+':'')+(o.alt?'alt+':'')+(o.hotkey?o.hotkey:'')});
			li=ET.ce('li', {'hotkey':(o.hotkey+'').charCodeAt(), 'innerHTML':k+'&nbsp;&nbsp;'});
			li.srcElement = e.srcElement;
			$(li).click(o.fun);
			$(li).append(hspnKey);
			$(ul).append(li);
		}
		$(ul).click(function(){ $(this).remove(); });
		$(div).keydown(function(event) {$(this).find('li[hotkey='+event.keyCode+']').click(); });
		this.ctm = div;
		return false;
	}
	,add:function(data, ele){	
		var dt = ET.object.getType(data);
		if( dt=='array' ){
			for(var i=0; i<data.length;i++){
				this.add(data[i], ele);
			}
		}else if( dt=='object' ){	
			ele=ele?$(ele): $(this).find('>tbody>tr:last, >tr:last');
			if(ele.length==0){
				var tbody = $(this).find('>tbody');
				if(tbody.length==0){
					tbody = $(ET.ce('tbody')); $(this).append(tbody);
				}
			}
			var _me=this, f=this.getFields(), tr=ET.ce('tr');
			for(var k in f){
				var html = (data[k]!==undefined)?data[k]:'';
				if(f[k].tpl){ 
					if(ET.object.getType(f[k].tpl)=='function' ){ 
						html= f[k].tpl(k, data);
					}else{
						html= ET.string.format(f[k].tpl, data, '{', '}');
					}					
				}
				var td = ET.ce('td', {'innerHTML': html } );
				$(tr).append(td);
				$(td).find('[et]').each(function(){ ET(this); });
			}
			if(ele && $(ele).length>0){
				$(ele).after(tr);
			}else{
				$(this).find('>tbody').append(tr);
			}
			
			$(tr).find('>td,>th').each(function(){
				ET.extend(this, _me.td);
				this.initialize(_me);
			});
			ET.extend(tr, _me.tr); tr.initialize(_me);
			this.renderCss();
			if(this.mview){
				this.MV.add(this.getTrData(tr, this.getTitle()), this.mview);			
			}
		}
		return this;
	}	
	,onInsert:function(e){}
	,insert:function(ele){
		var data=[];
		$(ele).find('>td,>th').each(function(){ data.push(''); });
		var tr = this.add(data, ele);
		this.onInsert && this.onInsert(tr);
		return tr;
	}
	,onEdit:function(e){}
	,edit:function(ele){
		var _me=this, tr=$(ele).parent(), val = $(ele).html()
		,div=ET.ce('div', {'contenteditable':true, 'style':'width:100%;height:100%'});
		$(div).append(val);
		$(ele).empty().append( div );
		$(div).focus().blur(function(){$(ele).html( $(this).html() );_me.onEdit && _me.onEdit(ele, _me.getTrData(tr));});
		if(div.setSelectionRange){
			div.setSelectionRange(val.length, val.length);
		}

	}
	,onDelete:function(ele){}
	,'delete':function(ele){		
		$(ele).remove();
		this.renderCss();
		this.onDelete && this.onDelete();
	}
	/**
	 * 选择数据
	 * @param  {[type]} ele [description]
	 * @return {[type]}     [description]
	 */
	,onSelect:function(ele){}
	,select:function(ele){
		$(ele).addClass('selected');
		this.onSelect && this.onSelect();
	}
	,onUnselect:function(ele){}
	,unselect:function(ele){
		$(ele).removeClass('selected');
		this.onUnselect && this.onUnselect();
	}
	/**
	 * 设置分页
	 * @param {[type]} data {'current_page':1 ,'last_page' : 1 ,'next_page_url' : null ,'per_page' : 15 ,'prev_page_url' : null ,'to' : 1 ,'total' : 1 }
	 */
	,setPaginate:function(data){
		var tfoot = $(this).find('>tfoot'), tr, td;
		if(tfoot.length==0){tfoot = ET.ce('tfoot'); $(this).append(tfoot); }
		tr = $(tfoot).find('>tr');
		if(tr.length==0){tr = ET.ce('tr'); $(tfoot).append(tr); }
		td = $(tr).find('>td');
		if(td.length==0){
			var dat = this.getTrData( $(this).find('>tbody>tr:last>*') );
			td = ET.ce('td', {'colSpan': dat.length?dat.length:99}); $(tr).append(td);
		}
		var pn=ET.ce('ul', {'class':'pagination'}), pp, li, np;
		li = ET.ce('li');
		if(data.prev_page_url){
			pp=ET.ce('a', {'innerHTML':'«', 'href':data.prev_page_url})
		}else{
			$(li).addClass('disabled');
			pp=ET.ce('span', {'innerHTML':'«'})
		}
		$(li).append(pp); $(pn).append(li);

		li = ET.ce('li');
		if(data.next_page_url){
			pp=ET.ce('a', {'innerHTML':'»', 'href':data.next_page_url})
		}else{
			$(li).addClass('disabled');
			pp=ET.ce('span', {'innerHTML':'»'})
		}
		$(li).append(pp); $(pn).append(li);
		
		$(td).append(pn);
		this.MV.setPaginate(data, this.mview);
		return this;
	}
	/**
	 * 设备显示字段
	 * @param {[type]} data){data&& (this.feilds [description]
	 */
	,setFields:function(data){data && (this.feilds=data); return this;}
	,getFields:function(data){
		if(data){
			var reVal ={}, tmp="";
			for(var i=0; i<data.length; i++){
				var dat=data[i];
				for(var k in dat){
					if( tmp.indexOf(k)==-1 ){
						reVal[k]={'key':k, 'class':''};
						tmp=ET.object.toString( reVal ); 
					}
				}
			}
			return reVal;			
		}
		if(this.feilds){return this.feilds;}
		var _me=this, thead = $(this).find('>thead'), td=thead.find('>tr>th,>tr>td');
		this.feilds	={};
		td.each(function(){
			var k = this.id?this.id:$(this).attr('name')?$(this).attr('name'):'';
			if(!k){k= $(this).html(); }
			_me.feilds[k] ={'key':$(this).html(), 'class':''};
		});
		return this.feilds;
	}
	/**
	 * 初始化表格标题
	 * @param  {[type]} data [description]
	 * @return {[type]}      [description]
	 */
	,iniThead:function(data){
		if(!data)return this;
		var thead = $(this).find('>thead'), tr;
		if(thead.length==0){thead = $(ET.ce('thead')); $(this).append(thead); }
		tr = thead.find('>tr');
		if(tr.length==0){tr = $(ET.ce('tr')); thead.append(tr); }
		tr.empty();
		this.feilds = this.feilds?this.feilds:this.getFields( data );
		for(var k in this.feilds){
			var html = this.feilds[k].key?this.feilds[k].key:k;
			$(tr).append(ET.ce('th', {'id':k, 'innerHTML': html }));
		}
		return this;
	}
	/**
	 * 设置数据
	 */
	,setData:function(data){
		if(!data)return this;
		this.iniThead(data);
		this.add(data);	
		this.iniTbl();
		return this;
	}
	/**
	 * 获取数据
	 * @return {[type]} [description]
	 */
	,getData:function(){
		var _me=this, data=[], tr 
		,tbody = $(this).find('>tbody'), jskey=this.getTitle();
		tbody.find('>tr').each(function(){data.push(_me.getTrData(this, jskey)); });
		return  data;
	}
	/**
	 * 获取已经选中的数据
	 * @return {[type]} [description]
	 */
	,getSelectedData:function(){
		var _me=this, data=[], tr 
		,tbody = $(this).find('>tbody'), jskey=this.getTitle();
		tbody.find('>tr.selected').each(function(){data.push(_me.getTrData(this, jskey)); });
		return  data;
	}
	/**
	 * 获取标题
	 * @return {[type]} [description]
	 */
	,getTitle:function(){
		var data={}, thead = $(this).find('>thead')
		,tr = thead.find('>tr:last')
		,th = tr.find('>th,>td');
		th.each(function(){
			var key = ET.code.removeFlag($(this).html(), 'html')
			data[key]='';
		});
		return data;
	}
	/**
	 * 获取某一行的数据
	 * @param  {[type]} tr  行
	 * @param  {[type]} tit 标签
	 * @return {[type]}     
	 */
	,getTrData:function(tr, tit){		
		var data=null, idx=0, td=$(tr).find('>td');
		if(tit){
			for(var k in tit){
				if(!td[idx]){break;}
				data=data?data:{};
				data[k] = $(td[idx]).html();
				idx++;
			}
		}else{
			data=[];
			td.each(function(){
				data.push( $(this).html() );
			});
		}
		return data;
	}
}});