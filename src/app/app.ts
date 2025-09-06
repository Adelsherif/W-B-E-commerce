import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './components/header/header';
import { MatIconModule } from '@angular/material/icon';
import { Footer } from "./components/footer/footer";
import { Navbar } from './components/navbar/navbar';
import { Login } from './pages/login/login';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, MatIconModule, Navbar ,Footer,Login],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('shop');
}
