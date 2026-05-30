 // A simple class named rectangle with constructor paramerts as (width,height,color) 
 class Rectangle{
   constructor (width, height, color ){
      this.width = width;
      this.height = height;
      this.color = color;
   }
  area(){
      const area = this.width * this.height;
      return area;
  }

   perimeter(){
      const perimeter = 2 * (this.width + this.height);
      return perimeter;
   }

   getColor() {
      console.log(`The color of rectangle is ${this.color}`);
   }
  }

  const rect = new Rectangle(10, 25, 'red');
  const area = rect.area();
  const perimeter = rect.perimeter();
   rect.getColor();
  console.log(area);
  console.log(perimeter);




 // This is a callback based async function which uses setTimeout to return a log statement after 3 sec
 function callback(){
     console.log("Hii there")
 }
 setTimeout( callback, 3000);


// This is a promised based async function for setTimeout which is more clean and returns a new promise 
 function setTimeoutPromisified(ms) {
   return new Promise(resolve => setTimeout(resolve, ms));
 }
 function callback(){
     console.log("Hii there bhaiii")
 }

 setTimeoutPromisified(3000).then(callback)

// Promise based async function for readFile also catches the error 
 const fs = require("fs");

function readFilePromisified(filePath) {
  return new Promise(function (resolve, reject) {
    fs.readFile(filePath, "utf-8", function (err, data) {
      if (err) {
        reject("Error while reading file");
      } else {
        resolve(data);
      }
    });
  });
}

function onDone(data) {
  console.log(data);
}

function onError(err) {
  console.log("Error: " + err);
}

readFilePromisified("a.txt").then(onDone).catch(onError);

// Another syntax to use the setTimeout in promisfied way
 function setTimeoutPromisified(ms) {
   return new Promise(resolve => setTimeout(resolve, ms));
 }

 setTimeoutPromisified(1000)
   .then(function () {
     console.log("hi");
     return setTimeoutPromisified(3000);
   })
   .then(function () {
     console.log("hello");
     return setTimeoutPromisified(5000);
   })
   .then(function () {
     console.log("hello there");
   });




