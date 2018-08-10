import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
import { first } from 'rxjs/operators';
import { AuthenticationService } from '../../../_services';

@Component({
    selector: 'app-signin',
    templateUrl: './signin.component.html',
    styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {

    loginForm: FormGroup;
    loading = false;
    submitted = false;
    returnUrl: string;
    error = '';
    constructor(private fb: FormBuilder,  
                private route: ActivatedRoute,
                private router: Router,
                private authenticationService: AuthenticationService) {}
    
    ngOnInit() {
           this.loginForm = this.fb.group({
            'email': [null, Validators.compose(
                [Validators.required, CustomValidators.email])],
               'password': [null, Validators.required]
        });
          // reset login status
       this.authenticationService.logout();

        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/dashboard';
    }
    
    // convenience getter for easy access to form fields
    get f() { return this.loginForm.controls; }

    submitForm($ev, form: FormGroup) {
        $ev.preventDefault();
        let value = form.value;
        for (let c in form.controls) {
            form.controls[c].markAsTouched();
        }
        if (form.valid) {
            //console.log('Valid!');
         this.submitted = true;
        // stop here if form is invalid
        if (this.loginForm.invalid) {
            return;
        }

        this.loading = true;
        this.authenticationService.login(this.f.email.value, this.f.password.value)
            .pipe(first())
            .subscribe(
                data => {
                    this.router.navigate([this.returnUrl]);
                },
                error => {
                    this.error = error;
                    this.loading = false;
                });
    }    
        //console.log(value);
    }
 
}
