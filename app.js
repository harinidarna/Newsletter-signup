const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

app.get("/", function(req,res){
    res.sendFile(__dirname + "/signup.html");
});

app.post("/", function(req,res){
    var FirstName = req.body.fName;
    var LastName = req.body.lName;
    var email = req.body.email;
    console.log(FirstName, LastName, email);

    var data = {
        members:[
            {
                email_address:email,
                status:"subscribed",
                merge_fields:{
                    FNAME:FirstName,
                    LNAME:LastName,
                }
            }
        ]
    }

    var jsonData = JSON.stringify(data);

    var options = {
        url: "https://us10.api.mailchimp.com/3.0/lists/44b7e9edbc",
        method: "POST",
        headers:{
            "Authorization": "harini db6bd772f70ad12f285bc9758c46f1da-us10"
        },
        body:jsonData,
    }

    request(options, function(error, response, body){
        if(error){
            res.sendFile(__dirname + "/failure.html");
        }else{
            if(response.statusCode === 200){
                res.sendFile(__dirname + "/success.html");
            }else{
                res.sendFile(__dirname + "/failure.html");   
            }
        }
    });
});

app.post("/failure", function(req,res){
    res.redirect("/");
});

app.listen(process.env.PORT || 3000, ()=>{
    console.log(`Listening on port 3000.`);
});

// db6bd772f70ad12f285bc9758c46f1da-us10
// list id
// 44b7e9edbc