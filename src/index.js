const express = require('express')
const path = require('path')
const bcrypt = require('bcrypt')
const session = require('express-session');
const {dataUser, dataProduct} = require('./config')
const PORT = process.env.PORT || 3000;

const app = express()
// conver data into JSON format
app.use(express.json())

app.use(express.urlencoded({extended: false}))

//kiểm tra trạng thái người dungf (đã login chưa)

//use ejs as the view enginne 
app.set('view engine', 'ejs');
// static file
app.use(express.static('public'))

app.use(session({
    secret: 'secret', // Chuỗi bí mật để mã hóa session
    resave: false,
    saveUninitialized: false
  }));

app.get('/checkSession', (req, res) => {
    if (req.session.username) {
        res.send({ loggedIn: true, user: req.session.username });
    } else {
        res.send({ loggedIn: false });
    }
});

app.get("/", async (req, res) => {
    const product = await dataProduct.find();
    res.render("index", { pros: product, userN: req.session.username, login: "login", logout: "logout" });
});

app.get("/signup",(req,res)=>{
    res.render("signup")
})

app.get("/login",(req,res)=>{
    res.render("login")
})

app.get("/logout", async (req, res) => {
    req.session.username = null;
    res.redirect("/index");
});

// user signup
app.post("/signup",async (req,res)=>{
    const data ={
        name :  req.body.username,
        password: req.body.password
    }

    //check if the user aldready exist in the database

    const existingUser = await dataUser.findOne({name: data.name})
    if(existingUser != null){
        res.render('signup',{ error: "User has aldready been taken" });
        return;

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
             res.render('login',{ error: "User not found, please try again" });
             return;
        }
        const isPasswordMatch = await bcrypt.compare(req.body.password, check.password)
        //đăng nhập thành công. 
        if(isPasswordMatch){
            req.session.username = req.body.username; 
            const product = await dataProduct.find()
            res.render("index" ,{ pros: product, userN: req.session.username} )
        }else{
            req.send("wrong password")
        }
    }catch(err){
        res.send("wrong detail")
        console.log(err);
    }
})

app.get("/productpage", (req,res)=>{
    res.render('productpage')
    return
})

app.get("/index",async(req,res)=>{
    try{
        const product = await dataProduct.find()
        res.render("index" ,{ pros: product, userN: req.session.username})
    }catch(err){
        res.send(err)
    }
    return
})


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
