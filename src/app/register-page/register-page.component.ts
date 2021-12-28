import { FormGroup, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { debounceTime } from 'rxjs';
import { User } from '../shared/user.interface';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss']
})
export class RegisterPageComponent implements OnInit {

  register: FormGroup = new FormGroup({})
  users: User[] = []

  ngOnInit(): void {
    this.register = new FormGroup({
      login: new FormControl(''),
      password: new FormControl('')
    })
  }

  onSubmit() {
    const test = this.loadData()
    const user: User = {
      login: this.register.value.login,
      password: this.register.value.password
    }
    this.saveData([...test, user])
  }

  saveData(users: User[]) {
    localStorage.setItem('Users', JSON.stringify(users))
  }

  loadData() {
    const loaded: User[] = JSON.parse(localStorage.getItem('Users') ?? '[{}]')
    return loaded
  }
}
