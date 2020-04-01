
import React from 'react';
import ReactDOM from 'react-dom'
import { render } from '@testing-library/react';
import { shallow } from 'enzyme'
import { Header } from './components/Landmarks';

test('renders without crashing', () => {
    const wrapp = shallow(<Header />)

});
