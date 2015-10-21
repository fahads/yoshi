var strt = Number(process.argv[2]);

if ((isNaN(strt)) || (strt <= 0)) {
    console.log("Entry must be a number above zero!");
} else {
    var output = 1;

    for (var i = 2;  i <= strt; i++) {
        output = output * i;
    }

    console.log(strt + " factorial equals: " + output);
}