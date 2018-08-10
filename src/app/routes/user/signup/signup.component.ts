import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormArray, Validator, FormBuilder, Validators, FormControl, ValidatorFn } from '@angular/forms';


import { CustomValidators } from 'ng2-validation';
import { first } from 'rxjs/operators';
import { AlertService, UserService } from '../../../_services';

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
 loading = false;
    regForm: FormGroup;
     items = [
    {key: 'item1', text: ' Practice a language'},
    {key: 'item2', text: ' Help people to practice thier spoken language'},
    {key: 'item3', text: ' I am a professional teacher'},
  ];

    submitted = false;
    constructor(fb: FormBuilder,
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
        
        let loginPassword = new FormControl('', Validators.required);
        let loginPasswordConfirm = new FormControl('', CustomValidators.equalTo(loginPassword));
        
        this.regForm = fb.group({
            'email': [null, Validators.compose([Validators.required, CustomValidators.email])],
            'terms': [null, Validators.compose([Validators.required])],
            'name': [null, Validators.compose([Validators.required])],
            'password': loginPassword,
            'password_confirmation': loginPasswordConfirm,
            items: checkboxGroup,
            selectedItems: hiddenControl
        });
    }
    
    get f() { return this.regForm.controls; }
    
    submitForm($ev, form: FormGroup) {
        $ev.preventDefault();
        let value = form.value;
        for (let c in form.controls) {
            form.controls[c].markAsTouched();
        }
        if (form.valid) {
            console.log('Valid!');
            this.submitted = true;

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
        }
        console.log(value);
    }

    ngOnInit() {
    }
    
    mapItems(items) {
    let selectedItems = items.filter((item) => item.checkbox).map((item) => item.id);
    return selectedItems.length ? selectedItems : null;
  }

}
