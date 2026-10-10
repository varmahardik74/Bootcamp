var numberOfBottles = 99
while (numberOfBottles >= 0) {
    var bottleWord = "bottles";
    if (numberOfBottles === 1 && numberOfBottles === 0) {
        bottleWord = "bottle";
        console.log("No more bottle of beer left around,");
    // } else if (numberOfBottles === 0) {
    //     console.log(numberOfBottles + " " + bottleWord + " of beer on the wall");
    //     console.log(numberOfBottles + " " + bottleWord + " of beer,");
    //     console.log("No more bottle of beer left around,");
    }
    console.log(numberOfBottles + " " + bottleWord + " of beer on the wall");
    console.log(numberOfBottles + " " + bottleWord + " of beer,");
    console.log("Take one down, pass it around,");
    numberOfBottles--;
    // console.log(numberOfBottles + " " + bottleWord + " of beer on the wall.");
}