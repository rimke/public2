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
			'model':[
				{'Name':'3mf', 'Template':'model/3mf', 'Reference':'[http://www.3mf.io/specification][_3MF][Michael_Sweet]'}
				,{'Name':'example', 'Template':'model/example', 'Reference':'[RFC4735]'}
				,{'Name':'gltf-binary', 'Template':'model/gltf-binary', 'Reference':'[Khronos][Saurabh_Bhatia]'}
				,{'Name':'gltf+json', 'Template':'model/gltf+json', 'Reference':'[Khronos][Uli_Klumpp]'}
				,{'Name':'iges', 'Template':'model/iges', 'Reference':'[Curtis_Parks]'}
				,{'Name':'mesh', 'Template':'', 'Reference':'[RFC2077]'}
				,{'Name':'stl', 'Template':'model/stl', 'Reference':'[DICOM_Standards_Committee][Lisa_Spellman]'}
				,{'Name':'vnd.collada+xml', 'Template':'model/vnd.collada+xml', 'Reference':'[James_Riordon]'}
				,{'Name':'vnd.dwf', 'Template':'model/vnd.dwf', 'Reference':'[Jason_Pratt]'}
				,{'Name':'vnd.flatland.3dml', 'Template':'model/vnd.flatland.3dml', 'Reference':'[Michael_Powers]'}
				,{'Name':'vnd.gdl', 'Template':'model/vnd.gdl', 'Reference':'[Attila_Babits]'}
				,{'Name':'vnd.gs-gdl', 'Template':'model/vnd.gs-gdl', 'Reference':'[Attila_Babits]'}
				,{'Name':'vnd.gtw', 'Template':'model/vnd.gtw', 'Reference':'[Yutaka_Ozaki]'}
				,{'Name':'vnd.moml+xml', 'Template':'model/vnd.moml+xml', 'Reference':'[Christopher_Brooks]'}
				,{'Name':'vnd.mts', 'Template':'model/vnd.mts', 'Reference':'[Boris_Rabinovitch]'}
				,{'Name':'vnd.opengex', 'Template':'model/vnd.opengex', 'Reference':'[Eric_Lengyel]'}
				,{'Name':'vnd.parasolid.transmit.binary', 'Template':'model/vnd.parasolid.transmit.binary', 'Reference':'[Parasolid]'}
				,{'Name':'vnd.parasolid.transmit.text', 'Template':'model/vnd.parasolid.transmit.text', 'Reference':'[Parasolid]'}
				,{'Name':'vnd.rosette.annotated-data-model', 'Template':'model/vnd.rosette.annotated-data-model', 'Reference':'[Benson_Margulies]'}
				,{'Name':'vnd.usdz+zip', 'Template':'model/vnd.usdz+zip', 'Reference':'[Sebastian_Grassia]'}
				,{'Name':'vnd.valve.source.compiled-map', 'Template':'model/vnd.valve.source.compiled-map', 'Reference':'[Henrik_Andersson]'}
				,{'Name':'vnd.vtu', 'Template':'model/vnd.vtu', 'Reference':'[Boris_Rabinovitch]'}
				,{'Name':'vrml', 'Template':'', 'Reference':'[RFC2077]'}
				,{'Name':'x3d-vrml', 'Template':'model/x3d-vrml', 'Reference':'[Web3D][Web3D_X3D]'}
				,{'Name':'x3d+fastinfoset', 'Template':'model/x3d+fastinfoset', 'Reference':'[Web3D_X3D]'}
				,{'Name':'x3d+xml', 'Template':'model/x3d+xml', 'Reference':'[Web3D][Web3D_X3D]'}
			]

		}
	,initialize:function(){
		
	}
})