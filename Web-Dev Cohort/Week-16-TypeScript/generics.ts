
// <T> takes/captures whatever universal datatype is passed in it 
function IndentifyInput<T>(input:T) {
    return input;
}

// <T> becomes "string" as string datatype is passed 
const output_1 = IndentifyInput<string>("Hardik");

// <T> becomes "number" as number datatype is passed
const output_2 = IndentifyInput<number>(582);

console.log(output_1);

console.log(output_2);
