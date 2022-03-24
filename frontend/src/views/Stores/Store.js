import { Button, ButtonDropdown, InputGroup, InputGroupText, Card, CardHeader, CardBody, CardTitle, CardText, CardLink, Input, ListGroup, ListGroupItem, Badge, UncontrolledButtonDropdown, DropdownMenu, DropdownItem, DropdownToggle, CardFooter } from 'reactstrap'
import './store.css'
import { useState, useEffect} from 'react'
import Table from './TableMultilingual'
import Select from 'react-select'
import { selectThemeColors } from '@utils'
import Toast from 'light-toast'
import { Ellipsis} from 'react-spinners-css'

import "react-toastify/dist/ReactToastify.css"

import axios from "axios"

const Home = () => {

  
  const [cities, setCities] = useState({})
  const [types, setTypes] = useState({})
  //search bottom first 10 data state
  const [storedata, setStoredata] = useState([])
  // to see if search bottom is clicked or not for pagination
  const [searched, setSearched] = useState(false)
  // get page numbers for pagination 0 or pagenumbers
  const [paginationnumbers, setpaginationnumbers] = useState(0) 
  // get number of rows for total input
  const [numberofrows, setnumberofrows] = useState(0) 

  // handling multiselect and add to cities state
  const [style, setstyle] = useState("dropdown1")
  const [style2, setstyle2] = useState("dropdown2")
  const [loading, setloading] = useState(true)

  useEffect(() => {
    const data = {cities, types}
    axios.post("http://localhost:5000/store/total", data).then((response) => {
      if (response.data.error) {
        console.log(response.data)
      } else {
        setnumberofrows(response.data.numberofrows)
            
      }
    })

}, [cities, types])

  const selectsetcities =  (newvalue) => { 

    if (newvalue.length > 2) {
      setstyle("dropdown1A")
    } else {
      setstyle("dropdown1")
    }
    
    const ci = []
    for (let i = 0; i < newvalue.length; i++) {
      ci.push(newvalue[i].value)
    }
    setCities(ci)
  }

 
  // handling multiselect and add to types state
  const selectsettypes =  (newvalue) => { 
    if (newvalue.length > 1) {
      setstyle2("dropdown2A")
    } 
    if (newvalue.length === 1) {
      setstyle2("dropdown2")
    }
    const ty = []
    for (let j = 0; j < newvalue.length; j++) {
      ty.push(newvalue[j].value)
    }
    setTypes(ty)
  
  }

  //options for cities and types
const citiesoptions = [
  { value: 'Beirut', label: 'Beirut', isFixed: true },
  { value: 'Saida', label: 'Saida', isFixed: true },
  { value: 'Sour', label: 'Sour', isFixed: true }
]
const typeOptions = [
  { value: 'Restaurant', label: 'Restaurant', isFixed: true },
  { value: 'Cafe', label: 'Cafe', isFixed: true },
  { value: 'Coffee shop', label: 'Coffee shop', isFixed: true },
  { value: 'Pub', label: 'Pub', isFixed: true },
  { value: 'Bar', label: 'Bar', isFixed: true }
]

// search button handle
  const searchstore = () => {
    setloading(false)   
    if (Object.keys(cities).length === 0 && Object.keys(types).length === 0) {
      setloading(true)   

      console.log('cities or types ar null')
      Toast.fail('Both Selectors Cant be empty', 2000)
      setStoredata([])
    } else {
      const data = { cities, types }
      axios.post("http://localhost:5000/store/getstores", data).then((response) => {
        if (response.data.error) {
          console.log(response.data)
        } else {
          setSearched(true)
          setStoredata(response.data)
          axios.post("http://localhost:5000/store/paginationnumbers", data).then((response) => {
            if (response.data.error) {
              console.log(response.data)
            } else {
              console.log(response.data.numberofpages)
              console.log(response.data.numberofrows)
              setpaginationnumbers(response.data.numberofpages)
              setnumberofrows(response.data.numberofrows)
              setloading(true)   
            }
          })
          
        }
      })
    }

  
  }

  return (
    <div>
      <Card className='card'>
        <CardHeader>
       
          <CardTitle>Search Bar</CardTitle>
          {loading ? <div></div> : <Ellipsis size={45} color="#138fa5" /> }
          
          
        </CardHeader>
        <CardBody className='cardbody' >
        <Select
              isClearable={false}
              theme={selectThemeColors}
              isMulti
              name='Cities'
              options={citiesoptions}
              className= { style.concat(' react-select') }
              classNamePrefix='select'
              onChange={selectsetcities}
   
            />
             <Select
              isClearable={false}
              theme={selectThemeColors}
              isMulti
              name='colors'
              options={typeOptions}
              className= { style2.concat(' react-select') }
              classNamePrefix='select'
              onChange={selectsettypes}

            />
        
          <InputGroup className='mb-2 totalinput' >
            <InputGroupText>
              Total
            </InputGroupText>
            <Input placeholder={numberofrows} disabled />
          </InputGroup>
          <Button.Ripple color='primary'  className="searchstore" onClick={searchstore}>Search</Button.Ripple>
          

        </CardBody>
      </Card>
      <Table storedata={storedata} cities={cities} types={types} searched={searched} paginationnumbers={paginationnumbers} />
     

    </div>
  )
}

export default Home
