import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  public signupForm !: FormGroup;
  constructor(private _fb:FormBuilder, private _http: HttpClient, private _router:Router) { }

  ngOnInit(): void {
    this.signupForm = this._fb.group({
      fullName : ['',Validators.required],
      email : ['',[Validators.required,Validators.email]],
      password : ['',Validators.required],
      mobile : ['',Validators.required],
    })
  }
   
  get f(){
    return this.signupForm.controls;
  }

  signUp(){
    this._http.post<any>('http://localhost:3000/signupusers',this.signupForm.value)
    .subscribe(_res=>{
      alert("SignUp Successfully!");
      this.signupForm.reset();
      this._router.navigate(['login']);
    },
    _err=>{
      alert("Something Went Wrong!")
    }
    )
  }

}
