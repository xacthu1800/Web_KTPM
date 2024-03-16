const express = require('express')
const path = require('path')
const bcrypt = require('bcrypt')
const {dataUser, dataProduct} = require('./config')

const app = express()
// conver data into JSON format
app.use(express.json())

app.use(express.urlencoded({extended: false}))

//use ejs as the view enginne 
app.set('view engine', 'ejs');
// static file
app.use(express.static('public'))

app.get("/", (req,res)=>{
    res.render("login")
})

app.get("/signup",(req,res)=>{
    res.render("signup")
})

app.post("/signup",async (req,res)=>{
    const data ={
        name :  req.body.username,
        password: req.body.password
    }

    //check if the user aldready exist in the database
    const existingUser = await dataUser.findOne({name: data.name})
    if(existingUser != null){
        res.send('user has aldredy in database')
    }else{
        // hash the password using bcrypt
        const saltRounds = 10
        const hashedPassword = await bcrypt.hash(data.password, saltRounds)

        data.password = hashedPassword
        const userdata = await dataUser.insertMany(data)
        console.log(userdata)
        res.render('login', {message: 'Login successfully'}); 
    }

})

//Login user
app.post("/login",async (req,res)=>{
    try{
        const check = await dataUser.findOne({name:req.body.username})
        if(!check){
            res.send("user name cannot found")
        }

        const isPasswordMatch = await bcrypt.compare(req.body.password, check.password)
        if(isPasswordMatch){
            res.render("index")
        }else{
            req.send("wrong password")
        }
    }catch{
        res.send("wrong detail")
    }
})

const port = 5000
app.listen(port,()=>{
    console.log(`server running on port : ${port}`)
})
