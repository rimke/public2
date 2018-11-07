/*
*
*	navigator Beta 1.0.0.1
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
ET.extend({navigator:{
	initialize:function(){
		if(!ET.string) ET.loadLib('string');
		this.getInfromation();
	}
	/**
	 * 获取当前设备
	 * @param  {[type]} fun 回调函数默认为空
	 * @return {[type]}     [description]
	 */
	,getInfromation:function(fun){
		if(!this.infromation){
			var uai = navigator.userAgent
			,Browser =  ["Chrome", "Safari", "IE", "Edge", "Firefox", "Opera", "Vivaldi", "UC", "QQBrowser", "QQ", "Baidu", "Maxthon", "LBBROWSER", "2345Explorer", "Sogou", "Wechat", "Taobao", "Alipay", "Weibo", "Suning"]
			,Bnickname =  {"Chrome":"chromium", "IE":"RV", "IE":"MSIE"}
			,Kernel=["Trident", "Presto", "WebKit", "Gecko"]
			,os=["Mobile", "Linux",, "Windows", "Tablet"]
			,device=["Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod"];
			function ma(o, def){
				for(var i in o ){
					var b=o[i];					
					if(typeof(b)=='string'){
						var re = RegExp('[\\t\\s;^]+'+b+'', 'gi');
						if( uai.match(re) ){
							def= (i+'').match(/^\d+$/gi)?o[i]:i;
							break;
						}
					}else{
						var ret=ma(b, def);
						if(ret!==def){def=ret; break; }
					}
				}
				return (typeof(def)=='function')?def(uai):def;
			}
			function getVersion(o){
				var b=o+(Bnickname[o]?'|'+Bnickname[o]:'');
				var re = new RegExp('[\\s\\t;^]+('+b+")(\\/|\:)([\\d\\.]+)", 'gi');
				var m=re.exec(uai);
				if(!m){ return null; }
				return m[3];
			}
			function browserVersion(o){
				var ret = getVersion(o);
				if(ret!=null){
				}else if(o==Browser[2]){
					var ele=ET.ce('div', {'style':'width:0px;height:0px;'});
					for(var i=1; i<20; i++){
						$(ele).append("<!--[if IE "+i+"]><br/><![endif]-->");
						if($(ele).children().length>0){ret=i; break; }
					}
					$(ele).remove();
				}
				return ret;
			}
			var infromation={
				'Browser':{'name':ma([Browser, Bnickname], 'Order')}
				,'Kernel':{'name':ma(Kernel, 'Order')}
				,'OS':{'name':ma(os, 'Order')}
				,'Device':{'name':ma(device, 'PC')}
			};
			infromation.Browser.version=browserVersion(infromation.Browser.name);
			infromation.Kernel.version=getVersion(infromation.Kernel.name);
			infromation.OS.version=getVersion(infromation.OS.name);
			infromation.Device.version=getVersion(infromation.Device.name);
			$.extend(this, infromation);
		}
		fun && fun(infromation);
		return infromation;
	}
}});