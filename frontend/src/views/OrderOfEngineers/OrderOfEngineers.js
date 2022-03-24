import { Button, ButtonDropdown, InputGroup, InputGroupText, Card, CardHeader, CardBody, CardTitle, CardText, CardLink, Input, ListGroup, ListGroupItem, Badge, UncontrolledButtonDropdown, DropdownMenu, DropdownItem, DropdownToggle } from 'reactstrap'
import './orderofengineers.css'
import { useState } from 'react'
import Table from './OFEtable'
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
      <Card className='ofecard'>
        <CardHeader>
          <CardTitle>Search Bar</CardTitle>
        </CardHeader>
        <CardBody className='ofecardbody' >
          <ButtonDropdown isOpen={dropdownOpen} toggle={toggle}  className="ofedropdown " >
            <DropdownToggle color='primary' caret>
              {state}
            </DropdownToggle>
            <DropdownMenu>
              {countries.map((val) => {
                return <DropdownItem onClick={() => setstate(val)}>{val}</DropdownItem>
              })}

            </DropdownMenu>
          </ButtonDropdown>
          <Input placeholder='CampaignName' className="ofecampaigninput" />
         
          <InputGroup className='mb-2'  className="ofetotalinput" >
            <InputGroupText>
              Total
            </InputGroupText>
            <Input placeholder='10183' disabled />
          </InputGroup>
          <InputNumber
              min={0}
              upHandler={<Plus />}
              downHandler={<Minus />}
              id='min-max-number-input'
              className='ofeminmax'
            />
          
          <Button.Ripple color='primary' className="searchofe" >Search</Button.Ripple>

        </CardBody>
      </Card>
      <Table />


    </div>
  )
}

export default Home
