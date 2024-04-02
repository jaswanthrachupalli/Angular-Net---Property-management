import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-property-card',
  templateUrl: './property-card.component.html',
  styleUrls: ['./property-card.component.css']
})
export class PropertyCardComponent implements OnInit {

  @Input() property: any = {
    "Id": 1,
    "name": "jaswanth",
    "type": "house",
    "price": 12000
  };

  constructor() { }

  ngOnInit(): void {
  }

}
