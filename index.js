const express = require('express')
const path = require('path')
const bcrypt = require('bcrypt')
const collection = require('./src/config')

const app = express()
// conver data into JSON format
app.use(express.json())

app.use(express.urlencoded({extended: false}))

//use ejs as the view enginne 
app.set('view engine', 'ejs');
// static file
app.use(express.static("public"))



app.get("/", (req,res)=>{
    res.redirect('/Web_KTPM/');
})

app.get("/signup",(req,res)=>{
    res.redirect('/Web_KTPM/signup');
})

app.post("/signup",async (req,res)=>{
    const data ={
        name :  req.body.username,
        password: req.body.password
    }

    //check if the user aldready exist in the database
    const existingUser = await collection.findOne({name: data.name})
    if(existingUser != null){
        res.send('user has aldredy in database')
    }else{
        // hash the password using bcrypt
        const saltRounds = 10
        const hashedPassword = await bcrypt.hash(data.password, saltRounds)

        data.password = hashedPassword
        const userdata = await collection.insertMany(data)
        console.log(userdata)
    }

})

//Login user
app.post("/login",async (req,res)=>{
    try{
        const check = await collection.findOne({name:req.body.username})
        if(!check){
            res.send("user name cannot found")
        }

        const isPasswordMatch = await bcrypt.compare(req.body.password, check.password)
        if(isPasswordMatch){
            res.sendFile(path.join(__dirname, './views/index.html'));
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
