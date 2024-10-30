import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
@Component({
  selector: 'app-metaverse',
  templateUrl: './metaverse.component.html',
  styleUrls: ['./metaverse.component.css']
})
export class MetaverseComponent implements OnInit {
  showContent = false;

  constructor(private router: Router, private route: ActivatedRoute, private spinner: NgxSpinnerService) {}

  ngOnInit() {
    /** spinner starts on init */
    this.spinner.show();

    setTimeout(() => {
      /** spinner ends after 5 seconds */
      this.showContent = true;
      this.spinner.hide();
    }, 3000);
  }
  loginScreen() {
    this.router.navigate(['/login']);
  }
  signupScreen(){
    this.router.navigate(['/signup']);
  }
  bookDemo() {
    this.router.navigate(['/book-demo']);
  }
  imgClick() {
    this.router.navigate(['/']);
  }
  video = document.getElementById('myVideo');
}
