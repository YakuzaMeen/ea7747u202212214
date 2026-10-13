import {Component, inject} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {MatButtonModule} from '@angular/material/button';
import {TranslatePipe} from '@ngx-translate/core';

/**
 * Fallback view for unsupported routes.
 * @author Oskar Sosa
 */
@Component({
  selector: 'app-page-not-found',
  imports: [MatButtonModule, TranslatePipe],
  templateUrl: './page-not-found.html',
  styleUrl: './page-not-found.css'
})
export class PageNotFound {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  protected readonly invalidPath = this.route.snapshot.url.map(segment => segment.path).join('/');

  protected navigateToHome(): void {
    this.router.navigate(['/home']).then();
  }
}
