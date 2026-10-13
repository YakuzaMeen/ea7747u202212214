import {Component, inject} from '@angular/core';
import {toSignal} from '@angular/core/rxjs-interop';
import {RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {TranslatePipe} from '@ngx-translate/core';
import {map} from 'rxjs';
import {LanguageSwitcher} from '../language-switcher/language-switcher';
import {environment} from '../../../../../environments/environment';

/**
 * Application shell with toolbar and side navigation.
 * @author Oskar Sosa
 */
@Component({
  selector: 'app-layout',
  imports: [
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    TranslatePipe,
    LanguageSwitcher
  ],
  templateUrl: './layout.html',
  styleUrl: './layout.css'
})
export class Layout {
  private readonly breakpointObserver = inject(BreakpointObserver);
  protected readonly logoPath = environment.logoPath;
  protected readonly isHandset = toSignal(
    this.breakpointObserver.observe(Breakpoints.Handset).pipe(map(result => result.matches)),
    {initialValue: false}
  );
  protected readonly options = [
    {link: '/home', label: 'navigation.home', icon: 'home'},
    {link: '/reservations/new', label: 'navigation.new-reservation', icon: 'add_location_alt'}
  ];
}
