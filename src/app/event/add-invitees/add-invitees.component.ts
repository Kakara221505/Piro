import { ManagementConsoleService } from '../../services/event-management-module/management-console.service';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-add-invitees',
  templateUrl: './add-invitees.component.html',
  styleUrls: ['./add-invitees.component.css']
})
export class AddInviteesComponent implements OnInit {
  public eventData: any;
  inviteeForm!: FormGroup;
  eventForm!: FormGroup;
  imgloading: boolean = false;
  imgloading1: boolean = false;
  fileToUpload: File;
  file: any;
  emailPattern = '^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$';
  roles = {
    email: '' || null,
    userName: '' || null,
    hasAcessToMultipleStages: false,
    canAddSpeaker: false,
    canRemoveSpeaker: false,
    canSendInvitation: false,
    canShareScreen: false,
    eventsRoleType: 'ATTENDEE'
  };
  eventId: any;
  // ids = JSON.parse(this.eventId || '{}');
  // public id = this.ids;
  public attendes: any;
  deleteId: any;
  confirmMessage: string;
  errorMessage: any = null;
  @Output() nextTabEvent = new EventEmitter<string>();
  errorMessageCsv: any = null;
  noTotalsAttendes: any;
  uploadImgs = false;
  reminders:any =[];
  reminder ={
    eventReminderId:''
  }
  public pendingLists:any;
  noPendingElement:any;

  page: number = 1;
  totalElement: any;
  tableSize: number = 10;
  fileUrl:any;
  body: any;
  constructor(
    private formbuilder: FormBuilder,
    private eventService: ManagementConsoleService,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.eventId = this.route.snapshot.paramMap.get('id');
    if (this.eventId != null) {
      this.getAttendeeList();
    }
    this.getReminders();
    this.getEventDetails()
    this.getPendingList();
  }

  getEventDetails() {
    this.eventService.getEvents(this.eventId).subscribe(
      (data: any) => {
        this.reminder.eventReminderId = data.eventReminderId
        this.eventData = data;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  keyFunc(x:any){
    this.errorMessage = ''
  }

  handleFileInput(fileInput: any) {
    this.fileToUpload = <File>fileInput.target.files[0];

  }
  handleFileInput1(fileInput1: any) {
    const file: File = <File>fileInput1.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(<File>fileInput1.target.files[0]);
    reader.onload = (e: any) => {
      this.fileUrl = e.target.result;
    };
    const formData = new FormData();
    formData.append('csv', file);
    reader.addEventListener('load', (event: any) => {

      this.eventService.uploadExcelFile(formData, this.eventId).subscribe(
        (data: any) => {
          this.toastr.success('CSV Uploaded Successfully!');
          this.getAttendeeList();
          this.router.navigateByUrl(`/add-events/add-invitees/${this.eventId}`);
          this.nextTabs('add-invitees');
          this.imgloading = false;
        },
        (error) => {
          this.toastr.error('Current Attendees Are Greater Than Max Attendees!');
          this.getAttendeeList();
          this.nextTabs('add-invitees');
          this.imgloading = false;
        }
      );
    });
  }
  nextTabs(value: string) {
    this.nextTabEvent.emit(value);
  }
  saveExcels() {
    this.uploadImgs = true;
    this.imgloading = true;
    const formData = new FormData();
    formData.append('csv', this.fileToUpload);
    this.eventService.uploadExcelFile(formData, this.eventId).subscribe(
      (data: any) => {
        this.toastr.success('CSV Uploaded Successfully!');
        this.uploadImgs = false;
        this.getAttendeeList();
        this.router.navigateByUrl(`/add-events/add-event-session/${this.eventId}`);
        this.imgloading = false;

      },
      (error) => {
       
        this.getAttendeeList();
        this.imgloading = false;
        this.errorMessageCsv = error.error.message;
      }
    );
  }

  saveReminder(){
    let body ={
      eventId: this.eventId,
      eventReminderId: this.reminder.eventReminderId
    }
    this.eventService.addorUpdateReminder(body).subscribe((data:any) =>{
      this.router.navigate([`/add-events/add-event-session/${this.eventId}`]);
      
    })
  }
  saveInvitees1() {
    this.imgloading1 = true;
    this.router.navigate([`/add-events/add-event-session/${this.eventId}`]);
    this.nextTabs('add-event-session');
    setTimeout(() => {
      this.imgloading1 = false;
    }, 1000);
  }

  saveInvitees(eventreminderForm:any) {
    this.imgloading1 = true;
    let body ={
      eventId: this.eventId,
      eventReminderId: this.reminder.eventReminderId
    }
    this.eventService.addorUpdateReminder(body).subscribe((data:any) =>{
      this.router.navigate([`/add-events/add-event-session/${this.eventId}`]);
    })
  }
  getAttendeeList() {
    this.eventService.getAttendeeManagement(0, 100, this.eventId).subscribe((data: any) => {
      this.attendes = data.userEventsResponseDTOs;
      this.noTotalsAttendes = data.totalElements;
    });
  }
  addInvite(addInvitees: any) {
    this.imgloading = true;
    let body = {
      email: this.roles.email,
      userName: this.roles.userName,
      hasAcessToMultipleStages: null,
      canAddSpeaker: null,
      canRemoveSpeaker: null,
      canSendInvitation: null,
      canShareScreen: null,
      eventId: Number(this.eventId),
      eventsRoleType: 'ATTENDEE',
      invitationType: 'INVITED',
      description: null,
      stagesAllocated: []
    };
    if (body.email === null || body.userName === null) {
      this.imgloading = false;
    } else {
      this.eventService.addInvitees(body).subscribe(
        (data: any) => {
          addInvitees.resetForm();
          this.getAttendeeList();
          this.imgloading = false;
          this.errorMessage = '';
        },
        (error) => {
          this.imgloading = false;
          this.errorMessage = error.error.message;
        }
      );
    }
  }

  deleteAttende(fullName: string, id: any) {
    this.deleteId = id;
    this.confirmMessage = `${fullName}`;
  }

  yes() {
    this.eventService.deleteAttendeManagement(this.deleteId).subscribe(
      (data: any) => {
        this.getAttendeeList();
      },
      (error) => {
        console.log(error);
      }
    );
  }

  approvedAttende(fullName: 'APPROVED', id: any) {
    this.deleteId = id;
    this.confirmMessage = `${fullName}`;
     this.body={
      eventRegistrationId:this.deleteId,
      status:this.confirmMessage
    }
  }

  

  yes1() {
    this.eventService.approveAttendeManagement(this.body).subscribe(
      (data: any) => {
        this.getAttendeeList();
      },
      (error) => {
        console.log(error);
      }
    );
  }

  getReminders(){
    this.eventService.getReminderList().subscribe((data:any) =>{
      this.reminders=data;
    })
  }

  getPendingList(){
    this.eventService.getEventRequestList(0,10,'approved',this.eventId).subscribe((data:any) =>{
      this.pendingLists = data.data;
      this.noPendingElement = data.totalElements;
    })
  }

  onTableDataChange() {
    this.eventService.getAttendeeManagement(this.page-1, this.tableSize, this.eventId).subscribe((data: any) => {
      this.attendes = data.userEventsResponseDTOs;
      this.totalElement = data.totalElements;
      this.noTotalsAttendes = data.totalElements;
    });
  }
}
