import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { BaseDataService } from './shared/services/base-data.service';
import { MockDataService } from './shared/services/mock-data.service';

export const appConfig: ApplicationConfig = {
    providers: [
        provideZoneChangeDetection({ eventCoalescing: true }),
        provideRouter(routes),
        { provide: BaseDataService, useClass: MockDataService },
    ],
};
