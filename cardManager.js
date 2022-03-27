// import data from "data.js";

let numCreatedCards = 0;
let cardIDInfo = {};

let editCardCaller = "";

class Card{
    constructor(cardName, type, player, year, other, image="default.png"){
        this.cardName = cardName;
        this.other = other;
        this.type = type;
        this.player = player;
        this.year = year;
        this.image = image;
    }
}

let card = new Card("Honus Wagner Rare Card", "MLB", "Honus Wagner", 1910, "Extemely Valuable. ~$6.6 Million", "honus_wagner.jpg");
let card2 = new Card("Athlete Common Card", "League", "Athlete", 1945, "I love this athlete!");

(function(window, document, undefined){
    window.onload = init;
    
      function init(){
        const fileDiv = document.getElementById("cards-div");
        const cardTemplate = fileDiv.querySelector(".cardTemplate");

        CreateNewCard(card);
        CreateNewCard(card2);
        numCreatedCards++;
      }
    
    })(window, document, undefined);


function CreateNewCard(card){
    const fileDiv = document.getElementById("cards-div");
    const cardTemplate = fileDiv.querySelector(".cardTemplate");

    const newCard = cardTemplate.cloneNode(true);
    fileDiv.appendChild(newCard);
    newCard.id = "card" + numCreatedCards.toString();

    const title = newCard.querySelector(".card-title");
    title.innerHTML = card.cardName.bold();

    const type = newCard.querySelector("#card-type")
    type.innerHTML = "Type: ".bold() + card.type;
    const player = newCard.querySelector("#card-player")
    player.innerHTML = "Player: ".bold() + card.player;
    const year = newCard.querySelector("#card-year")
    year.innerHTML = "Year: ".bold() + card.year;
    const other = newCard.querySelector("#card-other")
    other.innerHTML = "Other: ".bold() + card.other;

    var image = document.querySelector("#img-preview")
    const cardIMG = newCard.querySelector(".card-img-top");
    
    const button = newCard.querySelector(".btn btn-outline-success btn-sm")
    // button.id = "edit-button"+numCreatedCards.toString();
    const imageInput = document.getElementById("imageUpload");
    console.log(imageInput.value);

    if (imageInput.value != ""){
        cardIMG.src = image.src;
        console.log("Valid image")
    }
    else{
        cardIMG.src = card.image;
        console.log(card.image)
    }

    cardIDInfo[newCard.id] = card;

    image.src = ""
    numCreatedCards++;
}
function previewFile(event) {
    var image = document.querySelector("#img-preview");
    image.src = URL.createObjectURL(event.target.files[0]);
}

function DeleteCard(buttonElement){
    const cardDiv = buttonElement.parentNode.parentNode;
    if (cardDiv.id != "cardTemplate"){
        cardIDInfo.remove(cardDiv.id);
        cardDiv.remove();
    }
}

function EditCard(){
    const cardDiv = editCardCaller;

    if (cardDiv.id == "cardTemplate"){
        return; 
    }
    console.log(cardIDInfo);

    current_card = cardIDInfo[cardDiv.id]
    console.log(cardDiv.id);
    console.log(current_card);





    closeEditForm();
}

function processForm() {
    var data = new FormData();
    
    data.append("title", document.getElementById("cTit").value);
    data.append("type", document.getElementById("cType").value);
    data.append("player", document.getElementById("cPlayer").value);
    data.append("year", document.getElementById("cYear").value);
    data.append("msg", document.getElementById("msg").value);
    data.append("image", document.getElementById("imageUpload").value);

    temp = 0;
    for (let [k, v] of data.entries())
    {
        switch(temp){
            case 0:
                cardName = v;
                break;
            case 1:
                type = v;
                break;
            case 2:
                player = v;
                break;
            case 3:
                year = v;
                break;
            case 4:
                other = v;
                break;
            case 5:
                image = v;
                break;
        }
        temp++;
    }
    console.log(cardName + " " + type +" "+player+" "+year+" "+other+" ");

    let testCard = new Card(cardName, type, player, year, other);
    CreateNewCard(testCard);

    // clear input field
    document.getElementById("cTit").value = "";
    document.getElementById("cType").value = "";
    document.getElementById("cPlayer").value = "";
    document.getElementById("cYear").value = "";
    document.getElementById("msg").value = "";
    document.getElementById("imageUpload").value = "";

    closeForm();

    return false;
}

function ValidateImage(path) {
    var extension = path.substring(path.lastIndexOf('.') + 1).toLowerCase();
    console.log(extension);

    if (extension == "gif" || extension == "png" || extension == "bmp" || extension == "jpeg" || extension == "jpg")
    {
        return true;
    }
    else
    {
        console.log("Invalid image file")
        return false;
    }
}

function openForm() {
    document.getElementById("myForm").style.display = "block";
}

function closeForm() {
    document.getElementById("myForm").style.display = "none";
    document.getElementById("cTit").value = "";
    document.getElementById("cType").value = "";
    document.getElementById("cPlayer").value = "";
    document.getElementById("cYear").value = "";
    document.getElementById("msg").value = "";
    document.getElementById("imageUpload").value = "";
}

function openEditForm(buttonElement){
    const cardDiv = buttonElement.parentNode.parentNode;

    if (cardDiv.id == "cardTemplate"){
        return;
    }
    document.getElementById("editform").style.display = "block";
    editCardCaller = cardDiv;
}

function closeEditForm(){
    document.getElementById("editform").style.display = "none";
    document.getElementById("cTitE").value = "";
    document.getElementById("cTypeE").value = "";
    document.getElementById("cPlayerE").value = "";
    document.getElementById("cYearE").value = "";
    document.getElementById("msgE").value = "";
    document.getElementById("imageUploadE").value = "";
}

