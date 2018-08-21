import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';


import { User, Language, Search, NativeOnline, RootObject } from '../_models';

@Injectable({
  providedIn: 'root'
})
export class UserService {
    constructor(private http: HttpClient ) { }
    
      url = 'http://127.0.0.1:8000';

    
    NativeOnline: Observable<RootObject[]>;
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
    
    getLanguage(){
        
         return this.http.get<Language[]>(this.url+'/api/lang');
    }
    searchLanguage(term: string): Observable<Search[]> {
    if (!term.trim()) {
      // if not search term, return empty hero array.
      return of([]);
    }
    return this.http.get<Search[]>(`${this.url}/api/auth/search_lang?search_lang=${term}`).pipe(
      //tap(_ => this.log(`found heroes matching "${term}"`)),
      //catchError(this.handleError<Search[]>('searchHeroes', []))
    );
  }
    
   getNativeOnline(id: string) {
       
     return this.http.get(`${this.url}/api/auth/nativeOnline/`+id);

   }
     getCommunityUserFullDetails(id: number) {
       
     return this.http.get(`${this.url}/api/auth/nativeOnline/fr`);

   }
    
    getPracticeFlags(){
        
       return this.http.get(`${this.url}/api/auth/practice_another_lang`); 
        
        
    }
}  
