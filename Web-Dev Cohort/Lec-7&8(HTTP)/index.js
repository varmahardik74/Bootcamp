//to create an HTTP server for calculations which has 4 routes 
// created an HTTP server using express(and framewrok for js http) with 2 routes add and multiply that performs tasks we are giving the number thorugh routes till now 
//was giving numbers through routes
// now we are connecting frontend to backend and will give numbers in FE so that it process in BE and makes a fullstcak app that communicates 

const express = require("express");
const app = express();


app.get("/", function(req,res){
res.sendFile("D:\\Bootcamp\\index.html");
})

// https://localhost:3000/sum/1/2
app.get("/sum/:a/:b", function(req, res){
 const a = parseInt(req.params.a);
 const b = parseInt(req.params.b);

 const sum = a + b;

 res.json({
    ans: sum
 })
})

// https://localhost:3000/mul/1/2
app.get("/mul/:a/:b", function(req, res){
 const a = parseInt(req.params.a);
 const b = parseInt(req.params.b);

 const ans = a * b;

 res.json({
    ans: ans
 })
})





app.listen(3000);