import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
// import * as _ from 'lodash';
import { find, get, pull } from 'lodash';
import { AppService } from './app.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [AppService]
})
export class AppComponent implements OnInit {
  // @ViewChild('tagInput')
  tagInputRef!: ElementRef;
  tags: string[] = ['Tag1', 'Tag2'];
  form!: FormGroup;
  listData: any;
  catagoryArrray: any;
  arrray: any = [];
  finalData: any;
  value: any;
  constructor(private appService: AppService) { }

  ngOnInit() {
    this.getListData();
  }

  getListData() {
    this.catagoryArrray = [];
    this.appService.getJSON().subscribe(data => {
      console.log(data);
      this.listData = data;
      this.finalData = data;
      for (let i = 0; i < this.finalData.length; i++) {
        const result = this.catagoryArrray.find((x: { p_category: any; }) => x.p_category == this.finalData[i].p_category);
        if (!result) {
          this.catagoryArrray.push(this.finalData[i])
        }
      }
      console.log('111111111111111111', this.catagoryArrray)
    });
  }

  getDataByCategory(event: any) {
    console.log(event)
    this.arrray = [];
    for (let i = 0; i < this.finalData.length; i++) {
      // const result = this.finalData.find((x: { p_category: any; }) => x.p_category == event.p_category);
      if (this.finalData[i].p_category == event.p_category) {
        this.arrray.push(this.finalData[i])
      }
    }
    // this.listData = [];
    this.listData = this.arrray;
    console.log('result', this.arrray)
  }

  clearData() {
    this.listData = this.finalData;
  }
}
