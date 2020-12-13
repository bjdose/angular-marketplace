import { Component, OnInit } from '@angular/core';
import { appRoutes } from '@app/core/config';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.page.html',
  styleUrls: ['./not-found.page.scss'],
})
export class NotFoundPage implements OnInit {
  appRoutes = appRoutes;
  constructor() {}

  ngOnInit(): void {}
}
