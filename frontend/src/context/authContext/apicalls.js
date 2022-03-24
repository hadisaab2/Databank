import axios from "axios"
import {loginFailure, loginStart, loginSuccess} from "./AuthActions"
import Toast from 'light-toast'
export const login = async (user, dispatch) => {
    dispatch(loginStart())
    axios.post("http://localhost:5000/user/login", user).then((response) => {
        if (response.data.error) {
          dispatch(loginFailure)
          console.log(response.data)
         Toast.fail('Wrong Username or password', 2000)
 
        } else {
          console.log(response.data) 
          dispatch(loginSuccess(response.data))
        }
      })

  }
