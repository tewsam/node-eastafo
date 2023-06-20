const express= require('express')
const app= express()
const mongoose= require("mongoose")
const bodyParser= require("body-parser")
const driverModel = require("./models/driver")
const companyModel= require("./models/company")

app.use(express.static('public'))
app.use('/css', express.static(__dirname + 'public/css'))
app.use('/js', express.static(__dirname + 'public/js'))
app.use('/img', express.static(__dirname + 'public/img'))

app.set('views', './views')
app.set('view engine', 'ejs')

app.use(express.json())
app.use(bodyParser.urlencoded({extended: true}))



app.get('/login', (req,res)=> {
	res.render('login', {ager: 'Eritrea'})
	// res.sendFile(__dirname + '/views/index.html')
})


app.get('/', (req,res)=> {
	res.render('index')
	// res.sendFile(__dirname + '/views/index.html')
});

app.get('/drivers', async(req,res)=>{

	try{

		// const drivers= await Afromodel.find();
		// // res.status(200).json(drivers[0]['name'])
		// res.render('about', {dd:drivers})

		driverModel.find().sort({createdAt: -1}).then((x)=>{
			res.render('drivers', {x})
		})


	}catch(error){
		res.status(500).json({message: error.message})
	}
});

app.get('/load', async(req,res)=>{

	try{

		// const drivers= await Afromodel.find();
		// // res.status(200).json(drivers[0]['name'])
		// res.render('about', {dd:drivers})

		companyModel.find().sort({createdAt: -1}).then((x)=>{
			res.render('load', {x})
		})


	}catch(error){
		res.status(500).json({message: error.message})
	}
})


app.get('/about', (req,res)=> {
	res.render('about')
	// res.sendFile(__dirname + '/views/index.html')
});




app.post('/driver', async(req, res) => {
    var userData = {
        name: req.body.name,
        father: req.body.father,
        country: req.body.country,
        city: req.body.city,
        license: req.body.license,
        car: req.body.car,
        email: req.body.email,
        tel: req.body.tel,
        password: req.body.password


    }

    try {
        const afrodriver = await driverModel.create(req.body)
        res.status(200).json(userData);
        
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message: error.message})
    }
});

//post load
app.post('/load', async(req, res) => {
    var userData = {
        name: req.body.name,
        father: req.body.father,
        country: req.body.country,
        city: req.body.city,
        loadtype: req.body.loadtype,
        companyname: req.body.companyname,
        email: req.body.email,
        tel: req.body.tel,
        password: req.body.password


    }

    try {
        const loadbody = await companyModel.create(req.body)
        res.status(200).json(userData);
        
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message: error.message})
    }
});

// update a product
app.get('/update/:id', async(req, res) => {
    try {
        const {id} = req.params;
        const upafro = await driverModel.findByIdAndUpdate(id, req.body);
        // we cannot find any product in database
        if(!upafro){
            return res.status(404).json({message: `cannot find any product with ID ${id}`})
        }
        const updatedDriver = await driverModel.findById(id);
        res.status(200).json(updatedDriver);
        
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})


app.get('/delete/:id', async(req, res) =>{
    try {
        const {id} = req.params;
        const drivedel = await driverModel.findByIdAndDelete(id);
        if(!drivedel){
            return res.status(404).json({message: `cannot find any product with ID ${id}`})
        }
        res.status(200).json(drivedel);
        
        
    } catch (error) {
        res.status(500).json({message: error.message})
    }
});


mongoose.set("strictQuery", false)


mongoose.connect(
    "mongodb+srv://samsonyotes:Samitewtew@mongo-crud-sam.9slzppc.mongodb.net/tew-api?retryWrites=true&w=majority")
    .then(()=>{
        console.log("connected to mongoDB");
    }).catch((error)=>{
        console.log(error);
    });

const port=3001
app.listen(port, ()=>console.info(`Listening on port ${port}`))
