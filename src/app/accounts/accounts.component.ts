import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BookDemoService } from '../services/book-demo-module/book-demo.service';
import { SearchCountryField, CountryISO, PhoneNumberFormat } from 'ngx-intl-tel-input';
import { Contact } from '../../app/models/contact.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.css']
})
export class AccountsComponent implements OnInit {
  successMessage: any;
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

  contactForm = {
    name: '',
    phone: '',
    email: ''
  };

  displayStyle = 'none';
  contactDetails = this.contactusModel.formOne;
  flagDetails = this.contactusModel.flagModel;
  imgloading: boolean = false;
  bookForm!: FormGroup;
  submitted = false;
  constructor(
    private bookService: BookDemoService,
    private contactusModel: Contact,
    private route: ActivatedRoute,
    private router: Router,
    private formbuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.getCompaignData();
    this.bookForm = this.formbuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required]
    });
  }

  get f(){
    return this.bookForm.controls;
  }

  changePreferredCountries() {
    this.preferredCountries = [CountryISO.India, CountryISO.Canada];
  }
  bookDemo() {
    this.forFormNumber();
    this.imgloading = true;
    this.submitted=true;
    this.bookService.submitBookDemo(this.bookForm.value).subscribe(
      (data: any) => {

        this.displayStyle = 'block';
        this.imgloading = false;
        this.bookForm.reset();
        this.submitted=false;

        // this.router.navigate(['']);
      },
      (error) => {
        this.imgloading = false;
      }
    );
  }
  forFormNumber() {

    this.bookForm.value['phone']= this.flagDetails.internationalNumber;;

  }
  onChange(event: any) {
    this.flagDetails = event;
  }

  getCompaignData() {
    this.route.queryParams.subscribe((res) => {
      if (res['utm_source'] != undefined) {
        this.contactDetails.utmSource = res['utm_source'];
      }
      if (res['utm_medium'] != undefined) {
        this.contactDetails.utmMedium = res['utm_medium'];
      }
      if (res['utm_campaign'] != undefined) {
        this.contactDetails.utmCampaign = res['utm_campaign'];
      }
      if (res['utm_term'] != undefined) {
        this.contactDetails.utmTerm = res['utm_term'];
      }
      if (res['utm_content'] != undefined) {
        this.contactDetails.utmContent = res['utm_content'];
      }
    });
  }
  signout() {}

  payment() {
    this.router.navigate(['/payment']);
  }
}
