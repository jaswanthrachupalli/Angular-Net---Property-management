import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { TabsetComponent } from 'ngx-bootstrap/tabs/public_api';

@Component({
  selector: 'app-add-property',
  templateUrl: './add-property.component.html',
  styleUrls: ['./add-property.component.css']
})
export class AddPropertyComponent implements OnInit {
  @ViewChild('Form') addpropertyForm!: NgForm;
  @ViewChild('staticTabs') formTabs: TabsetComponent;

  propertyTypes: Array<string> = ['House', 'Apartment', 'Duplex'];
  furnishTypes: Array<string> = ['Fully Furnished', 'Semi Furnished', 'Unfurnished'];


  property: any = {};

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  onBack() {
    this.router.navigate(['/']);
  }

  onSubmit() {
    console.log('Form submitted:', this.property);
    console.log(this.addpropertyForm);
  }
  selectTab(tabId: number) {
    this.formTabs.tabs[tabId].active = true;
    }
}
