var nameinput = document.getElementById("nameinput");
var urlinput = document.getElementById("urlinput");
var Submit = document.getElementById("Submit");
var tableContent = document.getElementById("tableContent");
var close = document.querySelector(".close")
var boxInfo = document.querySelector(".box-info")
var sites = [];
var rgx = {
    nameinput: /[a-z]{3,}/i,
    urlinput:/^(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/
};

if (localStorage.getItem("sites") != null) {
    sites = JSON.parse(localStorage.getItem("sites"))
    showData(sites)
}

Submit.addEventListener("click", () => {
    addSite()
    clearFeild()
})

function addSite() {
    if (rgx.nameinput.test(nameinput.value) && rgx.urlinput.test(urlinput.value)) {
        var site = {
            websiteName: nameinput.value,
            Visit: urlinput.value
        };
        sites.push(site)
        localStorage.setItem("sites", JSON.stringify(sites))
        showLastIndex()
    }
    else{
        boxInfo.classList.replace("d-none","d-flex")
    }
}
function clearFeild() {
    nameinput.value = ""
    urlinput.value = ""
}
function showLastIndex() {
    var lastIndex = sites.length - 1;
    tableContent.innerHTML += `
    <td>${lastIndex + 1}</td>
    <td class = "text-capitalize">${sites[lastIndex].websiteName}</td>
    <td><a href="http://${sites[lastIndex].Visit}" target="_blank" class="btn text-white"><i class="fa-solid fa-eye me-2"></i>Visit</a></td>
    <td><button class="btn text-white" onclick = "deleteTd(${lastIndex})"><i class="fa-solid fa-trash-can me-2"></i>Delete</button></td>`
}
function showData(list) {
    tableContent.innerHTML = "";
    for (var i = 0; i < sites.length; i++) {
        var content =
        `<td>${i + 1}</td>
        <td class = "text-capitalize">${list[i].websiteName}</td>
        <td><a href="http://${list[i].Visit}" target="_blank" class="btn text-white"><i class="fa-solid fa-eye me-2"></i>Visit</a></td>
        <td><button class="btn text-white" onclick = "deleteTd(${i})"><i class="fa-solid fa-trash-can me-2"></i>Delete</button></td>`
        tableContent.innerHTML += content
    }

}
function deleteTd(index){
    sites.splice(index, 1)
    localStorage.setItem("sites", JSON.stringify(sites))
    showData(sites)
}

nameinput.addEventListener("keyup",()=>{
    if (rgx.nameinput.test(nameinput.value)) {
        if (nameinput.classList.contains("is-invalid")) {
            nameinput.classList.remove("is-invalid")
            nameinput.classList.add("is-valid")
        }


    }
    else{
        nameinput.classList.add("is-invalid")
    }
})
urlinput.addEventListener("keyup",()=>{
    if (rgx.urlinput.test(urlinput.value)) {
        if (urlinput.classList.contains("is-invalid")) {
            urlinput.classList.remove("is-invalid")
            urlinput.classList.add("is-valid")
        }

    }
    else{
        urlinput.classList.add("is-invalid")
    }
})

close.addEventListener("click",()=>{
    boxInfo.classList.replace("d-flex","d-none")
})
