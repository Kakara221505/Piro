import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JoinSesionService } from '../../services/join-module/join-sesion.service';
import { DatePipe } from '@angular/common';
import { ManagementConsoleService } from '../../services/event-management-module/management-console.service';
import { ProfileService } from '../../services/profile-module/profile.service';
@Component({
  selector: 'app-list-events',
  templateUrl: './list-events.component.html',
  styleUrls: ['./list-events.component.css']
})
export class ListEventsComponent implements OnInit {
  public allEvents: any;
  public upComingEvents: any;
  public pastEvents: any;
  public events: any;
  public todayDate: any = new Date();
  eventIds: any;
  displayStyle = 'none';
  listStyle = 'none';
  endDates: any;
  currentDateTime: any;
  expiredEvent: any;
  lastDate: any;
  currentTime: any;
  noEventsPast: any;
  noUpcomingsEvents: any;
  earlyAccessStatus: any;
  accessCheck: any;
  check: any;
  profileName:any;
  constructor(
    private router: Router,
    private joinSesion: JoinSesionService,
    public datepipe: DatePipe,
    private eventService: ManagementConsoleService,
    private profileService: ProfileService
  ) {}

  ngOnInit(): void {
    this.currentDateTime = this.datepipe.transform(new Date(), 'yyyy-MM-ddThh:mm:ss');
    this.getAllEvent();
    this.earlyAccessGetApplied();
    this.getDetails();
  }

  showTimer() {
    this.currentTime = this.datepipe.transform(new Date(), 'hh:mm:ss');
  }

  signout() {
    this.router.navigate(['/login']);
    localStorage.removeItem('X-Custom-Token');
    localStorage.removeItem('event-id');
    localStorage.removeItem('spaceId');
    localStorage.removeItem('isLoggedin');
    window.location.reload();
  }
  addEvents() {
    this.router.navigate(['/choose-event']);
  }
  getDetails() {
    this.profileService.getAllDetails().subscribe((data:any) =>{
      this.profileName = data.fullName;

    })
  }
  earlyAccessGetApplied() {
    this.eventService.getEarlyAccessApplied().subscribe((data: any) => {
      this.check = data.data;
      this.earlyAccessStatus = this.check.earlyAccessStatus;
      this.accessCheck = this.check.earlyAccess;
    });
  }
  routeJoin() {
    this.router.navigate([]).then((result) => {
      window.open(`/join/${this.eventIds}`, '_blank');
    });
  }

  getUpcomingEvent() {
    this.joinSesion.getEventsList('UPCOMING', 0, 10).subscribe((data: any) => {
      this.upComingEvents = data.myEvents;
      this.noUpcomingsEvents = data.totalElements;
      console.log(this.noUpcomingsEvents);
    });
  }
  getAllEvent() {
    this.joinSesion.getEventsList('ALL', 0, 10).subscribe((data: any) => {
      this.allEvents = data.myEvents;
      for (let date of data.myEvents) {
        // this.lastDate = this.currentDateTime <= date.endDate;
        // console.log(this.lastDate);
        let dates = date.endDate;
      }
      if (this.allEvents.length != 0) {
        this.displayStyle = 'none';
        this.listStyle = 'block';
      } else {
        this.displayStyle = 'block';
        this.listStyle = 'none';
      }
    });
  }
  getPastEvent() {
    this.joinSesion.getEventsList('PAST', 0, 10).subscribe((data: any) => {
      this.pastEvents = data.myEvents;
      this.noEventsPast = data.totalElements;
    });
  }

  joinEvent(identifier: any) {
    this.router.navigate([]).then((result) => {
      window.open(`/join/${identifier}`, '_blank');
    });
  }
}
