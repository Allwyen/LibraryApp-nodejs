const Express = require('express');
const bodyParser = require('body-parser');
const Mongoose = require('mongoose');
const request = require('request');

var app = new Express();

app.use(Express.static(__dirname+"/public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200' );

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

Mongoose.connect("mongodb+srv://mongodb:mongodb@mycluster-ucvz5.mongodb.net/LMS?retryWrites=true&w=majority");
//Mongoose.connect("mongodb://localhost:27017/LMS");

const BookModel = Mongoose.model("book",{
    title:String,
    picture:String,
    author:String,
    publisher:String,
    DoP:String,
    distributer:String,
    price:String,
    desc:String
});

const AuthorModel = Mongoose.model("author",{
    name:String,
    picture:String,
    DoB:String,
    Place:String,
    Books:String
});

book=[{
    'title':'Buried thoughts',
    'picture':'/images/buried.jpg',
    'author':'Joseph Annamkutty Jose',
    'publisher':'DC Books',
    'DoP':'02-08-2016',
    'distributer':'DC',
    'price':230,
    'desc':'A first thought from Joseph'
},{
    'title':'Deivathinde Charanmar',
    'picture':'/images/deivatinde.jpg',
    'author':'Joseph Annamkutty Jose',
    'publisher':'DC Books',
    'DoP':'26-05-2019',
    'distributer':'DC',
    'price':190,
    'desc':'A second thought from Joseph'
},{
    'title':'Wings Of Fire',
    'picture':'/images/wingsfire.jpg',
    'author':'APJ Abdul Kalam',
    'publisher':'DC Books',
    'DoP':'26-05-2010',
    'distributer':'DC',
    'price':150,
    'desc':'Initial days of my life by APJ'
},{
    'title':'The Subtle Art Of Not Giving a F**k',
    'picture':'/images/thesubtleart.jpg',
    'author':'Mark Manson',
    'publisher':'DC Books',
    'DoP':'13-02-2011',
    'distributer':'DC',
    'price':320,
    'desc':'Balancing life'
},{
    'title':'Rich Dad Poor Dad',
    'picture':'/images/richdad.jpg',
    'author':'Rober TK',
    'publisher':'DC Books',
    'DoP':'26-05-2019',
    'distributer':'DC',
    'price':290,
    'desc':'A financial knowledge'
}];

author=[{
    'name':'Joseph Annamkutty Jose',
    'picture':'/images/joseph.jpg',
    'DoB':'18 July 1988',
    'Place':'Kerala, India',
    'Books': ['Buried thoughts','Deivathinde Charanmar']
},{
    'name':'JK Rowling',
    'picture':'/images/rowling.jpg',
    'DoB':'31 July 1965',
    'Place':'Scotland',
    'Books': ['Harry Potter','the casual vacany','fantastic beasts']
},{
    'name':'APJ Abdul Kalam',
    'picture':'/images/kalam.jpg',
    'DoB':'15 October 1931',
    'Place':'Rameswaram, India',
    'Books': ['Ignited Minds','India 2020','The turning Point']
},{
    'name':'Robert T K',
    'picture':'/images/robert.jpeg',
    'DoB':'8 April 1947',
    'Place':'United States',
    'Books': ['Cashflow Quadrant','The Business School']
},{
    'name':'Mark Manson',
    'picture':'/images/manson.jpg',
    'DoB':'9 March 1984',
    'Place':'United States',
    'Books': ['The subtle art of Not Giving F**k','Everything is f**ked']
}];

app.post('/insertbook',(req,res)=>{
    var book = new BookModel(req.body);
    var result = book.save((error,data)=>{
        if(error)
        {
            throw error;
            res.send(error);
        }
        else
        {
            res.send(data);
        }
    });
});

app.get('/viewbook',(req,res)=>{
    var result = BookModel.find((error,data)=>{
        if(error)
        {
            throw error;
            res.send(error);
        }
        else
        {
            res.send(data);
        }
    });
});

app.post('/insertauthor',(req,res)=>{
    var result = AuthorModel.save((error,data)=>{
        if(error)
        {
            throw error;
            res.send(error);
        }
        else
        {
            res.send(data);
        }
    });
});

app.get('/viewauthor',(req,res)=>{
    var result = AuthorModel.find((error,data)=>{
        if(error)
        {
            throw error;
            res.send(error);
        }
        else
        {
            res.send(data);
        }
    });
});

app.listen(process.env.PORT || 4455,()=>{
    console.log("Server running on PORT:4455...");
});