// // ---------------------------------------------------
// // Promise-based setTimeout and fs.readFile Examples
// // ---------------------------------------------------

// const fs = require("fs");


// // ===================================================
// // 1. Promisified Version of setTimeout
// // ===================================================

// function setTimeoutPromisified(delay) {
//   return new Promise(function (resolve) {
//     setTimeout(function () {
//       resolve();
//     }, delay);
//   });
// }


// // Example 1
// setTimeoutPromisified(1000).then(function () {
//   console.log("1 second has passed");
// });

// // Example 2
// setTimeoutPromisified(2000).then(function () {
//   console.log("2 seconds have passed");
// });

// // Example 3
// setTimeoutPromisified(3000).then(function () {
//   console.log("3 seconds have passed");
// });


// ===================================================
// 2. Promisified Version of fs.readFile
// ===================================================

const fs = require("fs");

function readFilePromisified(filePath, encoding = "utf-8") {
  return new Promise(function (resolve, reject) {
    fs.readFile(filePath, encoding, function (err, data) {

      // Reject promise if error occurs
      if (err) {
        reject(err);
      }

      // Resolve promise with file data
      else {
        resolve(data);
      }
    });
  });
}


// ===================================================
// Success and Error Handlers
// ===================================================

function onDone(data) {
  console.log("File Content:");
  console.log(data);
}

function onError(err) {
  console.log("Error:", err);
}


// ===================================================
// Reading File Using Promise
// ===================================================

readFilePromisified("./Lec-5/ab.txt")
  .then(onDone)
  .catch(onError);


// ---------------------------------------------------
// Promisified Version of setTimeout using async/await
// ---------------------------------------------------


// Function that returns a Promise
// The promise resolves after the given time delay
function setTimeoutPromisified(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}


// Async function to execute delays sequentially
async function solve() {

  // Wait for 1 second
  await setTimeoutPromisified(1000);
  console.log("hi");

  // Wait for 3 seconds
  await setTimeoutPromisified(3000);
  console.log("hello");

  // Wait for 5 seconds
  await setTimeoutPromisified(5000);
  console.log("hi there");
}


// Calling the async function
solve();