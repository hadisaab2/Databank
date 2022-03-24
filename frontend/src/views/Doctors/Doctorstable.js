// ** React Imports
import { Fragment, useState, useEffect } from "react"

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

// ** Reactstrap Imports
import {
  Card,
  CardTitle,
  CardHeader,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
  UncontrolledButtonDropdown,
  CardFooter
} from "reactstrap"

const DataTableWithButtons = ({
  //props
  storedata,
  country,
  type,
  searched,
  paginationnumbers
}) => {
  const [data2, setData2] = useState([])
  useEffect(() => {
    setData2(storedata)
  }, [storedata])

  const multiLingColumns = [
    {
      name: "id",
      sortable: true,
      minWidth: "200px",
      selector: (row) => row.id
    },
    {
      name: "country",
      sortable: true,
      minWidth: "150px",
      selector: (row) => row.country
    },
    {
      name: "type",
      sortable: true,
      minWidth: "150px",
      selector: (row) => row.type
    },
    {
      name: "employeenumber",
      sortable: true,
      minWidth: "150px",
      selector: (row) => row.employeenumber
    },
    {
      name: "location",
      sortable: true,
      minWidth: "150px",
      selector: (row) => row.location
    },
    {
      name: "shopname",
      sortable: true,
      minWidth: "150px",
      selector: (row) => row.shopname
    }
  ]
  //data from store put in use state for pagination
  //pagination page number
  //pagination button handler
  const handleChange = (event, value) => {
    if (searched === true) {
      console.log(country)
      const data = { country, type, value }
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
    const data = { country, type }
await axios
      .post("http://localhost:5000/store/exporttocsv", data)
      .then((response) => {
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
        }
      })
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
              <DropdownItem className="w-100" onClick={() => downloadCSV()}>
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
          style={{ marginLeft: "80%" }}
        />
      </CardFooter>
    </Card>
  )
}

export default DataTableWithButtons
