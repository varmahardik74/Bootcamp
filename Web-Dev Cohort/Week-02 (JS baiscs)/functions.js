// Structure of a function in JS 
function functionName(parameter1, parameter2) {
  // Code to be executed
  return result;
}   

// Basic function to add two numbers

function sum(a, b) {
  return a + b;
}

let ans = sum(2, 3);
console.log(ans);




// Sum of first 'n' numbers
function Findsum(n) {
	let ans = 0;
	for (let i = 1; i <= n; i++) {
		ans = ans + i
	}
	return ans;
}

const ans = Findsum(12);
console.log(ans);



function report(student){
  console.log(student.name + " is " + student.age + " years old.");
}

const user1 = {
  name: "hardik",
  age: 22,
}
const user2 = {
  name: "anvi",
  age: 12,
}

report(user1);
report(user2);


//A function to greet the uses and find if they are eligible to vote, where user is a parameter as a object
  function greetUser(user) {
    // Variable to store title
    let title;

    // Decide greeting based on gender
    if (user.gender === "male") {
      title = "Mr";
    } else if (user.gender === "female") {
      title = "Mrs";
    } else {
      title = "Others";
    }

    // Greet the user
    console.log(`Hi ${title} ${user.name}, your age is ${user.age}`);

  // Check voting eligibility
  if (user.age >= 18) {
    console.log("You are eligible to vote ✅");
  } else {
    console.log("You are not eligible to vote ❌");
  }

  console.log("-------------------");
}

// Example objects
const user1 = {
  name: "Hardik",
  age: 21,
  gender: "male",
};

const user2 = {
  name: "Anvi",
  age: 12,
  gender: "female",
};

// Function calls
greetUser(user1);
greetUser(user2);



// A require statement lets you import code/functions export from another file/module.
const fs = require("fs"); // "fs" is the file system module 

const contents = fs.readFileSync("a.txt", "utf-8");
console.log(contents);



//This map approach it is a replacement/another way to create a function 
const sum = (a,b) =>{
    return a + b;
}

const ans = sum(1,3);
console.log(ans);


//Array transformation (Multiplying the original array)
const input = [1, 2, 3, 4, 5];
const newArr = [];

for(let i = 0; i < input.length ; i++){
  newArr.push( input[i] * 2);
}

console.log(newArr);
