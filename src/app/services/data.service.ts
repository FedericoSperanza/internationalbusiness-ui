import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private skuData = new BehaviorSubject<string>('');

  constructor() {}

  getSkuData(): Observable<string> {
    return this.skuData.asObservable();
  }
  setSkuData(skuNewData: string) {
    this.skuData.next(skuNewData);
  }
  getTableData(skuValue: string) {}
}
