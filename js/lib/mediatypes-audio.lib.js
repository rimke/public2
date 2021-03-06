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
			'audio':[
				{'Name':'1d-interleaved-parityfec', 'Template':'audio/1d-interleaved-parityfec', 'Reference':'[RFC6015]'}
				,{'Name':'32kadpcm', 'Template':'audio/32kadpcm', 'Reference':'[RFC3802][RFC2421]'}
				,{'Name':'3gpp', 'Template':'audio/3gpp', 'Reference':'[RFC3839][RFC6381]'}
				,{'Name':'3gpp2', 'Template':'audio/3gpp2', 'Reference':'[RFC4393][RFC6381]'}
				,{'Name':'aac', 'Template':'audio/aac', 'Reference':'[ISO-IEC_JTC1][Max_Neuendorf]'}
				,{'Name':'ac3', 'Template':'audio/ac3', 'Reference':'[RFC4184]'}
				,{'Name':'AMR', 'Template':'audio/AMR', 'Reference':'[RFC4867]'}
				,{'Name':'AMR-WB', 'Template':'audio/AMR-WB', 'Reference':'[RFC4867]'}
				,{'Name':'amr-wb+', 'Template':'audio/amr-wb+', 'Reference':'[RFC4352]'}
				,{'Name':'aptx', 'Template':'audio/aptx', 'Reference':'[RFC7310]'}
				,{'Name':'asc', 'Template':'audio/asc', 'Reference':'[RFC6295]'}
				,{'Name':'ATRAC-ADVANCED-LOSSLESS', 'Template':'audio/ATRAC-ADVANCED-LOSSLESS', 'Reference':'[RFC5584]'}
				,{'Name':'ATRAC-X', 'Template':'audio/ATRAC-X', 'Reference':'[RFC5584]'}
				,{'Name':'ATRAC3', 'Template':'audio/ATRAC3', 'Reference':'[RFC5584]'}
				,{'Name':'basic', 'Template':'audio/basic', 'Reference':'[RFC2045][RFC2046]'}
				,{'Name':'BV16', 'Template':'audio/BV16', 'Reference':'[RFC4298]'}
				,{'Name':'BV32', 'Template':'audio/BV32', 'Reference':'[RFC4298]'}
				,{'Name':'clearmode', 'Template':'audio/clearmode', 'Reference':'[RFC4040]'}
				,{'Name':'CN', 'Template':'audio/CN', 'Reference':'[RFC3389]'}
				,{'Name':'DAT12', 'Template':'audio/DAT12', 'Reference':'[RFC3190]'}
				,{'Name':'dls', 'Template':'audio/dls', 'Reference':'[RFC4613]'}
				,{'Name':'dsr-es201108', 'Template':'audio/dsr-es201108', 'Reference':'[RFC3557]'}
				,{'Name':'dsr-es202050', 'Template':'audio/dsr-es202050', 'Reference':'[RFC4060]'}
				,{'Name':'dsr-es202211', 'Template':'audio/dsr-es202211', 'Reference':'[RFC4060]'}
				,{'Name':'dsr-es202212', 'Template':'audio/dsr-es202212', 'Reference':'[RFC4060]'}
				,{'Name':'DV', 'Template':'audio/DV', 'Reference':'[RFC6469]'}
				,{'Name':'DVI4', 'Template':'audio/DVI4', 'Reference':'[RFC4856]'}
				,{'Name':'eac3', 'Template':'audio/eac3', 'Reference':'[RFC4598]'}
				,{'Name':'encaprtp', 'Template':'audio/encaprtp', 'Reference':'[RFC6849]'}
				,{'Name':'EVRC', 'Template':'audio/EVRC', 'Reference':'[RFC4788]'}
				,{'Name':'EVRC-QCP', 'Template':'audio/EVRC-QCP', 'Reference':'[RFC3625]'}
				,{'Name':'EVRC0', 'Template':'audio/EVRC0', 'Reference':'[RFC4788]'}
				,{'Name':'EVRC1', 'Template':'audio/EVRC1', 'Reference':'[RFC4788]'}
				,{'Name':'EVRCB', 'Template':'audio/EVRCB', 'Reference':'[RFC5188]'}
				,{'Name':'EVRCB0', 'Template':'audio/EVRCB0', 'Reference':'[RFC5188]'}
				,{'Name':'EVRCB1', 'Template':'audio/EVRCB1', 'Reference':'[RFC4788]'}
				,{'Name':'EVRCNW', 'Template':'audio/EVRCNW', 'Reference':'[RFC6884]'}
				,{'Name':'EVRCNW0', 'Template':'audio/EVRCNW0', 'Reference':'[RFC6884]'}
				,{'Name':'EVRCNW1', 'Template':'audio/EVRCNW1', 'Reference':'[RFC6884]'}
				,{'Name':'EVRCWB', 'Template':'audio/EVRCWB', 'Reference':'[RFC5188]'}
				,{'Name':'EVRCWB0', 'Template':'audio/EVRCWB0', 'Reference':'[RFC5188]'}
				,{'Name':'EVRCWB1', 'Template':'audio/EVRCWB1', 'Reference':'[RFC5188]'}
				,{'Name':'EVS', 'Template':'audio/EVS', 'Reference':'[_3GPP][Kyunghun_Jung]'}
				,{'Name':'example', 'Template':'audio/example', 'Reference':'[RFC4735]'}
				,{'Name':'fwdred', 'Template':'audio/fwdred', 'Reference':'[RFC6354]'}
				,{'Name':'G711-0', 'Template':'audio/G711-0', 'Reference':'[RFC7655]'}
				,{'Name':'G719', 'Template':'audio/G719', 'Reference':'[RFC5404][RFC Errata 3245]'}
				,{'Name':'G7221', 'Template':'audio/G7221', 'Reference':'[RFC5577]'}
				,{'Name':'G722', 'Template':'audio/G722', 'Reference':'[RFC4856]'}
				,{'Name':'G723', 'Template':'audio/G723', 'Reference':'[RFC4856]'}
				,{'Name':'G726-16', 'Template':'audio/G726-16', 'Reference':'[RFC4856]'}
				,{'Name':'G726-24', 'Template':'audio/G726-24', 'Reference':'[RFC4856]'}
				,{'Name':'G726-32', 'Template':'audio/G726-32', 'Reference':'[RFC4856]'}
				,{'Name':'G726-40', 'Template':'audio/G726-40', 'Reference':'[RFC4856]'}
				,{'Name':'G728', 'Template':'audio/G728', 'Reference':'[RFC4856]'}
				,{'Name':'G729', 'Template':'audio/G729', 'Reference':'[RFC4856]'}
				,{'Name':'G7291', 'Template':'', 'Reference':'[RFC4749][RFC5459]'}
				,{'Name':'G729D', 'Template':'audio/G729D', 'Reference':'[RFC4856]'}
				,{'Name':'G729E', 'Template':'audio/G729E', 'Reference':'[RFC4856]'}
				,{'Name':'GSM', 'Template':'audio/GSM', 'Reference':'[RFC4856]'}
				,{'Name':'GSM-EFR', 'Template':'audio/GSM-EFR', 'Reference':'[RFC4856]'}
				,{'Name':'GSM-HR-08', 'Template':'audio/GSM-HR-08', 'Reference':'[RFC5993]'}
				,{'Name':'iLBC', 'Template':'audio/iLBC', 'Reference':'[RFC3952]'}
				,{'Name':'ip-mr_v2.5', 'Template':'audio/ip-mr_v2.5', 'Reference':'[RFC6262]'}
				,{'Name':'L8', 'Template':'audio/L8', 'Reference':'[RFC4856]'}
				,{'Name':'L16', 'Template':'audio/L16', 'Reference':'[RFC4856]'}
				,{'Name':'L20', 'Template':'audio/L20', 'Reference':'[RFC3190]'}
				,{'Name':'L24', 'Template':'audio/L24', 'Reference':'[RFC3190]'}
				,{'Name':'LPC', 'Template':'audio/LPC', 'Reference':'[RFC4856]'}
				,{'Name':'MELP', 'Template':'audio/MELP', 'Reference':'[RFC8130]'}
				,{'Name':'MELP600', 'Template':'audio/MELP600', 'Reference':'[RFC8130]'}
				,{'Name':'MELP1200', 'Template':'audio/MELP1200', 'Reference':'[RFC8130]'}
				,{'Name':'MELP2400', 'Template':'audio/MELP2400', 'Reference':'[RFC8130]'}
				,{'Name':'mobile-xmf', 'Template':'audio/mobile-xmf', 'Reference':'[RFC4723]'}
				,{'Name':'MPA', 'Template':'audio/MPA', 'Reference':'[RFC3555]'}
				,{'Name':'mp4', 'Template':'audio/mp4', 'Reference':'[RFC4337][RFC6381]'}
				,{'Name':'MP4A-LATM', 'Template':'audio/MP4A-LATM', 'Reference':'[RFC6416]'}
				,{'Name':'mpa-robust', 'Template':'audio/mpa-robust', 'Reference':'[RFC5219]'}
				,{'Name':'mpeg', 'Template':'audio/mpeg', 'Reference':'[RFC3003]'}
				,{'Name':'mpeg4-generic', 'Template':'audio/mpeg4-generic', 'Reference':'[RFC3640][RFC5691][RFC6295]'}
				,{'Name':'ogg', 'Template':'audio/ogg', 'Reference':'[RFC5334][RFC7845]'}
				,{'Name':'opus', 'Template':'audio/opus', 'Reference':'[RFC7587]'}
				,{'Name':'parityfec', 'Template':'', 'Reference':'[RFC5109]'}
				,{'Name':'PCMA', 'Template':'audio/PCMA', 'Reference':'[RFC4856]'}
				,{'Name':'PCMA-WB', 'Template':'audio/PCMA-WB', 'Reference':'[RFC5391]'}
				,{'Name':'PCMU', 'Template':'audio/PCMU', 'Reference':'[RFC4856]'}
				,{'Name':'PCMU-WB', 'Template':'audio/PCMU-WB', 'Reference':'[RFC5391]'}
				,{'Name':'prs.sid', 'Template':'audio/prs.sid', 'Reference':'[Linus_Walleij]'}
				,{'Name':'QCELP', 'Template':'', 'Reference':'[RFC3555][RFC3625]'}
				,{'Name':'raptorfec', 'Template':'audio/raptorfec', 'Reference':'[RFC6682]'}
				,{'Name':'RED', 'Template':'audio/RED', 'Reference':'[RFC3555]'}
				,{'Name':'rtp-enc-aescm128', 'Template':'audio/rtp-enc-aescm128', 'Reference':'[_3GPP]'}
				,{'Name':'rtploopback', 'Template':'audio/rtploopback', 'Reference':'[RFC6849]'}
				,{'Name':'rtp-midi', 'Template':'audio/rtp-midi', 'Reference':'[RFC6295]'}
				,{'Name':'rtx', 'Template':'audio/rtx', 'Reference':'[RFC4588]'}
				,{'Name':'SMV', 'Template':'audio/SMV', 'Reference':'[RFC3558]'}
				,{'Name':'SMV0', 'Template':'audio/SMV0', 'Reference':'[RFC3558]'}
				,{'Name':'SMV-QCP', 'Template':'audio/SMV-QCP', 'Reference':'[RFC3625]'}
				,{'Name':'sp-midi', 'Template':'audio/sp-midi', 'Reference':'[Timo_Kosonen][Tom_White]'}
				,{'Name':'speex', 'Template':'audio/speex', 'Reference':'[RFC5574]'}
				,{'Name':'t140c', 'Template':'audio/t140c', 'Reference':'[RFC4351]'}
				,{'Name':'t38', 'Template':'audio/t38', 'Reference':'[RFC4612]'}
				,{'Name':'telephone-event', 'Template':'audio/telephone-event', 'Reference':'[RFC4733]'}
				,{'Name':'tone', 'Template':'audio/tone', 'Reference':'[RFC4733]'}
				,{'Name':'UEMCLIP', 'Template':'audio/UEMCLIP', 'Reference':'[RFC5686]'}
				,{'Name':'ulpfec', 'Template':'audio/ulpfec', 'Reference':'[RFC5109]'}
				,{'Name':'usac', 'Template':'audio/usac', 'Reference':'[ISO-IEC_JTC1][Max_Neuendorf]'}
				,{'Name':'VDVI', 'Template':'audio/VDVI', 'Reference':'[RFC4856]'}
				,{'Name':'VMR-WB', 'Template':'audio/VMR-WB', 'Reference':'[RFC4348][RFC4424]'}
				,{'Name':'vnd.3gpp.iufp', 'Template':'audio/vnd.3gpp.iufp', 'Reference':'[Thomas_Belling]'}
				,{'Name':'vnd.4SB', 'Template':'audio/vnd.4SB', 'Reference':'[Serge_De_Jaham]'}
				,{'Name':'vnd.audiokoz', 'Template':'audio/vnd.audiokoz', 'Reference':'[Vicki_DeBarros]'}
				,{'Name':'vnd.CELP', 'Template':'audio/vnd.CELP', 'Reference':'[Serge_De_Jaham]'}
				,{'Name':'vnd.cisco.nse', 'Template':'audio/vnd.cisco.nse', 'Reference':'[Rajesh_Kumar]'}
				,{'Name':'vnd.cmles.radio-events', 'Template':'audio/vnd.cmles.radio-events', 'Reference':'[Jean-Philippe_Goulet]'}
				,{'Name':'vnd.cns.anp1', 'Template':'audio/vnd.cns.anp1', 'Reference':'[Ann_McLaughlin]'}
				,{'Name':'vnd.cns.inf1', 'Template':'audio/vnd.cns.inf1', 'Reference':'[Ann_McLaughlin]'}
				,{'Name':'vnd.dece.audio', 'Template':'audio/vnd.dece.audio', 'Reference':'[Michael_A_Dolan]'}
				,{'Name':'vnd.digital-winds', 'Template':'audio/vnd.digital-winds', 'Reference':'[Armands_Strazds]'}
				,{'Name':'vnd.dlna.adts', 'Template':'audio/vnd.dlna.adts', 'Reference':'[Edwin_Heredia]'}
				,{'Name':'vnd.dolby.heaac.1', 'Template':'audio/vnd.dolby.heaac.1', 'Reference':'[Steve_Hattersley]'}
				,{'Name':'vnd.dolby.heaac.2', 'Template':'audio/vnd.dolby.heaac.2', 'Reference':'[Steve_Hattersley]'}
				,{'Name':'vnd.dolby.mlp', 'Template':'audio/vnd.dolby.mlp', 'Reference':'[Mike_Ward]'}
				,{'Name':'vnd.dolby.mps', 'Template':'audio/vnd.dolby.mps', 'Reference':'[Steve_Hattersley]'}
				,{'Name':'vnd.dolby.pl2', 'Template':'audio/vnd.dolby.pl2', 'Reference':'[Steve_Hattersley]'}
				,{'Name':'vnd.dolby.pl2x', 'Template':'audio/vnd.dolby.pl2x', 'Reference':'[Steve_Hattersley]'}
				,{'Name':'vnd.dolby.pl2z', 'Template':'audio/vnd.dolby.pl2z', 'Reference':'[Steve_Hattersley]'}
				,{'Name':'vnd.dolby.pulse.1', 'Template':'audio/vnd.dolby.pulse.1', 'Reference':'[Steve_Hattersley]'}
				,{'Name':'vnd.dra', 'Template':'audio/vnd.dra', 'Reference':'[Jiang_Tian]'}
				,{'Name':'vnd.dts', 'Template':'audio/vnd.dts', 'Reference':'[William_Zou]'}
				,{'Name':'vnd.dts.hd', 'Template':'audio/vnd.dts.hd', 'Reference':'[William_Zou]'}
				,{'Name':'vnd.dvb.file', 'Template':'audio/vnd.dvb.file', 'Reference':'[Peter_Siebert]'}
				,{'Name':'vnd.everad.plj', 'Template':'audio/vnd.everad.plj', 'Reference':'[Shay_Cicelsky]'}
				,{'Name':'vnd.hns.audio', 'Template':'audio/vnd.hns.audio', 'Reference':'[Swaminathan]'}
				,{'Name':'vnd.lucent.voice', 'Template':'audio/vnd.lucent.voice', 'Reference':'[Greg_Vaudreuil]'}
				,{'Name':'vnd.ms-playready.media.pya', 'Template':'audio/vnd.ms-playready.media.pya', 'Reference':'[Steve_DiAcetis]'}
				,{'Name':'vnd.nokia.mobile-xmf', 'Template':'audio/vnd.nokia.mobile-xmf', 'Reference':'[Nokia]'}
				,{'Name':'vnd.nortel.vbk', 'Template':'audio/vnd.nortel.vbk', 'Reference':'[Glenn_Parsons]'}
				,{'Name':'vnd.nuera.ecelp4800', 'Template':'audio/vnd.nuera.ecelp4800', 'Reference':'[Michael_Fox]'}
				,{'Name':'vnd.nuera.ecelp7470', 'Template':'audio/vnd.nuera.ecelp7470', 'Reference':'[Michael_Fox]'}
				,{'Name':'vnd.nuera.ecelp9600', 'Template':'audio/vnd.nuera.ecelp9600', 'Reference':'[Michael_Fox]'}
				,{'Name':'vnd.octel.sbc', 'Template':'audio/vnd.octel.sbc', 'Reference':'[Greg_Vaudreuil]'}
				,{'Name':'vnd.presonus.multitrack', 'Template':'audio/vnd.presonus.multitrack', 'Reference':'[Matthias_Juwan]'}
				,{'Name':'vnd.qcelp - DEPRECATED in favor of audio/qcelp', 'Template':'audio/vnd.qcelp', 'Reference':'[RFC3625]'}
				,{'Name':'vnd.rhetorex.32kadpcm', 'Template':'audio/vnd.rhetorex.32kadpcm', 'Reference':'[Greg_Vaudreuil]'}
				,{'Name':'vnd.rip', 'Template':'audio/vnd.rip', 'Reference':'[Martin_Dawe]'}
				,{'Name':'vnd.sealedmedia.softseal.mpeg', 'Template':'audio/vnd.sealedmedia.softseal.mpeg', 'Reference':'[David_Petersen]'}
				,{'Name':'vnd.vmx.cvsd', 'Template':'audio/vnd.vmx.cvsd', 'Reference':'[Greg_Vaudreuil]'}
				,{'Name':'vorbis', 'Template':'audio/vorbis', 'Reference':'[RFC5215]'}
				,{'Name':'vorbis-config', 'Template':'audio/vorbis-config', 'Reference':'[RFC5215]'}
			]

		}
	,initialize:function(){
		
	}
})