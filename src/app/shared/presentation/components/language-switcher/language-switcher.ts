import {Component, DOCUMENT, inject, signal} from '@angular/core';
import {UpperCasePipe} from '@angular/common';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {TranslatePipe, TranslateService} from '@ngx-translate/core';
import {environment} from '../../../../../environments/environment';

/**
 * Lets the user switch the interface language.
 * @author Oskar Sosa
 */
@Component({
  selector: 'app-language-switcher',
  imports: [MatButtonToggleModule, TranslatePipe, UpperCasePipe],
  templateUrl: './language-switcher.html',
  styleUrl: './language-switcher.css'
})
export class LanguageSwitcher {
  private readonly translateService = inject(TranslateService);
  private readonly document = inject(DOCUMENT);
  protected readonly languages = ['en', 'es'];
  protected readonly currentLanguage = signal(environment.defaultLanguage);

  protected useLanguage(language: string): void {
    this.translateService.use(language);
    this.currentLanguage.set(language);
    this.document.documentElement.lang = language;
  }
}
