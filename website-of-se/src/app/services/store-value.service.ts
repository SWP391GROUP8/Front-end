import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StoreValueService {
  // //Global Variable
  // private componentName = new BehaviorSubject<string>(undefined);
  // currentName = JSON.parse(localStorage.getItem('RegisterCompanyStepName'));
  // //Global Variable
  // private step = new BehaviorSubject<number>(undefined);
  // currentStep = JSON.parse(localStorage.getItem('RegisterCompanyStep'));

  // companyInformation = JSON.parse(localStorage.getItem('CompanyInformation'));

  // companyRepresentative = JSON.parse(
  //   localStorage.getItem('CompanyRepresentative')
  // );
  constructor() {}
  // changeRegisterCompanyStepName(componentName: string) {
  //   this.componentName.next(componentName);
  //   localStorage.setItem(
  //     'RegisterCompanyStepName',
  //     JSON.stringify(componentName)
  //   );
  // }
  // changeRegisterCompanyStep(step: number) {
  //   localStorage.setItem('RegisterCompanyStep', JSON.stringify(step));
  //   this.step.next(step);
  //   console.log(step);
  // }
  clearStorageByName(key) {
    localStorage.removeItem(key);
  }
  setLocalStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  }
  getLocalStorage(key) {
    return JSON.parse(localStorage.getItem(key));
  }
  cleanAllStorage() {
    localStorage.clear();
  }
}
