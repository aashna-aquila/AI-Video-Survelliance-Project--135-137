status="";
objects=[];

    function setup()
    {
        canvas=createCanvas(320,320);
        canvas.center();
        video=createCapture(VIDEO);
        video.size(320,320);
        video.hide();
    }


    function draw()
    {
        image(video,0,0,320,320);
        if(status != "")
        {
            objectDetector.detect(video, gotResult);
            for(i=0; i< objects.length; i++){
                document.getElementById("status").innerHTML="Status:Objects Detected ";  
                fill("#FF0000");
                percent= floor(objects[i].confidence * 100);
                text(objects[i].label + " " + percent + "%" ,objects[i].x+15, objects[i].y+15);
                noFill();
                stroke("#FF0000");
                rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);

                if(objects[i].label==object_name)
                {
                    video.stop();
                    objectDetector.detect(gotResult);
                    document.getElementById("object_status").innerHTML=object_name+" found.";
                  
                }
                else{
                    document.getElementById("object_status").innerHTML=object_name+" not found.";
                }
             }
        }
    }

    function gotResult(error,results){
        if(error){
        console.log(error);
    }
    console.log(results);
    objects=results;
}

    function start()
    {
        objectDetector=ml5.objectDetector('cocossd', modelLoaded);
        object_name= document.getElementById("object_name").value;
        document.getElementById("status").innerHTML="Status: Detecting Objects";
    }

    function modelLoaded()
    {
        console.log("Model has been Loaded");
        status=true;
    }