import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { PontinhoApp } from './app/app';

bootstrapApplication(PontinhoApp, appConfig)
  .catch((err) => console.error(err));
