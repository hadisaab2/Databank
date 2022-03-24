// ** React Imports
import { Fragment, useState, useEffect, useContext } from "react"

// ** Third Party Components
import ReactPaginate from "react-paginate"
import DataTable from "react-data-table-component"
import {
  ChevronDown,
  Share,
  FileText,
  File
} from "react-feather"
import Pagination from "@mui/material/Pagination"
import axios from "axios"
import TextField from '@mui/material/TextField'
import './store.css'
import {AuthContext} from  "../../context/authContext/AuthContext"

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
  ModalHeader,
  ModalBody
} from "reactstrap"

const DataTableWithButtons = ({
  //props
  storedata,
  cities,
  types,
  searched,
  paginationnumbers
}) => {
  //data that changes with pagination and search
  const [data2, setData2] = useState([])

  const [centeredModal, setCenteredModal] = useState(false)
  const [title, settitle] = useState("")
  const [error, seterror] = useState("")
  const {user} = useContext(AuthContext)


  const handletitle = (event) => {
    settitle(event.target.value)
  }
  const [description, setdescription] = useState()

  const handledescription = (event) => {
    setdescription(event.target.value)
  }

  const handleevent = () => {
    setCenteredModal(!centeredModal)
  }

  //use effect to put data props into use state
  useEffect(() => {
    setData2(storedata)
  }, [storedata])

  //columns
  const multiLingColumns = [
    {
      name: "id",
      sortable: true,
      minWidth: "200px",
      selector: (row) => row.id
    },
    {
      name: "storename",
      sortable: true,
      minWidth: "150px",
      selector: (row) => row.storename
    },
    {
      name: "address",
      sortable: true,
      minWidth: "150px",
      selector: (row) => row.address
    },
    {
      name: "phonetype",
      sortable: true,
      minWidth: "150px",
      selector: (row) => row.phonetype
    },
    {
      name: "phone",
      sortable: true,
      minWidth: "150px",
      selector: (row) => row.phone
    },
    {
      name: "categoryname",
      sortable: true,
      minWidth: "150px",
      selector: (row) => row.categoryname
    },
    {
      name: "industry",
      sortable: true,
      minWidth: "150px",
      selector: (row) => row.industry
    },
    {
      name: "city",
      sortable: true,
      minWidth: "150px",
      selector: (row) => row.city
    }
  ]
  

  //pagination page number
  //pagination button handler
  const handleChange = (event, value) => {
    if (searched === true) {
      const data = { cities, types, value }
      axios
        .post("http://localhost:5000/store/getstorespaginate", data)
        .then((response) => {
          if (response.data.error) {
            console.log(response.data)
          } else {
            console.log(response.data)
            setData2(response.data)
          }
        })
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
    const data = { cities, types }
await axios
      .post("http://localhost:5000/store/exporttocsv", data)
      .then(async (response) => {
        if (response.data.error) {
          console.log(response.data.error)
       } else {
          const link = document.createElement("a")
          let csv = convertArrayOfObjectsToCSV(response.data)
          if (csv === null) return
          const filename = "export.csv"
          if (!csv.match(/^data:text\/csv/i)) {
            csv = `data:text/csv;charset=utf-8,${csv}`
          }
          link.setAttribute("href", encodeURI(csv))
          link.setAttribute("download", filename)
          link.click()
          console.log(user)
          const email = user.user.email
          console.log(email)
         const eventdata = { title, description, email}
          await axios.post("http://localhost:5000/events/addevent", eventdata).then((response) => {
            console.log(response.data)


          })
        }
      })
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
              <DropdownItem className="w-100" onClick={handleevent}>
                <FileText size={15} />
                <span className="align-middle ms-50">CSV</span>
              </DropdownItem>
            
              <DropdownItem className="w-100">
                <File size={15} />
                <span className="align-middle ms-50">PDF</span>
              </DropdownItem>
            
            </DropdownMenu>
          </UncontrolledButtonDropdown>
        </div>
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
        />
      </CardFooter>
    </Card>
  )
}

export default DataTableWithButtons
