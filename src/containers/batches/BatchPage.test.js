import React from 'react'
import { shallow } from 'enzyme'
import sinon from 'sinon'
import BatchPage from './BatchPage'
import StudentEditor from '../../containers/students/StudentEditor'
import RaisedButton from 'material-ui/RaisedButton'


describe('<BatchPage />', () => {
  const wrapper = shallow(<BatchPage />)
  it('renders one <StudentEditor /> component', () => {
    expect((wrapper).find(StudentEditor)).to.have.length(1)
  })

  it('renders one <RaisedButton /> component', () => {
  const wrapper = shallow(<BatchPage />)
  expect((wrapper).find(RaisedButton)).toBePresent();
  })

  it('simulate click events', () => {
    const onClick = sinon.spy()
    const wrapper = shallow(<RaisedButton onClick={this.getRandomStudent.bind(this)} />)
    wrapper.find('button').simulate('click')
    expect(onClick).to.have.property('callCount', 1)
  })

})
