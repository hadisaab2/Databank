import { Button, ButtonDropdown, InputGroup, InputGroupText, Card, CardHeader, CardBody, CardTitle, CardText, CardLink, Input, ListGroup, ListGroupItem, Badge, UncontrolledButtonDropdown, DropdownMenu, DropdownItem, DropdownToggle } from 'reactstrap'
import './doctor.css'
import { useState } from 'react'
import Table from './Doctorstable'
import Select from 'react-select'
import { selectThemeColors } from '@utils'


const Home = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [state, setstate] = useState("Select Country")
  const toggle = () => setDropdownOpen(prevState => !prevState)
  const countries = ['Lebanon', 'Syria', 'Jordan']
  const [dropdownOpen2, setDropdownOpen2] = useState(false)
  const [state2, setstate2] = useState("Select type")
  const toggle2 = () => setDropdownOpen2(prevState => !prevState)
  const type = ['barbershop', 'carshop', 'restaurant']
  //const [cities, setCities] = useState({})


  const getselector = async (newvalue) => { 
    const ci = []
    for (let i = 0; i < newvalue.length; i++) {
      ci.push(newvalue[i].value)
    }
    setCities(ci)
     
  }

const colorOptions = [
  { value: 'ocean', label: 'Ocean', color: '#00B8D9', isFixed: true },
  { value: 'blue', label: 'Blue', color: '#0052CC', isFixed: true },
  { value: 'purple', label: 'Purple', color: '#5243AA', isFixed: true },
  { value: 'red', label: 'Red', color: '#FF5630', isFixed: false },
  { value: 'orange', label: 'Orange', color: '#FF8B00', isFixed: false },
  { value: 'yellow', label: 'Yellow', color: '#FFC400', isFixed: false }
]

  return (
    <div>
      <Card className='card'>
        <CardHeader>
          <button  >submit</button>
          <CardTitle>Search Bar</CardTitle>
          <Select
              isClearable={false}
              theme={selectThemeColors}
              isMulti
              name='colors'
              options={colorOptions}
              className='react-select'
              classNamePrefix='select'
              onChange={getselector}
              

            />
          
        </CardHeader>
        <CardBody className='cardbody' >
          <ButtonDropdown isOpen={dropdownOpen} toggle={toggle}  className="dropdown1 "  isMulti >
            <DropdownToggle color='primary' caret >
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
          <InputGroup className='mb-2 totalinput'  >
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
