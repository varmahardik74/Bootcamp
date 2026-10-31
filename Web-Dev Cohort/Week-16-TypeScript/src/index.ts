// import { log } from "node:console";
// //Used interface here, understood the syntax and how it is used 
// interface User {
//     name: string;
//     age: number;
// }

// function IsLegal(user: User) {
//     if (user.age > 18) {
//         return true
//     } else {
//         return false;
//     }
// }

// let user1: User = {
//     name: "hardik",
//     age: 19,
// };

// let user2: User = {
//     name: "blaaa",
//     age: 17,
// };

// console.log(IsLegal(user1));
// console.log(IsLegal(user2));



interface Person {
    name: string;
    age: number;
    greet(phrase: string): void;
}

class Employee implements Person {
    name: string;
    age: number;

    constructor(n: string, a: number) {
        this.name = n;
        this.age = a;
    }

    greet(phrase: string) {
        console.log(`${phrase} ${this.name}`);
    }
}

let e1 = new Employee("hardik", 22);
console.log(e1.name);
console.log(e1.age);
console.log(e1.greet("hello my name is"));










type StringOrNumber = string | number;

function printId(id: StringOrNumber) {
  console.log(`ID: ${id}`);
}

printId(101); // ID: 101
printId("202A"); // ID: 202


function maxValue(arr: number[]){
    let max = 0;
    for (let i : number = 0  ; i < arr.length; i++) {
        const value = arr[i];
        if (value !== undefined && value > max) {
            max = value
        }
    }
    return max;
}

console.log(maxValue([1, 2, 3]));