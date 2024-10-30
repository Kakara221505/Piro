import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-add-event-management-console',
  templateUrl: './add-event-management-console.component.html',
  styleUrls: ['./add-event-management-console.component.css']
})
export class AddEventManagementConsoleComponent implements OnInit, AfterViewInit {
  activeTab: any = 'basic-details';
  activeTab1: string;
  buttonChange = 1;
  clickActive: any;
  eventId: any = 0;
  @ViewChild('basicDetails') basicDetails: ElementRef<HTMLElement>;
  @ViewChild('manageSpace') manageSpace: ElementRef<HTMLElement>;
  @ViewChild('accessManagement') accessManagement: ElementRef<HTMLElement>;
  @ViewChild('roleManagement') roleManagement: ElementRef<HTMLElement>;
  @ViewChild('addInvitees') addInvitees: ElementRef<HTMLElement>;
  @ViewChild('addEventSession') addEventSession: ElementRef<HTMLElement>;
  constructor(private router: Router, private route: ActivatedRoute, private cd: ChangeDetectorRef) {
    //let tab = this.route.snapshot.paramMap.get('tab');
    //console.log(tab);
  }

  ngOnInit(): void {


    let id = this.route.snapshot.paramMap.get('id');

    if (id != undefined && id != '0') {
      this.eventId = id;
    }

    this.router.events.subscribe((ev) => {


      if(ev instanceof NavigationEnd){
        let tab = this.route.snapshot.paramMap.get('tab');

        let id = this.route.snapshot.paramMap.get('id');
        this.eventId = id;

        console.log("Navigation End");
        this.activeTab = tab;
        this.nextTab(this.activeTab);
      }
      //console.log(ev);
    });



    console.log(this.activeTab);


  }

  ngAfterViewInit(): void {
    if (this.activeTab != undefined) {
      this.nextTab(this.activeTab);
    }
  }

  signout() {
    this.router.navigate(['/login']);
    localStorage.removeItem('X-Custom-Token');
    localStorage.removeItem('event-id');
    localStorage.removeItem('spaceId');
    localStorage.removeItem('isLoggedin');
    window.location.reload();
  }

  goToNextTab(tabName: any) {
    this.router.navigate([`/add-events/${tabName}/${this.eventId}`]);
  }

  nextTab(nextTabs: string) {
    this.activeTab = nextTabs;
    if (nextTabs === 'basic-details') {
      let el: HTMLElement = this.basicDetails.nativeElement;
      el.click();
      this.cd.detectChanges();
    } else if (nextTabs === 'manage-space') {
      let el: HTMLElement = this.manageSpace.nativeElement;
      el.click();
      this.cd.detectChanges();
    } else if (nextTabs === 'access-manage') {
      let el: HTMLElement = this.accessManagement.nativeElement;
      el.click();
      this.cd.detectChanges();
    } else if (nextTabs === 'role-management') {
      let el: HTMLElement = this.roleManagement.nativeElement;
      el.click();
      this.cd.detectChanges();
    } else if (nextTabs === 'add-invitees') {
      let el: HTMLElement = this.addInvitees.nativeElement;
      el.click();
      this.cd.detectChanges();
    } else if (nextTabs === 'add-event-session') {
      let el: HTMLElement = this.addEventSession.nativeElement;
      el.click();
      this.cd.detectChanges();
    }
  }
  nextTab2(nextTabs: string) {
    this.activeTab = nextTabs;
  }

  change() {
    this.buttonChange = 2;
  }
}
