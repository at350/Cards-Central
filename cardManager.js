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

let card1 = new Card("Honus Wagner Rare Card", "MLB", "Honus Wagner", 1910, "Extemely Valuable. ~$6.6 Million", "honus_wagner.jpg");
let card2 = new Card("Athlete Common Card", "League", "Athlete", 1945, "I love this athlete!");
let card3 = new Card("Michael Jordan Card", "NBA", "Michael Jordan", 1994, "Extremely Valuable! Jordan is such an amazing athlete!", "michael_jordan.jpeg");

(function(window, document, undefined){
    window.onload = init;
    
      function init(){
        const fileDiv = document.getElementById("cards-div");
        const cardTemplate = fileDiv.querySelector(".cardTemplate");

        CreateNewCard(card1);
        CreateNewCard(card3);
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
        card.image = image.src
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

function previewFileE(event) {
    var image = document.querySelector("#img-previewE");
    image.src = URL.createObjectURL(event.target.files[0]);
}

function DeleteCard(buttonElement){
    const cardDiv = buttonElement.parentNode.parentNode;
    if (cardDiv.id != "cardTemplate"){
        delete cardIDInfo[cardDiv.id];
        cardDiv.remove();
    }
}

function EditCard(){
    const cardDiv = editCardCaller;

    if (cardDiv.id == "cardTemplate"){
        return; 
    }
    current_card = cardIDInfo[cardDiv.id]
    console.log(current_card);

    const editForm = document.getElementById("editform");
    const editedTitle = editForm.querySelector("#cTitE").value;
    const editedType = editForm.querySelector("#cTypeE").value;
    const editedPlayer = editForm.querySelector("#cPlayerE").value;
    const editedYear = editForm.querySelector("#cYearE").value;
    const editedOther = editForm.querySelector("#cOtherE").value;
    const editedImageInput = document.getElementById("imageUploadE");

    const editedImagePreview = document.getElementById("img-previewE");
    console.log(editedImagePreview);
    if (editedTitle != ""){
        cardDiv.querySelector(".card-title").innerHTML = editedTitle.bold();
        current_card.cardName = editedTitle;
    }
    if (editedType != ""){
        cardDiv.querySelector("#card-type").innerHTML = "Type: ".bold() + editedType;
        current_card.type = editedType;
    }
    if (editedPlayer != ""){
        cardDiv.querySelector("#card-player").innerHTML = "Player: ".bold() + editedPlayer;
        current_card.player = editedPlayer;
    }
    if (editedYear != ""){
        cardDiv.querySelector("#card-year").innerHTML = "Year: ".bold() + editedYear;
        current_card.year = editedYear;
    }
    if (editedOther != ""){
        cardDiv.querySelector("#card-other").innerHTML = "Other: ".bold() + editedOther;
        current_card.other = editedOther;
    }

    if (editedImageInput.value != ""){
        cardDiv.querySelector(".card-img-top").src = editedImagePreview.src;
        current_card.image = editedImagePreview.src;
    }

    editedImagePreview.src = "";

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
    document.getElementById("myForm").style.visibility = "visible";
    document.getElementById("myForm").style.opacity = "1";
}

function closeForm() {
    document.getElementById("cTit").value = "";
    document.getElementById("cType").value = "";
    document.getElementById("cPlayer").value = "";
    document.getElementById("cYear").value = "";
    document.getElementById("msg").value = "";
    document.getElementById("imageUpload").value = "";
    document.getElementById("myForm").style.visibility = "hidden";
    document.getElementById("myForm").style.opacity = "0";
}

function openEditForm(buttonElement){
    const cardDiv = buttonElement.parentNode.parentNode;
    if (cardDiv.id == "cardTemplate"){
        return;
    }

    var ccard = cardIDInfo[cardDiv.id];

    const editForm = document.getElementById("editform");
    editForm.querySelector("#cTitE").placeholder = ccard.cardName;
    editForm.querySelector("#cTypeE").placeholder = ccard.type;
    editForm.querySelector("#cPlayerE").placeholder = ccard.player;
    editForm.querySelector("#cYearE").placeholder = ccard.year;
    editForm.querySelector("#cOtherE").placeholder = ccard.other;


    // document.getElementById("editform").style.display = "block";

    document.getElementById("editform").style.visibility = "visible";
    document.getElementById("editform").style.opacity = "1";
    editCardCaller = cardDiv;
}

function closeEditForm(){
    document.getElementById("cTitE").value = "";
    document.getElementById("cTypeE").value = "";
    document.getElementById("cPlayerE").value = "";
    document.getElementById("cYearE").value = "";
    document.getElementById("cOtherE").value = "";
    document.getElementById("imageUploadE").value = "";
    document.getElementById("editform").style.visibility = "hidden";
    document.getElementById("editform").style.opacity = "0";
}

