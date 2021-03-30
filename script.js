const modal = document.querySelector(".modal")
const closeBtn = document.querySelector(".btn-close")
const bone = document.querySelectorAll(".bone")
const biology = document.querySelectorAll(".biology")
const allBone = document.getElementById("boneALL")
const allBio = document.getElementById("bioALL")
const boneIcon = document.querySelectorAll("fa-bone")
const bioIcon = document.getElementById("microscope-icon")
var glossary;


function addEventListenerList(list, event, fn){
    for(var i = 0, len = list.length; i < len; i++){
        list[i].addEventListener(event, fn, false);
    }

}
function colorChange(list, color){
    for(var i = 0, len = list.length; i < len; i++){
        list[i].style.backgroundColor = color;
    }

}
function iconChange(iconID, mycolor, iconStatus){
    iconID.style.display = iconStatus;
    iconID.style.backgroundColor = mycolor;
}

function removeEventListenerList(list, event, fn){
    for(var i = 0, len = list.length; i < len; i++){
        list[i].removeEventListener(event, fn, false);
    }

}
function handleClick(event){
    modal.style.display = "block";
    console.log(glossary[event.currentTarget.className][event.currentTarget.id]['definition']);
    //console.log(glossary[this.currentTarget.className][this.currentTarget.id]['definition']);
    //console.log(glossary[event.this.currentTarget.className][event.this.currentTarget.id]['definition']);
    closeBtn.addEventListener("click",() => {
        modal.style.display = "none"
    });
}

function handleCheckBox(slider, classNm, color, icon){
    if (slider.checked) {
        colorChange(classNm, "white");
        iconChange(icon, "white", "none");
        removeEventListenerList(classNm,'click', handleClick);
      console.log('Checked');
    } else {
      console.log('Not checked');
      colorChange(classNm, color);
      iconChange(icon, color, "inline-block");
      addEventListenerList(classNm,'click', handleClick);
    }
}

function init() {
    loadJSON(function(response) {
     // Parse JSON string into object
       glossary = JSON.parse(response);
        //alert(glossary['bone']['femur']['definition']);
    });
}
init();

function loadJSON(callback) {   

    var xobj = new XMLHttpRequest();
        xobj.overrideMimeType("application/json");
    xobj.open('GET', 'terms_list.json', true); // Replace 'my_data' with the path to your file
    xobj.onreadystatechange = function () {
          if (xobj.readyState == 4 && xobj.status == "200") {
            // Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
            callback(xobj.responseText);
          }
    };
    xobj.send(null);  
}

addEventListenerList(bone,'click', handleClick);
addEventListenerList(biology,'click', handleClick);



document.addEventListener('DOMContentLoaded', function () {
     allBone.addEventListener('change', function(){handleCheckBox(allBone, bone, "rgba(255,235,83,0.4)", boneIcon);});
});
document.addEventListener('DOMContentLoaded', function () {
    allBio.addEventListener('change', function(){handleCheckBox(allBio, biology, "rgba(56, 212, 21,0.4)", bioIcon);});
});