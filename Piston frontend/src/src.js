/**
 * marked v15.0.12 - a markdown parser
 * Copyright (c) 2011-2025, Christopher Jeffrey. (MIT Licensed)
 * https://github.com/markedjs/marked
 */
(function(g,f){if(typeof exports=="object"&&typeof module<"u"){module.exports=f()}else if("function"==typeof define && define.amd){define("marked",f)}else {g["marked"]=f()}}(typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : this,function(){var exports={};var __exports=exports;var module={exports};
"use strict";var H=Object.defineProperty;var be=Object.getOwnPropertyDescriptor;var Te=Object.getOwnPropertyNames;var we=Object.prototype.hasOwnProperty;var ye=(l,e)=>{for(var t in e)H(l,t,{get:e[t],enumerable:!0})},Re=(l,e,t,n)=>{if(e&&typeof e=="object"||typeof e=="function")for(let s of Te(e))!we.call(l,s)&&s!==t&&H(l,s,{get:()=>e[s],enumerable:!(n=be(e,s))||n.enumerable});return l};var Se=l=>Re(H({},"__esModule",{value:!0}),l);var kt={};ye(kt,{Hooks:()=>L,Lexer:()=>x,Marked:()=>E,Parser:()=>b,Renderer:()=>$,TextRenderer:()=>_,Tokenizer:()=>S,defaults:()=>w,getDefaults:()=>z,lexer:()=>ht,marked:()=>k,options:()=>it,parse:()=>pt,parseInline:()=>ct,parser:()=>ut,setOptions:()=>ot,use:()=>lt,walkTokens:()=>at});module.exports=Se(kt);function z(){return{async:!1,breaks:!1,extensions:null,gfm:!0,hooks:null,pedantic:!1,renderer:null,silent:!1,tokenizer:null,walkTokens:null}}var w=z();function N(l){w=l}var I={exec:()=>null};function h(l,e=""){let t=typeof l=="string"?l:l.source,n={replace:(s,i)=>{let r=typeof i=="string"?i:i.source;return r=r.replace(m.caret,"$1"),t=t.replace(s,r),n},getRegex:()=>new RegExp(t,e)};return n}var m={codeRemoveIndent:/^(?: {1,4}| {0,3}\t)/gm,outputLinkReplace:/\\([\[\]])/g,indentCodeCompensation:/^(\s+)(?:```)/,beginningSpace:/^\s+/,endingHash:/#$/,startingSpaceChar:/^ /,endingSpaceChar:/ $/,nonSpaceChar:/[^ ]/,newLineCharGlobal:/\n/g,tabCharGlobal:/\t/g,multipleSpaceGlobal:/\s+/g,blankLine:/^[ \t]*$/,doubleBlankLine:/\n[ \t]*\n[ \t]*$/,blockquoteStart:/^ {0,3}>/,blockquoteSetextReplace:/\n {0,3}((?:=+|-+) *)(?=\n|$)/g,blockquoteSetextReplace2:/^ {0,3}>[ \t]?/gm,listReplaceTabs:/^\t+/,listReplaceNesting:/^ {1,4}(?=( {4})*[^ ])/g,listIsTask:/^\[[ xX]\] /,listReplaceTask:/^\[[ xX]\] +/,anyLine:/\n.*\n/,hrefBrackets:/^<(.*)>$/,tableDelimiter:/[:|]/,tableAlignChars:/^\||\| *$/g,tableRowBlankLine:/\n[ \t]*$/,tableAlignRight:/^ *-+: *$/,tableAlignCenter:/^ *:-+: *$/,tableAlignLeft:/^ *:-+ *$/,startATag:/^<a /i,endATag:/^<\/a>/i,startPreScriptTag:/^<(pre|code|kbd|script)(\s|>)/i,endPreScriptTag:/^<\/(pre|code|kbd|script)(\s|>)/i,startAngleBracket:/^</,endAngleBracket:/>$/,pedanticHrefTitle:/^([^'"]*[^\s])\s+(['"])(.*)\2/,unicodeAlphaNumeric:/[\p{L}\p{N}]/u,escapeTest:/[&<>"']/,escapeReplace:/[&<>"']/g,escapeTestNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/,escapeReplaceNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/g,unescapeTest:/&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/ig,caret:/(^|[^\[])\^/g,percentDecode:/%25/g,findPipe:/\|/g,splitPipe:/ \|/,slashPipe:/\\\|/g,carriageReturn:/\r\n|\r/g,spaceLine:/^ +$/gm,notSpaceStart:/^\S*/,endingNewline:/\n$/,listItemRegex:l=>new RegExp(`^( {0,3}${l})((?:[	 ][^\\n]*)?(?:\\n|$))`),nextBulletRegex:l=>new RegExp(`^ {0,${Math.min(3,l-1)}}(?:[*+-]|\\d{1,9}[.)])((?:[ 	][^\\n]*)?(?:\\n|$))`),hrRegex:l=>new RegExp(`^ {0,${Math.min(3,l-1)}}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)`),fencesBeginRegex:l=>new RegExp(`^ {0,${Math.min(3,l-1)}}(?:\`\`\`|~~~)`),headingBeginRegex:l=>new RegExp(`^ {0,${Math.min(3,l-1)}}#`),htmlBeginRegex:l=>new RegExp(`^ {0,${Math.min(3,l-1)}}<(?:[a-z].*>|!--)`,"i")},$e=/^(?:[ \t]*(?:\n|$))+/,_e=/^((?: {4}| {0,3}\t)[^\n]+(?:\n(?:[ \t]*(?:\n|$))*)?)+/,Le=/^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/,O=/^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/,ze=/^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/,F=/(?:[*+-]|\d{1,9}[.)])/,ie=/^(?!bull |blockCode|fences|blockquote|heading|html|table)((?:.|\n(?!\s*?\n|bull |blockCode|fences|blockquote|heading|html|table))+?)\n {0,3}(=+|-+) *(?:\n+|$)/,oe=h(ie).replace(/bull/g,F).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/\|table/g,"").getRegex(),Me=h(ie).replace(/bull/g,F).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/table/g,/ {0,3}\|?(?:[:\- ]*\|)+[\:\- ]*\n/).getRegex(),Q=/^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/,Pe=/^[^\n]+/,U=/(?!\s*\])(?:\\.|[^\[\]\\])+/,Ae=h(/^ {0,3}\[(label)\]: *(?:\n[ \t]*)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n[ \t]*)?| *\n[ \t]*)(title))? *(?:\n+|$)/).replace("label",U).replace("title",/(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/).getRegex(),Ee=h(/^( {0,3}bull)([ \t][^\n]+?)?(?:\n|$)/).replace(/bull/g,F).getRegex(),v="address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|search|section|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul",K=/<!--(?:-?>|[\s\S]*?(?:-->|$))/,Ce=h("^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$))","i").replace("comment",K).replace("tag",v).replace("attribute",/ +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex(),le=h(Q).replace("hr",O).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("|table","").replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",v).getRegex(),Ie=h(/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/).replace("paragraph",le).getRegex(),X={blockquote:Ie,code:_e,def:Ae,fences:Le,heading:ze,hr:O,html:Ce,lheading:oe,list:Ee,newline:$e,paragraph:le,table:I,text:Pe},re=h("^ *([^\\n ].*)\\n {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)").replace("hr",O).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("blockquote"," {0,3}>").replace("code","(?: {4}| {0,3}	)[^\\n]").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",v).getRegex(),Oe={...X,lheading:Me,table:re,paragraph:h(Q).replace("hr",O).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("table",re).replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",v).getRegex()},Be={...X,html:h(`^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|'[^']*'|\\s[^'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))`).replace("comment",K).replace(/tag/g,"(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(),def:/^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,heading:/^(#{1,6})(.*)(?:\n+|$)/,fences:I,lheading:/^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/,paragraph:h(Q).replace("hr",O).replace("heading",` *#{1,6} *[^
]`).replace("lheading",oe).replace("|table","").replace("blockquote"," {0,3}>").replace("|fences","").replace("|list","").replace("|html","").replace("|tag","").getRegex()},qe=/^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/,ve=/^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/,ae=/^( {2,}|\\)\n(?!\s*$)/,De=/^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/,D=/[\p{P}\p{S}]/u,W=/[\s\p{P}\p{S}]/u,ce=/[^\s\p{P}\p{S}]/u,Ze=h(/^((?![*_])punctSpace)/,"u").replace(/punctSpace/g,W).getRegex(),pe=/(?!~)[\p{P}\p{S}]/u,Ge=/(?!~)[\s\p{P}\p{S}]/u,He=/(?:[^\s\p{P}\p{S}]|~)/u,Ne=/\[[^[\]]*?\]\((?:\\.|[^\\\(\)]|\((?:\\.|[^\\\(\)])*\))*\)|`[^`]*?`|<[^<>]*?>/g,ue=/^(?:\*+(?:((?!\*)punct)|[^\s*]))|^_+(?:((?!_)punct)|([^\s_]))/,je=h(ue,"u").replace(/punct/g,D).getRegex(),Fe=h(ue,"u").replace(/punct/g,pe).getRegex(),he="^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)punct(\\*+)(?=[\\s]|$)|notPunctSpace(\\*+)(?!\\*)(?=punctSpace|$)|(?!\\*)punctSpace(\\*+)(?=notPunctSpace)|[\\s](\\*+)(?!\\*)(?=punct)|(?!\\*)punct(\\*+)(?!\\*)(?=punct)|notPunctSpace(\\*+)(?=notPunctSpace)",Qe=h(he,"gu").replace(/notPunctSpace/g,ce).replace(/punctSpace/g,W).replace(/punct/g,D).getRegex(),Ue=h(he,"gu").replace(/notPunctSpace/g,He).replace(/punctSpace/g,Ge).replace(/punct/g,pe).getRegex(),Ke=h("^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)punct(_+)(?=[\\s]|$)|notPunctSpace(_+)(?!_)(?=punctSpace|$)|(?!_)punctSpace(_+)(?=notPunctSpace)|[\\s](_+)(?!_)(?=punct)|(?!_)punct(_+)(?!_)(?=punct)","gu").replace(/notPunctSpace/g,ce).replace(/punctSpace/g,W).replace(/punct/g,D).getRegex(),Xe=h(/\\(punct)/,"gu").replace(/punct/g,D).getRegex(),We=h(/^<(scheme:[^\s\x00-\x1f<>]*|email)>/).replace("scheme",/[a-zA-Z][a-zA-Z0-9+.-]{1,31}/).replace("email",/[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/).getRegex(),Je=h(K).replace("(?:-->|$)","-->").getRegex(),Ve=h("^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>").replace("comment",Je).replace("attribute",/\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/).getRegex(),q=/(?:\[(?:\\.|[^\[\]\\])*\]|\\.|`[^`]*`|[^\[\]\\`])*?/,Ye=h(/^!?\[(label)\]\(\s*(href)(?:(?:[ \t]*(?:\n[ \t]*)?)(title))?\s*\)/).replace("label",q).replace("href",/<(?:\\.|[^\n<>\\])+>|[^ \t\n\x00-\x1f]*/).replace("title",/"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/).getRegex(),ke=h(/^!?\[(label)\]\[(ref)\]/).replace("label",q).replace("ref",U).getRegex(),ge=h(/^!?\[(ref)\](?:\[\])?/).replace("ref",U).getRegex(),et=h("reflink|nolink(?!\\()","g").replace("reflink",ke).replace("nolink",ge).getRegex(),J={_backpedal:I,anyPunctuation:Xe,autolink:We,blockSkip:Ne,br:ae,code:ve,del:I,emStrongLDelim:je,emStrongRDelimAst:Qe,emStrongRDelimUnd:Ke,escape:qe,link:Ye,nolink:ge,punctuation:Ze,reflink:ke,reflinkSearch:et,tag:Ve,text:De,url:I},tt={...J,link:h(/^!?\[(label)\]\((.*?)\)/).replace("label",q).getRegex(),reflink:h(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label",q).getRegex()},j={...J,emStrongRDelimAst:Ue,emStrongLDelim:Fe,url:h(/^((?:ftp|https?):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/,"i").replace("email",/[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/).getRegex(),_backpedal:/(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/,del:/^(~~?)(?=[^\s~])((?:\\.|[^\\])*?(?:\\.|[^\s~\\]))\1(?=[^~]|$)/,text:/^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|https?:\/\/|ftp:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/},nt={...j,br:h(ae).replace("{2,}","*").getRegex(),text:h(j.text).replace("\\b_","\\b_| {2,}\\n").replace(/\{2,\}/g,"*").getRegex()},B={normal:X,gfm:Oe,pedantic:Be},P={normal:J,gfm:j,breaks:nt,pedantic:tt};var st={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"},fe=l=>st[l];function R(l,e){if(e){if(m.escapeTest.test(l))return l.replace(m.escapeReplace,fe)}else if(m.escapeTestNoEncode.test(l))return l.replace(m.escapeReplaceNoEncode,fe);return l}function V(l){try{l=encodeURI(l).replace(m.percentDecode,"%")}catch{return null}return l}function Y(l,e){let t=l.replace(m.findPipe,(i,r,o)=>{let a=!1,c=r;for(;--c>=0&&o[c]==="\\";)a=!a;return a?"|":" |"}),n=t.split(m.splitPipe),s=0;if(n[0].trim()||n.shift(),n.length>0&&!n.at(-1)?.trim()&&n.pop(),e)if(n.length>e)n.splice(e);else for(;n.length<e;)n.push("");for(;s<n.length;s++)n[s]=n[s].trim().replace(m.slashPipe,"|");return n}function A(l,e,t){let n=l.length;if(n===0)return"";let s=0;for(;s<n;){let i=l.charAt(n-s-1);if(i===e&&!t)s++;else if(i!==e&&t)s++;else break}return l.slice(0,n-s)}function de(l,e){if(l.indexOf(e[1])===-1)return-1;let t=0;for(let n=0;n<l.length;n++)if(l[n]==="\\")n++;else if(l[n]===e[0])t++;else if(l[n]===e[1]&&(t--,t<0))return n;return t>0?-2:-1}function me(l,e,t,n,s){let i=e.href,r=e.title||null,o=l[1].replace(s.other.outputLinkReplace,"$1");n.state.inLink=!0;let a={type:l[0].charAt(0)==="!"?"image":"link",raw:t,href:i,title:r,text:o,tokens:n.inlineTokens(o)};return n.state.inLink=!1,a}function rt(l,e,t){let n=l.match(t.other.indentCodeCompensation);if(n===null)return e;let s=n[1];return e.split(`
`).map(i=>{let r=i.match(t.other.beginningSpace);if(r===null)return i;let[o]=r;return o.length>=s.length?i.slice(s.length):i}).join(`
`)}var S=class{options;rules;lexer;constructor(e){this.options=e||w}space(e){let t=this.rules.block.newline.exec(e);if(t&&t[0].length>0)return{type:"space",raw:t[0]}}code(e){let t=this.rules.block.code.exec(e);if(t){let n=t[0].replace(this.rules.other.codeRemoveIndent,"");return{type:"code",raw:t[0],codeBlockStyle:"indented",text:this.options.pedantic?n:A(n,`
`)}}}fences(e){let t=this.rules.block.fences.exec(e);if(t){let n=t[0],s=rt(n,t[3]||"",this.rules);return{type:"code",raw:n,lang:t[2]?t[2].trim().replace(this.rules.inline.anyPunctuation,"$1"):t[2],text:s}}}heading(e){let t=this.rules.block.heading.exec(e);if(t){let n=t[2].trim();if(this.rules.other.endingHash.test(n)){let s=A(n,"#");(this.options.pedantic||!s||this.rules.other.endingSpaceChar.test(s))&&(n=s.trim())}return{type:"heading",raw:t[0],depth:t[1].length,text:n,tokens:this.lexer.inline(n)}}}hr(e){let t=this.rules.block.hr.exec(e);if(t)return{type:"hr",raw:A(t[0],`
`)}}blockquote(e){let t=this.rules.block.blockquote.exec(e);if(t){let n=A(t[0],`
`).split(`
`),s="",i="",r=[];for(;n.length>0;){let o=!1,a=[],c;for(c=0;c<n.length;c++)if(this.rules.other.blockquoteStart.test(n[c]))a.push(n[c]),o=!0;else if(!o)a.push(n[c]);else break;n=n.slice(c);let p=a.join(`
`),u=p.replace(this.rules.other.blockquoteSetextReplace,`
    $1`).replace(this.rules.other.blockquoteSetextReplace2,"");s=s?`${s}
${p}`:p,i=i?`${i}
${u}`:u;let d=this.lexer.state.top;if(this.lexer.state.top=!0,this.lexer.blockTokens(u,r,!0),this.lexer.state.top=d,n.length===0)break;let g=r.at(-1);if(g?.type==="code")break;if(g?.type==="blockquote"){let T=g,f=T.raw+`
`+n.join(`
`),y=this.blockquote(f);r[r.length-1]=y,s=s.substring(0,s.length-T.raw.length)+y.raw,i=i.substring(0,i.length-T.text.length)+y.text;break}else if(g?.type==="list"){let T=g,f=T.raw+`
`+n.join(`
`),y=this.list(f);r[r.length-1]=y,s=s.substring(0,s.length-g.raw.length)+y.raw,i=i.substring(0,i.length-T.raw.length)+y.raw,n=f.substring(r.at(-1).raw.length).split(`
`);continue}}return{type:"blockquote",raw:s,tokens:r,text:i}}}list(e){let t=this.rules.block.list.exec(e);if(t){let n=t[1].trim(),s=n.length>1,i={type:"list",raw:"",ordered:s,start:s?+n.slice(0,-1):"",loose:!1,items:[]};n=s?`\\d{1,9}\\${n.slice(-1)}`:`\\${n}`,this.options.pedantic&&(n=s?n:"[*+-]");let r=this.rules.other.listItemRegex(n),o=!1;for(;e;){let c=!1,p="",u="";if(!(t=r.exec(e))||this.rules.block.hr.test(e))break;p=t[0],e=e.substring(p.length);let d=t[2].split(`
`,1)[0].replace(this.rules.other.listReplaceTabs,Z=>" ".repeat(3*Z.length)),g=e.split(`
`,1)[0],T=!d.trim(),f=0;if(this.options.pedantic?(f=2,u=d.trimStart()):T?f=t[1].length+1:(f=t[2].search(this.rules.other.nonSpaceChar),f=f>4?1:f,u=d.slice(f),f+=t[1].length),T&&this.rules.other.blankLine.test(g)&&(p+=g+`
`,e=e.substring(g.length+1),c=!0),!c){let Z=this.rules.other.nextBulletRegex(f),te=this.rules.other.hrRegex(f),ne=this.rules.other.fencesBeginRegex(f),se=this.rules.other.headingBeginRegex(f),xe=this.rules.other.htmlBeginRegex(f);for(;e;){let G=e.split(`
`,1)[0],C;if(g=G,this.options.pedantic?(g=g.replace(this.rules.other.listReplaceNesting,"  "),C=g):C=g.replace(this.rules.other.tabCharGlobal,"    "),ne.test(g)||se.test(g)||xe.test(g)||Z.test(g)||te.test(g))break;if(C.search(this.rules.other.nonSpaceChar)>=f||!g.trim())u+=`
`+C.slice(f);else{if(T||d.replace(this.rules.other.tabCharGlobal,"    ").search(this.rules.other.nonSpaceChar)>=4||ne.test(d)||se.test(d)||te.test(d))break;u+=`
`+g}!T&&!g.trim()&&(T=!0),p+=G+`
`,e=e.substring(G.length+1),d=C.slice(f)}}i.loose||(o?i.loose=!0:this.rules.other.doubleBlankLine.test(p)&&(o=!0));let y=null,ee;this.options.gfm&&(y=this.rules.other.listIsTask.exec(u),y&&(ee=y[0]!=="[ ] ",u=u.replace(this.rules.other.listReplaceTask,""))),i.items.push({type:"list_item",raw:p,task:!!y,checked:ee,loose:!1,text:u,tokens:[]}),i.raw+=p}let a=i.items.at(-1);if(a)a.raw=a.raw.trimEnd(),a.text=a.text.trimEnd();else return;i.raw=i.raw.trimEnd();for(let c=0;c<i.items.length;c++)if(this.lexer.state.top=!1,i.items[c].tokens=this.lexer.blockTokens(i.items[c].text,[]),!i.loose){let p=i.items[c].tokens.filter(d=>d.type==="space"),u=p.length>0&&p.some(d=>this.rules.other.anyLine.test(d.raw));i.loose=u}if(i.loose)for(let c=0;c<i.items.length;c++)i.items[c].loose=!0;return i}}html(e){let t=this.rules.block.html.exec(e);if(t)return{type:"html",block:!0,raw:t[0],pre:t[1]==="pre"||t[1]==="script"||t[1]==="style",text:t[0]}}def(e){let t=this.rules.block.def.exec(e);if(t){let n=t[1].toLowerCase().replace(this.rules.other.multipleSpaceGlobal," "),s=t[2]?t[2].replace(this.rules.other.hrefBrackets,"$1").replace(this.rules.inline.anyPunctuation,"$1"):"",i=t[3]?t[3].substring(1,t[3].length-1).replace(this.rules.inline.anyPunctuation,"$1"):t[3];return{type:"def",tag:n,raw:t[0],href:s,title:i}}}table(e){let t=this.rules.block.table.exec(e);if(!t||!this.rules.other.tableDelimiter.test(t[2]))return;let n=Y(t[1]),s=t[2].replace(this.rules.other.tableAlignChars,"").split("|"),i=t[3]?.trim()?t[3].replace(this.rules.other.tableRowBlankLine,"").split(`
`):[],r={type:"table",raw:t[0],header:[],align:[],rows:[]};if(n.length===s.length){for(let o of s)this.rules.other.tableAlignRight.test(o)?r.align.push("right"):this.rules.other.tableAlignCenter.test(o)?r.align.push("center"):this.rules.other.tableAlignLeft.test(o)?r.align.push("left"):r.align.push(null);for(let o=0;o<n.length;o++)r.header.push({text:n[o],tokens:this.lexer.inline(n[o]),header:!0,align:r.align[o]});for(let o of i)r.rows.push(Y(o,r.header.length).map((a,c)=>({text:a,tokens:this.lexer.inline(a),header:!1,align:r.align[c]})));return r}}lheading(e){let t=this.rules.block.lheading.exec(e);if(t)return{type:"heading",raw:t[0],depth:t[2].charAt(0)==="="?1:2,text:t[1],tokens:this.lexer.inline(t[1])}}paragraph(e){let t=this.rules.block.paragraph.exec(e);if(t){let n=t[1].charAt(t[1].length-1)===`
`?t[1].slice(0,-1):t[1];return{type:"paragraph",raw:t[0],text:n,tokens:this.lexer.inline(n)}}}text(e){let t=this.rules.block.text.exec(e);if(t)return{type:"text",raw:t[0],text:t[0],tokens:this.lexer.inline(t[0])}}escape(e){let t=this.rules.inline.escape.exec(e);if(t)return{type:"escape",raw:t[0],text:t[1]}}tag(e){let t=this.rules.inline.tag.exec(e);if(t)return!this.lexer.state.inLink&&this.rules.other.startATag.test(t[0])?this.lexer.state.inLink=!0:this.lexer.state.inLink&&this.rules.other.endATag.test(t[0])&&(this.lexer.state.inLink=!1),!this.lexer.state.inRawBlock&&this.rules.other.startPreScriptTag.test(t[0])?this.lexer.state.inRawBlock=!0:this.lexer.state.inRawBlock&&this.rules.other.endPreScriptTag.test(t[0])&&(this.lexer.state.inRawBlock=!1),{type:"html",raw:t[0],inLink:this.lexer.state.inLink,inRawBlock:this.lexer.state.inRawBlock,block:!1,text:t[0]}}link(e){let t=this.rules.inline.link.exec(e);if(t){let n=t[2].trim();if(!this.options.pedantic&&this.rules.other.startAngleBracket.test(n)){if(!this.rules.other.endAngleBracket.test(n))return;let r=A(n.slice(0,-1),"\\");if((n.length-r.length)%2===0)return}else{let r=de(t[2],"()");if(r===-2)return;if(r>-1){let a=(t[0].indexOf("!")===0?5:4)+t[1].length+r;t[2]=t[2].substring(0,r),t[0]=t[0].substring(0,a).trim(),t[3]=""}}let s=t[2],i="";if(this.options.pedantic){let r=this.rules.other.pedanticHrefTitle.exec(s);r&&(s=r[1],i=r[3])}else i=t[3]?t[3].slice(1,-1):"";return s=s.trim(),this.rules.other.startAngleBracket.test(s)&&(this.options.pedantic&&!this.rules.other.endAngleBracket.test(n)?s=s.slice(1):s=s.slice(1,-1)),me(t,{href:s&&s.replace(this.rules.inline.anyPunctuation,"$1"),title:i&&i.replace(this.rules.inline.anyPunctuation,"$1")},t[0],this.lexer,this.rules)}}reflink(e,t){let n;if((n=this.rules.inline.reflink.exec(e))||(n=this.rules.inline.nolink.exec(e))){let s=(n[2]||n[1]).replace(this.rules.other.multipleSpaceGlobal," "),i=t[s.toLowerCase()];if(!i){let r=n[0].charAt(0);return{type:"text",raw:r,text:r}}return me(n,i,n[0],this.lexer,this.rules)}}emStrong(e,t,n=""){let s=this.rules.inline.emStrongLDelim.exec(e);if(!s||s[3]&&n.match(this.rules.other.unicodeAlphaNumeric))return;if(!(s[1]||s[2]||"")||!n||this.rules.inline.punctuation.exec(n)){let r=[...s[0]].length-1,o,a,c=r,p=0,u=s[0][0]==="*"?this.rules.inline.emStrongRDelimAst:this.rules.inline.emStrongRDelimUnd;for(u.lastIndex=0,t=t.slice(-1*e.length+r);(s=u.exec(t))!=null;){if(o=s[1]||s[2]||s[3]||s[4]||s[5]||s[6],!o)continue;if(a=[...o].length,s[3]||s[4]){c+=a;continue}else if((s[5]||s[6])&&r%3&&!((r+a)%3)){p+=a;continue}if(c-=a,c>0)continue;a=Math.min(a,a+c+p);let d=[...s[0]][0].length,g=e.slice(0,r+s.index+d+a);if(Math.min(r,a)%2){let f=g.slice(1,-1);return{type:"em",raw:g,text:f,tokens:this.lexer.inlineTokens(f)}}let T=g.slice(2,-2);return{type:"strong",raw:g,text:T,tokens:this.lexer.inlineTokens(T)}}}}codespan(e){let t=this.rules.inline.code.exec(e);if(t){let n=t[2].replace(this.rules.other.newLineCharGlobal," "),s=this.rules.other.nonSpaceChar.test(n),i=this.rules.other.startingSpaceChar.test(n)&&this.rules.other.endingSpaceChar.test(n);return s&&i&&(n=n.substring(1,n.length-1)),{type:"codespan",raw:t[0],text:n}}}br(e){let t=this.rules.inline.br.exec(e);if(t)return{type:"br",raw:t[0]}}del(e){let t=this.rules.inline.del.exec(e);if(t)return{type:"del",raw:t[0],text:t[2],tokens:this.lexer.inlineTokens(t[2])}}autolink(e){let t=this.rules.inline.autolink.exec(e);if(t){let n,s;return t[2]==="@"?(n=t[1],s="mailto:"+n):(n=t[1],s=n),{type:"link",raw:t[0],text:n,href:s,tokens:[{type:"text",raw:n,text:n}]}}}url(e){let t;if(t=this.rules.inline.url.exec(e)){let n,s;if(t[2]==="@")n=t[0],s="mailto:"+n;else{let i;do i=t[0],t[0]=this.rules.inline._backpedal.exec(t[0])?.[0]??"";while(i!==t[0]);n=t[0],t[1]==="www."?s="http://"+t[0]:s=t[0]}return{type:"link",raw:t[0],text:n,href:s,tokens:[{type:"text",raw:n,text:n}]}}}inlineText(e){let t=this.rules.inline.text.exec(e);if(t){let n=this.lexer.state.inRawBlock;return{type:"text",raw:t[0],text:t[0],escaped:n}}}};var x=class l{tokens;options;state;tokenizer;inlineQueue;constructor(e){this.tokens=[],this.tokens.links=Object.create(null),this.options=e||w,this.options.tokenizer=this.options.tokenizer||new S,this.tokenizer=this.options.tokenizer,this.tokenizer.options=this.options,this.tokenizer.lexer=this,this.inlineQueue=[],this.state={inLink:!1,inRawBlock:!1,top:!0};let t={other:m,block:B.normal,inline:P.normal};this.options.pedantic?(t.block=B.pedantic,t.inline=P.pedantic):this.options.gfm&&(t.block=B.gfm,this.options.breaks?t.inline=P.breaks:t.inline=P.gfm),this.tokenizer.rules=t}static get rules(){return{block:B,inline:P}}static lex(e,t){return new l(t).lex(e)}static lexInline(e,t){return new l(t).inlineTokens(e)}lex(e){e=e.replace(m.carriageReturn,`
`),this.blockTokens(e,this.tokens);for(let t=0;t<this.inlineQueue.length;t++){let n=this.inlineQueue[t];this.inlineTokens(n.src,n.tokens)}return this.inlineQueue=[],this.tokens}blockTokens(e,t=[],n=!1){for(this.options.pedantic&&(e=e.replace(m.tabCharGlobal,"    ").replace(m.spaceLine,""));e;){let s;if(this.options.extensions?.block?.some(r=>(s=r.call({lexer:this},e,t))?(e=e.substring(s.raw.length),t.push(s),!0):!1))continue;if(s=this.tokenizer.space(e)){e=e.substring(s.raw.length);let r=t.at(-1);s.raw.length===1&&r!==void 0?r.raw+=`
`:t.push(s);continue}if(s=this.tokenizer.code(e)){e=e.substring(s.raw.length);let r=t.at(-1);r?.type==="paragraph"||r?.type==="text"?(r.raw+=`
`+s.raw,r.text+=`
`+s.text,this.inlineQueue.at(-1).src=r.text):t.push(s);continue}if(s=this.tokenizer.fences(e)){e=e.substring(s.raw.length),t.push(s);continue}if(s=this.tokenizer.heading(e)){e=e.substring(s.raw.length),t.push(s);continue}if(s=this.tokenizer.hr(e)){e=e.substring(s.raw.length),t.push(s);continue}if(s=this.tokenizer.blockquote(e)){e=e.substring(s.raw.length),t.push(s);continue}if(s=this.tokenizer.list(e)){e=e.substring(s.raw.length),t.push(s);continue}if(s=this.tokenizer.html(e)){e=e.substring(s.raw.length),t.push(s);continue}if(s=this.tokenizer.def(e)){e=e.substring(s.raw.length);let r=t.at(-1);r?.type==="paragraph"||r?.type==="text"?(r.raw+=`
`+s.raw,r.text+=`
`+s.raw,this.inlineQueue.at(-1).src=r.text):this.tokens.links[s.tag]||(this.tokens.links[s.tag]={href:s.href,title:s.title});continue}if(s=this.tokenizer.table(e)){e=e.substring(s.raw.length),t.push(s);continue}if(s=this.tokenizer.lheading(e)){e=e.substring(s.raw.length),t.push(s);continue}let i=e;if(this.options.extensions?.startBlock){let r=1/0,o=e.slice(1),a;this.options.extensions.startBlock.forEach(c=>{a=c.call({lexer:this},o),typeof a=="number"&&a>=0&&(r=Math.min(r,a))}),r<1/0&&r>=0&&(i=e.substring(0,r+1))}if(this.state.top&&(s=this.tokenizer.paragraph(i))){let r=t.at(-1);n&&r?.type==="paragraph"?(r.raw+=`
`+s.raw,r.text+=`
`+s.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=r.text):t.push(s),n=i.length!==e.length,e=e.substring(s.raw.length);continue}if(s=this.tokenizer.text(e)){e=e.substring(s.raw.length);let r=t.at(-1);r?.type==="text"?(r.raw+=`
`+s.raw,r.text+=`
`+s.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=r.text):t.push(s);continue}if(e){let r="Infinite loop on byte: "+e.charCodeAt(0);if(this.options.silent){console.error(r);break}else throw new Error(r)}}return this.state.top=!0,t}inline(e,t=[]){return this.inlineQueue.push({src:e,tokens:t}),t}inlineTokens(e,t=[]){let n=e,s=null;if(this.tokens.links){let o=Object.keys(this.tokens.links);if(o.length>0)for(;(s=this.tokenizer.rules.inline.reflinkSearch.exec(n))!=null;)o.includes(s[0].slice(s[0].lastIndexOf("[")+1,-1))&&(n=n.slice(0,s.index)+"["+"a".repeat(s[0].length-2)+"]"+n.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex))}for(;(s=this.tokenizer.rules.inline.anyPunctuation.exec(n))!=null;)n=n.slice(0,s.index)+"++"+n.slice(this.tokenizer.rules.inline.anyPunctuation.lastIndex);for(;(s=this.tokenizer.rules.inline.blockSkip.exec(n))!=null;)n=n.slice(0,s.index)+"["+"a".repeat(s[0].length-2)+"]"+n.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);let i=!1,r="";for(;e;){i||(r=""),i=!1;let o;if(this.options.extensions?.inline?.some(c=>(o=c.call({lexer:this},e,t))?(e=e.substring(o.raw.length),t.push(o),!0):!1))continue;if(o=this.tokenizer.escape(e)){e=e.substring(o.raw.length),t.push(o);continue}if(o=this.tokenizer.tag(e)){e=e.substring(o.raw.length),t.push(o);continue}if(o=this.tokenizer.link(e)){e=e.substring(o.raw.length),t.push(o);continue}if(o=this.tokenizer.reflink(e,this.tokens.links)){e=e.substring(o.raw.length);let c=t.at(-1);o.type==="text"&&c?.type==="text"?(c.raw+=o.raw,c.text+=o.text):t.push(o);continue}if(o=this.tokenizer.emStrong(e,n,r)){e=e.substring(o.raw.length),t.push(o);continue}if(o=this.tokenizer.codespan(e)){e=e.substring(o.raw.length),t.push(o);continue}if(o=this.tokenizer.br(e)){e=e.substring(o.raw.length),t.push(o);continue}if(o=this.tokenizer.del(e)){e=e.substring(o.raw.length),t.push(o);continue}if(o=this.tokenizer.autolink(e)){e=e.substring(o.raw.length),t.push(o);continue}if(!this.state.inLink&&(o=this.tokenizer.url(e))){e=e.substring(o.raw.length),t.push(o);continue}let a=e;if(this.options.extensions?.startInline){let c=1/0,p=e.slice(1),u;this.options.extensions.startInline.forEach(d=>{u=d.call({lexer:this},p),typeof u=="number"&&u>=0&&(c=Math.min(c,u))}),c<1/0&&c>=0&&(a=e.substring(0,c+1))}if(o=this.tokenizer.inlineText(a)){e=e.substring(o.raw.length),o.raw.slice(-1)!=="_"&&(r=o.raw.slice(-1)),i=!0;let c=t.at(-1);c?.type==="text"?(c.raw+=o.raw,c.text+=o.text):t.push(o);continue}if(e){let c="Infinite loop on byte: "+e.charCodeAt(0);if(this.options.silent){console.error(c);break}else throw new Error(c)}}return t}};var $=class{options;parser;constructor(e){this.options=e||w}space(e){return""}code({text:e,lang:t,escaped:n}){let s=(t||"").match(m.notSpaceStart)?.[0],i=e.replace(m.endingNewline,"")+`
`;return s?'<pre><code class="language-'+R(s)+'">'+(n?i:R(i,!0))+`</code></pre>
`:"<pre><code>"+(n?i:R(i,!0))+`</code></pre>
`}blockquote({tokens:e}){return`<blockquote>
${this.parser.parse(e)}</blockquote>
`}html({text:e}){return e}heading({tokens:e,depth:t}){return`<h${t}>${this.parser.parseInline(e)}</h${t}>
`}hr(e){return`<hr>
`}list(e){let t=e.ordered,n=e.start,s="";for(let o=0;o<e.items.length;o++){let a=e.items[o];s+=this.listitem(a)}let i=t?"ol":"ul",r=t&&n!==1?' start="'+n+'"':"";return"<"+i+r+`>
`+s+"</"+i+`>
`}listitem(e){let t="";if(e.task){let n=this.checkbox({checked:!!e.checked});e.loose?e.tokens[0]?.type==="paragraph"?(e.tokens[0].text=n+" "+e.tokens[0].text,e.tokens[0].tokens&&e.tokens[0].tokens.length>0&&e.tokens[0].tokens[0].type==="text"&&(e.tokens[0].tokens[0].text=n+" "+R(e.tokens[0].tokens[0].text),e.tokens[0].tokens[0].escaped=!0)):e.tokens.unshift({type:"text",raw:n+" ",text:n+" ",escaped:!0}):t+=n+" "}return t+=this.parser.parse(e.tokens,!!e.loose),`<li>${t}</li>
`}checkbox({checked:e}){return"<input "+(e?'checked="" ':"")+'disabled="" type="checkbox">'}paragraph({tokens:e}){return`<p>${this.parser.parseInline(e)}</p>
`}table(e){let t="",n="";for(let i=0;i<e.header.length;i++)n+=this.tablecell(e.header[i]);t+=this.tablerow({text:n});let s="";for(let i=0;i<e.rows.length;i++){let r=e.rows[i];n="";for(let o=0;o<r.length;o++)n+=this.tablecell(r[o]);s+=this.tablerow({text:n})}return s&&(s=`<tbody>${s}</tbody>`),`<table>
<thead>
`+t+`</thead>
`+s+`</table>
`}tablerow({text:e}){return`<tr>
${e}</tr>
`}tablecell(e){let t=this.parser.parseInline(e.tokens),n=e.header?"th":"td";return(e.align?`<${n} align="${e.align}">`:`<${n}>`)+t+`</${n}>
`}strong({tokens:e}){return`<strong>${this.parser.parseInline(e)}</strong>`}em({tokens:e}){return`<em>${this.parser.parseInline(e)}</em>`}codespan({text:e}){return`<code>${R(e,!0)}</code>`}br(e){return"<br>"}del({tokens:e}){return`<del>${this.parser.parseInline(e)}</del>`}link({href:e,title:t,tokens:n}){let s=this.parser.parseInline(n),i=V(e);if(i===null)return s;e=i;let r='<a href="'+e+'"';return t&&(r+=' title="'+R(t)+'"'),r+=">"+s+"</a>",r}image({href:e,title:t,text:n,tokens:s}){s&&(n=this.parser.parseInline(s,this.parser.textRenderer));let i=V(e);if(i===null)return R(n);e=i;let r=`<img src="${e}" alt="${n}"`;return t&&(r+=` title="${R(t)}"`),r+=">",r}text(e){return"tokens"in e&&e.tokens?this.parser.parseInline(e.tokens):"escaped"in e&&e.escaped?e.text:R(e.text)}};var _=class{strong({text:e}){return e}em({text:e}){return e}codespan({text:e}){return e}del({text:e}){return e}html({text:e}){return e}text({text:e}){return e}link({text:e}){return""+e}image({text:e}){return""+e}br(){return""}};var b=class l{options;renderer;textRenderer;constructor(e){this.options=e||w,this.options.renderer=this.options.renderer||new $,this.renderer=this.options.renderer,this.renderer.options=this.options,this.renderer.parser=this,this.textRenderer=new _}static parse(e,t){return new l(t).parse(e)}static parseInline(e,t){return new l(t).parseInline(e)}parse(e,t=!0){let n="";for(let s=0;s<e.length;s++){let i=e[s];if(this.options.extensions?.renderers?.[i.type]){let o=i,a=this.options.extensions.renderers[o.type].call({parser:this},o);if(a!==!1||!["space","hr","heading","code","table","blockquote","list","html","paragraph","text"].includes(o.type)){n+=a||"";continue}}let r=i;switch(r.type){case"space":{n+=this.renderer.space(r);continue}case"hr":{n+=this.renderer.hr(r);continue}case"heading":{n+=this.renderer.heading(r);continue}case"code":{n+=this.renderer.code(r);continue}case"table":{n+=this.renderer.table(r);continue}case"blockquote":{n+=this.renderer.blockquote(r);continue}case"list":{n+=this.renderer.list(r);continue}case"html":{n+=this.renderer.html(r);continue}case"paragraph":{n+=this.renderer.paragraph(r);continue}case"text":{let o=r,a=this.renderer.text(o);for(;s+1<e.length&&e[s+1].type==="text";)o=e[++s],a+=`
`+this.renderer.text(o);t?n+=this.renderer.paragraph({type:"paragraph",raw:a,text:a,tokens:[{type:"text",raw:a,text:a,escaped:!0}]}):n+=a;continue}default:{let o='Token with "'+r.type+'" type was not found.';if(this.options.silent)return console.error(o),"";throw new Error(o)}}}return n}parseInline(e,t=this.renderer){let n="";for(let s=0;s<e.length;s++){let i=e[s];if(this.options.extensions?.renderers?.[i.type]){let o=this.options.extensions.renderers[i.type].call({parser:this},i);if(o!==!1||!["escape","html","link","image","strong","em","codespan","br","del","text"].includes(i.type)){n+=o||"";continue}}let r=i;switch(r.type){case"escape":{n+=t.text(r);break}case"html":{n+=t.html(r);break}case"link":{n+=t.link(r);break}case"image":{n+=t.image(r);break}case"strong":{n+=t.strong(r);break}case"em":{n+=t.em(r);break}case"codespan":{n+=t.codespan(r);break}case"br":{n+=t.br(r);break}case"del":{n+=t.del(r);break}case"text":{n+=t.text(r);break}default:{let o='Token with "'+r.type+'" type was not found.';if(this.options.silent)return console.error(o),"";throw new Error(o)}}}return n}};var L=class{options;block;constructor(e){this.options=e||w}static passThroughHooks=new Set(["preprocess","postprocess","processAllTokens"]);preprocess(e){return e}postprocess(e){return e}processAllTokens(e){return e}provideLexer(){return this.block?x.lex:x.lexInline}provideParser(){return this.block?b.parse:b.parseInline}};var E=class{defaults=z();options=this.setOptions;parse=this.parseMarkdown(!0);parseInline=this.parseMarkdown(!1);Parser=b;Renderer=$;TextRenderer=_;Lexer=x;Tokenizer=S;Hooks=L;constructor(...e){this.use(...e)}walkTokens(e,t){let n=[];for(let s of e)switch(n=n.concat(t.call(this,s)),s.type){case"table":{let i=s;for(let r of i.header)n=n.concat(this.walkTokens(r.tokens,t));for(let r of i.rows)for(let o of r)n=n.concat(this.walkTokens(o.tokens,t));break}case"list":{let i=s;n=n.concat(this.walkTokens(i.items,t));break}default:{let i=s;this.defaults.extensions?.childTokens?.[i.type]?this.defaults.extensions.childTokens[i.type].forEach(r=>{let o=i[r].flat(1/0);n=n.concat(this.walkTokens(o,t))}):i.tokens&&(n=n.concat(this.walkTokens(i.tokens,t)))}}return n}use(...e){let t=this.defaults.extensions||{renderers:{},childTokens:{}};return e.forEach(n=>{let s={...n};if(s.async=this.defaults.async||s.async||!1,n.extensions&&(n.extensions.forEach(i=>{if(!i.name)throw new Error("extension name required");if("renderer"in i){let r=t.renderers[i.name];r?t.renderers[i.name]=function(...o){let a=i.renderer.apply(this,o);return a===!1&&(a=r.apply(this,o)),a}:t.renderers[i.name]=i.renderer}if("tokenizer"in i){if(!i.level||i.level!=="block"&&i.level!=="inline")throw new Error("extension level must be 'block' or 'inline'");let r=t[i.level];r?r.unshift(i.tokenizer):t[i.level]=[i.tokenizer],i.start&&(i.level==="block"?t.startBlock?t.startBlock.push(i.start):t.startBlock=[i.start]:i.level==="inline"&&(t.startInline?t.startInline.push(i.start):t.startInline=[i.start]))}"childTokens"in i&&i.childTokens&&(t.childTokens[i.name]=i.childTokens)}),s.extensions=t),n.renderer){let i=this.defaults.renderer||new $(this.defaults);for(let r in n.renderer){if(!(r in i))throw new Error(`renderer '${r}' does not exist`);if(["options","parser"].includes(r))continue;let o=r,a=n.renderer[o],c=i[o];i[o]=(...p)=>{let u=a.apply(i,p);return u===!1&&(u=c.apply(i,p)),u||""}}s.renderer=i}if(n.tokenizer){let i=this.defaults.tokenizer||new S(this.defaults);for(let r in n.tokenizer){if(!(r in i))throw new Error(`tokenizer '${r}' does not exist`);if(["options","rules","lexer"].includes(r))continue;let o=r,a=n.tokenizer[o],c=i[o];i[o]=(...p)=>{let u=a.apply(i,p);return u===!1&&(u=c.apply(i,p)),u}}s.tokenizer=i}if(n.hooks){let i=this.defaults.hooks||new L;for(let r in n.hooks){if(!(r in i))throw new Error(`hook '${r}' does not exist`);if(["options","block"].includes(r))continue;let o=r,a=n.hooks[o],c=i[o];L.passThroughHooks.has(r)?i[o]=p=>{if(this.defaults.async)return Promise.resolve(a.call(i,p)).then(d=>c.call(i,d));let u=a.call(i,p);return c.call(i,u)}:i[o]=(...p)=>{let u=a.apply(i,p);return u===!1&&(u=c.apply(i,p)),u}}s.hooks=i}if(n.walkTokens){let i=this.defaults.walkTokens,r=n.walkTokens;s.walkTokens=function(o){let a=[];return a.push(r.call(this,o)),i&&(a=a.concat(i.call(this,o))),a}}this.defaults={...this.defaults,...s}}),this}setOptions(e){return this.defaults={...this.defaults,...e},this}lexer(e,t){return x.lex(e,t??this.defaults)}parser(e,t){return b.parse(e,t??this.defaults)}parseMarkdown(e){return(n,s)=>{let i={...s},r={...this.defaults,...i},o=this.onError(!!r.silent,!!r.async);if(this.defaults.async===!0&&i.async===!1)return o(new Error("marked(): The async option was set to true by an extension. Remove async: false from the parse options object to return a Promise."));if(typeof n>"u"||n===null)return o(new Error("marked(): input parameter is undefined or null"));if(typeof n!="string")return o(new Error("marked(): input parameter is of type "+Object.prototype.toString.call(n)+", string expected"));r.hooks&&(r.hooks.options=r,r.hooks.block=e);let a=r.hooks?r.hooks.provideLexer():e?x.lex:x.lexInline,c=r.hooks?r.hooks.provideParser():e?b.parse:b.parseInline;if(r.async)return Promise.resolve(r.hooks?r.hooks.preprocess(n):n).then(p=>a(p,r)).then(p=>r.hooks?r.hooks.processAllTokens(p):p).then(p=>r.walkTokens?Promise.all(this.walkTokens(p,r.walkTokens)).then(()=>p):p).then(p=>c(p,r)).then(p=>r.hooks?r.hooks.postprocess(p):p).catch(o);try{r.hooks&&(n=r.hooks.preprocess(n));let p=a(n,r);r.hooks&&(p=r.hooks.processAllTokens(p)),r.walkTokens&&this.walkTokens(p,r.walkTokens);let u=c(p,r);return r.hooks&&(u=r.hooks.postprocess(u)),u}catch(p){return o(p)}}}onError(e,t){return n=>{if(n.message+=`
Please report this to https://github.com/markedjs/marked.`,e){let s="<p>An error occurred:</p><pre>"+R(n.message+"",!0)+"</pre>";return t?Promise.resolve(s):s}if(t)return Promise.reject(n);throw n}}};var M=new E;function k(l,e){return M.parse(l,e)}k.options=k.setOptions=function(l){return M.setOptions(l),k.defaults=M.defaults,N(k.defaults),k};k.getDefaults=z;k.defaults=w;k.use=function(...l){return M.use(...l),k.defaults=M.defaults,N(k.defaults),k};k.walkTokens=function(l,e){return M.walkTokens(l,e)};k.parseInline=M.parseInline;k.Parser=b;k.parser=b.parse;k.Renderer=$;k.TextRenderer=_;k.Lexer=x;k.lexer=x.lex;k.Tokenizer=S;k.Hooks=L;k.parse=k;var it=k.options,ot=k.setOptions,lt=k.use,at=k.walkTokens,ct=k.parseInline,pt=k,ut=b.parse,ht=x.lex;

if(__exports != exports)module.exports = exports;return module.exports}));

/*
The code above is inserted to this file as an imported module. But instead of using import or importing the script from HTML, I had to import above since there were errors when only importing from the internet
*/

const SRBtnEl = document.getElementById("startSTT");
let chunks = [];
let stream = null;
let medRecorder = null;
let recordState = false;
let AIboxout = true;
const AIboxElTemp = document.getElementById("AIbox");
AIboxElTemp.onclick = modAIBox;
let pistonSettingsState = false;
let micAvailable = true;
let stopwatchTicking = false;
let stopwatchPaused = false;
let timerTicking = false;
let timerPaused = false;
let fullscreenMode = false;
let streamingChunks = [];

function getPyApi() {
    if (!window.pywebview || !window.pywebview.api) {
        return null;
    }
    return window.pywebview.api;
}

function getApiMethod(api, ...names) {
    if (!api) return null;
    for (const name of names) {
        if (typeof api[name] === "function") {
            return api[name].bind(api);
        }
    }
    return null;
}

function setLocalItem(key, value) {
    try {
        console.log("setLocalItem")
        if (!key) {
            return;
        }
        localStorage.setItem(key, value);
        const data = JSON.stringify(localStorage, null, 2);
        const api = getPyApi();
        const applyJSON = getApiMethod(api, "applyJSON", "apply_json");
        if (!applyJSON) {
            return;
        }
        applyJSON(data)
            .then(response => {
                console.log(response);
            })
            .catch(error => {
                console.error("Failed to sync localStorage to pywebview:", error);
        });
    } catch {
        localStorage.setItem(key, value);
    }
}

function configPistonSettings() {

    const pistonSettingsEl = document.getElementById("pistonSettings");
    const settingsContainerEl = document.getElementById("settingsContainer");
    pistonSettingsEl.onclick = () => {
        if (pistonSettingsState === false) {
            showPistonSettings();
        } else if (pistonSettingsState === true) {
            hidePistonSettings();
        }
    }

    settingsContainerEl.onclick = (e) => {
        e.stopPropagation();
  } 
  

    document.addEventListener("click", (e) => {
        if (!settingsContainerEl.contains(e.target) && !pistonSettingsEl.contains(e.target)) {
            hidePistonSettings();
        }
    })
    const exportDataEl = document.getElementById("exportData");
    exportDataEl.onclick = () => {
        exportDataFunc();
    }
}

function showPistonSettings() {
    pistonSettingsState = true;
    const settingsContainerEl = document.getElementById("settingsContainer");
    const pistonSettingsEl = document.getElementById("pistonSettings");
    const pistonSettingsIMGEl = document.getElementById("pistonSettingsIMG");
    pistonSettingsIMGEl.src = "./src/src/add.png";
    pistonSettingsEl.style.rotate = "135deg";
    settingsContainerEl.style.visibility = "visible";
    settingsContainerEl.style.opacity = "0%";
    requestAnimationFrame(() => {
        settingsContainerEl.style.opacity = "1";
    });
    const deleteAllDataEl = document.getElementById("deleteData");
    deleteAllDataEl.onclick = deleteAllData;
}

function hidePistonSettings() {
    pistonSettingsState = false;
    const settingsContainerEl = document.getElementById("settingsContainer");
    const pistonSettingsEl = document.getElementById("pistonSettings");
    const pistonSettingsIMGEl = document.getElementById("pistonSettingsIMG");
    pistonSettingsIMGEl.src = "./src/src/settings.png"
    pistonSettingsEl.style.rotate = "0deg";
    settingsContainerEl.style.opacity ="100%";
    settingsContainerEl.style.opacity = "0%";
    setTimeout(() => {
        settingsContainerEl.style.visibility = "hidden";
    }, 200);
}
async function positionSettings() {
    pistonSettingsState = false;
    const settingsContainerEl = document.getElementById("settingsContainer");
    const pistonSettingsEl = document.getElementById("pistonSettings");
    const wallpapersContainerEl = document.getElementById("wallpapersContainer");
    wallpapersContainerEl.style.width = (parseFloat(window.getComputedStyle(wallpapersContainerEl).fontSize) / 2) * 2 + 128 * 2 + 'px';

    settingsContainerEl.style.top = pistonSettingsEl.offsetTop + pistonSettingsEl.offsetHeight + 5 + 'px';
    settingsContainerEl.style.right = 2 + "em";
    settingsContainerEl.style.visibility = "hidden";

    let currentWallpaper = localStorage.getItem("currentBG");
    if (!currentWallpaper) {
        setLocalItem("currentBG", "gradient-1.jpg");
        currentWallpaper = "gradient-1.jpg";
    }

    const res = await fetch("./src/src/wallpapers/wallpapers.json");
    const data = await res.json();

    console.log(data);

    wallpapersContainerEl.innerHTML = "";
    
    for (const filename of data) {
        const wallpaper = document.createElement("img");
        wallpaper.src = `./src/src/wallpapers/${filename}`;
        wallpaper.loading = "lazy";
        wallpaper.style.objectFit = "cover";
        wallpaper.style.width = "128px";
        wallpaper.style.height = "72px";
        wallpaper.style.borderRadius = 5 + 'px';
        wallpaper.id = filename;
        wallpaper.style.border = "none";
        wallpaper.style.opacity = "100%"
        wallpaper.style.transition = "opacity 0.2s ease";
        wallpaper.style.outlineOffset = "30px";
        wallpaper.addEventListener("mouseover", () => {
            wallpaper.style.opacity = "50%"
        });
        wallpaper.addEventListener("mouseout", () => {
            wallpaper.style.opacity = "100%";
        });
        wallpaper.style.cursor = "pointer";
        wallpapersContainerEl.appendChild(wallpaper);
        wallpaper.onclick = () => {
            setCurrentWallpaper(wallpaper.id);
            positionSettings();
            showPistonSettings();
        }
    }

    const children = wallpapersContainerEl.children;
    for (let i = 0; i < children.length; i++) {
        children[i].style.border = "none";
    }
    const currentWallpaperElement = document.getElementById(currentWallpaper);
    currentWallpaperElement.style.border = "2px solid";
    currentWallpaperElement.style.borderColor = "#a6ff01";

    document.body.style.backgroundImage = `url('./src/src/wallpapers/${currentWallpaper}')`;

  configPistonSettings();
  
  document.getElementById("dataUpload").addEventListener("change", (event) => {
    const file = event.target.files[0];
    if (file) {
      const fileReader = new FileReader();
      fileReader.onload = (e) => {
        try {
            const fileData = JSON.parse(e.target.result);
            for (const key in fileData) {
                setLocalItem(key, fileData[key]);
            }
            hidePistonSettings();
            alert("Data successfully imported!");
            window.location.reload();
        } catch (error) {
            alert(`Invalid JSON file: ${error}`);
        }
      }
      fileReader.readAsText(file);
    }
  });
}

function exportDataFunc() {
    const data = JSON.stringify(localStorage, null, 2);
    const  blob = new Blob([data], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "piston-ai-data.json";

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
}

function deleteAllData() {
    const deleteAllDataPromptEl = document.getElementById("deleteAllDataPrompt");
    const rectWidth = deleteAllDataPromptEl.getBoundingClientRect().width;
    const rectHeight = deleteAllDataPromptEl.getBoundingClientRect().height;
    deleteAllDataPromptEl.style.left = (window.innerWidth - rectWidth) / 2 + 'px';
    deleteAllDataPromptEl.style.top = (window.innerHeight - rectHeight) / 2 + 'px';
    deleteAllDataPromptEl.style.opacity = "0";
    deleteAllDataPromptEl.addEventListener("transitionend", () => {
        deleteAllDataPromptEl.style.visibility = "visible";
        deleteAllDataPromptEl.style.opacity = "1";
        document.body.classList.add("blur-active");
    });
    const cancelDeleteEl = document.getElementById("cancelDelete");
    cancelDeleteEl.onclick = hideDeleteAllData;
    const confirmDeleteEl = document.getElementById("confirmDelete");
    confirmDeleteEl.onclick = () => {
        deleteAll()
    };
}

function hideDeleteAllData() {
    const deleteAllDataPromptEl = document.getElementById("deleteAllDataPrompt");
    deleteAllDataPromptEl.style.opacity = "1";
    deleteAllDataPromptEl.style.opacity = "0";
    deleteAllDataPromptEl.addEventListener("transitionend", () => {
        deleteAllDataPromptEl.style.visibility = "hidden";
        document.body.classList.remove("blur-active");
    });
}

function setCurrentWallpaper(wallpaper) {
    document.body.style.opacity = "0%";
    requestAnimationFrame(() => {
        document.body.style.backgroundImage = `url('./src/src/wallpapers/${wallpaper}')`;
    })
    requestAnimationFrame(() => {
        document.body.style.opacity = "100%";
    })   
    setLocalItem("currentBG", wallpaper);
}

function handleInput() {
    const manInEl = document.getElementById("manIn");
    const sendBtnEl = document.getElementById("sendBtn");
    const startSTTEl = document.getElementById("startSTT");

    if (manInEl.value.trim() === "") {
        sendBtnEl.disabled = true;
        sendBtnEl.style.opacity = "20%";
        startSTTEl.disabled = false;
        startSTTEl.style.opacity = "100%";
    } else if (manInEl.value.trim() !== "") {
        sendBtnEl.disabled = false;
        sendBtnEl.style.opacity = "100%";
        startSTTEl.disabled = true;
        startSTTEl.style.opacity = "20%";
    }
}

function handleEnter(e) {
    const manInEl = document.getElementById("manIn");
    const sendBtnEl = document.getElementById("sendBtn");
    const startSTTEl = document.getElementById("startSTT")
    if (e.key == "Enter") {
        e.preventDefault();
        if (manInEl.value.trim() !== "") {
            askPiston(manInEl.value);
            manInEl.value = "";
            sendBtnEl.disabled = true;
            sendBtnEl.style.opacity = "20%";
            startSTTEl.disabled = false;
            startSTTEl.style.opacity = "100%";
            return;
        }
    }
}

function positionManIn() {

    const manInEl = document.getElementById("manIn");
    const sendBtnEl = document.getElementById("sendBtn");
    const startSTTEl = document.getElementById("startSTT");

    manInEl.style.right = 10 + startSTTEl.offsetWidth + 7 + 'px';
    manInEl.style.bottom = 10 + 'px';
    sendBtnEl.style.left = startSTTEl.offsetLeft - 5 - sendBtnEl.offsetWidth - 8 + 'px';
    const rel_borders = (manInEl.offsetHeight - sendBtnEl.offsetHeight) / 2;
    sendBtnEl.style.top = manInEl.offsetTop + rel_borders + 'px';
    manInEl.style.paddingRight = 8 + sendBtnEl.offsetWidth + 5 + 'px';
    manInEl.style.width = parseFloat(getComputedStyle(manInEl).fontSize) * 25 - parseFloat(manInEl.style.paddingRight) + 'px';
    if (manInEl.value === "") {
        sendBtnEl.disabled = true;
        startSTTEl.disabled = false;
    } else if (manInEl.value.trim() !== "") {
        sendBtnEl.disabled = false;
        startSTTEl.disabled = true;
    }

    manInEl.removeEventListener("input", handleInput);
    manInEl.addEventListener("input", handleInput);
    
    manInEl.removeEventListener("keydown", handleEnter);
    manInEl.addEventListener("keydown", handleEnter);
}

function modAIBox() {
    const tcEl = document.getElementById("tc");
    const weatherEl = document.getElementById("weather");
    const AIboxEl = document.getElementById("AIbox");
    if (AIboxout === true) {
        const target_y = window.innerHeight - AIboxEl.offsetHeight * 0.16;
        const rel_y = target_y - AIboxEl.offsetTop;
        AIboxEl.style.transform = `translate(0, ${rel_y}px)`;
        AIboxout = false;
    } else if (AIboxout === false) {
        let target_y;
        if (AIboxSuitableEl === "tc") {
            target_y = tcEl.offsetTop + tcEl.offsetHeight + 10;
        } else if (AIboxSuitableEl === "weather") {
            target_y = weatherEl.offsetTop + weatherEl.offsetHeight + 10;
        } else {
            target_y = tcEl.offsetTop + tcEl.offsetHeight + 10;
        }
        const rel_y = target_y - AIboxEl.offsetTop;
        AIboxEl.style.transform = `translate(0, ${rel_y}px)`;
        AIboxout = true;
    }
}
async function requestMic() {
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        micAvailable = false;
        const SRHintEl = document.getElementById("SRHint");
        SRHintEl.style.visibility = "hidden";
        window.microphoneUnavailable = true;
        return;
    }
    try {
        stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        console.log("Microphone access granted!");
    } catch (e) {
        if (e.name === "NotAllowedError" || e === "PermissionDeniedError") {
            alert("Microphone permission has been denied.");
        } else if (e.name === "NotFoundError") {
            alert("Warning: Microphone not found. Make sure a microphone has been connected properly.");
            var micNotFound = true;
        } else {
            console.error(e);
        }
        const SRHintEl = document.getElementById("SRHint");
        SRHintEl.style.visibility = "hidden";   
    }
}

async function checkMicPerm() {
    if (!micAvailable || !navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        return 1;
    }
    if (!navigator.permissions || !navigator.permissions.query) {
        return 2;
    }
    const permissionStat = await navigator.permissions.query({ name: "microphone" });
    console.log(`Microphone permission state = ${permissionStat.state}`);
    if (permissionStat.state === "granted") {
        return 0;
    } else if (permissionStat.state === "denied") {
        return 1;
    } else if (permissionStat.state === "prompt") {
        return 2;
    }
}

function modManIn(hide) {
    const manInEl = document.getElementById("manIn");
    const sendBtnEl = document.getElementById("sendBtn");
    if (hide) {
        manInEl.style.opacity = 0;
        sendBtnEl.style.opacity = 0;
        manInEl.disabled = true;
        setTimeout(() => {
            manInEl.style.visibility = "hidden";
            sendBtnEl.style.visibility = "hidden";
        }, 200);
    } else if (!hide) {
        manInEl.style.visibility = "visible";
        sendBtnEl.style.visibility = "visible";
        manInEl.style.opacity = 100;
        sendBtnEl.style.opacity = 100;
        manInEl.disabled = false;
        if (manInEl.value === "") {
            sendBtnEl.disabled = true;
            sendBtnEl.style.opacity = "20%";
        } else {
            sendBtnEl.disabled = false; 
            sendBtnEl.style.opacity = "100%";
        }
    }
}

function showAbort() {
    const abortSTTEl = document.getElementById("abortSTT");
    const startSTTEl = document.getElementById("startSTT");;

    abortSTTEl.style.visibility = "visible";
    const target_x = -5 - abortSTTEl.offsetWidth + 'px';

    abortSTTEl.style.transform = `translate(${target_x}, 0)`;
    setTimeout(() => {}, 200);
    abortSTTEl.style.opacity = "100%";
    abortSTTEl.disabled = false;

    abortSTTEl.onclick = stopSTT;
}

function hideAbort() {
    const abortSTTEl = document.getElementById("abortSTT");
    const startSTTEl = document.getElementById("startSTT");;

    abortSTTEl.style.opacity = "100%";

    const target_x = startSTTEl.offsetLeft - abortSTTEl.offsetLeft + 'px';

    abortSTTEl.style.transform = `translate(${target_x}, 0)`;
    abortSTTEl.style.visibility = "hidden";
    abortSTTEl.style.disabled = true;
}

async function startRecording() {
    if (medRecorder?.state === "recording") {
        console.log("Already recording");
        recordState = true;
        return;
    } 
    recordState = true;
    modRecordBtn();
    SRBtnEl.removeEventListener("mouseout", removeHint);
    const SRHintEl = document.getElementById("SRHint");
    const SRHintTxtEl = document.getElementById("SRHintTxt");
    SRHintEl.style.visibility = "visible";
    showAbort();
    SRHintTxtEl.textContent = "Listening...";
    try {
        medRecorder = new MediaRecorder(stream, {
            mimeType: "audio/webm;codecs=opus",
            audioBitsPerSecond: 128000
        });
        chunks = [];
        
        medRecorder.ondataavailable = (event) => {
            if (event.data.size > 0) {
                chunks.push(event.data);
            }
        };

        medRecorder.start();
        console.log("Listening");
        modManIn(true);

    } catch (e) {
        console.error("Error listenting: ",e);
        recordState = false;
        modRecordBtn();
        SRBtnEl.addEventListener("mouseout",removeHint);
        SRHintTxtEl.textContent = "Press to start speech recognition";
    }
}

function modRecordBtn() {
    const startSTTEl = document.getElementById("startSTTImg");
    if (recordState === true) {
        startSTTEl.src = "src/src/STTing.png";
    } else if (recordState === false) {
        startSTTEl.src = "src/src/STT.png"
    }
}

let AIboxSuitableEl = "";
function positionAIBox() {
    const AIboxEl = document.getElementById("AIbox");
    const tcEl = document.getElementById("tc");
    const weatherEl = document.getElementById("weather");
    const AIboxRect = AIboxEl.getBoundingClientRect();

    const tcRect = tcEl.getBoundingClientRect();
    const weatherRect = weatherEl.getBoundingClientRect();

    AIbox.style.top = weatherRect.top + weatherRect.height + 10 + 'px';
    AIboxSuitableEl = "weather";
    requestAnimationFrame(() => {
        const overlapsTC = 
            AIboxRect.left < tcRect.right &&
            AIboxRect.right > tcRect.left &&
            AIboxRect.top < tcRect.bottom &&
            AIboxRect.bottom > tcRect.top;

        if (overlapsTC) {
            AIboxEl.style.top = tcRect.top + tcRect.height + 10 + 'px';
            AIboxSuitableEl = "tc";
        }

    })

    const historyMsg = JSON.parse(localStorage.getItem("history"));

    if (historyMsg === null) return;
    
    if (historyMsg.length === 0) return;
    AIboxEl.innerHTML = "";
    for (let i = 0; i < historyMsg.length; i++) {
        if (historyMsg[i].role == "user") {
            const uInputBubble = document.createElement("div");
            uInputBubble.style.padding = "5px 1em 5px 1em";
            uInputBubble.style.border = "0";
            uInputBubble.style.borderRadius = "10px 0 10px 10px";
            uInputBubble.style.backgroundColor = "rgb(86, 147, 245)";
            uInputBubble.style.opacity = "0.8";
            uInputBubble.style.marginLeft = "auto";
            uInputBubble.style.marginRight = "5%";
            uInputBubble.style.width = "fit-content";
            uInputBubble.style.maxWidth = "60%";
            uInputBubble.style.marginBottom = "1em";
            uInputBubble.style.userSelect = "text";
            const uInputEl = document.createElement("p");
            uInputEl.style.color = "white";
            uInputEl.style.userSelect = "text";
            uInputEl.style.cursor = "text";
            uInputEl.textContent = `${historyMsg[i].content}`;
            uInputBubble.appendChild(uInputEl);
            AIboxEl.appendChild(uInputBubble); 
        } else if (historyMsg[i].role === "assistant") {
            renderResponse(historyMsg[i].content, true);
        }
    }

    AIboxEl.scrollTop = AIboxEl.scrollHeight;
    AIboxEl.style.visibility = "visible";
    AIboxout = false;
    modAIBox();
}

async function stopRecording() {
    if (!medRecorder || medRecorder.state !== "recording") {
        recordState = false;
        console.warn("No active recording to stop.");
        modRecordBtn();
        return;
    }

    recordState = false;
    modRecordBtn();
    medRecorder.stop();
    modManIn(false);
    positionAIBox();
    const SRHintEl = document.getElementById("SRHint");
    const SRHintTxtEl = document.getElementById("SRHintTxt");
    AIboxout = false;
    SRHintEl.style.visibility = "visible";
    hideAbort();
    SRHintTxtEl.textContent = "Transcribing...";
    await new Promise(resolve => {
        medRecorder.onstop = resolve;
    })
    const audioBlob = new Blob(chunks, { type: 'audio/webm' });
    const formData = new FormData();
    formData.append("audio", audioBlob, "recording.webm")
    const res = await fetch("https://backend.chanyanyan3205.workers.dev/", {
        method: "POST",
        body: formData
    });
    const data = await res.json();
    SRHintTxtEl.textContent = "Asking Piston AI...";
    const reponse = await askPiston(data.text);
    SRHintTxtEl.textContent = "Press to start recognition";
    SRHintEl.style.visibility = "hidden";
    SRBtnEl.addEventListener("mouseout", removeHint);
}

function saveHistory(role, message) {
    let previousMessage = JSON.parse(localStorage.getItem("history"));
    if (!previousMessage) {
        previousMessage = [];
    }
    const payload = {
        role,
        content: message
    }
    previousMessage.push(payload);
    setLocalItem("history", JSON.stringify(previousMessage));

    if (previousMessage.length > 50 * 2) {
        previousMessage.shift();
        previousMessage.shift();
        setLocalItem("history", JSON.stringify(previousMessage));
        return;
    }
}

function removeHint() {
    document.getElementById("SRHint").classList.remove("show");
    clearTimeout(hintTimer);
}

window.addEventListener("resize", () => {
    positionHint();
    alignClock();
    positionClock();
    positionWeather();
    positionTimerUtils();
    positionTodoBox();
    positionUtilBox();  
    positionWeather();
    positionManIn();
    positionAbort();
    positionAIBox();
    positionSettings();
    renderTasks(); 
    autoRemoveTasks();
})

const setupInputEl = document.getElementById("setup-input");
setupInputEl.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        event.preventDefault();
        setupDone();
    }
});

SRBtnEl.addEventListener("mouseover", () => {
    hintTimer = setTimeout(() => {
        const SRHintEl = document.getElementById("SRHint");
        SRHintEl.classList.add("show");
    }, 500);
});

SRBtnEl.addEventListener("mouseout", removeHint);

SRBtnEl.onclick = async () => {
    let micPerm;
    micPerm = await checkMicPerm();
    if (!micAvailable) {
        alert("Microphone is not supported in this WebView/browser.");
        return;
    }
    if (micPerm === 0) {
    } else if (micPerm === 1) {
        alert("Microphone access has been denied. Please grant it in browser setings or system settings.");
        return;
    } else if (micPerm === 2) {
        await requestMic();
        micPerm = await checkMicPerm();
        if (micPerm === 1) {
            alert("Warning: Microphon access has been denied. Grant it in browser to use Piston AI.");
        } else if (micPerm === 0) {
            console.log("Microphone access granted!");
            return;
        }
    }

    if (recordState === false) {
        startRecording();
    } else {
        stopRecording();
    }
    
}

const sendBtnEl = document.getElementById("sendBtn");
sendBtnEl.onclick = () => {
    const manInEl = document.getElementById("manIn");
    const startSTTEl = document.getElementById("startSTT");
    response = askPiston(manInEl.value);
    manInEl.value = "";
    sendBtnEl.disabled = true;
    startSTTEl.disabled = false;
}

function addMemory(message) {
    console.log(message.length);
    if (message.length === 0) {
        return;
    } else {
        let memory = JSON.parse(localStorage.getItem("memory"));
        const memoryAddNotiEl = document.getElementById("memoryAddNoti");
        const memorydescriptionEl = document.getElementById("memorydescription");
        if (!memory) {
            setLocalItem("memory","[]");
            memory = [];
        }
        memory.push(message);
        setLocalItem("memory",JSON.stringify(memory));
        noVerboseAsk(`Tell ${localStorage.getItem("username")} that you have remembered about "${message}".`);
        memoryAddNotiEl.style.transform = `translate(0, ${memoryAddNotiEl.offsetHeight + 5 + 'px'})`;
        memoryAddNotiEl.style.visibility = "visible";
        memoryAddNotiEl.style.top = memoryAddNotiEl.offsetHeight + 5 + 'px';
        memorydescriptionEl.textContent = `The memory: "${message}" has been added`;
        setTimeout(() => {
            memoryAddNotiEl.style.transform = `translate(0, ${-memoryAddNotiEl.offsetHeight + 5 + 'px'})`;
            setTimeout(() => {
                memoryAddNotiEl.style.visibility = "hidden"
            }, 500);
        }, 3000);
    }
}

async function noVerboseAsk(uInput) {
    const AIboxEl = document.getElementById("AIbox");
    try {
        AIboxEl.style.visibility = "visible";
        if (!AIboxout) { modAIBox(); };
        const now = new Date(); 
        const result = await fetch("https://piston-ai.chanyanyan3205.workers.dev", {
            method: "POST",
            headers: {
                "Content-Type":"application/json"
            },
            body: JSON.stringify({
                prompt: uInput
            })
        });
        if (!result.ok) {
            throw `POST https://chanyanyan3205.cloudflare.com/ ${result.statusText}`;
        }
        const response = await result.json();
        saveHistory("assistant", response.reply);
        const pisRes = document.createElement("p");
        pisRes.style.color = "#a6ff01";
        pisRes.style.userSelect = "text";
        pisRes.style.cursor = "text";
        pisRes.style.marginTop = "5px";
        pisRes.textContent = response.reply;
        AIboxEl.appendChild(pisRes);
        const lineBreak = document.createElement("br");
        lineBreak.style.lineHeight = 2.0;
        AIboxEl.appendChild(lineBreak);
    } catch (e) {
        const pisRes = document.createElement("p");
        pisRes.style.color = "#a6ff01";
        pisRes.style.userSelect = "text";
        pisRes.style.cursor = "text";
        pisRes.style.marginTop = "5px";
        pisRes.textContent = `Error: ${e.state}, ${e}`;
        AIboxEl.appendChild(pisRes);
    }
}

function renderResponse(output, initialCreation) {
    const AIboxEl = document.getElementById("AIbox");   
    if (initialCreation) {
        const pisResBubble = document.createElement("div");
        pisResBubble.style.color = "gray";
        pisResBubble.style.backgroundColor = "#a6ff01";
        pisResBubble.style.borderRadius = "0px 10px 10px 10px";
        pisResBubble.style.padding = "5px 1em 5px 1em";
        pisResBubble.style.marginRight = "auto";
        pisResBubble.style.marginLeft = "5%";
        pisResBubble.style.width = "fit-content"
        pisResBubble.style.maxWidth = "60%";
        pisResBubble.style.marginBottom = "1em";
        pisResBubble.style.userSelect = "text";
        pisResBubble.innerHTML = marked.parse(output);
        pisResBubble.id = "pisResBubble";
        const bubbleElements = pisResBubble.querySelectorAll("*");

        AIboxEl.appendChild(pisResBubble);
        AIboxEl.lastElementChild.scrollIntoView({ behavior: 'smooth', 'block': 'end' });

        bubbleElements.forEach(el => {
            el.style.color = 'gray';
        })
    } else {
        const pisResBubble = document.getElementById("pisResBubble");
        pisResBubble.innerHTML = marked.parse(output);
        AIboxEl.lastElementChild.scrollIntoView({ behavior: 'smooth', 'block': 'end' });
        const bubbleElements = pisResBubble.querySelectorAll("*");
        bubbleElements.forEach(el => {
            el.style.color = 'gray';
        })
    }
}

async function askPiston(uInput) {
    const AIboxEl = document.getElementById("AIbox");
    try {
        AIboxEl.style.visibility = "visible";

        let historyMsg = localStorage.getItem("history");
        if (!historyMsg) {
            historyMsg = [];
        } else {
            historyMsg = JSON.parse(historyMsg);
        }
        
        const clearPromptEl = document.getElementById("clearPrompt");
        if (clearPromptEl) {
            clearPromptEl.remove();
            const brEl = AIbox.querySelectorAll("br");
            brEl.forEach(br => {
                br.parentNode.removeChild(br);
            })
        }

        const uInputBubble = document.createElement("div");
        uInputBubble.style.padding = "5px 1em 5px 1em";
        uInputBubble.style.border = "0";
        uInputBubble.style.borderRadius = "10px 0 10px 10px";
        uInputBubble.style.backgroundColor = "rgb(86, 147, 245)";
        uInputBubble.style.opacity = "0.8";
        uInputBubble.style.marginLeft = "auto";
        uInputBubble.style.marginRight = "5%";
        uInputBubble.style.width = "fit-content";
        uInputBubble.style.maxWidth = "60%";
        uInputBubble.style.marginBottom = "1em";
        const uInputEl = document.createElement("p");
        uInputEl.style.color = "white";
        uInputEl.style.userSelect = "text";
        uInputEl.style.cursor = "text";
        uInputEl.textContent = `${uInput}`;
        uInputBubble.appendChild(uInputEl);
        AIboxEl.appendChild(uInputBubble); 
        if (!AIboxout) { modAIBox(); };
        
        saveHistory("user",uInput);
        const now = new Date();
        let AdditionalData = `Additional data: \nweather data:${localStorage.getItem("weatherData")}\ndate (DD/MM/YYYY): ${now.getDate().toString().padStart(2,"0")}/${now.getMonth().toString().padStart(2,"0")}/${now.getFullYear}\ntime (hour:minute): ${now.getHours().toString().padStart(2,"0")}:${now.getMinutes().toString().padStart(2,"0")}\nuser todo list:${localStorage.getItem("todoList")}\ncurrent quote of the day: ${localStorage.getItem("quote")}`;
        const payload = {
            prompt: `${uInput}

            ${AdditionalData}`,
            history: historyMsg
        }
        const result = await fetch("https://piston-ai.chanyanyan3205.workers.dev", 
            {
                "method":"POST",
                'headers': {
                    'Content-Type': 'application/json'
                }, 
                body: JSON.stringify(payload)
            }
        )
        const reader = await result.body.getReader();
        const decoder = new TextDecoder();
        let initialCreation = true;
        
        let fullMsg = [];
        while (true) {
            const { done, value } = await reader.read();
            if (done) break;

            const chunk = decoder.decode(value, { stream: true });
            const lines = chunk.split("\n");

            for (const line of lines) {
                const trimmedLine = line.trim();
                if (!trimmedLine || !trimmedLine.startsWith("data:")) continue;

                const dataStr = trimmedLine.replace(/^data:\s*/, "");
                if (dataStr === "[DONE]") break;

                const parsed = JSON.parse(dataStr);
                const content = parsed.response;
                console.log(content);

                fullMsg.push(content);
                console.log(fullMsg.join(""));
                renderResponse(fullMsg.join(""), initialCreation);

                if (initialCreation) {
                  initialCreation = false;
                }
            }
        }
        const pisResBubble = document.getElementById("pisResBubble");
        pisResBubble.id = "";
        fullMsg = fullMsg.join("");
        saveHistory("assistant",fullMsg);
        if (fullMsg === "chat.clear") {
            const AIboxEl = document.getElementById("AIbox");
            AIboxEl.innerHTML = "";
            localStorage.setItem("history","[]");
            renderResponse("Chat cleared! Let's start fresh!", true);
            const pisResBubble = document.getElementById("pisResBubble");
            pisResBubble.id = "";
            return;
        }
    } catch (e) {
        console.error("Failed to ask Piston AI.", e);
    }
}
function positionHint() {
    const Hint = document.getElementById("SRHint");
    const SRBtn = document.getElementById("startSTT");

    const rect = SRBtn.getBoundingClientRect();
    const target_y = rect.top - rect.height / 2 - 10 + 'px';
    console.log(target_y);

    Hint.style.top = target_y;
}

function stopSTT() {
    const SRHintTxtEl = document.getElementById("SRHintTxt");
    const SRHintEl = document.getElementById("SRHint");
    if (recordState) {
        console.log("Recording aborted!");
        medRecorder.stop();
        recordState = false;
        modRecordBtn();
        hideAbort();
        SRHintTxtEl.textContent = "Press to start recognition";
        SRHintEl.style.visibility = "hidden";
        SRBtnEl.addEventListener("mouseout", removeHint);
        modManIn(true);
    } else {
        console.warn("No recording is currently in progress.");
    }
}

function positionAbort() {
    const abortSTTEl = document.getElementById("abortSTT");
    const startSTTEl = document.getElementById("startSTT");
    
    abortSTTEl.style.left = startSTTEl.offsetLeft;
    abortSTTEl.style.top = startSTTEl.offsetTop;

    abortSTTEl.disabled = true;
    abortSTTEl.style.visibility = "hidden";
    
    abortSTTEl.onclick = stopSTT;
    
}

function updateClock() {
    const now = new Date();
    let hour = now.getHours().toString().padStart(2,"0");
    let minute = now.getMinutes().toString().padStart(2,"0");

    const hourEl = document.getElementById("hour");
    const minuteEl = document.getElementById("minute");

    hourEl.textContent = hour;
    minuteEl.textContent = minute;

    const weekdayEl = document.getElementById("weekday");
    const dateEl = document.getElementById("date");
    
    const weekdays = [
        "Sun",
        "Mon",
        "Tue",
        "Wed",
        "Thu",
        "Fri",
        "Sat"
    ]

    let weekday = now.getDay();
    let dateRN = now.getDate().toString();

    weekdayEl.textContent = weekdays[weekday];
    dateEl.textContent = dateRN;
}
function alignClock() {
    updateClock();
    const now = new Date();
    const remainingSecs = 60 - now.getSeconds();
    setTimeout(() => {
        updateClock();
        setInterval(() => {
            updateClock();
            positionClock();
        },60000);
    }, remainingSecs * 1000);
}

function setupFSMode() {
    const fullscreenFocusModeEl = document.getElementById("fullscreenFocusMode");
    fullscreenFocusModeEl.onclick = () => {
        if (fullscreenMode) {
            exitFullscreenMode();
        } else {
            startFullscreenMode();
        }
    }
}

function startFullscreenMode() {

}

function exitFullscreenMode() {

}

function positionClock() {
    const clockEl = document.getElementById("tc");
    const greeting = document.getElementById("greeting");    
    const hourEl = document.getElementById("hour");
    const minuteEl = document.getElementById("minute");
    const colonEl = document.getElementById("colon"); 

    clockEl.style.width = (hourEl.offsetWidth + minuteEl.offsetWidth + colonEl.offsetWidth + parseInt(window.getComputedStyle(clockEl).getPropertyValue("padding-left"))) + 5 + 'px';

    const rect = greeting.getBoundingClientRect();
    clockEl.style.top = greeting.offsetTop + greeting.offsetHeight + 32 + 'px';
    clockEl.style.right = rect.left - 3 + 'px';
}

function positionWeather() {
    const weatherEl = document.getElementById("weather");
    const tcEl = document.getElementById("tc");

    weatherEl.style.top = tcEl.offsetTop + 'px';

    weatherEl.style.right = "10%";
}

function positionTimerUtils() {
    const timerUtilsEl = document.getElementById("timerUtils");
    const weatherEl = document.getElementById("weather");
    timerUtilsEl.style.top = `${weatherEl.offsetTop}px`;
    timerUtilsEl.style.left = `${weatherEl.offsetLeft + weatherEl.offsetWidth + 10}px`;
    
    const stopwatchBtnEl = document.getElementById("stopwatchBtn");
    const timerBtnEl = document.getElementById("timerBtn");

    stopwatchBtnEl.onclick = () => { // checkpoint for easy searching: stopwatchbtnClick
        if (window.utilBoxState === "" || window.utilBoxState === "timer") {
            const utilBoxItemsEl = document.getElementById("utilBoxItems");
            const utilBoxEl = document.getElementById("utilBox");
            if (timerTicking && window.utilBoxState === "timer") {
                localStorage.setItem("timestampBeforePausingTimer", String(Date.now()));
                const timerMinutesAEl = document.getElementById("timerMinutesA");
                const timerSecondsAEl = document.getElementById("timerSecondsA");
                localStorage.setItem("timerCount", JSON.stringify({
                    minutes: timerMinutesAEl.textContent,
                    seconds: timerSecondsAEl.textContent
                }));
                utilBoxItemsEl.innerHTML = window.utilBoxPages[0];
            };
            utilBoxItemsEl.innerHTML = window.utilBoxPages[0];
            clearInterval(window.timerValue);
            window.timerValue = null
            utilBoxEl.style.visibility = "visible";
            const TUTitleEl = document.getElementById("TUTitle");
            TUTitleEl.textContent = "Stopwatch";
            window.utilBoxState = "stopwatch";
            const startStopwatchEl = document.getElementById("startStopwatch");
            startStopwatchEl.onclick = () => {
                startStopwatch();
            };
            if (stopwatchTicking) {
                const cachedTS = parseInt(localStorage.getItem("timestampStopwatchBeforePause"));
                const stopwatchCount = JSON.parse(localStorage.getItem("stopwatchCount"));
                console.log(cachedTS, stopwatchCount);
                const timeInBetween = getTimeInBetween(cachedTS, Date.now());
                const calcMinutes = parseInt(stopwatchCount.minutes) + timeInBetween[0];
                const calcSeconds = parseInt(stopwatchCount.seconds) + timeInBetween[1];
                startStopwatch(calcMinutes, calcSeconds);
                if (stopwatchPaused) {
                    startStopwatch(parseInt(stopwatchCount.minutes), parseInt(stopwatchCount.seconds));
                    pauseStopwatch();
                }
            }
        } else if (window.utilBoxState !== "") {
            if (stopwatchTicking) {
                localStorage.setItem("timestampStopwatchBeforePause", String(Date.now()));
                const stopwatchMinutesEl = document.getElementById("stopwatchMinutes");
                const stopwatchSecondsEl = document.getElementById("stopwatchSeconds");
                localStorage.setItem("stopwatchCount", JSON.stringify({
                    minutes: stopwatchMinutesEl.textContent,
                    seconds: stopwatchSecondsEl.textContent
                }));
            };
            const utilBoxEl = document.getElementById("utilBox"); 
            utilBoxEl.style.opacity = "0";
            window.utilBoxState = "";
            utilBoxEl.addEventListener("transitionend",() => {
                utilBoxEl.style.visibility = "hidden";
                const utilBoxItemsEl = document.getElementById("utilBoxItems");
                utilBoxItemsEl.innerHTML = "";
                utilBoxEl.style.opacity = "1";
            }, { once: true });
        }
    };

    timerBtnEl.onclick = () => { // checkpoint for easy searching: timerbtnClick
        if (window.utilBoxState === "" || window.utilBoxState === "stopwatch") { // checkpoint for easy searching: openTimerPop
            const utilBoxItemsEl = document.getElementById("utilBoxItems");
            if (stopwatchTicking && window.utilBoxState === "stopwatch") {
                localStorage.setItem("timestampStopwatchBeforePause", String(Date.now()));
                const stopwatchMinutesEl = document.getElementById("stopwatchMinutes");
                const stopwatchSecondsEl = document.getElementById("stopwatchSeconds");
                localStorage.setItem("stopwatchCount", JSON.stringify({
                    minutes: stopwatchMinutesEl.textContent,
                    seconds: stopwatchSecondsEl.textContent
                }));
            };
            utilBoxItemsEl.innerHTML = window.utilBoxPages[1];
            window.utilBoxState = "timer";
            const utilBoxEl = document.getElementById("utilBox");
            utilBoxEl.style.visibility = "visible";
            const TUTitleEl = document.getElementById("TUTitle");
            TUTitleEl.textContent = "Timer";
            const startTimerEl = document.getElementById("startTimer");
            startTimerEl.disabled = true;
            const timerMinutesEl = document.getElementById("timerMinutes");
            const timerSecondsEl = document.getElementById("timerSeconds");
            timerMinutesEl.addEventListener("change", () => {
                timerMinutesEl.value = timerMinutesEl.value.padStart(2,"0");
                const minutes = parseInt(timerMinutesEl.value);
                const seconds = parseInt(timerSecondsEl.value);
                if (!minutes && !seconds) {
                    startTimerEl.disabled = true;
                } else {
                    startTimerEl.disabled = false;
                };
            });
            timerSecondsEl.addEventListener("change", () => {
                timerSecondsEl.value = timerSecondsEl.value.padStart(2,"0");
                const minutes = parseInt(timerMinutesEl.value);
                const seconds = parseInt(timerSecondsEl.value);
                if (!minutes && !seconds) {
                    startTimerEl.disabled = true;
                } else {
                    startTimerEl.disabled = false;
                };
            });
            startTimerEl.onclick = () => {
                startTimer();
            }

            if (timerTicking) {
                const utilBoxItemsEl = document.getElementById("utilBoxItems");
                utilBoxItemsEl.innerHTML = window.utilBoxPages[2];
                pickupTimer();
                if (timerPaused) {
                    pauseTimer();
                }
            }
        } else if (window.utilBoxState !== "") { // checkpoint for easy searching: minTimerPop
            if (timerTicking) {
                localStorage.setItem("timestampBeforePausingTimer", String(Date.now()));
                const timerMinutesAEl = document.getElementById("timerMinutesA");
                const timerSecondsAEl = document.getElementById("timerSecondsA");
                localStorage.setItem("timerCount", JSON.stringify({
                    minutes: timerMinutesAEl.textContent,
                    seconds: timerSecondsAEl.textContent
                }));
            }
            clearInterval(window.timerValue);
            window.timerValue = null;
            window.utilBoxState = "";
            const utilBoxEl = document.getElementById("utilBox");
            utilBoxEl.style.opacity = "0";
            utilBoxEl.addEventListener("transitionend",() => {
                utilBoxEl.style.visibility = "hidden";
                const utilBoxItemsEl = document.getElementById("utilBoxItems");
                utilBoxItemsEl.innerHTML = "";
                utilBoxEl.style.opacity = "1";
            }, { once: true });
        }
    }
}

function pickupTimer() {
    const utilBoxItemsEl = document.getElementById("utilBoxItems");
    utilBoxItemsEl.innerHTML = window.utilBoxPages[2];
    const timestampBeforePausingTimer = localStorage.getItem("timestampBeforePausingTimer");
    const timerSecondsAEl = document.getElementById("timerSecondsA");
    const timerMinutesAEl = document.getElementById("timerMinutesA");

    const timerCount = JSON.parse(localStorage.getItem("timerCount"));
    timerMinutesAEl.textContent = timerCount.minutes;
    console.log(timerCount.minutes);
    timerSecondsAEl.textContent = timerCount.seconds;
    console.log(timerCount.seconds);
    if (timerPaused) {
        pauseTimer();
        return;
    } 
    timeInBetween = getTimeInBetween(localStorage.getItem('timestampBeforePausingTimer'), Date.now());
    timerMinutesAEl.textContent = String(parseInt(timerMinutesAEl.textContent) - timeInBetween[0]).padStart(2,"0");
    timerSecondsAEl.textContent = String(parseInt(timerSecondsAEl.textContent) - timeInBetween[1]).padStart(2,"0");
    const diff = 1000 - (timestampBeforePausingTimer % 1000);
    console.log(diff);
    setTimeout(() => {
        const targetTime = localStorage.getItem("timerTarget");
        const currentTime = Date.now();
        if (currentTime > targetTime) {
            timerTimeout();
        } else {
            if (timerSecondsAEl.textContent === "00") {
                timerSecondsAEl.textContent = "59";
                timerMinutesAEl.textContent = String(Number(timerMinutesAEl.textContent) - 1).padStart(2, "0");
            } else {
                timerSecondsAEl.textContent = String(Number(timerSecondsAEl.textContent) - 1).padStart(2, "0");
            }
        }
        window.timerValue = setInterval(() => {
            const targetTime = localStorage.getItem("timerTarget");
            const currentTime = Date.now();
            if (currentTime > targetTime) {
                timerTimeout();
            } else {
                if (timerSecondsAEl.textContent === "00") {
                    timerSecondsAEl.textContent = "59";
                    timerMinutesAEl.textContent = String(Number(timerMinutesAEl.textContent) - 1).padStart(2, "0");
                } else {
                    timerSecondsAEl.textContent = String(Number(timerSecondsAEl.textContent) - 1).padStart(2, "0");
                }
            }
        }, 1000);
    }, diff);
}

function getTimeInBetween(past, present) {
    // This function gets the difference between two given timestamps. The format of milliseconds elapsed since the Unix epoch. 
    if (past > present) {
        return;
    }
    const diffMs = present - past;
    const diffMins = diffMs / (1000 * 60);
    const diffMinsStatic = Math.floor(diffMins);
    const diffSecsStatic = Math.floor((diffMins - diffMinsStatic) * 60);
    return [diffMinsStatic, diffSecsStatic];
}

function startTimer(bypassCaching=false) {
    const utilBoxItemsEl = document.getElementById("utilBoxItems");
    const timerMinutesEl = document.getElementById("timerMinutes");
    const timerSecondsEl = document.getElementById("timerSeconds");
    utilBoxItemsEl.innerHTML = window.utilBoxPages[2];
    let minutes = parseInt(timerMinutesEl.value);
    let seconds = parseInt(timerSecondsEl.value);

    timerTicking = true;

    const timerCache = {
        minutes,
        seconds
    };
    localStorage.setItem("timerStartTime", String(Date.now()));
    const secondsMS = seconds / 60 * 60000;
    const minutesMS = minutes * 60000;
    const finalMS = secondsMS + minutesMS;
    localStorage.setItem("timerTarget", String(Date.now() + finalMS));
    if (!bypassCaching) {
        localStorage.setItem("timerCache",JSON.stringify(timerCache));
    }

    const resetTimerEl = document.getElementById("resetTimer");
    resetTimerEl.onclick = () => {
        resetTimer();
    }

    const pauseTimerEl = document.getElementById("pauseTimer");
    pauseTimerEl.onclick = () => {
        pauseTimer();
    }

    const timerMinutesAEl = document.getElementById("timerMinutesA");
    const timerSecondsAEl = document.getElementById("timerSecondsA");
    timerMinutesAEl.textContent = String(minutes).padStart(2, "0");
    timerSecondsAEl.textContent = String(seconds).padStart(2,"0");

    window.timerValue = setInterval(() => {
        const targetTime = localStorage.getItem("timerTarget");
        const currentTime = Date.now();
        if (currentTime > targetTime) {
            timerTimeout();
        } else {
            if (timerSecondsAEl.textContent === "00") {
                timerSecondsAEl.textContent = "59";
                timerMinutesAEl.textContent = String(Number(timerMinutesAEl.textContent) - 1).padStart(2, "0");
            } else {
                timerSecondsAEl.textContent = String(Number(timerSecondsAEl.textContent) - 1).padStart(2, "0");
            }
        }
    }, 1000);
    initWatchDogTimer();
}

function resumeTimer() {
    const timerMinutesAEl = document.getElementById("timerMinutesA");
    const timerSecondsAEl = document.getElementById("timerSecondsA");
    let minutes = parseInt(timerMinutesAEl.textContent);
    let seconds = parseInt(timerSecondsAEl.textContent);
    timerMinutesAEl.textContent = String(minutes).padStart(2, "0");
    timerSecondsAEl.textContent = String(seconds).padStart(2,"0");

    localStorage.setItem("timerStartTime", String(Date.now()));
    initWatchDogTimer();

    const startTime = localStorage.getItem("timerStartTime")
    const timerPausedVal = Number(localStorage.getItem("timerPausedVal"));
    const targetTime = Number(localStorage.getItem("timerTarget"));
    const newTargetTime = String(Date.now() + (targetTime - timerPausedVal));
    localStorage.setItem("timerTarget", newTargetTime);
    const diff = 1000 - (startTime % 1000);

    setTimeout(() => {
        if (timerSecondsAEl.textContent === "00") {
            if (Date.now() > newTargetTime) {
                timerTimeout();
            } else {
                timerSecondsAEl.textContent = "59";
                timerMinutesAEl.textContent = String(Number(timerMinutesAEl.textContent) - 1).padStart(2, "0");
            }
        } else {
            timerSecondsAEl.textContent = String(Number(timerSecondsAEl.textContent) - 1).padStart(2, "0");
        }
        window.timerValue = setInterval(() => {
            const targetTime = localStorage.getItem("timerTarget");
            const currentTime = Date.now();
            if (currentTime > targetTime) {
                timerTimeout();
            } else {
                if (timerSecondsAEl.textContent === "00") {
                    timerSecondsAEl.textContent = "59";
                    timerMinutesAEl.textContent = String(Number(timerMinutesAEl.textContent) - 1).padStart(2, "0");
                } else {
                    timerSecondsAEl.textContent = String(Number(timerSecondsAEl.textContent) - 1).padStart(2, "0");
                }
            }
        }, 1000);
}   , diff);
}

function timerTimeout() {
    clearInterval(window.timerValue);
    window.timerValue = null;
    const utilBoxItemsEl = document.getElementById("utilBoxItems");
    utilBoxItemsEl.innerHTML = window.utilBoxPages[3];
    const timeoutResetEl = document.getElementById("timeoutReset");
    timeoutResetEl.onclick = () => {
        resetTimer();
    }
}

function resetTimer() {
    timerTicking = false;
    timerPaused = false;
    localStorage.removeItem("timerStartTime");
    const utilBoxItemsEl = document.getElementById("utilBoxItems");
    utilBoxItemsEl.innerHTML = window.utilBoxPages[1];
    const timerMinutesEl = document.getElementById("timerMinutes");
    const timerSecondsEl = document.getElementById("timerSeconds");
    if (window.timerValue !== null) {
        clearInterval(window.timerValue);
    }
    const parsedTimerCache = JSON.parse(localStorage.getItem("timerCache"));
    timerMinutesEl.value = String(parsedTimerCache.minutes).padStart(2,"0");
    timerSecondsEl.value = String(parsedTimerCache.seconds).padStart(2,"0");
    localStorage.removeItem("timerCount");
    localStorage.removeItem("timerCache");
    localStorage.removeItem("timestampBeforePausingTimer");
    const startTimerEl = document.getElementById("startTimer");
    if (!parsedTimerCache.minutes && !parsedTimerCache.seconds) {
        startTimerEl.disabled = true;
    } else {
        startTimerEl.disabled = false;
    }
    timerMinutesEl.addEventListener("change", () => {
        const minutes = parseInt(timerMinutesEl.value);
        const seconds = parseInt(timerSecondsEl.value);
        if (!minutes && !seconds) {
            startTimerEl.disabled = true;
        } else {
            startTimerEl.disabled = false;
        };
    });
    timerSecondsEl.addEventListener("change", () => {
        const minutes = parseInt(timerMinutesEl.value);
        const seconds = parseInt(timerSecondsEl.value);
        if (!minutes && !seconds) {
            startTimerEl.disabled = true;
        } else {
            startTimerEl.disabled = false;
        };
    });
    startTimerEl.onclick = () => {
        startTimer();
    }
}

function pauseTimer() {
    const pauseTimerImgEl = document.getElementById("pauseTimerImg");
    if (pauseTimerImgEl.src.includes("src/src/pausetimer.png")) {
        pauseTimerImgEl.src = "src/src/resumetimer.png";
        clearInterval(window.timerValue);
        timerPaused = true;
        localStorage.setItem("timerPausedVal", String(Date.now()));
        localStorage.removeItem("timerStartTime");
    } else {
        pauseTimerImgEl.src = "src/src/pausetimer.png";
        resumeTimer();
        timerPaused = false;
    }
}

function startStopwatch(pickupMinutes, pickUpSeconds) {
    stopwatchTicking = true;
    localStorage.setItem("stopwatchStartTime", String(Date.now()));
    const utilBoxItemsEl = document.getElementById("utilBoxItems");
    utilBoxItemsEl.innerHTML = window.utilBoxPages[4];
    const stopwatchMinutesEl = document.getElementById("stopwatchMinutes");
    const stopwatchSecondsEl = document.getElementById("stopwatchSeconds");
    const stopwatchActiveContainerEl = document.getElementById("stopwatchActiveContainer");
    stopwatchActiveContainerEl.style.visibility = "visible";

    const pauseStopwatchEl = document.getElementById("pauseStopwatch");

    pauseStopwatchEl.onclick = () => {
        const pauseStopwatchImgEl = document.getElementById("pauseStopwatchImg");
        if (pauseStopwatchImgEl.src.includes("src/src/pausetimer.png")) {
            pauseStopwatch();
        } else {
            resumeStopwatch();
        }
    }

    const resetStopwatchEl = document.getElementById("resetStopwatch");
    resetStopwatchEl.onclick = () => {
        resetStopwatch();
    }
    
    stopwatchMinutesEl.textContent = String(pickupMinutes).padStart(2,"0");
    stopwatchSecondsEl.textContent = String(pickUpSeconds).padStart(2,"0");

    if (stopwatchMinutesEl.textContent === "undefined") {
        stopwatchMinutesEl.textContent = "00";
    }

    if (stopwatchSecondsEl.textContent === "undefined") {
        stopwatchSecondsEl.textContent = "00";
    }
    window.stopwatchValue = setInterval(() => {
        const seconds = String((parseInt(stopwatchSecondsEl.textContent) + 1)).padStart(2,"0");

        if (seconds === "60") { // to the reviewers: this statement is not 59 is cuz this action runs in a split of a second, which no one can actually see 60 coming out. But instead, they see 00.
            const minutes = String((parseInt(stopwatchMinutesEl.textContent) + 1)).padStart(2,"0");
            stopwatchMinutesEl.textContent = minutes;
            stopwatchSecondsEl.textContent = "00";
        } else {
            stopwatchSecondsEl.textContent = seconds;
        }
    }, 1000);
}

function resetStopwatch() {
    stopwatchPaused = false;
    stopwatchTicking = false;
    clearInterval(window.stopwatchValue);
    localStorage.removeItem("stopwatchStartTime");
    const utilBoxItemsEl = document.getElementById("utilBoxItems");
    utilBoxItemsEl.innerHTML = window.utilBoxPages[0];
    const startStopwatchEl = document.getElementById("startStopwatch");
    startStopwatchEl.onclick = () => {
        startStopwatch();
    }
}

function resumeStopwatch() {
    stopwatchPaused = false;
    const stopwatchMinutesEl = document.getElementById("stopwatchMinutes");
    const stopwatchSecondsEl = document.getElementById("stopwatchSeconds");
    const pauseStopwatchImgEl = document.getElementById("pauseStopwatchImg");
    pauseStopwatchImgEl.src = "src/src/pausetimer.png"
    localStorage.setItem("stopwatchStartTime", String(Date.now()));

    window.stopwatchValue = setInterval(() => {
        const seconds = String((parseInt(stopwatchSecondsEl.textContent) + 1)).padStart(2,"0");

        stopwatchSecondsEl.textContent = seconds;
        if (seconds === "59") {
            const minutes = String((parseInt(stopwatchMinutesEl.textContent) + 1)).padStart(2,"0");
            stopwatchMinutesEl = minutes;
            stopwatchSecondsEl = "00";
        }
    }, 1000);
}

function pauseStopwatch() {
    stopwatchPaused = true;
    clearInterval(window.stopwatchValue);
    localStorage.removeItem("stopwatchStartTime");
    const pauseStopwatchImgEl = document.getElementById("pauseStopwatchImg");
    pauseStopwatchImgEl.src = "src/src/resumetimer.png";
}

function positionUtilBox() {
    window.utilBoxPages = [
        `
            <div style="display: flex; flex-direction: row; justify-content: center; font-weight: 200; font-size: 3em;">
                <h1 id="">00</h1>
                <h1>:</h2>
                <h1 id="">00</h1>
            </div>
            <button id="startStopwatch">Start stopwatch</button>
        `,
        `
            <div style="display: flex; flex-direction: row; justify-content: center; align-items: center;">
                <input inputmode="numeric" value="00" type="number" id="timerMinutes" class="timerInputFields" min="0"  max="99" step="1" />
                <h1>:</h1>
                <input inputmode="numeric" value="00" type="number" id="timerSeconds" class="timerInputFields" min="0"  max="59" step="1" />
            </div>
            <div style="display: flex; flex-direction: row; justify-content: center; align-items: center;">
                <h1>MM:SS</h1>
            </div>
            <button id="startTimer" disabled="true" >Start timer</button>
        `,
        `
            <div style="display: flex; flex-direction: row; justify-content: center; align-items: center; font-size: 3em">
                <h1 id="timerMinutesA">00</h1>
                <h1>:</h1>
                <h1 id="timerSecondsA">00</h1>
            </div>
            <div style="display: flex; flex-direction: row; justify-content: center; align-items: center;">
                <button class="timerActiveBtn" id="pauseTimer">
                    <img id="pauseTimerImg" src="src/src/pausetimer.png">
                </button>
                <button class="timerActiveBtn" id="resetTimer">
                    <img src="src/src/stoptimer.png">
                </button>
            </div>
        `,
        `
            <div style="display: flex; flex-direction: column; justify-content: center; align-items: center;">
                <h1>Time's up!</h1>
                <button id="timeoutReset">
                    Reset timer
                </button>
            </div>
        `,
        `
            <div style="display: flex; flex-direction: row; justify-content: center; font-weight: 200; font-size: 3em;">
                <h1 id="stopwatchMinutes">00</h1>
                <h1>:</h2>
                <h1 id="stopwatchSeconds">00</h1>
            </div>
            <div id="stopwatchActiveContainer"style="display: flex; flex-direction: row; justify-content: center; font-weight: 200; visibility:hidden">
                <button id="pauseStopwatch" class="stopwatchBtns">
                    <img id="pauseStopwatchImg" src="src/src/pausetimer.png">
                </button>
                <button id="resetStopwatch" class="stopwatchBtns">
                    <img id="resetStopwatchImg" src="src/src/stoptimer.png">
                </button>
            </div>
        `
    ];
    window.utilBoxState = "";
    const utilBoxEl = document.getElementById("utilBox");
    const weatherEl = document.getElementById("weather");
    const todoBoxEl = document.getElementById("todoBox");
    const AIboxEl = document.getElementById("AIbox");
    utilBoxEl.style.width = todoBoxEl.getBoundingClientRect().width + 'px'; 
    utilBoxEl.style.top = weatherEl.getBoundingClientRect().top + weatherEl.getBoundingClientRect().height + 25 + 'px';
    AIboxEl.style.visibility = "visible";
    utilBoxEl.style.left = AIboxEl.getBoundingClientRect().left + AIboxEl.getBoundingClientRect().width + 25 + 'px';
    AIboxEl.style.visibility = "hidden";
}

function initWatchDogTimer() {
    window.timerWatchDog = setInterval(() => {
        const targetTime = localStorage.getItem("timerTarget");
        const currentTime = Date.now();
        
        if (currentTime > targetTime) {
            timerTimeout();
        }
    }, 500);
}

async function getWeather() {
    const codes = { 0: "clear", 1: "mostly clear", 2: "partly cloudy", 3: "overcast", 45: "foggy", 48: "foggy", 51: "light drizzle", 61: "rain", 80: "rain showers", 95: "thunderstorm"};
    try {
        const response = await fetch("https://piston-ai.chanyanyan3205.workers.dev/weather");
        const data = await response.json();
        console.log(data);

        const temp = data.current_weather.temperature.toString();
        const code = codes[data.current_weather.weathercode];
        const tempUnit = data.current_weather_units.temperature;

        const tempEl = document.getElementById("temp");
        const weatherText = document.getElementById("weatherText");
        const weatherData = document.getElementById("weatherData");

        tempEl.textContent = temp + tempUnit;
        weatherText.textContent = code;
        const imageName = String(code).toLowerCase().replace(/\s+/g, '-');
        weatherData.src = `./src/src/${imageName}.png`
        
        console.log(temp,tempUnit," ",code,);
        setLocalItem("weatherData",JSON.stringify(data));
    } catch (e) {
        console.log(`Failed to get weather: ${e}`);
        console.log("Fallback. Using cached data.");

        const data = JSON.parse(localStorage.getItem("weatherData"));
        console.log(data);
        const temp = data.current_weather.temperature.toString();
        const code = codes[data.current_weather.weathercode];
        const tempUnit = data.current_weather_units.temperature;

        const tempEl = document.getElementById("temp");
        const weatherText = document.getElementById("weatherText");
        const weatherData = document.getElementById("weatherData");

        tempEl.textContent = temp + tempUnit;
        weatherText.textContent = code;
        const imageName = String(code).toLowerCase().replace(/\s+/g, '-');
        weatherData.src = `./src/src/${imageName}.png`;
    }
}

async function getQuoteOfTheday() {
    const quoteOfTheDayEl = document.getElementById("quoteOfTheDay");
    const qotdEl = document.getElementById("qotd");
    const quoteAuthorEl = document.getElementById("quoteAuthor");
    const fontsize = parseFloat(window.getComputedStyle(quoteOfTheDayEl).fontSize);
    qotdEl.style.width = document.getElementById("tc").offsetWidth - fontsize * 1.25 + 'px';
    try {
        const result = await fetch("https://piston-ai.chanyanyan3205.workers.dev/quote");
        const data = await result.json()
        setLocalItem("quote", JSON.stringify(data));

        console.log(data);

        quoteOfTheDayEl.textContent = `"${data.text}"`;
        quoteAuthorEl.textContent = `- ${data.author}`;
        positionTodoBox();
    } catch (e) {
        console.log(`Failed to obtain quote: ${e}`);
        console.log("Fallback: Using quote from cache");
        
        const data = JSON.parse(localStorage.getItem("quote"));
        if (!data) {
            console.log("Previously cached quote not found.");
        }
        
        quoteOfTheDayEl.textContent = `"${data.text}"`;
        quoteAuthorEl.textContent = `- ${data.author}`;

        positionTodoBox();
    }
    positionAIBox();
}

function positionTodoBox() {
    const tcEl = document.getElementById("tc");
    const todoBoxEl = document.getElementById("todoBox");

    const rect = tcEl.getBoundingClientRect();
    todoBoxEl.style.top = rect.top + rect.height + 25 + 'px';
    todoBoxEl.style.visibility = "hidden";
    todoBoxEl.style.width = rect.width + rect.width * 0.1 * 2 + 'px';
    todoBoxEl.style.left = rect.left - ((todoBoxEl.getBoundingClientRect().width - rect.width) / 2) + 'px';
    if (todoBoxEl.getBoundingClientRect().left + todoBoxEl.getBoundingClientRect().width > document.getElementById("AIbox").getBoundingClientRect().left) {
        todoBoxEl.style.left = document.getElementById("AIbox").getBoundingClientRect().left - todoBoxEl.getBoundingClientRect().width - 15 + 'px';
    }

    const todoBoxRect = todoBoxEl.getBoundingClientRect();
    const viewPortBottom = window.innerHeight;
    const todoBoxBottom = todoBoxRect.top + todoBoxRect.height;
    if (todoBoxBottom + 10 > viewPortBottom) {
        console.log("bottom debug")
        const overflow = (todoBoxBottom + 10) - viewPortBottom;
        todoBoxEl.style.height = todoBoxRect.height - overflow + 'px';
    } else {
        todoBoxEl.style.height = "45%";
    }

    const todoBoxLeft = todoBoxRect.left;
    if (todoBoxLeft < 0) {
        console.log("left debug")
        const overflow = -todoBoxLeft;
        todoBoxEl.style.width = todoBoxRect.width - overflow + 'px';
        todoBoxEl.style.left = todoBoxLeft + overflow + "px";
    }

    todoBoxEl.style.visibility = "visible";
    const createReminderEl = document.getElementById("createReminder");
    window.createReminderState = false;
    createReminderEl.onclick = () => {
        if (!window.createReminderState) {
            createReminder();
        } else {
            removeReminder();
        }
    }
    renderTasks();
}

function removeReminder() {
    const todoListEl = document.getElementById("todoList");
    window.createReminderState = false;
    const createReminderImg = document.getElementById("createReminderImg");
    createReminderImg.style.rotate = "0deg";
    createReminderImg.addEventListener("transitionend", () => {
        todoListEl.innerHTML = "";
        renderTasks();
    });
}

function createReminder() {
    window.createReminderState = true;
    const createReminderImgEl = document.getElementById("createReminderImg");
    createReminderImgEl.style.rotate = "45deg"
    createReminderImg.addEventListener("transitionend", () => {
        const todoListEl = document.getElementById("todoList");
        todoListEl.innerHTML = "";
        todoListEl.textContent = "";
        const inputFields = document.createElement("div");
        inputFields.style.display = "flex";
        inputFields.style.backgroundColor = "white";
        inputFields.style.border = "none";
        inputFields.style.borderRadius = "13px";
        inputFields.style.justifyContent = "center";
        inputFields.style.alignItems = "center";
        inputFields.style.flexDirection = "column";
        inputFields.style.overflowX = "hidden";
        inputFields.style.overflowY = "hidden";
        inputFields.style.width = "90%";

        const saveReminder = document.createElement("button");
        saveReminder.style.border = "none";
        saveReminder.textContent = "Save task";
        saveReminder.style.borderRadius = "10px";
        saveReminder.style.color = "black";
        saveReminder.style.backgroundColor = "white";
        saveReminder.style.padding = "1px 0.5em 1px 0.5em";
        saveReminder.style.cursor = "pointer";
        saveReminder.style.opacity = "100%";
        saveReminder.style.fontSize = "1em";
        saveReminder.style.width = "90%";
        saveReminder.style.transition = "opacity 0.2s ease-in-out";
        saveReminder.addEventListener("hover", () => {
            saveReminder.style.opacity = "60%";
        })
        saveReminder.disabled = true;
        saveReminder.style.cursor = "not-allowed";
        saveReminder.style.opacity = "20%";

        const titleField = document.createElement("input");
        titleField.style.border = "none";
        titleField.placeholder = "Title";
        titleField.style.width = "100%";
        titleField.style.height = "2.5em";
        titleField.style.padding = "0 0.5em 0 0.5em";
        titleField.style.boxSizing = "border-box";
        titleField.style.color = "black";

        const warningTitleField = document.createElement("p");
        warningTitleField.style.color = "red";
        warningTitleField.style.visibility = "hidden";
        warningTitleField.textContent = "Title cannot be empty.";
        warningTitleField.style.fontSize = "0.85em";
        warningTitleField.style.borderRadius = "10px";
        warningTitleField.style.backdropFilter = "blur(3px)";
        warningTitleField.style.backgroundColor = "rgba(0,0,0,0.135)";
        warningTitleField.style.padding = "1px 1em 1px 1em";
        titleField.addEventListener("input", () => {
            if (!(titleField.value.replace(/\s+/g, "")) || !titleField.value) {
                warningTitleField.style.visibility = "visible";
                saveReminder.disabled = true;
                saveReminder.style.cursor = "not-allowed";
                saveReminder.style.opacity = "20%";
            } else {
                warningTitleField.style.visibility = "hidden";
                saveReminder.disabled = false;
                saveReminder.style.cursor = "pointer";
                saveReminder.style.opacity = "100%";
            }
        })

        const descriptionField = document.createElement("input");
        descriptionField.style.border = "100%";
        descriptionField.placeholder = "Description";
        descriptionField.style.border = "none";
        descriptionField.style.width = "100%";
        descriptionField.style.height = "2.5em";
        descriptionField.style.padding = "0 0.5em 0 0.5em";
        descriptionField.style.boxSizing = "border-box";
        descriptionField.style.color = "black";

        const separatorEl = document.createElement("hr");
        separatorEl.style.height = "1px";
        separatorEl.style.width = "95%";
        separatorEl.style.backgroundColor = "rgba(0,0,0,0.5)";
        separatorEl.style.border = "none";
        
        const urlField = document.createElement("input");
        urlField.style.border = "100%";
        urlField.placeholder = "URL";
        urlField.style.border = "none";
        urlField.style.width = "100%";
        urlField.style.height = "2.5em";
        urlField.style.padding = "0 0.5em 0 0.5em";
        urlField.style.boxSizing = "border-box";
        urlField.style.color = "black";

        const deadLineContainer = document.createElement("div");
        deadLineContainer.style.display = "flex";
        deadLineContainer.style.backgroundColor = "white";
        deadLineContainer.style.border = "none";
        deadLineContainer.style.borderRadius = "13px";
        deadLineContainer.style.flexDirection = "column";
        deadLineContainer.style.overflowX = "hidden";
        deadLineContainer.style.overflowY = "hidden";
        deadLineContainer.style.width = "90%";
        deadLineContainer.style.textAlign = "center";

        const deadLineHint = document.createElement("p");
        deadLineHint.style.color = "black";
        deadLineHint.textContent = "Deadline";
        deadLineHint.style.fontSize = "0.85em";
        deadLineHint.style.padding = "5px 1em 1px 1em";

        const deadLineSeparator = document.createElement("hr");
        deadLineSeparator.style.height = "1px";
        deadLineSeparator.style.width = "95%";
        deadLineSeparator.style.backgroundColor = "rgba(0,0,0,0.5)";
        deadLineSeparator.style.border = "none";
        deadLineSeparator.style.margin = "0 auto";

        const deadLineField = document.createElement("input");
        deadLineField.type = "date";
        deadLineField.style.border = "100%";
        deadLineField.style.border = "none";
        deadLineField.style.height = "2.5em";
        deadLineField.style.padding = "0 0.5em 0 0.5em";
        deadLineField.style.boxSizing = "border-box";
        deadLineField.style.color = "black";
        deadLineField.style.borderRadius = "13px"
        deadLineField.style.width = "100%";
        deadLineContainer.appendChild(deadLineHint);
        deadLineContainer.appendChild(deadLineSeparator);
        deadLineContainer.appendChild(deadLineField);
        const now = new Date();

        const warningDeadLineEl = document.createElement("p");
        warningDeadLineEl.style.color = "red";
        warningDeadLineEl.style.visibility = "hidden";
        warningDeadLineEl.textContent = "Deadline must be set to today or after.";
        warningDeadLineEl.style.fontSize = "0.85em";
        warningDeadLineEl.style.borderRadius = "10px";
        warningDeadLineEl.style.backdropFilter = "blur(3px)";
        warningDeadLineEl.style.backgroundColor = "rgba(0,0,0,0.135)";
        warningDeadLineEl.style.padding = "1px 1em 1px 1em";
        deadLineField.addEventListener("change", () => {
            const sel = new Date(deadLineField.value);
            if (!sel) return;
            const today = now.setHours(0,0,0,0);
            
            if (sel < today) {
                warningDeadLineEl.style.visibility = "visible";
            } else if (sel > today) {
                warningDeadLinesEl.style.visibility = "hidden";
            }
        })
        
        saveReminder.onclick = () => {
            appendReminder(titleField.value, descriptionField.value, urlField.value, deadLineField.value);
        }

        inputFields.appendChild(titleField);
        inputFields.appendChild(descriptionField);
        inputFields.appendChild(separatorEl);
        inputFields.appendChild(urlField);
        todoListEl.appendChild(inputFields);
        todoListEl.appendChild(warningTitleField);
        todoListEl.appendChild(deadLineContainer);
        todoListEl.appendChild(warningDeadLineEl);
        todoListEl.appendChild(saveReminder);
    });
}

function appendReminder(title, description, url, deadline) {
    let reminders = localStorage.getItem("todoList");
    if (!reminders) {
        setLocalItem("todoList", "[]");
        reminders = [];
    } else {
        reminders = JSON.parse(reminders);
    }
    if (!title) { return };
    const payload = {
        Title: title,
        Description: description,
        URL: url,
        Deadline: deadline
    }

    reminders.push(payload);
    setLocalItem("todoList",JSON.stringify(reminders));

    removeReminder();
}

function renderTasks() {
    window.createReminderState = false;
    const todoListEl = document.getElementById("todoList");
    let tasks = JSON.parse(localStorage.getItem("todoList"));
    if (!tasks || tasks.length === 0) {
        setLocalItem("todoList", "[]");
        todoListEl.style.alignItems = "center";
        todoListEl.style.justifyItems = "center";
        todoListEl.textContent = "All tasks done! Yay!";
        return;
    } 
    todoListEl.innerHTML = "";
    for (const [idx, item] of tasks.entries()) {
        const itemContainer = document.createElement("div");
        itemContainer.style.display = "flex";
        itemContainer.style.flexDirection = "row";
        itemContainer.style.overflow = "hidden";
        itemContainer.style.backgroundColor = "rgba(0,0,0,0.05)";
        itemContainer.style.backdropFilter = "blur(3px)";
        itemContainer.style.border = "1px solid gray";
        itemContainer.style.borderRadius = "10px";
        itemContainer.style.padding = "0.3em 0 0.3em 0.3em";
        itemContainer.style.transition = "background-color 0.2s ease-in-out";
        itemContainer.style.gap = "1em";
        itemContainer.addEventListener("mouseover", () => {
            itemContainer.style.backgroundColor = "rgba(0,0,0,0.3)";
        })
        itemContainer.addEventListener("mouseout", () => {
            itemContainer.style.backgroundColor = "rgba(0,0,0,0.05)";
        })

        const infoContainerEl = document.createElement("div");
        infoContainerEl.style.display = "flex";
        infoContainerEl.style.flexDirection = "column";
        infoContainerEl.style.overflowX = "auto";
        infoContainerEl.style.overflowY = "auto";
        infoContainerEl.style.width = "90%";
        const checkEl = document.createElement("input");
        checkEl.type = "checkbox";
        checkEl.addEventListener("change", () => {
            if (checkEl.checked) {
                waitForConf = setTimeout(() => {
                    tasks.splice(idx,1);  
                    setLocalItem("todoList", JSON.stringify(tasks));
                    itemContainer.style.transition = "opacity 0.2s ease";
                    itemContainer.style.opacity = "0";
                    itemContainer.offsetHeight;
                    itemContainer.addEventListener("transitionend", () => {
                        itemContainer.style.visibility = "hidden";
                        renderTasks();
                    });
                }, 2500);
            } else if (!checkEl.checked) {
                clearTimeout(waitForConf);
            }
        })
        itemContainer.appendChild(checkEl);
        if (!("Title" in item)) {
            continue;
        } else {
            const itemTitleEl = document.createElement("h3");
            itemTitleEl.textContent = item.Title;
            itemTitleEl.style.color = "white";
            itemTitleEl.style.fontWeight = "350";
            infoContainerEl.appendChild(itemTitleEl); 
        } 
        if ("Description" in item) {
            if (item.Description) {
                const itemDescEl = document.createElement("h4");
                itemDescEl.textContent = " " + item.Description;
                itemDescEl.style.color = "gray";
                itemDescEl.style.fontWeight = "300";
                infoContainerEl.appendChild(itemDescEl);
            }
        }
        
        if ("URL" in item) {
            if (item.URL) {
                const itemURLEl = document.createElement("p");
                itemURLEl.textContent = `${location.protocol}//${item.URL}`;
                itemURLEl.style.cursor = "pointer";
                itemURLEl.style.textDecoration = "underline";
                itemURLEl.addEventListener("click", () => {
                    window.open(`${location.protocol}//${item.URL}`,"_blank");
                })
                itemURLEl.style.color = "cyan";
                itemURLEl.style.opacity = "30%";
                infoContainerEl.appendChild(itemURLEl);
            }
        }
        
        if ("Deadline" in item) {
            if (item.Deadline) {   
                const itemDescEl = document.createElement("p");
                itemDescEl.textContent = `Deadline: ${item.Deadline}`;
                itemDescEl.style.color = "gray";
                itemDescEl.style.fontWeight = "300";
                infoContainerEl.appendChild(itemDescEl);
            }
        }

        todoListEl.appendChild(itemContainer);
        itemContainer.appendChild(infoContainerEl);
    }
}

function autoRemoveTasks() {
    const now = Date();
    const today = new Date(now);
    today.setHours(0,0,0,0);

    let tasks = localStorage.getItem("todoList");
    if (!tasks) {
        setLocalItem("todoList","[]");
        return;
    }
    tasks = JSON.parse(tasks);
    const filtered = tasks.filter(item => {
        if ("Deadline" in item && item.Deadline) {
            const deadlineDate = new Date(item.Deadline);
            return today < deadlineDate;
        }
        return true;
    })
    setLocalItem("todoList",JSON.stringify(filtered));
    renderTasks();
}

function initStorage() {
    const api = getPyApi();
    const getJSON = getApiMethod(api, "getJSON", "get_json");
    if (getJSON) {
        getJSON().then(returned => {
            const response = returned;
            localStorage.clear();
            if (!response) { return; }
            const data = JSON.parse(response);
            for (const key in data) {
                localStorage.setItem(key, data[key]);
                console.log("Imported ${key} with value ${data[key]}");
            }
            initApp();
        });
    } else {
        setTimeout(initApp, 100);
    }
}

function deleteAll() {
    localStorage.clear();
    const api = getPyApi();
    const deleteAllData = getApiMethod(api, "deleteAllData", "delete_all_data");
    if (!deleteAllData) {
        window.location.reload();
        return;
    }
    deleteAllData()
        .then(() => {
            window.location.reload();
        })
        .catch(() => {
            window.location.reload();
        });
}

function initApp() {
    let userName = localStorage.getItem("username");
    requestMic();
    if (!userName) {
        positionHint();
        alignClock();
        positionClock();
        updateGreeting();
        positionWeather();
        positionTimerUtils();
        getWeather();
        positionManIn();
        positionAbort();
        positionAIBox();
        positionSettings();
        positionTodoBox();
        positionUtilBox();
        renderTasks(); 
        autoRemoveTasks();
        getQuoteOfTheday();
        setInterval(() => {
            getWeather();
            updateGreeting();
            autoRemoveTasks();
        }, 3600000);
        showSetup();
        return;
    } else {
        const greetingEl = document.getElementById("greeting");
        greetingEl.textContent = `Welcome back, ${userName}!`;
        positionHint();
        alignClock();
        positionClock();
        updateGreeting();
        positionWeather();
        positionTimerUtils();
        getWeather();
        positionManIn();
        positionAbort();
        positionAIBox();
        positionSettings();
        positionTodoBox();
        positionUtilBox();
        renderTasks(); 
        autoRemoveTasks();
        getQuoteOfTheday();
        setInterval(() => {
            getWeather();
            updateGreeting();
            autoRemoveTasks();
        }, 3600000);
    }
}

function showSetup() {
    const setupEl = document.getElementById("setUp-container");
    setupEl.style.visibility = "visible";
    document.body.classList.add("blur-active");
    const setupInputEl = document.getElementById("setup-input");
    setupInputEl.focus();
    const setupDoneBtnEl = document.getElementById("setup-done-btn");
    setupDoneBtnEl.onclick = setupDone;
}

function setupDone() {    
    const inputEl = document.getElementById("setup-input");
    const warningTxt = document.getElementById("setup-warning");
    const username = inputEl.value.trim();

    if (!username) {
        inputEl.focus();
        warningTxt.textContent = "Please enter a name";
        warningTxt.style.visibility = "visible";
        return;
    } else {
        const setupEl = document.getElementById("setUp-container");
        const greetingEl = document.getElementById("greeting");
        setLocalItem("username",username);
        greetingEl.textContent = `Welcome back, ${username}!`;
        setupEl.style.opacity = "0%";
        requestAnimationFrame(() => {
            setupEl.style.visibility = "hidden";
            warningTxt.style.visibility = "hidden"
        })

        document.body.classList.remove("blur-active");
        positionHint();
        alignClock();
        positionClock();
        updateGreeting();
        positionWeather();
        positionTimerUtils();
        getWeather();
        positionManIn();
        positionAbort();
        positionAIBox();
        positionSettings();
        positionTodoBox();
        positionUtilBox();
        renderTasks(); 
        autoRemoveTasks();
        getQuoteOfTheday();
        setInterval(() => {
            getWeather();
            updateGreeting();
            autoRemoveTasks();
        }, 3600000);
    }
}

function updateGreeting() {
    const now = new Date();
    const hour = now.getHours();
    console.log(hour)
    const morning = ["Good morning","Morning","Hey"]
    const afternoon = ["Good afternoon","Hey there"];
    const evening = ["Good evening","Evening","Hope your day went good"];
    const night = ["Still up?", "Burning up the midnight oil?"];
    const greetingEl = document.getElementById("greeting");

    let greet;

    if (hour >= 5 && hour < 12) {
        greet = `${morning[Math.floor(Math.random() * morning.length)]}, ${localStorage.getItem("username")}`
    } else if (hour >= 12 && hour < 17) {
        greet = `${afternoon[Math.floor(Math.random() * afternoon.length)]}, ${localStorage.getItem("username")}`;
    } else if (hour >= 17 && hour < 23) {
        greet = `${evening[Math.floor(Math.random() * evening.length)]}, ${localStorage.getItem("username")}`;
    } else {
        greet = `${night[Math.floor(Math.random() * night.length)]} ${localStorage.getItem("username")}?`;
    }

    greetingEl.textContent = greet;
    if (greetingEl.textContent.includes("undefined")) {
        updateGreeting();
    }
}

document.fonts.ready.then(() => {
    document.body.style.visibility = "visible";
    initStorage();
})
