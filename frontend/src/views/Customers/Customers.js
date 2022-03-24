import { Button, ButtonDropdown, InputGroup, InputGroupText, Card, CardHeader, CardBody, CardTitle, CardText, CardLink, Input, ListGroup, ListGroupItem, Badge, UncontrolledButtonDropdown, DropdownMenu, DropdownItem, DropdownToggle, CardFooter } from 'reactstrap'
import { useState, useEffect } from 'react'
import Table from './CustomerTable'
import '@styles/react/libs/input-number/input-number.scss'
import Select from 'react-select'
import { selectThemeColors } from '@utils'
import axios from "axios"
import { Ellipsis} from 'react-spinners-css'
import Toast from 'light-toast'
import InputNumber from 'rc-input-number'
import { Plus, Minus } from 'react-feather'
import './customers.css'
import { countries, interestsoptions } from './customersdata'


const Home = () => {
  //usestate for styling multiselector width
  const [style, setstyle] = useState("interestsdropdown")
 //interests selector usestate object
  const [interests, setinterests] = useState({})

  const [dropdownOpen, setDropdownOpen] = useState(false)
  //country selector usestate
  const [country, setcountry] = useState("Select Country")
  const toggle = () => setDropdownOpen(prevState => !prevState)
  //available countries
   //search bottom first 10 data state
   const [storedata, setStoredata] = useState([])
   // to see if search bottom is clicked or not for pagination
   const [searched, setSearched] = useState(false)
   // get page numbers for pagination 0 or pagenumbers
   const [paginationnumbers, setpaginationnumbers] = useState(0) 
   // get number of rows for total input
   const [numberofrows, setnumberofrows] = useState(0) 
   //limit value use state(input number)
   const [limit, setlimit] = useState()
   //loader when axios is handled
   const [loading, setloading] = useState(true)
   //disabling selectors when axios is handled
   const [disabling, setdisabling] = useState(false)
   //search use state
   const [search, setsearch] = useState("")


//use effect handled when ever the interests or countries changes(gets the number of total rows and set it in the number of rows state)
   useEffect(() => {
    setloading(false)   
    setdisabling(false)
    const data = {interests, country}
    try {
    axios.post("http://localhost:5000/interest/total", data).then((response) => {
      if (response.data.error) {
        console.log(response.data)
      } else {
        setnumberofrows(response.data.numberofrows)
        setloading(true) 
        setdisabling(false)
      }
    })
    } catch (err) {
    console.log(err)
    }
 
}, [interests, country])


  const selectsetinterests =  (newvalue) => { 
    console.log(newvalue.length)
    if (newvalue.length > 1) {
      setstyle("interestsdropdownA")
    } else {
      setstyle("interestsdropdown")
    }
    
    const inter = []
    for (let i = 0; i < newvalue.length; i++) {
      inter.push(newvalue[i].value)
    }
    setinterests(inter)
    console.log(interests)
  }


  // search button handle
  const searchstore = () => {
    setdisabling(true)
    //if both selectors are empty
    if (Object.keys(interests).length === 0 && country === "Select Country") {
      Toast.fail('Both Selectors Cant be empty', 2000)
      setStoredata([])
      setdisabling(false)

    } else {
      const data = { interests, country, limit, search }
      try {
      axios.post("http://localhost:5000/interest/getinterests", data).then((response) => {
        if (response.data.error) {
          console.log(response.data)
        } else {
          setSearched(true)
          setStoredata(response.data)
          axios.post("http://localhost:5000/interest/paginationnumbers", data).then((response) => {
            if (response.data.error) {
              console.log(response.data)
            } else {
              console.log(response.data.numberofpages)
              console.log(response.data.numberofrows)
              setpaginationnumbers(response.data.numberofpages)
              //if (search) {
              setnumberofrows(response.data.numberofrows) 
             // }
              setdisabling(false)
              //setlimitdisable(false)
            }
          })
          
        }
      })
    } catch (err) {
      console.log(err)
    }
    }
  
  }
 //limit HANDLER
  const handlelimit = (value) => {
    setlimit(value)
  }
  //search handler
  const handlesearch = (event) => {
    setsearch(event.target.value)

  }

  return (
    <div>
      <Card className='customercard'>
        <CardHeader className='customercardheader' >
          <CardTitle className='customercardtitle'>Search Bar</CardTitle>
          {loading ? <div></div> : <Ellipsis size={45} color="#138fa5" style={{marginRight:"52%"}} /> }          
          <InputGroup className='mb-2 customerssearchinput' >
              <InputGroupText>
                Search
              </InputGroupText>
              <Input value={search} onChange={handlesearch}/>
          </InputGroup>

        </CardHeader>
        <CardBody className='customercardbody'  >
          <Select
              isClearable={false}
              theme={selectThemeColors}
              isMulti
              name='Cities'
              options={interestsoptions}
              className= { style.concat(' react-select') }
              classNamePrefix='select'
              onChange={selectsetinterests}
              isDisabled ={disabling}
   
            />            
            <ButtonDropdown isOpen={dropdownOpen} toggle={toggle} className="customersdropdown " >
              <DropdownToggle color='primary' caret disabled = {disabling}>
                {country}
              </DropdownToggle>
              <DropdownMenu>
                {countries.map((val) => {
                  return <DropdownItem onClick={() => setcountry(val)}>{val}</DropdownItem>
                })}

              </DropdownMenu>
            </ButtonDropdown>
            <InputNumber
              min={1}
              ///max={numberofrows}
              onChange={handlelimit}
              upHandler={<Plus />}
              downHandler={<Minus />}
              id='min-max-number-input'
              className='minmax2'
              //disabled={limitdisable}
              
            />

            <InputGroup className='mb-2 customerstotalinput' >
              <InputGroupText>
                Total
              </InputGroupText>
              <Input placeholder={numberofrows} disabled  style = {{color:"#138fa5" }}/>
            </InputGroup>
            
            <Button.Ripple color='primary' className="searchcustomers"  onClick={searchstore} disabled ={disabling} >Search</Button.Ripple>

        </CardBody>
      </Card>
      <Table storedata={storedata} search={search} limit={limit} interests={interests} country={country} searched={searched} paginationnumbers={paginationnumbers}  />


    </div>
  )
}

export default Home
