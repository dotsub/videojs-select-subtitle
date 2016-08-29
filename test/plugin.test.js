import document from 'global/document';

import QUnit from 'qunit';
import sinon from 'sinon';
import videojs from 'video.js';

import plugin from '../src/plugin';

const Player = videojs.getComponent('Player');

QUnit.test('the environment is sane', function(assert) {
  assert.strictEqual(typeof Array.isArray, 'function', 'es5 exists');
  assert.strictEqual(typeof sinon, 'object', 'sinon exists');
  assert.strictEqual(typeof videojs, 'function', 'videojs exists');
  assert.strictEqual(typeof plugin, 'function', 'plugin is a function');
});

QUnit.module('videojs-select-subtitle', {

  beforeEach() {

    // Mock the environment's timers because certain things - particularly
    // player readiness - are asynchronous in video.js 5. This MUST come
    // before any player is created; otherwise, timers could get created
    // with the actual timer methods!
    this.clock = sinon.useFakeTimers();

    this.fixture = document.getElementById('qunit-fixture');
    this.video = document.createElement('video');
    this.fixture.appendChild(this.video);
    this.player = videojs(this.video);
  },

  afterEach() {
    this.player.dispose();
    this.clock.restore();
  }
});

QUnit.test('registers itself with video.js', function(assert) {
  assert.expect(2);

  assert.strictEqual(
    Player.prototype.selectSubtitle,
    plugin,
    'videojs-select-subtitle plugin was registered'
  );

  this.player.selectSubtitle();

  // Tick the clock forward enough to trigger the player to be "ready".
  this.clock.tick(1);

  assert.ok(
    this.player.hasClass('vjs-select-subtitle'),
    'the plugin adds a class to the player'
  );
});

const testTrackSelection = (player, assert, trackLanguage, expectedTrackIdShowed) => {
  assert.expect(1);

  // GIVEN
  const options = { trackLanguage };
  const textTracksStub = sinon.stub(player, 'textTracks');
  const tracks = {
    0: { language: 'zh-CN', mode: 'disabled' },
    1: { language: 'en', mode: 'disabled' },
    2: { language: 'ja', mode: 'disabled' },
    3: { language: 'es', mode: 'disabled' },
    length: 4
  };

  textTracksStub.returns(tracks);

  player.selectSubtitle(options);

  // WHEN
  player.trigger('play');

  // THEN
  assert.equal(tracks[expectedTrackIdShowed].mode, 'showing');

  player.textTracks.restore();
};

QUnit.test('selects Spanish subtitle track based on options', function(assert) {
  testTrackSelection(this.player, assert, 'es', 3);
});

QUnit.test('selects English subtitle track based on options', function(assert) {
  testTrackSelection(this.player, assert, 'en', 1);
});
