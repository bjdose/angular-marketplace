import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  ErrorDialogComponent,
  InputFieldComponent,
  LoadingDialogComponent,
  MessageDialogComponent,
  TableComponent,
} from './components';
import {
  NoSessionDirective,
  SessionDirective,
  UserTypeDirective,
} from './directives';
import { MaterialModule } from './modules';
import { UserTypePipe } from './pipes';

const modules = [
  CommonModule,
  FormsModule,
  ReactiveFormsModule,
  MaterialModule,
  FlexLayoutModule,
];
const components = [
  InputFieldComponent,
  LoadingDialogComponent,
  ErrorDialogComponent,
  MessageDialogComponent,
  TableComponent,
];
const pipes = [UserTypePipe];
const directives = [UserTypeDirective, SessionDirective, NoSessionDirective];

@NgModule({
  imports: [modules],
  exports: [modules, components, pipes, directives],
  declarations: [components, pipes, directives],
})
export class SharedModule {}
