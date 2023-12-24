var BookmarkNameInput=document.getElementById('BookmarkNameInput');
var siteURLInput=document.getElementById('siteURLInput');

var dialogBox=document.getElementById('dialogBox');

var bookList=[];

if(JSON.parse(localStorage.getItem('bookList'))!=null){
    bookList=JSON.parse(localStorage.getItem('bookList'));
    display();

}

function addBookmark(){

    if(bookNameValid() && bookURLValid()){
    var bookmark={
        bookName:BookmarkNameInput.value,
        siteURL:siteURLInput.value
    }

    bookList.push(bookmark);

    localStorage.setItem('bookList',JSON.stringify(bookList))
    clearData();

    display();

    BookmarkNameInput.classList.remove("is-valid");
    siteURLInput.classList.remove("is-valid");

    }else{
    dialogBox.showModal();
    }

}

function display(){
    var cartona='';
    for(var i=0;i<bookList.length;i++){
        cartona +=`
        <tr>
        <td>${i+1}</td>
        <td>${bookList[i].bookName}</td>
        <td>
            <a href="${bookList[i].siteURL}" target="_blank"
            class="btn btn-visit">
                <i class="fa-solid fa-eye pe-1"></i>
                Visit
            </a>
        </td>
        <td>
            <button onclick="remove(${i})" class="btn btn-delete">
                <i class="fa-solid fa-trash-can"></i>
                Delete
            </button>
        </td>
    </tr>
        `
    }

    document.getElementById('tbody').innerHTML=cartona;
}

function clearData(){
    BookmarkNameInput.value='';
    siteURLInput.value='';
}

function remove(index){
bookList.splice(index,1);
localStorage.setItem('bookList',JSON.stringify(bookList))

display();
}


//validtion
function bookNameValid(){
    var bookName=BookmarkNameInput.value;
    
    var regex=/[A-Za-z]{3,}/
    if(regex.test(bookName)){
        BookmarkNameInput.classList.remove("is-invalid");
        BookmarkNameInput.classList.add("is-valid");

        return true;
    }else{
        BookmarkNameInput.classList.remove("is-valid");
        BookmarkNameInput.classList.add("is-invalid");
        return false;
    }
}

function bookURLValid(){

    var siteURL=siteURLInput.value;
    
    var regex = /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&=]*)/


    if(regex.test(siteURL)){
        siteURLInput.classList.remove("is-invalid");
        siteURLInput.classList.add("is-valid");

        return true;
    }else{
        siteURLInput.classList.remove("is-valid");
        siteURLInput.classList.add("is-invalid");
        return false;
    }
}


function dialogClose(){
    dialogBox.close();
}