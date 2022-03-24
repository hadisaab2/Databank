import { Button, ButtonDropdown, InputGroup, InputGroupText, Card, CardHeader, CardBody, CardTitle, CardText, CardLink, Input, ListGroup, ListGroupItem, Badge, UncontrolledButtonDropdown, DropdownMenu, DropdownItem, DropdownToggle } from 'reactstrap'
import './facebook.css'
import { useState } from 'react'
import Table from './Facebooktable'
import '@styles/react/libs/input-number/input-number2.scss'

import InputNumber from 'rc-input-number'
import { Plus, Minus } from 'react-feather'


const Home = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [state, setstate] = useState("Select Country")
  const toggle = () => setDropdownOpen(prevState => !prevState)
  const countries = ['Lebanon', 'Syria', 'Jordan']
  
  return (
    <div>
      <Card className='facebookcard'>
        <CardHeader>
          <CardTitle>Search Bar</CardTitle>
        </CardHeader>
        <CardBody className='facebookcardbody' >
          <ButtonDropdown isOpen={dropdownOpen} toggle={toggle}  className="facebookdropdown " >
            <DropdownToggle color='primary' caret>
              {state}
            </DropdownToggle>
            <DropdownMenu>
              {countries.map((val) => {
                return <DropdownItem onClick={() => setstate(val)}>{val}</DropdownItem>
              })}

            </DropdownMenu>
          </ButtonDropdown>
         
          <InputGroup className='mb-2'  className="facebooktotalinput" >
            <InputGroupText>
              Total
            </InputGroupText>
            <Input placeholder='' disabled />
          </InputGroup>
          <InputNumber
              min={0}
              upHandler={<Plus />}
              downHandler={<Minus />}
              id='min-max-number-input'
              className='facebookminmax'
            />
          
          <Button.Ripple color='primary' className="searchfacebook" >Search</Button.Ripple>

        </CardBody>
      </Card>
      <Table />


    </div>
  )
}

export default Home
