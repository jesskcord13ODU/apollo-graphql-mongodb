
import React from 'react';
import ReactDOM from 'react-dom'
import { render } from '@testing-library/react';
import { shallow } from 'enzyme'
import { Login } from './components/Login';

test('renders without crashing', () => {
    const wrapp = shallow(<Login />)

});
