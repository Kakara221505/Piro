import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {
  clickActive:any;
  constructor() { }

  ngOnInit(): void {
    this.clickActive = window.location.href.split('/').pop();
  }
}

