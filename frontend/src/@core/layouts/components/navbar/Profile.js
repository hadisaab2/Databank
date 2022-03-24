import React, { useState } from 'react'
import "./adduser.css"
import PersonIcon from '@mui/icons-material/Person'

export default function Profile(props) {
  const [profile, setprofile] = useState("https://media.idownloadblog.com/wp-content/uploads/2017/03/Twitter-new-2017-avatar-001.png")
  const handlefile = (event) => {

    const reader = new FileReader()
    reader.onload = () => {
      if (reader.readyState === 2) {
       setprofile(reader.result)

      }
    }
    reader.readAsDataURL(event.target.files[0])

    props.onselectpic(event.target.files[0])
  }


  return (
    <div >
      <img src={profile} className="img" />
      <div>
        <label className="custom-file-upload">
        <input type="file" className="file" onChange={handlefile}/>
           Upload Photo
         </label>
      </div>
      
      <button onClick={ () =>  setprofile("")  } className="upload">upload</button>

        
    </div>
  )
}
