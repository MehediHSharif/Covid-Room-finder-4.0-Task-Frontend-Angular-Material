import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {MatDialog,MatDialogModule} from '@angular/material/dialog';
import { AuthService } from '../auth.service';



@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.component.html',
  styleUrls: ['./bookings.component.css']
})
export class BookingsComponent implements OnInit {
  bookdata = { room_name: '', date: '', name: '' };

  constructor(public dialog: MatDialog,private _auth: AuthService, private _router: Router) { }

  ngOnInit(): void {}

  onFormSubmit() {
    this._auth.bookings(this.bookdata).subscribe(
      (res) => {
        console.log(res);
        
      }
    );
  }
  openDialog() {
    this.dialog.open(DialogElementsExampleDialog);
  }

}
@Component({
  selector: 'dialog-elements-example-dialog',
  templateUrl: 'dialog-elements-example-dialog.html',
})
export class DialogElementsExampleDialog {}
