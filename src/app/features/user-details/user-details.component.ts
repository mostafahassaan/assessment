import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { User } from '../../core/models/user.model';
import { UserService } from '../../core/services/user.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-user-details',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, RouterModule, MatProgressSpinnerModule],
  templateUrl: './user-details.component.html',
  styleUrl: './user-details.component.scss',
})
export class UserDetailsComponent {
  user: User | null = null;
  isLoading = true;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private router: Router
  ) {}

  /**
   * Initializes the component.
   * Retrieves the user details based on the provided user ID from the route parameters.
   * If the user ID is available, it makes an API call to fetch the user details and assigns the response to the 'user' property.
   * Sets the 'isLoading' flag to false after the API call completes.
   * If an error occurs during the API call, it logs the error to the console.
   */
  ngOnInit(): void {
    const userId = this.route.snapshot.paramMap.get('id');
    if (userId) {
      this.userService.getUserDetails(+userId).subscribe(
        (response) => {
          this.user = response.data;
          this.isLoading = false;
        },
        (error) => {
          console.error('Error fetching user details:', error);
          this.isLoading = false;
        }
      );
    }
  }

  /**
   * Navigates back to the home page.
   */
  goBack(): void {
    this.router.navigate(['/']);
  }
}
