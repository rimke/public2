/*
*
*	textarea 扩展 1.0.0.1
*	Release date: 
*	Author		: 半条虫(466814195)
*	Keywords	: Etsoftware 半条虫(466814195) rimke 39doo 39度
*	Description	: 本脚本功能由EtSoftWare团队研发，仅供学习不得用于商业用途。
*	Blog		: http://rimke.blog.163.com/		
*	Website		: http://www.39doo.com/
*	Mail		: rimke@163.com
*	Copyright	: Power By Etsoftware
*	
* <textarea et="" advanced="true" editor="bootstrapwysiwyg" cols="30" rows="10" ></textarea>
*/

ET.extend(ET.extension, {textarea:{
	initialize:function(){
		if(!ET.data) ET.loadLib('data');
		this.cid();
		this.advanced = $(this).attr('advanced');
		this.advanced=/^([\s\t]*advanced[\s\t]*)|([\s\t]*true[\s\t]*)$/gi.test(this.advanced);
		this.editor = $(this).attr('editor');
		var ext = ext?ext:'editor';
		if(this.advanced){ this.extend(ext); }

		
	}
	//验证数据是否,符合rules属性指定的规则。供form提交时验证
	,verification:function(){
		var _me=this,ret={errcode:0, data:'ok'}
		,rules = $(this).attr('rules')
		,msg=$(this).attr('placeholder')?$(this).attr('placeholder'):''
		,intMax=Math.pow(2,31)-1
		,min=this.minLength<0?0:this.minLength
		,max=this.maxLength<0?intMax:this.maxLength;
		min=(min>intMax)?intMax:min; min=(min<0)?0:min;
		max=(max>intMax)?intMax:max; max=(max<1)?1:max;
		if(msg==''){msg = this.id;}
		msg = '['+msg+']';
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

}});