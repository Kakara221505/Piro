import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ExploreServicesService } from '../../services/explore-module/explore-services.service';

@Component({
  selector: 'app-search-explore',
  templateUrl: './search-explore.component.html',
  styleUrls: ['./search-explore.component.css']
})
export class SearchExploreComponent implements OnInit {
  public searchEvents:any;
  searchNames: any;
  constructor(private route: ActivatedRoute,private exploreService: ExploreServicesService) {
    this.searchNames = window.location.href.split('/search?q=').pop();
    console.log(this.searchNames);
  }

  ngOnInit(): void {
    this.getFilter();
  }

  getFilter(){
    let body = {
      acessTypeList: [],
      dateType: null,
      eventCategoryIdList: [],
      eventTypeIdList: [],
      searchEvent: this.searchNames
    }
    this.exploreService.exploreFilter(body , 0, 10).subscribe((data:any) =>{
      this.searchEvents = data.exploreEventResponseList
      console.log(data);
    })
  }
}
