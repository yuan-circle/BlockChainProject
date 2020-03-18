window.onload = init;
function init(){
    var button = document.getElementById("addEstateName");
    button.onclick = handleButtonClick;
}
function handleButtonClick(){
    var name = document.getElementById("estateName").value;
    var date = document.getElementById("estateDate").value;
    alert("name is:" + name + ", date is:" + date );
}
