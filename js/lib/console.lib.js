/*
*
*	console Beta 1.0.0.1 调试工具
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

ET.extend({console:{
	initialize:function(){
		if(!ET.clientarea) ET.loadLib('clientarea');
		if(!ET.navigator) ET.loadLib('navigator');
		if(!ET.cookie) ET.loadLib('cookie');
		var o = new this.create();
		if(typeof(console)==='undefined' || ET.navigator.OS=='Mobile') {
			window.console = o;
		} 
		ET.extend(this, o);
	}
	,create:function(){		
		var ins=null;
		this.log=function(){
			var agm=arguments;
			if(agm.length<1)return undefined;
			var tpl = ET.object.toString(agm[0])+"";
			tpl=tpl.replace(/\</gi, '&lt;');
			tpl=tpl.replace(/\>/gi, '&gt;');
			tpl=tpl.replace(/\n/gi, '<br>');
			tpl=tpl.replace(/ /gi, '&nbsp;');
			tpl=tpl.replace(/\t/gi, '&nbsp;&nbsp;&nbsp;&nbsp;');
			if( agm.length>1 ){
				var data=[];
				for(var i=1; i<agm.length;i++)data.push(agm[i]);
				tpl = fromat(tpl,data); 
			}
			show(tpl);
		};
		//格式化字符串
		function fromat(tpl,agm){
			var mc = tpl.match(/%[sdifoOc][^%]*/gi);
			if(mc){
				for(var i=0;i<mc.length;i++){
					var m = /(%[sdifoOc])([^%]*)/gi.exec(mc[i]);
					if(i<agm.length){
						var val = agm[i]
						if( m[1]=="%s" ) val+="";
						if( m[1]=="%d" || mc[i]=="%i" ) val+=0;
						if( m[1]=="%o" || mc[i]=="%O" ) val=ET.object.toString(val);
						if( m[1]=="%c" ) val="<span style='"+val+"'>"+ m[2] +"</span>";						
						tpl= tpl.replace(mc[i], val);
					}
				}			
			}
			return tpl;
		}
		function show(data){
			data=data?data:'';			
			var ins = getInstance()
			,lst = $(ins).find('.lst')
			,ul = lst.find('>ul')
			,li = ET.ce('li', {'innerHTML': ET.object.toString(data)});
			$(ul).append(li);
			lst[0].scrollTop = lst[0].scrollHeight;
		}
		function getInstance(){
			if(ins)return ins;
			var div = ET.ce('div', {'class':'ET_CONSOLE'})
			,wctl = ET.ce('div', {'class':'ET_CONSOLE_CTL'})
			,wrench = ET.ce('span', {'class':'glyphicon glyphicon-wrench'})
			,lst = ET.ce('div', {'class':'lst'})
			,ul = ET.ce('ul')
			,cmd = ET.ce('div', {'class':'cmd'})
			,ipt = ET.ce('input')
			;
			$(ipt).keydown(function(event) {
				var ckData=ET.cookie.get('console')
				,data=ckData.data?ckData.data:[];
				this.idx=this.idx?this.idx:0;
				if( event.keyCode==13 ){
					var ret='', val=this.value;
					try{ret=ET.execJS(this.value); }catch(e){ret='Error:'+e.message; }
					show(val); show(ret); this.value='';
					for(var i=0; i<data.length;i++){
						if(data[i]==val){data.splice(i,1); }
					}
					data.push(val);
					ET.cookie.set('console', data);
					this.idx=0;
				}else if( event.keyCode==37 ){ //left
				}else if( event.keyCode==38 ){ //top					
					this.idx++;
					this.idx=(this.idx>data.length)?data.length:this.idx;					
					this.value= data[data.length-this.idx];
				}else if( event.keyCode==39 ){ //right
				}else if( event.keyCode==40 ){ //bottom
					this.idx--;
					this.idx=(this.idx<1)?1:this.idx;					
					this.value= data[data.length-this.idx];
				}else if( event.keyCode==27 ){ // esc
					if($(div).is(":visible")){ $(div).hide(); }else{ $(div).show(); }
				}

			});
			$(wrench).click(function(){
				if( $(div).is(':visible') ){
					$(div).hide();
					$(this).removeClass('on').addClass('off');
				}else{$(div).show(); $(ipt).focus(); $(this).removeClass('off').addClass('on');}
			});
			$(lst).append(ul);
			$(cmd).append(ipt);
			$(div).append([lst,cmd]);
			$(wctl).append(wrench);
			$(document).find('body').append([div, wctl]);
			ins=div;
			return ins;
		}

	}
}});