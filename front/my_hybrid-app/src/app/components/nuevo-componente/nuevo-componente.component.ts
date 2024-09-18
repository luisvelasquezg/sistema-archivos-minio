import * as angular from 'angular';
import { Component } from '@angular/core';
import { downgradeComponent } from '@angular/upgrade/static';

@Component({
  selector: 'app-nuevo-componente',
  template: '<h2>Este es un nuevo componente Angular</h2>'
})
export class NuevoComponenteComponent { }

angular
  .module('myApp')
  .directive('nuevoComponente', downgradeComponent({
    component: NuevoComponenteComponent
  }));
