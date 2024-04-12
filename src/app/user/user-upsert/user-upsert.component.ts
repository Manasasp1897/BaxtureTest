import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router} from '@angular/router';
import { DataService } from 'src/app/service/data.service';
import { User } from '../user.model';

@Component({
  selector: 'app-user-upsert',
  templateUrl: './user-upsert.component.html',
  styleUrls: ['./user-upsert.component.scss']
})
export class UserUpsertComponent implements OnInit {
  userForm!: FormGroup;
  isEditing: boolean = false; // Flag to track if user is being edited

  constructor(private fb: FormBuilder, private dataService: DataService, private router:Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.initializeForm();

    this.route.queryParams.subscribe((user:any) => {
      if(user)
      {
        this.userForm.patchValue(user);
      }
    });
  }

  initializeForm(): void {
    this.userForm = this.fb.group({
      Id: [],
      FirstName: ['', Validators.required],
      LastName: ['', Validators.required],
      Address: [''],
      Email: ['', [Validators.required, Validators.email]],
      Phone: ['', [Validators.required, Validators.pattern('^\\d{10}$')]]
    });
  }

  generateUniqueId() {
    // Generate a unique ID (for demonstration purposes)
    return Math.random();
  }

  onSubmit(): void {
    debugger
    if (this.userForm.valid) {
      const userData: User = this.userForm.value;

      if (userData.Id) {
        this.dataService.updateUser(userData);
      } else {
        userData.Id = this.dataService.users[this.dataService.users.length - 1].Id + 1;
        // User is new, add to the list
        this.dataService.addUser(userData);
      }

      // Clear the form after submission
      this.userForm.reset();
      this.router.navigate([""]);
    }
  }

  goBack() {
    this.router.navigate([""]);
  }
}
