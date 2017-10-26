/*jshint esversion: 6 , node: true */ //'use strict';
import * as mx from './mx_init.js';

//var Image, Node,escape,unescape,$,postMessage,Shiny,self,Blob,URL,Worker,XMLHttpRequest, window, document, System;


/**
* Custom operator to avoid escaping js operator in html templates
*/
export function all(a){
  var r = false;
  a.forEach(function(o,i){
    r=r&&Boolean(o);
  });
  return r;
}

export function greaterThan(a,b){
  return a > b;
}

export function any(a){
  var r;
  a.forEach(function(o,i){
    r=r||Boolean(o);
  });
  return r;
}
// test mx.helpers.any([null,0,"a",true])


export function not(a){
  var r = true;
  a.forEach(function(o,i){
    r=!r||!Boolean(o);
  });
  return r;
}

export function hasIndex(a,b){
  return a instanceof Array ? a.indexOf(b) > -1: false;
}

export function firstOf(a){
  for( var i=0, iL=a.length; i<iL; i++ ){
    if(a[i] === 0 || a[i]){return a[i];}
  }
}
/** test firstOf([,"",0,"a"]) === 0 */


/**
* Fill with zeros
* @param {Number} n Number
* @param {Number} p Number of digit
* @param {String} c Value instead of zeros
* @note https://stackoverflow.com/questions/1267283/how-can-i-pad-a-value-with-leading-zeros
*/
export function paddy(n, p, c) {
    var pad_char = typeof c !== 'undefined' ? c : '0';
    var pad = new Array(1 + p).join(pad_char);
    return (pad + n).slice(-pad.length);
}



/**
 * Do something on next frame
 * @param {Function} cb Callback function to execute on next animation frame
 */
export function onNextFrame(cb) { 
  var nf = window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.msRequestAnimationFrame ||
    window.oRequestAnimationFrame ||
    function(callback) {
      window.setTimeout(callback, 1000 / 60);
    };
  return nf(cb);
}

/**
 * Get the correct css transform function
 */
export function cssTransformFun(){
  return function(){
    /* Create dummy div to explore style */
    if(typeof document == "undefined") return;

    var style = document
      .createElement("div")
      .style;

    if (undefined !== style.WebkitTransform) {
      return "WebkitTransform";
    } else if (undefined !== style.MozTransform) {
      return "MozTransform ";
    } else if (undefined !== style.OTransform) {
      return "OTransform";
    } else if (undefined !== style.msTransform) {
      return "msTransform ";
    } else if (undefined !== style.WebkitTransform) {
      return "WebkitTransform";
    } else {
      return "transform";
    }
  }();
}

export function uiToggleBtn(o){
  var label = o.label || "";
  //var onCheckedTrue = o.onCheckedTrue || function(){};
  //var onCheckedFalse = o.onCheckedFalse || function(){};
  var onChange = o.onChange || function(e,el){};
  var data = o.data || {};
  var checked = o.checked || false;
  var classToggle = "check-toggle";
  var classLabel = "btn btn-default btn-xs check-toggle-label";
  var classInput = "check-toggle-input"; 
  var id =  makeId();
  var elContainer = document.createElement("div");
  var elInput = document.createElement("input");
  var elLabel = document.createElement("label");
  elInput.type="checkbox";
  elInput.id = id;
  elInput.checked=checked;
  elLabel.setAttribute("for",id);
  elLabel.className = classLabel;
  elInput.className = classInput;
  elContainer.className= classToggle;
  elLabel.innerText = label;

  for(var d in data){
    elInput.dataset[d]=data[d];
  }

  elInput.onchange = function(e){
    /*jshint validthis:true */
    var el = this;
    onChange(e,el);
  };

  elContainer.appendChild(elInput);
  elContainer.appendChild(elLabel);

  return elContainer;

}




/**
* Create a foldable element
* @param {Object} o options
* @param {Element} o.content Element to fold
* @param {String} o.label Label displayed in switch
* @param {Boolean} o.open Default state
*/
export function uiFold(o){
  var content = o.content;
  var label = o.label;
  var open = o.open;
  var onChange = o.onChange;
  var classContainer = "fold-container";
  var classContent = "fold-content";
  var classLabel = "fold-label";
  var classSwitch = "fold-switch";
  var id =  makeId();

  if(!content) return;
  open = open || false; 
  label = label || "";

  var elInput = document.createElement("input");
  if(onChange){
     elInput.onchange=onChange;
  }
  elInput.setAttribute("type","checkbox");
  var elContainer = document.createElement("div");
  var elContent = document.createElement("div");
  var elLabel = document.createElement("label");
  elContainer.classList.add(classContainer);
  elContent.classList.add(classContent);
  elLabel.classList.add(classLabel);
  elLabel.setAttribute("for",id);
  elInput.id = id;
  elInput.classList.add("fold-switch");
  elInput.checked = open;
  elLabel.innerHTML = label;

  elContent.appendChild(content);
  elContainer.appendChild(elInput);
  elContainer.appendChild(elLabel);
  elContainer.appendChild(elContent);

  return elContainer;
}

/**
* String containting html to html elements
* @param {String} text
* @return {HTML}
*/
export function textToHtml(text){
  var el =  document.createElement("div");
  el.innerHTML=text;
  return el.children[0];
}



/**
* Convert a simple object to an HTML list
* @param {Object} o Options
* @param {Object} o.data Object to convert
* @param {String} o.id of element to fill (optional)
* @param {String} o.classValue Group item additional class (optional)
* @return {Element} Html ul element
*/
export function objectToHTML(o){

  // if data and id : send by mxJsonToHtml, convert. 
  var obj = o.data;
  var id = o.id;
  var classValue;
  var classGroup = "list-group";
  var classGroupItem = "list-group-item";
  var classGroupItemValue = ["list-group-item-member"]; 

  if(classValue) classGroupItemValue.concat(classValue);

  var html = makeUl(obj);

  if(id){
   document.getElementById(id).appendChild(html);
  }else{
   return html;
  }

  function makeUl(li){
    var l, k, keys = [];
    var ul = document.createElement("ul");
    ul.classList.add(classGroup);
      var isObject = li.constructor == Object;
      var isArray =  li.constructor == Array;
    if( isObject ) keys = Object.keys(li);
    if( isArray ) for(var i=0,iL=li.length;i<iL;i++){keys.push(i);}

    for(var j =0,jL=keys.length;j<jL;j++){ 
      k = keys[j];
      l = isArray ? k+1 : k;
      ul.appendChild(makeLi(li[k],l));
    }
    return ul;
  }

  function makeLi(it,ti){
    var li = document.createElement("li");
    var content = document.createElement("div");
    li.classList.add(classGroupItem);

    if ( it.constructor == Object || it.constructor == Array ){

     content.appendChild( uiFold({
        content : makeUl(it),
        label : ti,
        open : false
      })
     );

    }else{
      content.innerHTML = "<div>"+
        "<span class='list-group-title'>" + ti + "</span>"+
        "<span>"+it+"</span>"+
        "</div>";

    }

    li.appendChild( content );
    return li;
  }
}














/** 
 * Date utils
 * Experimental date support for most common cases:
 * if number, return a formated date, if it's a string, return a number
 * @param {string|number} val input value
 * @return {date}
 */
export function date(val){

  var d =  new Date(val);
  var out = val;

  if( val.constructor == Number ){
    out = d.toLocaleDateString();
  }else{
    out = d.getTime();
  }

  return out;

}

/**
* Test if entry is numeric
* @param {String|Number} n string or number to test
*/
export function isNumeric(n){
  return !isNaN(parseFloat(n)) && isFinite(n);
}


/**
 * Round at given decimal
 * @param n Number to round
 * @param d Exponent. By default = 3
 */
export function round(n,d){
  d=d?d:3;
  var e = Math.pow(10,d);
  return Math.round(n*e)/e ;
}

export function formatZeros(num,n){
  if(typeof num !== "number") return num;
  num=mx.helpers.round(num,n);
  num=num+""||"0";
  n=n||3;
  var a = num.split('.');
  var b = a[1];
  if(!b) b= "";
  for(var i=0;b.length<n;i++){
    b = b + "0";
  }
  return a[0]+"."+b;
}



/**
 * Replace unicode char by string
 * @param {sring} txt String to convert
 * @note come from http://stackoverflow.com/questions/17267329/converting-unicode-character-to-string-format
 */
export function unicodeToChar(text) {
  return text.replace(/\\u[\dA-F]{4}/gi,
    function(match) {
      return String.fromCharCode(parseInt(match.replace(/\\u/g, ''), 16));
    });
}

/** 
 * Set template : compile and store result
 *  @param {object} o Options
 * @param {string} o.id Name of the function
 * @param {string} o.template html string for legend
 */
export function setTemplates(o) {
  System.import("dot").then(function(doT){
    for( var id in o ){
      var template = mx.helpers.unicodeToChar(o[id]);
      mx.templates[id] = doT.template(template);
    }
  });
 }

/**
 *  * Returns a function, that, as long as it continues to be invoked, will not
 * be triggered. The function will be called after it stops being called for
 * N milliseconds. If 
 * @note https://davidwalsh.name/javascript-debounce-function
 * @param func {function} function to evaluate
 * @param wait {integer} number of millisecond to wait
 * @param immedate {boolean} immediate` is passed, trigger the function on the
 * leading edge, instead of the trailing.
 */
export function debounce(func, wait, immediate) {
  var timeout;
  return function() {
    var context = this,
      args = arguments;
    var later = function() {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
}

/**
 * Convert input to string
 * @param {Object} i Input object
 */
export function toString(i){
  return JSON.stringify(i);
}



/**
 * Get uniques meta word from view.
 */
export function getDistinctIndexWords(view){
  if(!view) return;
  /*
   * index = abstract + date + target 
   */
  var str = 
    view.date_modified + " " +
    toString( view.target ) + " " +
    toString( view.data.abstract ) ;

  str = str.replace(/[^0-9a-zA-Z]+/g,";").split(";") ;
  str = mx.helpers.getArrayStat({arr:str,stat:"distinct"});
  return str.join(" ") ;
}




/**
 * Send Ajax
 * @note https://codepen.io/malyw/pen/vExwoK
 * @param {Object} o options
 * @param {String} o.type set/get
 * @param {String} o.url url to use
 * @param {Function} o.onSuccess Function to call on success
 * @param {Function} o.onError Function to call on error
 * @param {Function} o.beforeSend Function to call before sending ajax
 * @param {Boolean} o.useCache Use browser cache. Default is true, except for localhost
 * @param {integer} o.maxWait Maximum wainting time. Default = 5000 ms
 */
export function sendAjax(o) {
  var time = new Date().getTime() + "";
  var timeStr = ( o.url.indexOf("?") > 0 ) ? "&time="+time:"?time="+time;
  var xhr = new XMLHttpRequest();
  o.type = o.type ? o.type : "get";
  o.maxWait = o.maxWait ? o.maxWait : 5000; // in ms
  o.useCache = o.useCache === undefined ? window.location.hostname !== "localhost" : o.useCache;
  o.url = o.useCache ? o.url + timeStr : o.url;
  o.onError = o.onError ? o.onError : console.log;
  o.onSuccess = o.onSuccess ? o.onSuccess : console.log;
  o.onComplete = o.onComplete ? o.onComplete : function() {};
  o.beforeSend = o.beforeSend ? o.beforeSend : function() {};
  o.timer = setTimeout(function() { // if xhr won't finish after timeout-> trigger fail
    xhr.abort();
    o.onError();
    o.onComplete();
  }, o.maxWait);
  xhr.open(o.type, o.url);
  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4) {
      clearTimeout(o.timer);
      if (xhr.status === 200 || xhr.status === 0) {
        o.onSuccess(xhr.responseText);
        o.onComplete();
      } else {
        o.onError(xhr.responseText);
        o.onComplete();
      }
    }
  };
  o.beforeSend(xhr);
  xhr.send();
}


/**
 * Get JSON
 * @param {Object} o options
 * @param {String} o.url url pointing to the json
 * @param {Function} o.onSuccess Function to call on success
 * @param {Function} o.onError Function to call on error
 * @param {Boolean} o.useCache Use browser cache, default true, except for localhost
 */
export function getJSON(o) {
   mx.helpers.sendAjax({
    type: 'get',
    url: o.url,
    beforeSend: function(xhr) {
      xhr.setRequestHeader('Accept', 'application/json, text/javascript');
    },
    onSuccess: function(res) {
      if(res){
        o.onSuccess(JSON.parse(res));
      }
    },
    onError: o.onError,
    onComplete: o.onCcomplete,
    useCache: o.useCache
  });
}





/**
* Get Levenshtein distance by Gustaf Andersson
* @note https://jsperf.com/levenshtein-distance/25
* @param {string} String a
* @param {string} String b
*/
export function distance(s, t) {
  if (s === t) {
    return 0;
  }
  var n = s.length, m = t.length;
  if (n === 0 || m === 0) {
    return n + m;
  }
  var x = 0, y, a, b, c, d, g, h;
  var p = new Array(n);
  for (y = 0; y < n;) {
    p[y] = ++y;
  }

  for (; (x + 3) < m; x += 4) {
    var e1 = t.charCodeAt(x);
    var e2 = t.charCodeAt(x + 1);
    var e3 = t.charCodeAt(x + 2);
    var e4 = t.charCodeAt(x + 3);
    c = x;
    b = x + 1;
    d = x + 2;
    g = x + 3;
    h = x + 4;
    for (y = 0; y < n; y++) {
      var f = s.charCodeAt(y);
      a = p[y];
      if (a < c || b < c) {
        c = (a > b ? b + 1 : a + 1);
      }
      else {
        if (e1 !== f) {
          c++;
        }
      }

      if (c < b || d < b) {
        b = (c > d ? d + 1 : c + 1);
      }
      else {
        if (e2 !== f) {
          b++;
        }
      }

      if (b < d || g < d) {
        d = (b > g ? g + 1 : b + 1);
      }
      else {
        if (e3 !== f) {
          d++;
        }
      }

      if (d < g || h < g) {
        g = (d > h ? h + 1 : d + 1);
      }
      else {
        if (e4 !== f) {
          g++;
        }
      }
      p[y] = h = g;
      g = d;
      d = b;
      b = c;
      c = a;
    }
  }

  for (; x < m;) {
    var e = t.charCodeAt(x);
    c = x;
    d = ++x;
    for (y = 0; y < n; y++) {
      a = p[y];
      if (a < c || d < c) {
        d = (a > d ? d + 1 : a + 1);
      }
      else {
        if (e !== s.charCodeAt(y)) {
          d = c + 1;
        }
        else {
          d = c;
        }
      }
      p[y] = d;
      c = a;
    }
    h = d;
  }

  return h;
}

export function distanceScore(a,b){

 a = a
    .replace(/[^0-9A-zÀ-ÿ\,\&\|\$]/g,"")
    .toLowerCase();
 b = b
    .replace(/[^0-9A-zÀ-ÿ\,\&\|\$]/g,"")
    .toLowerCase();

  a = mx.helpers.cleanDiacritic(a);
  b = mx.helpers.cleanDiacritic(b);

  var l = a.length + b.length;

return 100 - (distance(a,b)/l) * 100  ;
}


/**
 * Create random asci strint of given length
 * @param {integer} length of the string
 */
export function makeId(n) {
  var text = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  n = n * 1 > 0 ? n * 1 : 5;

  for (var i = 0; i < n; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;
}


/** Create a worker
 * @param fun {function} function to evalute by the worker
 */
export function createWorker(fun) {
  // convert input function to string
  fun = fun.toString();
  fun = fun
    .substring(
      fun.indexOf("{") + 1,
      fun.lastIndexOf("}")
    );
  // Make a blob
  var blob = new Blob(
    [fun], {
      type: "application/javascript"
    }
  );
  // convert as url for new worker
  var blobUrl = URL.createObjectURL(blob);

  // return new worker
  return (new Worker(blobUrl));
}



export function doPar(o) {
  var fun = o.fun || function(){};
  var data = o.data || {};
  var script = o.script || undefined;
  var s ="";
  var mm = {
    message : o.onMessage || console.log,
    progress : o.onProgress || console.log,
    end : o.onEnd || console.log
  };

  if(script) s = "importScripts('" + self.origin + "/" + script + "');";
  var m = "var sendMessage = " + function(m){postMessage({message:m});} + ";";
  var p = "var sendProgress= " + function(m){postMessage({progress:m});} + ";";
  var e = "var sendEnd= " + function(m){postMessage({end:m});} + ";";
  var d = "var data= " + JSON.stringify(data) + ";";

  fun = fun.toString();
  fun = fun
    .substring(
      fun.indexOf("{") + 1,
      fun.lastIndexOf("}")
    );

  var b = s+d+m+p+e+fun;

  var blob = new Blob(
    [b], {
      type: "application/javascript"
    }
  );

  var blobUrl = URL.createObjectURL(blob);
  var ww = new Worker(blobUrl);

  ww.onmessage=function(e){
    var m = e.data;
    for(var k in m){
      mm[k](m[k]);
    }
  };

  return;
}



export function modal(o){

  System.import("selectize").then(function(Selectize){

    var id = o.id || makeId();
    var idBackground = "mx_background_for_" + id;
    var modal = document.getElementById(o.id) || document.createElement("div");
    var background = document.getElementById(idBackground) || document.createElement("div"); 
    var hasShiny = typeof Shiny !== "undefined";
    var hasSelectize = typeof Selectize !== "undefined";

    if(o.close){
      close();
      return;
    }
    if(modal.id && o.replace){
      if(hasShiny) Shiny.unbindAll(modal);
      modal.remove();
      modal = document.createElement("div");
    }
    if(modal.id && !o.replace){
      return;
    }

    var top = document.createElement("div");
    var head = document.createElement("div");
    var body = document.createElement("div");
    var content = document.createElement("div");
    var footer = document.createElement("div");
    var buttons = document.createElement("div");
    var dialog = document.createElement("div");

    function close(e){
      if(hasShiny) Shiny.unbindAll(modal);
      modal.remove();
      background.remove();
    }

    modal.appendChild(top);
    modal.appendChild(head);
    modal.appendChild(body);
    modal.appendChild(footer);
    modal.classList.add("mx-modal-container");
    modal.id=id;

    top.classList.add("mx-modal-drag-enable");
    top.classList.add("mx-modal-top");
    top.innerHTML = o.title;
    if(top.children.length>0){
      forEachEl({
        els:top.children,
        callback:function(el){
          el.classList.add("mx-modal-drag-enable");
        }});
    }
    head.classList.add("mx-modal-head");
    body.classList.add("mx-modal-body");
    content.classList.add("mx-modal-content");
    footer.classList.add("mx-modal-foot");
    buttons.classList.add("btn-group");
    background.id = idBackground;
    background.classList.add("mx-modal-background");
    dialog.classList.add("shiny-text-output");
    dialog.id = id + "_txt";
    dialog.classList.add("mx-modal-foot-text");

    if( !o.removeCloseButton ){
      var b = document.createElement("button");
      b.className="btn btn-default";
      b.innerHTML = o.textCloseButton || "close"; 
      b.addEventListener("click",close);
      buttons.appendChild(b);
    }

    if( o.buttons && o.buttons.constructor == Array ){
      o.buttons.forEach(function(b){
        if( typeof b === "string" ){
          b = textToHtml(b);
        }
        buttons.appendChild(b);
      });
    }

    content.innerHTML = o.content;
    body.appendChild(content);
    footer.appendChild(dialog);
    footer.appendChild(buttons);
    if( o.addBackground ) document.body.appendChild(background);
    document.body.appendChild(modal);
    if( hasShiny ) Shiny.bindAll(modal);
    if( hasSelectize ) {
      var selects = $(modal).find("select");
      selects.each(function(i,s){
        var script = modal.querySelector("script[data-for="+s.id+"]");
        var data = script?script.innerHTML:null;
        var options = {dropdownParent:"body"};
        if(data){
          options = JSON.parse(data);
          if(options.renderFun){
            options.render={
              option : mx.helpers[options.renderFun]
            };
          }
        }
        options.inputClass="form-control selectize-input";
        mx.listener[s.id] = $(s).selectize(options);
      });
    }
    mx.helpers.draggable({
      id:id,
      disable:[]
    });

  });
}


export function parseCountryOptions(item, escape) {
  return "<div>" + escape(item.name) +"<span class=\'badge pull-right\'>" + escape(item.count) + "</span></div>";
}


export function updateSelectizeItems(o){
  var items = o.items;
  var id = o.id;
  var s = mx.listener[id];
  if(!s) return;
  if(!items) return;
  var ss = s[0].selectize;
  
  ss.clearOptions();
  ss.addOption(items);
  ss.refreshOptions();
}


/** Toggle button disabled state and warning or danger bootstrap classes
 * @param {Object} r options
 * @param {String} r.id Id of the button to toggle
 * @param {boolean} r.warning Use warning state instead of danger
 */
export function buttonToggle(r) {
  if (r.disable === true) {
    $("#" + r.id)
      .addClass("btn-danger")
      .removeClass("btn-default")
      .removeClass("btn-warning")
      .attr("disabled", true);
  } else if (r.warning === true) {
    $("#" + r.id)
      .addClass("btn-warning")
      .removeClass("btn-default")
      .removeClass("btn-danger")
      .attr("disabled", false);
  } else {
    $("#" + r.id)
      .addClass("btn-default")
      .removeClass("btn-danger")
      .removeClass("btn-warning")
      .attr("disabled", false);
  }
}
/**
 * Update element content
 * @param {object} o Object 
 * @param {string} o.id Id of the element
 * @param {string} o.txt Replacement text
 */
export function updateText(o) {
  var el = document.getElementById(o.id);
  if (el) {
    var str = o.txt.toString();
    el.innerHTML = b64_to_utf8(str);
  }
}

/** 
 * convert b64 to utf8
 * @param {string} str String to convert
 * @note  taken from http://stackoverflow.com/questions/30106476/using-javascripts-atob-to-decode-base64-doesnt-properly-decode-utf-8-strings
 */
export function b64_to_utf8(str) {
  str = str.replace(/\s/g, '');
  return decodeURIComponent(escape(window.atob(str)));
}

/** 
 * convert utf8 to b64
 * @param {string} str String to convert
 * @note  taken from http://stackoverflow.com/questions/30106476/using-javascripts-atob-to-decode-base64-doesnt-properly-decode-utf-8-strings
 */
export function utf8_to_b64(str) {
  return window.btoa(unescape(encodeURIComponent(str)));
}



/**
 * Split a string in n parts
 * @param {string} String to split
 * @param {number} Length of the chunk
 * @note taken from http://stackoverflow.com/questions/7033639/split-large-string-in-n-size-chunks-in-javascript
 */
export function chunkString(str, size) {
  var numChunks = Math.ceil(str.length / size),
    chunks = new Array(numChunks);

  for(var i = 0, o = 0; i < numChunks; ++i, o += size) {
    chunks[i] = str.substr(o, size);
  }

  return chunks;
}


/**
* Get extention from filename
* @param {String} str Filename
*/
export function getExtension(str){
  return str.toLowerCase().match(/.[a-z0-9]+$/)[0];
}


/**
* Simple timer
* @method start Start the timer
* @method stop Start the timer
* @example
*  var a = new timer();
* timer.start();
* timer.stop();
*/

export function timer(){
  var start = 0;
}

timer.prototype.start = function(){
  this.start = window.performance.now(); 
};

timer.prototype.stop = function(){
  return window.performance.now()-this.start;
};



/**
* Estimate memory size of object
* @note https://gist.github.com/zensh/4975495
* @param {Object} object to evaluate
*/
export function getSizeOf(obj){
  var bytes = 0;
  var seenObjects = [];

  function sizeOf(obj) {
    if(obj !== null && obj !== undefined) {
      if(seenObjects.indexOf(obj) === -1){
        seenObjects.push(obj);
        switch(typeof obj) {
          case 'number':
            bytes += 8;
            break;
          case 'string':
            bytes += obj.length * 2;
            break;
          case 'boolean':
            bytes += 4;
            break;
          case 'object':
            var objClass = Object.prototype.toString.call(obj).slice(8, -1);
            if(objClass === 'Object' || objClass === 'Array') {
              for(var key in obj) {
                if(!obj.hasOwnProperty(key)) continue;
                sizeOf(obj[key]);
              }
            } else bytes += obj.toString().length * 2;
            break;
        }
        return bytes;
      }
    }
  }

  function formatByteSize(bytes) {
    if(bytes < 1024) return bytes + " bytes";
    else if(bytes < 1048576) return(bytes / 1024).toFixed(3) + " KiB";
    else if(bytes < 1073741824) return(bytes / 1048576).toFixed(3) + " MiB";
    else return(bytes / 1073741824).toFixed(3) + " GiB";
  }

  return formatByteSize(sizeOf(obj));

}





/**
* Smooth scroll
* @note https://stackoverflow.com/questions/17722497/scroll-smoothly-to-specific-element-on-page
* @param {Object} o options
* @param {Element} o.el Element to scroll on
* @param {Number} o.from Starting point in px
* @param {Number} o.to Ending point in px
* @param {String} o.axis x (left) or y (top) ;
* @param {Number} o.during Duration in ms for 1000 px
* @param {String} o.using Easing function name
*/
export function scrollFromTo(o){

  var start, duration, easing, bodyDim;
  var diff = o.to - o.from;
  var axis = o.axis || "y";

  if( o.using && o.using.constructor ==  Function ){
    easing = o.using;
  }else{
   easing = easingFun({
    type : o.using || "easeInOut",
    power : 2
  });
 
  }
  
  if( axis === "y" ) bodyDim = document.body.clientHeight || 800; 
  if( axis === "x" ) bodyDim = document.body.clientWidth || 800; 
  if (!diff || diff === 0) return;

  if( Math.abs(diff) > ( bodyDim * 1.5 )){
    // instant scroll
    if(axis == "y" ) o.el.scrollTop = o.to;
    if(axis == "x" ) o.el.scrollLeft = o.to;

  }else{
    // var duration = (o.during || 1000) * (Math.abs(diff)/1000); 
    duration = (o.during || 1000); 
    // scroll on next frame
    onNextFrame(function step(timestamp) {
      if (!start) start = timestamp;
      var time = timestamp - start;
      var percent = Math.min(time / duration, 1);
      percent = easing(percent);

      if(axis == "y" ) o.el.scrollTop = o.from + diff * percent;
      if(axis == "x" ) o.el.scrollLeft = o.from + diff * percent;

      if (time < duration) {
        onNextFrame(step);
      }

    });
  }
}

/**
* Create easing function
* @note https://gist.github.com/gre/1650294
* @param {object} o options
* @param {string} o.type type in "easeIn", "easeOut", "easeInOut",
* @param {integer} o.power Power of the function
*/
export function easingFun(o) {

  var opt = {
    easeIn : function (power) {
      return function (t) { return Math.pow(t, power);};
    },
    easeOut : function (power){
      return function (t) { return 1 - Math.abs(Math.pow(t-1, power));};
    },
    easeInOut : function(power) {
      return function(t) { return t<0.5 ? opt.easeIn(power)(t*2)/2 : opt.easeOut(power)(t*2 - 1)/2+0.5;};
    }
  };

  return opt[o.type](o.power) ;

}





/**
 * Test if undefined
 * @param {Object|Function}
 */
export function exists(x){
  return typeof(x) == "undefined";
}


/** Translate text, tooltype or placeholder in element based on "[data-lang_key]" id and a json key-value pair dictionnary
 * @param {Object} m 
 * @param {Object} m.dict dictionary
 * @param {element} m.el Target element. If omitted, the whole document will be translated.
 * @example
 * setLanguage({dict:[{id:"hello","fr":"Bonjour",en:"Hello"}]})
 */
export function setLanguage(m) {

  if(!m) m = {};

  if (m.dict) {
    window.dict = m.dict;
  } else {
    m.dict = window.dict;
  }

  if (!m.dict) return;

  var els, el, doc, label, found, setLabel = {};
  var langDefault = m.default ? m.default : "en";
  var lang = m.lang ? m.lang : mx.settings.language ? mx.settings.language : langDefault;

  // set value selector

   var setValue = {
    "tooltip": function(el) {
      el.setAttribute("aria-label", label);
      if (el.className.indexOf("hint--") == -1) {
        el.className += " hint--left";
      }
    },
    "placeholder": function(el) {
      el.setAttribute("placeholder", label);
    },
    "text": function(el) {
      el.innerHTML = label;
    }
  };

  // if no el to look at, serach the whole document
  doc = m.el ? m.el : document;

  // fetch all elements with data-lang_key attr 
  els = doc.querySelectorAll("[data-lang_key]");
   
  for (var i = 0; i < els.length; i++) {
    el = els[i];

    if (isElement(el)) {
      var type = el.dataset.lang_type;
      var id = el.dataset.lang_key;
      var text = el.innerText;

      /*
      * NOTE: BUG IN SAFARI : sometimes, dataset is not returning correctly
      */
      if(!type) type = el.getAttribute("data-lang_type");
      
      // Default is text. Maybe not the most clever default.
      if (!type) type = "text";
      
      found = false;
      label = "";
      
      for (var j = 0; j < m.dict.length; j++) {
        if (!found) {
          if (m.dict[j].id == id) {
            found = true;
            label = m.dict[j][lang];
            if (!label) {
              // if label no in dict, take the default
              label = m.dict[j][langDefault];
            }
          }
        }
      }
      /*
      * Fallback
      */
      if (!label) {
        if(text){
          label = text;
        }else{
          label = id;
        }
      }
      setValue[type](el);
    }

  }
}


/**
 * Get value from the dictionary for a given key and language. Fallback to "def"
 * @param {string} key Key to look for in the dictionnary
 * @param {string} lang  Two letters language code
 * @param {string} langDef Two lettters language code. Fallback to "en"
 */
export function getLanguage(key, lang, defLang, defOut) {

  var keys = [];
  var dict = window.dict;
  defOut = defOut || key;
  if (!dict) return;
  lang = lang || defLang || "en";

  if( key.constructor == Array ){
      keys = key;
  }else{ 
     keys = keys.concat(key);
  }

  var res = [];

  for (var k = 0, klen = keys.length; k < klen; k++) {
    key = keys[k];
    var found = false;
    var val = defOut;
    for ( var i = 0, dlen = dict.length ; i < dlen ; i++ ) {
      if(!found){
        if ( dict[i].id === key ) {
          found = true;
          val = dict[i][lang];
          if (!val) val = dict[i][defLang] || defOut;
        }
      }
    }
    res.push(val);
  }

  return (res);
}

/**
* Get language value from an object path.
* @param {Object} o Options
* @param {string} o.lang Selected language two letter code. Default = mx.settings.language
* @param {Array} o.langs Array of other language code. Default = mx.settings.languages
* @param {string} o.defaultKey Default key if no other value found. Default = "noData"
* @param {Object} o.obj Object containing the value
* @param {String} o.path Path to the value container. Eg. "data.title"
*/
export function getLanguageFromObjectPath(o){
  o.lang = o.lang ? o.lang : mx.settings.language;
  o.langs = o.langs ? o.langs : objectToArray(mx.settings.languages);
  o.defaultKey = o.defaultKey ? o.defaultKey : "noData";
  var out = mx.helpers.path( o.obj, o.path + "." + o.lang );
  if( !out ){
    for( var i = 0; i < o.langs.length ; i++ ){
      if( ! out ){
        out  = mx.helpers.path( o.obj, o.path + "." + o.langs[i] );
      }
    }
    if( ! out ) out = getLanguage([ o.defaultKey ],o.lang);
  }
  return(out);
}


/**
* Check language code for the view item and control fallback
* @param {object} o options
* @param {object} o.obj object to check
* @param {string} o.path path to the string to check
* @param {string} o.language language code expected
* @param {array} o.languages code for fallback
* @param {boolean} o.concat concat language with path instead of select children
* @example
*     checkLanguage({
*         obj : it,
*         path : "data.title", 
*         language : "fr",
*         languages :  ["en","de","ru"]
*     })
*/
export function checkLanguage(o){
  
  var langs = o.languages || objectToArray(mx.settings.languages);
  var lang = o.language || mx.settings.language || langs[0];
  var concat = !! o.concat;
  var out = lang;
  var found = false;

  /**
  * Test if lang value return something
  */
  function test(){
    var p = concat ? o.path + lang : o.path + "." + lang;
    found = !!mx.helpers.path( o.obj, p ) ;
  }

  /**
  * Initial language test
  */
  test();

  /**
  * If nothing found, iterrate through languages
  */
  if( !found ){
    for( var l in langs ){
        lang = langs[l];
        test();
        if(found) return lang ;
    }
  }

  return out;

}



/** Convert json string to object with given name on window
 * @param {Object} m Options
 * @param {String} m.json to parse
 * @param {String} m.name to name new object
 */
export function jsonToObj(m) {
  window[m.name] = JSON.parse(m.json);
}

/** Used for shiny to print a message in js console. Usefull when the R console is not visible
 * @param{Object} m Options
 * @param {String} m.msg Message to print
 */

export function jsDebugMsg(m) {
  console.log(m.msg);
}


/** Add or remove a class depending on enable option. The element has a class, ex. "hidden" and this will remove the class if m.enable is true.
 * @param {Object} m Options
 * @param {String} m.element Element id
 * @param {String} m.hideClass Class to remove if enabled is true
 * @param {Boolean} m.hide Hide add hideClass to given element
 * @param {Boolean} m.disable Add disabled attr to element
 */
export function hide(m) {
  var element, prefix;

  if (!m || !(m.class || m.id)) return;
  if (!m.hideClass) m.hideClass = "mx-hide";
  if (m.hide === undefined) m.hide = true;
  if (m.hide === undefined) m.disable = true;

  prefix = (m.id === undefined) ? "." : "#";


  if (m.id) {
    element = prefix + m.id;
  } else {
    element = prefix + m.class;
  }

  var $el = $(element);

  if ($el.length > 0) {
    if (m.hide) {
      $el.addClass(m.hideClass);
    } else {
      $el.removeClass(m.hideClass);
    }
    if (m.disable) {
      $el.attr("disabled", true);
    } else {
      $el.attr("disabled", false);
    }
  }
  /* else{*/
  //return;
  //console.log("hide: element " + element + " not found.");
  /*}*/
}


/** Toggle panel visibility in panels group.
 * @param {String} classGroup Class of tab group 
 * @param {String} classItem Class of tab item to show
 * @param {String} classHide Class to add for hiding
 * @param {Function} callback Callback function with one argument : state of item hide/show;
 */
export function panelSwitch(classGroup, classItem, classHide, callback) {
  var elsGroup = document.querySelectorAll("." + classGroup); 
  if (!classHide) classHide = "mx-hide";
    mx.helpers.forEachEl({
      els : elsGroup,
      callback : function(el){    
         var isItem = el.classList.contains(classItem);
         var isHidden = el.classList.contains(classHide);
        
        if(isItem && isHidden){
          el.classList.remove(classHide);
          if(callback) callback("on");
        }

        if(isItem && ! isHidden){
         el.classList.add(classHide);
          if(callback) callback("off");
        }

        if(!isItem){
         el.classList.add(classHide);
        }
      }
    });

}




/**
 * Check if an object is a html element
 * @param {Object} obj object to test
 */
export function isElement(obj) {
  return obj instanceof Node;
}


/**
 * Class handling : add, remove and toggle
 * @param o {Object} options
 * @param o.selector {String|Element} selector of element to handle or element eg. #test, .test
 * @param o.class {String|Array} class name to process. By default, "mx-hide"
 * @param o.action {String} action to use : add, remove or toggle
 */
export function classAction(o) {
  var el, hasClass;

  if (!o.class) o.class = "mx-hide";
  if (!o.action) o.action = "toggle";

  if (o.class.constructor != Array){
    o.class = o.class.split(/\s+/);
  }

  if (isElement(o.selector)) {
    el = o.selector;
  } else {
    el = document.querySelectorAll(o.selector);
  }

  forEachEl({
    els : el,
    callback : classAction
  });

  function classAction(el){
    if (el && o.action) {

      o.class.forEach(function(cl){

        hasClass = el.classList.contains(cl);
        if (hasClass && (o.action == "remove" || o.action == "toggle")) {
          el.classList.remove(cl);
        }

        if (!hasClass && (o.action == "add" || o.action == "toggle")) {
          el.classList.add(cl);
        }
      });    
    }
  }
}


/**
 * Enable drag listener on id
 * @param {object} o Options
 * @param {string} o.id Div id to move
 * @param {array} o.enableClass class to use as draggable area
 * @param {array} o.disableClass Array of class on with drag is not listen
 */
export function draggable(o) {
  var el = document.getElementById(o.id);
  var x, y, x_to, y_to, isDragArea;

  if (!o.enableClass) o.enableClass = "mx-modal-drag-enable";

  mx.listener[o.id] = {};

  /**
   * mouse down + move : chage element coordinate
   */
  mx.listener[o.id].mousemove = debounce(function(event) {
    event.preventDefault();
    el.style.margin = "initial";
    el.style.left = x + event.clientX - x_to + 'px';
    el.style.top = y + event.clientY - y_to + 'px';
  });

  /*
   * mouse up :  remove "up" and "move" listener
   */
  mx.listener[o.id].mouseup = function(event) {
    event.preventDefault();
    window.removeEventListener('mousemove', mx.listener[o.id].mousemove, false);
    window.removeEventListener('mouseup', mx.listener[o.id].mouseup, false);
  };

  /**
   * mouse down : if it's draggable
   */
  mx.listener[o.id].mousedown = function(event) {

    isDragArea = event.target.className.indexOf(o.enableClass) > -1;

    if (isDragArea) {

      event.preventDefault();

      x = el.offsetLeft;
      y = el.offsetTop;
      x_to = event.clientX;
      y_to = event.clientY;

      window.addEventListener('mousemove', mx.listener[o.id].mousemove, false);
      window.addEventListener('mouseup', mx.listener[o.id].mouseup, false);

    }
  };

  el.addEventListener('mousedown', mx.listener[o.id].mousedown, false);

}

/**
 * Apply function on HTMLCollection
 * @param {Object} o options
 * @param {Object} o.els HTMLCollection egl div.children
 * @param {Function} o.callback Function to apply. Argument = element, iterator
 *
 */
export function forEachEl(o){
  if( isElement(o.els) ){
    o.callback(o.els);
  }else{
    for (var i = 0; i < o.els.length; ++i) {
      o.callback(o.els[i],i);
    }
  }
}

/**
* Get an object content an push it in an array
* @param {object} obj Object to convert
* @return {array}
*/
export function objectToArray( obj ){
  return Object.keys(obj).map(function (key) { return obj[key]; });
}


/**
 * Parent finder
 * @param {Object} o options;
 * @param {Element|string} o.selector Element or selector string;
 * @param {String} o.class Class of the parent 
 */
export function parentFinder(o) {
  var el;
  if (o.selector instanceof Node) {
    el = o.selector;
  } else {
    el = document.querySelector(o.selector);
  }

  while ((el = el.parentElement) && !el.classList.contains(o.class));
  return el;
}



/**
 * Handle sort event on list
 * 
 * Class for ul : sort-li-container
 * Class for li : sort-li-item
 * Class for handle : sort-li-handle (should be at first level in li);
 *
 * @param {Object} o options
 * @param {Element|String} o.selector Selector string or element for the ul root
 * @param {Function} o.callback Function to call after sort
 */
export function sortable_old(o){
  var ulRoot;
  if (o.selector instanceof Node) {
    ulRoot = o.selector;
  } else {
    ulRoot = document.querySelector(o.selector);
  }
  var body = document.querySelector("body");
  var liHandle,
    liFrom,
    liTo,
    liNext,
    liSet,
    liGhost,
    classFrom = "mx-sort-li-item",
    classHandle = "mx-sort-li-handle";

  function setPos(el, l, t) {
    l = l + "px";
    t = t + "px";
    el.style.left = l;
    el.style.top = t;
  }


  function areTouching(a, b) {
    var rectA = a.getBoundingClientRect();
    var rectB = b.getBoundingClientRect();
    var overlaps =
      rectA.top < rectB.bottom &&
      rectA.bottom > rectB.top &&
      rectA.right > rectB.left &&
      rectA.left < rectB.right;
    return overlaps;
  }


  function isValidHandle(el) {
    return el.classList.contains(classHandle);
  }
  function isValidLi(el) {
    return el.classList.contains(classFrom);
  }
  /**
   * mouse move
   */
  function onMouseMove(e) {

    liTo = e.target;
    setPos(liGhost, e.clientX, e.clientY);

    if (isValidLi(liTo)) {
      e.preventDefault();
      var rect = liTo.getBoundingClientRect();
      liNext = (e.clientY - rect.top) / (rect.bottom - rect.top) > 0.5;
      liSet = liNext && liTo.nextSibling || liTo;
      ulRoot.insertBefore(liFrom, liSet);
    }

    if (!areTouching(liGhost, body)) {
      onMouseUp(e);
    }

  }

  /*
   * mouse up 
   */
  function onMouseUp(e) {
    e.preventDefault();
    liFrom.classList.remove("mx-sort-li-dim");
    liGhost.remove();
    o.callback();
    window.removeEventListener('mousemove', onMouseMove, false);
    window.removeEventListener('mouseup', onMouseUp, false);
  }

  /**
   * mouse down
   */
  function onMouseDown(e) {
    var elHandle = e.target;
    liFrom = mx.helpers.parentFinder({
      selector : elHandle,
      class : classFrom
    });

    if (isValidHandle(elHandle) && liFrom) {
      e.preventDefault();
      liGhost = liFrom.cloneNode(true);
      var liFromStyle = liGhost.style;
      var liFromRect = liFrom.getBoundingClientRect();
      liGhost.classList.add("mx-sort-li-ghost");
      liFrom.classList.add("mx-sort-li-dim");
      ulRoot.appendChild(liGhost);
      onMouseMove(e);
      window.addEventListener('mousemove', onMouseMove, false);
      window.addEventListener('mouseup', onMouseUp, false);
    }

  }

  ulRoot.addEventListener('mousedown', onMouseDown, false);



}

/**
 * Set element attributes
 * @param {object} o options
 * @param {string} o.selector element selector
 * @param {string} o.atr attribute name
 * @param {string} o.val value
 */
export function setElementAttribute(o) {
  var el = document.getElementById(o.selector);
  if (el) {
    el.setAttribute(o.atr, o.val);
  }
}

/**
 * Set image attr
 * @param {object} o options
 * @param {string} o.id image id
 * @param {object} o.atr images attributes
 */
export function setImageAttributes(o) {
  var img = document.getElementById(o.id);

  if (img) {
    for (var a in o.atr) {
      img.setAttribute(a, o.atr[a]);
    }
  }
}


/**
 * Create and manage multiple progression bar
 * @param {Object} o Options
 * @param {boolean} o.enable Enable the screen 
 * @param {string} o.id Identifier of the given item
 * @param {number} o.percent Progress bar percentage
 * @param {string} o.text Optional text
 */
export function progressScreen(o) {
  var lItem, lItems, lScreen, lBody, lScreenBack, lScreenContainer;
  var pBarIn, pBarOut, pBarTxt;
  var id = o.id;
  var enable = o.enable !== undefined ? o.enable : false;
  var percent = o.percent !== undefined ? o.percent : 0;
  var text = o.text !== undefined ? o.text : "";

  lScreen = document.querySelector(".loading-screen");
  lScreenBack = document.querySelector(".loading-screen-background");
  lScreenContainer = document.querySelector(".loading-container");

  if (!enable) {
    if (lScreen) lScreen.remove();
    if (lScreenBack) lScreenBack.remove();
    return;
  }

  if (!id || !percent || !text) return;

  if (!lScreen && enable) {
    lBody = document.querySelector("body");
    lScreen = document.createElement("div");
    lScreenBack = document.createElement("div");
    lScreen.className = "loading-screen";
    lScreenBack.className = "loading-screen-background";
    lScreenContainer = document.createElement("div");
    lScreenContainer.className = "loading-container";
    lScreen.appendChild(lScreenContainer);
    lBody.appendChild(lScreenBack);
    lBody.appendChild(lScreen);
  }

  lItem = document.getElementById(id);

  if (!lItem) {
    lItem = document.createElement("div");
    lItem.className = "loading-item";
    lItem.setAttribute("id", id);
    pBarIn = document.createElement("div");
    pBarIn.className = "loading-bar-in";
    pBarOut = document.createElement("div");
    pBarOut.className = "loading-bar-out";
    pBarTxt = document.createElement("div");
    pBarTxt.className = "loading-bar-txt";
    pBarOut.appendChild(pBarIn);
    lItem.appendChild(pBarTxt);
    lItem.appendChild(pBarOut);
    lScreenContainer.appendChild(lItem);
  } else {
    pBarIn = lItem.getElementsByClassName("loading-bar-in")[0];
    pBarTxt = lItem.getElementsByClassName("loading-bar-txt")[0];
  }

  if (percent >= 100) {
    lItem = document.getElementById(id);
    if (lItem) lItem.remove();
  } else {
    pBarIn.style.width = percent + "%";
    pBarTxt.innerHTML = text;
  }

  lItems = lScreenContainer.getElementsByClassName("loading-item");

  if (lItems.length === 0) progressScreen({enable:false});

}


/** 
* Clone an object
* @param {Object|Array} Source to clone
*/
export function clone(obj){
  var copy, i;
  if ( obj === undefined || obj === null ) return {};
  if ( obj.constructor == Array ) {
    copy = [];
    obj.forEach(function(x,i){
      copy[i] = clone(x);
    });
    return copy;
  } else if (obj.constructor == Object) {
    copy = {};
    for (var prop in obj) {
      if (!obj.hasOwnProperty(prop)) continue;
        copy[prop] = clone(obj[prop]);
      }
    return copy;
  } else {
    return obj;
  }
}


/**
 * htmlToData 
 * @param {Object} o Options
 * @param {String|Element} o.selector Selector
 * @param {Number} o.scale Scale factor for output sizing
 * @param {String} o.style Add style rules to element
 */
export function htmlToData(o) {

  return new Promise(function(resolve,reject){
    var el, elClone, elCloneRect, elRect, tagToRemove;

    var out = "";

    if (o.selector instanceof Node) {
      el = o.selector;
    } else {
      el = document.querySelector(o.selector);
    }
    if(!el) resolve(undefined);

    if(!o.scale) o.scale=1;
    /**
     * Clone element and clean it. 
     * Some elements like input seems to break the SVG. Not Sure why.
     * Remove them is the way. Replace them by another tag does not work.
     */
    elClone = el.cloneNode(true);
    tagToRemove = ["input"];
    for(var i = 0 ; i < tagToRemove.length ; i++){
      elClone
        .querySelectorAll(tagToRemove[i])
        .forEach(function(x){
          x.remove();
        });
    }

    var addStyle = "padding:0px;margin:0px" + (o.style?";"+o.style:"");
    elClone.style = addStyle;
    el.parentElement.appendChild(elClone);
    elCloneRect = elClone.getBoundingClientRect();
    /**
     * SVG create
     */

    var data =
      "<svg xmlns='http://www.w3.org/2000/svg' width='" + elCloneRect.width*o.scale + "' height='" +elCloneRect.height*o.scale + "'>" +
      "<defs>" +
      "<style type='text/css'>" +
      readStyles([elClone]) +
      "</style>" +
      "</defs>" +
      "<foreignObject width='100%' height='100%'>" +
      "<div xmlns='http://www.w3.org/1999/xhtml'>" +
      elClone.outerHTML +
      "</div>" +
      "</foreignObject>" +
      "</svg>";

    var url = buildSvgImageUrl(data);

    elClone.remove();

    // resolve promise
    setImage(
      url,
      resolve,
      reject
    );

    /**
     * functions
     */

    function buildSvgImageUrl(svg) {
      var b64 = mx.helpers.utf8_to_b64(svg);
      return "data:image/svg+xml;base64," + b64;
    }

    /**
     * Css steal : krasimir/css-steal
     */ 

    // elements to array
    function toArray(obj, ignoreFalsy) {
      var arr = [], i;
      for (i = 0; i < obj.length; i++) {
        if (!ignoreFalsy || obj[i]) {
          arr[i] = obj[i];
        }
      }
      return arr;
    }

    // looping through the styles and matching
    function getRules(el) {
      var sheets = document.styleSheets, result = [];
      el.matches = el.matches || el.webkitMatchesSelector || el.mozMatchesSelector || el.msMatchesSelector || el.oMatchesSelector;
      for (var i in sheets) {
        var rules = sheets[i].rules || sheets[i].cssRules;
        for (var r in rules) {
          if (el.matches(rules[r].selectorText)) {
            result.push(rules[r].cssText);
          }
        }
      }
      return mx.helpers.getArrayStat({arr:result,stat:"distinct"}).join(" ");
    }

    // looping through the element's children
    function readStyles(els) {
      var res = els.reduce(function (styles, el) {
        styles.push(getRules(el));
        styles = styles.concat(readStyles(toArray(el.children)));
        return styles;  
      }, []);

      return mx.helpers.getArrayStat({arr:res,stat:"distinct"}).join(" ");
    }

    function setImage(url, resolve, reject) {
      var image = new Image();
      image.crossOrigin = 'Anonymous';
      image.onload = function() {
        var canvas = document.createElement('canvas');
        var ctx = canvas.getContext("2d");
        canvas.width = elCloneRect.width * o.scale;
        canvas.height = elCloneRect.height * o.scale;
        ctx.scale(o.scale, o.scale);
        ctx.drawImage(this, 0, 0);
        var data = canvas.toDataURL();
        resolve(data);
      };
      image.onerror = function(e) {
        reject(e);
      };
      image.src = url;
    }
  });
}



export function injectHead(items){
  var s = items.scripts || [];
  var c = items.css || [];

  if(!mx.data.headItems) mx.data.headItems = {};

  s.forEach(function(i){
    if(!mx.data.headItems[i]){
      mx.data.headItems[i]=true;
      var script = document.createElement("script");
      script.src=i;
      script.async=false;
      document.head.appendChild(script);
    }
  });

  c.forEach(function(i){
    if(!mx.data.headItems[i]){
      mx.data.headItems[i]=true;
      var link = document.createElement("link");
      link.rel="stylesheet";
      link.type="text/css";
      link.href=i;
      document.head.appendChild(link);
    }
  });

}


