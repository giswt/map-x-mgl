"undefined"===typeof window||window.ICON_FONT_STYLE?"undefined"!==typeof window&&window.ICON_FONT_STYLE&&window.ICON_FONT_STYLE.update&&window.ICON_FONT_STYLE.update({fontName:"mx-icons-font",styleContent:'@font-face {\n\tfont-family: "mx-icons-font";\n\tsrc:url("mx-icons-font.ttf?cd29722e76db91d15abf5c3b25b7139e") format("truetype"),\n\turl("mx-icons-font.eot?cd29722e76db91d15abf5c3b25b7139e#iefix") format("embedded-opentype"),\n\turl("mx-icons-font.woff?cd29722e76db91d15abf5c3b25b7139e") format("woff"),\n\turl("mx-icons-font.svg?cd29722e76db91d15abf5c3b25b7139e#mx-icons-font") format("svg");\n}'}):window.ICON_FONT_STYLE={fontName:"mx-icons-font",styleContent:'@font-face {\n\tfont-family: "mx-icons-font";\n\tsrc:url("mx-icons-font.ttf?cd29722e76db91d15abf5c3b25b7139e") format("truetype"),\n\turl("mx-icons-font.eot?cd29722e76db91d15abf5c3b25b7139e#iefix") format("embedded-opentype"),\n\turl("mx-icons-font.woff?cd29722e76db91d15abf5c3b25b7139e") format("woff"),\n\turl("mx-icons-font.svg?cd29722e76db91d15abf5c3b25b7139e#mx-icons-font") format("svg");\n}'},webpackJsonp([19,44,59],{135:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),n.d(t,"coordEach",function(){return r}),n.d(t,"coordReduce",function(){return i}),n.d(t,"propEach",function(){return c}),n.d(t,"propReduce",function(){return u}),n.d(t,"featureEach",function(){return f}),n.d(t,"featureReduce",function(){return a}),n.d(t,"coordAll",function(){return s}),n.d(t,"geomEach",function(){return l}),n.d(t,"geomReduce",function(){return d}),n.d(t,"flattenEach",function(){return g}),n.d(t,"flattenReduce",function(){return p}),n.d(t,"segmentEach",function(){return y}),n.d(t,"segmentReduce",function(){return m}),n.d(t,"lineEach",function(){return b}),n.d(t,"lineReduce",function(){return v});var o=n(5);function r(e,t,n){if(null!==e)for(var o,i,c,u,f,a,s,l,d=0,g=0,p=e.type,y="FeatureCollection"===p,m="Feature"===p,b=y?e.features.length:1,v=0;v<b;v++){f=(l=!!(s=y?e.features[v].geometry:m?e.geometry:e)&&"GeometryCollection"===s.type)?s.geometries.length:1;for(var w=0;w<f;w++){var h=0,E=0;if(null!==(u=l?s.geometries[w]:s)){a=u.coordinates;var P=u.type;switch(d=!n||"Polygon"!==P&&"MultiPolygon"!==P?0:1,P){case null:break;case"Point":t(a,g,v,h,E),g++,h++;break;case"LineString":case"MultiPoint":for(o=0;o<a.length;o++)t(a[o],g,v,h,E),g++,"MultiPoint"===P&&h++;"LineString"===P&&h++;break;case"Polygon":case"MultiLineString":for(o=0;o<a.length;o++){for(i=0;i<a[o].length-d;i++)t(a[o][i],g,v,h,E),g++;"MultiLineString"===P&&h++,"Polygon"===P&&E++}"Polygon"===P&&h++;break;case"MultiPolygon":for(o=0;o<a.length;o++){for("MultiPolygon"===P&&(E=0),i=0;i<a[o].length;i++){for(c=0;c<a[o][i].length-d;c++)t(a[o][i][c],g,v,h,E),g++;E++}h++}break;case"GeometryCollection":for(o=0;o<u.geometries.length;o++)r(u.geometries[o],t,n);break;default:throw new Error("Unknown Geometry Type")}}}}}function i(e,t,n,o){var i=n;return r(e,function(e,o,r,c,u){i=0===o&&void 0===n?e:t(i,e,o,r,c,u)},o),i}function c(e,t){var n;switch(e.type){case"FeatureCollection":for(n=0;n<e.features.length;n++)t(e.features[n].properties,n);break;case"Feature":t(e.properties,0)}}function u(e,t,n){var o=n;return c(e,function(e,r){o=0===r&&void 0===n?e:t(o,e,r)}),o}function f(e,t){if("Feature"===e.type)t(e,0);else if("FeatureCollection"===e.type)for(var n=0;n<e.features.length;n++)t(e.features[n],n)}function a(e,t,n){var o=n;return f(e,function(e,r){o=0===r&&void 0===n?e:t(o,e,r)}),o}function s(e){var t=[];return r(e,function(e){t.push(e)}),t}function l(e,t){var n,o,r,i,c,u,f,a,s,l,d=0,g="FeatureCollection"===e.type,p="Feature"===e.type,y=g?e.features.length:1;for(n=0;n<y;n++){for(u=g?e.features[n].geometry:p?e.geometry:e,a=g?e.features[n].properties:p?e.properties:{},s=g?e.features[n].bbox:p?e.bbox:void 0,l=g?e.features[n].id:p?e.id:void 0,c=(f=!!u&&"GeometryCollection"===u.type)?u.geometries.length:1,r=0;r<c;r++)if(null!==(i=f?u.geometries[r]:u))switch(i.type){case"Point":case"LineString":case"MultiPoint":case"Polygon":case"MultiLineString":case"MultiPolygon":t(i,d,a,s,l);break;case"GeometryCollection":for(o=0;o<i.geometries.length;o++)t(i.geometries[o],d,a,s,l);break;default:throw new Error("Unknown Geometry Type")}else t(null,d,a,s,l);d++}}function d(e,t,n){var o=n;return l(e,function(e,r,i,c,u){o=0===r&&void 0===n?e:t(o,e,r,i,c,u)}),o}function g(e,t){l(e,function(e,n,r,i,c){var u,f=null===e?null:e.type;switch(f){case null:case"Point":case"LineString":case"Polygon":return void t(Object(o.feature)(e,r,{bbox:i,id:c}),n,0)}switch(f){case"MultiPoint":u="Point";break;case"MultiLineString":u="LineString";break;case"MultiPolygon":u="Polygon"}e.coordinates.forEach(function(e,i){var c={type:u,coordinates:e};t(Object(o.feature)(c,r),n,i)})})}function p(e,t,n){var o=n;return g(e,function(e,r,i){o=0===r&&0===i&&void 0===n?e:t(o,e,r,i)}),o}function y(e,t){g(e,function(e,n,r){var c=0;if(e.geometry){var u=e.geometry.type;"Point"!==u&&"MultiPoint"!==u&&i(e,function(i,u,f,a,s,l){var d=Object(o.lineString)([i,u],e.properties);return t(d,n,r,l,c),c++,u})}})}function m(e,t,n){var o=n,r=!1;return y(e,function(e,i,c,u,f){o=!1===r&&void 0===n?e:t(o,e,i,c,u,f),r=!0}),o}function b(e,t){if(!e)throw new Error("geojson is required");g(e,function(e,n,r){if(null!==e.geometry){var i=e.geometry.type,c=e.geometry.coordinates;switch(i){case"LineString":t(e,n,r,0,0);break;case"Polygon":for(var u=0;u<c.length;u++)t(Object(o.lineString)(c[u],e.properties),n,r,u)}}})}function v(e,t,n){var o=n;return b(e,function(e,r,i,c){o=0===r&&void 0===n?e:t(o,e,r,i,c)}),o}},157:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=n(5),r=n(135);t.default=function(e){var t={MultiPoint:{coordinates:[],properties:[]},MultiLineString:{coordinates:[],properties:[]},MultiPolygon:{coordinates:[],properties:[]}},n=Object.keys(t).reduce(function(e,t){return e[t.replace("Multi","")]=t,e},{});function i(e,n,o){o?t[n].coordinates=t[n].coordinates.concat(e.geometry.coordinates):t[n].coordinates.push(e.geometry.coordinates),t[n].properties.push(e.properties)}return Object(r.featureEach)(e,function(e){e.geometry&&(t[e.geometry.type]?i(e,e.geometry.type,!0):n[e.geometry.type]&&i(e,n[e.geometry.type],!1))}),Object(o.featureCollection)(Object.keys(t).filter(function(e){return t[e].coordinates.length}).sort().map(function(e){var n={type:e,coordinates:t[e].coordinates},r={collectedProperties:t[e].properties};return Object(o.feature)(n,r)}))}},29:function(e,t,n){var o="ICON-FONT-FILE-STYLE";function r(e){return(e||window.ICON_FONT_STYLE).styleContent||""}function i(e){var t=document.createElement("style"),n=document.getElementsByTagName("head")[0];t.innerHTML=r(e),t.id=o,t.type="text/css",n?n.appendChild(t):window.addEventListener("load",function(){n.appendChild(t)})}e.exports=function(){window.HAS_CREATE_FONT_STYLE||(i(),window.HAS_CREATE_FONT_STYLE=!0)}}});