function Greet(first_name: string) {
  return console.log(`Hello, ${first_name}`);
}

console.log(Greet("hardik"));

function Sum(a: number, b: number): number {
  return a + b;
}

console.log(Sum(5, 600));


function isLegal(age : number){
    if (age <= 0){
        return console.log("Age cannot be less than zero or less than zero");
    } 
    if(age >= 18)
        return true;
    if(0 < age && age < 18)
        return false;
}


console.log(isLegal(18));

const greet = (name: string) => `Hello, ${name}!`;

console.log(greet("hardik"));
