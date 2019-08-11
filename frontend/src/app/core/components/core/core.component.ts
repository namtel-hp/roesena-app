import { Component } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { trigger, transition, state, style, animate } from '@angular/animations';

@Component({
  selector: 'rsn-root',
  templateUrl: './core.component.html',
  styleUrls: ['./core.component.scss'],
  animations: [
    trigger('fade', [
      state(
        'void',
        style({
          opacity: 0,
          transform: 'translateX(80vw)'
        })
      ),
      transition('void => *', [animate('.5s ease-out')]),
      transition('* => void', [animate('.5s ease-in')])
    ])
  ]
})
export class CoreComponent {
  public readonly navbar: { title: string; route: string }[] = [
    { title: 'Gruppen', route: 'groups' },
    { title: 'Events', route: 'events' },
    { title: 'Archiv', route: 'archive' }
  ];
  public readonly burger: { title: string; route: string }[] = [
    { title: 'Startseite', route: '' },
    { title: 'Gruppen', route: 'groups' },
    { title: 'Events', route: 'events' },
    { title: 'Archiv', route: 'archive' },
    { title: 'Presse', route: 'media' },
    { title: 'Links', route: 'references' },
    { title: 'Impressum', route: 'about' }
  ];
  public ROUTE: { tag: string; currentRoute: string }[] = [];

  public navBarState: boolean = false;

  constructor(private _router: Router) {
    this._router.events.subscribe((el) => {
      if (el instanceof NavigationStart) {
        // splits the route into its components and removes the empty ones
        const raw = el.url.replace(new RegExp('%20', 'g'), ' ').split('/').filter((el) => el != '');
        this.ROUTE = [];
        var i = 0;
        while (i < raw.length) {
          // fix hte 25 stuff (it replaces the percent sign i think)
          switch (raw[i]) {
            case 'appointments':
              this.ROUTE.push({ tag: 'Termine', currentRoute: raw.filter((_, ind) => ind <= i).join('/') });
              i++;
              break;
            case 'respond':
              this.ROUTE.push({
                tag: 'Rückmeldung: ' + raw[i + 1],
                currentRoute: raw.filter((_, ind) => ind <= ++i).join('/')
              });
              i += 2;
              break;
            case 'calendar':
              this.ROUTE.push({ tag: 'Kalender', currentRoute: raw.filter((_, ind) => ind <= i).join('/') });
              i++;
              break;
            case 'edit':
              this.ROUTE.push({
                tag: 'Bearbeite: ' + (raw[i + 1] === ':new' ? 'neues Element' : raw[i + 1]),
                currentRoute: raw.filter((_, ind) => ind <= ++i).join('/')
              });
              i += 2;
              break;
            default:
              this.ROUTE.push({ tag: raw[i], currentRoute: 'startpage' });
              i++;
          }
        }
      }
    });
  }
}
