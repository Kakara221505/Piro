import { Component, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SearchCountryField, CountryISO, PhoneNumberFormat } from 'ngx-intl-tel-input';
import { Contact } from '../../models/contact.model';
import { UserService } from '../../services/authenticate/user.service';
import { NgOtpInputComponent, NgOtpInputConfig } from 'ng-otp-input';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  mobNumberPattern = '^((\\+91-?)|0)?[0-9]{10}$';
  emailPattern = '^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$';
  id: string = 'Default';
  selectFirstCountry: boolean = true;
  contactUsModel: any;
  separateDialCode = false;
  SearchCountryField = SearchCountryField;
  CountryISO = CountryISO;
  PhoneNumberFormat = PhoneNumberFormat;
  preferredCountries: CountryISO[] = [CountryISO.UnitedStates, CountryISO.UnitedKingdom];
  imgloading: boolean = false;
  contactDetails = this.contactusModel.formOne;
  flagDetails = this.contactusModel.flagModel;
  bookForm!: FormGroup;
  submitted = false;
  otpForm!: FormGroup;
  otps: string | undefined;
  showOtpComponent = true;
  @ViewChild(NgOtpInputComponent, { static: false }) ngOtpInput: NgOtpInputComponent | undefined;
  config: NgOtpInputConfig = {
    allowNumbersOnly: false,
    length: 6,
    isPasswordInput: false,
    disableAutoFocus: false,
    placeholder: ''
  };
  otpStyle = 'none';
  formStyle = 'block';
  displayStyle='none';
  value: any;
  body: any;
  public emails: any;
  errorMessage: any = null;
  errorMessageVerify:any = null;
  btnState:boolean=false;
  btnState2:boolean=false;
  userRole: string | null;
  publicKey: string | null;
  constructor(
    private contactusModel: Contact,
    private router: Router,
    private formbuilder: FormBuilder,
    private authService: UserService
  ) {}

  forbiddenEmailStartingWithDot(control: AbstractControl): ValidationErrors | null {
    const email = control.value as string;
    if (email.startsWith('.')) {
      return { forbiddenEmail: true };
    }
    return null;
  }

  ngOnInit(): void {
    this.bookForm = this.formbuilder.group({
      email: ['', [Validators.required, this.forbiddenEmailStartingWithDot]],
      fullName: ['', Validators.required],
      phoneNumber: ['', [Validators.required, this.forbiddenPhoneNumberSymbols]],
      gender:['',Validators.required],
      accountType:['',Validators.required]
    });
    this.otpForm = this.formbuilder.group({
      emailOtp: ['', Validators.required]
    });
  }

  forbiddenPhoneNumberSymbols(control: AbstractControl): ValidationErrors | null {
    const phoneNumber = control.value?.number;
    if (phoneNumber && phoneNumber.length > 0) {
      const uniqueSymbols = ['+', '#', '@']; // Add any other unique symbols you want to check
      const hasForbiddenSymbol = uniqueSymbols.some(symbol => phoneNumber.includes(symbol));
      if (hasForbiddenSymbol) {
        return { forbiddenSymbol: true };
      }
    }
    return null;
  }
  
  

  get f() {
    return this.bookForm.controls;
  }

  get o() {
    return this.otpForm.controls;
  }

  onSubmit(){
    this.submitted = true;

    if (this.bookForm.invalid) {
console.log("hii")
      return;
    }

    this.signUpNext();
  }
  onButtonClick(event: MouseEvent){
    (event.target as HTMLButtonElement).disabled = true;
  }

  signUpNext() {
    this.btnState = true;
    this.forFormNumber();
     this.forCountryCode();
    this.forDialCode();
    this.imgloading = true;
    this.submitted = true;
    localStorage.setItem('email-signup', JSON.stringify(this.bookForm.value.email));
    this.emails = (localStorage.getItem('email-signup') || '').replace(/['"]+/g, '');
    this.userRole = (localStorage.getItem('newUser'))
    this.publicKey = (localStorage.getItem('publicKey'))
    console.log(this.userRole)
  
    if (this.bookForm.value.email === '' || this.bookForm.value.fullName === '') {
      this.imgloading = false;
    }
    
    else if (this.userRole === 'NEW_USER') {
      console.log("hiih")
      let body={
        email: this.bookForm.value.email,
        fullName: this.bookForm.value.fullName,
        phoneNumber: this.bookForm.value.phoneNumber,
        gender:this.bookForm.value.gender,
        accountType:this.bookForm.value.accountType,
        publicKey:this.publicKey
      }
      this.authService.userSignupMeetamask(body).subscribe(
        (data: any) => {
          this.submitted = false;
          this.imgloading = false;
          this.formStyle = 'none';
          this.otpStyle = 'block';
          this.errorMessage = '';
          this.btnState = true;
        },
        (error) => {
          this.btnState = false;
          this.imgloading = false;
          this.errorMessage = error.error.message;
        }
      );
    }
    else {
      this.authService.userSignup(this.bookForm.value).subscribe(
        (data: any) => {
          this.submitted = false;
          this.imgloading = false;
          this.formStyle = 'none';
          this.otpStyle = 'block';
          this.errorMessage = '';
          this.btnState = true;
        },
        (error) => {
          this.btnState = false;
          this.imgloading = false;
          this.errorMessage = error.error.message;
        }
      );
    }
  }
  
  signUpOtpVerify(){
    this.submitted = true;

    if (this.otpForm.invalid) {
      return;
    }

    this.signup();
  }

  signup() {
    this.btnState2=true;
    this.imgloading = true;
    this.submitted = true;
    this.body = JSON.parse(localStorage.getItem('email-signup') || '')
    this.authService.verifySignupOtp({ emailOtp: this.value,email:this.body }).subscribe(
      (data: any) => {
        localStorage.setItem('X-Custom-Token',data.token);
        localStorage.setItem("isLoggedin", "true");
        this.displayStyle = 'block';
        this.imgloading = false;
        this.submitted = false;
        localStorage.removeItem('email-signup');
        localStorage.removeItem('newUser');
        localStorage.removeItem('publicKey');
        this.errorMessageVerify = '';
        this.btnState2=true;
      },
      (error) => {
        this.imgloading = false;
        this.btnState2=false;
        this.errorMessageVerify = error.error.message;
      }
    );
  }

  onOtpChange(val: any) {
    this.value = val;
  }


  imgClick() {
    this.router.navigate(['/']);
  }

  changePreferredCountries() {
    this.preferredCountries = [CountryISO.India, CountryISO.Canada];
  }
  forFormNumber() {
    if (this.flagDetails && this.flagDetails.number) {
      this.bookForm.value['phoneNumber'] = this.flagDetails.number;
    }
  }
  
  forDialCode() {
    if (this.flagDetails && this.flagDetails.dialCode) {
      this.bookForm.value['phoneCode'] = this.flagDetails.dialCode;
      
    }
  }
  forCountryCode() {
    if (this.flagDetails && this.flagDetails.countryCode) {
      this.bookForm.value['countryCode'] = this.flagDetails.countryCode;
      
    }
  }
  onChange(event: any) {
    this.flagDetails = event;
  }
  closePopup(){
    this.displayStyle = 'none';
    this.router.navigate(['/dashboard']);
  }
  closePopup2(){
    this.displayStyle = 'none';
    this.router.navigate(['/dashboard']);
  }

  getBack() {
    this.formStyle = 'block';
    this.otpStyle = 'none';
    this.errorMessageVerify='';
    this.value = '';
    this.otpForm.value.emailOtp = '';
    this.btnState=false;
    this.btnState2=false;
  }
}
