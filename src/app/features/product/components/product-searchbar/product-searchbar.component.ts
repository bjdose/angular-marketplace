import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-product-searchbar',
  templateUrl: './product-searchbar.component.html',
  styleUrls: ['./product-searchbar.component.scss'],
})
export class ProductSearchbarComponent implements OnInit, OnDestroy {
  @Output() queryChange = new EventEmitter<string>();
  form: FormGroup = this.builder.group({
    query: [''],
  });
  private subscription = new Subscription();

  constructor(private builder: FormBuilder) {}

  ngOnInit(): void {
    this.subscription.add(
      this.form.valueChanges.subscribe((value) => {
        this.queryChange.emit(value.query.toLowerCase());
      })
    );
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  reset(): void {
    this.form.setValue({
      query: '',
    });
  }
}
