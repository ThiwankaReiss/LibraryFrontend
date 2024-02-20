import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-view-all-books',
  standalone: true,
  imports: [HttpClientModule,FormsModule,CommonModule],
  templateUrl: './view-all-books.component.html',
  styleUrl: './view-all-books.component.css'
})
export class ViewAllBooksComponent implements OnInit{
  private http;
  public bookList:any;
  public selectedBook:any;

  constructor(private httpCient:HttpClient){
    this.http=httpCient;
  }
  ngOnInit(): void {
    this.loadBooks();
  }

  loadBooks(){
    this.http.get("http://localhost:8081/book/get").subscribe((data)=>{
      this.bookList=data;
      console.log(this.bookList);
    })
  }
  deleteBook(){
    this.http.delete(`http://localhost:8081/book/${this.selectedBook.id}`).subscribe((data)=>{
      console.log("deleted"+this.selectedBook.id);
      console.log(data);
      this.loadBooks();
      Swal.fire({
        title: "Deleted!",
        text: `${this.selectedBook.title} book is deleted`,
        icon: "success"
      });
      this.selectedBook=null;

      
    });
  }
  setSelectedBook(book :any){
    this.selectedBook=book;
    console.log(book.id);

  }

  saveBook(){
    let postApi="http://localhost:8081/book/add";
    this.http.post(postApi,this.selectedBook).subscribe((data)=>{
      console.log("saved");
      Swal.fire({
        title: "Updated!",
        text: `${this.selectedBook.title} book is updated`,
        icon: "success"
      });
      this.selectedBook=null;
    });
  }
}
