/*
*
*	hotkey Beta 1.0.0.1
*	Release date: 2018-10-10
*	Author		: 半条虫(466814195)
*	Keywords	: Etsoftware 半条虫(466814195) rimke 39doo 39度
*	Description	: 本脚本功能由EtSoftWare团队研发，仅供学习不得用于商业用途。
*	Blog		: http://rimke.blog.163.com/		
*	Website		: http://www.39doo.com/
*	Mail		: rimke@163.com
*	Copyright	: Power By Etsoftware
*
*/
ET.extend({hotkey:{
	initialize:function(){

		var key={
			'Escape':27
			,'Space':32
			,'NumpadEnter':13 ,'Enter':13
			,'Backquote':192

			,'NumLock':144
			,'NumpadDivide':111
			,'NumpadDecimal':110
			,'NumpadAdd':107
			,'NumpadSubtract':109
			,'NumpadMultiply':106

			,'Pause':19
			,'ScrollLock':145

			,'PageUp':33
			,'PageDown':34
			,'End':35
			,'Home':36
			,'Insert':45
			,'Delete':46
			,'Tab':9
			

		};
		for(var i=0; i<10; i++){key['Digit'+i]=48+i; }
		for(var i=0; i<10; i++){key['Numpad'+i]=96+i; }
		for(var i=112; i<124; i++){key['F'+(i-111)]=i; }
		for(var i=0; i<26; i++){ var keyCode=65+i; key['Key'+ String.fromCharCode(keyCode)]=keyCode; }

		$.extend(this, this.fn, key);
		this.listenKey();
	}
	/**
	 * 获取keyCode表
	 * @return {[type]} [description]
	 */
	,getKeyCode:function(c){
		if(!c) return null;
		var code=(c.toLocaleUpperCase()).charCodeAt();
		return code;
	}
	/**
	 * 添加热键
	 * @param {[type]} keyCode 按键码
	 * @param {[type]} keyCombination 组合键,默认为null
	 * @param {[type]} fun     作用函数
	 * @param {[type]} target     目标对象，默认为window
	 */
	,addKey:function(keyCode, keyCombination, fun, target){
		if(!keyCode || !fun){return ;}
		target=target?target:this;
		target.hkData=target.hkData?target.hkData:[];
		target.hkData.push({keyCode:keyCode, keyCombination:keyCombination, fun:fun});
		if( target!=this ){
			$.extend(target, this.fn);
		}
		return this;
	}
	,fn:{
		altKey:1 ,ctrlKey:2 ,shiftKey:4 ,metaKey:8
		/**
		 * 响应热键
		 * @return {[type]} [description]
		 */
		,onhotkey:function(){
			var data = this.hkData?this.hkData:[];
			for(var i=0, l=data.length; i<l;i++){
				var d = data[i];
				if(d.keyCombination){
					if( d.keyCombination & this.altKey ){ if(!event.altKey){ continue;} }
					if( d.keyCombination & this.ctrlKey ){ if(!event.ctrlKey){ continue;} }
					if( d.keyCombination & this.shiftKey ){ if(!event.shiftKey){ continue;} }
					if( d.keyCombination & this.metaKey ){ if(!event.metaKey){ continue;} }
				}
				if( event.keyCode!=d.keyCode ){ continue;}
				d.fun();
			}
		}
		// 监听按键
		,listenKey:function(){
			var _me=this, ele=_me;
			if(!ET.object.isElement( _me ) ){ ele=window;}
			$(ele).keyup(function(){_me.onhotkey()})
			.keydown(function(){_me.onhotkey()})
			.keypress(function(){_me.onhotkey()});
		}
	}
}});