window.saveAs = require('../vendor/saveas.js').saveAs;

var OBJExporter = require('./three-obj-exporter.js');

/**
 * GLTF Exporter component for A-Frame.
 */
AFRAME.registerSystem('obj-exporter', {
  schema: {
    verbose: {default: false}
  },

  /**
   * Set if component needs multiple instancing.
   */
  multiple: false,

  /**
   * Called once when component is attached. Generally for initial setup.
   */
  init: function () {
    this.link = document.createElement('a');
    this.link.style.display = 'none';
    document.body.appendChild(this.link);

    this.exporter = new OBJExporter();
  },

  download: function (blob, filename)
  {
    this.link.href = URL.createObjectURL( blob );
    this.link.download = filename;
    this.link.click();
  },

  downloadBinary: function (value, filename) {
    this.download(new Blob([value], {type: 'application/octet-stream'}), filename);
  },

  downloadJSON: function (text, filename) {
    this.download(new Blob([text], {type: 'txt'}), filename);
  },

  export: function ( input, options ) {

    var inputObject3D;

    // If no entity provided, use the current scene
    if (typeof input === 'undefined') {
      inputObject3D = this.sceneEl.object3D;
    } else if (input instanceof Array) {
      inputObject3D = input.map(function (entity) { return entity.object3D; });
    } else if (input instanceof NodeList) {
      inputObject3D = Array.prototype.slice.call(input).map(function (entity) { return entity.object3D; });
    } else {
      inputObject3D = input.object3D;
    }

    var self = this;
    let objData = this.exporter.parse(inputObject3D);
    this.download(new Blob([objData], {type: 'txt'}), 'scene.obj');
  },
});

require('./atlas.js');
require('./dragndrop.js');
require('./binarymanager.js');
require('../vendor/OrbitControls.js');
require('./sharedbuffergeometrymanager.js');
require('./sharedbuffergeometry.js');

require('./utils.js');
require('./ui2d.js');

require('./systems/brush.js');
require('./systems/ui.js');
require('./systems/painter.js');

require('./components/brush.js');
require('./components/if-no-vr-headset.js');
require('./components/json-model.js');
require('./components/orbit-controls.js');
require('./components/paint-controls.js');
require('./components/ui.js');
require('./components/ui-raycaster.js');

require('./brushes/line.js');
require('./brushes/stamp.js');
require('./brushes/spheres.js');
require('./brushes/cubes.js');
require('./brushes/rainbow.js');
require('./brushes/single-sphere.js');
