import { Injectable } from '@angular/core';
import { CanDeactivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { State } from '@state/images/editor/reducers/image.reducer';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class HasImageEditorLoadedGuard implements CanDeactivate<unknown> {
  constructor(private store: Store<State>) {}
  canDeactivate(
    component: unknown,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    // can navigate away when image editor is done loading
    return this.store.select('imageEditor', 'isLoading').pipe(map((el) => !el));
  }
}
