const modal = document.querySelector(".modal")
const closeBtn = document.querySelector(".btn-close")
const bone = document.querySelectorAll(".bone")
const biology = document.querySelectorAll(".biology")
const allBone = document.getElementById("boneALL")
const allBio = document.getElementById("bioALL")
const boneIcon = document.getElementById("bone-icon")
const bioIcon = document.getElementById("microscope-icon")
const pageList = document.querySelectorAll(".docPage")
const nextBtn = document.getElementById("next")
const prevBtn = document.getElementById("prev")
const backBtn = document.getElementById("back-btn")
var glossary;
var currentPage = 0;
var navbar = document.getElementById("navigation")
var sticky = navbar.offsetTop;


function addEventListenerList(list, event, fn){
    for(var i = 0, len = list.length; i < len; i++){
        list[i].addEventListener(event, fn, false);
    }

}
function colorChange(list, color, myStatus){
    for(var i = 0, len = list.length; i < len; i++){
        list[i].style.backgroundColor = color;
        list[i].getElementsByTagName("i")[0].style.display = myStatus;
    }

}
function iconChange(iconID, iconStatus){
    iconID.style.display = iconStatus;
}

function removeEventListenerList(list, event, fn){
    for(var i = 0, len = list.length; i < len; i++){
        list[i].removeEventListener(event, fn, false);
    }

}
function handleClick(event){
    modal.style.display = "block";
    var myClass = event.currentTarget.className;
    var myID = event.currentTarget.id;
    modal.getElementsByClassName("modal-title")[0].innerHTML = glossary[myClass][myID]["term"];
    modal.getElementsByClassName("modal-body")[0].innerHTML = glossary[myClass][myID]["definition"];
    //alert(glossary[myClass][myID]["definition"]);


    closeBtn.addEventListener("click",() => {
        modal.style.display = "none"
    });
}

function handleCheckBox(slider, classNm, color){
    if (slider.checked) {
        removeEventListenerList(classNm,'click', handleClick);
        colorChange(classNm, "white", "none");
        //iconChange(icon, "none");
        console.log('Checked');
    } else {
        addEventListenerList(classNm,'click', handleClick);
        console.log('Not checked');
        colorChange(classNm, color,"inline-block");
        //iconChange(icon, "inline-block");
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
function stickyNav() {
    if (window.pageYOffset >= sticky) {
      navbar.classList.add("sticky")
    } else {
      navbar.classList.remove("sticky");
    }
  }

addEventListenerList(bone,'click', handleClick);
addEventListenerList(biology,'click', handleClick);


/*window.onscroll = function() {stickyNav()};
document.addEventListener('DOMContentLoaded', function () {
     allBone.addEventListener('change', function(){handleCheckBox(allBone, bone, "rgba(255,235,83,0.4)");});
});*/
document.addEventListener('DOMContentLoaded', function () {
    allBio.addEventListener('change', function(){handleCheckBox(allBio, biology, "rgba(56, 212, 21,0.4)");});
});

prevBtn.addEventListener('click', function() {
    if(currentPage != 0){
        pageList[currentPage].style.display = "none";
        currentPage = currentPage - 1;
        pageList[currentPage].style.display = "flex";
        document.body.scrollTop = 0; // For Safari
        document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
    }
});
nextBtn.addEventListener('click', function() {
    console.log("out the if");
    if(currentPage < 12){
        console.log("in the if");
        pageList[currentPage].style.display = "none";
        currentPage = currentPage + 1;
        pageList[currentPage].style.display = "flex";
        document.body.scrollTop = 0; // For Safari
        document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
    }
});
backBtn.addEventListener('click', function() {
    location.href = "index.html";
});