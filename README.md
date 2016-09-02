# videojs-select-subtitle

Will automatically select subtitle track with selected language. Language can be specified by option `trackLanguage`.

Options Example:
```
{
  trackLanguage: 'es'
}
```

## Installation

```sh
npm install --save videojs-select-subtitle
```

## Usage

To include videojs-select-subtitle on your website or web application, use any of the following methods.

### `<script>` Tag

This is the simplest case. Get the script in whatever way you prefer and include the plugin _after_ you include [video.js][videojs], so that the `videojs` global is available.

```html
<script src="//path/to/video.min.js"></script>
<script src="//path/to/videojs-select-subtitle.min.js"></script>
<script>
  var player = videojs('my-video');

  player.selectSubtitle({ trackLanguage: 'es' });
</script>
```

### Browserify

When using with Browserify, install videojs-select-subtitle via npm and `require` the plugin as you would any other module.

```js
var videojs = require('video.js');

// The actual plugin function is exported by this module, but it is also
// attached to the `Player.prototype`; so, there is no need to assign it
// to a variable.
require('videojs-select-subtitle');

var player = videojs('my-video');

player.selectSubtitle({ trackLanguage: 'es' });
```

### RequireJS/AMD

When using with RequireJS (or another AMD library), get the script in whatever way you prefer and `require` the plugin as you normally would:

```js
require(['video.js', 'videojs-select-subtitle'], function(videojs) {
  var player = videojs('my-video');

  player.selectSubtitle({ trackLanguage: 'es' });
});
```

## License

Apache-2.0. Copyright (c) Lubos Krnac &lt;lubos.krnac@gmail.com&gt;


[videojs]: http://videojs.com/
