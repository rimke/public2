/*
*
*	input 扩展 1.0.0.1
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
ET.extend(ET.extension, {input:{
	initialize:function(){
		// if(!ET.responsive) ET.loadLib('responsive');
		if(!ET.data) ET.loadLib('data');
		if(!ET.unit) ET.loadLib('unit');
		var _me = this;
		this.cid();
		var type = $(this).attr("type")?$(this).attr("type").toLowerCase():'text'
		,tClass="ET_STYLE_INPUT_"+type.toUpperCase()
		,isSupportType = (this.type.toLowerCase() == type)
		,ext = type;
		!$(this).hasClass(tClass) && $(this).addClass(tClass);
		if(type!='hidden') this.iniPlaceholder();
		if(type =='file') this.iniUpload();
		if("date;week;month;time;datetime;datetime-local".indexOf(type)>-1 ){ ext='calendar'; }
		if(!isSupportType){this.extend(ext); }

	}
	/**
	 * 初始化上传
	 * @return {[type]} [description]
	 */
	,iniUpload:function(){		
		var upv = this.file.cuv(this);
		$(this).before(upv).remove();
	}
	/**
	 * 文件上传控件
	 * <input type="file" et id="hiptfile" name="hiptfile" accept="image/jpeg" action="/upload.php">
	 */
	,file:{
		/**
		 * 创建上传控件
		 * @return {[type]} [description]
		 */
		cuv:function(e){
			var _me=e, cuv=this, div=ET.ce('div')
			// ,hipt=$(_me).clone()[0]
			,hipt=ET.ce('input', {'type':'text', 'name':$(_me).attr('name'), 'action':$(_me).attr('action') })
			,dl=ET.ce('dl',{'class':'ET_STYLE_INPUT_FILE_DL'}) ,dt=ET.ce('dt',{}) ,dd=ET.ce('dd',{'innerHTML':''})
			,img=ET.ce('img',{'class':'ET_STYLE_INPUT_FILE_EXT', 'src':ET.imgPath+'nopic.png', 'alt':'No file chosen'})
			,ifm=null
			,uldcb=function(e, fun){
				if(e && e.errcode!=0){
					ET.messagebox.show( 'Err('+e.errcode+'):'+(e.data?e.data:'upload failed!') );
					return ;
				}
				if(e.status==100){
					if(e.ext){
						$(img).addClass('ET_STYLE_INPUT_FILE_EXT_' +e.ext.toUpperCase() );
						if(';jpg;png;gif;jpeg;bmp;'.indexOf(e.ext)>-1){
							$(img).attr('src', e.localUrl[0]);
						}
					}
					img.onload=function(){
						if(!this.complete){
							if(this.loadview){this.loadview.destroy(); this.loadview=undefined;}
							this.loadview=ET.messagebox.mask(this,'uploading...');
						}
						fun && fun();
					}
				}else if(e.status==200){ //上传成功后处理 					
					if(img.loadview){img.loadview.destroy(); img.loadview=undefined; img.complete=true; }
					if(e.data && e.data.length>0){
						$(img).attr({'src':e.data[0], 'alt':e.filename?e.filename:''});
						$(hipt).val( e.data[0] );
						hipt.callback && hipt.callback(e);
					}else{
						ET.messagebox.show(e.text);
					}
					$(ifm).remove(); ifm=null;
				}
			};
			hipt.callback=_me.callback;
			$(hipt).change(function(e){this.value && uldcb({errcode:0, status:200, data:[this.value]}); });
 			img.onclick=function(e){
				if(ifm==null){ifm=cuv.cifm(_me, uldcb); $(div).append( ifm );}				
				ifm.chosenfile && ifm.chosenfile( $(_me).attr('accept') ); 
			};
			$(hipt).attr({'type':'text'}).hide();
			var callback=e.callback;
			if( !callback ){
				if($(_me).attr('oncallback')){
					callback=new Function('e', $(_me).attr('oncallback'));
				}
			}
			if( callback ){ hipt.callback=callback; }	
			$(dt).append(img);
			$(dl).append([dt,dd]);
			return [div, hipt, dl];
		}
		/**
		 * 创建一个用于上传的iframe
		 * @param  {[type]} e 目标input file对象
		 * @param  {[type]} fun 回调函数
		 * @return {[type]}   [description]
		 */
		,cifm:function(e, fun){
			var o = ET.ce('iframe', {'class':'ET_STYLE_INPUT_FILE_EXT_IFRAME', 'id':'hifmupload', 'for':e.id})			
			o.forobj=e;
			ET.addEvents('onload', function(e){
				var url = $(this.forobj).attr('action')
				url=(url!=undefined)?url:'';
				if(url==''){
					var frm=$(this.forobj);
					while(url==''){
						if(frm.length==0){ url=location.href;break; }
						frm=frm[0];
						if( frm.tagName!=undefined && frm.tagName.toLowerCase()=='form' ){ url = $(frm).attr('action'); }
						frm=$(frm).parent();
					}
				}
				url=url?url:ET.appPath+'upload.php';
				var frm=ET.ce('form', {'action':url, 'method':'post', 'enctype':'multipart/form-data'})
				,hipt=ET.ce('input', {'type':'file', 'name':'file'})
				,doc = o.contentDocument||o.contentWindow.document;
				$(frm).append(hipt);
				o.chosenfile=function(filetype){
					filetype=filetype?filetype:"image/gif,image/jpeg,image/png,image/jpg,image/bmp";
					if(filetype){$(hipt).attr('accept', filetype); }
					$(hipt).click();
				}
				$(hipt).change(function(e) {
					var file = this.value,ret={}
					,m = /.*[\\\/](.+)\.([^\.]+)$/gi.exec(file);
					if(m){
						var pams = {'file':m[0] ,'filename':m[1]+'.'+m[2] ,'ext':m[2].toLowerCase() } ;
						ret={'errcode':0 ,'status':100 ,localUrl:[]};
						ET.extend(ret, pams);
						var winURL = window.URL || window.webkitURL;						
						if(this.files){
							for(var i=0; i<this.files.length;i++ ){ret.localUrl.push( winURL.createObjectURL(this.files[i]) ); }
						}else{
							furl= "file://"+this.value.replace(/\\/gi,'/');
							ret.localUrl.push(furl);
							console.log(furl);
						}
						fun(ret, function(){
							ET.addEvents('onload', function(e){
								var doc = this.contentWindow.document
								,title = doc.title+''
								,text = $(doc.body).text()
								,status = (title.indexOf('404')==0)?404:200
								,ret={errcode:0, 'status':status, title:title, data:ET.execJS(text), 'text':text};
								ET.extend(ret, pams);
								fun(ret);
							}, o);
							$(frm).submit();
						});
					}
				});
				if(!doc){return ;}
				$(doc).find('body').append( frm );
			}, o);
			return o;
		}
	}
	//验证数据是否,符合rules属性指定的规则。供form提交时验证
	,verification:function(){
		var _me=this,ret={errcode:0, data:'ok'}
		,rules = $(this).attr('rules')
		,required = $(this).attr('required')
		,msg=$(this).attr('placeholder')?$(this).attr('placeholder'):''
		,intMax=Math.pow(2,31)-1
		,min=(!this.minLength || this.minLength<0)?0:this.minLength
		,max=(!this.maxLength || this.maxLength<0)?intMax:this.maxLength ;
		min=(min>intMax)?intMax:min; min=(min<0)?0:min;
		max=(max>intMax)?intMax:max; max=(max<1)?1:max;

		required=!required?false:true;
		if(msg==''){msg = this.id;}
		msg = '['+msg+']';
		if(required && this.value==''){return tx({errcode:10000, data:msg+'Can not be empty!'}); }
		if(rules){
			if(! ET.data.verification(this.value, rules) ){
				return tx({errcode:10001, data:msg+'The data is illegal!'});
			}
		}		
		if(!ET.data.lengthrangelimit(this.value, min, max)){
			return tx({errcode:10002, data:msg+'data length is not within the scope of!'});
		}
		function tx(data){$('[for='+_me.id+']').addClass('tx'); return data; }
		$('[for='+this.id+']').removeClass('tx');
		return ret;
	}
	,iniPlaceholder:function(){
		var placeholder = $(this).attr('placeholder');				
		if(!('placeholder' in document.createElement('input')) && placeholder ){ this.CVPlaceholder(placeholder); }
		// this.CVPlaceholder(placeholder);
		return this;
	}
	/**
	 * 创建虚拟 placeholder
	 * @return {[type]} [description]
	 */
	,CVPlaceholder:function(txt){
		if(this.vplaceholder!==undefined){ return this; }
		var _me = this
		, div = ET.ce('div', {'for':this.id+'_placeholder', 'class':'ET_PLACEHOLDER', 'innerHTML':txt});
		$(this).keyup(function(){
			if(this.value.length>0){$(div).hide(); }else{$(div).show(); }
		});

		var of=$(this).offset(), w = $(this).width() + $(this).css('border-left-width').replace(/[^\d]+/,'')*1
			+ $(this).css('border-right-width').replace(/[^\d]+/,'')*1
			,h = $(this).height() + $(this).css('border-top-width').replace(/[^\d]+/,'')*1
			+ $(this).css('border-bottom-width').replace(/[^\d]+/,'')*1;
		$(div).css({
			'width':ET.unit.pxorem(w+'px')
			,'height':ET.unit.pxorem(h+'px')
			,'overflow':'hidden'
			,'font-size': ET.unit.pxorem($(this).css('font-size'))
			// ,'top':of.top+'px'
			// ,'left':of.left+'px'
		}).click(function(){$(_me).focus();	});
		$(this).before(div);
		return this;
	}


}});