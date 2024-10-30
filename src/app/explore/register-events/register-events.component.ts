import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ManagementConsoleService } from '../../services/event-management-module/management-console.service';
import { ExploreServicesService } from '../../services/explore-module/explore-services.service';

@Component({
  selector: 'app-register-events',
  templateUrl: './register-events.component.html',
  styleUrls: ['./register-events.component.css']
})
export class RegisterEventsComponent implements OnInit {

  public organizers: any = [];
  public speakers: any = [];
  public events: any;
  eventId: any;
  imgVenue = '../../assets/images/Sci fi 2.png';
  public sessions: any;
  public attendes: any = [];
  imgloadingPub: boolean = false;
  unpublish: any;
  venueIds: any;
  isActive: boolean = false;
  edits: boolean = false;
  noTotalsOrganizer: any;
  noTotalsAttendes: any;
  noTotalSpeakers: any;
  noTotalSession = 0;

  page: number = 1;
  totalElement: any;
  tableSize: number = 10;

  pageOrg: number = 1;
  totalElementOrg: any;
  tableSizeOrg: number = 10;

  pageSpk: number = 1;
  totalElementSpk: any;
  tableSizeSpk: number = 10;

  eventIds:any
  registerData:any

  firstModal = 'block';
  secondModal = 'none';
  passwordModal = 'block';
  passwordRegistrationModal = 'none';

  errorMessage: any = null;
  showHours: any;
  showMintues: any;
  showSeconds: any;
  password: any;
  timer: any;
  constructor(private eventService: ManagementConsoleService, private route: ActivatedRoute, private router: Router,private exploreService: ExploreServicesService) {}

  ngOnInit(): void {
    this.eventId = this.route.snapshot.paramMap.get('id');
    this.getPreviewDetails();
    this.getSessionList();
    this.showSpeakerList();
    this.getOrganizerList();
    this.getRegistrationDetails();
    window.scrollTo(0,0)
  }



  getRegistrationDetails(){
    this.exploreService.getRegisterData(this.eventId).subscribe((data:any) =>{
      this.registerData = data;
      console.log(data);
    })
  }

  back() {
    this.router.navigate(['/explore']);
  }

  onClick() {
    this.isActive = !this.isActive;
  }

  gotToEvents() {
    this.router.navigate(['/all-events']);
  }


  getPreviewDetails() {
    this.eventService.getEvents(this.eventId).subscribe((data: any) => {
      this.events = data;
      this.unpublish = data.eventStatus;
      this.venueIds = data.venueId;
    });
  }

  getSessionList() {
    this.eventService.getSession(this.eventId).subscribe((data: any) => {
      if (data.length !== 0) {
        this.sessions = data;
        this.noTotalSession = 1;
      }else if(data.length === 0){
        this.noTotalSession=0;
      }
    });
  }

  getVenueImage() {
    this.eventService.getVenueImageId(this.venueIds || localStorage.getItem('spaceId')).subscribe(
      (data: any) => {
        this.imgVenue = data.data.venueImageDTOList[0].imageUrl;
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  getOrganizerList() {
    this.eventService.getRoleManagement(0, 10, this.eventId).subscribe((data: any) => {
      this.organizers = data.userEventsResponseDTOs;
      this.noTotalsOrganizer = data.totalElements;
    });
  }

  showSpeakerList() {
    this.eventService.getSpeakerManagementList(0, 10, this.eventId).subscribe((data: any) => {
      this.speakers = data.userEventsResponseDTOs;
      this.noTotalSpeakers = data.totalElements;
    });
  }

  imgClick() {
    this.router.navigate(['/']);
  }
  backPage() {
    this.router.navigate([`/explore`]);
  }
  onTableDataChange() {
    this.eventService.getAttendeeManagement(this.page-1, this.tableSize, this.eventId).subscribe((data: any) => {
      this.attendes = data.userEventsResponseDTOs;
      this.totalElement = data.totalElements;
      this.noTotalsAttendes = data.totalElements;
    });
  }
  onTableDataChangeOrg(){
    this.eventService.getRoleManagement(this.pageOrg-1, this.tableSizeOrg, this.eventId).subscribe((data: any) => {
      this.totalElement =0;
      this.organizers = data.userEventsResponseDTOs;
      this.totalElementOrg=data.totalElements
      this.noTotalsOrganizer = data.totalElements;
    });
  }
  onTableDataChangeSpk(){
    this.eventService.getSpeakerManagementList(this.pageOrg-1, this.tableSizeOrg, this.eventId).subscribe((data: any) => {
      this.totalElement =0;
      this.totalElementOrg=0;
      this.speakers = data.userEventsResponseDTOs;
      this.totalElementSpk=data.totalElements;
      this.noTotalSpeakers = data.totalElements;
    });
  }

  dateAndTime(): any {
    var countDownDate = new Date(this.timer).getTime();
    var now = new Date();
    var d2 = new Date(
      now.getUTCFullYear(),
      now.getUTCMonth(),
      now.getUTCDate(),
      now.getUTCHours(),
      now.getUTCMinutes(),
      now.getUTCSeconds()
    );
    var distance = countDownDate - d2.getTime();

    this.showHours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    this.showMintues = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    this.showSeconds = Math.floor((distance % (1000 * 60)) / 1000);
  }

    proceed() {
    let body ={
      eventId: this.eventIds,

    }
    this.exploreService.registerOpenAccess(body).subscribe((data: any) => {
      this.firstModal = 'none';
      this.secondModal = 'block';
      this.getRegistrationDetails();
    });
  }

  getId(id: any) {
    this.eventIds = id;
  }

  savePassworAccess(passwordFrom: any) {
    let body ={
      eventId: this.eventIds,
      password: this.password
    }
    this.exploreService.savePasswords(body).subscribe((data: any) => {
      this.passwordModal = 'none';
      this.passwordRegistrationModal = 'block';
      this.getRegistrationDetails();
    },(error)=>{
      if(error.status === 400){
        this.errorMessage = 'Invalid Password!'
      }

    });
  }

  requestAccess(){
    let body = {
      eventId: this.eventIds,
    }
    this.exploreService.registerOpenAccess(body).subscribe((data: any) => {
     this.getRegistrationDetails();
    });
  }


}
