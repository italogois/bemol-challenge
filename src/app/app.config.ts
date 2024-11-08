import { ApplicationConfig, importProvidersFrom, LOCALE_ID } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { MaterialPaginatorTranslated } from './helpers/materialTableTranslate';
import { HttpClientModule } from '@angular/common/http';
import { NgxMaskConfig, provideEnvironmentNgxMask } from 'ngx-mask';

const maskConfig: Partial<NgxMaskConfig> = {
  validation: true,
  dropSpecialCharacters: false,
};

export const appConfig: ApplicationConfig = {
  providers: [
    importProvidersFrom(HttpClientModule),
    provideEnvironmentNgxMask(maskConfig),
    provideRouter(routes),
    provideAnimationsAsync(),
    { provide: LOCALE_ID, useValue: 'pt-BR' },
    { provide: MatPaginatorIntl, useValue: MaterialPaginatorTranslated() },
  ],
};
