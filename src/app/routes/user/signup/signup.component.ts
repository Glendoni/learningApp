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
    
    
       itemss = [
 {id: 'en', text: 'English'},
{id: 'aa', text: 'Afar'},
{id: 'ab', text: 'Abkhazian'},
{id: 'af', text: 'Afrikaans'},
{id: 'am', text: 'Amharic'},
{id: 'ar', text: 'Arabic'},
{id: 'as', text: 'Assamese'},
{id: 'ay', text: 'Aymara'},
{id: 'az', text: 'Azerbaijani'},
{id: 'ba', text: 'Bashkir'},
{id: 'be', text: 'Byelorussian'},
{id: 'bg', text: 'Bulgarian'},
{id: 'bh', text: 'Bihari'},
{id: 'bi', text: 'Bislama'},
{id: 'bn', text: 'Bengali/Bangla'},
{id: 'bo', text: 'Tibetan'},
{id: 'br', text: 'Breton'},
{id: 'ca', text: 'Catalan'},
{id: 'co', text: 'Corsican'},
{id: 'cs', text: 'Czech'},
{id: 'cy', text: 'Welsh'},
{id: 'da', text: 'Danish'},
{id: 'de', text: 'German'},
{id: 'dz', text: 'Bhutani'},
{id: 'el', text: 'Greek'},
{id: 'eo', text: 'Esperanto'},
{id: 'es', text: 'Spanish'},
{id: 'et', text: 'Estonian'},
{id: 'eu', text: 'Basque'},
{id: 'fa', text: 'Persian'},
{id: 'fi', text: 'Finnish'},
{id: 'fj', text: 'Fiji'},
{id: 'fo', text: 'Faeroese'},
{id: 'fr', text: 'French'},
{id: 'fy', text: 'Frisian'},
{id: 'ga', text: 'Irish'},
{id: 'gd', text: 'Scots/Gaelic'},
{id: 'gl', text: 'Galician'},
{id: 'gn', text: 'Guarani'},
{id: 'gu', text: 'Gujarati'},
{id: 'ha', text: 'Hausa'},
{id: 'hi', text: 'Hindi'},
{id: 'hr', text: 'Croatian'},
{id: 'hu', text: 'Hungarian'},
{id: 'hy', text: 'Armenian'},
{id: 'ia', text: 'Interlingua'},
{id: 'ie', text: 'Interlingue'},
{id: 'ik', text: 'Inupiak'},
{id: 'in', text: 'Indonesian'},
{id: 'is', text: 'Icelandic'},
{id: 'it', text: 'Italian'},
{id: 'iw', text: 'Hebrew'},
{id: 'ja', text: 'Japanese'},
{id: 'ji', text: 'Yiddish'},
{id: 'jw', text: 'Javanese'},
{id: 'ka', text: 'Georgian'},
{id: 'kk', text: 'Kazakh'},
{id: 'kl', text: 'Greenlandic'},
{id: 'km', text: 'Cambodian'},
{id: 'kn', text: 'Kannada'},
{id: 'ko', text: 'Korean'},
{id: 'ks', text: 'Kashmiri'},
{id: 'ku', text: 'Kurdish'},
{id: 'ky', text: 'Kirghiz'},
{id: 'la', text: 'Latin'},
{id: 'ln', text: 'Lingala'},
{id: 'lo', text: 'Laothian'},
{id: 'lt', text: 'Lithuanian'},
{id: 'lv', text: 'Latvian/Lettish'},
{id: 'mg', text: 'Malagasy'},
{id: 'mi', text: 'Maori'},
{id: 'mk', text: 'Macedonian'},
{id: 'ml', text: 'Malayalam'},
{id: 'mn', text: 'Mongolian'},
{id: 'mo', text: 'Moldavian'},
{id: 'mr', text: 'Marathi'},
{id: 'ms', text: 'Malay'},
{id: 'mt', text: 'Maltese'},
{id: 'my', text: 'Burmese'},
{id: 'na', text: 'Nauru'},
{id: 'ne', text: 'Nepali'},
{id: 'nl', text: 'Dutch'},
{id: 'no', text: 'Norwegian'},
{id: 'oc', text: 'Occitan'},
{id: 'om', text: '(Afan)/Oromoor/Oriya'},
{id: 'pa', text: 'Punjabi'},
{id: 'pl', text: 'Polish'},
{id: 'ps', text: 'Pashto/Pushto'},
{id: 'pt', text: 'Portuguese'},
{id: 'qu', text: 'Quechua'},
{id: 'rm', text: 'Rhaeto-Romance'},
{id: 'rn', text: 'Kirundi'},
{id: 'ro', text: 'Romanian'},
{id: 'ru', text: 'Russian'},
{id: 'rw', text: 'Kinyarwanda'},
{id: 'sa', text: 'Sanskrit'},
{id: 'sd', text: 'Sindhi'},
{id: 'sg', text: 'Sangro'},
{id: 'sh', text: 'Serbo-Croatian'},
{id: 'si', text: 'Singhalese'},
{id: 'sk', text: 'Slovak'},
{id: 'sl', text: 'Slovenian'},
{id: 'sm', text: 'Samoan'},
{id: 'sn', text: 'Shona'},
{id: 'so', text: 'Somali'},
{id: 'sq', text: 'Albanian'},
{id: 'sr', text: 'Serbian'},
{id: 'ss', text: 'Siswati'},
{id: 'st', text: 'Sesotho'},
{id: 'su', text: 'Sundanese'},
{id: 'sv', text: 'Swedish'},
{id: 'sw', text: 'Swahili'},
{id: 'ta', text: 'Tamil'},
{id: 'te', text: 'Tegulu'},
{id: 'tg', text: 'Tajik'},
{id: 'th', text: 'Thai'},
{id: 'ti', text: 'Tigrinya'},
{id: 'tk', text: 'Turkmen'},
{id: 'tl', text: 'Tagalog'},
{id: 'tn', text: 'Setswana'},
{id: 'to', text: 'Tonga'},
{id: 'tr', text: 'Turkish'},
{id: 'ts', text: 'Tsonga'},
{id: 'tt', text: 'Tatar'},
{id: 'tw', text: 'Twi'},
{id: 'uk', text: 'Ukrainian'},
{id: 'ur', text: 'Urdu'},
{id: 'uz', text: 'Uzbek'},
{id: 'vi', text: 'Vietnamese'},
{id: 'vo', text: 'Volapuk'},
{id: 'wo', text: 'Wolof'},
{id: 'xh', text: 'Xhosa'},
{id: 'yo', text: 'Yoruba'},
{id: 'zh', text: 'Chinese'},
{id: 'zu', text: 'Zulu'}
 ];
    
    
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
        
        let loginPassword = new FormControl('doctor1', Validators.required);
        let loginPasswordConfirm = new FormControl('doctor1', CustomValidators.equalTo(loginPassword));
        
         let level = new FormControl('',  Validators.required);
        
        this.regForm = fb.group({
            'email': ['', Validators.compose([Validators.required, CustomValidators.email])],
            'terms': [true, Validators.compose([Validators.required])],
            'name': ['', Validators.compose([Validators.required])],
            'password': loginPassword,
            'password_confirmation': loginPasswordConfirm,
            items: checkboxGroup,
            selectedItems: hiddenControl,
            learning_requested : [null, Validators.compose([])],
            languageSpoken : [null, Validators.compose([Validators.required])],
            learning_requestedss : [null, Validators.compose([])],
            contribute : [true],
            qualified  : [true],
            languageSpokenLevel  : [['Beginer'], Validators.compose([Validators.required])],
              aliases: this.fb.array([
                    this.fb.control('')
                ])
        });
        
        
        
        
        
    }
   
      get aliases() {
    return this.regForm.get('aliases') as FormArray;
  }
    get f() { return this.regForm.controls; }
    
    addAlias() {
         
    this.aliases.push(this.fb.control(''));
        this.alias = true;
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
    
    
    
      addAlias() {
    this.aliases.push(this.fb.control(''));
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
