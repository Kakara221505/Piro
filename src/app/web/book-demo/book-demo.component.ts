import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-book-demo',
  templateUrl: './book-demo.component.html',
  styleUrls: ['./book-demo.component.css']
})
export class BookDemoComponent implements OnInit {

  constructor(private router: Router, private route: ActivatedRoute){ }

  ngOnInit(): void {
  }

  bookDemo() {
    this.router.navigate(['/book-demo']);
    window.scrollTo(0,0)
  }

}
