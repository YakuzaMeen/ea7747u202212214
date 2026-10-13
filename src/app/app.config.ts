import {ApplicationConfig, provideBrowserGlobalErrorListeners} from '@angular/core';
import {provideRouter} from '@angular/router';
import {provideHttpClient} from '@angular/common/http';
import {provideTranslateService} from '@ngx-translate/core';
import {provideTranslateHttpLoader} from '@ngx-translate/http-loader';
import {routes} from './app.routes';
import {environment} from '../environments/environment';

/**
 * Application providers.
 * @author Oskar Sosa
 */
export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideHttpClient(),
    provideRouter(routes),
    provideTranslateService({
      lang: environment.defaultLanguage,
      fallbackLang: environment.defaultLanguage,
      loader: provideTranslateHttpLoader({prefix: './i18n/', suffix: '.json'})
    })
  ]
};
