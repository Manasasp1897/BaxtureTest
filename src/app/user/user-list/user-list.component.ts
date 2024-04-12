import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../../service/data.service'; // Import DataService to communicate between components
import { User } from '../user.model';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  users: User[] = [];

  constructor(private dataService: DataService, private router:Router) {
  }

  ngOnInit(): void {
    this.dataService.users$.subscribe((users : User[]) => {
      this.users = users;
    });
  }

  createUser(): void {
    this.router.navigate(["/upsert"]); // Send user details to UserUpsertComponent
  }

  editUser(user: User): void {
    this.router.navigate(["/upsert"], { queryParams: user }); // Send user details to UserUpsertComponent
  }

  deleteUser(userId: number): void {
    this.dataService.deleteUser(userId);
  }
}
