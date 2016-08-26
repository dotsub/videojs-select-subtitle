import videojs from 'video.js';

// Default options for the plugin.
const defaults = {};

/**
 * Function to invoke when the player is ready.
 *
 * This is a great place for your plugin to initialize itself. When this
 * function is called, the player will have its DOM and child components
 * in place.
 *
 * @function onPlayerReady
 * @param    {Player} player
 * @param    {Object} [options={}]
 */
const onPlayerReady = (player, options) => {
  player.addClass('vjs-select-subtitle');
  console.log("select subtitle");
  console.log("Options: " + options);
};

/**
 * A video.js plugin.
 *
 * In the plugin function, the value of `this` is a video.js `Player`
 * instance. You cannot rely on the player being in a "ready" state here,
 * depending on how the plugin is invoked. This may or may not be important
 * to you; if not, remove the wait for "ready"!
 *
 * @function selectSubtitle
 * @param    {Object} [options={}]
 *           An object of options left to the plugin author to define.
 */
const selectSubtitle = function(options) {
  console.log("Starting subtitle");
  this.ready(() => {
    onPlayerReady(this, videojs.mergeOptions(defaults, options));
  });
};

// Register the plugin with video.js.
videojs.plugin('selectSubtitle', selectSubtitle);

// Include the version number.
selectSubtitle.VERSION = '__VERSION__';

export default selectSubtitle;
