import 'react-native';
import React from 'react';
import App from '../src/App';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { expect } from 'chai'
Enzyme.configure({ adapter: new Adapter() });
import {
  Text,
  View
} from 'react-native';

global.fetch = jest.fn(() => new Promise(resolve => resolve()));

const wrapper = shallow(
  <App />
);
describe('Testing main component', () => {
  it('App component renders correctly', () => {
    expect(wrapper.type()).to.equal(View);
  });

  it('should set loading view', () => {
    wrapper.setState({isLoading: true});
    expect(wrapper.contains(<Text>Loading...</Text>)).to.equal(true);
  });
  it('should hide loading view', () => {
    wrapper.setState({isLoading: false});
    expect(wrapper.contains(<Text>Loading...</Text>)).to.equal(false);
  });

});