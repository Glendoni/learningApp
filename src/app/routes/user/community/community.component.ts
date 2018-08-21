import { switchMap } from 'rxjs/operators';
import { Component, OnInit, Input, HostBinding } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { FormGroup, FormArray, Validator, FormBuilder, Validators, FormControl, ValidatorFn } from '@angular/forms';
import { AlertService, UserService } from '../../../_services';

import { User, Language, Search, NativeOnline, RootObject } from '../../../_models';

@Component({
  selector: 'app-community',
  templateUrl: './community.component.html',
  styleUrls: ['./community.component.scss']
})
export class CommunityComponent implements OnInit {
    
nativeOnlines: RootObject[]; 
    
   constructor(private fb: FormBuilder,
                private route: ActivatedRoute,
                 private router: Router,
                 private userService: UserService) { }

   ngOnInit() {
       
       
          this
              .userService
              .getNativeOnline(this.route.snapshot.params.id)
              .subscribe((data: RootObject[]) =>{
                this.nativeOnlines = data
              });
  }
    
  
      
}