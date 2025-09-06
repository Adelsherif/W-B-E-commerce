import { AbstractControl, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink } from "@angular/router";
import { Authservices } from '../../core/services/authservices';
import { Authinterface } from '../../core/interfaces/authinterface';

@Component({
  selector: 'app-register',
  imports: [RouterLink ,FormsModule,ReactiveFormsModule],
  templateUrl: './register.html',
  styleUrl: './register.scss'
})
export class Register {

  constructor (private _authservices:Authservices,private router : Router){
    this.initFormControl();
    this.initFormGroup();
  }

  name !: FormControl;
  email !: FormControl;
  password !: FormControl;
  rePassword !: FormControl;
  phone !: FormControl;
  allData !: FormGroup;
  responseValue !:string;
  completed :boolean =false;
  loading !:boolean ;
  isSubmitted: boolean = false;


  initFormControl(){
    this.name = new FormControl('',
      [Validators.required,Validators.minLength(3),Validators.maxLength(7)]);

      this.email = new FormControl( '',[
        Validators.required,
        Validators.email
      ])
    this.password = new FormControl( '',[
        Validators.required,
        Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)
      ]);
    this.rePassword = new FormControl('', [
        Validators.required,
        Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/),
        this.matchPassword(this.password)
      ]);
        this.phone = new FormControl('' ,  [
        Validators.required,
        Validators.pattern(/^01[0-2,5][0-9]{8}$/)
      ]);
  }

  initFormGroup() {
    this.allData = new FormGroup({
      name :this.name,
      email :this.email,
      password :this.password,
      rePassword :this.rePassword,
      phone :this.phone,
    })
  }

  matchPassword (pass :AbstractControl){
    return (rePass : AbstractControl) =>{
    if(pass.value !== rePass.value){
      return { matchPassword:true }
    }
    else{
      return null
    }
    }
  }
  submit(){
    this.allData.markAllAsTouched();
    console.log(this.allData.controls);


    if(this.allData.valid){
      this.isSubmitted = true;
      this.regesterationApi(this.allData.value);
    }
    else{
    console.log(this.allData.value);
    }
  }

  regesterationApi (data:Authinterface) {
    this.loading = true; //it to change button of register
    this._authservices.register(data).subscribe({
      next: (response) => {
        this.allDone("All Do, your Account has been created,");
        localStorage.setItem('token',response.token)
        const { email , password } = data;
        this._authservices.login({email , password}).subscribe({ //to enter user to hom direct after first rgister
          next: () => this.router.navigate(['user/home'])
      })
      },
      error : () => this.allDone("Error,Error"),
      complete : () => this.loading = false
    }
    )
  }

  allDone(resp:string) {
    console.log(resp);
    this.responseValue = resp;
    return this.completed = true;
  }
}
