import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable, EMPTY, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HousingService } from 'src/app/housing.service';
import { property } from 'src/app/model/property';

@Injectable({
  providedIn: 'root'
})
export class PropertyDetailResolverService implements Resolve<property> {

  constructor(private router: Router, private housingService: HousingService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<property> {
    const propId = route.params['id'];
    return this.housingService.getProperty(+propId).pipe(
      catchError(error => {
        // Navigate away to the homepage or an error page if property cannot be loaded
        this.router.navigate(['/']);
        // Return EMPTY to cancel the navigation
        return EMPTY;
      })
    );
  }
}
