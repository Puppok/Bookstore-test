import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { User } from '../shared/user.interface';
import { v4 as uuidv4 } from 'uuid'

@Component({
  selector: 'app-auth-page',
  templateUrl: './auth-page.component.html',
  styleUrls: ['./auth-page.component.scss']
})
export class AuthPageComponent implements OnInit {

  auth: FormGroup = new FormGroup({})

  ngOnInit(): void {
    this.auth = new FormGroup({
      login: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    })
    localStorage.setItem('Users', JSON.stringify([{login: 'admin', password: 'admin'}]))
  }

  private generateToken(): void {
    const token: string = uuidv4()
    localStorage.setItem('Token', token)
    // setTimeout(this.clearToken, 10000)
  }

  onSubmit() {    
    const findUser = this.loadData().find(user => {
      return user.login === this.auth.value.login && user.password === this.auth.value.password
    });
    console.log(findUser);
    
    if(findUser){
      this.generateToken();
    } else {
      this.auth.setErrors({invalid_data: true});
    }
  }

  loadData(): User[] {
    return JSON.parse(localStorage.getItem('Users') ?? '[]')
  }

  clearToken() {
    localStorage.removeItem('Token')
  }
}
