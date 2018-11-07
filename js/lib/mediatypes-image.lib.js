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
			'image':[
				{'Name':'aces', 'Template':'image/aces', 'Reference':'[SMPTE][Howard_Lukk]'}
				,{'Name':'avci', 'Template':'image/avci', 'Reference':'[ISO-IEC_JTC1][David_Singer]'}
				,{'Name':'avcs', 'Template':'image/avcs', 'Reference':'[ISO-IEC_JTC1][David_Singer]'}
				,{'Name':'bmp', 'Template':'image/bmp', 'Reference':'[RFC7903]'}
				,{'Name':'cgm', 'Template':'image/cgm', 'Reference':'[Alan_Francis]'}
				,{'Name':'dicom-rle', 'Template':'image/dicom-rle', 'Reference':'[DICOM_Standards_Committee][David_Clunie]'}
				,{'Name':'emf', 'Template':'image/emf', 'Reference':'[RFC7903]'}
				,{'Name':'example', 'Template':'image/example', 'Reference':'[RFC4735]'}
				,{'Name':'fits', 'Template':'image/fits', 'Reference':'[RFC4047]'}
				,{'Name':'g3fax', 'Template':'image/g3fax', 'Reference':'[RFC1494]'}
				,{'Name':'gif', 'Template':'', 'Reference':'[RFC2045][RFC2046]'}
				,{'Name':'heic', 'Template':'image/heic', 'Reference':'[ISO-IEC_JTC1][David_Singer]'}
				,{'Name':'heic-sequence', 'Template':'image/heic-sequence', 'Reference':'[ISO-IEC_JTC1][David_Singer]'}
				,{'Name':'heif', 'Template':'image/heif', 'Reference':'[ISO-IEC_JTC1][David_Singer]'}
				,{'Name':'heif-sequence', 'Template':'image/heif-sequence', 'Reference':'[ISO-IEC_JTC1][David_Singer]'}
				,{'Name':'ief', 'Template':'', 'Reference':'[RFC1314]'}
				,{'Name':'jls', 'Template':'image/jls', 'Reference':'[DICOM_Standards_Committee][David_Clunie]'}
				,{'Name':'jp2', 'Template':'image/jp2', 'Reference':'[RFC3745]'}
				,{'Name':'jpeg', 'Template':'', 'Reference':'[RFC2045][RFC2046]'}
				,{'Name':'jpm', 'Template':'image/jpm', 'Reference':'[RFC3745]'}
				,{'Name':'jpx', 'Template':'image/jpx', 'Reference':'[RFC3745]'}
				,{'Name':'ktx', 'Template':'', 'Reference':'[Khronos][Mark_Callow][http://www.khronos.org/opengles/sdk/tools/KTX/file_format_spec/#mimeregistration]'}
				,{'Name':'naplps', 'Template':'image/naplps', 'Reference':'[Ilya_Ferber]'}
				,{'Name':'png', 'Template':'image/png', 'Reference':'[Glenn_Randers-Pehrson]'}
				,{'Name':'prs.btif', 'Template':'image/prs.btif', 'Reference':'[Ben_Simon]'}
				,{'Name':'prs.pti', 'Template':'image/prs.pti', 'Reference':'[Juern_Laun]'}
				,{'Name':'pwg-raster', 'Template':'image/pwg-raster', 'Reference':'[Michael_Sweet]'}
				,{'Name':'svg+xml', 'Template':'', 'Reference':'[W3C][http://www.w3.org/TR/SVG/mimereg.html]'}
				,{'Name':'t38', 'Template':'image/t38', 'Reference':'[RFC3362]'}
				,{'Name':'tiff', 'Template':'image/tiff', 'Reference':'[RFC3302]'}
				,{'Name':'tiff-fx', 'Template':'image/tiff-fx', 'Reference':'[RFC3950]'}
				,{'Name':'vnd.adobe.photoshop', 'Template':'image/vnd.adobe.photoshop', 'Reference':'[Kim_Scarborough]'}
				,{'Name':'vnd.airzip.accelerator.azv', 'Template':'image/vnd.airzip.accelerator.azv', 'Reference':'[Gary_Clueit]'}
				,{'Name':'vnd.cns.inf2', 'Template':'image/vnd.cns.inf2', 'Reference':'[Ann_McLaughlin]'}
				,{'Name':'vnd.dece.graphic', 'Template':'image/vnd.dece.graphic', 'Reference':'[Michael_A_Dolan]'}
				,{'Name':'vnd.djvu', 'Template':'image/vnd.djvu', 'Reference':'[Leon_Bottou]'}
				,{'Name':'vnd.dwg', 'Template':'image/vnd.dwg', 'Reference':'[Jodi_Moline]'}
				,{'Name':'vnd.dxf', 'Template':'image/vnd.dxf', 'Reference':'[Jodi_Moline]'}
				,{'Name':'vnd.dvb.subtitle', 'Template':'image/vnd.dvb.subtitle', 'Reference':'[Peter_Siebert][Michael_Lagally]'}
				,{'Name':'vnd.fastbidsheet', 'Template':'image/vnd.fastbidsheet', 'Reference':'[Scott_Becker]'}
				,{'Name':'vnd.fpx', 'Template':'image/vnd.fpx', 'Reference':'[Marc_Douglas_Spencer]'}
				,{'Name':'vnd.fst', 'Template':'image/vnd.fst', 'Reference':'[Arild_Fuldseth]'}
				,{'Name':'vnd.fujixerox.edmics-mmr', 'Template':'image/vnd.fujixerox.edmics-mmr', 'Reference':'[Masanori_Onda]'}
				,{'Name':'vnd.fujixerox.edmics-rlc', 'Template':'image/vnd.fujixerox.edmics-rlc', 'Reference':'[Masanori_Onda]'}
				,{'Name':'vnd.globalgraphics.pgb', 'Template':'image/vnd.globalgraphics.pgb', 'Reference':'[Martin_Bailey]'}
				,{'Name':'vnd.microsoft.icon', 'Template':'image/vnd.microsoft.icon', 'Reference':'[Simon_Butcher]'}
				,{'Name':'vnd.mix', 'Template':'image/vnd.mix', 'Reference':'[Saveen_Reddy]'}
				,{'Name':'vnd.ms-modi', 'Template':'image/vnd.ms-modi', 'Reference':'[Gregory_Vaughan]'}
				,{'Name':'vnd.mozilla.apng', 'Template':'image/vnd.mozilla.apng', 'Reference':'[Stuart_Parmenter]'}
				,{'Name':'vnd.net-fpx', 'Template':'image/vnd.net-fpx', 'Reference':'[Marc_Douglas_Spencer]'}
				,{'Name':'vnd.radiance', 'Template':'image/vnd.radiance', 'Reference':'[Randolph_Fritz][Greg_Ward]'}
				,{'Name':'vnd.sealed.png', 'Template':'image/vnd.sealed.png', 'Reference':'[David_Petersen]'}
				,{'Name':'vnd.sealedmedia.softseal.gif', 'Template':'image/vnd.sealedmedia.softseal.gif', 'Reference':'[David_Petersen]'}
				,{'Name':'vnd.sealedmedia.softseal.jpg', 'Template':'image/vnd.sealedmedia.softseal.jpg', 'Reference':'[David_Petersen]'}
				,{'Name':'vnd.svf', 'Template':'image/vnd.svf', 'Reference':'[Jodi_Moline]'}
				,{'Name':'vnd.tencent.tap', 'Template':'image/vnd.tencent.tap', 'Reference':'[Ni_Hui]'}
				,{'Name':'vnd.valve.source.texture', 'Template':'image/vnd.valve.source.texture', 'Reference':'[Henrik_Andersson]'}
				,{'Name':'vnd.wap.wbmp', 'Template':'image/vnd.wap.wbmp', 'Reference':'[Peter_Stark]'}
				,{'Name':'vnd.xiff', 'Template':'image/vnd.xiff', 'Reference':'[Steven_Martin]'}
				,{'Name':'vnd.zbrush.pcx', 'Template':'image/vnd.zbrush.pcx', 'Reference':'[Chris_Charabaruk]'}
				,{'Name':'wmf', 'Template':'image/wmf', 'Reference':'[RFC7903]'}
				,{'Name':'x-emf - DEPRECATED in favor of image/emf', 'Template':'image/emf', 'Reference':'[RFC7903]'}
				,{'Name':'x-wmf - DEPRECATED in favor of image/wmf', 'Template':'image/wmf', 'Reference':'[RFC7903]'}
			]

		}
	,initialize:function(){
		
	}
})