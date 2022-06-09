const express = require('express');
const bodyParser = require('body-parser');
const https = require('https');

//jumbotron na success.html page com botao para add outro
//botao para voltar a root se no failure.html


//const client = require('@mailchimp/mailchimp_marketing');
// client.setConfig({
//   apiKey: '4066931e02b1dff3084913719f137c2d-us8',
//   server: 'us8',
// });

const app = express();

app.use(express.static(__dirname));

app.use(bodyParser.urlencoded({
  extended: true
}));

app.get('/', function(req, res) {

  res.sendFile(__dirname + "/signup.html");
})

app.post('/', function(req, res) {

  const firstName = req.body.fName;
  const lastName = req.body.lName;
  const email = req.body.elmail;

  const data = {
    members: [
      {
        email_address: email,
        status: "subscribed",
        merge_fields:
          {
            FNAME: firstName,
            LNAME: lastName
          }
        }]}

  const jsonData = JSON.stringify(data);

//const subscribingUser = {firstName: firstName, lastName: lastName, email: email}
url = 'https://us8.api.mailchimp.com/3.0/lists/2d96f869be';

options = {
  method: 'POST',
  auth: 'vmendes:4066931e02b1dff3084913719f137c2d-us8'
};

const request = https.request ( url,options, function (response){

    response.on('data',function (data){
    console.log(JSON.parse(data))
  });
  if (response.statusCode===200) {
    res.sendFile(__dirname+"/success.html");
  } else {
    res.sendFile(__dirname+"/failure.html");
  }
  console.log("statusCode: ", response.statusCode);
});

request.write(jsonData);
request.end();

// const run = async () => {
//       const response = await client.lists.addListMember("2d96f869be", {
//         email_address: email,
//         status: "subscribed",
//      //  firstName: firstName,
//      //    lastName: lastName
//          merge_fields: {
//             FNAME: firstName,
//              LNAME: lastName
//          }
//       });
//     };
// run();




});


app.post ('/failure', function (req,res){

  res.redirect("/");

});

app.listen(3000, function() {

  console.log("server is running on port 3000")

})

//API KEY
//4066931e02b1dff3084913719f137c2d-us8

//list id
//2d96f869be
