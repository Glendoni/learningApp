import { switchMap } from 'rxjs/operators';
import { Component, OnInit, Input, HostBinding } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { FormGroup, FormArray, Validator, FormBuilder, Validators, FormControl, ValidatorFn } from '@angular/forms';
import { AlertService, UserService } from '../../../_services';

import { User, Language, Search, NativeOnline, RootObject } from '../../../_models';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
random_practice_suggestions ; 
    
  constructor(private userService: UserService) { }

  ngOnInit() {
      
       this
              .userService
              .getPracticeFlags()
              .subscribe(data =>
                this.random_practice_suggestions = data
              );
  }

}
