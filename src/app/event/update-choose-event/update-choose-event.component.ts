import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ManagementConsoleService } from '../../services/event-management-module/management-console.service';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-update-choose-event',
  templateUrl: './update-choose-event.component.html',
  styleUrls: ['./update-choose-event.component.css']
})
export class UpdateChooseEventComponent implements OnInit {
  public eventData: any;
  public chooseEvent: any;
  select: any;
  isFavorite: any;
  bookForm!: FormGroup;
  venueId: any;
  imgloading: boolean = false;
  @Output() nextTabEvent1 = new EventEmitter<string>();
  eventId: any;
  contentLoaded = false;
  imgVenues = '../../assets/images/Sci fi 2.png';
  constructor(
    private router: Router,
    private eventService: ManagementConsoleService,
    private location: Location,
    private formbuilder: FormBuilder,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.eventId = this.route.snapshot.paramMap.get('id');
    this.getSpaceEvent();
    this.getEventDetails();
  }

  getSpaceEvent() {
    this.eventService.getSpace().subscribe((data: any) => {
      this.chooseEvent = data.data;
      this.contentLoaded = true;

    });
  }

  nextTabs(value: string) {
    this.nextTabEvent1.emit(value);
  }

  Save() {
    let body = {
      venueId: localStorage.getItem('spaceId'),
      eventId: this.eventId,
      title: null,
      maxAttendees: null,
      eventStartDate: null,
      eventEndDate: null,
      eventTypeId: null,
      eventCategoryId: null,
      eventPrivacy: null,
      eventSummary: null
    };
    this.imgloading = true;
    this.eventService.updateSpace(body).subscribe((data: any) => {
      this.router.navigate([`/add-events/manage-space/${this.eventId}`]);
      this.imgloading = false;
      this.nextTabs('manage-space')
    },(error) =>{
      this.imgloading = false;
    });
  }

  cancel() {
    this.router.navigate([`/add-events/manage-space/${this.eventId}`]);
    this.nextTabs('manage-space')

  }
  onCLickImg(id: any) {
    this.select = id;
    localStorage.setItem('spaceId', this.select);
    this.isFavorite = id;
  }

  getEventDetails() {
    this.eventService.getEvents(this.eventId).subscribe((data: any) => {
      this.eventData = data;
      this.select = data.venueId
    });
  }
}
