import { switchMap } from 'rxjs/operators';
import { Component, OnInit, Input, HostBinding } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { FormGroup, FormArray, Validator, FormBuilder, Validators, FormControl, ValidatorFn } from '@angular/forms';
import { AlertService, UserService } from '../../../_services';

import { User, Language, Search, NativeQualified, RootObject } from '../../../_models';

@Component({
  selector: 'app-community-qualified',
  templateUrl: './community-qualified.component.html',
  styleUrls: ['./community-qualified.component.scss']
})
export class CommunityQualifiedComponent implements OnInit {

nativeQualified_off: RootObject[]; 
   native: any; 
    lang_flag_q;
  lang_id_Q;
    user_profile_q= [];
    user_setting_q= [];
    languages_q = []  ;
    showmodal = false;
    offline = false
   constructor(private fb: FormBuilder,
                private route: ActivatedRoute,
                 private router: Router,
                 private userService: UserService) { }

   ngOnInit() {
       
       
          this
              .userService
              .getNativeQualified(this.route.snapshot.params.id)
              .subscribe((data: RootObject[]) =>{
              if(data.nativeQualified.length >= 1){
                this.nativeQualifieds = data;
             this.lang_flag_q = data.nativeQualified[0].description;
             this.lang_id_q = data.nativeQualified[0].code;
                 // this.languages
              }
              
               //this.native.nativeOnline[0].description
            
              });
       
 
  }
    
            getUser(code: number){
                console.log(code);
                this.showmodal = true;
                this.user_profile = [];
            this.userService
                .getUserProfile(code)
                .subscribe(data => {
                           this.user_profile_q = data.data[0];
                            this.user_setting_q = data.data[0].settings[0];
                this.languages_q = data.data[0].languages ;
                    console.log(data)
                })
               
   //this.router.navigate(['/community',code]);
   
}
    
  
      
}