var helloWorld = function() {
    console.log("Hello World!");
    setTimeout(function(){
        console.log("Hello World Again!!");
    }, 10000);
};

helloWorld();