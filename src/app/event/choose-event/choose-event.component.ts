import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ManagementConsoleService } from '../../services/event-management-module/management-console.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-choose-event',
  templateUrl: './choose-event.component.html',
  styleUrls: ['./choose-event.component.css']
})
export class ChooseEventComponent implements OnInit {
  public lines:any;
  public chooseEvent: any;
  imgloading: boolean = false;
  select: any;
  isFavorite: any;
  imageurl:any
  imgs:any;

  animation = 'pulse';
  contentLoaded = false;

  count = 2;
  widthHeightSizeInPixels = 50;
  showImgs:any;
  id:any;
  imgVenues = '../../assets/images/Sci fi 2.png';
  constructor(private router: Router, private eventService: ManagementConsoleService, private toastr: ToastrService) {}

  ngOnInit(): void {
    this.getSpaceEvent();
  }

  getSpaceEvent() {
    this.eventService.getSpace().subscribe((data: any) => {
      this.chooseEvent = data.data;
      this.showImgs = data.data.venueImageDTOList;
      // console.log(this.showImgs);
      // console.log(this.chooseEvent);
      this.contentLoaded = true
      for(let img of this.chooseEvent){
        this.showImgs = img.venueImageDTOList.map((x:any) => x.imageUrl);
        console.log(this.showImgs);
      }
      // this.showImgs = data.data.venueImageDTOList.imageUrl;
      // this.chooseEvent.map((x:any) => {
      //   x.venueImageDTOList.map((pic:any) => {
      //     if(pic.isDefaultImage == true){
      //       this.imageurl = pic.imageUrl;
      //     }
      //   })
      //       console.log(this.imageurl);
      // })
    });
  }

  Save() {
    if (this.select == null) {
      this.toastr.error('Please Choose Space!');
    } else {
      this.imgloading = true;
      setTimeout(() => {
        this.imgloading = false;
      }, 1000);
      this.router.navigate([`/add-events/basic-details/`]);
    }
  }
  cancel() {
    this.router.navigate(['/event-management-console']);
  }
  onCLickImg(id: any) {
    this.select = id;
    localStorage.setItem('spaceId', this.select);
    this.isFavorite = id;
  }


}
