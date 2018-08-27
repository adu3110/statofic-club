// Initialize App
/// using firebase or any other database

// Reference messages collections
var TitleRef = firebase.database().ref("Title");

var storageRef = firebase.storage().ref('Title');

var searchText = "";

function QueryDatabaseSearch(){

    document.querySelector(".alertSearch").style.display = "none";

    searchText = document.getElementById('namejournal').value;
    
    console.log(searchText);
    if(searchText==null || searchText==""){
        document.querySelector(".alertNone").style.display = "block";

        setTimeout(function(){
            document.querySelector(".alertNone").style.display = "none";
        }, 3000);
    } else {
        // Get values
        TitleRef.on('value', GotDataSearch, ErrData);
    }
    
    
}

//Function if data found
function GotDataSearch(data){
    var dataAll = data.val();
    var keys = Object.keys(dataAll);
    var dataFilt = [];
    for (var i =0; i < keys.length; i++){
        var k = keys[i];

        currTitle = dataAll[k].Title
        var words1 = searchText.split(/\s+/g);
        var words2 = currTitle.split(/\s+/g);
        var w1;
        var w2;
        var currCommonCount = 0;
        for (w1 = 0; w1 < words1.length; w1++) {
            for (w2 = 0; w2 < words2.length; w2++) {
                if (words1[w1].toLowerCase() == words2[w2].toLowerCase()) {
                    currCommonCount += 1;
                }
            }
        }

        if(currCommonCount > 0){
            currResult = dataAll[k];
            currResult.count = currCommonCount;
            dataFilt.push(currResult);
        }
    }

    var keysFilt = Object.keys(dataFilt);

    if(keysFilt.length === 0){
        document.querySelector(".alertNone").style.display = "block";

        setTimeout(function(){
            document.querySelector(".alertNone").style.display = "none";
        }, 3000);
    } else {
        PopulateSearchResults(dataFilt, 'search');
    }

    searchText = "";

}


var currButton = null;
// Submit Form
function QueryDatabaseButton(buttonVal){

    document.querySelector(".alertSearch").style.display = "none";
    
    console.log(buttonVal);
    // Get values
    currButton = buttonVal;
    TitleRef.on('value', GotDataButton, ErrData);
    
}

//Function if data found
function GotDataButton(data){
    var dataAll = data.val();
    var keys = Object.keys(dataAll);
    var dataFilt = [];
    for (var i =0; i < keys.length; i++){
        var k = keys[i];
        if(dataAll[k].areaofinterest == currButton){
            currResult = dataAll[k];
            dataFilt.push(currResult);
        }
    }

    
    if(dataFilt.length === 0){
        document.querySelector(".alertNone").style.display = "block";

        setTimeout(function(){
            document.querySelector(".alertNone").style.display = "none";
        }, 3000);
    }else {
        PopulateSearchResults(dataFilt, 'button');
    }

    currButton = null;
}

// Function On Error
function ErrData(err){
    console.log('Error!');
    return(err);
}

function PopulateSearchResults(data, type){

    document.querySelector(".alertSearch").style.display = "block";
    if(type == 'search'){
        data.sort(function(a,b){
            return(b.count - a. count)
        });
    }

    //console.log(data);
    var tableRes = document.getElementById("searchresults");

    for(var i = tableRes.rows.length - 1; i > 0; i--){
        tableRes.deleteRow(i);
    }

    for(var i=0; i<data.length; i++){
        var row = tableRes.insertRow(i+1);

        var btn = document.createElement('input');

        btn.type = "button";
        btn.className = "btn";
        btn.value = "Download File";
        btn.onclick = (function(Title) {return function() {DownloadFile(Title);}})(data[i].Title);

        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        var cell3 = row.insertCell(2);
        var cell4 = row.insertCell(3);
        var cell5 = row.insertCell(4);
        var cell6 = row.insertCell(5);
        var cell7 = row.insertCell(6);
        var cell8 = row.insertCell(7);
        var cell9 = row.insertCell(8);

        cell1.innerHTML = data[i].Title;
        cell2.innerHTML = data[i].authors;
        cell3.innerHTML = data[i].namejournal;
        cell4.innerHTML = data[i].languagesUsed;
        cell5.innerHTML = data[i].userOrganisationName;
        cell6.innerHTML = data[i].pubCountry;
        cell7.innerHTML = data[i].DocumentType;
        cell8.innerHTML = data[i].pubabstract;
        cell9.appendChild(btn);

    }

}

function DownloadFile(Title){
    storageRef.child(Title).getDownloadURL().then(function(url) {
        
        console.log(url)
      
        // This can be downloaded directly:
        var xhr = new XMLHttpRequest();
        xhr.responseType = 'blob';
        xhr.onload = function(event) {
            if (this.status == 200) {
                // Create a new Blob object using the response data of the onload object
                var blob = new Blob([this.response], {type: 'image/pdf'});
                //Create a link element, hide it, direct it towards the blob, and then 'click' it programatically
                let a = document.createElement("a");
                a.style = "display: none";
                document.body.appendChild(a);
                //Create a DOMString representing the blob and point the link element towards it
                let url = window.URL.createObjectURL(blob);
                a.href = url;
                a.download = 'myFile.pdf';
                //programatically click the link to trigger the download
                a.click();
                //release the reference to the file by revoking the Object URL
                window.URL.revokeObjectURL(url);
            }else{
                //deal with your error state here
                console.log(error);
            }
          //var blob = xhr.response;
        };
        xhr.open('GET', url);
        xhr.send();
      
        // Or inserted into an <img> element:
      }).catch(function(error) {
        // Handle any errors
        console.log(error);
        document.querySelector(".alertNone").style.display = "block";

        setTimeout(function(){
            document.querySelector(".alertNone").style.display = "none";
        }, 3000);
      });
}