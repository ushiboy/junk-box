const assert = require('assert');
import React from 'react';
import { shallow } from 'enzyme';
import NoteList from '../../../src/components/NoteList/NoteList';

describe('components', () => {

  describe('NoteList', () => {

    it('should render some items', () => {
      const notes = [
        {
          id: 1,
          text: 'test 1'
        },
        {
          id: 2,
          text: 'test 2'
        }
      ];
      const wrapper = shallow(<NoteList notes={notes} />);
      assert(wrapper.find('li').length === 2);
    });

  });

});
