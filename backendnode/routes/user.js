
const express = require("express");
const app = express();
const  Users = require("../models/User");
app.use(express.json())
const cors = require("cors");
app.use(cors());
const bcrypt = require('bcrypt')
const saltRounds = 10
const { sign } = require('jsonwebtoken')
//const dotenv=require("dotenv")


const router = express.Router()
const mysql = require('mysql');
const db = mysql.createConnection({
    host: '127.0.0.1',
    user: "root",
    database: 'hadi'
});
app.use(
    express.urlencoded({
        extended: true
    })
)
var multer = require('multer')
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
    cb(null, './public/images')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' +file.originalname )
  }
})
var upload = multer({ storage: storage }).single('file')


router.post("/insertuser", async (req, res) => {

    //const {username, email, password } = req.body
    //console.log(username)
    //console.log(req.body.data.username)
    
    upload(req, res, function (err) {
        if (err instanceof multer.MulterError) {
            return res.status(500).json(err)
        } else if (err) {
            return res.status(500).json(err)
        }
        bcrypt.hash(req.body.password, saltRounds).then((hash) => {
            Users.create({
                username: req.body.username,
                email: req.body.email,
                password: hash,
                picname : req.file.filename
            })
        })

   return res.status(200).send(req.file)

 })
    /*
    const uniquepicid = Date.now();
    const picname=username.concat(uniquepicid)
    
    bcrypt.hash(password, saltRounds).then((hash) => {
        Users.create({
            username: username,
            email: email,
            password: hash,
            picname : picname
        })
        res.json("Success");
    })
    */
})
router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    const user = await Users.findOne({ where: { email: email } });
    if (!user) {
        res.json({ error: "User Doesnt Exxist" });
    }
    else {
        bcrypt.compare(password, user.password).then((match) => {
            if (!match) {
                res.json({ error: "Wrong Username and Password Combination" });
            }
            else {
                const accessToken=sign({username: user.username, id: user.id, isAdmin: user.isAdmin}, "importantsecret",{
                    expiresIn:300,
                });
                res.json({token:accessToken,user:user});
            }
        })
    }
})

const verifyJWT = (req,res,next) => {
    const token=req.headers["x-access-token"]
    if(!token) {
        res.send("token doesnt exist")
    } else {
        jwt.verify(token, "importantsecret",(err, decoded) =>{
            if(err){
                res.json({auth:false, message: "u failed to authenticate"})
            } else {
                req.userid = decoded.id
                next()
            }
        })
    }
}






/*router.get("/register/:username/:password",(req,res)=>{
    const password=req.params.password
    bcrypt.hash(password,saltRounds,(err,hash)=>{
        if(err) console.log(err)
        db.query("INSERT INTO users (username, password) VALUES (?,?);",[req.params.username,hash],(err,results)=>{
            if(err) {console.log(err);}
            res.send(results);
        });
      


    })
    
   

})


router.post("/login", (req, res) => {

    const username = req.body.username;
    const password = req.body.password;
    
    db.query("SELECT * FROM users WHERE username=?", username, (err, result) => {
        console.log(result[0])
        if (err) { console.log(err); }
        if (result.length>0) {
            bcrypt.compare(password, result[0].password, (error, response) => {

                if (response) {
                    console.log(password)
                    res.send({result})
                }
                else {
                    res.send({message:"Wrong username/password combination"})

                }

            });

        } else {
            res.send({message:"User doesnt exist"})
        }

    })
        

})
*/

module.exports = router;
