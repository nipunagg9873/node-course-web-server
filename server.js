const express=require('express');
const hbs=require('hbs');
const fs=require('fs');
const port=process.env.PORT ||3000;

var app=express();
app.set('view engine','hbs');

hbs.registerPartials(__dirname+'/views/partials');

hbs.registerHelper('getCurrentYear',()=>{
  return new Date().getFullYear();
});

app.use((req,res,next)=>{
  var now= new Date().toString();
  var log=` request made on ${now} to ${req.method} with address ${req.url}`;
  console.log(log);
  fs.appendFile('server.log',log+'/n',(error)=>{
    if(error)
    console.log('unable to add log');
  });
  next();
});

// app.use((req,res,next)=>{
//   res.render('wait.hbs');
// });
app.use(express.static(__dirname+'/public'));
hbs.registerHelper('screamIt',(text)=>{
  return text.toUpperCase();
});

app.get('/',(req,res)=>{
  res.render('home-page.hbs',{
    title:'home page',
    welcomeMessage:'welcome to my website',
    name: 'nipun',
    likes: [
      'eating',
      'coding'
    ]
  });
});
app.get('/about',(req,res)=>{
  res.render('about.hbs',{
    title:'about-page'
  })
});
app.get('/bad',(req,res)=>{
  res.send({
    errorMessage:'kuchh gochi kia'
  });
});
app.listen(port,()=>{
  console.log(`server is up on port ${port}`);
});
