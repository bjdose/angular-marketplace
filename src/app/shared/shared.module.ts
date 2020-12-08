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

@NgModule({
  imports: [modules],
  exports: [modules, components, pipes],
  declarations: [components, pipes],
})
export class SharedModule {}
