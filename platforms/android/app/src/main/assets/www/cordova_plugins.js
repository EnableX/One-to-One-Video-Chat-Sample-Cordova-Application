cordova.define('cordova/plugin_list', function(require, exports, module) {
  module.exports = [
    {
      "id": "enablex-cordova-plugin.enxcordovaplugin",
      "file": "plugins/enablex-cordova-plugin/www/enxcordovaplugin.js",
      "pluginId": "enablex-cordova-plugin",
      "clobbers": [
        "EnxRtc"
      ],
      "runs": true
    }
  ];
  module.exports.metadata = {
    "cordova-plugin-enable-multidex": "0.2.0",
    "cordova-plugin-whitelist": "1.3.4",
    "enablex-cordova-plugin": "1.9.3"
  };
});