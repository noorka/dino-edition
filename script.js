const modal = document.querySelector(".modal")
const closeBtn = document.querySelector(".btn-close")
const bone = document.querySelectorAll(".bone")
const biology = document.querySelectorAll(".biology")
const allBone = document.getElementById("boneALL")
const grayBlock = document.getElementById("opaque")
const boneIcon = document.getElementById("bone-icon")


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
function removeEventListenerList(list, event, fn){
    for(var i = 0, len = list.length; i < len; i++){
        list[i].removeEventListener(event, fn, false);
    }

}
function handleClick(event){
    modal.style.display = "block";
    grayBlock.style.display = "block";
        closeBtn.addEventListener("click",() => {
            modal.style.display = "none"
            grayBlock.style.display = "none"
        }
        )
}

function handleCheckBox(slider, classNm, color){
    if (slider.checked) {
        colorChange(classNm, "white");
        boneIcon.style.display = "hidden";
        boneIcon.style.color = "yellow";
        removeEventListenerList(classNm,'click', handleClick);
      console.log('Checked');
    } else {
      console.log('Not checked');
      colorChange(classNm, color);
      boneIcon.style.display = "hidden";
      addEventListenerList(classNm,'click', handleClick);
    }
}

function init() {
    loadJSON(function(response) {
     // Parse JSON string into object
       var actual_JSON = JSON.parse(response);
        alert(actual_JSON.menu.popup.menuitem[0].value);
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
     allBone.addEventListener('change', function(){handleCheckBox(allBone, bone, "yellow");});
});