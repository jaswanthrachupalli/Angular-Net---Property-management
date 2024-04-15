import { Component, OnInit } from '@angular/core';
import { HousingService } from 'src/app/Services/housing.service';
import { iproperty } from 'src/app/model/iproperty';
import { ActivatedRoute } from '@angular/router';
import { property } from 'src/app/model/property';
@Component({
  selector: 'app-property-list',
  templateUrl: './property-list.component.html',
  styleUrls: ['./property-list.component.css']
})
export class PropertyListComponent implements OnInit {
  properties: iproperty[] = [];
  sellRent: number = 1; // Initialize to default value
  Today = new Date();
  City = '';
  SearchCity = '';
  SortbyParam = '';
  SortDirection = 'asc';

  constructor(private route: ActivatedRoute, private housingService: HousingService) { }

  ngOnInit(): void {
    // Check if the route URL contains 'rent' segment to determine SellRent value
    if (this.route.snapshot.url.toString()) {
      this.sellRent = 2;
    }

    // Call getAllProperties with the SellRent parameter
    this.housingService.getAllProperties(this.sellRent).subscribe(
      (data: any) => {
        this.properties = data;
        console.log(data);
      },
      (error: any) => {
        console.error('Error fetching properties:', error);
      }
    );
  }

  onCityFilter() {
    this.SearchCity = this.City;
  }

  onCityFilterClear() {
    this.SearchCity = '';
    this.City = '';
  }

  onSortDirection() {
    if (this.SortDirection === 'desc') {
      this.SortDirection = 'asc';
    } else {
      this.SortDirection = 'desc';
    }
  }

}