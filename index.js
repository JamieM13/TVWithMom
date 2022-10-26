let express = require('express');
let app = express();

app.use(express.json());

let Datastore = require('nedb');
let db = new Datastore('tv.db');
db.loadDatabase();

let tvTracker = [];

// app.get('/', (req,res) => {
//     res.send('this is the main page');
// })

//add a route that is listening for a post request

app.post('/tvInfo', (req, res) => {
    console.log(req.body);
    let obj = {
        title: req.body,
    }
    //insert tv data into database
    db.insert(obj, (err, newDocs) => {
        console.log("new document inserted");
        if (err) {
            res.json({ task: "failed" });
        } else {
            res.json({ task: "success" });

        }

    })

})

//add route to get tv show info
app.get('/getTvInfo', (req, res) => {
    
    db.find({}, (err, docs)=>{
        if(err){
            res.json({task: "task failed"})
        } else{
            let obj = { data: docs };
            res.json(obj);
        }
        console.log(docs);
    })
    
})

app.use('/', express.static('public'));

let port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log('listening at', port);
})