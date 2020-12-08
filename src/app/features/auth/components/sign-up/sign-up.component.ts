import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {
  AuthenticationService,
  SessionService,
} from '@app/core/authentication';
import { UserType } from '@app/core/enums';
import { RegisterUser, Session } from '@app/core/models';
import { ValidatorService } from '@app/core/services';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit, OnDestroy {
  @Output() goToSignIn = new EventEmitter();

  form: FormGroup = this.createForm();

  private suscriptions = new Subscription();

  constructor(
    private auth: AuthenticationService,
    private session: SessionService
  ) {}

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.suscriptions.unsubscribe();
  }

  createForm(): FormGroup {
    return new FormGroup(
      {
        email: new FormControl('', [
          Validators.pattern(ValidatorService.emailRegexExp()),
          Validators.email,
          Validators.minLength(2),
          Validators.maxLength(25),
          Validators.required,
        ]),
        password: new FormControl('', [
          Validators.minLength(2),
          Validators.maxLength(15),
          Validators.required,
        ]),
        passwordConfirm: new FormControl('', [
          Validators.minLength(2),
          Validators.maxLength(15),
          Validators.required,
        ]),
      },
      ValidatorService.mustMatch('password', 'passwordConfirm')
    );
  }

  goToSignInStep(): void {
    this.goToSignIn.emit();
  }

  submitForm(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.suscriptions.add(
      this.auth
        .register(
          new RegisterUser(
            this.form.value.email,
            this.form.value.password,
            UserType.Seller
          )
        )
        .subscribe((session) => this.correctRegister(session))
    );
  }

  private correctRegister(session: Session): void {
    this.session.setCurrentSession(session);
  }
}
