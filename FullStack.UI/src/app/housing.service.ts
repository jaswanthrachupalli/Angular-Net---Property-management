import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ipropertybase } from 'src/app/model/ipropertybase';
import { property } from 'src/app/model/property';

@Injectable({
  providedIn: 'root'
})
export class HousingService {

  constructor(private http: HttpClient) { }

  getProperty(propertyId: number): Observable<property> {
    return this.http.get<property>(`URL_to_fetch_property/${propertyId}`);
    // Replace 'URL_to_fetch_property' with the actual URL to fetch the property details
  }


  getAllProperties(SellRent: number): Observable<Object> {
    return this.http.get('data/properties.json').pipe(
      map((data: any) => { // Explicitly define the type of data as 'any'
        const propertiesArray: Array<ipropertybase> = [];
        const localProperties = JSON.parse(localStorage.getItem('newProp') as string); // Type assertion

        if (localProperties) {
          for (const id in localProperties) {
            if (localProperties.hasOwnProperty(id) && localProperties[id].SellRent === SellRent) {
              propertiesArray.push(localProperties[id]);
            }
          }
        }


        for (const id in data) {
          if (data.hasOwnProperty(id) && data[id].SellRent === SellRent) {
            propertiesArray.push(data[id]);
          }
        }
        return propertiesArray;
      })
    );
  }

  addProperty(property: property) {
    let newProp = [property];
    const existingPropString = localStorage.getItem('newProp');
  if (existingPropString !== null) {
    const existingPropArray = JSON.parse(existingPropString);
    if (Array.isArray(existingPropArray)) {
      newProp = [property, ...existingPropArray];
    }
  }

  // Store the updated properties array in local storage
  localStorage.setItem('newProp', JSON.stringify(newProp));
}

  newPropID() {
    const currentPID = localStorage.getItem('PID');
    if (currentPID !== null) {
      localStorage.setItem('PID', String(+currentPID + 1));
      return +currentPID + 1;
    } else {
      localStorage.setItem('PID', '101');
      return 101;
    }
  }
  
}
