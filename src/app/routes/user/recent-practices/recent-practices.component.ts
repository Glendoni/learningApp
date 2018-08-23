import { Component, OnInit, Input, HostBinding } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { FormGroup, FormArray, Validator, FormBuilder, Validators, FormControl, ValidatorFn } from '@angular/forms';
import { AlertService, UserService } from '../../../_services';

@Component({
  selector: 'app-recent-practices',
  templateUrl: './recent-practices.component.html',
  styleUrls: ['./recent-practices.component.scss']
})
export class RecentPracticesComponent implements OnInit {

recently_practices: any;    
    
  constructor(private userService: UserService,   private router: Router) { }

  ngOnInit() {
       this.userService
              .getRecentlyPracticed()
              .subscribe(data =>
                this.recently_practices = data);
    
  }
    
    gotoCommunity(id: string): void {
    
        console.log(id);
        this.router.navigate(['/community',id]);
   
} 
      
}