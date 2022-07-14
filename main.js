objects=[];
music="";
status="";

function preload(){
    music= loadSound("alarm.mp3");
}

function setup(){
    canvas= createCanvas(380,480);
    video= createCapture(VIDEO);
    video.size(380, 480);
    video.hide();
    canvas.center();    
}

function start(){
    object_detector= ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML= "Detecting baby"
}

function modelLoaded(){
    console.log("modal loaded");

    status=true;
}

function gotResults(error, results){
    if(error){
        console.error(error);
    }
    else{
        console.log(results);
        objects= results;
    }
}

function draw(){
   
    image(video, 0, 0,  380, 480);
    if(status!=""){

        object_detector.detect(video, gotResults);

    for(i=0; i<objects.length; i++){
        fill("red"); percent = floor(objects[i].confidence * 100); text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15); noFill(); stroke("red"); rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        console.log("for loop");
        if(objects[i].label != 'person'){
            document.getElementById("status").innerHTML="Baby not found!";
            music.play();
            console.log("no");
        }
        else{
            document.getElementById("status").innerHTML="Baby found";
            music.stop();

        }
        
        if(objects[i].length<0){
            document.getElementById("status").innerHTML="Baby not found!";
            music.stop();
        }
    }
}}