import * as angular from 'angular';
import { Component } from '@angular/core';
import { downgradeComponent } from '@angular/upgrade/static';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'my_hybrid-app 3';
}

// Access global AngularJS 1.x object
const m = angular.module('myApp', []);
m.directive('appRoot', downgradeComponent({component: AppComponent}));

