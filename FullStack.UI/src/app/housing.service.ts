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


  getAllCities(): Observable<string[]> {
    return this.http.get<string[]>('http://localhost:5045/api/city');
  }

  getProperty(propertyId: number): Observable<property> {
    return this.http.get<property>(`URL_to_fetch_property/${propertyId}`);
    // Replace 'URL_to_fetch_property' with the actual URL to fetch the property details
  }


  getAllProperties(SellRent?: number): Observable<property[]> {
    return this.http.get<any>('data/properties.json').pipe(
      map(data => {
        const propertiesArray: Array<property> = [];
        const localPropertiesString = localStorage.getItem('newProp');
        if (localPropertiesString) {
          const localProperties = JSON.parse(localPropertiesString);
          for (const id in localProperties) {
            if (!SellRent || localProperties[id].SellRent === SellRent) {
              propertiesArray.push(localProperties[id]);
            }
          }
        }
        for (const id in data) {
          if (!SellRent || data[id].SellRent === SellRent) {
            propertiesArray.push(data[id]);
          }
        }
        return propertiesArray;
      })
    );
    }


  addProperty(property: property) {
  try{
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
  console.log('Property saved successfully');
} catch (error) {
  console.error('Error saving property:', error);
}
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
