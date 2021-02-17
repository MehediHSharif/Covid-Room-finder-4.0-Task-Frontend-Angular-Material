import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-navtop',
  templateUrl: './navtop.component.html',
  styleUrls: ['./navtop.component.css']
})
export class NavtopComponent implements OnInit {
  searchLink;
  searchLinkF;
  ProfileID=localStorage.getItem('CurrentUserID');

  constructor(public authService: AuthService) { }

  ngOnInit(): void { this.ProfileID=localStorage.getItem('CurrentUserID');
  }
  sclick(){
    
    this.searchLinkF='/institutes/jobposts?search='+this.searchLink
    localStorage.setItem('CustomSearch',this.searchLinkF);}

}
