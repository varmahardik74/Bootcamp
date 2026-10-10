// // function sum(a,b){
// //     return a+b;
// // }
// // let ans = sum(5,6)
// // console.log(`Sum of ${a}+${b} is ${ans}`);

// function sum(a, b) {
//   return a + b;
// }

// let a = 5;
// let b = 6;
// let ans = sum(a, b);

// // Pass a and b directly to the template literal
// console.log(`Sum of ${a} + ${b} is ${ans}`);

//Array transformation (Multiplying the original array)
const input = [3, 12, 7, 22, 9];
const newArr = [];

for(let i = 0; i < input.length ; i++){
  newArr.push( input[i] * 2);
}

console.log(newArr);


let arr1 = [4, 5, 9, 2];

let arr2 = [];

for(let i=0; i < arr1.length; i++){
    arr2.push(arr1[i] * 2.5);
}

console.log(arr2);