var current = document.getElementById("mainMenu");
var first = document.getElementById("myCanvas");
var second = document.getElementById("secondExperiment");

function backClicked(){
  location.href = "./index.html";
}

function showFirst(){
  current.style.display = "none";
  current = document.getElementById("myCanvas");
  current.style.display = "block";
}

function showSecond(){
  current.style.display = "none";
  current = document.getElementById("secondExperiment");
  current.style.display = "block";
}
