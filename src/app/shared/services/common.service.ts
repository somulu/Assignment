import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  public isLoading = new BehaviorSubject(false);

  constructor() { }

  
}
