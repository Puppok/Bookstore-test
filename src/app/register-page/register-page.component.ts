import { FormGroup, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { debounceTime } from 'rxjs';
import { User } from '../shared/user.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss']
})
export class RegisterPageComponent implements OnInit {

  register: FormGroup = new FormGroup({})
  users: User[] = []
  isInvalid: boolean = false

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.register = new FormGroup({
      login: new FormControl(''),
      password: new FormControl('')
    })
    localStorage.setItem('Users', JSON.stringify([{login: 'admin', password: 'admin'}]))
  }

  onSubmit() {
    const test = this.loadData()
    if(this.register.value.login || this.register.value.password != '') {
      const user: User = {
        login: this.register.value.login,
        password: this.register.value.password
      }
      this.saveData([...test, user])
      this.router.navigateByUrl('/auth')
    } else {
      this.isInvalid = true
      setTimeout(() => {this.isInvalid = false}, 1000)      
    }
  }

  saveData(users: User[]) {
    localStorage.setItem('Users', JSON.stringify(users))
  }

  loadData() {
    const loaded: User[] = JSON.parse(localStorage.getItem('Users') ?? '[{}]')
    return loaded
  }
}
