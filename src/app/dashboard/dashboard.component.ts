import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {AppService} from "../app.service";
import {forkJoin} from "rxjs";
import {take} from "rxjs/operators";

export interface IAlbum {
  artistImg: string;
  albumImg: string;
  trackName: string;
  artistName: string;
  kind: string;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, AfterViewInit {

  dataSource = new MatTableDataSource<IAlbum>();
  @ViewChild(MatPaginator) paginator: MatPaginator;
  loading: boolean;
  query: string;
  displayedColumns = ['artistImg', 'albumImg', 'trackName', 'artistName', 'kind'];

  constructor(private service: AppService) {
  }

  ngOnInit(): void {

  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  search() {
    this.loading = true;
    let results: IAlbum[] = [];
    const itunes = this.service.findFromItunes(this.query);
    const deezer = this.service.findFromDeezer(this.query);
    forkJoin([itunes, deezer]).pipe(take(1)).subscribe(val => {
      val[0].results.forEach(ele => {
        results.push({
          albumImg: ele.trackViewUrl,
          artistImg: ele.artistViewUrl,
          artistName: ele.artistName,
          trackName: ele.trackName,
          kind: ele.kind
        });
      });
      val[1].data?.forEach(ele => {
      });
      this.dataSource.data = results;
      this.loading = false;
    });
  }
}
