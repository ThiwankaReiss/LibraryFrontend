import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-all-borrowers',
  standalone: true,
  imports: [HttpClientModule,FormsModule,CommonModule],
  templateUrl: './view-all-borrowers.component.html',
  styleUrl: './view-all-borrowers.component.css'
})
export class ViewAllBorrowersComponent {
  private http;
  public borrowerList:any;
  public selectedBorrower:any;


  constructor(private httpCient:HttpClient){
    this.http=httpCient;
  }
  ngOnInit(): void {
    this.loadBorrowers();
  }
  loadBorrowers(){
    this.http.get("http://localhost:8081/borrower/get").subscribe((data)=>{
      this.borrowerList=data;
      console.log(this.borrowerList);
    })
  }
  deleteBorrower(){
    this.http.delete(`http://localhost:8081/borrower/${this.selectedBorrower.id}`).subscribe((data)=>{
      console.log("deleted"+this.selectedBorrower.id);
      console.log(data);
      this.loadBorrowers();
      Swal.fire({
        title: "Deleted!",
        text: `${this.selectedBorrower.name} book is deleted`,
        icon: "success"
      });
      this.selectedBorrower=null;

      
    });
  }
  setSelectedBorrower(borrower :any){
    this.selectedBorrower=borrower;
    console.log(borrower.id);

  }

  saveBorrower(){
    let postApi="http://localhost:8081/borrower/add";
    this.http.post(postApi,this.selectedBorrower).subscribe((data)=>{
      console.log("saved");
      Swal.fire({
        title: "Updated!",
        text: `${this.selectedBorrower.title} book is updated`,
        icon: "success"
      });
      this.selectedBorrower=null;
    });
  }
  
}
