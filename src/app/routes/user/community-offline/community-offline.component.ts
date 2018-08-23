import { switchMap } from 'rxjs/operators';
import { Component, OnInit, Input, HostBinding } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { FormGroup, FormArray, Validator, FormBuilder, Validators, FormControl, ValidatorFn } from '@angular/forms';
import { AlertService, UserService } from '../../../_services';

import { User, Language, Search, NativeOffline, RootObjectt } from '../../../_models';

@Component({
  selector: 'app-community-offline',
  templateUrl: './community-offline.component.html',
  styleUrls: ['./community-offline.component.scss']
})
export class CommunityOfflineComponent implements OnInit {
    
 nativeOffline_off: RootObjectt[]; 
   native: any; 
    lang_flag_off;
    lang_id_off;
 
    showmodal_off = false;
    offline = false
   constructor(private fb: FormBuilder,
                private route: ActivatedRoute,
                 private router: Router,
                 private userService: UserService) { }

   ngOnInit() {
       
       
          this
              .userService
              .getNativeOffline(this.route.snapshot.params.id)
              .subscribe(data =>{
              if(data.nativeOffline.length >= 1){
                this.nativeOffline_off = data;
             this.lang_flag_off = data.nativeOffline[0].description;
             this.lang_id_off = data.nativeOffline[0].code;
                 // this.languages
              }
              
               //this.native.nativeOnline[0].description
            
              });
       
 
  }
    
            
               
   //this.router.navigate(['/community',code]);
   
}
    
  
      
}