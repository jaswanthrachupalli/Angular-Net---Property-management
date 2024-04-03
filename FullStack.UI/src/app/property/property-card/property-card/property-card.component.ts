import { Component, Input, OnInit } from '@angular/core';
import { iproperty } from '../../iproperty.interface';

@Component({
  selector: 'app-property-card',
  templateUrl: './property-card.component.html',
  styleUrls: ['./property-card.component.css']
})
export class PropertyCardComponent implements OnInit {

  @Input() property: iproperty = {
    "Id": 1,
    "name": "jaswanth",
    "type": "house",
    "price": 12000,
    "SellRent": 1
  };

  constructor() { }

  ngOnInit(): void {
  }

}
