<script src="https://www.gstatic.com/firebasejs/5.3.1/firebase.js"></script>
<script>
// Initialize Firebase
    var config = {
    apiKey: "AIzaSyCCMXrhXInv4KRB5IvbXGOSOmJF0zqwPm0",
    authDomain: "statofic.firebaseapp.com",
    databaseURL: "https://statofic.firebaseio.com",
    projectId: "statofic",
    storageBucket: "statofic.appspot.com",
    messagingSenderId: "121079879605"
    };
    firebase.initializeApp(config);
</script>

// Reference messages collections
var TitleRef = firebase.database().ref('Title');

// listen for form submit
document.getElementById('Form1').addEventListener('Submit', submitForm);

// Submit Form
function submitForm(e){
    e.preventDefault();
    var firebaseRef = firebase.database().ref();

// Get values
    var Title = getInputVal('Title');
    var namejournal = getInputVal('namejournal');
    var pubabstract = getInputVal('pubabstract');
    var pubplatform = getInputVal('pubplatform');
    var authors = getInputVal('authors');
    var x1 = getInputVal('x1');
    var x2 = getInputVal('x2');
    var x3 = getInputVal('x3');
    var x4 = getInputVal('x4');
    var x5 = getInputVal('x5');
    var x6 = getInputVal('x6');
    var x7 = getInputVal('x7');
    var x8 = getInputVal('x8');
    var x9 = getInputVal('x9');
    var x10 = getInputVal('x10');
    var DocumentType = getInputVal('DocumentType');
    var timetaken = getInputVal('timetaken');
    var areaofinterest = getInputVal('areaofinterest');
    var pubCountry = getInputVal('pubCountry');
    var userOrganisationName = getInputVal('userOrganisationName');
    var usercontact = getInputVal('usercontact');
    var userlinks = getInputVal('userlinks');

    saveTitle(Title,namejournal,pubabstract,pubplatform,authors,x1,x2,x3,x4,x5,x6,x7,x8,x9,x10,DocumentType,timetaken,areaofinterest,pubCountry,
        userOrganisationName,usercontact,userlinks)
}

// Function to get Form1 values

function getInputVal(id){
    return document.getElementById(id).value;

}

// Save the Title to firebase

function saveTitle(Title,namejournal,pubabstract,pubplatform,authors,x1,x2,x3,x4,x5,x6,x7,x8,x9,x10,DocumentType,timetaken,areaofinterest,pubCountry,
userOrganisationName,usercontact,userlinks){
    var NewTitleRef = TitleRef.push();
    NewTitleRef.set({
        Title: Title,
        namejournal:namejournal,
        pubabstract: pubabstract,
        pubplatform : pubplatform,
        authors: authors,
        x1 :x1,
        x2 :x2,
        x3 :x3,
        x4 :x4,
        x5 :x5,
        x6 :x6,
        x7 :x7,
        x8 :x8,
        x9 :x9,
        x10 :x10,
        DocumentType : DocumentType,
        timetaken :timetaken,
        areaofinterest:areaofinterest,
        pubCountry:pubCountry,
        userOrganisationName:userOrganisationName,
        usercontact:usercontact,
        userlinks:userlinks,

        
    });
}