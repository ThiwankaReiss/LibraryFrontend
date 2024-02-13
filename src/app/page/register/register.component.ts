import { Component ,OnInit} from '@angular/core';
import { HttpClient ,HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

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

}
