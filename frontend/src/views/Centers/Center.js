import { Button, ButtonDropdown, InputGroup, InputGroupText, Card, CardHeader, CardBody, CardTitle, CardText, CardLink, Input, ListGroup, ListGroupItem, Badge, UncontrolledButtonDropdown, DropdownMenu, DropdownItem, DropdownToggle } from 'reactstrap'
import './center.css'
import { useState } from 'react'
import Table from './CenterTable'


const Home = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [state, setstate] = useState("Select Country")
  const toggle = () => setDropdownOpen(prevState => !prevState)
  const countries = ['Lebanon', 'Syria', 'Jordan']
  const [dropdownOpen2, setDropdownOpen2] = useState(false)
  const [state2, setstate2] = useState("Select type")
  const toggle2 = () => setDropdownOpen2(prevState => !prevState)
  const type = ['barbershop', 'carshop', 'restaurant']

  return (
    <div>
      <Card className='cardsd'>
        <CardHeader>
          <CardTitle>Search Bar</CardTitle>
        </CardHeader>
        <CardBody className='cardbodytt' >
          <ButtonDropdown isOpen={dropdownOpen} toggle={toggle}  className="dropdown1 " >
            <DropdownToggle color='primary' caret>
              {state}
            </DropdownToggle>
            <DropdownMenu>
              {countries.map((val) => {
                return <DropdownItem onClick={() => setstate(val)}>{val}</DropdownItem>
              })}

            </DropdownMenu>
          </ButtonDropdown>
          <ButtonDropdown isOpen={dropdownOpen2} toggle={toggle2} className="dropdown2" >
            <DropdownToggle color='primary' caret>
            {state2}
            </DropdownToggle>
            <DropdownMenu>
            {type.map((val2) => {
                return <DropdownItem onClick={() => setstate2(val2)}>{val2}</DropdownItem>
              })}
              
            </DropdownMenu>
          </ButtonDropdown>
          <InputGroup className='mb-2 totalinput' >
            <InputGroupText>
              Total
            </InputGroupText>
            <Input placeholder='' disabled />
          </InputGroup>
          <Button.Ripple color='primary' className="searchstore" >Search</Button.Ripple>

        </CardBody>
      </Card>
      <Table />


    </div>
  )
}

export default Home
