const assert = require('power-assert');
import * as dashboard from '../../src/modules/dashboard';


describe('dashboard', () => {

  describe('action', () => {

    describe('fetchMyNotes()', () => {

      it('should return fetched notes', () => {
        return dashboard.fetchMyNotes()
          .then(result => {
            assert(result.type === dashboard.FETCH);
          });
      });

    });

  });

  describe('reducer', () => {
    const reducer = dashboard.default;

    context('FETCH', () => {
      it('should return notes', () => {
        const result = reducer({}, {
          type: dashboard.FETCH,
          payload: {
            notes: [
              {
                id:1,
                text: 'test'
              }
            ]
          }
        });
        assert(result.notes[0].id === 1);
        assert(result.notes[0].text === 'test');
      });
    });

  });

});
