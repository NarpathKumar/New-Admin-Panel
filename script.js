console.clear();
var url = 'http://www.filltext.com/?rows=32&id=%7Bnumber%7C1000%7D&firstName=%7BfirstName%7D&lastName=%7BlastName%7D&email=%7Bemail%7D&phone=%7Bphone%7C(xxx)xxx-xx-xx%7D&address=%7BaddressObject%7D&description=%7Blorem%7C32%7D';
var tbody = $('tbody');
var dataRow = $('.data-row');
var prevRow;
var latestArray = [];

function createTable(c1,c2,c3,c4,c5){
    var tr = $('<tr>').addClass('data-row');
    var td1 = $('<td>').addClass('column1').text(c1);
    var td2 = $('<td>').addClass('column2').text(c2);
    var td3 = $('<td>').addClass('column3').text(c3);
    var td4 = $('<td>').addClass('column4').text(c4);
    var td5 = $('<td>').addClass('column5').text(c5);
    tr.append(td1,td2,td3,td4,td5)
    tr.click(function(){
    var id = this.children[0].innerHTML;
        if(prevRow === undefined) {
            this.classList.add("active")
            for(var i=0; i<latestArray.length; i++){
               if(latestArray[i].id == id){
                    $('#top-name').text(latestArray[i].firstName + " " + latestArray[i].lastName)
                    $('#desc-of').val(latestArray[i].description);
                    $('#add').text(latestArray[i].address.streetAddress);
                    $('#city').text(latestArray[i].address.city);
                    $('#state').text(latestArray[i].address.state);
                    $('#zip').text(latestArray[i].address.zip);
                }
            }
            prevRow = this;
        }
        else if(prevRow != this){
            this.classList.add("active");
            prevRow.classList.remove("active");
            for(var i=0; i<latestArray.length; i++){
                if(latestArray[i].id == id){
                    $('#top-name').text(latestArray[i].firstName + " " + latestArray[i].lastName)
                    $('#desc-of').val(latestArray[i].description);
                    $('#add').text(latestArray[i].address.streetAddress);
                    $('#city').text(latestArray[i].address.city);
                    $('#state').text(latestArray[i].address.state);
                    $('#zip').text(latestArray[i].address.zip);
                 }
             }
            prevRow = this;
        }
        else if(prevRow === this) alert("Same Element")
    })

    return tr;
}

$.get("http://www.filltext.com/?rows=32&id=%7Bnumber%7C1000%7D&firstName=%7BfirstName%7D&lastName=%7BlastName%7D&email=%7Bemail%7D&phone=%7Bphone%7C(xxx)xxx-xx-xx%7D&address=%7BaddressObject%7D&description=%7Blorem%7C32%7D",function(e){
    for(var i=0; i<e.length; i++) {
        latestArray.push(e[i]);
    }
    for(var i=0; i<e.length; i++){
            tbody.append(createTable(e[i].id, e[i].firstName, e[i].lastName, e[i].email, e[i].phone));
        }
})
// var newArr = [];
// $('#search-box').on({
//     'input': function(e){
//         var tbody = $('tbody')[0];
//         // if(e.target.value === undefined || e.target.value === ""){
//         //     for(var i=0; i<tbody.childElementCount; i++){
//         //         if(tbody.children[0].classList.contains('visibles')) {continue}
//         //         else tbody.children[0].classList.add('visibles')
//         //     }
//         // }
//         var input = e.target.value;
//         var pattern = new RegExp("("+input+")","i");
//        for(var i=0; i<latestArray.length; i++){
//            var fullWord = latestArray[i].firstName + " " + latestArray[i].lastName;
//             if(pattern.test(fullWord)) {
//                 var id = latestArray[i].id;
//                 for(var i=0; i<tbody.childElementCount; i++){
//                     if(tbody.children[i].children[0].innerText == id){
//                         console.log("ohkay")
//                         //  if(tbody.children[0].classList.contains('visibles')) {console.log("Ohkay")}
//                         //  else tbody.children[0].classList.add('visibles')
//                     }
//                     else console.log("NOT OHKAY")
//                 }
//             }
//         }
// }
// });
// console.log(newArr)

var newArr = []

$('#search-box').on({
    'input': function(e){
        var tbody = $('tbody')[0];
            for(var k=0; k<tbody.childElementCount; k++){
                tbody.children[k].style.display = "table-row"
            }
        var dummy = []
        var input = e.target.value.trim(" ");
        var pattern = new RegExp("("+input+")","i");;
        for(var i=0; i<latestArray.length; i++){
            var fullWord = latestArray[i].firstName + " " + latestArray[i].lastName;
            if(pattern.test(fullWord)){
                var id = latestArray[i].id;
                dummy.push(id);
                console.log(dummy,"dummy")
            }
            newArr = dummy
        }
        for(var i=0; i<newArr.length; i++){
            for(var j=0; j<tbody.childElementCount; j++){
                if(tbody.children[j].children[0].innerText == newArr[i]){
                    tbody.children[j].style.display = "table-row"
                }
                else tbody.children[j].style.display = "none"
            }
        }
    }
})