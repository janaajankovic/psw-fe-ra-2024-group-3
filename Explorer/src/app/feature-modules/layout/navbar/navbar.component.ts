import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/infrastructure/auth/auth.service';
import { User } from 'src/app/infrastructure/auth/model/user.model';
import { Notification } from 'src/app/feature-modules/layout/model/notification.model';
import { LayoutService } from '../layout.service';
import { Router } from '@angular/router';
import { NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'xp-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css', '../../../../styles.css']
})
export class NavbarComponent implements OnInit {

  user: User | undefined;
  notifications: Notification[] = [];
  showNotifications: boolean = false;
  hideLocationButton: boolean = false;

  constructor(private authService: AuthService, private layoutService: LayoutService, private router: Router) {}

  ngOnInit(): void {
    this.router.events
    .pipe(filter(event => event instanceof NavigationEnd))
    .subscribe(() => {
      this.hideLocationButton = this.router.url.startsWith('/tourSession');
      console.log('Current URL:', this.router.url);
      console.log('Hide Location Button:', this.hideLocationButton);
    });
    console.log('Current URL:', this.router.url); // Debugging
    console.log('Hide Location Button:', this.hideLocationButton); // Debugging
    this.authService.user$.subscribe(user => {
      this.user = user;

      if(user.role === 'author') {
       this.layoutService.getAuthorNotifications(user.id).subscribe(notificationsData => {
        console.log('notificationsData:', notificationsData);
        this.notifications = notificationsData;
        console.log('notifications:', this.notifications);
       });
      }
      else if(user.role === 'tourist') {
        this.layoutService.getTouristNotifications(user.id).subscribe(notificationsData => {
          this.notifications = notificationsData;
         });
      }
    });
  }

  goToProblem(notification: Notification, problemId: number): void {
    if(this.user?.role === 'tourist') {
    this.layoutService.markAsReadTourist(notification).subscribe(result => {
      this.notifications = this.notifications.filter(n => n !== notification);
      this.router.navigate(['/problem'], { queryParams: { id: problemId } });
    }); 
  }
  else if(this.user?.role === 'author') {
    this.layoutService.markAsReadAuthor(notification).subscribe(result => {
      this.notifications = this.notifications.filter(n => n !== notification);
      this.router.navigate(['/problem'], { queryParams: { id: problemId } });
    }); 
    }

    this.showNotifications = !this.showNotifications;
  }

  toggleNotifications(): void {
    this.showNotifications = !this.showNotifications;
  }

  onLogout(): void {
    this.authService.logout();
    this.notifications = [];
  }
}
