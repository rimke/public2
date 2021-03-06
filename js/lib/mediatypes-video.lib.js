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
			'video':[
				{'Name':'1d-interleaved-parityfec', 'Template':'video/1d-interleaved-parityfec', 'Reference':'[RFC6015]'}
				,{'Name':'3gpp', 'Template':'video/3gpp', 'Reference':'[RFC3839][RFC6381]'}
				,{'Name':'3gpp2', 'Template':'video/3gpp2', 'Reference':'[RFC4393][RFC6381]'}
				,{'Name':'3gpp-tt', 'Template':'video/3gpp-tt', 'Reference':'[RFC4396]'}
				,{'Name':'BMPEG', 'Template':'video/BMPEG', 'Reference':'[RFC3555]'}
				,{'Name':'BT656', 'Template':'video/BT656', 'Reference':'[RFC3555]'}
				,{'Name':'CelB', 'Template':'video/CelB', 'Reference':'[RFC3555]'}
				,{'Name':'DV', 'Template':'video/DV', 'Reference':'[RFC6469]'}
				,{'Name':'encaprtp', 'Template':'video/encaprtp', 'Reference':'[RFC6849]'}
				,{'Name':'example', 'Template':'video/example', 'Reference':'[RFC4735]'}
				,{'Name':'H261', 'Template':'video/H261', 'Reference':'[RFC4587]'}
				,{'Name':'H263', 'Template':'video/H263', 'Reference':'[RFC3555]'}
				,{'Name':'H263-1998', 'Template':'video/H263-1998', 'Reference':'[RFC4629]'}
				,{'Name':'H263-2000', 'Template':'video/H263-2000', 'Reference':'[RFC4629]'}
				,{'Name':'H264', 'Template':'video/H264', 'Reference':'[RFC6184]'}
				,{'Name':'H264-RCDO', 'Template':'video/H264-RCDO', 'Reference':'[RFC6185]'}
				,{'Name':'H264-SVC', 'Template':'video/H264-SVC', 'Reference':'[RFC6190]'}
				,{'Name':'H265', 'Template':'video/H265', 'Reference':'[RFC7798]'}
				,{'Name':'iso.segment', 'Template':'video/iso.segment', 'Reference':'[David_Singer][ISO-IEC_JTC1]'}
				,{'Name':'JPEG', 'Template':'video/JPEG', 'Reference':'[RFC3555]'}
				,{'Name':'jpeg2000', 'Template':'video/jpeg2000', 'Reference':'[RFC5371][RFC5372]'}
				,{'Name':'mj2', 'Template':'video/mj2', 'Reference':'[RFC3745]'}
				,{'Name':'MP1S', 'Template':'video/MP1S', 'Reference':'[RFC3555]'}
				,{'Name':'MP2P', 'Template':'video/MP2P', 'Reference':'[RFC3555]'}
				,{'Name':'MP2T', 'Template':'video/MP2T', 'Reference':'[RFC3555]'}
				,{'Name':'mp4', 'Template':'video/mp4', 'Reference':'[RFC4337][RFC6381]'}
				,{'Name':'MP4V-ES', 'Template':'video/MP4V-ES', 'Reference':'[RFC6416]'}
				,{'Name':'MPV', 'Template':'video/MPV', 'Reference':'[RFC3555]'}
				,{'Name':'mpeg', 'Template':'', 'Reference':'[RFC2045][RFC2046]'}
				,{'Name':'mpeg4-generic', 'Template':'video/mpeg4-generic', 'Reference':'[RFC3640]'}
				,{'Name':'nv', 'Template':'video/nv', 'Reference':'[RFC4856]'}
				,{'Name':'ogg', 'Template':'video/ogg', 'Reference':'[RFC5334][RFC7845]'}
				,{'Name':'parityfec', 'Template':'', 'Reference':'[RFC5109]'}
				,{'Name':'pointer', 'Template':'video/pointer', 'Reference':'[RFC2862]'}
				,{'Name':'quicktime', 'Template':'video/quicktime', 'Reference':'[RFC6381][Paul_Lindner]'}
				,{'Name':'raptorfec', 'Template':'video/raptorfec', 'Reference':'[RFC6682]'}
				,{'Name':'raw', 'Template':'', 'Reference':'[RFC4175]'}
				,{'Name':'rtp-enc-aescm128', 'Template':'video/rtp-enc-aescm128', 'Reference':'[_3GPP]'}
				,{'Name':'rtploopback', 'Template':'video/rtploopback', 'Reference':'[RFC6849]'}
				,{'Name':'rtx', 'Template':'video/rtx', 'Reference':'[RFC4588]'}
				,{'Name':'smpte291', 'Template':'video/smpte291', 'Reference':'[RFC8331]'}
				,{'Name':'SMPTE292M', 'Template':'video/SMPTE292M', 'Reference':'[RFC3497]'}
				,{'Name':'ulpfec', 'Template':'video/ulpfec', 'Reference':'[RFC5109]'}
				,{'Name':'vc1', 'Template':'video/vc1', 'Reference':'[RFC4425]'}
				,{'Name':'vc2', 'Template':'video/vc2', 'Reference':'[RFC-ietf-payload-rtp-vc2hq-08]'}
				,{'Name':'vnd.CCTV', 'Template':'video/vnd.CCTV', 'Reference':'[Frank_Rottmann]'}
				,{'Name':'vnd.dece.hd', 'Template':'video/vnd.dece.hd', 'Reference':'[Michael_A_Dolan]'}
				,{'Name':'vnd.dece.mobile', 'Template':'video/vnd.dece.mobile', 'Reference':'[Michael_A_Dolan]'}
				,{'Name':'vnd.dece.mp4', 'Template':'video/vnd.dece.mp4', 'Reference':'[Michael_A_Dolan]'}
				,{'Name':'vnd.dece.pd', 'Template':'video/vnd.dece.pd', 'Reference':'[Michael_A_Dolan]'}
				,{'Name':'vnd.dece.sd', 'Template':'video/vnd.dece.sd', 'Reference':'[Michael_A_Dolan]'}
				,{'Name':'vnd.dece.video', 'Template':'video/vnd.dece.video', 'Reference':'[Michael_A_Dolan]'}
				,{'Name':'vnd.directv.mpeg', 'Template':'video/vnd.directv.mpeg', 'Reference':'[Nathan_Zerbe]'}
				,{'Name':'vnd.directv.mpeg-tts', 'Template':'video/vnd.directv.mpeg-tts', 'Reference':'[Nathan_Zerbe]'}
				,{'Name':'vnd.dlna.mpeg-tts', 'Template':'video/vnd.dlna.mpeg-tts', 'Reference':'[Edwin_Heredia]'}
				,{'Name':'vnd.dvb.file', 'Template':'video/vnd.dvb.file', 'Reference':'[Peter_Siebert][Kevin_Murray]'}
				,{'Name':'vnd.fvt', 'Template':'video/vnd.fvt', 'Reference':'[Arild_Fuldseth]'}
				,{'Name':'vnd.hns.video', 'Template':'video/vnd.hns.video', 'Reference':'[Swaminathan]'}
				,{'Name':'vnd.iptvforum.1dparityfec-1010', 'Template':'video/vnd.iptvforum.1dparityfec-1010', 'Reference':'[Shuji_Nakamura]'}
				,{'Name':'vnd.iptvforum.1dparityfec-2005', 'Template':'video/vnd.iptvforum.1dparityfec-2005', 'Reference':'[Shuji_Nakamura]'}
				,{'Name':'vnd.iptvforum.2dparityfec-1010', 'Template':'video/vnd.iptvforum.2dparityfec-1010', 'Reference':'[Shuji_Nakamura]'}
				,{'Name':'vnd.iptvforum.2dparityfec-2005', 'Template':'video/vnd.iptvforum.2dparityfec-2005', 'Reference':'[Shuji_Nakamura]'}
				,{'Name':'vnd.iptvforum.ttsavc', 'Template':'video/vnd.iptvforum.ttsavc', 'Reference':'[Shuji_Nakamura]'}
				,{'Name':'vnd.iptvforum.ttsmpeg2', 'Template':'video/vnd.iptvforum.ttsmpeg2', 'Reference':'[Shuji_Nakamura]'}
				,{'Name':'vnd.motorola.video', 'Template':'video/vnd.motorola.video', 'Reference':'[Tom_McGinty]'}
				,{'Name':'vnd.motorola.videop', 'Template':'video/vnd.motorola.videop', 'Reference':'[Tom_McGinty]'}
				,{'Name':'vnd.mpegurl', 'Template':'video/vnd.mpegurl', 'Reference':'[Heiko_Recktenwald]'}
				,{'Name':'vnd.ms-playready.media.pyv', 'Template':'video/vnd.ms-playready.media.pyv', 'Reference':'[Steve_DiAcetis]'}
				,{'Name':'vnd.nokia.interleaved-multimedia', 'Template':'video/vnd.nokia.interleaved-multimedia', 'Reference':'[Petteri_Kangaslampi]'}
				,{'Name':'vnd.nokia.mp4vr', 'Template':'video/vnd.nokia.mp4vr', 'Reference':'[Miska_M._Hannuksela]'}
				,{'Name':'vnd.nokia.videovoip', 'Template':'video/vnd.nokia.videovoip', 'Reference':'[Nokia]'}
				,{'Name':'vnd.objectvideo', 'Template':'video/vnd.objectvideo', 'Reference':'[John_Clark]'}
				,{'Name':'vnd.radgamettools.bink', 'Template':'video/vnd.radgamettools.bink', 'Reference':'[Henrik_Andersson]'}
				,{'Name':'vnd.radgamettools.smacker', 'Template':'video/vnd.radgamettools.smacker', 'Reference':'[Henrik_Andersson]'}
				,{'Name':'vnd.sealed.mpeg1', 'Template':'video/vnd.sealed.mpeg1', 'Reference':'[David_Petersen]'}
				,{'Name':'vnd.sealed.mpeg4', 'Template':'video/vnd.sealed.mpeg4', 'Reference':'[David_Petersen]'}
				,{'Name':'vnd.sealed.swf', 'Template':'video/vnd.sealed.swf', 'Reference':'[David_Petersen]'}
				,{'Name':'vnd.sealedmedia.softseal.mov', 'Template':'video/vnd.sealedmedia.softseal.mov', 'Reference':'[David_Petersen]'}
				,{'Name':'vnd.uvvu.mp4', 'Template':'video/vnd.uvvu.mp4', 'Reference':'[Michael_A_Dolan]'}
				,{'Name':'vnd.vivo', 'Template':'video/vnd.vivo', 'Reference':'[John_Wolfe]'}
				,{'Name':'VP8', 'Template':'video/VP8', 'Reference':'[RFC7741]'}
			]

		}
	,initialize:function(){
		
	}
})