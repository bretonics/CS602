import { Component, OnInit } from '@angular/core';
import { ServerService } from "../../services/server.service";
import { Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-directions',
  templateUrl: './directions.component.html',
  styleUrls: ['./directions.component.css']
})
export class DirectionsComponent implements OnInit {  // Class with RxJS implementation

  start: string = "Boston, MA";
  destination: string = "Cambridge, MA";
  route: any;

  // Subject to publish "Start" and "Destination"
  private directions: Subject<string[]>;

  constructor(private server: ServerService) { }

  //--------------------------------------------------------------------------------
  // MapQuest APIs
  
  // Push subject into observable stream
  getDirections(start: string, destination: string): void {
    this.directions.next([start, destination]);
  }

  ngOnInit() {
    this.directions = new Subject<string[]>();
    this.directions.pipe(
      // Wait 1000ms after each keystroke before considering new directions
      debounceTime(1000),
      // Ignore new term if same as previous
      distinctUntilChanged(), switchMap(data => {
        console.log("Getting directions from", data[0], "to", data[1]);
        return this.server.getRoute(data[0], data[1]);
      })
    )
      .subscribe((result: any) => {
        console.log(result);
        this.route = result.route;
      });
  }

}
