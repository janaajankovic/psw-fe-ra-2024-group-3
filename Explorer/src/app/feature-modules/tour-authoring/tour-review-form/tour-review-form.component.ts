import { Component, EventEmitter, Output, Input, ChangeDetectorRef } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TourExecutionService } from '../../tour-execution/tour-execution.service';
import { TourReview } from '../model/tour-review.model';
import { DatePipe, Location } from '@angular/common';
import { User } from 'src/app/infrastructure/auth/model/user.model';
import { AuthService } from 'src/app/infrastructure/auth/auth.service';
import { TokenStorage } from 'src/app/infrastructure/auth/jwt/token.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ImageService } from 'src/app/shared/image.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NotificationService } from 'src/app/shared/notification.service';
import { NotificationType } from 'src/app/shared/model/notificationType.enum';




@Component({
  selector: 'xp-tour-review-form',
  templateUrl: './tour-review-form.component.html',
  styleUrls: ['./tour-review-form.component.css'],
  providers: [DatePipe]
})
export class TourReviewFormComponent {

  imageId: Number;
  selectedFile: File[];
  previewImage: string | null = null
  user: User | undefined;
  feedbackMessage: string | null = null;
  tourId: number | null = null;
  tourName: string | null = "ime";
  imagesToShow: string='';

  @Output() tourReviewUpdated = new EventEmitter<null>();

  constructor(private route: ActivatedRoute,private notificationService: NotificationService, private location: Location, private cdr: ChangeDetectorRef, private service: TourExecutionService, private imageService: ImageService, private datePipe: DatePipe, private authService: AuthService, private tokenStorage: TokenStorage) {
    imageService.setControllerPath("tourist/image");
  }

  ngOnInit(): void {
    this.tourId = Number(this.route.snapshot.paramMap.get('tourId'));
    this.tourName = this.route.snapshot.paramMap.get('tourName');
    this.service.getReview(this.tourId).subscribe({
      next: (tourReview: TourReview) => {
        if(tourReview){
          this.tourReviewForm.setValue({
            grade: tourReview.grade?.toString() || '',
            comment: tourReview.comment||''
          }); 
          this.imagesToShow=tourReview.images;
          this.cdr.detectChanges();
        }
      },
      error: (error) => {
        let errorMessage = 'An error occurred while loading the review.';

        if (error.error && error.error.message) {
          errorMessage = error.error.message;
        }
        this.feedbackMessage = errorMessage;
        this.notificationService.notify({ message:'Failed to load reviews. Please try again.', duration: 3000, notificationType: NotificationType.WARNING });
      }
    });
  }

  tourReviewForm = new FormGroup({
    grade: new FormControl('', [Validators.required]),
    comment: new FormControl('', [Validators.required]),
  })

  /*Dio 1 za upload slika*/
  onFileSelected(file: File[]): void {
    this.selectedFile = file;  // Čuvanje fajla kada ga child komponenta emituje
    console.log('Selected file:', this.selectedFile);
  }
  /*Kraj*/

  addTourReview(): void {

    const accessToken = this.tokenStorage.getAccessToken();
    const jwtHelperService = new JwtHelperService();
    if (accessToken) {

      const decodedToken = jwtHelperService.decodeToken(accessToken);

      const tourReview: TourReview = {
        tourId: this.tourId || 0,
        userId: 0,
        username: jwtHelperService.decodeToken(accessToken).username || "",
        grade: Number(this.tourReviewForm.value.grade) || 1,
        comment: this.tourReviewForm.value.comment || "",
        images: "",
        tourVisitDate: new Date(Date.now()),
        tourReviewDate: new Date(Date.now()),
        tourProgressPercentage: 0
      };
      /*----------------Dio 2 za upload slike---------------*/
      let processedFilesCount = 0;
      if (!this.selectedFile) {
        this.SaveReview(tourReview)
      } else {
        const totalFiles = this.selectedFile.length;
        for (const file of this.selectedFile) {
          this.imageService.uploadImage(file).subscribe((imageId: number) => {
            this.imageService.getImage(imageId);
            if (tourReview.images === "") {
              tourReview.images = tourReview.images + imageId;
            }
            else {
              tourReview.images = tourReview.images + ',' + imageId;
            }
            processedFilesCount++;

            // Proveravamo da li smo obradili sve fajlove
            if (processedFilesCount === totalFiles) {
              this.SaveReview(tourReview);  // Pozivamo funkciju kad je sve završeno
            }
          });

        }
        /*---------------------Kraj------------------------*/

      }

    } else {
      console.error('No access token found');
    }
  }

  SaveReview(tourReview: TourReview): void {
    this.service.addTourReview(tourReview).subscribe({
      next: () => {
        this.feedbackMessage = '';
        console.log('Tour review added successfully');
        this.notificationService.notify({ message:'Review added successfully!', duration: 3000, notificationType: NotificationType.SUCCESS });
        this.location.back();
        this.tourReviewUpdated.emit();
      },
      error: (error) => {

        let errorMessage = 'An error occurred while adding the tour review.';

        this.notificationService.notify({ message:'Error while saving review', duration: 3000, notificationType: NotificationType.WARNING });
        if (error.error && error.error.message) {
          errorMessage = error.error.message;
        }

        this.feedbackMessage = errorMessage;
      }
    });
  }

}

