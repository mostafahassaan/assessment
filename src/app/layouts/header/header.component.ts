import { Component, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { debounceTime, switchMap, catchError, map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { User } from '../../core/models/user.model';
import { UserService } from '../../core/services/user.service';
import { ClickableDirective } from '../../shared/directives/clickable.directive';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    MatAutocompleteModule,
    MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    CommonModule,
    MatButtonModule,
    MatToolbarModule,
    ClickableDirective
  ],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  searchControl = new FormControl('');
  filteredUsers$: Observable<(User | { error: string })[]> = of([]);

  constructor(
    private userService: UserService,
    private router: Router
  ) {

    // Bind the function to the class context
    this.displayFn = this.displayFn.bind(this);
  }

  /**
   * Initializes the component.
   * Subscribes to value changes of the search control and filters users based on the entered value.
   * If a valid user ID is entered, it retrieves the user details using the UserService.
   * If an error occurs during the API call, it returns an error object.
   */
  ngOnInit(): void {
    this.filteredUsers$ = this.searchControl.valueChanges.pipe(
      debounceTime(300),
      switchMap((value) => {
        const userId = parseInt(value!, 10);
        if (!isNaN(userId)) {
          return this.userService.getUserDetails(userId).pipe(
            map((response) => [response.data]), // Map successful response to an array
            catchError(() => of([{ error: 'User not found' }])) // Return an error object
          );
        }
        return of([]);
      })
    );
  }

  /**
   * Checks if the given item is an instance of the User class.
   * @param item - The item to be checked.
   * @returns A boolean value indicating whether the item is an instance of User.
   */
  isUser(item: User | { error: string }): item is User {
    return 'first_name' in item;
  }

  /**
   * Checks if the given item is of type { error: string }.
   * @param item - The item to be checked.
   * @returns A boolean value indicating whether the item is of type { error: string }.
   */
  isError(item: User | { error: string }): item is { error: string } {
    return 'error' in item;
  }

  /**
   * Returns the string representation of the given item.
   * If the item is a User object, it returns the string representation of its id.
   * If the item is an object with an 'error' property, it returns an empty string.
   * If the item is null, it returns an empty string.
   * 
   * @param item - The item to be displayed.
   * @returns The string representation of the item.
   */
  displayFn(item: User | { error: string } | null): string {
    return item && this.isUser(item) ? item.id.toString() : '';
  }

  /**
   * Handles the selection of a user.
   * 
   * @param selectedItem - The selected user or an object containing an error message.
   */
  onUserSelected(selectedItem: User | { error: string }): void {
    if (this.isUser(selectedItem)) {
      this.router.navigate(['/user', selectedItem.id]);
    }
  }

  /**
   * Navigates to the home page.
   */
  onNavigateHome(): void {
    this.router.navigate(['/']);
  }
}
