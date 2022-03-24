import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Alert } from 'reactstrap'
//import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'
import {useEffect, useState} from "react"
import "./calender.css"
import Toast from 'light-toast'
import Dialog from "@mui/material/Dialog"
import DialogContent from "@mui/material/DialogContent"
import format from "date-fns/format"
import getDay from "date-fns/getDay"
import parse from "date-fns/parse"
import startOfWeek from "date-fns/startOfWeek"
import { Calendar, dateFnsLocalizer } from "react-big-calendar"
import "react-big-calendar/lib/css/react-big-calendar.css"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
//import { set } from "date-fns"
import Swal from 'sweetalert2'
import { ThumbsUp, ThumbsDown } from 'react-feather'
import Avatar from '@components/avatar'
import axios from "axios"
const url = "http://localhost:5000/images/"


const locales = {
  "en-US": require("date-fns/locale/en-US")
}
const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales
})


export default function Calender() {

  //const [newEvent, setNewEvent] = useState({ title: "", start: "", end: "" })
  const [allEvents, setAllEvents] = useState([])
  const [centeredModal, setCenteredModal] = useState(false)
  const [selectedevent, setselectedevent] = useState({})
  const [eventuser, seteventuser] = useState({})

  const changedateformat = (oldarray) => {
    console.log(oldarray)
    const newarray = []
    oldarray.map(function(arrayItem) {
      let date = arrayItem.startdate.slice(0, 19).replace('T', ' ')
      date = new Date(date)
      const object = {
        email: arrayItem.email,
        title : arrayItem.title,
        description : arrayItem.description,
        name : arrayItem.name,
        start : date,
        end : date
      }
      newarray.push(object)
    })
    return newarray

  }

  useEffect(() => {
    try {
    axios.post("http://localhost:5000/events/getevents").then((response) => {
      console.log(response.data)
      const newformatdate = changedateformat(response.data)
      setAllEvents(newformatdate)
      const d = new Date()
      console.log(d)
      const dd = new Date("2022-3-18")
      console.log(dd)
    })
  } catch (err) {
    console.log(err)

  }
  
  }, [])

  const handleevent = (event) => {
    const email = event.email
    const data = {email}
    try {
      axios.post("http://localhost:5000/events/geteventuser", data).then((response) => {
        seteventuser(response.data[0])
      })
    } catch (err) {
      console.log(err)
  
    }
    setselectedevent(event)
    setCenteredModal(!centeredModal)

  }


  return (
      <div className="App">
      
          <Calendar localizer={localizer} events={allEvents} startAccessor="start" endAccessor="end" style={{ height: 500, margin: "50px" }}   onSelectEvent={handleevent}   eventPropGetter={(event, start, end, isSelected) => ({event, start, end, isSelected, style: { backgroundColor: "#138fa5", color:"white" }})}
        />
          <Modal isOpen={centeredModal} toggle={() => setCenteredModal(!centeredModal)} className='modal-dialog-centered'>
          <ModalHeader toggle={() => setCenteredModal(!centeredModal)}>
            <Avatar color='primary' img={url.concat(eventuser.picname)} />
            <span style={{marginLeft:"10px"}}>{eventuser.username}</span>

          </ModalHeader>
          <ModalBody>
            <div>
            <span>Title : {selectedevent.title} </span>
            </div>
            <div>
            <span>Description : {selectedevent.description} </span>
            </div>
          </ModalBody>
          <ModalFooter>

          </ModalFooter>
        </Modal>
      </div>
  )
}
