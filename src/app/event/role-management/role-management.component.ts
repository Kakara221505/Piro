import { ManagementConsoleService } from '../../services/event-management-module/management-console.service';
import { Component, OnInit, Output, EventEmitter, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
@Component({
  selector: 'app-role-management',
  templateUrl: './role-management.component.html',
  styleUrls: ['./role-management.component.css']
})
export class RoleManagementComponent implements OnInit {
  public numIndex: any;
  public events: any;
  num: any;
  listofStages: any = [];
  stagesAlloted: number;
  stagesAlloted1: number;
  emailValidate: boolean = true;
  emailPattern = '^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$';
  alphabetValid='^[a-zA-Z() ]+$';
  roleForm!: FormGroup;
  imgloading: boolean = false;
  imgloading1: boolean = false;
  imgloading2: boolean = false;
  displayStyle = 'none';

  public organizers: any;
  public speakers: any;
  roles = {
    email: '',
    userName: '',
    hasAcessToMultipleStages: false,
    canAddSpeaker: false,
    canRemoveSpeaker: false,
    canSendInvitation: false,
    canShareScreen: false,
    eventsRoleType: 'ORGANIZER',
    stagesAlloted: '',
    description: ''
  };
  organizerRole = {
    email: '',
    userName: '',
    hasAcessToMultipleStages: false,
    canAddSpeaker: false,
    canRemoveSpeaker: false,
    canSendInvitation: false,
    canShareScreen: false,
    eventsRoleType: 'ORGANIZER',
    stagesAlloted: '',
    description: ''
  }
  editRoles = {
    email: '',
    userName: null,
    hasAcessToMultipleStages: false,
    canAddSpeaker: false,
    canRemoveSpeaker: false,
    canSendInvitation: false,
    canShareScreen: false,
    eventsRoleType: 'ORGANIZER'
  };

  roleId: any;
  deleteId: any;
  confirmMessage: string;
  noStages: any;
  @Output() nextTabEvent = new EventEmitter<string>();
  eventId: any;
  @ViewChild('addSpeakerForm')
  addSpeakerForm: NgForm;

  errorMessage: any = null;
  errorMessageOrg: any = null;
  venueIds: any;
  imgloadingUpdate:boolean = false;

  noTotalsOrganizer: any;
  noTotalsAttendes: any;
  noTotalSpeakers: any;
  constructor(private route: ActivatedRoute, private formbuilder: FormBuilder, private eventService: ManagementConsoleService,    private router: Router) {}

  ngOnInit(): void {
    this.eventId = this.route.snapshot.paramMap.get('id');
    this.getEventDetails();
    if(this.eventId != null){
      this.showSpeakerList();
      this.getOrganizerList();
    }
    // this.route.params.subscribe((params: any) => {
    //   this.eventId = params['id'];
    //   this.showSpeakerList(params['id']);
    //   this.getOrganizerList(params['id']);
    // });

    this.roleForm = this.formbuilder.group({
      email: ['', [Validators.required, Validators.email]],
      userName: ['', Validators.required],
      canAddSpeaker: [],
      canRemoveSpeaker: [],
      canSendInvitation: [],
      hasAcessToMultipleStages: []
    });
    setTimeout(() => {

      this.getNoOfStages();
    }, 500);
  }

  getEventDetails() {
    this.eventService.getEvents(this.eventId).subscribe((data: any) => {
      this.events = data;
      this.venueIds = data.venueId;
    });
  }
  get f() {
    return this.roleForm.controls;
  }
  nextTabs(value: string) {
    this.nextTabEvent.emit(value);
  }

  keyFunc(x:any){
    this.errorMessageOrg = ''
  }


  keyFuncSpeaker(x:any){
    this.errorMessage = ''
  }
  save() {
    this.imgloading1 = true;
    this.router.navigateByUrl(`/add-events/add-invitees/${this.eventId}`);
    window.scrollTo(0, 0);

    setTimeout(() => {
      this.imgloading1 = false;
    }, 1000);
  }

  validateEmail(roles: NgForm) {
    const expression: RegExp = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

    let inputs = roles.value.email;
    console.log(inputs);
    const result: boolean = expression.test(inputs);
    if (!inputs == result) {
      this.emailValidate = false;
      console.log(this.emailValidate);
    } else {
      this.emailValidate = true;
    }
  }

  addOrganizer(addRoleManagement: any) {
    this.imgloading = true;
    let body = {
      email: this.organizerRole.email || null,
      userName: this.organizerRole.userName || null,
      hasAcessToMultipleStages: this.organizerRole.hasAcessToMultipleStages,
      canAddOrRemoveSpeaker: this.organizerRole.canAddSpeaker,
      canRemoveSpeaker: false,
      canSendInvitation: this.organizerRole.canSendInvitation,
      canShareScreen: this.organizerRole.canShareScreen,
      eventId: Number(this.eventId),
      eventsRoleType: 'ORGANIZER',
      invitationType:'INVITED',
      description: null,
      stagesAllocated: []
    };
    if (body.email === null) {
      this.imgloading = false;
    } else {
      this.eventService.addRoleManagement(body).subscribe(
        (data: any) => {
          this.imgloading = false;
          addRoleManagement.resetForm();
          this.getOrganizerList();
          this.errorMessageOrg = '';
        },
        (error) => {
          this.imgloading = false;
          this.errorMessageOrg = error.error.message;
        }
      );
    }
  }

  getOrganizerList() {
    this.eventService.getRoleManagement(0,100,this.eventId).subscribe((data: any) => {
      this.organizers = data.userEventsResponseDTOs;
      this.noTotalsOrganizer = data.totalElements;
    });
  }
  deleteRole(fullName: string, id: any) {
    this.deleteId = id;
    this.confirmMessage = `${fullName}`;
  }

  updateRole() {
    let body = {
      canAddOrRemoveSpeaker: this.editRoles.canAddSpeaker,
      canRemoveSpeaker: this.editRoles.canAddSpeaker,
      canSendInvitation: this.editRoles.canSendInvitation,
      canShareScreen: this.editRoles.canShareScreen,
      changesInStagesAllocated: null,
      description: null,
      eventsRoleType: 'ORGANIZER',
      hasAcessToMultipleStages: this.editRoles.hasAcessToMultipleStages,
      stagesAllocate: [],
      userEventId:this.roleId
    };
    return this.eventService.updateOrganizer(body).subscribe((data: any) => {

    });
  }

  showSpeakerList() {
    this.eventService.getSpeakerManagementList(0,100,this.eventId).subscribe((data: any) => {
      this.speakers = data.userEventsResponseDTOs;
      this.noTotalSpeakers = data.totalElements;
    });
  }

  addSpeaker(addSpeakerForm: any) {
    this.imgloading2 = true;
    let body = {
      email: this.roles.email || null,
      userName: this.roles.userName || null,
      stagesAllocated: this.stagesAlloted,
      description: this.roles.description,
      hasAcessToMultipleStages: false,
      canAddOrRemoveSpeaker: false,
      canRemoveSpeaker: false,
      canSendInvitation: false,
      canShareScreen: false,
      eventId: Number(this.eventId),
      eventsRoleType: 'SPEAKER',
      invitationType:'INVITED'
    };
    if (body.email === null) {
      this.imgloading2 = false;
    } else {
      this.eventService.addRoleManagement(body).subscribe(
        (data: any) => {
          addSpeakerForm.resetForm();
          this.showSpeakerList();
          this.imgloading2 = false;
          this.errorMessage = '';
        },
        (error) => {
          this.imgloading2 = false;
          this.errorMessage = error.error.message;
        }
      );
    }
  }

  yes() {
    this.eventService.deleteRoleManagement(this.deleteId).subscribe(
      (data: any) => {
        this.getOrganizerList();
        this.showSpeakerList();
      },
      (error) => {
        console.log(error);
      }
    );
  }

  editModal(id: any) {
    this.roleId = id;
    this.eventService.getEventUserId(id).subscribe((data:any) =>{
      console.log(data);
      this.editRoles.canAddSpeaker=data.canAddOrRemoveSpeaker;
      this.editRoles.canSendInvitation=data.canSendInvitation;
      this.editRoles.canShareScreen=data.canShareScreen;
      this.editRoles.hasAcessToMultipleStages=data.hasAcessToMultipleStages;
    })
  }

  editModal2(id: any) {
    this.roleId = id;
    this.addSpeakerForm.resetForm();
    this.eventService.getEventUserId(id).subscribe((data:any) =>{
      this.stagesAlloted1=data.stagesAllocated;

    })
  }

  getNoOfStages() {
    this.eventService.getVenueId(this.venueIds || localStorage.getItem('spaceId')).subscribe((res: any) => {
      this.noStages = res.data.noOfstages;
      for (let i = 1; i <= this.noStages; i++) {
        this.numIndex = i;
        this.num = 'Stages ' + i;
        this.listofStages.push(this.num);
      }
    });
  }

  updateSpeaker(updateSpeker: any) {
    this.imgloadingUpdate=false;
    let body = {
      canAddOrRemoveSpeaker: null,
      canRemoveSpeaker: null,
      canSendInvitation: null,
      canShareScreen: null,
      changesInStagesAllocated: true,
      description: null,
      eventsRoleType: 'SPEAKER',
      hasAcessToMultipleStages: null,
      stagesAllocated: this.stagesAlloted1,
      userEventId:this.roleId
    };
    this.eventService.updateSpeaker(body).subscribe((data: any) => {
      this.imgloadingUpdate=false;
      this.showSpeakerList();
    });
  }
}
