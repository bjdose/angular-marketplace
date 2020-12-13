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
import { LoginUser, Session } from '@app/core/models';
import { ValidatorService } from '@app/core/services/form-validator.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent implements OnInit, OnDestroy {
  @Output() goToSignUp = new EventEmitter();

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

  goToSignUpStep(): void {
    this.goToSignUp.emit();
    this.form.markAsUntouched();
  }

  createForm(): FormGroup {
    return new FormGroup({
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
    });
  }

  submitForm(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.suscriptions.add(
      this.auth
        .login(new LoginUser(this.form.value.email, this.form.value.password))
        .subscribe((session) => this.correctLogin(session))
    );
  }

  private correctLogin(session: Session): void {
    this.session.setCurrentSession(session);
  }
}
