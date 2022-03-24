// ** Core Layout Import
// !Do not remove the Layout import
import Layout from '@layouts/VerticalLayout'

// ** Menu Items Array
import datanavigation from '@src/navigation/vertical'
import { AuthContext } from "../context/authContext/AuthContext"
import {useContext, useEffect, useState} from "react"
import EventAvailableIcon from '@mui/icons-material/EventAvailable'
import { Navigation } from 'react-feather'

const VerticalLayout = props => {
  const { user } = useContext(AuthContext)

  // const [menuData, setMenuData] = useState([])

  // ** For ServerSide navigation
  // useEffect(() => {
  //   axios.get(URL).then(response => setMenuData(response.data))
  // }, [])
  const [navigation, setnavigation] = useState(datanavigation)
  useEffect(() => {
    if (user.user.isAdmin) {
      //Add Calender tab for admin
      setnavigation(oldArray => [...oldArray, {id: 'home', title: 'Calender', icon: <EventAvailableIcon size={20} />, navLink: '/Calender'}])
    } else {
      setnavigation(datanavigation)
    }
    console.log(navigation)

  }, [])


  return (
    <Layout menuData={navigation} {...props}>
      {props.children}
    </Layout>
  )
}

export default VerticalLayout
