const express = require('express');
const cors = require('cors');
var app = express();
app.use(cors());
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
const port = process.env.PORT || 3000;
const web3Module = require('./myweb3client.js');
const to = require('await-to-js').default;


//--------------------------------REST API-----------------------------------------------------//

app.get('/', (req, res) => res.send('test api'))

app.get('/find/:memberID',async (req,res)=>{
    var memberID = req.params['memberID'];
    let err, result;
    [err, result] = await to(web3Module.findMember(memberID))
    if(err) res.send({"error":err});
    else res.send({"response":result});
})

app.post('/attachAlias',async (req,res)=>{
    let err, result;
    var requestObject = req.body;
    [err, result] = await to(web3Module.attachALias(requestObject.aliasID, requestObject.existingID));
    if(err) res.send({"error":err});
    else res.send({"response":result});
})


app.post('/addtoAccum', async (req,res)=>{
    var accumObj = req.body;
    //console.log(JSON.stringify(accumObj))
    let err, result;
    [err, result] = await to(web3Module.addtoAccum(accumObj.memberSha, 
                            accumObj.inAmt, 
                            accumObj.outAmt, 
                            accumObj.inopAmt, 
                            accumObj.outopAmt));

    //console.log("Result", result, err)
    if(err) res.send({"error":err});
    else res.send({"response":result});
})

app.post('/addNewMember',async (req,res)=>{
    var newMember = req.body
    let err, result;
    [err, result] = await to(web3Module.addNewMember(newMember.membersha, newMember.uuid, newMember.famId));
    if(err) res.send({"error":err});
    else res.send({"response":result});
})

//---------------------------------Listening to the port - server run-------------------------//

app.listen(port, () => console.log(`Example app listening on port ${port}!`))