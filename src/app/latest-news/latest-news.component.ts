import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { NewsService } from 'src/services/news.service';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-latest-news',
  templateUrl: './latest-news.component.html',
  styleUrls: ['./latest-news.component.less']
})
export class LatestNewsComponent implements OnInit {
  newsIdList: any; 
  newsList:any[]= [];
  dataSource:any;
  displayedColumns: string[] = ['title'];  

  pageSize: number = 10;
  currentPage:number =  1;


  @ViewChild(MatPaginator, {static: true}) paginator: any;

  constructor(private dataService:NewsService,private spinner: NgxSpinnerService){}
  async ngOnInit() {
    this.spinner.show();
    await this.getData();
  }

  async getData() {
    this.newsIdList = await this.dataService.getLatestNews();
    await this.generatePage(this.newsIdList, this.pageSize, this.currentPage);
   
  }

  async generatePage(list:any, pageSize:any, pageNumber:any) {
    this.newsList = [];
    
    const data = list.slice((pageNumber - 1) * pageSize, pageNumber * pageSize);
    await data.forEach(async (item:any) => {
      const details = await this.dataService.getNewsById(item);      
      this.newsList.push(details);        
      this.dataSource = new MatTableDataSource<any>(this.newsList.sort((a,b)=>b.score - a.score));      
      this.dataSource.paginator = this.paginator;       
      this.spinner.hide();
    });
  }

  async page(btnType:string) { 
    this.spinner.show();   
    this.currentPage = btnType === 'prev' ? this.currentPage - 1 : this.currentPage + 1;
    if(this.currentPage > 0) 
      await this.generatePage(this.newsIdList, this.pageSize, this.currentPage);
  }
}
 