song1="" ;
song2="";
leftWristX = 0 ;
leftWristY = 0 ;
rightWristX = 0 ;
rightWristY = 0 ;
scoreLeftWrist = 0 ;
scoreRightWrist= 0 ;
leftStatus = "" ;
rightStatus = "";

function preload() {
    song1=loadSound("music2.mp3") ;
    song2=loadSound("music.mp3")

}

function setup() {
    canvas= createCanvas(600,500) ;
    canvas.center() ;
    video= createCapture(VIDEO) ;
    video.hide() ;
    posenet= ml5.poseNet(video,modelLoaded) ;
    posenet.on('pose',gotPoses) ;
}

function draw() {
    image(video, 0,0,600,500) ;
    fill('#FF0000') ;
    stroke('#FF0000') ;
    leftStatus=song1.isPlaying()
    if (scoreLeftWrist > 0.2) {
        circle(leftWristX,leftWristY,20) ;
        song2.stop() ;
        if (leftStatus==false) {
            song1.play() ;
            document.getElementById("song_name").innerHTML = "Peter Pan" ;
        }
    }
    rightStatus=song2.isPlaying() ;
    if (scoreRightWrist > 0.2) {
        circle(rightWristX,rightWristY,20) ;
        song1.stop() ;
        if (rightStatus==false) {
            song2.play() ;
            document.getElementById("song_name").innerHTML = "Harry Potter" ;
        }
    }
}

function modelLoaded(){
    console.log("poseNet model is initialized") ;
}

function gotPoses(results) {
    if (results.length>0) {
        console.log(results) ;
        scoreRightWrist = results[0].pose.keypoints[10].score ;
        scoreLeftWrist = results[0].pose.keypoints[9].score ;
        leftWristX= results[0].pose.leftWrist.x ;
        leftWristY= results[0].pose.leftWrist.y ;
        rightWristX= results[0].pose.rightWrist.x ;
        rightWristY= results[0].pose.rightWrist.y ;
        console.log("leftWristX = "+ leftWristX) ;
        console.log("leftWristY = "+ leftWristY) ;
        console.log("rightWristX = "+ rightWristX) ;
        console.log("rightWristY = "+ rightWristY) ;
     }
}

