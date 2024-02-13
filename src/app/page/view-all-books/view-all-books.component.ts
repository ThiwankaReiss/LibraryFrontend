import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';


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

  constructor(private httpCient:HttpClient){
    this.http=httpCient;
  }
  ngOnInit(): void {
    this.loadBooks();
  }

  loadBooks(){
    this.http.get("http://localhost:8080/book/get").subscribe((data)=>{
      this.bookList=data;
      console.log(this.bookList);
    })
  }
}
