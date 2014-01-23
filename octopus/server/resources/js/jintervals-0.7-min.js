/**
 * jintervals 0.7 -- JavaScript library for interval formatting
 *
 * jintervals is licenced under LGPL <http://www.gnu.org/licenses/>.
 *
 * Copyright (c) 2009 Rene Saarsoo <http://code.google.com/p/jintervals/>
 *
 * Date: 2009-10-21
 */
var jintervals=(function(){function b(g,f){return a.evaluate(new c(g),d.parse(f))}var d={parse:function(j){var h=j;var f=[];while(h.length>0){var i=/^([^\\{]+)([\\{].*|)$/.exec(h);if(i){f.push(i[1]);h=i[2]}var g=/^([{].*?(?:[}]|$))(.*)$/i.exec(h);if(g){f.push(this.parseCode(g[1]));h=g[2]}if(h.charAt(0)==="\\"){f.push(h.charAt(1));h=h.slice(2)}}return f},parseCode:function(g){var f=/^[{]([smhdg])([smhdg]*)?(ays?|ours?|inutes?|econds?|reatests?|\.)?(\?(.*))?[}]$/i;var h=f.exec(g);if(!h){return false}return{type:h[1].toUpperCase(),limited:(h[1].toLowerCase()==h[1]),paddingLength:(h[2]||"").length+1,format:(h[3]||"")==""?false:(h[3]=="."?"letter":"full"),optional:!!h[4],optionalSuffix:h[5]||""}}};var a={evaluate:function(g,j){var i=this.smallestUnit(j);var n="";while(j.length>0){var f=j.shift();if(typeof f==="string"){n+=f}else{if(typeof f==="object"){var l=(f.type=="G")?g.getGreatestUnit():f.type;var h=(f.type=="G")?l:i;var k=g.get(l,f.limited,h);var m=f.format?e.translate(f.format,l,k):"";if(!f.optional||g.get(l)!=0){n+=this.zeropad(k,f.paddingLength)+m+f.optionalSuffix}}else{n+="?"}}}return n},smallestUnit:function(k){var f={S:0,M:1,H:2,D:3};var h="D";for(var g=0;g<k.length;g++){if(typeof k[g]==="object"){var j=k[g].type;if(j!=="G"&&f[j]<f[h]){h=j}}}return h},zeropad:function(g,f){var h=f-(""+g).length;return(h>0)?this.repeat("0",h)+g:g},repeat:function(g,j){var f="";for(var h=0;h<j;h++){f+=g}return f}};var c=function(f){this.seconds=f};c.prototype={get:function(h,f,g){if(!this[h]){return"?"}return this[h](f,g)},S:function(f,g){return f?this.seconds-this.M(false,g)*60:this.seconds},M:function(f,h){var g=this.seconds/60;g=(h==="M")?Math.round(g):Math.floor(g);if(f){g=g-this.H(false,h)*60}return g},H:function(g,h){var f=this.M(false,h)/60;f=(h==="H")?Math.round(f):Math.floor(f);if(g){f=f-this.D(false,h)*24}return f},D:function(f,g){var h=this.H(false,g)/24;return(g==="D")?Math.round(h):Math.floor(h)},getGreatestUnit:function(){if(this.seconds<60){return"S"}else{if(this.M(false,"M")<60){return"M"}else{if(this.H(false,"H")<24){return"H"}else{return"D"}}}}};var e={translate:function(h,f,g){var i=this.locales[this.currentLocale];var j=i[h][f];if(typeof j==="string"){return j}else{return j[i.plural(g)]}},locale:function(f){if(f){this.currentLocale=f}return this.currentLocale},currentLocale:"en_US",locales:{en_US:{letter:{D:"d",H:"h",M:"m",S:"s"},full:{D:[" day"," days"],H:[" hour"," hours"],M:[" minute"," minutes"],S:[" second"," seconds"]},plural:function(f){return(f==1)?0:1}},et_EE:{letter:{D:"p",H:"h",M:"m",S:"s"},full:{D:[" p\u00E4ev"," p\u00E4eva"],H:[" tund"," tundi"],M:[" minut"," minutit"],S:[" sekund"," sekundit"]},plural:function(f){return(f==1)?0:1}},lt_LT:{letter:{D:"d",H:"h",M:"m",S:"s"},full:{D:[" dieną"," dienas"," dienų"],H:[" valandą"," valandas"," valandų"],M:[" minutę"," minutes"," minučių"],S:[" sekundę"," sekundes"," sekundžų"]},plural:function(f){return(f%10==1&&f%100!=11?0:f%10>=2&&(f%100<10||f%100>=20)?1:2)}},ru_RU:{letter:{D:"д",H:"ч",M:"м",S:"с"},full:{D:[" день"," дня"," дней"],H:[" час"," часа"," часов"],M:[" минута"," минуты"," минут"],S:[" секунда"," секунды"," секунд"]},plural:function(f){return(f%10==1&&f%100!=11?0:f%10>=2&&f%10<=4&&(f%100<10||f%100>=20)?1:2)}},fi_FI:{letter:{D:"p",H:"h",M:"m",S:"s"},full:{D:[" päivä"," päivää"],H:[" tunti"," tuntia"],M:[" minuutti"," minuuttia"],S:[" sekunti"," sekunttia"]},plural:function(f){return(f==1)?0:1}}}};b.locale=function(f){return e.locale(f)};return b})();