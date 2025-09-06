import { Component } from '@angular/core';
import { Footer } from "../../components/footer/footer";
import { RouterOutlet } from "@angular/router";
import { Navbar } from "../../components/navbar/navbar";

@Component({
  selector: 'app-auth',
  imports: [ Footer, RouterOutlet, Navbar],
  templateUrl: './auth.html',
  styleUrl: './auth.scss'
})
export class Auth {

}
