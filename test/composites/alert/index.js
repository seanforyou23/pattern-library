'use strict';

const assert = require('chai').assert;
const Classlist = require('classlist');
const fire = require('simulant').fire;
const snippet = require('./fixture.html');
const Fixture = require('../../fixture');
const global = require('../../../lib/global');
const index = require('../../../lib/composites/alert');

describe('composites/alert', () => {
  let fixture, element, trigger;
  before(() => {
    fixture = new Fixture();
    // NOTE: only call this once so delegated
    // events don't get attached multiple times
    global();
    index();
  });

  beforeEach(() => {
    fixture.create(snippet);
    const el = fixture.element;
    element = el.querySelector('.dqpl-alert');
    trigger = document.querySelector(`[data-dialog-id="${element.id}"]`);
  });

  afterEach(() => fixture.destroy());
  after(() => fixture.cleanUp());

  describe('clicking a trigger', () => {
    it('should show the alert', () => {
      fire(trigger, 'click');
      assert.isTrue(Classlist(element).contains('dqpl-dialog-show'));
    });

    it('should not attempt to open the alert if it cannot be found', () => {
      trigger.removeAttribute('data-dialog-id');
      fire(trigger, 'click');
      assert.isFalse(Classlist(element).contains('dqpl-dialog-show'));
    });
  });

  describe('keydowns on modals', () => {
    describe('escape', () => {
      it('should NOT call close', () => {
        fire(trigger, 'click'); // Shows the alert
        assert.isTrue(Classlist(element).contains('dqpl-dialog-show'));
        fire(element, 'keydown', { which: 27 });
        assert.isTrue(Classlist(element).contains('dqpl-dialog-show'));
      });
    });
  });
});
