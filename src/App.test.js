import React from 'react'
import { shallow } from 'enzyme'
import App from './App'
import './setupTests'
import Navigation from './components/UI/Navigation'
import Routes from './routes'

describe('<App />', () => {
  const app = shallow(<App />)

  it('wraps everything in a MuiThemeProvider tag', () => {
    expect(app).toHaveTagName('MuiThemeProvider')
  })

  it('contains a Route', () => {
    expect(app).toContainReact(<Routes />)
  })

})
