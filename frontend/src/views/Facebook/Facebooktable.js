// ** React Imports
import { Fragment, useState, forwardRef } from 'react'

// ** Table Data & Columns
import { columns } from './datafacebook'

// ** Add New Modal Component
import AddNewModal from './AddNewFacebookModal'

// ** Third Party Components
import ReactPaginate from 'react-paginate'
import DataTable from 'react-data-table-component'
import { ChevronDown, Share, Printer, FileText, File, Grid, Copy, Plus } from 'react-feather'

// ** Reactstrap Imports
import {
  Row,
  Col,
  Card,
  Input,
  Label,
  Button,
  CardTitle,
  CardHeader,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
  UncontrolledButtonDropdown
} from 'reactstrap'

// ** Bootstrap Checkbox Component
const BootstrapCheckbox = forwardRef((props, ref) => (
  <div className='form-check'>
    <Input type='checkbox' ref={ref} {...props} />
  </div>
))

const DataTableWithButtons = () => {
  const data = [
    {
      responsive_id: '',
      id: 1,
      avatar: '10.jpg',
      full_name: "Korrie O'Crevy",
      post: 'Nuclear Power Engineer',
      email: 'kocrevy0@thetimes.co.uk',
      city: 'Krasnosilka',
      start_date: '09/23/2016',
      salary: '$23896.35',
      age: '61',
      experience: '1 Year',
      status: 2
    },
    {
      responsive_id: '',
      id: 2,
      avatar: '1.jpg',
      full_name: 'Bailie Coulman',
      post: 'VP Quality Control',
      email: 'bcoulman1@yolasite.com',
      city: 'Hinigaran',
      start_date: '05/20/2018',
      salary: '$13633.69',
      age: '63',
      experience: '3 Years',
      status: 2
    },
    {
      responsive_id: '',
      id: 3,
      avatar: '9.jpg',
      full_name: 'Stella Ganderton',
      post: 'Operator',
      email: 'sganderton2@tuttocitta.it',
      city: 'Golcowa',
      start_date: '03/24/2018',
      salary: '$13076.28',
      age: '66',
      experience: '6 Years',
      status: 5
    },
    {
      responsive_id: '',
      id: 4,
      avatar: '10.jpg',
      full_name: 'Dorolice Crossman',
      post: 'Cost Accountant',
      email: 'dcrossman3@google.co.jp',
      city: 'Paquera',
      start_date: '12/03/2017',
      salary: '$12336.17',
      age: '22',
      experience: '2 Years',
      status: 2
    },
    {
      responsive_id: '',
      id: 5,
      avatar: '',
      full_name: 'Harmonia Nisius',
      post: 'Senior Cost Accountant',
      email: 'hnisius4@gnu.org',
      city: 'Lucan',
      start_date: '08/25/2017',
      salary: '$10909.52',
      age: '33',
      experience: '3 Years',
      status: 2
    },
    {
      responsive_id: '',
      id: 6,
      avatar: '',
      full_name: 'Genevra Honeywood',
      post: 'Geologist',
      email: 'ghoneywood5@narod.ru',
      city: 'Maofan',
      start_date: '06/01/2017',
      salary: '$17803.80',
      age: '61',
      experience: '1 Year',
      status: 1
    },
    {
      responsive_id: '',
      id: 7,
      avatar: '',
      full_name: 'Eileen Diehn',
      post: 'Environmental Specialist',
      email: 'ediehn6@163.com',
      city: 'Lampuyang',
      start_date: '10/15/2017',
      salary: '$18991.67',
      age: '59',
      experience: '9 Years',
      status: 3
    },
    {
      responsive_id: '',
      id: 8,
      avatar: '9.jpg',
      full_name: 'Richardo Aldren',
      post: 'Senior Sales Associate',
      email: 'raldren7@mtv.com',
      city: 'Skoghall',
      start_date: '11/05/2016',
      salary: '$19230.13',
      age: '55',
      experience: '5 Years',
      status: 3
    },
    {
      responsive_id: '',
      id: 9,
      avatar: '2.jpg',
      full_name: 'Allyson Moakler',
      post: 'Safety Technician',
      email: 'amoakler8@shareasale.com',
      city: 'Mogilany',
      start_date: '12/29/2018',
      salary: '$11677.32',
      age: '39',
      experience: '9 Years',
      status: 5
    },
    {
      responsive_id: '',
      id: 10,
      avatar: '9.jpg',
      full_name: 'Merline Penhalewick',
      post: 'Junior Executive',
      email: 'mpenhalewick9@php.net',
      city: 'Kanuma',
      start_date: '04/19/2019',
      salary: '$15939.52',
      age: '23',
      experience: '3 Years',
      status: 2
    },
    {
      responsive_id: '',
      id: 11,
      avatar: '',
      full_name: 'De Falloon',
      post: 'Sales Representative',
      email: 'dfalloona@ifeng.com',
      city: 'Colima',
      start_date: '06/12/2018',
      salary: '$19252.12',
      age: '30',
      experience: '0 Year',
      status: 4
    },
    {
      responsive_id: '',
      id: 12,
      avatar: '',
      full_name: 'Cyrus Gornal',
      post: 'Senior Sales Associate',
      email: 'cgornalb@fda.gov',
      city: 'Boro Utara',
      start_date: '12/09/2017',
      salary: '$16745.47',
      age: '22',
      experience: '2 Years',
      status: 4
    },
    {
      responsive_id: '',
      id: 13,
      avatar: '',
      full_name: 'Tallou Balf',
      post: 'Staff Accountant',
      email: 'tbalfc@sina.com.cn',
      city: 'Siliana',
      start_date: '01/21/2016',
      salary: '$15488.53',
      age: '36',
      experience: '6 Years',
      status: 4
    },
    {
      responsive_id: '',
      id: 14,
      avatar: '',
      full_name: 'Othilia Extill',
      post: 'Associate Professor',
      email: 'oextilld@theatlantic.com',
      city: 'Brzyska',
      start_date: '02/01/2016',
      salary: '$18442.34',
      age: '43',
      experience: '3 Years',
      status: 2
    },
    {
      responsive_id: '',
      id: 15,
      avatar: '',
      full_name: 'Wilmar Bourton',
      post: 'Administrative Assistant',
      email: 'wbourtone@sakura.ne.jp',
      city: 'Bích Động',
      start_date: '04/25/2018',
      salary: '$13304.45',
      age: '19',
      experience: '9 Years',
      status: 5
    },
    {
      responsive_id: '',
      id: 16,
      avatar: '4.jpg',
      full_name: 'Robinson Brazenor',
      post: 'General Manager',
      email: 'rbrazenorf@symantec.com',
      city: 'Gendiwu',
      start_date: '12/23/2017',
      salary: '$11953.08',
      age: '66',
      experience: '6 Years',
      status: 5
    },
    {
      responsive_id: '',
      id: 17,
      avatar: '',
      full_name: 'Nadia Bettenson',
      post: 'Environmental Tech',
      email: 'nbettensong@joomla.org',
      city: 'Chabařovice',
      start_date: '07/11/2018',
      salary: '$20484.44',
      age: '64',
      experience: '4 Years',
      status: 1
    },
    {
      responsive_id: '',
      id: 18,
      avatar: '',
      full_name: 'Titus Hayne',
      post: 'Web Designer',
      email: 'thayneh@kickstarter.com',
      city: 'Yangon',
      start_date: '05/25/2019',
      salary: '$16871.48',
      age: '59',
      experience: '9 Years',
      status: 1
    },
    {
      responsive_id: '',
      id: 19,
      avatar: '5.jpg',
      full_name: 'Roxie Huck',
      post: 'Administrative Assistant',
      email: 'rhucki@ed.gov',
      city: 'Polýkastro',
      start_date: '04/04/2019',
      salary: '$19653.56',
      age: '41',
      experience: '1 Year',
      status: 4
    },
    {
      responsive_id: '',
      id: 20,
      avatar: '7.jpg',
      full_name: 'Latashia Lewtey',
      post: 'Actuary',
      email: 'llewteyj@sun.com',
      city: 'Hougong',
      start_date: '08/03/2017',
      salary: '$18303.87',
      age: '35',
      experience: '5 Years',
      status: 1
    },
    {
      responsive_id: '',
      id: 21,
      avatar: '',
      full_name: 'Natalina Tyne',
      post: 'Software Engineer',
      email: 'ntynek@merriam-webster.com',
      city: 'Yanguan',
      start_date: '03/16/2019',
      salary: '$15256.40',
      age: '30',
      experience: '0 Year',
      status: 2
    },
    {
      responsive_id: '',
      id: 22,
      avatar: '',
      full_name: 'Faun Josefsen',
      post: 'Analog Circuit Design manager',
      email: 'fjosefsenl@samsung.com',
      city: 'Wengyang',
      start_date: '07/08/2017',
      salary: '$11209.16',
      age: '40',
      experience: '0 Year',
      status: 3
    },
    {
      responsive_id: '',
      id: 23,
      avatar: '9.jpg',
      full_name: 'Rosmunda Steed',
      post: 'Assistant Media Planner',
      email: 'rsteedm@xing.com',
      city: 'Manzanares',
      start_date: '12/23/2017',
      salary: '$13778.34',
      age: '21',
      experience: '1 Year',
      status: 5
    },
    {
      responsive_id: '',
      id: 24,
      avatar: '',
      full_name: 'Scott Jiran',
      post: 'Graphic Designer',
      email: 'sjirann@simplemachines.org',
      city: 'Pinglin',
      start_date: '05/26/2016',
      salary: '$23081.71',
      age: '23',
      experience: '3 Years',
      status: 1
    },
    {
      responsive_id: '',
      id: 25,
      avatar: '',
      full_name: 'Carmita Medling',
      post: 'Accountant',
      email: 'cmedlingo@hp.com',
      city: 'Bourges',
      start_date: '07/31/2019',
      salary: '$13602.24',
      age: '47',
      experience: '7 Years',
      status: 3
    },
    {
      responsive_id: '',
      id: 26,
      avatar: '2.jpg',
      full_name: 'Morgen Benes',
      post: 'Senior Sales Associate',
      email: 'mbenesp@ted.com',
      city: 'Cà Mau',
      start_date: '04/10/2016',
      salary: '$16969.63',
      age: '42',
      experience: '2 Years',
      status: 4
    },
    {
      responsive_id: '',
      id: 27,
      avatar: '',
      full_name: 'Onfroi Doughton',
      post: 'Civil Engineer',
      email: 'odoughtonq@aboutads.info',
      city: 'Utrecht (stad)',
      start_date: '09/29/2018',
      salary: '$23796.62',
      age: '28',
      experience: '8 Years',
      status: 3
    },
    {
      responsive_id: '',
      id: 28,
      avatar: '',
      full_name: 'Kliment McGinney',
      post: 'Chief Design Engineer',
      email: 'kmcginneyr@paginegialle.it',
      city: 'Xiaocheng',
      start_date: '07/09/2018',
      salary: '$24027.81',
      age: '28',
      experience: '8 Years',
      status: 4
    },
    {
      responsive_id: '',
      id: 29,
      avatar: '',
      full_name: 'Devin Bridgland',
      post: 'Tax Accountant',
      email: 'dbridglands@odnoklassniki.ru',
      city: 'Baoli',
      start_date: '07/17/2016',
      salary: '$13508.15',
      age: '48',
      experience: '8 Years',
      status: 3
    },
    {
      responsive_id: '',
      id: 30,
      avatar: '6.jpg',
      full_name: 'Gilbert McFade',
      post: 'Biostatistician',
      email: 'gmcfadet@irs.gov',
      city: 'Deje',
      start_date: '08/28/2018',
      salary: '$21632.30',
      age: '20',
      experience: '0 Year',
      status: 2
    }
  ]
   

  // ** States
  const [modal, setModal] = useState(false)
  const [currentPage, setCurrentPage] = useState(0)
  const [searchValue, setSearchValue] = useState('')
  const [filteredData, setFilteredData] = useState([])

  // ** Function to handle Modal toggle
  const handleModal = () => setModal(!modal)

  // ** Function to handle filter
  const handleFilter = e => {
    const value = e.target.value
    let updatedData = []
    setSearchValue(value)

    const status = {
      1: { title: 'Current', color: 'light-primary' },
      2: { title: 'Professional', color: 'light-success' },
      3: { title: 'Rejected', color: 'light-danger' },
      4: { title: 'Resigned', color: 'light-warning' },
      5: { title: 'Applied', color: 'light-info' }
    }

    if (value.length) {
      updatedData = data.filter(item => {
        const startsWith =
          item.full_name.toLowerCase().startsWith(value.toLowerCase()) ||
          item.post.toLowerCase().startsWith(value.toLowerCase()) ||
          item.email.toLowerCase().startsWith(value.toLowerCase()) ||
          item.age.toLowerCase().startsWith(value.toLowerCase()) ||
          item.salary.toLowerCase().startsWith(value.toLowerCase()) ||
          item.start_date.toLowerCase().startsWith(value.toLowerCase()) ||
          status[item.status].title.toLowerCase().startsWith(value.toLowerCase())

        const includes =
          item.full_name.toLowerCase().includes(value.toLowerCase()) ||
          item.post.toLowerCase().includes(value.toLowerCase()) ||
          item.email.toLowerCase().includes(value.toLowerCase()) ||
          item.age.toLowerCase().includes(value.toLowerCase()) ||
          item.salary.toLowerCase().includes(value.toLowerCase()) ||
          item.start_date.toLowerCase().includes(value.toLowerCase()) ||
          status[item.status].title.toLowerCase().includes(value.toLowerCase())

        if (startsWith) {
          return startsWith
        } else if (!startsWith && includes) {
          return includes
        } else return null
      })
      setFilteredData(updatedData)
      setSearchValue(value)
    }
  }

  // ** Function to handle Pagination
  const handlePagination = page => {
    setCurrentPage(page.selected)
  }

  // ** Custom Pagination
  const CustomPagination = () => (
    <ReactPaginate
      previousLabel=''
      nextLabel=''
      forcePage={currentPage}
      onPageChange={page => handlePagination(page)}
      pageCount={searchValue.length ? Math.ceil(filteredData.length / 7) : Math.ceil(data.length / 7) || 1}
      breakLabel='...'
      pageRangeDisplayed={2}
      marginPagesDisplayed={2}
      activeClassName='active'
      pageClassName='page-item'
      breakClassName='page-item'
      nextLinkClassName='page-link'
      pageLinkClassName='page-link'
      breakLinkClassName='page-link'
      previousLinkClassName='page-link'
      nextClassName='page-item next-item'
      previousClassName='page-item prev-item'
      containerClassName='pagination react-paginate separated-pagination pagination-sm justify-content-end pe-1 mt-1'
    />
  )

  // ** Converts table to CSV
  function convertArrayOfObjectsToCSV(array) {
    let result

    const columnDelimiter = ','
    const lineDelimiter = '\n'
    const keys = Object.keys(data[0])

    result = ''
    result += keys.join(columnDelimiter)
    result += lineDelimiter

    array.forEach(item => {
      let ctr = 0
      keys.forEach(key => {
        if (ctr > 0) result += columnDelimiter

        result += item[key]

        ctr++
      })
      result += lineDelimiter
    })

    return result
  }

  // ** Downloads CSV
  function downloadCSV(array) {
    const link = document.createElement('a')
    let csv = convertArrayOfObjectsToCSV(array)
    if (csv === null) return

    const filename = 'export.csv'

    if (!csv.match(/^data:text\/csv/i)) {
      csv = `data:text/csv;charset=utf-8,${csv}`
    }

    link.setAttribute('href', encodeURI(csv))
    link.setAttribute('download', filename)
    link.click()
  }

  return (
    <Fragment>
      <Card style={{height:"20%"}} className="facebooktable">
        <CardHeader className='flex-md-row flex-column align-md-items-center align-items-start border-bottom'>
          <CardTitle tag='h4'>Stores And Shops Data</CardTitle>
          <div className='d-flex mt-md-0 mt-1'>
            <UncontrolledButtonDropdown>
              <DropdownToggle color='secondary' caret outline>
                <Share size={15} />
                <span className='align-middle ms-50'>Export</span>
              </DropdownToggle>
              <DropdownMenu>
                <DropdownItem className='w-100'>
                  <Printer size={15} />
                  <span className='align-middle ms-50'>Print</span>
                </DropdownItem>
                <DropdownItem className='w-100' onClick={() => downloadCSV(data)}>
                  <FileText size={15} />
                  <span className='align-middle ms-50'>CSV</span>
                </DropdownItem>
                <DropdownItem className='w-100'>
                  <Grid size={15} />
                  <span className='align-middle ms-50'>Excel</span>
                </DropdownItem>
                <DropdownItem className='w-100'>
                  <File size={15} />
                  <span className='align-middle ms-50'>PDF</span>
                </DropdownItem>
                <DropdownItem className='w-100'>
                  <Copy size={15} />
                  <span className='align-middle ms-50'>Copy</span>
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledButtonDropdown>
            <Button className='ms-2' color='primary' onClick={handleModal}>
              <Plus size={15} />
              <span className='align-middle ms-50'>Add Record</span>
            </Button>
          </div>
        </CardHeader>
        <Row className='justify-content-end mx-0'>
          <Col className='d-flex align-items-center justify-content-end mt-1' md='6' sm='12'>
            <Label className='me-1' for='search-input'>
              Search
            </Label>
            <Input
              className='dataTable-filter mb-50'
              type='text'
              bsSize='sm'
              id='search-input'
              value={searchValue}
              onChange={handleFilter}
            />
          </Col>
        </Row>
        <div className='react-dataTable'>
          <DataTable
            noHeader
            pagination
            selectableRows
            columns={columns}
            paginationPerPage={7}
            className='react-dataTable'
            sortIcon={<ChevronDown size={10} />}
            paginationDefaultPage={currentPage + 1}
            paginationComponent={CustomPagination}
            data={data}
            selectableRowsComponent={BootstrapCheckbox}
          />
        </div>
      </Card>
      <AddNewModal open={modal} handleModal={handleModal} />
    </Fragment>
  )
}

export default DataTableWithButtons
