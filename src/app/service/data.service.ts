import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { User } from '../user/user.model';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private apiUrl = 'https://jsonplaceholder.typicode.com/users';
  private usersSubject: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  users$: Observable<any[]> = this.usersSubject.asObservable();
  public users:User[] = [];

  constructor(private http: HttpClient) {
    // Mock initial users data (replace with actual data fetching logic)
    if(this.usersSubject.value.length == 0)
    {
      this.http.get<any[]>(this.apiUrl).subscribe(apiUsers => {
        const users = apiUsers.map(apiUser => User.fromApiResponse(apiUser));
        this.users = users;
        this.usersSubject.next(users);
      });
    }
  }

  getUsers(): any[] {
    return this.users;
  }

  addUser(user: User): void {
    this.usersSubject.next([...this.users, user]);
  }

  updateUser(updatedUser: User): void {
    const index = this.users.findIndex(user => user.Id == updatedUser.Id);
    if (index !== -1) {
      this.users[index] = updatedUser;
      this.usersSubject.next([...this.users]);
    }
    else
    {
        console.log("User didn't exist");
    }
  }

  deleteUser(userId: number): void {
    this.users = this.users.filter(user => user.Id !== userId);
    this.usersSubject.next(this.users);
  }
}
