ET.extend({string:{
	initialize:function(){
		if(!ET.array) ET.loadLib('array');
	}
	/**
	 * 排除字符串
	 * 函数执行前排除字符串指定内容
	 * @param  {[type]} str 源字符串
	 * @param  {[type]} re   目标字符串，支持RegExp
	 * @param  {[type]} fun  执行函数
	 * @return {[type]}      返回执行后的结果
	 */
	,preclude:function(str, re, fun){return this.exclude( str, re, fun );}
	,exclude:function(str, re, fun){
		if(!str || typeof(str)!="string"){if(fun) return fun(str); }
		var transSymbol=['$'], transl=['{{del_trans_symbol_','}}'];
		for(var i=0; i<transSymbol.length; i++){
			var c = transSymbol[i]+'';
			str=str.replace(new RegExp('\\'+c, 'g'), transl[0]+ c.charCodeAt() +transl[1]); 
		}
		var label = ['{{del_com_'+ET.random.Hex(8)+'_', '}}'];
		var m = str.match (  re );
		if(m && str)for(var i=0; i< m.length; i++){str = str.replace(m[i], label[0] + i + label[1] ); }
		fun && ( str = fun(str) );
		if(m && str) for(var i=0; i< m.length; i++){str = str.replace( label[0] + i + label[1], m[i] ); }
		
		var regstr=transl[0]+'(\\d+)'+transl[1];
		regstr=regstr.replace(/\{|\}/gi, function(e){return '\\'+e;});
		str = str.replace(  new RegExp(regstr, 'gi'), function(e){ 
			var m =(new RegExp(regstr, 'gi')).exec(e);
			if(!m){ return e;}
			return String.fromCharCode(m[1]);
		} );
		return str;
	}
	/**
	 * 格式化字符串
	 * @param  {[type]} str      源字符串如“my name is {name}.”
	 * @param  {[type]} data     数据源{'name':rimke}
	 * @param  {[type]} LABELON  [description]
	 * @param  {[type]} LABELOFF [description]
	 * @return {[type]}          返回字符串 my name is rimke.
	 */
	,format:function(str, data, LABELON, LABELOFF){
		if(!str || !data)return str;
		var reVal = str.toString();
		LABELON = LABELON?LABELON:'';
		LABELOFF = LABELOFF?LABELOFF:'';
		for (var key in data){
			var reKey = key.replace(/([^a-zA-Z\u4e00-\u9fa5])/g, '\\$1')
			,re = new RegExp( LABELON+reKey+LABELOFF, 'g')
			,val = data[key];
			if(typeof(val)=='string' || typeof(val)=='number'){
			}else if(val===null){val=''; 
			}else{val=val.toString(); }	
			try{reVal = reVal.replace(re, val); }catch(e){throw e; }
		}
		return reVal;
	}
	/**
	 * 将字符串转为对应的ASC码;
	 * @param  {[type]} str 字符串
	 * @param  {[type]} rtp 返回样式，默认为自动，0为自动，1为数组， 2为字符串
	 * @return {[type]}     [description]
	 */
	,charCodeAt:function(str, rtp){
		rtp=rtp?rtp:0;
		var reval=null, data=[];
		for (var i = 0; i < str.length; i++) {
			data.push(str.charCodeAt(i));
		}
		if(rtp==0){reval=(data.length==1)?data[0]:data;
		}else if(rtp==1){reval=data;
		}else if(rtp==2){
			reval='';
			for(var i=0; i<data.length;i++){reval+= ', '+data[i]; }
			reval = reval.substr(2);
		}
		return reval;
	}
	/**
	 * 将ASC码转换成对应的字符串
	 * @param  {[type]} str [description]
	 * @return {[type]}     [description]
	 */
	,fromCharCode:function(data){
		if( typeof(data)=='number' ){
			return String.fromCharCode(data);
		}else if( typeof(data)=='object' && data instanceof Array ){
			var reval='';
			for(var i=0; i<data.length; i++){reval+=this.fromCharCode(data[i]); }
			return reval;
		}
	}
	/**
	 * 将Unicode转换成为string
	 * @param  {[type]} str Unicode字符串如“\u0045\u0074\u0053\u006f\u0066\u0074\u0077\u0061\u0072\u0065”
	 * @return {[type]}     [description]
	 */
	,fromUnicode:function(str){
		str = str.replace(/(\\u)(\w{1,4})/gi,function($v){ 
			return (String.fromCharCode(parseInt((escape($v).replace(/(%5Cu)(\w{1,4})/g,"$2")),16))); 
		}); 
		str = str.replace(/(&#x)(\w{1,4});/gi,function($v){ 
			return String.fromCharCode(parseInt(escape($v).replace(/(%26%23x)(\w{1,4})(%3B)/g,"$2"),16)); 
		}); 
		str = str.replace(/(&#)(\d{1,6});/gi,function($v){ 
			return String.fromCharCode(parseInt(escape($v).replace(/(%26%23)(\d{1,6})(%3B)/g,"$2"))); 
		});
		return str;
	}
	/**
	 * 将字符串(中文)转为Unicode
	 * @param  {[type]} str 字符串
	 * @return {[type]}     [description]
	 */
	,toUnicode:function(data){
		if(data == '') return data;
		var reval =''; 
		for(var i=0;i<data.length;i++) {
			reval+="\\u"+parseInt(data[i].charCodeAt(0),10).toString(16);
		}
		return reval;
	}
	/**
	 * 加密字符串
	 * @param  {[type]} str [description]
	 * @return {[type]}     [description]
	 */
	,encryption:function(str){
		var now = (new Date()).getTime();
		var data=[];
	}
	/**
	 * 该函数将传入的字符串参数所有的字符都转换成小写,并以小定形式放回这个字符串.
	 * @param  {[type]} str [description]
	 * @return {[type]}     [description]
	 */
	,strtolower:function(str){return str?(str+'').toLowerCase():str; }
	/**
	 * 该函数的作用同strtolower函数相反,是将传入的字符参数的字符全部转换成大写,并以大写的形式返回这个字符串.用法同strtolowe()一样
	 * @param  {[type]} str [description]
	 * @return {[type]}     [description]
	 */
	,strtoupper:function(str){return str?(str+'').toUpperCase():str;}
	/**
	 * 该函数的作用是将字符串的第一个字符改成大写,该函数返回首字符大写的字符串.用法同strtolowe()一样.
	 * @param  {[type]} str [description]
	 * @return {[type]}     [description]
	 */
	,ucfirst:function(str){
		if(!str)return str;
		var mc=str.match(/[A-Za-z][A-Za-z\s\,]+/gi);
		if(!mc || mc.length==0){ return str; }		
		for(var i=0; i<mc.length; i++){
			var m=mc[i], fuc=this.strtoupper(m.substr(0,1))+m.substr(1);
			str = str.replace(m, fuc);
		}
		return str;
	}
	/**
	 * 该函数将传入的字符串的每个单词的首字符变成大写
	 * @param  {[type]} str [description]
	 * @return {[type]}     [description]
	 */
	,ucwords:function(str){
		if(!str)return str;
		var mc=str.match(/[A-Za-z]+/gi);
		if(!mc || mc.length==0){ return str; }		
		for(var i=0; i<mc.length; i++){
			var m=mc[i], fuc=this.strtoupper(m.substr(0,1))+m.substr(1);
			str = str.replace(m, fuc);
		}
		return str;
	}
	/**
	 * RLE 又叫 Run Length Encoding ，是一个针对无损压缩的非常简单的算法。
	 * 它用重复字节和重复的次数来简单描述来代替重复的字节。尽管简单并且对于通常的压缩非常低效，
	 * 但它有的时候却非常有用（例如， JPEG 就使用它）。
	 */
	,RLE:function(){}
	/**
	 * 压缩字符串
	 * @param  {[type]} str 源字符串
	 * @return {[type]}     返回为压缩后的字符串
	 */
	,compression:function(str){
		if(!str)return str;
		var re="\\b\\w+\\b", feilds = str.match(new RegExp(re, 'g')), tpl=str, len=0;		
		if(feilds){
			len=feilds.length;
			feilds=ET.array.removeRepeat(feilds);
			tpl=tpl.replace(new RegExp(re, 'g'), function(e){
				for(var i=0; i<len; i++){
					if(feilds[i]===e){
						return i;
						break;
					}
				}
			});
		}
		// var mc=str.match(/[\u4e00-\u9fa5]{2,}/g);
		// if(mc){
		// 	!feilds || (feilds=[]);
		// 	for(var i=0, l=mc.length;i<l;i++){
		// 		var m=mc[i];
		// 		feilds.push(m);
		// 		tpl=tpl.replace(new RegExp(m,'g'), feilds.length-1);				
		// 		console.log(tpl);
		// 	}
		// }
		return {t:tpl, f:feilds, l:len};
	}
	/**
	 * 解压字符串
	 * @param {[type]} cmp [description]
	 */
	,Decompression:function(cmp){
		if(!cmp || cmp.t===undefined || cmp.f===undefined || cmp.l===undefined )return cmp;
		if(!cmp.t)return cmp;
		if(!cmp.f)return cmp.t;
		var ret=cmp.t;
		ret=ret.replace(/\d+/gi, function(e){return ( cmp.f[e] )?cmp.f[e]:e; });
		return ret;
	}
	/**
	 * 生成字符串指纹
	 * @param  {[type]} str 源字符串
	 * @return {[type]}     [description]
	 */
	,fingerprint:function(str){
		if(!str)return str;
		str+='';
		var l= str.length, num=0, num1=0, num2=0, s='', ret=[l], sym='nrtsw';
		for(var i=0; i<l; i++){ 
			var c =str.substr(i,1).charCodeAt()
			num+=c; 
			num1=num1<0?num1*-1:num1;num1-=c;
			num2=(num2?num2:511)&c; 
			s+=num2?'1':'0';
		}
		s=s.replace(/\d{1,8}/gi, function(e){ var i=parseInt(e, 2);return i?i:0; } );
		l=s.length; num2=0;
		for(var i=0; i<s.length; i++){ num2+= (s.substr(i,1)*1); }
		num2+=l;
		s=num2.toString(16);
		ret.push(num); ret.push(num1); 
		num=1;
		for(var i=0; i<sym.length; i++){ var c=sym.substr(i,1), m=str.match( new RegExp('\\'+c,'gi') );  ret.push(m?m.length:0); }
		ret.push(s);
		num=0;
		for(var i=0; i<ret.length;i++){ num1=parseInt(ret[i]); num+= num1>0?num1:num1*-1; }
		s=num.toString(16)+'-'+ s;
		// console.log(s);
		return s;
	}
	/**
	 * 转义html标签，
	 * 如'<'输出为 &lt;
	 * @param  {[type]} str [description]
	 * @return {[type]}     [description]
	 */
	,escapeHtmlLabel:function(str){
		var symbol={'<':'&lt;', '>':'&gt;'};
		if(ET.code && ET.code.codeType.html.private_char){
			symbol=ET.code.codeType.html.private_char;
		}
		return this.format(str, symbol);
	}
	/**
	 * 转义RegExp字符
	 * 如 ^.*$ 结果为 "\^\.\*\$"
	 * @param  {[type]} str [description]
	 * @return {[type]}     [description]
	 */
	,escapeRegExp:function(str){
		var symbol={'\\':'\\\\'};
		if(ET.code && ET.code.codeType.regexp.private_char){
			symbol=ET.code.codeType.regexp.private_char;
		}
		return this.format(str, symbol);
	}
}});