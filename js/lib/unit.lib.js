/*
*
*	unit Beta 1.0.0.1
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
ET.extend({unit:{
	initialize:function(){
		if(!ET.array) ET.loadLib('array');
		if(!ET.css) ET.loadLib('css');
		this.unit={
			'length':{
				// 公制
				'metric': {
					'unit':{
						'en': ['km','m','dm','cm','mm','um','nm','pm','ly']
						,'cn': ['千米','米','分米','厘米','毫米','微米','纳米','皮米','光年']
					}
					,'step':[0, 1000, 10,   10,    10,  1000, 1000, 1000, 1.0570e-28]
				}
			}
			,'weight':{
				// 公制
				'metric': {
					'unit':{
						'en': ['t','kg','g','mg','μg']
						,'cn': ['吨','千克','克','毫克','微克']
					}
					,'step':[0,1000, 1000, 1000, 1000]
				}
			}
		}
		var obj={};
		for(var u in this.unit){
			obj[u]={};
			var o=this.unit[u];
			for(var c in o){
				obj[u][c]={};
				var e=o[c];
				this.fn.extend(obj[u][c], e.unit.en, e.step);
			}
		}
		$.extend(this, obj);
	}
	,fn:{
		extend:function(target, unit, step){
			var obj={}, fun = this.conversion;
			for(var i=0; i<unit.length; i++){
				var k1=unit[i], rate=1;
				for(var j=0; j<unit.length; j++){
					var k2=unit[j], k3=k1+'2'+k2, k4=k2+'2'+k1;
					if(k1==k2 || obj[k3]){continue;}
					rate*=step[j]?step[j]:1;
					obj[k3]=new Function('val', 'return '+fun+'(val, '+rate+');');
					obj[k4]=new Function('val', 'return '+fun+'(val, '+(rate*-1)+');');
				}
			}
			$.extend(target, obj);
		}
		,conversion:function(val, rate){
			if(typeof(val)== "number"){
				if(typeof(rate)=="function"){
					val=rate(val);
				}else{
					val=(rate>0)?val*rate:val/(rate*-1);
					val=+val.toFixed(9);
				}
				return val;
			}else if(val.match(/^\d+$/)){
				return this.conversion(val*1, rate);
			}
			return Infinity;
		}
	}
	/**
	 * 获取根字体大小(单位为px)
	 * @return {[type]} 成功返回为一个正数，失败返回为0
	 */
	,_getRootFontSize:function(){
		if(this._HtmlfontSize){return this._HtmlfontSize;}
		var ret=0;
		var fs=$('>').css('font-size');
		if(fs){ ret=fs.replace(/[^\d]+/gi, '')*1; }
		this._HtmlfontSize=ret;
		return ret;
	}
	/**
	 * px rem em 转换
	 * @param  {[type]} val  值
	 * @param  {[type]} rate 倍数，正数为px转rem, 负数为rem转px
	 * @return {[type]}      [description]
	 */
	,_ss:function(val, rate){
		if(val===undefined||val==null){return null; }
		rate=rate?rate:this._getRootFontSize();
		if(typeof(val)=="string"){
			var re=/^([\s\t\:]*)(\-?\d[\d\.]*)[\s\t]*([^\d]*?)([\s\t]*)$/gi
			,m = re.exec(val);
			if(m){
				var unit=m[3].toLowerCase();
				if( (rate<0 && unit=='px') || (rate>0 && unit=='rem')  ){return val;}
				// if( (unit=='px' && rate<0) || (unit!='px' && rate>0) ){ rate*=-1;}
				var ret= m[1]+this._ss(m[2]*1, rate)+ (unit?(rate<0?'px':'rem'):'')+m[4]; 
				return ((ret+'').match(/^\d+$/gi)?ret*1:ret);
			}
			return val;
		}
		if(rate>0){val/=rate;}
		else if(rate<0){val*=(rate*-1); }
		else { return val; }
		val=+val.toFixed(2);
		return val;
	}
	/**
	 * 自动识别浏览支持的单位
	 * @param  {[type]} val [description]
	 * @return {[type]}     [description]
	 */
	,pxorem:function(val){
		var ret=0;
		if(ET.css.isSupportRem()){
			ret=this.px2rem(val);
			if(/^[\d\.]+$/gi.test(ret)){ ret+='rem'; }
			return ret;
		}
		ret=this.rem2px(val);
		if(/^[\d\.]+$/gi.test(ret)){ ret+='px'; }
		return ret;
	}
	/**
	 * 将px转换为同等rem
	 * @param  {[type]} val  px数量
	 * @param  {[type]} rate 位率 默认为根元素font-size大小
	 * @return {[type]}      font-size/100 * val
	 */
	,px2rem:function(val, rate){
		rate=rate?rate:this._getRootFontSize();
		if(rate<0){rate*=-1;}		
		if(/^.*\.css[\w\?]*$/gi.test(val)){return this.px2rem( ET.getFile(val) ); }
		var restr ="([\\s\\t\\:]*)(\\-?[\\d][\\d\\.]*)(px)([\\s\\t]*)"
		,re = new RegExp(restr, "gi")
		_me=this;
		val+='';
		if( val.match(/^\d+$/gi) ){ return _me._ss(val, rate); }
		val=(val+'').replace(re, function(e){return _me._ss(e, rate); });
		return val;
	}
	/**
	 * 将px转换为同等rem
	 * @param  {[type]} val  px数量
	 * @param  {[type]} rate 位率 默认为父元素font-size大小
	 * @return {[type]}      [description]
	 */
	,px2em:function(val, rate){var ret=this.px2rem(val, rate); return ( typeof(ret)== "number" )?ret:ret.replace('rem', 'em'); }
	,em2px:function(val, rate){val=( typeof(val)== "number" )?val:val.replace('em', 'rem'); return this.rem2px(val, rate); }
	/**
	 * 将rem转换为同等px
	 * @param  {[type]} val  rem数量
	 * @param  {[type]} rate 位率 默认为根元素font-size大小
	 * @return {[type]}      [description]
	 */
	,rem2px:function(val, rate){
		rate=rate?rate:this._getRootFontSize();
		if(rate>0){rate*=-1;}
		if(/^.*\.css[\w\?]*$/gi.test(val)){return this.px2rem( ET.getFile(val) ); }
		var restr ="([\\s\\t\\:]*)(\\-?[\\d][\\d\\.]*)(rem)([\\s\\t]*)"
		,re = new RegExp(restr, "gi")
		_me=this;
		val+='';
		if( val.match(/^\d+$/gi) ){ return _me._ss(val, rate); }
		val=(val+'').replace(re, function(e){return _me._ss(e, rate); });
		return val;
	}
}});