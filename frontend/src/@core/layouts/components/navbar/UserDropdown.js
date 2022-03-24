// ** React Imports
import { Link } from "react-router-dom"
import { useState, useContext, useEffect } from "react"
import "./adduser.css"
import Profile from "./Profile"
// ** Custom Components
import Avatar from "@components/avatar"
import AddIcon from "@mui/icons-material/Add"
import axios from "axios"
import Toast from "light-toast"
import { AuthContext } from "../../../../context/authContext/AuthContext"


// ** Utils
// import { isUserLoggedIn } from '@utils'

// ** Third Party Components
import {
  User,
  Mail,
  CheckSquare,
  MessageSquare,
  Settings,
  CreditCard,
  HelpCircle,
  Power
} from "react-feather"

// ** Reactstrap Imports
import {
  UncontrolledDropdown,
  DropdownMenu,
  DropdownToggle,
  DropdownItem,
  Input
} from "reactstrap"

// ** Default Avatar Image
//import defaultAvatar from "@src/assets/images/portrait/small/jezine.jpg"
import Dialog from "@mui/material/Dialog"
import DialogContent from "@mui/material/DialogContent"
import { logout } from "../../../../context/authContext/AuthActions"
const url = "http://localhost:5000/images/"

const UserDropdown = () => {
  const { user } = useContext(AuthContext)
  // ** State
  const [userData] = useState(null)
  const [open, setOpen] = useState(false)
  const [profile, setProfile] = useState("")
  const handleclose = () => {
    setOpen(false)
  }

  const adduser = (e) => {
    e.preventDefault()
    setOpen(true)
  }

  useEffect(async () => {
    if (user) {
      const urlimage = url.concat(user.user.picname)
      setProfile(urlimage)
    }

    /*await fetch(urlimage).then((response) => {
      /*const imageBlob =  response.blob()
      const imageObjectURL = URL.createObjectURL(imageBlob)
      console.log(imageObjectURL)
      setProfile(imageObjectURL)
      
      const imageObjectURL = url.concat()
     setProfile()
    })
         */
  }, [])

  //** ComponentDidMount
  // useEffect(() => {
  //   if (isUserLoggedIn() !== null) {
  //     setUserData(JSON.parse(localStorage.getItem('userData')))
  //   }
  // }, [])

  //** Vars
  const userAvatar = (userData && userData.avatar) || profile
  const [username, setusername] = useState("")
  const [email, setemail] = useState("")
  const [password, setpassword] = useState("")
  const [picfile, setpicfile] = useState()
  const [error, seterror] = useState("")

  const handleusername = (event) => {
    setusername(event.target.value)
  }
  const handleemail = (event) => {
    setemail(event.target.value)
  }
  const handlepassword = (event) => {
    setpassword(event.target.value)
  }

  const handlepic = (file) => {
    setpicfile(file)
  }
  const { dispatch } = useContext(AuthContext)

  const loggingout = () => {
    dispatch(logout())
  }

  const insertuser = () => {
    if (
      password === "" ||
      email === "" ||
      password === "" ||
      picfile === undefined
    ) {
      seterror("Fields and profile cannot be empty")
    } else {
      setOpen(false)
      Toast.success("User Added", 2000)
      const data = new FormData()
      data.append("file", picfile)
      data.append("username", username)
      data.append("email", email)
      data.append("password", password)
      //const data2 = {username, email, password}

      const config = {
        headers: { "content-type": "multipart/form-data" }
      }

      axios
        .post("http://localhost:5000/user/insertuser", data, config)
        .then((response) => {
          if (response.data.error) {
            console.log(response.data)
          } else {
            console.log(response.data)
          }
        })
    }
  }

  return (
    <UncontrolledDropdown tag="li" className="dropdown-user nav-item">
      <DropdownToggle tag="a" className="nav-link dropdown-user-link">
        <div className="user-nav d-sm-flex d-none">
          <span className="user-name fw-bold">
            {(userData && userData["username"]) || user ? user.user.username : ""}
          </span>
          <span className="user-status">
            {(userData && userData.role) || user.user.isAdmin ? "Admin" : ""}
          </span>
        </div>
        <Avatar img={userAvatar} imgHeight="40" imgWidth="40" status="online" />
      </DropdownToggle>
      <DropdownMenu end>
        {user.user.isAdmin ? (
          <DropdownItem onClick={adduser}>
            <User size={14} className="me-75" />
            <span className="align-middle">Add User</span>
          </DropdownItem>
        ) : (
          <></>
        )}
        <Link to="/login">
          <DropdownItem onClick={loggingout}>
            <User size={14} className="me-75" />
            <span className="align-middle">Logout</span>
          </DropdownItem>
        </Link>
      </DropdownMenu>
      <Dialog open={open} onClose={handleclose}>
        <DialogContent className="dialogs">
          <Profile onselectpic={handlepic} />
          <div style={{ flex: 1, marginLeft: "50px" }}>
            <span> Fill the following information</span>
            <Input
              placeholder="username"
              onChange={handleusername}
              style={{ color: "#138fa5", marginTop: "30px" }}
            />
            <Input
              placeholder="email"
              onChange={handleemail}
              style={{ color: "#138fa5", marginTop: "20px" }}
            />
            <Input
              placeholder="password"
              onChange={handlepassword}
              style={{ color: "#138fa5", marginTop: "20px" }}
            />
            <span style={{ color: "red", fontSize: "10px" }}>{error}</span>
            <button className="adduser" onClick={insertuser}>
              <AddIcon style={{ color: "white" }} />
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </UncontrolledDropdown>
  )
}

export default UserDropdown
