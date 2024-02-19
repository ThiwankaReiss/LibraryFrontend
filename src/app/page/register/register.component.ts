import { Component ,OnInit} from '@angular/core';
import { HttpClient ,HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [HttpClientModule,FormsModule,CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit{
  private http;
  public countryList :any;
  public selectedCountry:any;

  public borrower={
    contact:null,
    userName:null,
    name:null,
    nic:null,
    email:null,
    address:null,
    password:null,
    country:null
  }

  constructor(private httpCient :HttpClient){
    this.http=httpCient;
  }
  ngOnInit(): void {
    this.loadCounries();
  }
  loadCounries() {
    let api="https://restcountries.com/v3.1/all";
    this.http.get(api).subscribe((res)=>{
      this.countryList=res;
      console.log(res);
    });
  }
  setSelectedCountry(country :any){
    
    this.selectedCountry=country;
    console.log( this.selectedCountry);
  }
  createBorrower(){
    this.borrower.country=this.selectedCountry;
    this.http.post("http://localhost:8080/borrower/add",this.borrower)
      .subscribe(data=>{
        console.log("done");
        this.setFieldsAsNull();
        Swal.fire({
          title: "Saved!",
          text: `${this.borrower.name} book is updated`,
          icon: "success"
        });
      });
  }
  setFieldsAsNull(){
    this.borrower.address=null;
    this.borrower.name=null;
    this.borrower.userName=null;
    this.borrower.contact=null;
    this.borrower.email=null;
    this.borrower.nic=null;
    this.borrower.password=null;
    this.borrower.country=null;
  }
  
}
