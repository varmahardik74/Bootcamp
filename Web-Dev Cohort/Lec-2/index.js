

//Sum of first 'n' numbers
// function sum(n) {
// 	let ans = 0;
// 	for (let i = 1; i <= n; i++) {
// 		ans = ans + i
// 	}
// 	return ans;
// }

// const ans = sum(12);
// console.log(ans);



// function report(student){
//   console.log(student.name + " is " + student.age + " years old.");
// }

// const user1 = {
//   name: "hardik",
//   age: 22,
// }
// const user2 = {
//   name: "anvi",
//   age: 12,
// }

// report(user1);
// report(user2);


// A require statement lets you import code/functions export from another file/module.
// const fs = require("fs"); // "fs" is the file system module 

// const contents = fs.readFileSync("a.txt", "utf-8");
// console.log(contents);

// const sum = (a,b) =>{
//     return a + b;
// }

// const ans = sum(1,3);
// console.log(ans);

// const input = [1, 2, 3, 4, 5];

// const newArr = [];
// for(let i = 0; i < input.length ; i++){
//   newArr.push( input[i] * 2);
// }

// console.log(newArr);

// const arr = [1, 2, 3, 4, 5];

// const Narr = [];

// for (let i = 0; i < arr.length ; i++){
//   Narr.push(arr[i] * 5);
// }

// console.log(Narr);

// class Rectangle {
//    constructor(width, height, color) {
// 	    this.width = width;
// 	    this.height = height;
// 	    this.color = color; 
//    }
   
//    area() {
// 	   const area = this.width * this.height;
// 		 return area;
//    }
   
//    paint() {
// 			console.log(`Painting with color ${this.color}`);
//    }
   
// }

// const rect = new Rectangle(2, 4, "red")
// const area = rect.area();
// console.log(area)