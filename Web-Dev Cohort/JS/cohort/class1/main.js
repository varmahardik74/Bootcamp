function setTimeoutPromisified(ms){//library hai js setTimeoutPomisified (async function parameter ms)
    return new Promise (resolve => setTimeout(resolve,ms)); //new object of promise class  Or we can say it is the instance of promise class 
}

function callback(){
    console.log("5 sec have passed ");
}

setTimeoutPromisified(5000).then(callback);
// promise is eventual compleation of async and it eventually compleates when we give it something like (.then(callback)) and after compleation do this 