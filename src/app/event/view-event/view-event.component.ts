import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ManagementConsoleService } from '../../services/event-management-module/management-console.service';

@Component({
  selector: 'app-view-event',
  templateUrl: './view-event.component.html',
  styleUrls: ['./view-event.component.css']
})
export class ViewEventComponent implements OnInit {
  public organizers: any = [];
  public speakers: any = [];
  public events: any;
  eventId: any;
  imgVenue: any;
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
  }

  back() {
    this.router.navigate(['/event-management-console']);
  }

  onClick() {
    this.isActive = !this.isActive;
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
      // console.log(data.length);
      // if (data.length === 0) {
      //   console.log(data.length);
      // } else {

      //   this.noTotalSession = data.length;
      // }
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

  getAttendeeList() {
    this.eventService.getAttendeeManagement(0, 10, this.eventId).subscribe((data: any) => {
      this.attendes = data.userEventsResponseDTOs;
      this.noTotalsAttendes = data.totalElements;
    });
  }

  imgClick() {
    this.router.navigate(['/']);
  }
  backPage() {
    this.router.navigate([`/event-management-console`]);
  }
  editEvents() {
    this.router.navigate([`/preview-publish/${this.eventId}`]);
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
}
