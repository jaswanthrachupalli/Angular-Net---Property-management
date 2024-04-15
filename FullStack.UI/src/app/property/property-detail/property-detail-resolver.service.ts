import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { property } from 'src/app/model/property';
import { Observable, EMPTY, of } from 'rxjs';
import { HousingService } from 'src/app/housing.service';
import { catchError, map } from 'rxjs/operators';
import { emptyProperty } from 'src/app/model/empty-property';

@Injectable({
  providedIn: 'root'
})
export class PropertyDetailResolverService implements Resolve<property> {

  constructor(private router: Router,  private housingService: HousingService) { }
  
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Observable<property>|property {
      const propId = route.params['id'];
      return this.housingService.getProperty(+propId).pipe(
        map(property => property || emptyProperty())
      );
  }
  }