import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';


import { User } from '../_models';

@Injectable()
export class UserService {
    constructor(private http: HttpClient ) { }
    
      url = 'http://127.0.0.1:8000';

   
        /*
           let httpOptions = {
            headers: new HttpHeaders({
            'Content-Type': 'application/text'
        }) 
        };
        return this.http.get<User[]>('http://127.0.0.1:8000/api/get-details');
        */
    getAll() {
        return this.http.get<User[]>(this.url+'/api/user');
    }

    getById(id: number) {
        return this.http.get(this.url+'/api/users/' + id);
    }

    create(user: User) {
        return this.http.post(this.url+'/api/auth/signup', user);
    }

    update(user: User) {
        return this.http.put(this.url+'/api/users/' + user.id, user);
    }

    delete(id: number) {
        return this.http.delete(this.url+'/api/users/' + id);
    }
}  
