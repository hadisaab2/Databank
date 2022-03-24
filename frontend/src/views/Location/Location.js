import {
  Card
} from "reactstrap"
import "./location.css"
import { useState} from "react"
import "@styles/react/libs/input-number/input-number2.scss"
import { dictionary, placesdictionary } from "./districtdata.js"
import { styled } from "@mui/material/styles"
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip"
import CountUp from "react-countup"
import Dialog from "@mui/material/Dialog"
import DialogContent from "@mui/material/DialogContent"
import Box from "@mui/material/Box"
import Tabs, { tabsClasses } from "@mui/material/Tabs"
import Tab from "@mui/material/Tab"
import Fab from "@mui/material/Fab"
import NavigationIcon from "@mui/icons-material/Navigation"
import FormGroup from "@mui/material/FormGroup"
import FormControlLabel from "@mui/material/FormControlLabel"
import Checkbox from "@mui/material/Checkbox"
import InputLabel from "@material-ui/core/InputLabel"
import ListItemIcon from "@material-ui/core/ListItemIcon"
import ListItemText from "@material-ui/core/ListItemText"
import MenuItem from "@material-ui/core/MenuItem"
import FormControl from "@material-ui/core/FormControl"
import Select from "@material-ui/core/Select"
import { MenuProps, useStyles, IOSSwitch} from "./utils"
import FileDownloadIcon from '@mui/icons-material/FileDownload'
import Switch from "react-switch"
//mport axios from "axios"


const Home = () => {

  const classes = useStyles()
  //useState for districts data
  const [state, setState] = useState(dictionary)

  const [selecteddict, setselecteddict] = useState(placesdictionary)
  //switch 
  const [vip, setvip] = useState(false)

  const handleswitch = (checked) => {
    setvip(checked)
  }


  const handleselect = (event) => {
    const id = event.target.name
    const value = event.target.value
    if (value[value.length - 1] === "all") {
      let options = []
      if (selecteddict[id].selectedplaces.length === state[id].places.length) {
        options = []
      } else {
        options = state[id].places
      }
      setselecteddict((existingItems) => {
        const itemIndex = existingItems.findIndex(
          (item) => item.id === id
        )
        return [
          ...existingItems.slice(0, itemIndex),
          {
            ...existingItems[itemIndex],
            selectedplaces: options
          },
          ...existingItems.slice(itemIndex + 1)
        ]
      })
      return
    }
    setselecteddict((existingItems) => {
      const itemIndex = existingItems.findIndex(
        (item) => item.id === id
      )
      return [
        ...existingItems.slice(0, itemIndex),
        {
          ...existingItems[itemIndex],
          selectedplaces: value
        },
        ...existingItems.slice(itemIndex + 1)
      ]
    })
  }

  //dialog setopen
  const [open, setOpen] = useState(false)

  //checkboxes usestate checked/unchecked
  const [mountchecked, mountsetChecked] = useState(false)
  const [beirutchecked, beirutsetChecked] = useState(false)
  const [southchecked, southsetChecked] = useState(false)
  const [northchecked, northsetChecked] = useState(false)
  const [keserwanchecked, keserwansetChecked] = useState(false)
  const [beqaachecked, beqaasetChecked] = useState(false)
  const [baalbekchecked, baalbeksetChecked] = useState(false)
  const [nabatiehchecked, nabatiehsetChecked] = useState(false)
  const [akkarchecked, akkarsetChecked] = useState(false)
//handle of governates checkboxes
  const handleChange = (event) => {
    if (event.target.id === "Mount Lebanon") {
      mountsetChecked(event.target.checked)
    }
    if (event.target.id === "South Lebanon") {
      southsetChecked(event.target.checked)
    }
    if (event.target.id === "North Lebanon") {
      northsetChecked(event.target.checked)
    }
    if (event.target.id === "Baalbek") {
      baalbeksetChecked(event.target.checked)
    }
    if (event.target.id === "Akkar") {
      akkarsetChecked(event.target.checked)
    }
    if (event.target.id === "Nabatieh") {
      nabatiehsetChecked(event.target.checked)
    }
    if (event.target.id === "Beqaa") {
      beqaasetChecked(event.target.checked)
    }
    if (event.target.id === "Keserwan-Jbeil") {
      keserwansetChecked(event.target.checked)
    }
    if (event.target.id === "Beirut") {
      beirutsetChecked(event.target.checked)
    }

    //if checked 
    if (event.target.checked === true) {
      //loop on districts to set districts of(the selected governorates) as selected
      state.map(function (arrayItem) {
        if (arrayItem.governorates === event.target.id) { //check if same governorates
          if (!arrayItem.className.includes("selected")) { //add a to classname
            name = arrayItem.className.concat(" selected")

            //change state isselected:true and change classname to name
            setState((existingItems) => {
              const itemIndex = existingItems.findIndex(
                (item) => item.id === arrayItem.id
              )
              return [
                ...existingItems.slice(0, itemIndex),
                {
                  ...existingItems[itemIndex],
                  isSelected: "true",
                  className: name
                },
                ...existingItems.slice(itemIndex + 1)
              ]
            })
          }
        }
      })
    } else {
      //if uncheck remove all a from classname
      state.map(function (arrayItem) {
        if (arrayItem.governorates === event.target.id) {
          if (arrayItem.className.includes("selected")) {
            name = arrayItem.className.replace(" selected", "")
            setState((existingItems) => {
              const itemIndex = existingItems.findIndex(
                (item) => item.id === arrayItem.id
              )
              return [
                ...existingItems.slice(0, itemIndex),
                {
                  ...existingItems[itemIndex],
                  isSelected: "false",
                  className: name
                },
                ...existingItems.slice(itemIndex + 1)
              ]
            })
          }
        }
      })
    }
  }

  //Tooltip for Onhover of district
  const HtmlTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} classes={{ popper: className }} />
  ))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: "rgb(216, 230, 236)",
      width: "15em",
      height: "10em",
      color: "rgba(0, 0, 0, 0.87)",
      maxWidth: 500,
      fontSize: theme.typography.pxToRem(12),
      border: "1px solid #dadde9",
      boxshadow: "5px black",
      paddingTop: "20px",
      paddingLeft: "10px",
      boxShadow: theme.shadows[5]
    }
  }))

//handle click of preview dialog
  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleclose = () => {
    setOpen(false)
  }

  const exportcsv = async () => {
    console.log(selecteddict)
    /*
    const towns = []
    const governorates = []
    //console.log(selecteddict)
    //console.log(state)

    for (let i = 0; i < selecteddict.length; i++) {
      if (selecteddict[i].selectedplaces.length > 0) {
          for (let j = 0; j < selecteddict[i].selectedplaces.length; j++) {
            towns.push(selecteddict[i].selectedplaces[j])
          }
      } else {
        governorates.push(state[i].cityname)
      }
    }
    console.log(towns)
    //console.log(governorates)
    /*await axios.post("http://localhost:5000/location/townsdata", selecteddict).then((response) => {
      if (response.data.error) {
        console.log(response.data)
      } else {
        
      }
    })*/
  }

  //check if all districts of the governorates are selected
  const checkboxautomate = (id) => {
    let i = 0
    state.map(function (arrayItem) {
      if (arrayItem.governorates === state[id].governorates) {
          if (arrayItem.isSelected === "false" && arrayItem.id !== id) {
            i = i + 1 
          }
      }
    })
    if (i === 0) {
      return true
    } else {
      return false
    }
  }

  const updatestate = (i, id) => {
    let selected = ""
    if (i.includes("selected")) {
      selected = "true"
    } else {
      selected = "false"
    }
    setState((existingItems) => {
      const itemIndex = existingItems.findIndex((item) => item.id === id)
      return [
        ...existingItems.slice(0, itemIndex),
        {
          ...existingItems[itemIndex],
          className: i,
          isSelected: selected
        },
        ...existingItems.slice(itemIndex + 1)
      ]
    })
  }
// on click of district handle
  const setstyleclicked = (event) => {
    const id = event.target.id // id found in component
    if (checkboxautomate(id) === true) {
      switch (state[id].governorates) {
        case "Baalbek" : 
          baalbeksetChecked(true)
          break
        case "Beirut":
          beirutsetChecked(true)
          break
        case "Mount Lebanon" : 
          mountsetChecked(true)
          break
        case "South Lebanon" : 
          southsetChecked(true)
          break  
        case "North Lebanon" : 
          northsetChecked(true)
          break    
        case "Nabatieh" : 
          nabatiehsetChecked(true)
          break
        case "Akkar" : 
          akkarsetChecked(true)
          break  
        case "Keserwan-Jbeil" : 
          keserwansetChecked(true)
          break
        case "Beqaa" : 
          beqaasetChecked(true)    
          break
        default :
          break  

      }


    }

    let i = event.target.className.baseVal //classname of component
    //if classname contains a remove it if not addit
    if (i.includes("selected")) {
      switch (state[id].governorates) {
        case "Baalbek" : 
          baalbeksetChecked(false)
          break
        case "Beirut":
          beirutsetChecked(false)
          break
        case "Mount Lebanon" : 
          mountsetChecked(false)
          break
        case "South Lebanon" : 
          southsetChecked(false)
          break  
        case "North Lebanon" : 
          northsetChecked(false)
          break    
        case "Nabatieh" : 
          nabatiehsetChecked(false)
          break
        case "Akkar" : 
          akkarsetChecked(false)
          break  
        case "Keserwan-Jbeil" : 
          keserwansetChecked(false)
          break
        case "Beqaa" : 
          beqaasetChecked(false)    
          break
        default :
          break  

      }

      i = i.replace(" selected", "")
    } else {
      i = i.concat(" selected")
    }
    updatestate(i, id)
  }
  return (
    <Card className="locationcard">

      {/* Box for visualizing the choosen districts */}
      <Box
        sx={{
          flexGrow: 1,
          maxWidth: { xs: 320, sm: 480 },
          bgcolor: "background.paper"
        }}
        className="boxdistricts"
      >
        <Tabs
          variant="scrollable"
          scrollButtons
          aria-label="visible arrows tabs example"
          sx={{
            [`& .${tabsClasses.scrollButtons}`]: {
              "&.Mui-disabled": { opacity: 0.9 }
            }
          }}
        >
          {state.map(function (arrayItem) {
            return (
              <>
                { // check all districts (in state) with isSelected is true
                arrayItem.isSelected === "true" ? (
                  <Tab label={arrayItem.cityname} className="navcity" />
                ) : null}
              </>
            )
          })}
        </Tabs>
      </Box>

    {/*Dialog when preview is pressed to visualize the places in selected districts*/}
      <Dialog
        open={open}
        onClose={handleclose}
      >
        <DialogContent className="dialog">
          {state.map(function (arrayItem) {
            const i = arrayItem.id
            const selected = selecteddict[i].selectedplaces
            const isAllSelected = arrayItem.places.length > 0 && selected.length === arrayItem.places.length
            return (
              <>
                {arrayItem.isSelected === "true" ? (
                  <FormControl className={classes.formControl} >
                  <InputLabel id="mutiple-select-label" style={{color :"#138fa5"}}>{arrayItem.cityname}</InputLabel>
                  <Select
                    labelId="mutiple-select-label"
                    multiple
                    value={selected}
                    onChange={handleselect}
                    renderValue={(selected) => selected.join(", ")}
                    MenuProps={MenuProps}
                    className={classes.select}
                    name={arrayItem.id}
                  >
                    <MenuItem
                      value="all"
                      classes={{
                        root: isAllSelected ? classes.selectedAll : ""
                      }}
                    >
                      <ListItemIcon>
                        <Checkbox
                          classes={{ indeterminate: classes.indeterminateColor }}
                          checked={isAllSelected}
                          indeterminate={
                            selected.length > 0 && selected.length < arrayItem.places.length
                          }
                          style={{color: '#138fa5'}}

                        />
                      </ListItemIcon>
                      <ListItemText
                        classes={{ primary: classes.selectAllText }}
                        primary="Select All"
                      />
                    </MenuItem>
                    {arrayItem.places.map((option) => (
                      <MenuItem key={option} value={option}>
                        <ListItemIcon>
                          <Checkbox  checked={selected.indexOf(option) > -1 } style={{color: '#138fa5'}}  />
                        </ListItemIcon>
                        <ListItemText primary={option} />
                      </MenuItem>
                    ))
                    }
                  </Select>
                </FormControl>
                ) : null}
              </>
            )
          })}
      
         <div  className="footer">
         <button variant="contained" className="exportcsv" onClick={exportcsv} >
          Export To CSV

          <FileDownloadIcon  style={{marginLeft:"5%"}} />
        </button>
          <span className="vip">VIP</span>
          <Switch onChange={handleswitch} checked={vip}  onColor="#138fa5" className="switch"/>

        </div>
       
        </DialogContent>
      </Dialog>

      <svg
        version="1.1"
        id="svg2"
        xmlns="http://www.w3.org/2000/svg"
        x="0px"
        y="0px"
        viewBox="0 0 424 599"
        className="map"
      >
        <HtmlTooltip
          title={
            <div>
              <p>Danniye</p>
              <p>
                Total : <CountUp end={3232} duration={0.3} />
              </p>
            </div>
          }
          placement="top"
        >
          <path
            className={state[0].className}
            d="M324.8,133.2l-4,4.3l-0.8,2.8l-1.8,3.5l-2,7.3l-1.8,2.3l-2.3,0.3c-0.2,1.5-0.5,2.8-0.8,3.9
              c-0.3,1.1-0.7,2.1-1.1,2.9c-0.4,0.8-0.8,1.4-1.3,1.9c-0.4,0.5-0.8,0.9-1.3,1.2c-0.8,0.6-1.7,0.8-2.2,0.9s-0.9,0-0.9,0l-3.5,2.5
              l-0.3,2.3l-5.8,3.8h-3l-1.5,3.3l-3,5.3l-1.3,0.3l-0.7,3l-2.6-1.6l-3.3,0.8l-0.3,3.8l-2.8,2.3l-5.8,0.8l-6,1.8l-2.3-2l-4.9,0.3
              l-0.1-3.8l-2-1l-1.7,0.8l-5.5-6.8l-3-1l-1-1.8l-5.5-3.5l-1.3-3l-5.3-3.5l0.5-2.5l-1.8-2.8l-0.3-5.8l2.5,1l4.3-2.3l0.8-2.5l-1.8-0.5
              l2.5-2.8l-1.8-1.5l2.5-1.5l4.3-0.8l1.8-5h2.7l1.2,0.7l2,1.1h11.3l2.8-1.8l16.8,0.5l3.8,4.8l1.3,3.8h5.5l2,2.3l9-2.5l4.3,0.5l1.3-1.3
              l1.5,1.3l2.5-1l-0.3-4l-0.8-6.8l3.3,0.5l7.9-6.9L324.8,133.2z"
            onClick={setstyleclicked}
            id={state[0].id}
          />
        </HtmlTooltip>
        <HtmlTooltip
          title={
            <div>
              <p>Baalbek</p>
              <p>
                Total : <CountUp end={2250} duration={0.3} />
              </p>
            </div>
          }
          placement="top"
        >
          <polygon
            className={state[1].className}
            points="408.1,222.4 404,222.6 399,226.5 398.1,231.3 394.8,232.7 395.6,234.7 391.9,240.8 387.8,241.8 
              377.6,251.5 380.1,257.2 375.5,264.7 371.2,266.3 364.2,267.2 358.1,264.2 354.4,268.8 350.8,267 352.6,271.3 347.3,271.3 
              345.8,277.4 337.3,286.3 331.9,288.6 330.3,292.6 322.8,300.1 321.9,303.6 315.5,312 317.8,313.3 328.3,311.3 338.8,311.5 
              342.1,316.5 344.8,324.2 348.3,328.3 344.6,332.7 341,331.1 327.8,331.1 316.7,326.3 308.3,324.2 306.5,326.1 303.8,327.9 
              299.2,330.8 293.5,327.4 291.7,328.1 285.6,321.7 284.4,325.2 280.5,329.3 276.2,327.7 276.2,330.1 271.5,333.6 266,333.8 
              262.3,335 270.6,319.4 269.2,318.3 266.7,319 265.3,316.2 263.5,316.2 259.7,317.6 255,315.5 255.8,313 251.5,313.7 249.7,317.3 
              245.5,319.4 241.2,313 241.9,309.1 240.5,308.8 238.4,305.2 234.5,302 231.3,303.1 226.3,301.7 224.6,297.1 221.5,296 220.8,294.6 
              217.5,294.3 216.8,290.3 221.8,285.2 222.1,279.4 226.1,274.4 233.4,271.3 238.7,264.5 239.4,264.1 240.8,263.3 244.3,250.1 
              248.1,250.1 248.6,247.8 250.1,241.3 251.6,239 252.1,238 253.3,235.7 258.2,226.3 251.6,225.1 253.1,223.3 260.4,214.5 
              260.9,214.2 261.3,214 261.3,214 261.3,214 263.5,213.3 266.2,209.6 269.8,205.4 270.3,203.9 277.6,194.6 279.9,194.1 284.4,189.8 
              284.7,188.6 285.5,189.7 288.3,189.7 290.1,191.8 288.7,195.3 294.7,198.5 302.2,200.7 308.2,200.7 312.4,203.5 310.3,205.3 
              316,206.7 325.2,209.9 327.3,207 327.7,203.8 322.7,203.2 313.9,200 311.8,197.5 317.1,195.7 324.5,199.6 327.3,196.1 327.3,193.2 
              325.6,192.9 327.7,190.8 330.5,191.1 338,197.1 341.2,189.7 342.9,183.3 343.3,178 345.1,171.3 350.7,170.2 354.6,167.3 
              357.4,166.3 357.8,162 367.7,152.5 371.6,150.3 373,144.7 378.2,142.3 383.7,148.1 388.5,149.5 391.3,151.1 394,150.9 393.5,153.8 
              392.8,160.2 385.5,166.8 389.2,175.9 393.7,180.4 392.1,184.9 396,188.4 403,191.8 401,195.2 401,198.6 405.8,209 408,215.1 
              406.9,217.2 "
            onClick={setstyleclicked}
            id={state[1].id}
          />
        </HtmlTooltip>
        <HtmlTooltip
          title={
            <div>
              <p>Batroun</p>
              <p>
                Total : <CountUp end={3232} duration={0.3} />
              </p>
            </div>
          }
          placement="top"
        >
          <path
            className={state[2].className}
            d="M253.1,223.3l-1.7,2.1l6.6,1.3l-4.6,9.1l-1.2,2.2l-1-5.5l-4.8-3l-11.6-4.3l-2,0.5l-2.3,2.3h-4.3l-1.8,1.5
              l-7.1-0.3l-2.5-3.3l0.3-4.5l-7.1-4.3h-5.5l-1.5-1.8l-0.3,4l-4.5-0.3l-0.5-3.8l-4.3-1.3l-2.8,1.8l-0.5,2h-5.6l-4.8-3.3h-6.6l-3.8-4.8
              l-6.8-0.4c0.4,0,0.8-0.3,1.3-0.1c-2.1-4.6,1.7-10.4,2-10.4l-2-3.3l1.5-2.8l-1.3-3l1-2.8l3.3-3c0,0,2.1-9.2,8.2-4l0.2,0.7v0l1.3,4.3
              l2.5,0.3l2.8,3.3l-1.3,1.8l1.5,2.3l7,1.8l7.8,4.8l9.5,2l2-1.3l4.5-1.3l2,1.8h3.3l2.3,3l4-0.5l2.5,3.5l1,4.8l1.8,0.3l3-1.3l3.5-0.3
              l3.8,1.3l1.5,1.3l4.3-1l3.8,1h3.5l2-2l6.5,3.9l-0.6,0.2L253.1,223.3z"
            onClick={setstyleclicked}
            id={state[2].id}
          />
        </HtmlTooltip>
        <HtmlTooltip
          title={
            <div>
              <p>Koura</p>
              <p>
                Total : <CountUp end={2250} duration={0.3} />
              </p>
            </div>
          }
          placement="top"
        >
          <path
            className={state[3].className}
            d="M215.3,180.9l2.3,5.5l-1,3.3l-2.3,4l-2,0.8l-2.5-2.5h-3.5l-0.8,2l-3.8,1.5l0.8,2.5l-2.7,1.8l-3.6-0.8l-7.8-4.8
            l-7-1.8l-1.5-2.3l1.3-1.8l-2.8-3.3l-2.5-0.3l-1.3-4.3l0.2-0.4c0.3,0.2,0.5,0.3,0.8,0.7l3.7-3l0.4,0.4l2.4-7.8l-0.1-0.4l-0.3,0
            l-0.8-2.1l2-2l-2-1.8c0,0,4.5,1,1.8-5.5c0,0,3.7,0.5,8.8-0.9l2.8,2.8l6.8-4.3l5.9-4.5l2.1-4.5l4.3,8.5l4.2-0.6l0.9-0.1l-1.5,5h-2.5
            l-1.5,1.3l2,2.8l-1.3,3.5l0.5,4.5L215.3,180.9z"
            onClick={setstyleclicked}
            id={state[3].id}
          />
        </HtmlTooltip>
        <HtmlTooltip
          title={
            <div>
              <p>Tripoli</p>
              <p>
                Total : <CountUp end={2250} duration={0.3} />
              </p>
            </div>
          }
          placement="top"
        >
          <path
            className={state[4].className}
            d="M218.8,152.3l-1.3,2.8l-0.1,0.1l-4.2,0.6l-4.3-8.5l-2.1,4.5l-5.9,4.5l-6.8,4.3l-2.8-2.8c4-1,8.8-3.1,13.7-7.5
              l1-5.6l-2.3-1V139l-1-1.8l1-2.3l2.3,2.3l1-0.3v-3l1.5,1.8l5.8-0.2l2.3,2.8l-0.2,3.7l0,0.6l-2.5,3l1,3.3L218.8,152.3z"
            onClick={setstyleclicked}
            id={state[4].id}
          />
        </HtmlTooltip>
     
        <HtmlTooltip
          title={
            <div>
              <p>Bshari</p>
              <p>
                Total : <CountUp end={7654} duration={0.3} />
              </p>
            </div>
          }
          placement="top"
        >
          <polygon
            className={state[5].className}
            points="285.5,185 284.7,188.6 284.4,189.8 279.9,194.1 277.6,194.6 270.3,203.9 269.8,205.4 266.2,209.6 
              263.7,212.5 261.3,214 261.3,214 261.3,214 260.8,214.1 254.4,210.2 252.4,212.2 248.9,212.2 245.1,211.2 240.8,212.2 239.3,211 
              235.6,209.7 232.1,210 229.1,211.2 227.3,211 226.3,206.2 223.8,202.7 219.8,203.2 217.5,200.2 214.3,200.2 212.3,198.4 
              207.8,199.7 205.8,201 199.8,199.7 202.5,197.9 201.8,195.4 205.5,193.9 206.3,191.9 209.8,191.9 212.3,194.4 214.3,193.7 
              216.5,189.7 217.5,186.4 216.8,184.6 218.1,185.4 221.3,186.4 229.6,188.9 232.6,192.2 233.8,194.7 237.1,194.7 237.1,190.9 
              239.6,190.9 242.3,193.2 245.6,193.9 250.6,194.4 254.1,191.2 262.7,190.7 264.9,192.7 270.9,190.9 276.7,190.2 279.4,187.9 
              279.7,184.2 282.9,183.4 "
            onClick={setstyleclicked}
            id={state[5].id}
          />
        </HtmlTooltip>
        <HtmlTooltip
          title={
            <div>
              <p>Zgharta</p>
              <p>
                Total : <CountUp end={2250} duration={0.3} />
              </p>
            </div>
          }
          placement="top"
        >
          <polygon
            className={state[6].className}

              points="257.8,191 254.1,191.2 250.6,194.4 245.6,193.9 242.3,193.2 239.6,190.9 237.1,190.9 237.1,194.7
              233.8,194.7 232.6,192.2 229.6,188.9 221.3,186.4 218.1,185.4 216.8,184.6 215.3,180.9 214,172.1 213.5,167.6 214.8,164.1
              212.8,161.4 214.3,160.1 216.8,160.1 218.3,155.1 217.4,155.2 217.5,155.1 218.8,152.3 215,148.8 214,145.6 216.5,142.6 216.6,142
              216.8,138.3 214.5,135.5 215,135.5 227.9,132.4 236.5,123.3 237.5,119.8 240.5,119.8 242,118 242.1,118 242.3,123 245.1,124.8
              247.4,123 249.9,125.8 249.1,127.5 247.5,127.5 249.8,141.2 248.6,140.6 245.9,140.6 244.1,145.6 239.8,146.3 237.3,147.8
              239.1,149.3 236.6,152.1 238.3,152.6 237.6,155.1 233.3,157.3 230.8,156.3 231.1,162.1 232.8,164.9 232.3,167.4 237.6,170.9
              238.8,173.9 244.3,177.4 245.4,179.2 248.4,180.2 253.9,186.9 255.6,186.2 257.6,187.2 "

            onClick={setstyleclicked}
            id={state[6].id}
          />
        </HtmlTooltip>
    
        <HtmlTooltip
          title={
            <div>
              <p>Hasbaya</p>
              <p>
                Total : <CountUp end={2250} duration={0.3} />
              </p>
            </div>
          }
          placement="top"
        >
          <path
            className={state[7].className}
            d="M207.1,454.3l-9.6,5.4l-2.5,6.1l-0.4,6.1l-2.5,1.1l-7,5l-9.8,3.8c0,0-2.5-0.5-2.7-1.3c-0.2-0.7-2-0.7-2-0.7
              l-2.3,1.6l-2.3,7.3l-3.8,0.7l-9.8,6.8l-2.9-2.1l-5.3,2.7l0.3,8l-0.2,0.1l-1.1-12.5l4.8-6.6l0.5-2.3l-1.5-1.3v-4.6l-1.3-1.5l1.5-4.3
              l1.8-2.8l-1-3.5l-1.3-3.3l-2.8-4l-3.5-2.1l1.2-0.5v-3.5l2.8-1l2.8-1.8v0l4-2.5l3,3.8l3.3-3v-1.8l3.3-3.8l0.3-4.3l1.5-0.8l1.5,2.5
              l12.3-5.3l0.1-0.1l3.8,3.8l0.5,2.3l-2.3,4l5.6,8.4l8.1,0.5l1-3.5l2-3.8l3,0.8L207.1,454.3z"
            onClick={setstyleclicked}
            id={state[7].id}
          />
        </HtmlTooltip>
        <HtmlTooltip
          title={
            <div>
              <p>Nabatieh</p>
              <p>
                Total : <CountUp end={2250} duration={0.3} />
              </p>
            </div>
          }
          placement="top"
        >
          <path
            className={state[8].className}
            d="M121.3,434.7l-1.3,2.8l3.8,3.8l-3.3,5.6l1,2l2.5,0.5l0.3,2l-4.6,7.8l-0.3,6.3l3.3,0.5l0.3,4.8l1.3-0.3l-1,6.2
              l-2.5,11.1l-2.3-1l-3.8-1.5h-5.3l-1.3-2.3l-10.1-0.3l-1.5,0.7l-1.3-1.5l-2.5-1l-1,1.3l-1.8,1.5l-2,1l-2-1.8l-1.8-1.8l-1.8,2
              l-2.5-0.3c0,0-0.1-0.3-0.3-0.5c-0.2-0.3-0.6-0.6-1.2-0.8c-1.3-0.3-1.8-0.3-2.8-0.8c-1-0.5-2.8-2-2.8-2l0.3-1.6h0l0.2-0.7l2.5-2
              l1.5-2l1-3.5c0,0-0.3-0.3-0.8-0.6c-0.5-0.3-1.2-0.6-1.9-0.6c-1.5,0-2.5,0-2.5,0l-1.8-2.5c0,0-1.5-0.3-2.5-0.3c-1,0-2-0.3-3.3-0.5
              s-4.6-1-4.6-1l6.1-1v-3.8l-3.5,1l4.5-3.5l1.8-2h2l1.8-1.3l0.8,4.8l4.6,4.5l2.5-0.8l-1.3-2.3l1.3-3.3l5-1.3l0.3-0.3l3-0.8l-0.8-1.5
              l-3.5-3.5l-0.3-2.8l1.5-6.1l1-2.5L93,439l2.3-2.8l-2-2.5l-3.6-1.5l1.8-1.5l3.3,0.5l1.8-2.8h1.5l4.8,3.8l1-2l-0.5-3h2.2l2.5,5
              l1.8-1.3l1-1.3l3.8-2.3l1.5-1.3h2.5l1.3-2.8l2-1.3l5.8,2l-3.3,4.8l1.5,1.5L121.3,434.7z"
            onClick={setstyleclicked}
            id={state[8].id}
          />
        </HtmlTooltip>

        <HtmlTooltip
          title={
            <div>
              <p>Bint Jbeil</p>
              <p>
                Total : <CountUp end={2250} duration={0.3} />
              </p>
            </div>
          }
          placement="top"
        >
          <polygon
            className={state[9].className}
            points="111.9,542.6 111.5,550.8 106.7,549.7 97.3,550.2 92.6,557 80.3,558.8 78.8,560.2 77.3,560.4 
              76.3,559.3 71.7,558.6 65.8,551.1 63.8,545.8 59.8,545.6 59,544.3 59.7,541 59.2,532 62.2,529.2 61.7,526.7 64.2,526.7 65,525.1 
              63.2,522.1 67.8,523.6 72.6,519.3 71.3,515.8 74.8,517.1 77.3,513.5 79.6,514.5 80.4,512.8 74.8,510.5 75.6,508.5 79.4,507.5 
              81.9,507.5 82.4,504.7 83.9,501.2 85.7,502.2 88,504.7 90,503.2 90,496.8 91.8,495.6 93,493.6 93.5,492 97.8,490.3 99.3,491 
              97.6,493.3 97.1,496.1 93.3,499.6 93.3,506.4 96,509.2 99.1,515.8 104.6,516 106.9,515 107.2,521.8 106.4,527.4 107.7,529.4 
              106.4,532 104.9,538.8 "
            onClick={setstyleclicked}
            id={state[9].id}
          />
        </HtmlTooltip>
        <HtmlTooltip
          title={
            <div>
              <p>Marjeyoun</p>
              <p>
                Total : <CountUp end={2250} duration={0.3} />
              </p>
            </div>
          }
          placement="top"
        >
          <polygon
            className={state[10].className}
            points="147.1,482.2 148.6,483.5 148.1,485.8 143.3,492.3 144.4,504.8 143.1,505.6 134,497.9 133.1,492.7 
              129.9,491.8 128.3,497.4 125.1,500.8 124.9,505.4 120.8,511.1 123.3,519 117.3,535.6 119.6,537.2 116.9,542.7 111.9,542.6 
              104.9,538.8 106.4,532 107.7,529.4 106.4,527.4 107.2,521.8 106.9,515 104.6,516 99.1,515.8 96,509.2 93.3,506.4 93.3,499.6 
              97.1,496.1 97.6,493.3 99.3,491 97.8,490.3 93.5,492 94,490 95.8,488.3 97.6,486.5 97.1,484 96.6,483.4 98.1,482.7 108.2,483 
              109.4,485.3 114.7,485.3 118.5,486.8 120.8,487.8 123.3,476.7 124.3,470.5 124.8,470.3 126.3,464.5 130.7,461.5 136.7,462.3 
              138.5,456.9 140.5,456.2 144,458.2 146.8,462.3 148.1,465.5 149.1,469.1 147.3,471.8 145.8,476.2 147.1,477.7 "
            onClick={setstyleclicked}
            id={state[10].id}
          />
        </HtmlTooltip>
        <HtmlTooltip
          title={
            <div>
              <p>Sour</p>
              <p>
                Total : <CountUp end={2250} duration={0.3} />
              </p>
            </div>
          }
          placement="top"
        >
          <path
            className={state[11].className}
            d="M97.6,486.5l-1.8,1.8L94,490l-1,3.5l-1.3,2l-1.8,1.3v6.3l-2,1.5l-2.3-2.5l-1.8-1l-1.5,3.5l-0.5,2.8h-2.5l-3.8,1
              l-0.8,2l5.5,2.3l-0.8,1.8l-2.3-1l-2.5,3.5l-3.6-1.3l1.3,3.5l-4.8,4.3l-4.5-1.5l1.8,3l-0.8,1.5h-2.5l0.5,2.5l-3,2.8l0.5,9.1l-0.7,3.3
              l-0.7-1.3l-3.8,2.8l-12.1,1.8l-3.4-2.1l-2.8-1.4l-0.4,3.9l-4.5,0.9l-3.8-2.7l-3.8,2l-15.7-3.1l0.7-2.5l1.8-2.5l9.1-5l1.4-1.8
              l1.6-5.2l2.8-3.8l3.6-0.7l1.1-0.9l7.2-16.3l0.2-9.8l-2.1-3.4l-3,0.2l-0.2-1.8l1.6-1.6l1.3,1.3l1.6-0.4l2.8-2.5l0.7-4.8l7-11.6
              c0,0,0-0.1,0.1-0.4c0,0.1,0,0.2,0,0.2l1.2-0.1l2.5,3.2l3.6,1.8l6.8,0.7l11.8-0.2l-0.3,1.6c0,0,1.8,1.5,2.8,2c1,0.5,1.5,0.5,2.8,0.8
              c0.6,0.1,1,0.5,1.2,0.8c0.2,0.3,0.3,0.5,0.3,0.5l2.5,0.3l1.8-2l1.8,1.8l2,1.8l2-1l1.8-1.5l1-1.3l2.5,1l1.3,1.5l0.5,0.5L97.6,486.5z"
            onClick={setstyleclicked}
            id={state[11].id}
          />
        </HtmlTooltip>
        <HtmlTooltip
          title={
            <div>
              <p>Hermel</p>
              <p>
                Total : <CountUp end={2250} duration={0.3} />
              </p>
            </div>
          }
          placement="top"
        >
          <path
            className={state[12].className}
            d="M377.8,141.8l0.4,0.4l-5.1,2.4l-1.4,5.7l-3.9,2.1l-9.9,9.6l-0.4,4.3l-2.8,1.1l-3.9,2.8l-5.7,1.1l-1.8,6.7
              l-0.3,5.3l-1.8,6.4l-3.2,7.4l-7.4-6l-2.8-0.3l-2.1,2.1l1.8,0.4v2.8l-2.8,3.5l-7.4-3.9l-5.3,1.8l2.1,2.5l8.8,3.2l5,0.7l-0.3,3.2
              l-2.1,2.8l-9.2-3.2l-5.7-1.4l2.1-1.8l-4.3-2.8h-6l-7.4-2.1l-6-3.2l1.4-3.5l-1.8-2.1h-2.8l-0.8-1.1l0.8-3.7l0.7-3l1.3-0.3l3-5.3
              l1.5-3.3h3l5.8-3.8l0.3-2.3l3.5-2.5c0,0,0.4,0.1,0.9,0s1.4-0.3,2.2-0.9c0.4-0.3,0.8-0.7,1.3-1.2c0.4-0.5,0.8-1.2,1.3-1.9
              c0.4-0.8,0.8-1.8,1.1-2.9c0.3-1.1,0.6-2.4,0.8-3.9l2.3-0.3l1.8-2.3l2-7.3l1.8-3.5l0.8-2.8l4-4.3l-0.9-1.6l-0.1-0.2l2.3-4.6l2.5-0.3
              v-1.8l2.8-3l5.3-2.3v5.3h1.5l0.8-1.5l1.6-0.7l2.2,2l8.9,0.9l6.1-3.4l2.2,0.7l5.2,0.9l1.1,2.7l-2.5,5l4.3,2.1l2,4.3l5,1.6l3.9-0.4
              L377.8,141.8z"
            onClick={setstyleclicked}
            id={state[12].id}
          />
        </HtmlTooltip>
        <HtmlTooltip
          title={
            <div>
              <p>Akkar</p>
              <p>
                Total : <CountUp end={2250} duration={0.3} />
              </p>
            </div>
          }
          placement="top"
        >
          <path
            className={state[13].className}
            d="M370.6,84.9l-2.1,11.4l-1.8,3.2l-5.2-0.7l-0.7-2.7l-4.6-2.5l-2.5,7.9l1.4,2.5l3.4,3.8l-2.5,3.9l-4.8,0.9
              l-1.4,3.2H348l-8,6.3l0.7,0.6l-1.6,0.7l-0.8,1.5h-1.5v-5.3l-5.3,2.3l-2.8,3v1.8l-2.5,0.3l-2.3,4.6l0.1,0.2l-7.9,6.9l-3.3-0.5
              l0.8,6.8l0.3,4l-2.5,1l-1.5-1.3l-1.3,1.3l-4.3-0.5l-9,2.5l-2-2.3h-5.5l-1.3-3.8l-3.8-4.8l-16.8-0.5l-2.8,1.8h-11.3l-2-1.1v0
              l-2.4-13.7h1.7l0.8-1.8l-2.5-2.8l-2.3,1.8l-2.8-1.8l-0.3-5h4l2.3-2.8l1.5-3l-0.5-20.5l-2.5-9.1l1.2-5.5l2.1-0.3l0.9,2l3.8,0.4
              l6.8,4.6l4.5,0.4l2.8-2.1l3.9,1.8l3.4,0.7l1.6-2l4.7,0.5l2.1-1.8l10.5,3.4l2.3,0.4l0.9-1.8h6.4l1.1,1.4l3.2,2l3.4-0.7l2.8-2.5
              c0,0,6.9,6.2,14.1-0.7l2-5.2c0,0-3-8.6,7.9-10.7l4.6,4.1l-1.6,2.2l0.2,4.1l8.9,8.4l2.9-2.2l5.3,4.5l8.6-3.4L370.6,84.9z"
            onClick={setstyleclicked}
            id={state[13].id}
          />
        </HtmlTooltip>
        <HtmlTooltip
          title={
            <div>
              <p>Jbeil</p>
              <p>
                Total : <CountUp end={2250} duration={0.3} />
              </p>
            </div>
          }
          placement="top"
        >
          <path
            className={state[14].className}
            d="M252.1,238l-0.5,1l-1.5,2.3l-1.5,6.6l-0.5,2.3h-3.8l-3.5,13.1l-1.4,0.9l-6-9.3l-1.4,3.9h-1.8l-4.9,4.3l-2.5,1.1
              l-2.8-6.4h-4.3l-4.3-0.7l-2.5,3.9l-1.8-1.8h-2.5l-6,1.4l-5,0.4l0.4-2.5l-2.5-2.5l3.2-3.9l0.7-2.5h-5l-2.1,1.4l-9.2,0.4l-6.7-2.5
              h-4.3l-7.4,3.2l-0.4,2.1l-5.4,3l1.6-1.8v-4.3c0,0,5.3-3.8,1-15.6l-0.8-2.5l-3.8-4.3l1.8-2.5c0,0-0.8-16,5.6-16.8l6.8,0.4l3.8,4.8
              h6.6l4.8,3.3h5.6l0.5-2l2.8-1.8l4.3,1.3l0.5,3.8l4.5,0.3l0.3-4l1.5,1.8h5.5l7.1,4.3l-0.3,4.5l2.5,3.3l7.1,0.3l1.8-1.5h4.3l2.3-2.3
              l2-0.5l11.6,4.3l4.8,3L252.1,238z"
            onClick={setstyleclicked}
            id={state[14].id}
          />
        </HtmlTooltip>
        <HtmlTooltip
          title={
            <div>
              <p>Kesrwan</p>
              <p>
                Total : <CountUp end={2250} duration={0.3} />
              </p>
            </div>
          }
          placement="top"
        >
          <path
            className={state[15].className}
            d="M239.4,264.1l-0.7,0.4l-5.3,6.8l-7.3,3l-4,5l-0.3,5.8l-5.1,5.1l0.1,0.4l-12.4-5.7l-1.4-2.8l-4.3-0.7l-0.3,2.1
              l-8.9,1.4l0.4,2.8l-2.8,1.4l-4.3-3.9l-6,2.2l-9.6,3.2l-9.9,1.1l-10.3-2.1l-2.8-3.5l1.3-0.6l0.3-3l4.1-4.8h4l3-3l-1-5.6
              c0,0-7.8,0-2.5-10.1l1.7-1.8h0l5.4-3l0.4-2.1l7.4-3.2h4.3l6.7,2.5l9.2-0.4l2.1-1.4h5l-0.7,2.5l-3.2,3.9l2.5,2.5l-0.4,2.5l5-0.4
              l6-1.4h2.5l1.8,1.8l2.5-3.9l4.3,0.7h4.3l2.8,6.4l2.5-1.1l4.9-4.3h1.8l1.4-3.9L239.4,264.1z"
            onClick={setstyleclicked}
            id={state[15].id}
          />
        </HtmlTooltip>
        <HtmlTooltip
          title={
            <div>
              <p>Baabda</p>
              <p>
                Total : <CountUp end={2250} duration={0.3} />
              </p>
            </div>
          }
          placement="top"
        >
          <polygon
            className={state[16].className}
            points="205.8,312.5 201.8,315 195.8,322.6 193.8,323.9 194.5,326.1 195.8,327.4 192.5,329.4 191.7,332.4 
              188.1,332.6 185.9,332.2 186.1,332.8 184.2,332.8 178.5,336.8 174.9,336.4 171.4,332.8 167.5,333.9 161.5,333.2 157.9,330.4 
              155.8,332.1 149.8,331.1 140.9,326.1 137,325.4 136,328.3 130.3,329.7 128.2,335 123.2,329.3 124.6,326.8 120.4,324 118.6,326.1 
              113.7,325.2 113.7,312.3 114,312.5 119.3,313 120.3,315 124.6,310.2 125.6,309.6 126.8,311.2 126.8,314.1 131.7,315.5 133.5,320.1 
              141.6,322.6 145.2,321.2 147.3,319 149.4,315.1 153,313.7 158.7,311.9 163.6,310.2 171.1,309.8 178.1,310.2 184.5,313 191.3,310.2 
              198.3,309.5 "
            onClick={setstyleclicked}
            id={state[16].id}
          />
        </HtmlTooltip>
        <HtmlTooltip
          title={
            <div>
              <p>Aley</p>
              <p>
                Total : <CountUp end={2250} duration={0.3} />
              </p>
            </div>
          }
          placement="top"
        >
          <polygon
            className={state[17].className}
            points="196.6,338.5 196.6,340.5 194.5,343.3 194.5,347.1 192.3,349.9 191.1,350.9 188.5,353.2 185.4,355.1 
              173.5,352 169.6,349.2 167.2,349.2 164.3,352.3 161.8,354.5 156.9,354.1 152.3,350.6 147.7,354.1 143.4,354.8 142,358 133.8,356.2 
              126.4,361.2 115.8,363.7 112.6,359.1 108.7,357.3 111.5,354.8 107.6,353.8 110.1,350.9 115.1,350.6 109.8,347.7 107.1,344.6 
              112.7,334.5 112.5,330.7 113.7,329.2 113.7,325.2 118.6,326.1 120.4,324 124.6,326.8 123.2,329.3 128.2,335 130.3,329.7 136,328.3 
              137,325.4 140.9,326.1 149.8,331.1 155.8,332.1 157.9,330.4 161.5,333.2 167.5,333.9 171.4,332.8 174.9,336.4 178.5,336.8 
              184.2,332.8 186.1,332.8 186.4,334.5 188.7,338 194.8,339.3 "
            onClick={setstyleclicked}
            id={state[17].id}
          />
        </HtmlTooltip>
        <HtmlTooltip
          title={
            <div>
              <p>Matn</p>
              <p>
                Total : <CountUp end={2250} duration={0.3} />
              </p>
            </div>
          }
          placement="top"
        >
          <path
            className={state[18].className}
            d="M221.8,296.8l-2,3.5l-4.5,1.3l-2.5-0.8l-3.8,3.3l1.8,1.5l-1.3,2l-2.5,1.3l0.5,2.5l-1.6,1l-7.5-3l-7.1,0.7
              l-6.7,2.8l-6.4-2.8l-7.1-0.4l-7.5,0.4l-4.9,1.8l-5.7,1.8l-3.5,1.4l-2.1,3.9l-2.1,2.1l-3.6,1.4l-8.1-2.5l-1.8-4.6l-5-1.4v-2.8
              l-1.1-1.6l1.5-0.9l1.2-6.7l0.8,0.1l1.3,1c0,0,9.9,5.6,12.9-16.7l0.9-0.4l2.8,3.5l10.3,2.1l9.9-1.1l9.6-3.2l6-2.2l4.3,3.9l2.8-1.4
              l-0.4-2.8l8.9-1.4l0.3-2.1l4.3,0.7l1.4,2.8l12.4,5.7l0.7,3.6l3.3,0.3L221.8,296.8z"
            onClick={setstyleclicked}
            id={state[18].id}
          />
        </HtmlTooltip>
        <HtmlTooltip
          title={
            <div>
              <p>Chouf</p>
              <p>
                Total : <CountUp end={2250} duration={0.3} />
              </p>
            </div>
          }
          placement="top"
        >
          <path
            className={state[19].className}
            d="M185.4,355.1l-0.5,0.3l-1.8,3.5l-2.5,3l-1.8,3.8l-2.8,2.3l-4.3,2l-5.1,3.3l3.8,6.6H169l-2.8-2.8l-3,5.6
              l-3.3,3.8l-5.1,14.9l-1.8,8.6l-3.5,6.6l-1.5,10.1l-1.6,0.9l0.1-0.4l-4.1-1.5l2.3-7.6l-1.3-4.8l-3.8-3.5l3.3-6.8l-2.8-4.8l-5.1,1
              l-3-2.8l-3.3,2.3l-5.6,2h-4l-5.3,2.3l-4.3,0.3l-0.3,1.3l-2.5,0.5l-4.8-2.3l-4-1.3l0,0l-2-2h-4.3l-5.4-2.9c0.1-0.4,0.3-0.7,0.4-1.2
              c0.1-0.4,0.3-3.3,0.3-3.3l2.8-1.8l0.3-9.8l3.3-3.8v-0.5l2.5-1.8l-1-7.6l3-2.5l2.5-1l0.8-2.3l1.8-1v-7.8l4.2-7.5l2.7,3.1l5.3,2.8
              l-5,0.4l-2.5,2.8l3.9,1.1l-2.8,2.5l3.9,1.8l3.2,4.6l10.6-2.5l7.4-5l8.2,1.8l1.4-3.2l4.3-0.7l4.6-3.5l4.6,3.5l5,0.4l2.5-2.1l2.8-3.2
              h2.5l3.9,2.8L185.4,355.1z"
            onClick={setstyleclicked}
            id={state[19].id}
          />
        </HtmlTooltip>
        <HtmlTooltip
          title={
            <div>
              <p>Zahle</p>
              <p>
                Total : <CountUp end={2250} duration={0.3} />
              </p>
            </div>
          }
          placement="top"
        >
          <polygon
            className={state[20].className}
            points="270.6,319.4 262.3,335 262.1,335.1 261.3,336.8 259.7,339.9 259.8,340.3 253.8,348.8 249.4,348.8 
              243.5,355.6 236.5,358.1 231.3,361.7 238,370.1 235.6,371.5 230.9,373.3 224.6,366.9 221,366.5 216.4,368.3 211.8,363.3 215,358 
              217.8,356.9 220.3,355.2 219.6,351.3 218.2,348.1 218.9,345.3 216.4,344.2 209,347.7 208.6,351.3 202.9,355.5 199.8,365.4 
              197.3,355.9 196.9,350.6 194.8,352 191.1,350.9 192.3,349.9 194.5,347.1 194.5,343.3 196.6,340.5 196.6,338.5 194.8,339.3 
              188.7,338 186.4,334.5 186.1,332.8 185.9,332.2 189.8,333 191.5,333 191.7,332.4 191.7,332.4 192.5,329.4 195.8,327.4 194.5,326.1 
              193.8,323.9 195.8,322.6 201.8,315 207.4,311.5 206.9,309 209.4,307.7 210.7,305.7 208.9,304.2 212.7,300.9 215.3,301.6 
              219.8,300.4 221.8,296.8 221.5,296 224.6,297.1 226.3,301.7 231.3,303.1 234.5,302 238.4,305.2 240.5,308.8 241.9,309.1 241.2,313 
              245.5,319.4 249.7,317.3 251.5,313.7 255.8,313 255,315.5 259.7,317.6 263.5,316.2 265.3,316.2 266.7,319 269.2,318.3 "
            onClick={setstyleclicked}
            id={state[20].id}
          />
        </HtmlTooltip>
        <HtmlTooltip
          title={
            <div>
              <p>Rashaya</p>
              <p>
                Total : <CountUp end={2250} duration={0.3} />
              </p>
            </div>
          }
          placement="top"
        >
          <path
            className={state[21].className}
            d="M258.1,408.3l-8.4,9.3h-2.5l-4.5,1.4l-1.6-3l-4.7,0.9l-2.7,3.6v-0.2c0,0-8.7,3.2-7.7,8.6l0.3,2.3l3.8,3
              l-1.4,1.8l-2,6.4l-3.2,0.4l-2.5,1.4l-3.9,2.1v2.3l-10.2,5.7l-8.8-7.7l-3-0.8l-2,3.8l-1,3.5l-8.1-0.5l-5.6-8.4l2.3-4l-0.5-2.3
              l-3.8-3.8l-0.1,0l0.3-1.2l-5.7-5.3l-2.1,2.5l-2.1-1.4l1.1-2.1l0.3-5.7l-0.3-3.2l-5,0.3l1.4-3.9l6.4-0.3l7.1-3.2l3.2-1.4h2.8l0.7-3.5
              l2.8-4.6l-1.4-2.1l2.8-1.4l1.4-2.8l4.6-0.7l1.1,3.2h3.2l-0.7-1.8l6-3.9l1.4-4.6l3.5-2.5l2.5,2.1l8.2-3.2l3.9-3.2v-5.7l5.2-3.3
              l1.9,1.9l4.7-1.8l-0.3,3.9l-2.2,1.1l-1.1,2.7l-2.1,3.9l-0.4,2.7l5.4,0.7l3.4-0.4l5,4.5l3.4,0.2l5.3,5.9
              C252.1,396.7,262.6,401.5,258.1,408.3z"
            onClick={setstyleclicked}
            id={state[21].id}
          />
        </HtmlTooltip>
        <HtmlTooltip
          title={
            <div>
              <p>Beqaa algharbi</p>
              <p>
                Total : <CountUp end={2250} duration={0.3} />
              </p>
            </div>
          }
          placement="top"
        >
          <polygon
            className={state[22].className}
            points="229,371.3 223.8,374.7 223.8,380.3 220,383.5 211.8,386.7 209.3,384.6 205.8,387.1 204.4,391.7 
              198.3,395.6 199,397.3 195.8,397.3 194.8,394.2 190.2,394.9 188.8,397.7 185.9,399.1 187.3,401.3 184.5,405.8 183.8,409.4 
              181,409.4 177.8,410.8 170.7,414 164.3,414.3 162.9,418.3 167.9,417.9 168.2,421.1 167.9,426.8 166.8,428.9 168.9,430.3 
              171.1,427.8 176.7,433.1 176.5,434.3 164.2,439.5 162.7,437 161.2,437.8 160.9,442.1 157.7,445.8 157.7,447.6 154.4,450.6 
              151.3,446.8 147.4,449.4 147.6,446.3 149.1,442.8 146.3,442.1 143,447.9 141.8,446.6 144,441.5 143.3,439 145.3,432.7 146.5,427.5 
              148.1,426.7 149.6,416.5 153.1,410 154.9,401.4 159.9,386.5 163.2,382.7 166.3,377.2 169,379.9 170.5,379.9 166.8,373.4 
              171.8,370.1 176.1,368.1 178.9,365.8 180.7,362 183.2,359 184.9,355.4 185.4,355.1 188.5,353.2 191.1,350.9 194.8,352 196.9,350.6 
              197.3,355.9 199.8,365.4 202.9,355.5 208.6,351.3 209,347.7 216.4,344.2 218.9,345.3 218.2,348.1 219.6,351.3 220.3,355.2 
              217.8,356.9 215,358 211.8,363.3 216.4,368.3 221,366.5 224.6,366.9 "
            onClick={setstyleclicked}
            id={state[22].id}
          />
        </HtmlTooltip>
        <HtmlTooltip
          title={
            <div>
              <p>Jezzin</p>
              <p>
                Total : <CountUp end={2250} duration={0.3} />
              </p>
            </div>
          }
          placement="top"
        >
          <polygon
            className={state[23].className}
            points="149.1,442.8 147.6,446.3 147.4,449.4 144.5,451.2 141.8,452.2 141.8,455.7 140.5,456.2 138.5,456.9 
              136.7,462.3 130.7,461.5 126.3,464.5 124.8,470.3 124.3,470.5 123.1,470.8 122.8,466 119.5,465.5 119.8,459.2 124.3,451.4 
              124.1,449.4 121.6,448.9 120.5,446.8 123.8,441.3 120,437.5 121.3,434.7 126.1,430.4 124.6,428.9 127.9,424.1 122.1,422.1 
              120,423.4 118.8,426.2 116.3,426.2 114.7,427.4 114.8,427.3 114.6,422.6 117.1,420.8 114.9,419.7 114.6,417.2 109.2,415.8 
              108.5,420.8 102.1,419.7 100.3,422.6 94.9,417.2 98.1,414.3 94.9,411.8 97.1,408.6 100.6,406.8 98.1,401.4 102.1,402.7 106.9,404.9 
              109.4,404.4 109.7,403.2 114,402.9 119.3,400.6 123.3,400.6 128.9,398.6 132.2,396.3 135.2,399.1 140.3,398.1 143,402.9 
              139.7,409.7 143.5,413.3 144.8,418.1 142.5,425.6 146.6,427.2 146.5,427.5 145.3,432.7 143.3,439 144,441.5 141.8,446.6 143,447.9 
              146.3,442.1 "
            onClick={setstyleclicked}
            id={state[23].id}
          />
        </HtmlTooltip>
        <HtmlTooltip
          title={
            <div>
              <p>Sidon</p>
              <p>
                Total : <CountUp end={2250} duration={0.3} />
              </p>
            </div>
          }
          placement="top"
        >
          <path
            className={state[24].className}
            d="M114.6,422.6l0.2,4.8l-0.1,0.1l-3.8,2.3l-1,1.3l-1.8,1.3l-2.5-5h-2.2l0.5,3l-1,2l-4.8-3.8h-1.5l-1.8,2.8
              l-3.3-0.5l-1.8,1.5l3.6,1.5l2,2.5L93,439l-5.3-1.8l-1,2.5l-1.5,6.1l0.3,2.8l3.5,3.5l0.8,1.5l-3,0.8l-0.3,0.3l-5,1.3l-1.3,3.3
              l1.3,2.3l-2.5,0.8l-4.6-4.5l-0.8-4.8l-1.8,1.3h-2l-1.8,2l-4.5,3.5l3.5-1v3.8l-6.1,1c0,0,3.3,0.8,4.6,1s2.3,0.5,3.3,0.5
              c1,0,2.5,0.3,2.5,0.3l1.8,2.5c0,0,1,0,2.5,0c0.8,0,1.4,0.3,1.9,0.6c0.5,0.3,0.8,0.6,0.8,0.6l-1,3.5l-1.5,2l-2.5,2l-0.2,0.7h0
              l-11.8,0.2l-6.8-0.7l-3.6-1.8l-2.5-3.2l-1.2,0.1c0,0,0-0.1,0-0.2c0,0,0-0.1,0-0.1c0-0.1,0-0.2,0.1-0.4c0-0.1,0-0.3,0.1-0.4
              c0,0,0-0.1,0-0.1c0.1-0.4,0.2-0.9,0.3-1.5c0.1-0.3,0.1-0.5,0.2-0.8c0,0,0,0,0,0c0.1-0.3,0.1-0.6,0.2-0.9c0,0,0,0,0-0.1
              c0.1-0.3,0.1-0.6,0.2-0.9c0.8-3.5,2-8.3,3.5-13.2c0.2-0.5,0.3-1,0.5-1.5c0.5-1.5,1-2.9,1.5-4.4c0.2-0.5,0.4-1,0.6-1.4
              c0.2-0.5,0.4-1,0.6-1.4c0.2-0.4,0.4-0.9,0.6-1.3c0.3-0.6,0.6-1.3,0.9-1.9c0.4-0.8,0.7-1.5,1.1-2.2c0.5-0.8,0.9-1.6,1.4-2.4l0.7-2.7
              c0,0,2.8,0,3.6-0.4c0.7-0.4,1.8-1.3,1.8-1.3l13.6-14.5l1.9-14.7c0,0,4-0.3,5.7-6.9l5.4,2.9H96l2,2l0,0l2.6,5.4l-3.6,1.8l-2.1,3.2
              l3.2,2.5l-3.2,2.8l5.3,5.4l1.8-2.9l6.4,1.1l0.7-5l5.3,1.4l0.4,2.5l2.1,1.1L114.6,422.6z"
            onClick={setstyleclicked}
            id={state[24].id}
          />
        </HtmlTooltip>
        <HtmlTooltip
          title={
            <div>
              <p>Beirut</p>
              <p>
                Total : <CountUp end={2250} duration={0.3} />
              </p>
            </div>
          }
          placement="top"
        >
          <polygon
            className={state[25].className}
            points="128.3,302.1 127.1,308.7 125.6,309.6 124.6,310.2 120.3,315 119.3,313 114,312.5 113.7,312.3 
              113.7,309 110.9,305.9 110.7,303.4 111.7,302.2 118.5,301.6 120.5,300.1 121.6,301.6 123.3,302.9 125.1,301.6 "
            onClick={setstyleclicked}
            id={state[25].id}
          />
        </HtmlTooltip>
      </svg>

      <FormGroup className="checkboxes" >
        <FormControlLabel
          control={
            <Checkbox
              style={{ padding: "0px" }}
              color="secondary"
              id="Akkar"
              checked={akkarchecked}
              onChange={handleChange}
            />
          }
          label="Akkar"
          className="checkbox"
        />
        <FormControlLabel
          control={
            <Checkbox
              style={{ padding: "0px" }}
              color="success"
              id="Baalbek"
              checked={baalbekchecked}
              onChange={handleChange}
            />
          }
          label="Baalbek"
          className="checkbox"
        />
        <FormControlLabel
          control={
            <Checkbox
              style={{ padding: "0px" }}
              color="warning"
              id="Beqaa"
              checked={beqaachecked}
              onChange={handleChange}
            />
          }
          label="Beqaa"
          className="checkbox"
        />
        <FormControlLabel
          control={
            <Checkbox
              style={{ padding: "0px" }}
              checked={mountchecked}
              onChange={handleChange}
              id="Mount Lebanon"
            />
          }
          label="Mount Lebanon"
          className="checkbox"
        />
        <FormControlLabel
          control={
            <Checkbox
              style={{ padding: "0px" }}
              id="Beirut"
              checked={beirutchecked}
              onChange={handleChange}
              color="secondary"
            />
          }
          label="Beirut"
          className="checkbox"
        />
        <FormControlLabel
          control={
            <Checkbox
              style={{ padding: "0px" }}
              color="secondary"
              id="Keserwan-Jbeil"
              checked={keserwanchecked}
              onChange={handleChange}
            />
          }
          label="Keserwan-Jbeil"
          className="checkbox"
        />
        <FormControlLabel
          control={
            <Checkbox
              style={{ padding: "0px" }}
              color="success"
              id="Nabatieh"
              checked={nabatiehchecked}
              onChange={handleChange}
            />
          }
          label="Nabatieh"
          className="checkbox"
        />
        <FormControlLabel
          control={
            <Checkbox
              style={{ padding: "0px"}}
              color="warning"
              id="North Lebanon"
              checked={northchecked}
              onChange={handleChange}
            />
          }
          label="North Lebanon"
          className="checkbox"
        />
        <FormControlLabel
          control={
            <Checkbox
              style={{ padding: "0px" }}
              id="South Lebanon"
              checked={southchecked}
              onChange={handleChange}
            />
          }
          label="South Lebanon"
          className="checkbox"
        />
      </FormGroup>
      
      <Box sx={{ "& > :not(style)": { m: 1 } }} className="buttonbox">
        <Fab variant="extended" onClick={handleClickOpen} className="preview">
          <NavigationIcon sx={{ mr: 1 }} />
          Preview
        </Fab>
      </Box>

    </Card>
  )
}

export default Home
