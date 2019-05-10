import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import {el} from '@fxi/el';

import MediumEditor from 'medium-editor';
import 'medium-editor/dist/css/medium-editor.min.css';
import './../css/map_composer_medium_editor.css';

import {Box} from './box.js';

class Item extends Box {
  constructor(boxParent, config) {
    super(boxParent);
    var item = this;
    item.resizeAction = [];
    item.orig = config;
    item.type = config.type;
    item.title = 'item-' + item.type;

    item.init({
      class: 'mc-' + item.type,
      content: item.buildEl(),
      boxContainer: item.boxParent,
      boxBound: item.boxParent.boxParent,
      boundEdges: {top: true, left: true, bottom: false, right: false},
      draggable: true,
      resizable: true,
      removable: true,
      onRemove: item.onRemove.bind(item),
      onResize: item.onResize.bind(item),
      width: config.width || item.state.item_width,
      height: config.height || item.state.item_height
    });
  }

  buildEl() {
    let item = this;
    let type = item.type;
    if (type === 'map') {
      return this.buildElMap();
    }
    if (type === 'title' || type === 'text') {
      return this.buildElText();
    }
    if (type === 'legend' || type === 'element') {
      return this.buildElNode();
    }
    console.warn('type ' + type + 'not known');
  }

  onResize() {
    var item = this;
    item.resizeAction.forEach((a) => a());
    this.displayDim();
  }

  onRemove() {
    var item = this;
    if (item.map) {
      item.map.remove();
    }
    if (item.editor) {
      item.editor.destroy();
    }
  }

  buildElNode() {
    var item = this;
    var elOut = el(
      'div',
      {
        class: ['mc-item', 'mc-item-element']
      },
      this.orig.element
    );

    item.editor = new MediumEditor(elOut, {
      elementsContainer: item.boxParent.el
    });
    return elOut;
  }

  buildElText() {
    var item = this;
    var elOut = el('span', {
      class: ['mc-item', 'mc-item-text']
    });
    elOut.innerText = item.orig.text;
    item.editor = new MediumEditor(elOut, {
      elementsContainer: item.page.el
    });
    return elOut;
  }

  buildElMap() {
    var item = this;

    var elOut = el('div', {
      class: ['mc-item', 'mc-item-map']
    });

    var mapOptions = Object.assign(
      {
        preserveDrawingBuffer: true,
        container: elOut,
        fadeDuration: 0
      },
      item.orig.options
    );

    item.map = new mapboxgl.Map(mapOptions);
    item.map.addControl(new mapboxgl.ScaleControl(), 'bottom-right');
    item.map.addControl(new mapNorthArrow(), 'top-right');

    item.resizeAction.push(function() {
      item.map.resize();
    });
    return elOut;
  }
}

export {Item};

function mapNorthArrow() {}

mapNorthArrow.prototype.onAdd = function(map) {
  var elArrow;
  var imgSvg = require('../svg/arrow-north.svg');

  var elNorthCtrl = el(
    'div',
    {
      class: 'mapboxgl-ctrl'
    },
    (elArrow = el('img', {
      src: imgSvg,
      class: 'mc-map-arrow',
      style: {
        width: '20px',
        height: '20px',
        transformOrigin: '50% 50% 0'
      }
    }))
  );

  map.on('rotate', function() {
    var b = map.getBearing();
    elArrow.style.transform = 'rotate(' + -b + 'deg)';
  });

  this._container = elNorthCtrl;

  return this._container;
};

mapNorthArrow.prototype.onRemove = function() {
  this._container.parentNode.removeChild(this._container);
  this._map = undefined;
};
