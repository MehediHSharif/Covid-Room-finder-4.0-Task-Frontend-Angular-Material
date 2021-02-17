import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {MatDialog,MatDialogModule} from '@angular/material/dialog';
import { AuthService } from '../auth.service';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';


@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.component.html',
  styleUrls: ['./bookings.component.css']
})
export class BookingsComponent implements OnInit {
  vardate
  roomsarray
  submitted = false;
  hide = true;
  formGroup: FormGroup;
  bookingdata;
  condition=false;
  capacitydata;

  constructor(private formBuilder: FormBuilder,public dialog: MatDialog,private _auth: AuthService, private _router: Router) { }

  ngOnInit(): void {
    this.createForm();
    this.getAllRooms();}

    createForm() {
      this.formGroup = this.formBuilder.group({
        room_name:['',Validators.required],
        date:['',Validators.required],
        name:['',Validators.required],
      });
    }

    get f() {
      return this.formGroup.controls;
    }


  getAllRooms(){
    
    this._auth.getallrooms().subscribe(
      (res) => {
        console.log(res);
        this.roomsarray=res;
        this.condition=res.confirmed
        
      }
    );

  }
  

  onFormSubmit(data) {
    this._auth.bookings(data).subscribe(
      (res) => {
        console.log(res);
        this.bookingdata=res;
        
      }
    );
  }
  getCapacity(){
    this._auth.capacity(this.vardate).subscribe(
      (res) => {
        console.log(res);
        this.capacitydata=res;
        
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
