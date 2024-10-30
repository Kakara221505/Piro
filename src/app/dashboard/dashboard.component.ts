import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SearchCountryField, CountryISO, PhoneNumberFormat } from 'ngx-intl-tel-input';
import { Contact } from '../../app/models/contact.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { JoinSesionService } from '../services/join-module/join-sesion.service';
import { ProfileService } from '../services/profile-module/profile.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
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

  public events: any;
  public eventlist: any;
  profileName:any;
  titles: any;
  eventTypes: any;
  startDates: any;
  endDates: any;
  eventIds: any;
  link: any;
  totalItem:any;
  skletonShow:boolean = false;
  linkUrl:any;
  startDates1: any;
  endDates1: any;
  constructor(
    private contactusModel: Contact,
    private route: ActivatedRoute,
    private router: Router,
    private formbuilder: FormBuilder,
    private joinSesion: JoinSesionService,
    private profileService: ProfileService
  ) {}

  ngOnInit(): void {
    this.linkUrl =  window.location.protocol  + "//" + window.location.hostname
    console.log(this.linkUrl);
    this.getCompaignData();
    this.bookForm = this.formbuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required]
    });
    this.getUpcomingEvent();
    this.getDetails();
    this.getRequestAccess();
  }

  signout() {
    this.router.navigate(['/login']);
    localStorage.removeItem('X-Custom-Token');
    localStorage.removeItem('spaceId');
    localStorage.removeItem('isLoggedin');
    localStorage.clear();
    window.location.reload();
  }

  getDetails() {
    this.profileService.getAllDetails().subscribe((data:any) =>{
      this.profileName = data.fullName;

    })
  }
  hostEvents() {
    this.router.navigate(['/choose-event']);
  }

  bookDemo() {
    this.router.navigate(['/book-demo']);
  }

  goToEvents() {
    this.router.navigate(['/all-events']);
  }

  payment() {
    this.router.navigate(['/payment']);
  }
  get f() {
    return this.bookForm.controls;
  }

  changePreferredCountries() {
    this.preferredCountries = [CountryISO.India, CountryISO.Canada];
  }

  forFormNumber() {
    this.bookForm.value['phone'] = this.flagDetails.internationalNumber;
  }
  onChange(event: any) {
    this.flagDetails = event;
  }

  getRequestAccess(){
    // this.profileService.getRequestAccess().subscribe((data:any) =>{
    //   console.log(data);
    // })
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

  getUpcomingEvent() {
    this.joinSesion.getEventsList('UPCOMING', 0, 10).subscribe((data: any) => {
      this.totalItem = data.totalElements;
      this.events = data.myEvents;
      this.titles = data.myEvents[0].title;
      this.eventTypes = data.myEvents[0].eventType;
      this.startDates = data.myEvents[0].utcStartDate;
      this.endDates = data.myEvents[0].utcEndDate;
      this.startDates1 = data.myEvents[0].localStartDate;
      this.endDates1 = data.myEvents[0].localEndDate;
      this.eventIds = data.myEvents[0].identifier;
    });
  }

  routeJoin() {
    this.router.navigate([]).then((result) => {
      window.open(`/join/${this.eventIds}`, '_blank');
    });
  }
}
