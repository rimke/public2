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
			'message':[
				{'Name':'CPIM', 'Template':'message/CPIM', 'Reference':'[RFC3862]'}
				,{'Name':'delivery-status', 'Template':'message/delivery-status', 'Reference':'[RFC1894]'}
				,{'Name':'disposition-notification', 'Template':'message/disposition-notification', 'Reference':'[RFC8098]'}
				,{'Name':'example', 'Template':'message/example', 'Reference':'[RFC4735]'}
				,{'Name':'external-body', 'Template':'', 'Reference':'[RFC2045][RFC2046]'}
				,{'Name':'feedback-report', 'Template':'message/feedback-report', 'Reference':'[RFC5965]'}
				,{'Name':'global', 'Template':'message/global', 'Reference':'[RFC6532]'}
				,{'Name':'global-delivery-status', 'Template':'message/global-delivery-status', 'Reference':'[RFC6533]'}
				,{'Name':'global-disposition-notification', 'Template':'message/global-disposition-notification', 'Reference':'[RFC6533]'}
				,{'Name':'global-headers', 'Template':'message/global-headers', 'Reference':'[RFC6533]'}
				,{'Name':'http', 'Template':'message/http', 'Reference':'[RFC7230]'}
				,{'Name':'imdn+xml', 'Template':'message/imdn+xml', 'Reference':'[RFC5438]'}
				,{'Name':'news - OBSOLETED by RFC5537', 'Template':'message/news', 'Reference':'[RFC5537][Henry_Spencer]'}
				,{'Name':'partial', 'Template':'', 'Reference':'[RFC2045][RFC2046]'}
				,{'Name':'rfc822', 'Template':'', 'Reference':'[RFC2045][RFC2046]'}
				,{'Name':'s-http', 'Template':'message/s-http', 'Reference':'[RFC2660]'}
				,{'Name':'sip', 'Template':'message/sip', 'Reference':'[RFC3261]'}
				,{'Name':'sipfrag', 'Template':'message/sipfrag', 'Reference':'[RFC3420]'}
				,{'Name':'tracking-status', 'Template':'message/tracking-status', 'Reference':'[RFC3886]'}
				,{'Name':'vnd.si.simp - OBSOLETED by request', 'Template':'message/vnd.si.simp', 'Reference':'[Nicholas_Parks_Young]'}
				,{'Name':'vnd.wfa.wsc', 'Template':'message/vnd.wfa.wsc', 'Reference':'[Mick_Conley]'}
			]

		}
	,initialize:function(){
		
	}
})