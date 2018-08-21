import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import {debounceTime, distinctUntilChanged, switchMap} from 'rxjs/operators';
import { Router } from '@angular/router';
import { FormGroup, FormArray, Validator, FormBuilder, Validators, FormControl, ValidatorFn } from '@angular/forms';
import { AlertService, UserService } from '../../../_services';

import { User, Language, Search } from '../../../_models';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

    code;
    searches$: Observable<Search[]>;
    private searchTerms = new Subject<string>();
    
    
selectedCommunity: Search;
    
    
  constructor(private fb: FormBuilder,
                 private router: Router,
                 private userService: UserService) { }
    
    
    // Push a search term into the observable stream.
search(term: string): void {
this.searchTerms.next(term);
}

onSelect(search: Search): void {
    this.selectedCommunity = search;
          console.log(search)
  }

gotoCommunity(id: string): void {
    
        console.log(id.code)
        this.router.navigate(['/community',id.code]);
   
} 

    
ngOnInit(): void {
this.searches$ = this.searchTerms.pipe(
// wait 300ms after each keystroke before considering the term
debounceTime(300),

  // ignore new term if same as previous term
  distinctUntilChanged(),

  // switch to new search observable each time the term changes
  switchMap((term: string) => this.userService.searchLanguage(term)),
);
}
}
 

