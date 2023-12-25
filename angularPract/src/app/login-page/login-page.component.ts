import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {


  public loginForm!: FormGroup
  constructor(private _fb:FormBuilder, private _http:HttpClient, private _router: Router) { }

  ngOnInit(): void {
     this.loginForm = this._fb.group({
       email : ['',[Validators.required,Validators.email]],
       password : ['',Validators.required],
     })
  }

  login(){
    this._http.get<any>('http://localhost:3000/signupusers')
    .subscribe(res=>{
      const user = res.find((a:any)=>{                //checking user exists or not
         return a.email === this.loginForm.value.email && a.password === this.loginForm.value.password
      });
      if (user){
        alert("Login SucessFull!");
        this.loginForm.reset();
        this._router.navigate(['dashboard'])
      }  
      else{
        alert('User Not Found!');
      }                  
    },err=>{
      alert("Something Went Wrong!")
    }
    )
  }
}
