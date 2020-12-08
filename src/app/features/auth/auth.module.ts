import { NgModule } from '@angular/core';
import { SharedModule } from '@app/shared';
import {
  AuthDialogComponent,
  AuthSelectionComponent,
  SignInComponent,
  SignUpComponent,
  StepperComponent,
} from './components';

const components = [
  AuthDialogComponent,
  SignUpComponent,
  SignInComponent,
  StepperComponent,
  AuthSelectionComponent,
];
const modules = [SharedModule];

@NgModule({
  imports: [modules],
  declarations: [components],
})
export class AuthModule {}
