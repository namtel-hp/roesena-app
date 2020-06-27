import { Component, ViewChild, OnDestroy } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { MatDrawer } from '@angular/material/sidenav';
import { Observable, Subject } from 'rxjs';
import { map, shareReplay, tap, takeUntil } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { Actions, ofType } from '@ngrx/effects';
import { ROUTER_REQUEST } from '@ngrx/router-store';
import { environment } from 'src/environments/environment';
import { State } from '@state/basePages/reducers/base.reducer';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './root.component.html',
  styleUrls: ['./root.component.scss'],
})
export class RootComponent implements OnDestroy {
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map((result) => result.matches),
    tap((el) => (this.brakpointMatches = el)),
    shareReplay()
  );
  brakpointMatches: boolean;
  badgeContentStream$ = this.store.select('base', 'respondablesAmount');
  user$ = this.store.select('user', 'user');
  version: string;
  destroyed$ = new Subject<boolean>();

  @ViewChild('drawer')
  private sidenav: MatDrawer;

  constructor(
    private breakpointObserver: BreakpointObserver,
    private store: Store<State>,
    updates$: Actions,
    matIconRegistry: MatIconRegistry,
    sanitizer: DomSanitizer
  ) {
    matIconRegistry.addSvgIcon('rsn', sanitizer.bypassSecurityTrustResourceUrl('assets/icon-inverted.svg'));
    this.version = environment.buildVersion;
    // close sidenav on navigation
    updates$
      .pipe(
        ofType(ROUTER_REQUEST),
        takeUntil(this.destroyed$),
        tap(() => this.closeNav())
      )
      .subscribe();
  }

  closeNav() {
    // only close sidenav if its in mobile mode
    if (this.brakpointMatches) {
      this.sidenav.close();
    }
  }

  ngOnDestroy() {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }
}