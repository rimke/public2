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
			'text':[
				{'Name':'1d-interleaved-parityfec', 'Template':'text/1d-interleaved-parityfec', 'Reference':'[RFC6015]'}
				,{'Name':'cache-manifest', 'Template':'text/cache-manifest', 'Reference':'[W3C][Robin_Berjon]'}
				,{'Name':'calendar', 'Template':'text/calendar', 'Reference':'[RFC5545]'}
				,{'Name':'css', 'Template':'text/css', 'Reference':'[RFC2318]'}
				,{'Name':'csv', 'Template':'text/csv', 'Reference':'[RFC4180][RFC7111]'}
				,{'Name':'csv-schema', 'Template':'text/csv-schema', 'Reference':'[National_Archives_UK][David_Underdown]'}
				,{'Name':'directory - DEPRECATED by RFC6350', 'Template':'text/directory', 'Reference':'[RFC2425][RFC6350]'}
				,{'Name':'dns', 'Template':'text/dns', 'Reference':'[RFC4027]'}
				,{'Name':'ecmascript - OBSOLETED in favor of application/ecmascript', 'Template':'text/ecmascript', 'Reference':'[RFC4329]'}
				,{'Name':'encaprtp', 'Template':'text/encaprtp', 'Reference':'[RFC6849]'}
				,{'Name':'enriched', 'Template':'', 'Reference':'[RFC1896]'}
				,{'Name':'example', 'Template':'text/example', 'Reference':'[RFC4735]'}
				,{'Name':'fwdred', 'Template':'text/fwdred', 'Reference':'[RFC6354]'}
				,{'Name':'grammar-ref-list', 'Template':'text/grammar-ref-list', 'Reference':'[RFC6787]'}
				,{'Name':'html', 'Template':'text/html', 'Reference':'[W3C][Robin_Berjon]'}
				,{'Name':'javascript - OBSOLETED in favor of application/javascript', 'Template':'text/javascript', 'Reference':'[RFC4329]'}
				,{'Name':'jcr-cnd', 'Template':'text/jcr-cnd', 'Reference':'[Peeter_Piegaze]'}
				,{'Name':'markdown', 'Template':'text/markdown', 'Reference':'[RFC7763]'}
				,{'Name':'mizar', 'Template':'text/mizar', 'Reference':'[Jesse_Alama]'}
				,{'Name':'n3', 'Template':'text/n3', 'Reference':'[W3C][Eric_Prudhommeaux]'}
				,{'Name':'parameters', 'Template':'text/parameters', 'Reference':'[RFC7826]'}
				,{'Name':'parityfec', 'Template':'', 'Reference':'[RFC5109]'}
				,{'Name':'plain', 'Template':'', 'Reference':'[RFC2046][RFC3676][RFC5147]'}
				,{'Name':'provenance-notation', 'Template':'text/provenance-notation', 'Reference':'[W3C][Ivan_Herman]'}
				,{'Name':'prs.fallenstein.rst', 'Template':'text/prs.fallenstein.rst', 'Reference':'[Benja_Fallenstein]'}
				,{'Name':'prs.lines.tag', 'Template':'text/prs.lines.tag', 'Reference':'[John_Lines]'}
				,{'Name':'prs.prop.logic', 'Template':'text/prs.prop.logic', 'Reference':'[Hans-Dieter_A._Hiep]'}
				,{'Name':'raptorfec', 'Template':'text/raptorfec', 'Reference':'[RFC6682]'}
				,{'Name':'RED', 'Template':'text/RED', 'Reference':'[RFC4102]'}
				,{'Name':'rfc822-headers', 'Template':'text/rfc822-headers', 'Reference':'[RFC6522]'}
				,{'Name':'richtext', 'Template':'', 'Reference':'[RFC2045][RFC2046]'}
				,{'Name':'rtf', 'Template':'text/rtf', 'Reference':'[Paul_Lindner]'}
				,{'Name':'rtp-enc-aescm128', 'Template':'text/rtp-enc-aescm128', 'Reference':'[_3GPP]'}
				,{'Name':'rtploopback', 'Template':'text/rtploopback', 'Reference':'[RFC6849]'}
				,{'Name':'rtx', 'Template':'text/rtx', 'Reference':'[RFC4588]'}
				,{'Name':'sgml', 'Template':'text/sgml', 'Reference':'[RFC1874]'}
				,{'Name':'strings', 'Template':'text/strings', 'Reference':'[IEEE-ISTO-PWG-PPP]'}
				,{'Name':'t140', 'Template':'text/t140', 'Reference':'[RFC4103]'}
				,{'Name':'tab-separated-values', 'Template':'text/tab-separated-values', 'Reference':'[Paul_Lindner]'}
				,{'Name':'troff', 'Template':'text/troff', 'Reference':'[RFC4263]'}
				,{'Name':'turtle', 'Template':'text/turtle', 'Reference':'[W3C][Eric_Prudhommeaux]'}
				,{'Name':'ulpfec', 'Template':'text/ulpfec', 'Reference':'[RFC5109]'}
				,{'Name':'uri-list', 'Template':'text/uri-list', 'Reference':'[RFC2483]'}
				,{'Name':'vcard', 'Template':'text/vcard', 'Reference':'[RFC6350]'}
				,{'Name':'vnd.a', 'Template':'text/vnd.a', 'Reference':'[Regis_Dehoux]'}
				,{'Name':'vnd.abc', 'Template':'text/vnd.abc', 'Reference':'[Steve_Allen]'}
				,{'Name':'vnd.ascii-art', 'Template':'text/vnd.ascii-art', 'Reference':'[Kim_Scarborough]'}
				,{'Name':'vnd.curl', 'Template':'text/vnd.curl', 'Reference':'[Robert_Byrnes]'}
				,{'Name':'vnd.debian.copyright', 'Template':'text/vnd.debian.copyright', 'Reference':'[Charles_Plessy]'}
				,{'Name':'vnd.DMClientScript', 'Template':'text/vnd.DMClientScript', 'Reference':'[Dan_Bradley]'}
				,{'Name':'vnd.dvb.subtitle', 'Template':'text/vnd.dvb.subtitle', 'Reference':'[Peter_Siebert][Michael_Lagally]'}
				,{'Name':'vnd.esmertec.theme-descriptor', 'Template':'text/vnd.esmertec.theme-descriptor', 'Reference':'[Stefan_Eilemann]'}
				,{'Name':'vnd.fly', 'Template':'text/vnd.fly', 'Reference':'[John-Mark_Gurney]'}
				,{'Name':'vnd.fmi.flexstor', 'Template':'text/vnd.fmi.flexstor', 'Reference':'[Kari_E._Hurtta]'}
				,{'Name':'vnd.gml', 'Template':'text/vnd.gml', 'Reference':'[Mi_Tar]'}
				,{'Name':'vnd.graphviz', 'Template':'text/vnd.graphviz', 'Reference':'[John_Ellson]'}
				,{'Name':'vnd.hgl', 'Template':'text/vnd.hgl', 'Reference':'[Heungsub_Lee]'}
				,{'Name':'vnd.in3d.3dml', 'Template':'text/vnd.in3d.3dml', 'Reference':'[Michael_Powers]'}
				,{'Name':'vnd.in3d.spot', 'Template':'text/vnd.in3d.spot', 'Reference':'[Michael_Powers]'}
				,{'Name':'vnd.IPTC.NewsML', 'Template':'text/vnd.IPTC.NewsML', 'Reference':'[IPTC]'}
				,{'Name':'vnd.IPTC.NITF', 'Template':'text/vnd.IPTC.NITF', 'Reference':'[IPTC]'}
				,{'Name':'vnd.latex-z', 'Template':'text/vnd.latex-z', 'Reference':'[Mikusiak_Lubos]'}
				,{'Name':'vnd.motorola.reflex', 'Template':'text/vnd.motorola.reflex', 'Reference':'[Mark_Patton]'}
				,{'Name':'vnd.ms-mediapackage', 'Template':'text/vnd.ms-mediapackage', 'Reference':'[Jan_Nelson]'}
				,{'Name':'vnd.net2phone.commcenter.command', 'Template':'text/vnd.net2phone.commcenter.command', 'Reference':'[Feiyu_Xie]'}
				,{'Name':'vnd.radisys.msml-basic-layout', 'Template':'text/vnd.radisys.msml-basic-layout', 'Reference':'[RFC5707]'}
				,{'Name':'vnd.si.uricatalogue - OBSOLETED by request', 'Template':'text/vnd.si.uricatalogue', 'Reference':'[Nicholas_Parks_Young]'}
				,{'Name':'vnd.sun.j2me.app-descriptor', 'Template':'text/vnd.sun.j2me.app-descriptor', 'Reference':'[Gary_Adams]'}
				,{'Name':'vnd.trolltech.linguist', 'Template':'text/vnd.trolltech.linguist', 'Reference':'[David_Lee_Lambert]'}
				,{'Name':'vnd.wap.si', 'Template':'text/vnd.wap.si', 'Reference':'[WAP-Forum]'}
				,{'Name':'vnd.wap.sl', 'Template':'text/vnd.wap.sl', 'Reference':'[WAP-Forum]'}
				,{'Name':'vnd.wap.wml', 'Template':'text/vnd.wap.wml', 'Reference':'[Peter_Stark]'}
				,{'Name':'vnd.wap.wmlscript', 'Template':'text/vnd.wap.wmlscript', 'Reference':'[Peter_Stark]'}
				,{'Name':'xml', 'Template':'text/xml', 'Reference':'[RFC7303]'}
				,{'Name':'xml-external-parsed-entity', 'Template':'text/xml-external-parsed-entity', 'Reference':'[RFC7303]'}
			]
			
		}
	,initialize:function(){
		
	}
})