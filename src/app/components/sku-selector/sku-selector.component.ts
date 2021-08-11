import { Component, OnInit } from '@angular/core';
import {DataService} from 'src/app/services/data.service';
@Component({
  selector: 'app-sku-selector',
  templateUrl: './sku-selector.component.html',
  styleUrls: ['./sku-selector.component.css']
})
export class SkuSelectorComponent implements OnInit {
  skuDigit : any;

  constructor(private dataService: DataService) { }

  ngOnInit() {

  }

  loadData(){
    this.dataService.setSkuData(this.skuDigit);
  }
}
