import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-property-list',
  templateUrl: './property-list.component.html',
  styleUrls: ['./property-list.component.css']
})
export class PropertyListComponent implements OnInit {
  properties: Array<any> = [
    {
    "Id":1,
    "name":"jaswanth",
    "type":"house",
    "price":12000
    },
    {
      "Id":2,
      "name":"jas",
      "type":"house",
      "price":15000
    },
    {
      "Id":3,
      "name":"j",
      "type":"house",
      "price":25000
    },
    {
      "Id":4,
      "name":"y",
      "type":"house",
      "price":60000
    },
    {
      "Id":5,
      "name":"a",
      "type":"house",
      "price":37000
    },
    {
      "Id":6,
      "name":"b",
      "type":"house",
      "price":30000
    },

  ]

  constructor() { }

  ngOnInit(): void {
  }

}
