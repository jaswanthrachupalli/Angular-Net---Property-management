import { Component, Input, OnInit, importProvidersFrom } from '@angular/core';
import { ipropertybase } from 'src/app/model/ipropertybase';

@Component({
  selector: 'app-property-card',
  templateUrl: './property-card.component.html',
  styleUrls: ['./property-card.component.css']
})
export class PropertyCardComponent implements OnInit {

  @Input() property!: ipropertybase;
  @Input() hideIcons: boolean = false;
  constructor() { }

  ngOnInit(): void {
  }

}
