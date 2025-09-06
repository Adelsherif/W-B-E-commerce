import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from "@angular/router";
import { Authservices } from '../../core/services/authservices';
import { ProductsService } from '../../core/services/productsAPI/products.service';
import { CartProduct } from '../../core/interfaces/cart-product';

@Component({
  selector: 'app-login',
  imports: [ FormsModule,ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.scss'
})
export class Login {
  loading!:boolean;
  throwError!:boolean;
  loader!:boolean;
  email !:FormControl;
  password !:FormControl;
  userData !:FormGroup;

  constructor (private _authservices : Authservices , private router :Router) {
    this.initFormControl();
    this.initFormGroup();
  }



  initFormGroup(){
    this.userData = new FormGroup({
      email :this.email,
      password :this.password
    })
  }
    initFormControl(){
    this.email = new FormControl('',[Validators.required,Validators.email]),
    this.password =new FormControl('' ,[Validators.required,Validators.minLength(8)])
  }

  submit(){
    if(this.userData.valid ){
    this.loading = true;
      this._authservices.login(this.userData.value).subscribe ({
        next: (response) =>{
          this.loading = false;
        console.log(response)
        localStorage.setItem('token',response.token)
        this.router.navigate(['user/home'])
        } ,
        error: () =>  {
          this.throwError = true;
        },
    })

    }else{
      this.userData.markAllAsTouched();
    }
    console.log(this.userData.value);

  }

}
