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

({
	 IANAMIME:{
			'multipart':[
				{'Name':'alternative', 'Template':'', 'Reference':'[RFC2046][RFC2045]'}
				,{'Name':'appledouble', 'Template':'multipart/appledouble', 'Reference':'[Patrik_Faltstrom]'}
				,{'Name':'byteranges', 'Template':'multipart/byteranges', 'Reference':'[RFC7233]'}
				,{'Name':'digest', 'Template':'', 'Reference':'[RFC2046][RFC2045]'}
				,{'Name':'encrypted', 'Template':'multipart/encrypted', 'Reference':'[RFC1847]'}
				,{'Name':'example', 'Template':'multipart/example', 'Reference':'[RFC4735]'}
				,{'Name':'form-data', 'Template':'multipart/form-data', 'Reference':'[RFC7578]'}
				,{'Name':'header-set', 'Template':'multipart/header-set', 'Reference':'[Dave_Crocker]'}
				,{'Name':'mixed', 'Template':'', 'Reference':'[RFC2046][RFC2045]'}
				,{'Name':'multilingual', 'Template':'multipart/multilingual', 'Reference':'[RFC8255]'}
				,{'Name':'parallel', 'Template':'', 'Reference':'[RFC2046][RFC2045]'}
				,{'Name':'related', 'Template':'multipart/related', 'Reference':'[RFC2387]'}
				,{'Name':'report', 'Template':'multipart/report', 'Reference':'[RFC6522]'}
				,{'Name':'signed', 'Template':'multipart/signed', 'Reference':'[RFC1847]'}
				,{'Name':'vnd.bint.med-plus', 'Template':'multipart/vnd.bint.med-plus', 'Reference':'[Heinz-Peter_Schütz]'}
				,{'Name':'voice-message', 'Template':'multipart/voice-message', 'Reference':'[RFC3801]'}
				,{'Name':'x-mixed-replace', 'Template':'multipart/x-mixed-replace', 'Reference':'[W3C][Robin_Berjon]'}
			]

		}
	,initialize:function(){
		
	}
})