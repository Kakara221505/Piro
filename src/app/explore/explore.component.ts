import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ExploreServicesService } from '../services/explore-module/explore-services.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-explore',
  templateUrl: './explore.component.html',
  styleUrls: ['./explore.component.css']
})
export class ExploreComponent implements OnInit {
  public allExplores: any;
  public liveExplores: any;
  public upcomesExplores: any;
  public popularExplores: any;
  heart: any;
  isActive: any;
  password: any;
  firstModal = 'block';
  secondModal = 'none';
  passwordModal = 'block';
  passwordRegistrationModal = 'none';
  requestSentSuccessModal = ' none'
  contentLoaded = false;
  contentLoadedExplore = false;
  contentLoadedUpcoming = false;
  contentLoadedPopular = false;
  eventIds: any;
  errorMessage: any = null;
  currentDateTime:any;

  showHours: any;
  showMintues: any;
  showSeconds: any;
  timer: any;
  formStyle = 'block';
  liveLoadMoreStyle = 'block';
  upcmingLoadMoreStyle = 'block';
  filter ={
    dateType:''
  }
  acessTypeList= [];
  eventCategoryIdList = [];
  eventTypeIdList = []

  totalAllElements:any;
  totalLiveElements:any;
  totalUpcomingsElements:any;
  page:number=0;

  page1: number = 1;
  page2: number = 1;
  tableSize1: number = 12;
  tableSize2: number = 12;
  tableSize3: number = 12;
  totalElementAll:any;
  loadMoreAll = [];
  searchEvent:any;
  noSearchData:any;
  showDate: number;
  fieldTextType: boolean;
  constructor(private router: Router, private exploreService: ExploreServicesService,public datepipe: DatePipe,private location: Location) {}

  ngOnInit(): void {
    this.currentDateTime =this.datepipe.transform((new Date), 'yyyy-MM-ddThh:mm:ss');
    this.getExploreAll();
    this.dateAndTime()

  }

  addToKeywords(){
    if(this.searchEvent != null){
      let body = {
        acessTypeList: [],
        dateType: null,
        eventCategoryIdList: [],
        eventTypeIdList: [],
        searchEvent: this.searchEvent
      }
      this.exploreService.exploreFilter(body , 0, 100).subscribe((data:any) =>{
        this.allExplores = data.exploreEventResponseList;
        this.formStyle = ' none';
        this.noSearchData = data.totalElements;
      })
    }
  }

  fieldsChange(event:any):void {
  
  }
  signout() {
    this.router.navigate(['/login']);
    localStorage.removeItem('X-Custom-Token');
    localStorage.removeItem('event-id');
    localStorage.removeItem('spaceId');
    localStorage.removeItem('isLoggedin');
    window.location.reload();
  }

  toggleFieldTextType() {
    this.fieldTextType = !this.fieldTextType;
  }
  emptyForm(){
    this.password = '';
    this.errorMessage = '';
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

if (countDownDate <= now.getTime()) {
  // Countdown time has already passed
 var distance = 0; // Or set to a positive value if needed
} else {
  // Calculate distance as before
  distance = countDownDate - d2.getTime();
}

// Update the time values as before
this.showDate = Math.floor(distance / (1000 * 60 * 60 * 24));
this.showHours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
console.log(this.showHours)
this.showMintues = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
this.showSeconds = Math.floor((distance % (1000 * 60)) / 1000);
  }

  onClick() {
    this.isActive = !this.isActive;
  }

  registerNow() {
    window.scrollTo(0, 0);
    this.router.navigate(['/register']);
  }



  proceed() {
    let body ={
      eventId: this.eventIds,
    }
  
    this.exploreService.registerOpenAccess(body).subscribe((data: any) => {    
      this.firstModal = 'none';
      this.secondModal = 'block';
      console.log("hii",this.secondModal)
      this.getExploreAll();
      this.getExploreLive();
      this.getExploreUpcoming();
      this.getExplorePopular();
    },
    (error: any) => {
    
      if (error.status === 400) {
        this.router.navigate(['/maximum-user']);
        this.location.replaceState('/maximum-user');
        location.reload();
      }// log the status here
      // handle error response
    });
  }
  
  

  gotToEvents() {
    this.router.navigate(['/all-events']);
  }

  exploreMore(){
    this.router.navigate(['/explore']);
    this.getExploreAll();
      this.getExploreLive();
      this.getExploreUpcoming();
      this.getExplorePopular();
  }


  getExploreAll() {
    this.exploreService.getAllExplores(0, 12, 'all').subscribe((data: any) => {
      this.allExplores = data.eventExploreResponseList;
      this.contentLoaded = true;
      for(let time of data.eventExploreResponseList ){
        this.timer=time.utcStartDateAndTime
      }
      this.dateAndTime();
      this.totalAllElements = data.totalElements;
      this.formStyle = 'block';

    });
  }

  showAll(){
    this.page = this.page +1;
    this.exploreService.getAllExplores(0, 999, 'all').subscribe((data: any) => {

      this.allExplores = data.eventExploreResponseList
      this.timer = data.utcStartDateAndTime;
      this.dateAndTime();
      this.formStyle = 'none';
    });
  }
  onTableDataChange1(){
    this.exploreService.getAllExplores(this.page - 1, this.tableSize1, 'all').subscribe((data: any) => {
      this.allExplores = data.eventExploreResponseList;
      for(let time of data.eventExploreResponseList ){
        this.timer=time.utcStartDateAndTime
      }
      this.dateAndTime();
    });
  }




  getExploreLive() {
    this.exploreService.getAllExplores(0, 12, 'live').subscribe((data: any) => {
      this.contentLoadedExplore = true;
      this.liveExplores = data.eventExploreResponseList;
      this.timer = data.utcStartDateAndTime;
      this.totalLiveElements = data.totalElements;
     
      this.dateAndTime();
    });
  }


  onTableDataChange2(){
    this.exploreService.getAllExplores(this.page1 - 1, this.tableSize1, 'live').subscribe((data: any) => {
      this.liveExplores = data.eventExploreResponseList;
      for(let time of data.eventExploreResponseList ){
        this.timer=time.utcStartDateAndTime
      }
      this.dateAndTime();
    });
  }


  showLive(){
    this.exploreService.getAllExplores(0, 999, 'live').subscribe((data: any) => {
      this.contentLoadedExplore = true;
      this.liveExplores = data.eventExploreResponseList;
      this.timer = data.utcStartDateAndTime;
      this.dateAndTime();
      this.liveLoadMoreStyle = 'none';
    });
  }

  showUpcoming(){
    this.exploreService.getAllExplores(0, 999, 'upcoming').subscribe((data: any) => {
      this.contentLoadedExplore = true;
      this.liveExplores = data.eventExploreResponseList;
      this.timer = data.utcStartDateAndTime;
      this.dateAndTime();
      this.upcmingLoadMoreStyle = 'none';
    });
  }
  getExploreUpcoming() {
    this.exploreService.getAllExplores(0, 12, 'upcoming').subscribe((data: any) => {
      this.contentLoadedUpcoming = true;
      this.upcomesExplores = data.eventExploreResponseList;
      this.timer = data.utcStartDateAndTime;
      this.totalUpcomingsElements = data.totalElements;
      this.dateAndTime();
    });
  }


  onTableDataChange3(){
    this.exploreService.getAllExplores(this.page2 - 1, this.tableSize1, 'upcoming').subscribe((data: any) => {
      this.upcomesExplores = data.eventExploreResponseList;
      for(let time of data.eventExploreResponseList ){
        this.timer=time.utcStartDateAndTime
      }
      this.dateAndTime();
    });
  }

  getExplorePopular() {
    this.exploreService.getAllExplores(0, 10, 'popular').subscribe((data: any) => {
      this.contentLoadedPopular = true;
      this.popularExplores = data.eventExploreResponseList;
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
      this.getExploreAll();
      this.getExploreLive();
      this.getExplorePopular();
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
      this.passwordModal = 'none';
      this.requestSentSuccessModal = 'block';
      this.getExploreAll();
      this.getExploreLive();
      this.getExplorePopular();
      this.getExploreUpcoming();
    },(error) =>{
      this.passwordModal = 'block';
      this.requestSentSuccessModal = 'none';
    });
  }

  joinNow(id:any){
   
    const url = this.router.createUrlTree(['/join/', id]);
    window.open(url.toString(), '_blank');
  }
  // applyFilter(){
  //   let body = {

  //   }
  //   this.exploreService.exploreFilter(body).subscribe((data:any) =>{

  //   })
  // }
}
