import { switchMap,map } from 'rxjs/operators';
import { Component, OnInit, Input, HostBinding } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { FormGroup, FormArray, Validator, FormBuilder, Validators, FormControl, ValidatorFn } from '@angular/forms';
import { AlertService, UserService } from '../../../_services';

import { User, Language, Search, NativeOnline, QualifiedObject ,OnlineObject,ProfileObject,OfflineObject  } from '../../../_models';

@Component({
  selector: 'app-community',
  templateUrl: './community.component.html',
  styleUrls: ['./community.component.scss']
})
export class CommunityComponent implements OnInit {
    
  nativeOnlines: Array<OnlineObject> = []; 
  nativeQualified: Array<QualifiedObject> = []; 
  nativeOffline: Array<OfflineObject> = []; 
  user_setting:  Array<ProfileObject[]> = [] ;
  public maxRat: number = 10;
  public rate: number = 7;
  public overStar: number;
  public percent: number;    
  native: any; 
  lang_flag;
  lang_id;
  name : string;
  user_profile= [];
  profile= [];
   // user_setting= [];
   
    languages = []  ;
    showmodalcontent = false;
   constructor( private fb: FormBuilder,
                private route: ActivatedRoute,
                private router: Router,
                private userService: UserService) { }

   ngOnInit() {
      
     this.getNativeOnline();  //online  users  
     this.getNativeOffline(); //offline  users    
     this.getNativeQualified(); //qulaified users
   
  }
      getNativeOnline(){
          this.lang_id = this.route.snapshot.params.id
              this.userService
              .getNativeOnline(this.lang_id)
              .subscribe((data: Array<OnlineObject>) =>{
                this.nativeOnlines = data;
              }) 
            }
       
       getNativeQualified(){
          this
              .userService
              .getNativeQualified(this.lang_id)
              .subscribe((data: Array<QualifiedObject>) =>{
                this.nativeQualified = data;
              })
          }
    
        getNativeOffline(){
          this
              .userService
              .getNativeOffline(this.lang_id)
              .subscribe((data: Array<OfflineObject>) =>{
                this.nativeOffline = data;
              }) 
          }

        getUser(code: number){
            this.showmodalcontent = false;
                this.showmodalcontent = true;
                this.user_setting = [];
                this.userService
                .getUserProfile(code)
                .subscribe((data: any)  =>{
                     this.user_setting = data
                  });
                console.log(this.user_setting)
          }

   // RATINGS METHODS
    public hoveringOver(value: number): void {
        this.overStar = value;
       this.percent = 100 * (value / this.maxRat);
    };

    public resetStar(): void {
        this.overStar = void 0;
    }
      
}