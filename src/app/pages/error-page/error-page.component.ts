import { TextChangeIndicationMode } from './../../components/shared/changed-text-renderer/changed-text-renderer.component';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-error-page',
  templateUrl: './error-page.component.html',
  styleUrls: ['./error-page.component.css']
})
export class ErrorPageComponent implements OnInit {

  constructor() { }

  TextChangeIndicationMode = TextChangeIndicationMode;

  ngOnInit(): void {
  }

}
