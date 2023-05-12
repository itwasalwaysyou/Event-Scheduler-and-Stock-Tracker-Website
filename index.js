// YOU CAN USE THIS FILE AS REFERENCE FOR SERVER DEVELOPMENT

// include the express modules
var express = require("express");

// create an express application
var app = express();
const url = require('url');

// helps in extracting the body portion of an incoming request stream
var bodyparser = require('body-parser');

// fs module - provides an API for interacting with the file system
var fs = require("fs");

// helps in managing user sessions
var session = require('express-session');

// include the mysql module
var mysql = require("mysql");

// Bcrypt library for comparing password hashes
const bcrypt = require('bcrypt');

// A possible library helps reading uploaded file.
var formidable = require('formidable');
const { connect } = require("http2");



// apply the body-parser middleware to all incoming requests
app.use(bodyparser());

// use express-session
// in mremory session is sufficient for this assignment

// the way to access database
//在服务器端存储和跟踪用户数据的机制
app.use(session({
  secret: "csci4131secretkey",
  saveUninitialized: true,
  resave: false
}
));



// +------------------------+
// | Tables_in_C4131NF23U78 |
// +------------------------+
// | tbl_accounts           |
// | tbl_events             |
// +------------------------+


var connection = mysql.createConnection({
  host: "cse-mysql-classes-01.cse.umn.edu",
  user: "C4131NF23U78",               
  password: "6134",                  
  database: "C4131NF23U78",          
  port: 3306
});

// listen port 9007! 
app.listen(9007, () => console.log('Listening on port 9007!'));

const pug =require("pug");
// function to return the welcome page
const path = require('path');
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

app.get('/',function(req, res) {
  res.render('welcome');
});

app.get('/login',(req,res)=>{
  if(req.session.login){
      res.redirect('/schedule');
  }else{
      res.render("login");
  }

})

app.get('/schedule',(req,res)=>{

  // Session {
  //   cookie: { path: '/', _expires: null, originalMaxAge: null, httpOnly: true },
  //   user: 'charlie'
  // }

  if(req.session.login){
      // connection.query('SELECT *')
      res.render('schedule');

  }else{
      res.redirect('/login');
  }

})

app.get('/logout',(req,res)=>{

    req.session.destroy(err=>{
      if(err){
        throw err;
      }else{
        res.redirect('/login');
      }
    })
})

app.get('/getDaySchedule',(req,res)=>{
  const sql= 'SELECT event_id,event_event,event_start, event_end,event_location,event_phone,event_info,event_url FROM tbl_events WHERE event_day=? ORDER BY event_start ASC';
  connection.query(sql,[req.query.day],(err,result)=>{
    if(err){
      throw err;
    }else{
      // result:
      // [
      //   RowDataPacket {
      //     event_event: 'sleep',
      //     event_start: '01:00',
      //     event_end: '04:00',
      //     event_location: 'home',
      //     event_phone: '1234',
      //     event_info: ':)',
      //     event_url: 'https://www.google.com'
      //   }
      // ]

      //(JSON.stringify) =>  [{"event_event":"sleep","event_start":"01:00","event_end":"04:00","event_location":"home","event_phone":"1234","event_info":":)","event_url":"https://www.google.com"}]

      res.send(JSON.stringify(result));
    }
  })

})



app.get('/addEvent',(req,res)=>{
  if(req.session.login){

    res.render('addEvent');

  }else{
    res.redirect('/login');
  }
})




app.post('/postEventEntry',(req,res)=>{
  //req.body
  // {
  //   event: 'sleep',
  //   day: 'Monday',
  //   start: '01:00',
  //   end: '02:00',
  //   phone: '1234',
  //   location: 'keller',
  //   info: ':)',
  //   url: 'https://www.google.com'
  // }
  var day = req.body.day;  
  var event= req.body.event;
  var start= req.body.start;
  var end= req.body.end;
  var location= req.body.location;
  var phone=req.body.phone;
  var info= req.body.info;
  var url= req.body.url;

  var sql_insert= 'INSERT INTO tbl_events(event_day,event_event,event_start,event_end,event_location,event_phone,event_info,event_url) VALUES(?,?,?,?,?,?,?,?)';
  connection.query(sql_insert,[day,event,start,end,location,phone,info,url],(err,result)=>{
      if(err){
        throw err;
      }else{
        if(result){
          res.redirect('/schedule');
        }
      }

  })

})

app.post('/postEventFileEntry',(req,res)=>{
    //req.body:
    //{ file: 'schedule.json' }

      const form = new formidable.IncomingForm();

      //parse form submitted by user
      form.parse(req,(err,fields,files)=>{

        if(err){
          throw err;
        }
        //json 
        var IncomingFile= files.file;

        fs.readFile(IncomingFile.filepath,(err,data)=>{
          if(err){
            throw err;
          }
          data=JSON.parse(data)

          for (let day in data){
              for (let i=0;i<data[day].length;i++){
                var event ={
                  name:data[day][i].name,
                  start:data[day][i].start,
                  end:data[day][i].end,
                  phone:data[day][i].phone,
                  location:data[day][i].location,
                  info:data[day][i].info,
                  url:data[day][i].url,

                }          
                var sql='INSERT INTO tbl_events(event_day,event_event,event_start,event_end,event_location,event_phone,event_info,event_url) VALUES(?,?,?,?,?,?,?,?)';
                connection.query(sql,[day, event.name, event.start,event.end,event.location,event.phone,event.info,event.url],(err,result)=>{
                if(err){
                  throw err;
                }

              
              })

              }


          }

          res.redirect('/schedule');
        });
     
  
    })

})





app.get('/stock',(req,res)=>{
  if(req.session.login){

    res.render('stock');

  }else{
    res.redirect('/login');
  }

})

app.get('/edit',(req,res)=>{
  if(req.session.login){
    res.render('editEvent');

  }else{
    res.redirect('/login');
  }

})


//send this event information back:
app.get('/editEvent/:id',(req,res)=>{

  var id = req.params.id;
  sql_select= 'SELECT * FROM tbl_events WHERE event_id= ?';

  connection.query(sql_select,[id],(err,result)=>{
    if(err){
      throw err;
    }
    if(result.length===0){
      res.status(404).send("Event not found");
    }

    //(JSON.stringify) =>  [{"event_event":"sleep","event_start":"01:00","event_end":"04:00","event_location":"home","event_phone":"1234","event_info":":)","event_url":"https://www.google.com"}]

    res.send(JSON.stringify(result));



  })

})

app.post('/editEvent/',(req,res)=>{
    
    //req.body=>
    // {
    //   eventID: '246',  (hidden)
    //   event: 'Csci 4131 Lecture',
    //   day: 'monday',
    //   start: '09:45',
    //   end: '13:00',
    //   phone: 'See Class information on Canvas',
    //   location: '5 Blegen Hall',
    //   info: 'CSci 4131 Info  = =',
    //   url: 'https://onestop2.umn.edu/pcas/viewCatalogCourse.do?courseId=790654'
    // }
    
    var id =req.body.eventID;
    var day = req.body.day;  
    var event= req.body.event;
    var start= req.body.start;
    var end= req.body.end;
    var location= req.body.location;
    var phone=req.body.phone;
    var info= req.body.info;
    var url= req.body.url;
   

   
    var sql_update= "UPDATE tbl_events SET event_day =? ,event_event=? ,event_start=?,event_end=?,event_location=?,event_phone=?,event_info=?,event_url=? WHERE event_id=?"
    connection.query(sql_update,[day,event,start,end,location,phone,info,url,id],(err,result)=>{
      if(err){
        throw err;
      }
      if(result){
        res.redirect('/schedule');
      }
    })
})


app.delete('/deleteEvent/:id',(req,res)=>{

  console.log(req.params);

  var id= req.params.id;
  var sql_delete="DELETE FROM tbl_events WHERE event_id = ?";

  connection.query(sql_delete,[id],(err,result)=>{
    if(err){
      throw err;
    }
    res.status(200).send("Event has been deleted.")
    

  })
})

app.get('/createAccount',(req,res)=>{
  if(req.session.login){

    res.redirect('/schedule');

  }else{
    res.render('accountMgt');
  }

})



app.post('/createAccount',(req,res)=>{
  //req.body: 
  // {
  //   name: 'jinwei!!',
  //   email: 'zhou1909@umn.edu',
  //   password: '1234',
  //   'password-confirm': '1234'
  // }
  
  var email= req.body.email;
  var password= req.body.password;
  var name= req.body.name;

  const saltRounds = 10;
  const passwordHash = bcrypt.hashSync(password, saltRounds);


  var sql_select='SELECT * FROM tbl_accounts WHERE acc_email= ? OR acc_name= ?';

  
  connection.query(sql_select,[email,name],(err,result)=>{
     if(err){
      throw err;
     }else if(result.length ===0){


        var sql_insert = 'INSERT INTO tbl_accounts(acc_name,acc_login,acc_email,acc_password) VALUES (?,?,?,?)';
        connection.query(sql_insert,[name,name,email,passwordHash],(err,result)=>{
          if(err){
            throw err;
          }
          req.session.login=true;
          req.session.user=name;
          res.redirect('/schedule');
        })
     }else{

        res.render('accountMgt',{message: "The Email or User name has been used."});


     }
  })




})


app.post('/loginEntry',(req,res)=>{
  // req.url = '/loginEnry' 
  // req.body: { user: 'jinwei', password: '1234' },
  var user= req.body.user;
  var password= req.body.password;

  var sql_select='SELECT * FROM tbl_accounts WHERE acc_name= ?';

// +--------+----------+-----------+--------------------------------------------------------------+
// | acc_id | acc_name | acc_login | acc_password                                                 |
// +--------+----------+-----------+--------------------------------------------------------------+
// |      1 | charlie  | charlie   | $2b$10$cVprP4KaBS/9xCutQ2hJrO5P7X0sGYs0T.Ylc.3Vzr8F6agEXOYx2 |
// +--------+----------+-----------+--------------------------------------------------------------+

  //connect to database and select
  connection.query(sql_select,[user],(err,info)=>{
    if(err){

      throw err;
    }else{

      if(info.length>0){

        //info:
        // [
        //   RowDataPacket {
        //     acc_id: 1,
        //     acc_name: 'charlie',
        //     acc_login: 'charlie',
        //     acc_password: '$2b$10$cVprP4KaBS/9xCutQ2hJrO5P7X0sGYs0T.Ylc.3Vzr8F6agEXOYx2'
        //   }
        // ]


        bcrypt.compare(password,info[0].acc_password,(err,result)=>{

            if(err){
                  throw err;
            }else if(result){
                  req.session.user=user;
                  req.session.login=true;
                  res.redirect('/schedule');
            }else{

                  req.session.login=false;
                  res.render('login',{message:"Wrong password. Please try again!"});
            }

        })

      } else{

          res.render('login',{message:"Invalid credentials. Plsease try again!"});

      }
      



    }
  });
  
  

})







// middle ware to serve static files
app.use('/client', express.static(__dirname + '/client'));


// function to return the 404 message and error to client
app.get('*', function(req, res) {
  // add details
  res.sendStatus(404);
});
