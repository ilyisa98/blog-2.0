var express = require('express');
var router = express.Router();
var request = require('request');
//var flash = require('connect-flash');


//var Blogs = require('../db.json');
///////////////////////////////////////////HOMEPAGE///////////////////////////////////////
/* GET home page. */
router.get('/', function(req, res, next) {
    
 request.get({
     url: 'http://localhost:8000/Blogs?_sort=id&_order=desc',
     json: true
 }, function(error, response, body){
     //what to send when function has finished
     res.render('index', { title: 'Home', blogs: body, message: 'Please Log In', loggedUser : ""});
 });    
});

///////////////////////////////////////////REGISTER///////////////////////////////////////
router.post('/register', function(req, res, next) {
    
    
//create a variable   
 let user = {
  "username": req.body.username,
  "password": req.body.password
}

 console.log(user);
 
 //write logic to save this data
 
 request.post({
     url: 'http://localhost:8000/Users',
     body: user,
     json: true
 }, function(error, response, body){
//what to send when function has finished
     
     res.redirect('/');
 });
})
///////////////////////////////////////////SIGN IN///////////////////////////////////////
router.post('/signIn', function(req, res, next) {
    
    
//create a variable  

  let username_signIn = req.body.username;
  
 
 let password_signIn = req.body.password;

    
 let sign_in = {
  "username": req.body.username,
  "password": req.body.password
}
 


// console.log(username);
    
request({
    url: "http://localhost:8000/Users",
    method: "GET",
    json: true,
    }, function(error, response, body) {
    
    message = "unsuccessful";
    
    
    let myUser;
    var i;
    for (i = 0;i < body.length; i ++) {

        if (body[i].username === username_signIn &&
            body[i].password === password_signIn) {
//            return true;
            console.log("true");
            console.log(body[i].username);
            
            
            
            message = "success";
            myUser = body[i].username;
            console.log(message)
            
            request.get({
            url: 'http://localhost:8000/Blogs?_sort=id&_order=desc',
            json: true
            }, function(error, response, body){

            res.render('index', { title: 'Home', blogs: body, message: 'Success', loggedUser: myUser});
            }); 
            
            break;
            
        }
        
        
        else{
//            return false;
        console.log("false");
        
        }
    }

     if(message !== "success"){
     
         request.get({
     url: 'http://localhost:8000/Blogs?_sort=id&_order=desc',
     json: true
 }, function(error, response, body){
 
     res.render('index', { title: 'Home', blogs: body, message: 'Please Log In', loggedUser: ""});
 }); 
        
}     

    
    });
    

})


///////////////////////////////////////////ARCHIVEPAGE///////////////////////////////////////
//GET blogs page
router.get('/blogs', function(req, res, next) {
   request.get({
     url: 'http://localhost:8000/Blogs?_sort=id&_order=desc',
     json: true
}, function(error, response, body){
       res.render('blogs', { title: 'Blogs', blogs: body });
 });  

});


///////////////////////////////////////////CONTACTPAGE///////////////////////////////////////
//GET contact page
router.get('/contact', function(req, res, next) {
  res.render('contact', { title: 'Contact' });
});
//GET contact page
router.get('/contact/submit', function(req, res, next) {
  res.render('index', { title: 'Contact' });
});

///////////////////////////////////////////EDIT DATA///////////////////////////////////////
//GET edit page
//router.get('/edit/:id', function(req, res, next) {
//    
//       let urlPath = req.path;
//    
//        if(urlPath.length == 7){
//           let postVal = urlPath.slice(-1);
//           res.render('edit', { title: 'Edit Blog', blogs: Blogs.Blogs[postVal -1] });
//        }
//    
//        if(urlPath.length = 8){
//           let postVal = urlPath.slice(-2);
//           res.render('edit', { title: 'Edit Blog', blogs: Blogs.Blogs[postVal -1] });
//        }
//     
//});

router.get('/edit/:id', function(req, res, next) {
    //make a post request to our database
    request({
    url: "http://localhost:8000/Blogs/" + req.params.id,
    method: "GET",
    }, function(error, response, body) {
        console.log(JSON.parse(body));
        res.render('edit', { title: 'Edit Blog',blogs: JSON.parse(body)});
    });
})

///////////////////////////////////////////DELETE DATA///////////////////////////////////////
/* GET delete BLOG-ID.*/
router.get('/delete/:id', function(req, res, next) {
  //make a post request to our database
  request({
    url: "http://localhost:8000/Blogs/"  + req.params.id,
    method: "DELETE",
    }, function(error, response, body) {

        res.redirect('/');
    });
});


///////////////////////////////////////////VIEW DATA///////////////////////////////////////
//GET view page

//router.get('/view/:id', function(req, res, next) {
//    
//
//    
//       let urlPath = req.path;
//    
//           
//        if(urlPath.length == 7){
//           let postVal = urlPath.slice(-1);
//           res.render('view', { title: 'Read More', blogs: Blogs.Blogs + req.params.id, });
//        }
//    
//        if(urlPath.length = 8){
//           let postVal = urlPath.slice(-2);
//           res.render('view', { title: 'Read More', blogs: Blogs.Blogs[postVal -1] });
//        }
//    
//   
//});



router.get('/view/:id', function(req, res, next) {
    //make a post request to our database
    request({
    url: "http://localhost:8000/Blogs/"+ req.params.id,
    method: "GET",
    }, function(error, response, body) {
        res.render('view', { title: 'Read More',blogs: JSON.parse(body)});
    });
})


///////////////////////////////////////////UPDATE DATA///////////////////////////////////////


router.post('/update/:id', function(req, res, next) {

    request({
    url: "http://localhost:8000/Blogs/"+ req.params.id,
    method: "PUT",
    form: {
        "title": req.body.title,
        "author": req.body.author,
        "date": req.body.date,
        "image": req.body.image,
        "content": req.body.content
    }
    }, function(error, response, body) {
        res.redirect('/');
        
    });
})


///////////////////////////////////////////POST DATA///////////////////////////////////////
//GET new page
router.get('/new', function(req, res, next) {
  res.render('new', { title: 'Create New Blog' });
});

//Post new page
router.post('/new', function(req, res , next) {

//create a variable a post   
 let obj = {
  "title": req.body.title,
  "author": req.body.author,
  "date": req.body.date,
  "image": req.body.image,
  "content": req.body.content,
}

 //write logic to save this data
 
 request.post({
     url: 'http://localhost:8000/Blogs',
     body: obj,
     json: true
 }, function(error, response, body){
//what to send when function has finished
     res.redirect('/view/' + req.body.id);
 });

    
    });



///////////////////////////////////////////NEWS LETTER///////////////////////////////////////
router.post('/newsletter', function(req, res, next) {
    
    
//create a variable a post   
 let news = {
  "name": req.body.name,
  "email": req.body.email
}

 
 //write logic to save this data
 
 request.post({
     url: 'http://localhost:8000/Newsletters',
     body: news,
     json: true
 }, function(error, response, body){
     console.log(body)
//what to send when function has finished
     res.redirect('/');
 });
})

///////////////////////////////////////////CONTACT///////////////////////////////////////
router.post('/contact', function(req, res, next) {
    
    
//create a variable a post   
 let contactMe = {
  "firstname": req.body.firstname,
  "lastname": req.body.lastname,
  "email": req.body.email,
  "message": req.body.message
}

 
 //write logic to save this data
 
 request.post({
     url: 'http://localhost:8000/Contact',
     body: contactMe,
     json: true
 }, function(error, response, body){
     console.log(body)
//what to send when function has finished
     res.redirect('/');
 });
})



module.exports = router;
