/*
*
*	EtSoftware Beta 6.0.0.0
*	Release date: 2018-04-11
*	Author		: 半条虫(466814195)
*	Keywords	: Etsoftware 半条虫(466814195) rimke 39doo 39度
*	Description	: 本脚本功能由EtSoftWare团队研发，仅供学习不得用于商业用途。
*	Blog		: http://rimke.blog.163.com/		
*	Website		: http://www.39doo.com/
*	Mail		: rimke@163.com
*	Copyright	: Power By Etsoftware
*/
(function(global, jQuery, factory){
	/* 入口函数 */
	factory(global,jQuery);	
}(typeof window !== "undefined" ? window : this,typeof jQuery !== "undefined" ? jQuery : null,function(win, $){
	"use strict";
	var basePath='' //
	,debug=false
	// ,debug=true
	,jqidx=0
	,jqfile=["jquery-3.3.1.min", "jquery-1.12.4.min.js"]
	,doc=win.document	
	,ET=function(selector, context){
		if(!chkJQuery() ){ 
			if(selector) ET.queue.push('ini', {'s':selector, 'c':context});
			setTimeout(function(){ET();}, 100); return ; 
		}
		var q=null;		
		while( q=ET.queue.pull('ini')){ET.fn.init(q.s, q.c);}
		if(selector===undefined)return ;
		return ET.fn.init(selector, context);
	}	
	,EleFun={// 元素功能
		ca:function(key,value,ele){
			if(!key)return ele;
			var _attr=['colSpan'];
			ele=ele?ele:this;
			if(!ET.object){ET.loadLib('object'); }
			if(ET.object &&  ET.object.getType(ele).indexOf('element')<0 ){return null;}
			if(ele[key]===undefined){
				try{
					var k=key.toString();
					for(var i=0, l=_attr.length; i<l; i++){
						if(_attr[i].toLowerCase()==key.toLowerCase()){k=_attr[i];break;}
					}
					var att = doc.createAttribute(k);
					att.value = value;
					ele.attributes.setNamedItem(att);
				}catch(e){
					window.console && console.log('ERROR\tCreate '+ ele.tagName +' of '+key.toString()+' attribute failure');
				}
			}else{// this.trace('Element is not specified!');
				if( key.toLowerCase()=='innerhtml'){
					$(ele).html(value);
				}else if( key.toLowerCase()=='innertext'){
					$(ele).html( ET.code.removeFlag(value, 'html') );
				}else{
					if( ET.object && ET.object.getType(value)=="function" ){
						ele[key]=value;
					}else{
						$(ele).attr(key, value);
					}
				}
			}
			return ele;
		}
		/**
		 * 创建新元素
		 * @param  {[type]} tagName 创建Element元素
		 * @param  {[type]} param   附加属性参数
		 * @param  {[type]} ele     目录Element元素，如果为null刚为当前对象
		 * @param  {[type]} ns      namespace 命名空间
		 * @return {[type]}         Element元素
		 */
		,ceNS:function(tagName, param, ele){ return this.ce(tagName, param, ele, ''); }
		,ce:function(tagName, param, ele, ns){
			tagName=tagName?tagName:null; ele = ele?ele:this;
			if(tagName==null){return this.ce('div', param, ele);}
			var o = null;
			if(ns!=null){
				ns=ns||"http://www.w3.org/2000/svg";
				o= doc.createElementNS(ns, tagName);
			}else{
				o = doc.createElement(tagName);
			}
			if(!o){return null;}
			for (var key in param){this.ca(key, param[key], o); }
			ET.extend(o, EleFun);
			if(!ET.object){ET.loadLib('object'); }
			if( ET.object && ET.object.getType(ele).indexOf('html')==0 ){ ele.appendChild(o);}
			return o;
		}
		/**
		 * 创建ID
		 * @return {[type]} [description]
		 */
		,cid:function(ele){
			ele = ele?ele:this;
			var id='', isEle = ET.object.isElement(ele);
			if( isEle ){ 
				if(ele.id){ return false; }				
				id = $(ele).attr('name');				
			}
			id = this.gid(id);
			if(isEle){ele.id=id; return ele; }
			return id;
		}
		/**
		 * 执行函数
		 * @param  {[type]} fun  函数或代码
		 * @param  {[type]} data 传入数据
		 * @param  {[type]} o    Element对象, 在指定ele对象上运行函数。
		 * @return {[type]}      返回执行结果
		 */
		,exec:function(fun, data, o){
			if(!fun)return;
			var tfun = typeof(fun);
			if(tfun!='function' && tfun!='string')return;
			var tmpFun='tmpFun_'+ parseInt(Math.random()*10000);
			o=o?o:ET.object.isElement(this)?this:{};			
			o[tmpFun]=(typeof(fun)=="string")?new Function("e",fun):fun;
			if(o[tmpFun]){
				var ret=o[tmpFun](data);
				o[tmpFun]=undefined;
				delete(o[tmpFun]);
			}
			return ret;
		}
		/**
		 * 当元素被加载时执行函数,默认为对象中的load或onload
		 * @param  {[type]} o   元素
		 * @param  {[type]} fun 要执行的元素, 如果不指定则会执行元素中load或onload
		 * @return {[type]}     [description]
		 */
		,onappend:function(o,fun){
			if(!o){return ;}
			if(fun && typeof(fun)!='function'){ fun=new Function(fun);}
			var _me=this, ifm=this.ce('iframe', {'src':ET.imgPath+'data-lazyload.gif', 
				'style':'position:absolute;top:0rem;margin-top:-1rem;opacity:0;filter:alpha(opacity=0);visibility:hidden;width:0rem;height:0rem;'});
			$(o).append(ifm);
			$(ifm).on('load', function(){ 
				if(!fun){if(o.load){fun=o.load; }else if(o.onload){fun=o.onload; }else{fun=function(){}; } }
				$(this).remove(); _me.exec(fun, null, o); });
		}
		/**
		 * 根据name生成ID标识
		 * @param  {[type]} name [description]
		 * @param  {[type]} pre 前缀
		 * @return {[type]}      [description]
		 */
		,gid:function(name, pre){
			var ret=name?name:'ET_'+ET.random.stringByW(10).toUpperCase();
			ret=(pre?pre.toUpperCase()+'_':'')+ret;
			ret=ret.replace(/[\W]/gi,'_').replace(/^_*(\w*?)_*$/gi,'$1').replace(/[_]+/gi,'_');
			var i=0, nid=ret, obj=doc.getElementById(nid);
			while( obj=doc.getElementById(nid) ){ nid = ret+'_'+(i++); }
			ret = nid;
			return ret;
		}		
		/**
		 * 创建控件
		 * 根据参数生成特定控件
		 * @param  {[type]} data 控件参数
		 * @return {[type]}      返回为一个HTML控件
		 */
		,cc:function(data){
			if(!ET.customControls) ET.loadLib('customControls');
			var ele = ET.customControls.create(data);
			ET(ele);
			return ele;
		}
		/**
		 * 向Elements添加控制事件
		 * @param {[type]} event 函数名
		 * @param {[type]} fun   触发/回调函数
		 * @param {[type]} ele   绑定到Element元素，默认为自身
		 */
		,addEvents:function(event, fun, ele){
			ele = ele?ele:this;
			var triggerEvent=event.replace(/^on(.*)/gi, '$1');
			if( !ET.object.isElement(ele) ) return ;
			fun=fun?fun:function(e){};
			if( ele[event]==undefined || ele[triggerEvent]==undefined ){
				if(ele.attachEvent){
					ele.attachEvent('on'+triggerEvent, fun);
				} else if(ele.addEventListener){
					ele.addEventListener(triggerEvent, fun, false);
				}else{
					ele[event]=fun;
				}
			}
		}
	};	
	ET.fn = ET.prototype ={};
	ET.extension = {};//扩展库
	/* 扩展函数 */
	ET.extend = ET.fn.extend =function(){
		var i=0,agm=arguments,d=this;
		if(agm.length>1){d=agm[0];i=1;}
		for (;i<agm.length ;i++ ){
			for (var property in agm[i]){
				try{
					d[property] = agm[i][property];
				}catch(e){
					// console.log(e);
				}
			}
		}
		return d;
	}
	ET.extend(EleFun);
	ET.extend({		
		clone:function(obj){
			var d, typef = typeof obj;	                	
			if( typef == "object"){  //object分为两种情况 对象（Object）和数组（Array）
	            if(obj === null) {d = null; } else {
	                if( ET.object.getType(obj) === "array") {
	                    d = []; for( var i = 0 ; i < obj.length ; i++ ) {d.push( this.clone(obj[i])); }
	                }else if( ET.object.getType(obj).indexOf('html')>-1) {
	                	d=$(obj).clone();
	                }else { // [object Object]
	                    d = {}; for( var j in obj) {d[j] = this.clone(obj[j]); }
	                }
	            }
		    // }else if( typef==="function" ){
		    	// d=function(){};
		    }else{
		        d = obj;
		    }
			return d;
		}
	});
	ET.extend({
		execJS:function(code){
			if(!code || typeof(code)!='string') return null;
			var reVal=null;
			if( !!ET.code && ET.code.removeComments ){				
				code = ET.code.removeComments(code);
			}else{
			}
			// console.log(code);
			if(! /^[\s\t]*return/gi.test(code)){
				var re = new RegExp("^[\\s\\t]*("
					+"(\"[\\w\\W]*\")"
					+"|(\\'[\\w\\W]*\\')"
					+"|(\\{[\\w\\W]*\\})"
					+"|(\\[[\\w\\W]*\\])"
					+"|(\\([\\w\\W]*\\))"
					+"|(\\d+)"
					+")[\\s\\t]*$", "gi");
				if(re.test(code)){
					code = 'return (' +code + ');';
				}else{
					// console.log({code:code});
					// console.log(re);
				}
				// console.log(code);
				code = 'try{ ' +code + ' }catch(e){ throw e;}';
			}
			try{ if(code){reVal = new Function('$', code)($); }
			}catch(e){
				if(window.console){console.log(code);console.log('%c'+e.message,'color:red;');} 
				throw e;
			}
			return  reVal;
		}
		/**
		 * 加载Element扩展
		 * @param  {[type]} extName 扩展名          
		 * @param  {[type]} fun 回调函数
		 * @return {[type]} 
		 */
		,loadExt:function(extName, fun){
			if(ET.extension[extName]) return ET.extension[extName];
			this.loadJS(ET.extPath+extName+'.ext.js', fun); 
			return ET.extension[extName];
		}
		/**
		 * 加载动态库
		 * @param  {[type]} lib 名称
		 * @param  {[type]} fun 回调函数
		 * @return {[type]}     [description]
		 */
		,loadLib:function(lib, fun){
			var o={};
			if(lib instanceof Array){
				for(var i=0; i<lib.length; i++){ o[lib[i]]=this.loadLib(lib[i]);}				
			}else{
				if( ET[lib] ){o=ET[lib]; }else{
					o=this.loadJS(this.libPath+lib+'.lib.js');
					if(o){
						var ext={};ext[lib]=o; 
						ET.extend(ext); 
						(typeof(ET[lib].initialize)=='function') && ET[lib].initialize(); 
					}else if(ET[lib] && ET[lib].initialize){
						ET[lib].initialize();
					}
				}
			}
			fun && fun( o );
			return o;
		}
		/**
		 * 载入JS文件 
		 * @param  {[type]} url JS文件地址
		 * @param  {[type]} fun 回调函数
		 * @return {[type]}     [description]
		 */
		,loadJS:function(url, fun){
			var code=this.getFile(url, fun?function(e){exec(e, fun);}:null);
			function exec(code, fun){
				var o=null;				
				if(code){o = ET.execJS(code);fun&&fun(o, code);}
				return o;
			}
			if( typeof(code)=="object" ){fun && fun(code, code); return code; }
			return exec(code, fun);
		}
		/**
		 * 计算执行函数所需要的时间（单位为 毫秒数）
		 * @param  {[type]} fun 函数
		 * @return {[type]}     [description]
		 */
		,timeConsuming:function(fun){
			var t1=(new Date).getTime();
			fun && fun();
			return (new Date).getTime()-t1;
		}
		/**
		 * 读取本地文件
		 * @param  {[type]} url [description]
		 * @param  {[type]} fun [description]
		 * @return {[type]}     [description]
		 */
		,getLocalFile:function(fun){
			var ret=null;
			if(!fun){console.log('%cMust specify a callback function!!','background-color:red;color:#fff;');return ret;}
			var ipt=doc.createElement('input');
			$(ipt).attr({'type':'file'}).hide();
			$(doc.body).append(ipt);
			ipt.onchange=function(){
				if(this.files.length){
					ret=[];
					var l = this.files.length;
					for(var i=0; i<l;i++){
						var f = this.files[i];
						readfile(f, function(e){
							ret.push(e);
							(ret.length==l)&& fun(ret);
						});
					}
				}
			};
			ipt.click();
			$(ipt).remove();

			function readfile(f, fun){
				var ret={
					'lastModified':f.lastModified
					,'lastModifiedDate':f.lastModifiedDate
					,'name':f.name ,'size':f.size ,'type':f.type
				};
				if( typeof(ActiveXObject)!= "undefined" ){
					var fso = new ActiveXObject("Scripting.FileSystemObject");
					if(fso.fileExists( path ) ){
						var f = fso.OpenTextFile(path, 1, true);	
						if( !f.atendofstream ){
							ret.text = f.ReadAll(); 
						}
						f.Close();
					}
					fun(ret);
				}else if( typeof(FileReader)!= "undefined" ){
					var r = new FileReader();
					r.callback=fun;
					r.onload=function(e){ 
						ret.text=this.result; 
						r.callback && r.callback(ret, e);
					}
					r.readAsText(f);
				}
			}
	
		}
		/**
		 * 获取文件内容
		 * @param  {[type]} url 文件所在地址
		 * @param  {[type]} fun 回调函数
		 * @param  {[type]} cd  是否跨域，默认为 自动;
		 * @param  {[type]} dataType  预期服务器返回的数据类型。如果不指定，jQuery 将自动根据 HTTP 包 MIME 信息来智能判断;
		 * @return {[type]}     [description]
		 */
		,getFile:function(url, fun, cd, dataType){
			if(!url){fun&&fun(ret);return ret; }
			ET._c_g_f || (ET._c_g_f={});
			var ret=null
			// , key=url.match(/\w+/gi)
			, key=encryption(url);
			if(key){}else{key=url; }

			var cdurl=this.appPath+"app.php?m=Cross";
			if(cd){
				url=cdurl+"&url="+encodeURIComponent(url);
			}else if(cd===undefined){
				if(/^(http|ftp|\/\/).*/gi.test(url) && url.indexOf(location.host)==-1 ){
					url=cdurl+"&url="+encodeURIComponent(url);
				}
			}
			if(/^file:\/\/\/.*/gi.test(url)){
				//读取本地文件
				// return this.getLocalFile(url, fun);
			}
			var cache=ET.localStorage;
			if(!cache){
				cache={
					get:function(k){
						if(!localStorage)return undefined;
						var code = localStorage.getItem(k)
						,obj = ET.execJS(code)
						,ret=(obj&&obj.data)?obj.data:undefined;
						fun && fun(ret);
						return ret;
					}
				};
			}			
			if(!debug && cache){var ret=cache.get(key); if(ret!==undefined){fun&&fun(ret);return ret; } }else{
				ET.localStorage && ET.localStorage.clear && ET.localStorage.clear();
			}
			if(ET._c_g_f[url]!==undefined){var ret=ET._c_g_f[url].data;fun && fun(ret); return ret;}
			var aurl=url;
			if(debug){
				aurl+=((url.indexOf('?')<0)?'?':'&')+ Math.random(); 
			}			
			$.ajax({url:aurl ,type:'get',async:(fun?true:false)
				,'dataType':dataType
				,'cache':!debug
				,'success':function(e){ret=e; }
				,'error':function(XMLHttpRequest, textStatus, errorThrown){
					ret=null;
					var msg = "Err("+XMLHttpRequest.status+"),"+textStatus+":"+aurl;
					window.console && console.log([msg, XMLHttpRequest, textStatus, errorThrown]);					
				}
				,'complete':function(){
					ET._c_g_f[url]={'key':key, 'data':ret, 'saved':false};
					if( !debug && ET.localStorage && url.indexOf(ET.path)>-1 ){//只对内核组件进行缓存
						for(var o in ET._c_g_f){
							if( ET._c_g_f[o] && ET._c_g_f[o].saved==false ){
								ET._c_g_f[o].saved=true;
								ET.localStorage.set(ET._c_g_f[o].key, ET._c_g_f[o].data, debug?0:(new Date()).getTime()+604800000);
							}
						}
					}
					fun&&fun(ret);
				}
			});
			return ret;
		}
	});
	//加密
	function encryption(str){
		if(!str || str=='')return null;
		var h=0, c=0, x=1, ret='', b='';
		for(var i=0, l=str.length;i<l;i++ ){
			var asc=str.substr(i,1).charCodeAt();
			b+=asc>x?'1':'0';
			h+= asc; c+= asc+asc%x; x= asc; 
			c=c<255?c:c-255;
		}
		ret=str.substr(0,1)+h;
		var m = str.match(/\W/gi);
		if(m) ret+='m'+m.length;
		ret+='x'+x;
		ret+=str.substr(str.length-1,1);
		for(var i=0, l=b.length;i<l;i++ ){
			if(i>=ret.length)break;
			var s=ret.substr(i,1).charCodeAt(), ns=s;
			if(b[i]=='1'){
				ns++;
				if(s>=48 && s<=57 && ns>57){ //数字
					ns-=10;
				}else if((s>=79 && s<=122 && ns>122)||(s>=65 && s<=90 && ns>90)){ //az
					ns-=26;
				}
			}else{
				ns--;
				if(s>=48 && s<=57 && ns<48){ //数字
					ns+=10;
				}else if((s>=79 && s<=122 && ns<79)||(s>=65 && s<=90 && ns<65)){ //az
					ns+=26;
				}
			}
			ret=ret.substr(0,i)+String.fromCharCode(ns)+ret.substr(i+1);
		}
		ret+=c;
		return ret;
	}
	ET.extend({queue:{//消息队列
			push:function(key, para){//将消息推入队列
				!this.data && (this.data={});
				var d=this.data[key]?this.data[key]:[];
				d.push(para); this.data[key]=d;
			}
			,pull:function(key){//抽取队列中的消息
				!this.data && (this.data={});
				var d=this.data[key]?this.data[key]:[];
				if(d.length==0 ){ 
					this.data[key] && delete this.data[key]; return null;
				}
				var ret = d[0]; d.splice(0,1); this.data[key]=d;
				return ret;
			}
		}
	});
	var init=ET.fn.init=function(selector, context){
		var e = $(selector);
		if( e.length>1 ){
			var es=[];
			e.each(function(){
				es.push(ET(this));
			});
			return es;
		}else if( e.length ==0 ){return null; }
		e=e[0];
		var tname = e.tagName.toUpperCase();
		if(e.EtReadyState)return ;
		$(e).addClass('ET_STYLE_'+tname);
		ET.extend(e, EleFun);
		ET.extend(e, {extend:function(obj){				
			if(obj==null)return ;
			else if(typeof(obj)=='string'){
				obj = ET.loadExt(obj); 
				if(obj && typeof(obj)=='object') return this.extend( obj );
				return this;
			}
			obj=ET.clone(obj);			
			$.extend(this, obj);

			obj.initialize && this.initialize();
			return this;			
		}});
		e.extend(tname.toLowerCase());
		var ext = $(e).attr('et');
		if( ext==undefined )return e;
		if( !!ext && ext!='et'){ 
			var eobj = ET.loadLib(ext);
			if(eobj){
				ET.extend(e, eobj); 
				try{
					eobj.initialize && e.initialize( e );
				}catch (e){
					console.log("%c loadLib:"+ext+' '+e.toString(),'color:red');
				}
			}
		}
		e.EtReadyState=4;
		e.onload && e.onload();
		e.load && e.load();
		return e;
	}	
	/**
	 * 检查Jquery
	 * @return {[type]} [description]
	 */
	function chkJQuery(fun){
		if($){fun&&fun($);return true;}		
		if(jqidx+1>jqfile.length)return;
		if(window.jQuery){$=window.jQuery;fun&&fun($);return true;};
		var url=ET.jsPath+jqfile[jqidx]+'.js'
		,exist=false,es=doc.getElementsByTagName('script');
		for(var i=0;i<es.length; i++){if(es[i].src==url){ exist=true;break;} }
		if( !exist ){
			var heads = doc.getElementsByTagName('head')
			,e=ET.ce('script', {'src':url});
			if(e.readyState){   //IE
		　　　　　　e.onreadystatechange=function(){
		　　　　　　　　if(e.readyState=='complete'||e.readyState=='loaded'){
		　　　　　　　　　　e.onreadystatechange=null;
						jqidx++;
						chkJQuery(fun);
		　　　　　　　　}
		　　　　　　}
		　　　　}else{    //非IE
		　　　　　　e.onload=function(){jqidx++;chkJQuery(fun);}
		　　　　}
			if(heads.length){heads[0].appendChild(e); }
		}		
		// setTimeout(function(){chkJQuery(fun);}, 100);
		return false;
	}
	/**
	 * 检测系统参数
	 * @return {[type]} [description]
	 */
	function chksysconf(){
		var es=null;
		if(basePath==''){
			es=doc.getElementsByTagName('script');
			for(var i=0;i<es.length; i++){
				var e = es[i], src=e.src?e.src:'';
				if( !/EtSoftWare/gi.test(src.toLowerCase()) ){continue;}
				var m=/(.*\/).+\/[^\/]+$/gi.exec(src);
				if(m){basePath = m[1]; break; }
			}
			ET.extend({
				'path':basePath
				,'jsPath':basePath+'js/'
				,'libPath':basePath+'js/lib/'
				,'extPath':basePath+'js/ext/'
				,'cssPath':basePath+'css/'
				,'imgPath':basePath+'img/'
				,'appPath':basePath+'app/'
				,'manualPath':basePath+'manual/'
			});
		}
		var exist=false; es=doc.getElementsByTagName('link');
		for(var i=0;i<es.length; i++){
			var href = es[i].href;
			if( href && /etsoftware.*\.css/gi.test(href.toLowerCase()) ){
				exist=true;break ;
			}
		}
		if(!exist){
			var o=doc.createElement('link');
			$.extend(o, {
				'rel':'stylesheet'
				,'type':'text/css'
				,'href':ET.cssPath+'Etsoftware6.1.css'
			});
			var heads = doc.getElementsByTagName('head');
			if(heads.length){heads[0].appendChild(o); }
		}
	}
	window.etsoftware=window.EtSoftware= window.et = window.ET = window.Et = ET;
	chksysconf();
	
	if( typeof jQuery=="undefined" ){
		console.log("%c Jquery is not loaded, some features will be limited", "color:red");
		window.onload=function(){
			chkJQuery(function(){ EtPreloading(); });
		}
	}else{
		$(function(){ EtPreloading(); });
	}
	function EtPreloading(){
		for(var k in ET){ ET[k].initialize && ET[k].initialize(); }
		ET.loadLib(['random', 'code', 'object']);
		ET.loadLib(['console', 'cache', 'cookie', 'messagebox']);
		ET($('[et]'));
		ET.loadLib(['unit','css'], function(){
			if(ET.css && ET.css.isSupportRem())return ;
			// var icss='link[href*='+ET.cssPath.replace(location.origin, '').replace(/\//gi, '\\\/')+']';
			// $(icss).each(function(){
			// 	var url = this.href
			// 	,css=ET.getFile(url);
			// 	css=ET.unit.pxorem(css)
			// 	ET.css.write( css );
			// 	console.log(url);
			// });
		});
	}

}));
// IE8下兼容HTML5标签
(function(){if(!/*@cc_on!@*/0)return;var e ="abbr,article,aside,audio,canvas,datalist,details,dialog,eventsource,figure,footer,header,hgroup,mark,menu,meter,nav,output,progress,section,time,video".split(','),i=e.length;while(i--){document.createElement(e[i])}})()

