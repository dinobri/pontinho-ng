import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './pontinho/pontinho.config';
import { PontinhoApp } from './pontinho/pontinho';

bootstrapApplication(PontinhoApp, appConfig)
  .catch((err) => console.error(err));
