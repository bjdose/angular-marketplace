import {
  Directive,
  Input,
  OnInit,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
import { SessionService } from '@app/core/authentication';
import { UserType } from '@app/core/enums';

@Directive({ selector: '[appUserTypes]' })
export class UserTypeDirective implements OnInit {
  @Input() userTypes: UserType[] = [];

  constructor(
    private session: SessionService,
    private viewContainer: ViewContainerRef,
    private templateRef: TemplateRef<any>
  ) {}

  ngOnInit(): void {
    if (this.session.checkUserTypes(this.userTypes)) {
      this.viewContainer.createEmbeddedView(this.templateRef);
    }
  }
}
