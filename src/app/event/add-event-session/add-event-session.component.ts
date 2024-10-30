import { ManagementConsoleService } from '../../services/event-management-module/management-console.service';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import * as moment from 'moment';
@Component({
  selector: 'app-add-event-session',
  templateUrl: './add-event-session.component.html',
  styleUrls: ['./add-event-session.component.css']
})
export class AddEventSessionComponent implements OnInit {
  public todayDate: any = new Date();
  public spaceEventId: any;
  public speakers: any;
  public sessions: any;
  modalStyle = 'none';
  formStyle = 'none';
  listStyle = 'none';
  displayStyle = 'block';
  updateStyle = 'none';
  imgloading: boolean = false;
  imgloadingPub: boolean = false;
  emailPattern = '^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$';
  bookForm!: FormGroup;
  submitted = false;
  hasSessions = false;
  pageAction = '';
  stagesAlloted: number;
  stagesAlloted1: number;
  myToday:any

  roles = {
    email: '',
    userName: '',
    hasAcessToMultipleStages: false,
    canAddSpeaker: false,
    canRemoveSpeaker: false,
    canSendInvitation: false,
    canShareScreen: false,
    stagesAlloted: '',
    description: ''
  };

  addSession = {
    sessionEndDate: '',
    sessionEndTime: '',
    sessionStartTime: '',
    sessionStartDate: '',
    stages: '',
    sessionDescription: '',
    startSession: '',
    title: '',
    userSessionId: ''
  };

  updateSession = {
    sessionEndDate: '',
    sessionEndTime: '',
    sessionStartTime: '',
    sessionStartDate: '',
    stages: '',
    sessionDescription: '',
    startSession: '',
    title: '',
    userSessionId: ''
  };
  sessionEndTime:any = [] || '';
  sessionStartTime:any = [] || '';
  stages = [];
  userSessionId: any;
  userEventId: any;
  imgloading2: boolean = false;
  @Output() nextTabEvent = new EventEmitter<string>();
  eventId: any;

  noStages: any;
  public numIndex: any;
  num: any;
  listofStages: any = [];
  errorMessage: string;
  timers = [
    { name: '12:00 AM', value: '12:00 AM' },
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
  endDate: any;
  endTime: any;
  venueIds:any;
  public events: any;
  monthArray = ['01','02','03','04','05','06', '07' , '08', '09','10','11','12'];
  errorMessageOrg:any;
  eventStartDate:any;
  eventEndDate:any;
  setStartEventDate:any;
  showDates:any;
  constructor(
    private router: Router,
    private formbuilder: FormBuilder,
    private eventService: ManagementConsoleService,
    private toastr: ToastrService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.eventId = this.route.snapshot.paramMap.get('id');
    this.myToday = new Date(this.todayDate.getFullYear(), this.todayDate.getMonth(), this.todayDate.getDate(), 0, 0, 0);
    this.showSpeakerList();
    this.getSessionList();
    this.getNoOfStages();
    this.getEventDetails();
    this.bookForm = this.formbuilder.group({
      title: ['', Validators.required],
      sessionDescription: [''],
      startSession: ['', Validators.required],
      endSession: ['', Validators.required],
      userEventId: ['', Validators.required],
      stages: ['', Validators.required]
    });
    this.displayStyle = 'block';
    this.formStyle = 'none';
    this.listStyle = 'none';
    this.updateStyle = 'none';
    // this.showDates = new Date(this.eventStartDate)
    // this.setStartEventDate = new Date(this.showDates.getFullYear(), this.showDates.getMonth(), this.showDates.getDate(), 0, 0, 0);
  }

  modalShow(){
    this.modalStyle = 'block'
  }
  addEvents() {
    this.pageAction = 'session-add';

    this.eventService.getSpeakerManagementList(0,100,this.eventId).subscribe((data: any) => {
      this.speakers = data.userEventsResponseDTOs;
    });
    this.displayStyle = 'none';
    this.listStyle = 'none';
    this.updateStyle = 'none';
    this.formStyle = 'block';
  }
  get f() {
    return this.bookForm.controls;
  }

  showSpeakerList() {
    this.eventService.getSpeakerManagementList(0,100,this.eventId).subscribe((data: any) => {
      this.speakers = data.userEventsResponseDTOs;
    });
  }

  getEventDetails() {
    this.eventService.getEvents(this.eventId).subscribe((data: any) => {
      this.events = data;
      this.venueIds = data.venueId;
      this.eventStartDate = new Date(data.eventStartDate);
      this.setStartEventDate = new Date(this.eventStartDate.getFullYear(), this.eventStartDate.getMonth(), this.eventStartDate.getDate(), 0, 0, 0);
      this.eventEndDate = data.eventEndDate;
    });
  }
  getSpaceId() {
    this.eventService.getSpaceList(localStorage.getItem('spaceId')).subscribe((data: any) => {
      this.spaceEventId = data.data.venueSectionDTOs[0].id;
    });
  }
  nextTab(value: string) {
    this.nextTabEvent.emit(value);
  }
  publish() {
    this.router.navigate([`/preview-publish/${this.eventId}`]);
  }
  publish2() {
    // let body = {
    //   acessType: null,
    //   endDate: null,
    //   eventCategoryId: null,
    //   eventId: this.eventId,
    //   eventStatus: 'PUBLISHED',
    //   eventSummary: null,
    //   eventTypeId: null,
    //   eventUrlLink: null,
    //   privacyType: null,
    //   startDate: null,
    //   title: null,
    //   venueId: null
    // };
    // this.imgloadingPub = true;
    // this.eventService.updateEvents(body).subscribe((data: any) => {
    //   this.imgloadingPub = false;
    // });
    this.router.navigate([`/preview-publish/${this.eventId}`]);
  }
  onStartChange(event: any) {
    const d = new Date(event.value);
    this.localDate = d.getFullYear() + '-' + this.monthArray[d.getMonth()] + '-' + ('0' + d.getDate()).slice(-2);
    this.addSession.sessionEndDate = this.localDate
    this.endDate = moment(event.value).toDate();
  }

  onStartChange2(event: any) {
    const d = new Date(event.value);
    this.localDate2 = d.getFullYear() + '-' + this.monthArray[d.getMonth()] + '-' + ('0' + d.getDate()).slice(-2);
  }

  onTimeChange(event: any) {
    this.endTime = moment(event.value).toDate();
  }

  onSelected(value: string): void {
    this.selectedTeam = value;
    this.sessionEndTime = this.selectedTeam;
    this.updateSession.sessionEndTime = this.selectedTeam
  }

  Save(addSessionForm: any) {
    this.imgloading = true;
    this.submitted = true;
    let body = {
      title: this.addSession.title,
      sessionDescription: this.addSession.sessionDescription,
      sessionEndDate: this.localDate2 || this.localDate,
      sessionEndTime: this.sessionEndTime,
      sessionStartDate: this.localDate,
      sessionStartTime: this.sessionStartTime,
      stages: Number(this.addSession.stages),
      userEventId: this.userEventId
    };

    if (
      body.title === null ||
      body.sessionStartDate === null ||
      body.sessionEndDate === null ||
      body.stages === null ||
      body.userEventId === null ||
      body.sessionEndTime == null ||
      body.sessionStartTime == null
    ) {
      this.imgloading = false;
    } else {
      this.eventService.addSessions(body).subscribe(
        (data: any) => {
          this.imgloading = false;
          this.submitted = false;
          this.formStyle = 'none';
          this.listStyle = 'block';
          this.updateStyle = 'none';
          this.getSessionList();
          addSessionForm.resetForm();
          this.errorMessage = '';

          this.pageAction = 'session-list';
        },
        (error) => {
          this.imgloading = false;
          this.errorMessage = error.error.message;
        }
      );
    }
  }

  getSessionList() {
    this.eventService.getSession(this.eventId).subscribe((data: any) => {
      this.sessions = data;
      if (this.sessions.length > 0) {
        //this.displayStyle = 'none';
        //this.listStyle = 'block';
        this.hasSessions = true;
        console.log('has session');
        this.pageAction = 'session-list';
      } else {
        console.log('no session');
        this.pageAction = 'no-session';
        //this.displayStyle = 'block';
      }
    });
  }

  addMore() {
    this.pageAction = 'session-add';
    this.formStyle = 'block';
    this.listStyle = 'none';
    this.updateStyle = 'none';
  }

  cancelUpdateSession() {
    this.updateStyle = 'none';
    this.formStyle = 'none';
    this.listStyle = 'block';
  }

  cancelUpdateSessionBack() {
    if (this.sessions.length > 0) {
      this.pageAction = 'session-list';
    } else {
      this.pageAction = 'no-session';
    }

    this.updateStyle = 'none';
    this.formStyle = 'none';
    this.listStyle = 'none';
    this.displayStyle = 'block';
  }

  editSession(id: any) {
    this.pageAction = 'session-update';

    this.updateStyle = 'block';
    this.listStyle = 'none';
    this.formStyle = 'none';

    this.eventService.getSesionById(id).subscribe((data: any) => {
      this.userSessionId = data.id;
      this.updateSession.title = data.title;
      this.updateSession.sessionDescription = data.sessionDescription;
      this.stages = data.stages;
      this.userEventId = data.fullName;
      this.userEventId = data.userEventId;
      this.updateSession.sessionStartDate = data.sessionStartDate;
      this.updateSession.sessionEndDate = data.sessionEndDate;
      this.updateSession.sessionStartTime = data.sessionStartTime;
      this.updateSession.sessionEndTime = data.sessionEndTime;
    });
  }

  upateSession(updateSessionForm: any) {
    this.submitted = true;
    let body = {
      title: this.updateSession.title,
      sessionDescription: this.updateSession.sessionDescription,
      userSessionId: this.userSessionId,
      sessionStatus: 'ACTIVE',
      sessionEndDate: this.localDate2 || this.updateSession.sessionEndDate || null,
      sessionEndTime: this.updateSession.sessionEndTime || this.updateSession.sessionEndTime || null,
      sessionStartDate: this.localDate || this.updateSession.sessionStartDate || null,
      sessionStartTime: this.updateSession.sessionStartTime || this.updateSession.sessionStartTime || null,
      stages: Number(this.updateSession.stages)
    };
    this.imgloading = true;
    this.eventService.updateSession(body).subscribe(
      (data: any) => {
        this.submitted = false;
        this.updateStyle = 'none';
        this.formStyle = 'none';
        this.listStyle = 'block';
        this.imgloading = false;
        // updateSessionForm.resetForm();
        this.getSessionList();
        this.errorMessage = '';

        this.pageAction = 'session-list';
      },
      (error) => {
        this.imgloading = false;
        this.errorMessage = error.error.message;
      }
    );
  }

  deleteSession(id: any) {
    this.eventService.deleteSession(id).subscribe((data: any) => {
      this.getSessionList();
      this.cancelUpdateSessionBack();
    });
  }

  addMoreSpeakers(addSpeakerForm: any) {
    this.imgloading2 = true;
    let body = {
      email: this.roles.email || null,
      userName: this.roles.userName || null,
      stagesAllocated: this.stagesAlloted,
      description: this.roles.description,
      hasAcessToMultipleStages: false,
      canAddSpeaker: false,
      canRemoveSpeaker: false,
      canSendInvitation: false,
      canShareScreen: false,
      eventId: Number(this.eventId),
      eventsRoleType: 'SPEAKER',
      invitationType:'INVITED'

    };
    this.eventService.addRoleManagement(body).subscribe(
      (data: any) => {
        addSpeakerForm.resetForm();
        this.imgloading2 = false;
        this.showSpeakerList();
      },
      (error) => {
        this.imgloading2 = false;
        this.errorMessageOrg = error.error.message;
      }
    );
  }

  getNoOfStages() {
    this.eventService.getVenueId(this.venueIds || localStorage.getItem('spaceId')).subscribe((res: any) => {
      this.noStages = res.data.noOfstages;

      for (let i = 1; i <= this.noStages; i++) {
        this.numIndex = i;
        this.num = 'Stage ' + i;
        this.listofStages.push(this.num);
      }
    });
  }
}
