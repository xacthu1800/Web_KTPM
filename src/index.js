const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
const bcrypt = require('bcrypt')
const session = require('express-session');
const {dataUser, dataProduct, delivery, record} = require('./config');
const { log } = require('console');
const PORT = process.env.PORT || 9000;
const { ObjectId } = require('mongodb');




let globalSearchResult = [];

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
            const product = await dataProduct.find().sort({ _id: -1 }).limit(12);
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
    const { productName } = req.body;
    // Kiểm tra xem người dùng đã đăng nhập chưa
    if (!req.session.username) {
      res.status(401).send('Bạn cần đăng nhập trước khi thêm sản phẩm vào giỏ hàng.');
      return;
    }
    // Thêm sản phẩm vào giỏ hàng trong session
    if (!req.session.cart) {
      req.session.cart = {};
    }
    if (req.session.cart[productName]) {
        // Nếu đã tồn tại, tăng số lượng lên 1
        req.session.cart[productName]++;
    } else {
        // Nếu chưa tồn tại, đặt số lượng là 1
        req.session.cart[productName] = 1;
    }
    res.redirect('/index');
  });

app.post('/record',calculateTotalQuantity, async(req, res) => {
    const  data  = req.body.data
    const product = convertCartToString(req.session.cart)

    const mdh = generateOrderCode(req.session.totalPrice)
    data.tongTien = req.session.totalPrice
    data.maDonHang = mdh
    data.product = product

    const deli = {}
    deli.maDonHang = mdh
    deli.ngayDat = getCurrentDate()
    deli.phuongThucThanhToan = data.phuongThucThanhToan
    deli.tongTien = req.session.totalPrice
    deli.userID = req.session.username
    req.session.cart = {};
      try {
        // Chèn nhiều đối tượng từ mảng data vào collection dataUser
        const result1 = await record.insertMany(data);
        const result2 = await delivery.insertMany(deli);

        console.log('Data inserted successfully:');
        res.status(200).send('Data inserted successfully');
    } catch (error) {
        console.error('Error occurred while inserting data:', error);
        res.status(500).send('Internal Server Error');
    }  


});

app.post('/updateCount',calculateTotalQuantity, async(req, res) => {
    const { value, bookPrice } =  req.body;
     // Kiểm tra xem người dùng đã đăng nhập chưa
    if (!req.session.username) {
        res.status(401).send('Bạn cần đăng nhập để xem giỏ hàng.');
        return;
      }
      if(req.session.cart){
          const cartItems = req.session.cart;
          const bookIds = Object.keys(cartItems);

          const listCart = await dataProduct.find({ name: {$in: bookIds} });
          // tổng tiền trong cart.ejs
          var totalPrice = 0 
          listCart.forEach(cart => {
              totalPrice = totalPrice + cart.sach[0].gia
          });
      
        totalPrice = totalPrice - bookPrice + (bookPrice*value)
    
        res.render('cart', { 
            userN: req.session.username, 
            login: "login",
            logout: "logout",
            carts: res.locals.carts,
            listCart,
            totalPrice})
    
      }else{
        return res.status(400).send('error');
      }
      
      // Truy vấn dữ liệu sản phẩm dựa trên tên trong session cart
});  

app.post('/addBut',calculateTotalQuantity, async(req, res) => {
    let { data } =  req.body;
    data = data.toString()
    
    if (!req.session.cart) {
        req.session.cart = {};
      }
      if (req.session.cart[data]) {
          // Nếu đã tồn tại, tăng số lượng lên 1
          req.session.cart[data]++;
      } else {
          // Nếu chưa tồn tại, đặt số lượng là 1
          req.session.cart[data] = 1;
      }

    res.redirect('/cart');
   
}); 

app.post('/delBut', calculateTotalQuantity, async(req, res) => {
    let { data } =  req.body;
    data = data.toString();
    
    if (!req.session.cart) {
        req.session.cart = {};
    }

    if (req.session.cart[data]) {
        // Giảm số lượng chỉ khi số lượng hiện tại lớn hơn 0
        if (req.session.cart[data] > 0) {
            req.session.cart[data]--;
        }
    } else {
        // Nếu chưa tồn tại, đặt số lượng là 0
        req.session.cart[data] = 0;
    }

    res.redirect('/cart');
});

app.get('/checkSession', (req, res) => {
    if (req.session.username) {
        res.send({ loggedIn: true, user: req.session.username });
    } else {
        res.send({ loggedIn: false });
    }
});

app.get("/", async (req, res) => {
        const product = await dataProduct.find().sort({ _id: -1 }).limit(12);
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

app.post("/reset", async (req, res) => {
    y = []; 
    num = []; 
    res.redirect('/danhmuc');
});


let y = [];
let num = [];
app.post("/danhmuc", async (req, res) => {
    const { filterem, pricefil} = req.body;
    // console.log(pricefil);
    // console.log(typeof(0));
    //const { pricefil} = req.body;
    // Xử lý tìm kiếm dựa trên filterem

    if (filterem.length > 0){
        if (parseInt(pricefil) > 0) {
        let prices = parseInt(pricefil) + 50000;
        const product2 = await dataProduct.find({ "Tags.tag": { $all: String(filterem) }, "sach.0.gia": { $gt: pricefil, $lt: prices } });
        y = product2;
        }
        else if (parseInt(pricefil) === 0) {
            const product2 = await dataProduct.find({ "Tags.tag": { $all: String(filterem) } });
            y = product2;
        } 
    }
    else if (filterem.length === 0) {
        if (parseInt(pricefil) > 0) {
        let prices = parseInt(pricefil) + 50000;
        const numb = await dataProduct.find({ "sach.0.gia": { $gt: pricefil, $lt: prices } });
        y = numb;
        }
    }
    
    res.redirect('/danhmuc');

});

app.get("/danhmuc", async (req, res) => {
    const filterResult = y;
    //const priceResult = num;

    let productToShow;      
    if (filterResult.length > 0) {
        productToShow = filterResult;
    } else {
        productToShow = await dataProduct.find();
    }

    res.render('danhmuc', {
        pros: productToShow,
        userN: req.session.username,
        login: "login",
        logout: "logout",
        carts: res.locals.carts,
        bookFound: globalSearchResult,
    });
});

let books = [];
let bookfind = [];
app.post("/ori", async(req, res)=>{
    const { bookName, auth } = req.body;
    const bookDetails = await dataProduct.find({ "name": { $all: String(bookName) } });
    const bookF = await dataProduct.find({"author": { $all: String(auth) }})
    books = bookDetails;
    bookfind = bookF;
    //console.log(bookF);
    //console.log(bookDetails);
    res.redirect('/ori');
})

app.get("/ori", async(req, res)=>{
    //console.log('book:\n',books);
    let x =  books;
    let y = bookfind;
    //console.log(y);
    const searchResult = globalSearchResult;
    res.render('ori', { book: x,
        userN: req.session.username, 
        login: "login",
        logout: "logout",
        carts: res.locals.carts,
        bookFound:  searchResult,
        bookfinds: y,
    })
})

app.get('/search', async (req, res) => {
    try {
        const searchText = req.query.query;
        // Sử dụng biểu thức chính quy để tìm kiếm không phân biệt chữ in hoa/thường
        const regex = new RegExp(searchText, 'i');
        const result = await dataProduct.find({ name: { $regex: regex } });

        // Chuyển đổi kết quả thành mảng các tên sách
        const resultNames = result.map(item => item.name);

        // Lưu kết quả tìm kiếm vào biến toàn cục
        globalSearchResult = resultNames;

        // Redirect đến trang /danhmuc
        res.redirect('/danhmuc');

        /* res.redirect('/danhmuc?rand=' + Math.random())  */
         } catch (error) {
                console.error(error);
                res.status(500).json({ message: 'Internal server error' });
    }
});

app.get('/cart', async (req, res) => {
    
    // Kiểm tra xem người dùng đã đăng nhập chưa
    if (!req.session.username) {
      res.status(401).send('Bạn cần đăng nhập để xem giỏ hàng.');
      return;
    }
    if(req.session.cart){
        const cartItems = req.session.cart;
        const bookIds = Object.keys(cartItems);

    
    // Truy vấn dữ liệu sản phẩm dựa trên tên trong session cart
    const listCart = await dataProduct.find({ name: {$in: bookIds} });
    // tổng tiền trong cart.ejs
    var totalPrice = 0 
    var quantity =  req.session.cart
    console.log(req.session.cart);
    listCart.forEach(cart => {
        totalPrice = totalPrice + req.session.cart[cart.name]*cart.sach[0].gia       
    });
    req.session.totalPrice = totalPrice
    console.log(req.session.totalPrice);
    res.render('cart', { 
        userN: req.session.username, 
        login: "login",
        logout: "logout",
        carts: res.locals.carts,
        listCart,
        totalPrice,
        quantity})
    }else{
        res.redirect('/index')
    }
    // kết thúc route này, quan trọng là có thể lưu được req.session.totalPrice và req.session.cart để phục vụ sử dụng trong checkout

  }); 

app.get("/checkout",calculateTotalQuantity, (req, res)=>{
    const mdh = generateOrderCode(req.session.totalPrice)
    const priceAfterShip = parseInt(req.session.totalPrice) + 20000

    const rightObject = {}
    rightObject.mdh = mdh
    rightObject.priceAfterShip = priceAfterShip
    rightObject.totalPrice = req.session.totalPrice

    res.render('checkout',{ 
        userN: req.session.username, 
        login: "login",
        logout: "logout",
        carts: res.locals.carts,
        rightData:rightObject
         })
})

app.get("/delivery",calculateTotalQuantity, async(req, res)=>{

    const deli = await delivery.find({ userID: req.session.username });
    res.render('delivery',{ 
        userN: req.session.username, 
        login: "login",
        logout: "logout",
        carts: res.locals.carts,
        history: deli })
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

// Tạo mã đơn hàng từ thời gian hiện tại và tổng tiền
function generateOrderCode(tongTien) {
    const now = new Date();
    const day = now.getDate().toString().padStart(2, '0');
    const month = (now.getMonth() + 1).toString().padStart(2, '0');
    const year = now.getFullYear().toString();
    const hour = now.getHours().toString().padStart(2, '0');
    const minute = now.getMinutes().toString().padStart(2, '0');
    const second = now.getSeconds().toString().padStart(2, '0');

    // Tạo mã đơn hàng
    const orderCode = `${day}${month}${year}${hour}${minute}${second}`;
    return orderCode;
}

function convertCartToString(cart) {
    let cartString = '';
    for (const [product, quantity] of Object.entries(cart)) {
        cartString += `${product} - ${quantity}; `;
    }
    // Xóa dấu cách ở cuối chuỗi
    cartString = cartString.trim();
    return cartString;
}

function getCurrentDate() {
    const now = new Date();
    const day = now.getDate().toString().padStart(2, '0'); // Lấy ngày và đảm bảo định dạng là 2 chữ số, thêm '0' nếu cần
    const month = (now.getMonth() + 1).toString().padStart(2, '0'); // Lấy tháng và đảm bảo định dạng là 2 chữ số, thêm '0' nếu cần
    const year = now.getFullYear(); // Lấy năm

    // Kết hợp ngày, tháng và năm thành chuỗi định dạng "DD-MM-YYYY"
    const currentDate = `${day}-${month}-${year}`;

    return currentDate;
}



