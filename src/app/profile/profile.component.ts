import { Component, OnInit } from '@angular/core';
import { SearchCountryField, CountryISO, PhoneNumberFormat } from 'ngx-intl-tel-input';
import { Contact } from '../../app/models/contact.model';
import { ActivatedRoute, Router } from '@angular/router';
import { ProfileService } from '../services/profile-module/profile.service';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  public countries: any;
  selectFirstCountry: boolean = true;
  contactUsModel: any;
  separateDialCode = false;
  SearchCountryField = SearchCountryField;
  CountryISO = CountryISO;
  PhoneNumberFormat = PhoneNumberFormat;
  preferredCountries: CountryISO[] = [CountryISO.UnitedStates, CountryISO.UnitedKingdom];
  contactDetails = this.contactusModel.formOne;
  flagDetails = this.contactusModel.flagModel;
  profile = {
    fullName: '',
    organization: '',
    addressLine1: '',
    addressLine2: '',
    phone: '',
    about: '',
    countryId: '',
    email:''
  };
  imgloading: boolean = false;
  constructor(
    private contactusModel: Contact,
    private route: ActivatedRoute,
    private router: Router,
    private profileService: ProfileService
  ) {}

  ngOnInit(): void {
    this.getDetails();
    this.getCountry();
  }

  signout() {
    this.router.navigate(['/login']);
    localStorage.removeItem('X-Custom-Token');
    localStorage.removeItem('event-id');
    localStorage.removeItem('spaceId');
    localStorage.removeItem('isLoggedin');
    window.location.reload();
  }

  getDetails() {
    this.profileService.getAllDetails().subscribe((data: any) => {
      this.profile.fullName = data.fullName;
      this.profile.organization = data.organization;
      this.profile.addressLine1 = data.addressLine1;
      this.profile.addressLine2 = data.addressLine2;
      this.profile.phone = data.phone;
      this.profile.about = data.about;
      this.profile.countryId = data.countryId;
      this.profile.email = data.email;
    });
  }

  getCountry() {
    this.profileService.getCountryList().subscribe((data: any) => {
      this.countries = data;
    });
  }

  //Profile API implementation for update data
  updateUser(profileForm: any) {
    this.forFormNumber();
    this.imgloading = true;
    let body = {
      fullName: this.profile.fullName,
      organization: this.profile.organization,
      addressLine1: this.profile.addressLine1,
      addressLine2: this.profile.addressLine2,
      phone: this.profile.phone,
      about: this.profile.about,
      countryId: this.profile.countryId
    };
    this.profileService.updateUserDetails(body).subscribe((data: any) => {
      this.imgloading = false;
    });
  }
  changePreferredCountries() {
    this.preferredCountries = [CountryISO.India, CountryISO.Canada];
  }
  forFormNumber() {
    this.profile.phone = this.flagDetails.number;
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
}
