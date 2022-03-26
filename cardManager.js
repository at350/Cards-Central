// import data from "data.js";

let numCreatedCards = 0;

class Card{
    constructor(cardName, type, player, year, other, image="default.png"){
        this.cardName = cardName;
        this.other = other;
        this.type = type;
        this.player = player;
        if (typeof(year) != "number"){
            console.log("Invalid year");
        }
        this.year = year;
        this.image = image;
    }
}

let card = new Card("Honus Wagner Rare Card", "MLB", "Honus Wagner", 1910, "Very rare card");
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
    title.innerHTML = card.cardName;

    const type = newCard.querySelector("#card-type")
    type.innerHTML = "Type: ".bold() + card.type;
    const player = newCard.querySelector("#card-player")
    player.innerHTML = "Player: ".bold() + card.player;
    const year = newCard.querySelector("#card-year")
    year.innerHTML = "Year: ".bold() + card.year;
    const other = newCard.querySelector("#card-other")
    other.innerHTML = "Other: ".bold() + card.other;

    const cardIMG = newCard.querySelector(".card-img-top");
    cardIMG.src = card.image;

    numCreatedCards++;
}

function DeleteCard(buttonElement){
    const cardDiv = buttonElement.parentNode.parentNode;
    if (cardDiv.id != "cardTemplate"){
        cardDiv.remove();
    }
}

function EditCard(buttonElement){
    const cardDiv = buttonElement.parentNode.parentNode;

    if (cardDiv.id == "cardTemplate"){
        return;
    }

    // edit function
}

function processForm() {
    var data = new FormData();
    
    data.append("title", document.getElementById("cTit").value);
    data.append("type", document.getElementById("cType").value);
    data.append("player", document.getElementById("cPlayer").value);
    data.append("year", document.getElementById("cYear").value);
    data.append("msg", document.getElementById("msg").value);
    data.append("image", document.getElementById("imageUpload").value);

    // for (let [k, v] of data.entries()) {
    //     console.log(k +" "+v);   
    // }
    
    let temp = 0;
    // cardName, type, player, year, other = Object.values(data.entries);
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
    
    if (temp === 5)
    {
        // image = document.querySelector(card-img-top);
        // there will be multiple ---- this then???? just the below???
        image.src = "imgs/pattern1.jpeg";
    }
    // hopefully the above works

    console.log(cardName + " " + type +" "+player+" "+year+" "+other+" "+image.src);

    let testCard = new Card(cardName, type, player, year, other, image);
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

function openForm() {
    document.getElementById("myForm").style.display = "block";
}

function closeForm() {
    document.getElementById("myForm").style.display = "none";
}


// $("#profileImage").click(function(e) {
//     $("#imageUpload").click();
// });

// function fasterPreview( uploader ) {
//     if ( uploader.files && uploader.files[0] ){
//           $('#profileImage').attr('src', 
//              window.URL.createObjectURL(uploader.files[0]) );
//     }
// }

// $("#imageUpload").change(function(){
//     fasterPreview( this );
// });

