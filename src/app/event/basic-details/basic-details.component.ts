import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ManagementConsoleService } from '../../services/event-management-module/management-console.service';
import * as moment from 'moment';
@Component({
  selector: 'app-basic-details',
  templateUrl: './basic-details.component.html',
  styleUrls: ['./basic-details.component.css']
})
export class BasicDetailsComponent implements OnInit {
  public timezones: any;
  utcTime = [];
  utcTimezoneArray = [];
  public todayDate: any = new Date();
  public minDate: any = new Date(0,0,0)

  public categories: any;
  public events: any;
  emailPattern = '^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$';
  bookForm!: FormGroup;
  submitted = false;
  @Input() vPillsProfile: any;
  @Input() buttonChange: any;
  public eventData: any;
  imgloading: boolean = false;
  basic = {
    title: '',
    maxAttendees: '',
    eventStartDate: '',
    eventStartTime: '',
    eventEndDate: '',
    eventEndTime: '',
    eventTypeId: '',
    eventCategoryId: '',
    eventPrivacy: '',
    eventSummary: '',
    timezone:''
  };


  @Output() nextTabEvent = new EventEmitter<string>();
  eventId: any;
  buttonDisabled: boolean = true;
  errorMessage: any = null;
  endDate: any;
  endTime: any;

  timers = [
    {name: '12:00 AM', value: '12:00 AM' },
    { name: '12:30 AM', value: '12:30 AM' },
    { name: '01:00 AM', value: '01:00 AM' },
    { name: '01:30 AM', value: '01:30 AM' },
    { name: '02:00 AM', value: '02:00 AM' },
    { name: '02:30 AM', value: '02:30 AM' },
    { name: '03:00 AM', value: '03:00 AM' },
    { name: '03:30 AM', value: '03:30 AM' },
    { name: '04:00 AM', value: '04:00 AM' },
    { name: '04:30 AM', value: '04:30 AM' },
    { name: '05:00 AM', value: '05:00 AM' },
    { name: '05:30 AM', value: '05:30 AM' },
    { name: '06:00 AM', value: '06:00 AM' },
    { name: '06:30 AM', value: '06:30 AM' },
    { name: '07:00 AM', value: '07:00 AM' },
    { name: '07:30 AM', value: '07:30 AM' },
    { name: '08:00 AM', value: '08:00 AM' },
    { name: '08:30 AM', value: '08:30 AM' },
    { name: '09:00 AM', value: '09:00 AM' },
    { name: '09:30 AM', value: '09:30 AM' },
    { name: '10:00 AM', value: '10:00 AM' },
    { name: '10:30 AM', value: '10:30 AM' },
    { name: '11:00 AM', value: '11:00 AM' },
    { name: '11:30 AM', value: '11:30 AM' },
    { name: '12:00 PM', value: '12:00 PM' },
    { name: '12:30 PM', value: '12:30 PM' },
    { name: '01:00 PM', value: '01:00 PM' },
    { name: '01:30 PM', value: '01:30 PM' },
    { name: '02:00 PM', value: '02:00 PM' },
    { name: '02:30 PM', value: '02:30 PM' },
    { name: '03:00 PM', value: '03:00 PM' },
    { name: '03:30 PM', value: '03:30 PM' },
    { name: '04:00 PM', value: '04:00 PM' },
    { name: '04:30 PM', value: '04:30 PM' },
    { name: '05:00 PM', value: '05:00 PM' },
    { name: '05:30 PM', value: '05:30 PM' },
    { name: '06:00 PM', value: '06:00 PM' },
    { name: '06:30 PM', value: '06:30 PM' },
    { name: '07:00 PM', value: '07:00 PM' },
    { name: '07:30 PM', value: '07:30 PM' },
    { name: '08:00 PM', value: '08:00 PM' },
    { name: '08:30 PM', value: '08:30 PM' },
    { name: '09:00 PM', value: '09:00 PM' },
    { name: '09:30 PM', value: '09:30 PM' },
    { name: '10:00 PM', value: '10:00 PM' },
    { name: '10:30 PM', value: '10:30 PM' },
    { name: '11:00 PM', value: '11:00 PM' },
    { name: '11:30 PM', value: '11:30 PM' }
  ];
  selectedTeam = '';
  timerEnd = [
    { name: '12:00 AM', values: '12:00 AM' },
    { name: '12:30 AM', values: '12:30 AM' },
    { name: '01:00 AM', values: '01:00 AM' },
    { name: '01:30 AM', values: '01:30 AM' },
    { name: '02:00 AM', values: '02:00 AM' },
    { name: '02:30 AM', values: '02:30 AM' },
    { name: '03:00 AM', values: '03:00 AM' },
    { name: '03:30 AM', values: '03:30 AM' },
    { name: '04:00 AM', values: '04:00 AM' },
    { name: '04:30 AM', values: '04:30 AM' },
    { name: '05:00 AM', values: '05:00 AM' },
    { name: '05:30 AM', values: '05:30 AM' },
    { name: '06:00 AM', values: '06:00 AM' },
    { name: '06:30 AM', values: '06:30 AM' },
    { name: '07:00 AM', values: '07:00 AM' },
    { name: '07:30 AM', values: '07:30 AM' },
    { name: '08:00 AM', values: '08:00 AM' },
    { name: '08:30 AM', values: '08:30 AM' },
    { name: '09:00 AM', values: '09:00 AM' },
    { name: '09:30 AM', values: '09:30 AM' },
    { name: '10:00 AM', values: '10:00 AM' },
    { name: '10:30 AM', values: '10:30 AM' },
    { name: '11:00 AM', values: '11:00 AM' },
    { name: '11:30 AM', values: '11:30 AM' },
    { name: '12:00 PM', values: '12:00 PM' },
    { name: '12:30 PM', values: '12:30 PM' },
    { name: '01:00 PM', values: '01:00 PM' },
    { name: '01:30 PM', values: '01:30 PM' },
    { name: '02:00 PM', values: '02:00 PM' },
    { name: '02:30 PM', values: '02:30 PM' },
    { name: '03:00 PM', values: '03:00 PM' },
    { name: '03:30 PM', values: '03:30 PM' },
    { name: '04:00 PM', values: '04:00 PM' },
    { name: '04:30 PM', values: '04:30 PM' },
    { name: '05:00 PM', values: '05:00 PM' },
    { name: '05:30 PM', values: '05:30 PM' },
    { name: '06:00 PM', values: '06:00 PM' },
    { name: '06:30 PM', values: '06:30 PM' },
    { name: '07:00 PM', values: '07:00 PM' },
    { name: '07:30 PM', values: '07:30 PM' },
    { name: '08:00 PM', values: '08:00 PM' },
    { name: '08:30 PM', values: '08:30 PM' },
    { name: '09:00 PM', values: '09:00 PM' },
    { name: '09:30 PM', values: '09:30 PM' },
    { name: '10:00 PM', values: '10:00 PM' },
    { name: '10:30 PM', values: '10:30 PM' },
    { name: '11:00 PM', values: '11:00 PM' },
    { name: '11:30 PM', values: '11:30 PM' }
  ];
  localDate: any;
  localDate2: any;
  monthArray = ['01','02','03','04','05','06', '07' , '08', '09','10','11','12'];
  timezoneIds = [] || '';
  eventEndTime:any = [] || '';
  eventStartTime:any = [] || '';
  id:any
  myToday:any
  minEndDate: Date;
  constructor(
    private formbuilder: FormBuilder,
    private eventService: ManagementConsoleService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    // this.todayDate.setHours(this.todayDate.getHours() + 5);
  }

  ngOnInit(): void {
    this.eventId = this.route.snapshot.paramMap.get('id');
    this.myToday = new Date(this.todayDate.getFullYear(), this.todayDate.getMonth(), this.todayDate.getDate(), 0, 0, 0);
    this.bookForm = this.formbuilder.group({
      title: ['', Validators.required] || null,
      maxAttendees: ['', Validators.required] || null,
      eventStartDate: ['', Validators.required] || null,
      eventEndDate: ['', Validators.required] || null,
      eventTypeId: [''] || null,
      eventCategoryId: [''] || null,
      eventPrivacy: [''] || null,
      eventSummary: [''] || null,
      venueId: localStorage.getItem('spaceId')
    });
    this.getCategory();
    this.getEvent();
    this.getTimezones();
    if (this.eventId !== null) {
      this.getEventDetails();
    }
  }

  getEventDetails() {
    this.eventService.getEvents(this.eventId).subscribe(
      (data: any) => {
        this.basic.title = data.title;
        this.basic.eventSummary = data.eventSummary;
        this.basic.maxAttendees = data.maxAttendees;
        this.basic.eventCategoryId = data.eventCategoryName;
        this.basic.eventTypeId = data.eventTypeName;
        this.basic.eventCategoryId = data.eventCategoryId;
        this.basic.eventTypeId = data.eventTypeId;
        this.basic.eventPrivacy = data.privacyType;
        this.basic.eventEndDate = data.eventEndDate;
        this.basic.eventStartDate = data.eventStartDate;
        this.eventStartTime = data.eventStartTime;
        this.eventEndTime = data.eventEndTime;
        this.timezoneIds = data.timeZoneId
        this.eventData = data;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  onStartChange(event: any) {
    const d = new Date(event.value);
    this.localDate = d.getFullYear() + '-' + this.monthArray[d.getMonth()] + '-' + ('0' + d.getDate()).slice(-2);
    this.basic.eventEndDate = this.localDate
    this.endDate = moment(event.value).toDate();
    const minEndDate = new Date(d);
    minEndDate.setDate(minEndDate.getDate()); // Considering you want the next day as the minimum selectable end date
  
    // Set the minimum date for the end date picker
    this.minEndDate = minEndDate; 
  }

  onStartChange2(event: any) {
    const d = new Date(event.value);
    this.localDate2 = d.getFullYear() + '-' +  this.monthArray[d.getMonth()] + '-' + ('0' + d.getDate()).slice(-2);
    console.log(this.localDate2);
  }

  onTimeChange(event: any) {
    this.endTime = moment(event.value).toDate();
  }

  getId(id:any){
    console.log(id);
  }

  onSelected(value: string): void {
    this.selectedTeam = value;
    console.log(this.selectedTeam);

    this.eventEndTime = this.selectedTeam
    console.log(this.eventEndTime);
    this.basic.eventEndTime = this.selectedTeam;
  }

  getTime(i: any) {
    console.log(i);
  }

  showTime(event: any) {
    let newVal = event.name;
  }

  get f() {
    return this.bookForm.controls;
  }

  nextTabs(value: string) {
    this.nextTabEvent.emit(value);
  }

  selectTimeZone(event:any){
    this.timezoneIds = event;
    console.log(this.timezoneIds)
  }

  onSubmit() {
    this.submitted = true;
    if (this.basic.title === null) {
      return;
    }
  }

  Save(basicForm: any) {
    this.imgloading = true;
    this.submitted = false;
    var time1 = this.localDate + ' ' + this.basic.eventStartTime;
    var bits: any = time1.split(/\D/);
    var dateTime1 = new Date(bits[0], --bits[1], bits[2], bits[3], bits[4]);

    var time2 = this.localDate2 + ' ' + this.basic.eventEndTime;
    var bits: any = time2.split(/\D/);
    var dateTime2 = new Date(bits[0], --bits[1], bits[2], bits[3], bits[4]);
    let body = {
      title: this.basic.title,
      maxAttendees: this.basic.maxAttendees,
      eventStartDate: this.localDate,
      eventEndDate: this.localDate2 || this.localDate,
      eventTypeId: this.basic.eventTypeId,
      eventCategoryId: this.basic.eventCategoryId,
      eventPrivacy: this.basic.eventPrivacy,
      eventSummary: this.basic.eventSummary,
      eventEndTime: this.eventEndTime,
      eventStartTime: this.eventStartTime,
      timeZoneId:Number(this.timezoneIds),
      venueId: localStorage.getItem('spaceId')
    };

    if (this.eventData == null) {
      this.eventService.addEvents(body).subscribe(
        (data: any) => {
          this.router.navigate([`/add-events/manage-space/${data.id}`]);
          this.eventId = data.id;
          this.nextTabs('manage-space');
          this.getEventDetails();
          this.imgloading = false;
          this.submitted = true;
          this.errorMessage = '';
        },
        (error: any) => {
          this.imgloading = false;
          this.errorMessage = error.error.message;
        }
      );
    } else if (this.eventData != null) {

      let twobody = {
        title: this.basic.title || null,
        maxAttendees: this.basic.maxAttendees || null,
        eventStartDate: this.localDate || this.basic.eventStartDate || null,
        eventEndDate: this.localDate2 || this.localDate ||  this.basic.eventStartDate || null,
        eventStartTime: this.eventStartTime,
        eventEndTime: this.eventEndTime,
        eventTypeId: this.basic.eventTypeId || null,
        eventCategoryId: this.basic.eventCategoryId || null,
        privacyType: this.basic.eventPrivacy,
        eventSummary: this.basic.eventSummary || null,

        venueId: localStorage.getItem('spaceId'),
        acessType: null,
        eventId: this.eventId,
        eventStatus: null,
        eventUrlLink: null,
        timeZoneId:Number(this.timezoneIds) || null,
      };

      this.eventService.updateEvents(twobody).subscribe(
        (data: any) => {
          this.router.navigate([`/add-events/manage-space/${data.id}`]);
          this.nextTabs('manage-space');
          this.getEventDetails();
          this.imgloading = false;
          this.buttonDisabled = false;
          this.errorMessage = '';
        },
        (error: any) => {
          this.imgloading = false;
          this.errorMessage = error.error.message;
        }
      );
    }
  }

  getCategory() {
    this.eventService.getEventCategory().subscribe((data: any) => {
      this.categories = data;
    });
  }
  getEvent() {
    this.eventService.getEventType().subscribe((data: any) => {
      this.events = data;
    });
  }

  getTimezones() {
    this.eventService.getTimeZone().subscribe((data: any) => {
      this.timezones = data;

    });
  }

  resetForm() {
    this.bookForm.reset(); // Reset the form to its initial state
    this.submitted = false; // Set submitted to false to remove validation messages
    this.basic = {
      title: '',
      maxAttendees: '',
      eventStartDate: '',
      eventStartTime: '',
      eventEndDate: '',
      eventEndTime: '',
      eventTypeId: '',
      eventCategoryId: '',
      eventPrivacy: '',
      eventSummary: '',
      timezone: '',
    };
  }
  
}
