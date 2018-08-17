import { Component, OnInit,ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormArray, Validator, FormBuilder, Validators, FormControl, ValidatorFn } from '@angular/forms';


import { CustomValidators } from 'ng2-validation';
import { first } from 'rxjs/operators';
import { AlertService, UserService } from '../../../_services';



@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class SignupComponent implements OnInit {
    
    
    clickMessage = '';
    
    box = 0;

  onClickMe(event : any) {
      
      if(event.target.id ==1){
      if(event.target.id ==1 & this.box == 0){
          this.box = 1;  
          this.addPrac();
      }else{
         
          this.removedPrac(0);
          
      }
          console.log(this.box);
          
       console.log(event.target.id )
        if ( event.target.checked ) {
        }
    }
      
      //this.removedPrac(0) 
 // value ?  '' : this.addPrac(0)
    this.clickMessage = 'You are my hero!';
  }
 loading = false;
    alias = true;
     public value: any = {};
    public _disabledV: string = '0';
    public disabled: boolean = false;

    // timepicker
    public hstep: number = 1;
    public mstep: number = 15;
    public ismeridian: boolean = true;
    public isEnabled: boolean = true;

    public mytime: Date = new Date();
    public options: any = {
        hstep: [1, 2, 3],
        mstep: [1, 5, 10, 15, 25, 30]
    };
    
     dt;
    
    
       itemss=[];
    ittems;
    prac;
    
    regForm: FormGroup;
    
     items = [
    {key: 1, text: ' Practice a language'},
    {key: 2, text: ' Help people to practice thier spoken language'},
    {key: 3, text: ' I am a professional teacher'},
  ];

    submitted = false;
    nextform= false;

languageSpokenLevels = [{
 id: '1',
 text: 'Beginer',
 
},
{
 id: '2',
 text: 'Intermediate',
 
},
{
 id: '3',
 text: 'Fluent',
  
}]
    constructor(private fb: FormBuilder,
                 private router: Router,
                 private userService: UserService,
                 private alertService: AlertService) {

      
         // create checkbox group
    let checkboxGroup = new FormArray(
      this.items.map(item => new FormGroup({
      id: new FormControl(item.key),
      text: new FormControl(item.text),
      checkbox: new FormControl(false)
    }))
    );

    // create a hidden reuired formControl to keep status of checkbox group
    let hiddenControl = new FormControl(this.mapItems(checkboxGroup.value), Validators.required);
    // update checkbox group's value to hidden formcontrol
    checkboxGroup.valueChanges.subscribe((v) => {
      hiddenControl.setValue(this.mapItems(v));
    });
        
        let loginPassword = new FormControl('test123', Validators.required);
        let loginPasswordConfirm = new FormControl('test123', CustomValidators.equalTo(loginPassword));
        
         let level = new FormControl('',  Validators.required);
        
        this.regForm = fb.group({
            'email': ['@test.com', Validators.compose([Validators.required, CustomValidators.email])],
            'terms': [true, Validators.compose([Validators.required])],
            'name': ['Test', Validators.compose([Validators.required])],
            'password': loginPassword,
            'password_confirmation': loginPasswordConfirm,
            items: checkboxGroup,
            selectedItems: hiddenControl,
            
            languageSpoken : [null, Validators.compose([Validators.required])],
            learning_requestedss : [null, Validators.compose([])],
            contribute : [true],
            qualified  : [true],
            
            ittems: this.fb.array([
              
            ]),
            prac: this.fb.array([
         
            ]),
            languageSpokenLevel  : [['Beginer'], Validators.compose([Validators.required])],
              aliases: this.fb.array([
                this.fb.control(''),
                    this.createItem()
                    
              ]), practice: this.fb.array([
                this.fb.control(''),
                   
                     this.createItemPractice()
              ])
 
            
        });  
          this.initItemRows()
    }
    
    
    
  createItemPractice(): FormGroup {
    return this.fb.group({
         learning_requested: null
    })
}  
   
 get practice() {
    return this.regForm.get('practice') as FormArray;
  }

    addPractice() {
             this.practice.push(this.fb.control(''));
  }
addPrac(): void {
  this.prac = this.regForm.get('prac') as FormArray;
  this.prac.push(this.createItemPractice());
} 
    
public removedPrac(value: any): void {
        console.log('Removed value is: ', value);
          this.prac.removeAt(value);
          this.box =0;
}
      
    
     initItemRows() {
    let ctrl = this.regForm.get('practice') as FormArray;
    ctrl.push(this.fb.group({
        
      learning_requested: ['']
             
    }))
  } 
    

get aliases() {
    return this.regForm.get('aliases') as FormArray;
  }
    
        addAlias() {
    this.aliases.push(this.fb.control(''));
  } 
    
addItem(): void {
  this.ittems = this.regForm.get('ittems') as FormArray;
  this.ittems.push(this.createItem());
}
   createItem(): FormGroup {
       
  return this.fb.group({
    additional_langauges: [null, Validators.compose([])],
    contribute_to_community: '',
    languageSpokenLevelArr : null,
    qualified_teacher: ''
      
  });
       
}
    
    get f() { return this.regForm.controls; }
 
    
 
    getLanguage() {
            this.userService.getLanguage()
      .subscribe(lang => this.itemss = lang);
  } 
  
    submitForm($ev, form: FormGroup) {
        $ev.preventDefault();
        let value = form.value;
        for (let c in form.controls) {
            form.controls[c].markAsTouched();
        }
        if (form.valid) {
            console.log('Valid!');
            this.submitted = true;
        }
        // stop here if form is invalid
        if (this.regForm.invalid) {
             console.log('inValid!');
            return;
        }
        
        this.loading = true;
 
        this.userService.create(this.regForm.value)
            .pipe(first())
            .subscribe(
                data => {
                    this.alertService.success('Registration successful', true);
                    this.router.navigate(['/login']);
                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                });
     
        console.log(value);
        
    }

    ngOnInit() {
         this.getLanguage() ;
         
    }
    
    
    mapItems(items) {
    let selectedItems = items.filter((item) => item.checkbox).map((item) => item.id);
    return selectedItems.length ? selectedItems : null;
  }
    
    
    
  

    
      //ng2 select
    public get disabledV(): string {
        return this._disabledV;
    }

    public set disabledV(value: string) {
        this._disabledV = value;
        this.disabled = this._disabledV === '1';
    }

    public selected(value: any): void {
        console.log('Selected value is: ', value);
    }

    public removed(value: any): void {
        console.log('Removed value is: ', value);
          this.ittems.removeAt(value);
    }
 

    public typed(value: any): void {
        console.log('New search input: ', value);
    }

    public refreshValue(value: any): void {
        this.value = value;
    }

    // timepicker
    public toggleMode(): void {
        this.ismeridian = !this.ismeridian;
    }

    public update(): void {
        let d = new Date();
        d.setHours(14);
        d.setMinutes(0);
        this.mytime = d;
    }

    public changed(): void {
        console.log('Time changed to: ' + this.mytime);
    }

    public clear(): void {
        this.mytime = void 0;
    }

   nextForm(){
       this.nextform = true; 
        
    }

}
