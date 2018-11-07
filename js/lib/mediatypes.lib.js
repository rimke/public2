/*
*
*	Media Types 1.0.0.0
*	Release date: 
*	Author		: 半条虫(466814195)
*	Keywords	: Etsoftware 半条虫(466814195) rimke 39doo 39度
*	Description	: 本脚本功能由EtSoftWare团队研发，仅供学习不得用于商业用途。
*	Blog		: http://rimke.blog.163.com/		
*	Website		: http://www.39doo.com/
*	Mail		: rimke@163.com
*	Copyright	: Power By Etsoftware
*
*
Media Types
Last Updated
2018-10-05
Registration Procedure(s)
Expert Review for Vendor and Personal Trees.
Expert(s)
Ned Freed, Murray Kucherawy
Reference
[RFC6838][RFC4855]
Note
Per Section 3.1 of [RFC6838], Standards Tree requests made through IETF
documents will be reviewed and approved by the IESG, while requests made by
other recognized standards organizations will be reviewed by the Designated
Expert in accordance with the Specification Required policy. IANA will verify
that this organization is recognized as a standards organization by the
IESG.
Note
[RFC2046] specifies that Media Types (formerly known as MIME types) and Media
Subtypes will be assigned and listed by the IANA.

Procedures for registering Media Types can be found in [RFC6838], [RFC4289], 
and [RFC6657]. Additional procedures for registering media types for transfer via 
Real-time Transport Protocol (RTP) can be found in [RFC4855].

The following is the list of Directories of Content Types and Subtypes. If you wish to 
register a Media Type with the IANA, please see the following for the online application:

[Application for registration of Media Types]

Other Media Type Parameters: [IANA registry media-types-parameters]
Media Type Sub-Parameters: [IANA registry media-type-sub-parameters]
Available Formats

XML  
HTML  
Plain text
Registries included below 

*
*/
ET.extend({mediatypes:{
	 IANAMIME:{'application':null ,'image':null ,'message':null ,'model':null ,'multipart':null ,'text':null ,'video':null, 'audio':null }
	 ,IANAMIME_APPLICATION:1
	 ,IANAMIME_AUDIO:2
	 ,IANAMIME_IMAGE:4
	 ,IANAMIME_MESSAGE:8
	 ,IANAMIME_MODEL:16
	 ,IANAMIME_MULTIPART:32
	 ,IANAMIME_TEXT:64
	 ,IANAMIME_VIDEO:128
	,initialize:function(){}	
	/**
	 * 根据相关内容返回对应的IANAMIME对象
	 * @param  {[type]} IANAMIME_t 指定类型
	 * @param  {[type]} Name       根据Name查询
	 * @param  {[type]} Template   根据Template查询
	 * @param  {[type]} Reference  根据Reference查询
	 * @return {[type]}            [description]
	 */
	,getIANAMIME:function(IANAMIME_t, Name, Template, Reference){
		var ret=null;
		IANAMIME_t =IANAMIME_t?IANAMIME_t:(this.IANAMIME_APPLICATION | this.IANAMIME_AUDIO | this.IANAMIME_IMAGE | this.IANAMIME_MESSAGE | this.IANAMIME_MODEL | this.IANAMIME_MULTIPART | this.IANAMIME_TEXT | this.IANAMIME_VIDEO );
		var t = [
			,'IANAMIME_APPLICATION'
			,'IANAMIME_AUDIO'
			,'IANAMIME_IMAGE'
			,'IANAMIME_MESSAGE'
			,'IANAMIME_MODEL'
			,'IANAMIME_MULTIPART'
			,'IANAMIME_TEXT'
			,'IANAMIME_VIDEO'
		];
		for (var i=0; i<t.length; i++) {
			var itm = t[i];
			if( IANAMIME_t & this[itm] ){
				var tn = itm.replace('IANAMIME_', '').toLowerCase(), mt=null;
				if( this.IANAMIME[tn] == null){
					mt=ET.loadLib('mediatypes-'+ tn);
					$.extend(this.IANAMIME, mt.IANAMIME);
				}
				mt=this.IANAMIME[tn];
				for(var j=0; j<mt.length; j++){
					var m=mt[j];
					if(Name && m.Name!==Name){continue;}
					if(Template && m.Template!==Template){continue;}
					if(Reference && m.Reference!==Reference){continue;}
					if(!ret){ret=[];}
					ret.push(m);
				}

			}
		}
		return ret;
	}
	,getNameByTemplate:function(){

	}
}});