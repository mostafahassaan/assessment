import { Component, OnInit, ViewChild } from '@angular/core';
import { PaginatedUsers, User } from '../../core/models/user.model';
import { UserService } from '../../core/services/user.service';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Router } from '@angular/router';
import { ClickableDirective } from '../../shared/directives/clickable.directive';
@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [
    MatCardModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    CommonModule,
    ClickableDirective
  ],
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  users: User[] = [];
  perPage: number = 6;
  totalUsers: number = 0;
  isLoading: boolean = false;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    this.loadUsers(1);
  }

  /**
   * Loads users from the server based on the specified page number.
   * 
   * @param page - The page number to load users from.
   */
  loadUsers(page: number): void {
    this.userService.getUsers(page).subscribe(
      response => {
        this.users = response.data;
        this.totalUsers = response.total;
        this.perPage = response.per_page;
        if (this.paginator) {
          this.paginator.pageIndex = response.page - 1;
        }
      },
      error => {
        console.error('Error fetching users:', error);
      }
    );
  }

  /**
   * Navigates to the user details page for the specified user ID.
   * 
   * @param userId - The ID of the user.
   */
  viewUserDetails(userId: number): void {
    this.router.navigate(['/user', userId]);
  }

  /**
   * Handles the page change event.
   * 
   * @param event - The page change event object.
   */
  onPageChange(event: any): void {
    this.loadUsers(event.pageIndex + 1);
  }
}
