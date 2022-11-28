const { default: mongoose } = require('mongoose');

const express = require('express');
const authRoutes = require('./router/authRouter');
const cookiePraser = require('cookie-parser');
const { requireAuth, checkUser } = require('./middleware/authMiddleware');

const app = express();

//middleware 
app.use(express.static('public'));

app.use(express.json());
app.use(cookiePraser());

//view engine
app.set('view engine','ejs');

// database connection
const dbURI = "mongodb://localhost:27017/node-auth";

mongoose.connect(dbURI,{
    useNewUrlParser:true,useUnifiedTopology:true 
}).then((result) => app.listen(3000))
    .catch((err) => console.log(err));

app.get('*',checkUser   );    
app.get('/',(req,res)=>
    res.render('home')
);
app.get('/smoothies' ,requireAuth, (req,res) =>{
    res.render('smoothies');
});
app.use(authRoutes);

app.get('/set-cookies',(req,res)=>{

    res.cookie('newUser',false);
    res.cookie('isEmployee',true,{maxAge: 1000 * 60 * 60 * 24 , httpOnly:true});
    res.send('you got the cookie');
});

app.get('/read-cookies', (req,res)=>{
    const cookies = req.cookies;
    console.log(cookies.newUser);
    res.json(cookies);
});

module.exports = app;