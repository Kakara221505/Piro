import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-max-limit',
  templateUrl: './max-limit.component.html',
  styleUrls: ['./max-limit.component.css']
})
export class MaxLimitComponent implements OnInit {


  showContent = false;

  constructor(private router: Router,private spinner: NgxSpinnerService,) { }

  ngOnInit(): void {
    this.spinner.show();
    setTimeout(() => {
      /** spinner ends after 5 seconds */
      this.showContent=true;
      this.spinner.hide();
    }, 1700);
  }

  goDashboard() {
    this.router.navigate(['/dashboard']);
  }
  explore(){
    this.router.navigate(['/explore']);
  }

}
