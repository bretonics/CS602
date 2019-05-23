import { Component, OnInit } from '@angular/core';
import { ServerService } from "../../services/server.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  articles: any;

  constructor(private server: ServerService) { }

  //--------------------------------------------------------------------------------
  // News APIs
  
  // Get US Headline News
  getNews() {
    this.server.getNews().subscribe(result => {
      this.articles = result;
      console.log(this.articles);
    });

  }


  ngOnInit() {
    this.getNews();
  }

}
