// ** React Imports
import { useState, useEffect, useContext } from "react"
// ** Third Party Components
import DataTable from "react-data-table-component"
import { ChevronDown, Share, FileText, File } from "react-feather"
import Pagination from "@mui/material/Pagination"
import axios from "axios"
import Toast from 'light-toast'
import TextField from '@mui/material/TextField'
import {AuthContext} from  "../../context/authContext/AuthContext"
import { multiLingColumns } from './customersdata'

// ** Reactstrap Imports
import {
  Card,
  CardTitle,
  CardHeader,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
  UncontrolledButtonDropdown,
  CardFooter,
  Modal,
  ModalBody,
  ModalHeader
} from "reactstrap"

const DataTableWithButtons = ({
  //props
  storedata,
  interests,
  country,
  searched,
  paginationnumbers,
  limit,
  search
}) => {
  //data that changes with pagination and search
  const [data2, setData2] = useState([])
  const [disable, setdisable] = useState(false)
  //export csv disable
  const [exportdisable, setexportdisable] = useState(false)
  //modal visible not visible
  const [centeredModal, setCenteredModal] = useState(false)


  //title description handles
  const [description, setdescription] = useState()
  const [title, settitle] = useState("")


  //setting error in modal
  const [error, seterror] = useState("")
  //user logged in 
  const {user} = useContext(AuthContext)

  //handling functions
  const handletitle = (event) => {
    settitle(event.target.value)
  }

  const handledescription = (event) => {
    setdescription(event.target.value)
  }

  const handleevent = () => {
    setCenteredModal(!centeredModal)
  }


  //use effect to put data props into use state
  useEffect(() => {
    if (Object.keys(storedata).length === 0) {
      setexportdisable(true)
    } else {
      setexportdisable(false)
    }
    setData2(storedata)
  }, [storedata])

  //pagination page number
  //pagination button handler
  const handleChange =  function(event, value) {
    if (searched === true) {
      const data = { interests, country, value, limit, paginationnumbers, search }
          try {
            setdisable(true)
            axios
              .post(
                "http://localhost:5000/interest/getpeopleinterestspaginate",
                data
              )
              .then((response) => {
                if (response.data.error) {
                  console.log(response.data)
                } else {
                  console.log(response.data)
                  setData2(response.data)
                  setdisable(false)

                }
              })
            
          } catch (error) {
            console.log(error)
          }
    } else {
      console.log("cannot paginate")
    }

  }

  // ** Converts table to CSV
  function convertArrayOfObjectsToCSV(array) {
    let result
    const columnDelimiter = ","
    const lineDelimiter = "\n"
    const keys = Object.keys(array[0])

    result = ""
    result += keys.join(columnDelimiter)
    result += lineDelimiter

    array.forEach((item) => {
      let ctr = 0
      keys.forEach((key) => {
        if (ctr > 0) result += columnDelimiter

        result += item[key]

        ctr++
      })
      result += lineDelimiter
    })

    return result
  }
  

  // ** Downloads CSV
  async function downloadCSV() {
    if (title === "" || description === "") {
     seterror("Both Fields can't be empty")
    } else {
    setCenteredModal(!centeredModal)
    setexportdisable(true)
    console.log(title)
    
    const data = { interests, country, limit, search }
    try {
    await axios
      .post("http://localhost:5000/interest/exporttocsv", data)
      .then(async (response) => {
        if (response.data.error) {
          console.log(response.data)

        } else {
          const link = document.createElement("a")
          let csv = convertArrayOfObjectsToCSV(response.data)
          if (csv === null) return
          const filename = "export.csv"
          if (!csv.match(/^data:text\/csv/i)) {
            csv = `data:text/csvcharset=utf-8,${csv}`
          }
          link.setAttribute("href", encodeURI(csv))
          link.setAttribute("download", filename)
          link.click()
          Toast.success('Export Done', 2000)

          setexportdisable(false)
          const email = user.user.email
          const eventdata = { title, description, email}
          await axios.post("http://localhost:5000/events/addevent", eventdata).then((response) => {
            console.log(response.data)


          })

        }
      })
    } catch (err) {
      console.error(err)
    }
    }
  }
  

  return (
    <Card style={{ height: "20%" }}>      
      <CardHeader className="flex-md-row flex-column align-md-items-center align-items-start border-bottom">
        <CardTitle tag="h4">Stores And Shops Data</CardTitle>
        <div className="d-flex mt-md-0 mt-1">
          <UncontrolledButtonDropdown>
            <DropdownToggle color="secondary" caret outline>
              <Share size={15} />
              <span className="align-middle ms-50">Export</span>
            </DropdownToggle>
            <DropdownMenu>
              <DropdownItem className="w-100"   disabled ={exportdisable}  onClick={handleevent}>
                <FileText size={15} />
                <span className="align-middle ms-50">CSV</span>
              </DropdownItem>

              <DropdownItem className="w-100">
                <File size={15} />
                <span className="align-middle ms-50">PDF</span>
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledButtonDropdown>
          <Modal isOpen={centeredModal} toggle={() => setCenteredModal(!centeredModal)} className='modal-dialog-centered'>
            <ModalHeader >
              Fill the following information

            </ModalHeader>
            <ModalBody>
            <TextField
            required
            id="standard-required"
            label="Title"
            variant="standard"
            style={{width: '100%', color :"white"}}
            value={title}
            onChange={handletitle}

          />

            <TextField
            id="standard-textarea"
            label="Description"
            placeholder="Description"
            multiline
            variant="standard"
            style={{width: '100%', color :"white", marginTop:"3%"}}
            value={description}
            onChange={handledescription}
          />
          <div >
          <span style={{color: 'red', fontSize:"10px"}}>{error}</span>
          </div>
          <button className="confirm" onClick={() => downloadCSV()}>Confirm</button>
         
            </ModalBody>
        </Modal>
        </div>
      </CardHeader>

      <div className="react-dataTable">
        <DataTable
          noHeader
          selectableRowsNoSelectAll
          columns={multiLingColumns}
          className="react-dataTable"
          sortIcon={<ChevronDown size={10} />}
          data={data2}
          paginationPerPage={3}
        />
      </div>
      <CardFooter>
        <Pagination
          count={paginationnumbers}
          onChange={handleChange}
          className="pagination"
          id="search"
          disabled={disable}
        />
      </CardFooter>
    </Card>
  )
}

export default DataTableWithButtons
