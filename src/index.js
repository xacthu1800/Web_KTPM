const express = require('express')
const path = require('path')
const bcrypt = require('bcrypt')
const session = require('express-session');
const {dataUser, dataProduct} = require('./config');
const { log } = require('console');
const PORT = process.env.PORT || 9000;

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
    secret: 'secret_key',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  }));

app.use(calculateTotalQuantity);

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

app.post('/add-to-cart',calculateTotalQuantity, (req, res) => {
    const { productID } = req.body;
    // Kiểm tra xem người dùng đã đăng nhập chưa
    if (!req.session.username) {
      res.status(401).send('Bạn cần đăng nhập trước khi thêm sản phẩm vào giỏ hàng.');
      return;
    }
    // Thêm sản phẩm vào giỏ hàng trong session
    if (!req.session.cart) {
      req.session.cart = {};
    }
    req.session.cart[productID] = (req.session.cart[productID] || 0 ) + 1 ;
    console.log(req.session.cart);
    console.log("bin");
    console.log(res.locals.carts);
    res.redirect('/index');
  });

app.get('/checkSession', (req, res) => {
    if (req.session.username) {
        res.send({ loggedIn: true, user: req.session.username });
    } else {
        res.send({ loggedIn: false });
    }
});

app.get("/", async (req, res) => {
    /* const product = await await dataProduct.find()
    res.render('danhmuc',{ pros: product, userN: req.session.username, login: "login", logout: "logout" } ) */

    const product = await await dataProduct.find().sort({ _id: -1 }).limit(12);
    res.render("index", { pros: product, userN: req.session.username, login: "login", logout: "logout" });
});

app.get("/index", calculateTotalQuantity, async(req,res)=>{
    try{
        const product = await dataProduct.find().sort({ _id: -1 }).limit(12);
        res.render("index" ,{ pros: product,
             userN: req.session.username, 
             login: "login",
             logout: "logout",
             carts: res.locals.carts })
    }catch(err){
        res.send(err)
    }
    return
})

app.get("/signup",(req,res)=>{
    res.render("signup")
})

app.get("/login",(req,res)=>{
    res.render("login")
})

app.get("/logout", async (req, res) => {
    req.session.destroy();
    res.redirect("/index");
});

app.get("/productpage", (req,res)=>{
    res.render('productpage',{
        userN: req.session.username, 
        login: "login",
        logout: "logout",
        carts: res.locals.carts })
    return
})


app.get("/danhmuc",async(req,res)=>{
    const product = await dataProduct.find()
    res.render('danhmuc',{ pros: product,
        userN: req.session.username, 
        login: "login",
        logout: "logout",
        carts: res.locals.carts }) 
})

/* app.get('/cart', (req, res) => {
    // Kiểm tra xem người dùng đã đăng nhập chưa
    if (!req.session.username) {
      res.status(401).send('Bạn cần đăng nhập để xem giỏ hàng.');
      return;
    }
    // Lấy thông tin giỏ hàng từ session
  const cart = req.session.cart || {};
  // In thông tin giỏ hàng ra console
  console.log('Giỏ hàng của người dùng', req.session.username, ':', cart);
  // Gửi thông tin giỏ hàng cho client
  res.json({ cart });
  }); */

app.get("/checkout",calculateTotalQuantity, (req, res)=>{
    res.render('checkout',{ 
        userN: req.session.username, 
        login: "login",
        logout: "logout",
        carts: res.locals.carts })
})

app.listen(PORT, () => {
    console.log(`Server is running on localhost:${PORT}`);
});















function calculateTotalQuantity(req, res, next) {
    let totalQuantity = 0;
    if (req.session.cart) {
        for (let productId in req.session.cart) {
            totalQuantity += req.session.cart[productId];
        }
    }
    res.locals.carts = totalQuantity;
    next();
}
