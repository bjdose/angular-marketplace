import {
  Directive,
  OnDestroy,
  OnInit,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
import { SessionService } from '@app/core/authentication';
import { User } from '@app/core/models';
import { Observable, Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';

@Directive({ selector: '[appNoSession]' })
export class NoSessionDirective implements OnInit, OnDestroy {
  currentUser$: Observable<User | undefined> = this.session.currentUser().pipe(
    tap((currentUser) => {
      currentUser
        ? this.viewContainer.clear()
        : this.viewContainer.createEmbeddedView(this.templateRef);
    })
  );

  private subscription = new Subscription();

  constructor(
    private session: SessionService,
    private viewContainer: ViewContainerRef,
    private templateRef: TemplateRef<any>
  ) {}

  ngOnInit(): void {
    this.subscription.add(this.currentUser$.subscribe());
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
