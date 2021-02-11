class Book{

    constructor(title , author , isbn , id){
     
      this.title = title;
      this.author = author;
      this.isbn = isbn;
      this.id = id;


    }

}

class UI{

   addbookToList(book){

    const list = document.querySelector('.book-list');

    const row = document.createElement('tr');
     

    row.innerHTML = `
      <td>${book.title}</td>
      <td>${book.author}</td>
      <td>${book.isbn}</td>
      <td><a href="#" class="delete">X</a></td>
      <td>
      <td><a href="#" class=${book.id}><i class="fa fa-pencil update"></i></a></td>
      <td> `;

      list.appendChild(row);
    

   }

   showAlert(message , className){
       
    const div = document.createElement('div');

    div.className = `alert ${className}`;

    div.appendChild(document.createTextNode(message));

    const container = document.querySelector('.container');
    const form = document.querySelector('#book-form');

    container.insertBefore(div , form);

//set time out
    setTimeout(function(){

        document.querySelector('.alert').remove();


  }, 2000);

   }

   deleteBook(target){

    if( target.className === 'delete'){
        target.parentElement.parentElement.remove();
        
    }


   }

   updateBook(target)
      
   {
    
    document.getElementById('title').value = target.childNodes[1].innerHTML;
    document.getElementById('author').value = target.childNodes[3].innerHTML;
    document.getElementById('isbn').value = target.childNodes[5].innerHTML;
    // const isbn  =  target.childNodes[5].innerHTML;
    document.getElementById('submit').value = 'UPDATE';
    // const books = store.getBooks();
    // console.log(books);
    // books.map((book)=>{
    //    console.log(book);
    //     if(book.isbn === isbn){
            
    //         book.title = target.childNodes[1].innerHTML;
    //         book.author = target.childNodes[3].innerHTML;


    //      }
      
    // });
    // localStorage.setItem('books', JSON.stringify([]));
    //  localStorage.setItem('books' , JSON.stringify(books));
        
     // store.displayBooks();
    

    }


   clearFields(){

    document.getElementById('title').value = '';
    document.getElementById('author').value = '';
    document.getElementById('isbn').value = '';



   }



}


//Local Storage

  class store{
     
    static getBooks(){

        let books;
        if(localStorage.getItem('books') === null){

            books = [];

        }
        else{
          
            books = JSON.parse(localStorage.getItem('books'));

        }
         return books;


     }

    static displayBooks(){

        const books = store.getBooks();

        books.forEach(function(book){

         const ui = new UI();


         //add book to ui

         ui.addbookToList(book);

        })

     }

    static  addBooks(book){

        const books = store.getBooks();

        books.push(book);

        localStorage.setItem('books' , JSON.stringify(books));



     }

    static removeBooks(isbn){
       
         const books = store.getBooks();

         books.forEach(function(book , index){

          if(book.isbn === isbn){
            
             books.splice(index , 1);

          }

         });
         localStorage.setItem('books' , JSON.stringify(books));

     }

  }


  // Dom content loaded

  document.addEventListener('DOMContentLoaded' , store.displayBooks);

//event for add book
document.getElementById('book-form').addEventListener('submit' , function(e){

    const  title = document.getElementById('title').value;
    const  author = document.getElementById('author').value;
    const  isbn = document.getElementById('isbn').value;
    const id = document.getElementById('id').value;

        const ui = new UI();

      const book = new Book(title , author, isbn , id);

      //validate
      if( title === '' || author === '' || isbn === '')
         {

          ui.showAlert('Please Fill in All Fields', 'error');

         }
    else
    {

      ui.addbookToList(book);


      store.addBooks(book);


      ui.showAlert('Book Added!' , 'sucess');  
      
      ui.clearFields();
  
    }

e.preventDefault();
});

//delete book
document.querySelector('.book-list').addEventListener('click' , function(e){

 const ui = new UI();

  if(e.target.className ==='delete'){

    ui.deleteBook(e.target);

    store.removeBooks(e.target.parentElement.previousElementSibling.textContent);

    ui.showAlert('Book Deleted!', 'sucess');

    ui.clearFields();
 
 }

e.preventDefault();

})

//update book
document.querySelector('.book-list').addEventListener('click', function (e) {




    const book = new Book(title, author, isbn , id);
      const ui = new UI();

    if(e.target.classList.contains('update')){

       

        ui.updateBook(e.target.parentElement.parentElement.parentElement);

    
    }

 


        e.preventDefault();
          
  
    });
    

