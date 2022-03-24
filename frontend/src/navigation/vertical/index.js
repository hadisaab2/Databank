import { Mail, Home, ShoppingCart } from 'react-feather'
import LocalHospitalIcon from '@mui/icons-material/LocalHospital'
import AccountBalanceIcon from '@mui/icons-material/AccountBalance'
import PeopleAltIcon from '@mui/icons-material/PeopleAlt'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import FacebookIcon from '@mui/icons-material/Facebook'
import GavelIcon from '@mui/icons-material/Gavel'
import EngineeringIcon from '@mui/icons-material/Engineering'
import MedicationIcon from '@mui/icons-material/Medication'


 const navigation = [
  {
    header: 'Applications'
  },
  {
    id: 'home',
    title: 'Stores Info',
    icon: <ShoppingCart size={20} />,
    navLink: '/store'
  },
  {
    id: 'home',
    title: 'Doctors Info',
    icon:   <LocalHospitalIcon size={20} />,
    navLink: '/doctor'
  },
  {
    id: 'home',
    title: 'Centers Info',
    icon: <AccountBalanceIcon size={20} />,
    navLink: '/centers'
  },
  
  {
    id: 'home',
    title: 'Customers Interests',
    icon: <PeopleAltIcon size={20} />,
    navLink: '/customers'
  },
 
  {
    id: 'home',
    title: 'Location',
    icon: <LocationOnIcon size={20} />,
    navLink: '/location'
  },
  {
    id: 'home',
    title: 'Facebook',
    icon: <FacebookIcon size={20} />,
    navLink: '/facebook'
  },
 
  {
    id: 'home',
    title: 'Order Of Lawyers',
    icon: <GavelIcon size={20} />,
    navLink: '/orderoflawyers'
  },
  {
    id: 'home',
    title: 'Order Of Engineers',
    icon: <EngineeringIcon size={20} />,
    navLink: '/orderofengineers'
  },
  {
    id: 'home',
    title: 'Order Of Doctors',
    icon: <MedicationIcon size={20} />,
    navLink: '/orderofdoctors'
  }
]

export default navigation

