const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors');
require('dotenv').config();

const app = express()
app.use(cors());

app.use(express.json());

// mongoose.connect("mongodb://localhost:27017/RDO")
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Failed to connect to MongoDB:', err));

app.get('/', (req, res) => {
    res.send("Get request");
});



app.get('/', (req, res)=>{
    res.send("Get request")
})


const userSchema = new mongoose.Schema({
    name : String,
    remark : String,
    city : String,
    state : String,
    frequency : String,
    imgUrl : String,
    description : String
})

const modell = mongoose.model("Channel", userSchema)


app.get('/fetchChannels', async(req, res)=>{
    const channelsAvailable = await modell.find();
    res.json(channelsAvailable);
})


app.post('/create', async(req, res)=>{

    const reqData = req.body;

    const {name, remark , city, state, frequency, imgUrl, description} = req.body

    // const name  = reqData.name;
    // const city  = reqData.city;
    // const state  = reqData.state;
    // const frequency  = reqData.frequency;
    // const imgUrl  = reqData.imgUrl;
    // const description = reqData.description;

    // const newChannel = new modell({
    //     name : name,
    //     city : city,
    //     state : state,
    //     frequency : frequency,
    //     imgUrl : imgUrl,
    //     description : description,
        
    // })

    const newChannel = new modell({name , remark, city, state, frequency, imgUrl, description})

    await newChannel.save() ;

    res.json(newChannel);



})


app.post('/delete', async (req, res)=>{
    const {id} = req.body;

    await modell.findByIdAndDelete(id) ;

    res.json({deleted : id})

})

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// app.listen(3006, ()=>{
//     console.log("listening at port : 3006")
// })