import { ManagementConsoleService } from './../../services/event-management-module/management-console.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-event-management-console',
  templateUrl: './event-management-console.component.html',
  styleUrls: ['./event-management-console.component.css']
})
export class EventManagementConsoleComponent implements OnInit {
  imgloading: boolean = false;
  public drafts: any;
  public publishes: any;
  displayStyle = 'none';
  listStyle = 'none';

  page: number = 1;
  page1: number = 1;
  totalElement: any;
  totalElementDraft: any;
  tableSize: number = 10;
  tableSize1: number = 10;
  tableSizes: any = [10, 50, 100];
  public eventIds: any;
  publishIdentifier: any;
  currentDateTime: any;
  noPublishEvents: any;
  title: any;
  question: any;
  id: any;
  earlyAccessGet: any;
  businessName: null;
  data1: any;
  earlyAccessId: any;
  accessQuestionArray: any = [];
  earlyquestion: any = [];
  answers: any = [];
  accessArray: any;
  check: any;
  earlyApplied: boolean = true
  earlyAccessStatus: any;
  accessCheck:any;
  constructor(private router: Router, private eventService: ManagementConsoleService, public datepipe: DatePipe) { }

  ngOnInit(): void {
    this.currentDateTime = this.datepipe.transform(new Date(), 'yyyy-MM-ddThh:mm:ss');
    this.earlyAccessGetApplied()
    this.getListOfPublishEvents();
  }

  addEvents() {
    this.router.navigate(['/choose-event']);
  }

  signout() {
    this.router.navigate(['/login']);
    localStorage.removeItem('X-Custom-Token');
    localStorage.removeItem('event-id');
    localStorage.removeItem('spaceId');
    localStorage.removeItem('isLoggedin');
    window.location.reload();
  }

  getListOfDraftEvents() {
    this.eventService.getAllEventsConsole('DRAFT', 0, 10).subscribe((res: any) => {
      this.drafts = res.myEvents;
      this.totalElementDraft = res.totalElements;
      this.totalElement = '';
      this.page = 1;
      // if (this.drafts.length != 0) {
      //   this.displayStyle = 'none';
      //   this.listStyle = 'block';
      // } else {
      //   this.displayStyle = 'block';
      //   this.listStyle = 'none';
      // }
    });
  }

  onTableDataChange() {
    this.eventService.getAllEventsConsole('DRAFT', this.page - 1, this.tableSize).subscribe((data: any) => {
      this.drafts = data.myEvents;
    });
  }
  getListOfPublishEvents() {
    this.eventService.getAllEventsConsole('PUBLISHED', 0, 10).subscribe((data: any) => {
      this.publishes = data.myEvents;
      // this.publishes = data.myEvents.map((publish:any) => ({
      //   ...publish,
      //   localStartDate: this.datepipe.transform(publish.utcStartDate, 'shortTime', 'local'),
       
      //   localEndDate: this.datepipe.transform(publish.utcEndDate, 'shortTime', 'local')
      // }));
      console.log("vivek",this.publishes)
      this.publishIdentifier = data.myEvents.identifier;
      this.totalElement = data.totalElements;
      this.noPublishEvents = data.totalElements;
      this.totalElementDraft = '';
      this.page = 1;
       if (this.publishes.length != 0) {
        this.displayStyle = 'none';
        this.listStyle = 'block';
      } else {
        this.displayStyle = 'block';
        this.listStyle = 'none';
      }
    });
  }
  onTableDataChange1() {
    this.eventService.getAllEventsConsole('PUBLISHED', this.page - 1, this.tableSize).subscribe((data: any) => {
      this.publishes = data.myEvents;
    });
  }

  editEvent() {
    this.router.navigate([`/add-events/${this.eventIds}/basic-details`]);
  }

  routeJoin() {
    this.router.navigate([]).then((result) => {
      window.open(`/join/${this.publishIdentifier}`, '_blank');
    });
  }

  earlyAccessGetApplied() {
    this.eventService.getEarlyAccessApplied().subscribe((data: any) => {
      this.check = data.data
      this.earlyAccessStatus=this.check.earlyAccessStatus;
      this.accessCheck = this.check.earlyAccess;
    });
  }

  earlyAccess() {
    this.eventService.getEarlyAccess().subscribe((data: any) => {
      this.earlyAccessGet = data.data;
      // for (let earlyAccessArray of this.earlyAccessGet) {
      //   this.accessQuestionArray.push({ 'questionId': earlyAccessArray.id, 'answer':  this.answers[earlyAccessArray.id] });
      // }
      for (let m of this.earlyAccessGet) {
        let model = {
          questionId: m.id,
          answer: m.answers
        }
        this.earlyquestion.push(model);
      }
    });
  }
  earlyAccessPost(getEarlyForm: any) {
    this.earlyquestion.forEach((e: any, i: any) => {
      e.answer = this.answers[i]
    })
    let body = {
      businessName: 'string',
      earlyAccessStatus: 'APPLIED',
      earlyAccessQuestion: this.earlyquestion
    };
    this.eventService.postEarlyAccess(body).subscribe((data: any) => {
      getEarlyForm.reset();
      this.earlyAccessGetApplied();
    });
  }

  joinEvent(identifier: any) {
    this.router.navigate([]).then((result) => {
      window.open(`/join/${identifier}`, '_blank');
    });
  }
}
