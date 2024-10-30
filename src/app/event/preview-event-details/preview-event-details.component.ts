import { ManagementConsoleService } from '../../services/event-management-module/management-console.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-preview-event-details',
  templateUrl: './preview-event-details.component.html',
  styleUrls: ['./preview-event-details.component.css']
})
export class PreviewEventDetailsComponent implements OnInit {
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

  totalEmailTypes:any;
  href:any
  utcStartDate:any;
  utcEndDate:any;
 link="https://dev.pirospace.com/join"
//  link="https://stage-v1.pirospace.com/join"
  showUtcStartDate:any;
  showUtcEndDate:any;
  copyLink: string;
  eventJoinId: any;
  moralishName: any;
  acessType: any;
  moralisMessage: boolean =false
  constructor(private eventService: ManagementConsoleService, private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.eventId = this.route.snapshot.paramMap.get('id');
    this.getPreviewDetails();
    this.getSessionList();
    this.showSpeakerList();
    this.getOrganizerList();
    this.getAttendeeList();
    setTimeout(() => {
      this.getVenueImage();
    }, 500);
    this.href = this.router.url;
    // console.log(this.href);
  }

  getPreviewDetails() {
    this.eventService.getEvents(this.eventId).subscribe((data: any) => {
      this.events = data;
      this.unpublish = data.eventStatus;
      this.venueIds = data.venueId;
      this.acessType = data.acessType;
      if (data.acessType === 'NFT_BASED') {
        this.moralisMessage=true
        this.moralishName = data.nftBasedData.name
      }
     
      this.eventJoinId=this.link+'/'+data.identifier
      console.log(this.eventJoinId)
      this.utcStartDate = data.utcStartDate;
      this.utcEndDate = data.utcEndDate;
      this.showUtcStartDate = new Date(this.utcStartDate);
      console.log(this.showUtcStartDate.getTimezoneOffset());
      this.showUtcEndDate = new Date(this.utcEndDate)
      // this.totalEmailTypes = data.acessType.eventWhiteListDomains[length]
      // console.log(this.totalEmailTypes);
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
      (error) => {
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

  getAttendeeList() {
    this.eventService.getAttendeeManagement(0, 10, this.eventId).subscribe((data: any) => {
      this.attendes = data.userEventsResponseDTOs;
      this.totalElement = data.totalElements;
      this.noTotalsAttendes = data.totalElements;
    });
  }
  publishEvent(eventStatus: any) {
    let body = {
      acessType: null,
      endDate: null,
      eventCategoryId: null,
      eventId: Number(this.eventId),
      eventStatus: eventStatus,
      eventSummary: null,
      eventTypeId: null,
      eventUrlLink: null,
      privacyType: null,
      startDate: null,
      title: null,
      venueId: null
    };
    this.imgloadingPub = true;
    this.eventService.updateEvents(body).subscribe((data: any) => {
      localStorage.removeItem('spaceId');
      this.router.navigate(['/event-management-console']);
      this.imgloadingPub = false;
    });
  }
  imgClick() {
    this.router.navigate(['/']);
  }

  editDataSessioin() {
    window.scrollTo(0, 0);
    this.router.navigateByUrl(`/add-events/add-event-session/${this.eventId}`);
  }
  editDataBasic() {
    window.scrollTo(0, 0);
    this.router.navigate([`/add-events/basic-details/${this.eventId}`]);
  }
  editDataManage() {
    window.scrollTo(0, 0);
    this.router.navigate([`/add-events/manage-space/${this.eventId}`]);
  }
  editDataAccessManage() {
    window.scrollTo(0, 0);
    this.router.navigate([`/add-events/access-manage/${this.eventId}`]);
  }
  editDataAttede() {
    window.scrollTo(0, 0);
    this.router.navigate([`/add-events/add-invitees/${this.eventId}`]);
  }

  editDataRole() {
    window.scrollTo(0, 0);
    this.router.navigate([`/add-events/role-management/${this.eventId}`]);
  }

  back() {
    this.router.navigate([`/add-events/add-event-session/${this.eventId}`]);
  }
  backPage() {
    this.router.navigate([`/event-management-console`]);
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

  editEvents() {
    this.router.navigate([`/add-events/basic-details/${this.eventId}`]);
  }

  copyText(val:any){
    let selBox = document.createElement('textarea');
      selBox.style.position = 'fixed';
      selBox.style.left = '0';
      selBox.style.top = '0';
      selBox.style.opacity = '0';
      selBox.value = val;
      document.body.appendChild(selBox);
      selBox.focus();
      selBox.select();
      document.execCommand('copy');
      document.body.removeChild(selBox);
    }

    copyText1() {
      // this.message=true
      this.copyLink=this.link+'/'
       
     }
}
