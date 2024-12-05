import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { TourExecutionService } from '../../tour-execution/tour-execution.service';
import { PagedResults } from 'src/app/shared/model/paged-results.model';
import { TourReview } from '../model/tour-review.model';
import { User } from 'src/app/infrastructure/auth/model/user.model';
import { AuthService } from 'src/app/infrastructure/auth/auth.service';
import { ImageService } from 'src/app/shared/image.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'xp-tour-review',
  templateUrl: './tour-review.component.html',
  styleUrls: ['./tour-review.component.css']
})
export class TourReviewComponent implements OnInit {


  tourReview: TourReview[] = [];
  isLoading=false;

  constructor(private service: TourExecutionService,private snackBar:MatSnackBar, private cd: ChangeDetectorRef, private imageService: ImageService) { 
    imageService.setControllerPath("tourist/image");
  }


  ngOnInit(): void {
    this.isLoading=true
    this.service.getReviews().subscribe({
      next: (result: PagedResults<TourReview>) => {
        this.tourReview = result.results;
        this.getImages();
        this.isLoading=false;
      },
      error: (err: any) => {
        console.log(err)
        this.isLoading=false;
        this.snackBar.open('Failed to load reviews. Please try again.', 'Close', {
          duration: 3000,
          panelClass:"succesful"
        });
      }
    })
  }

  getImages(): void {
    for (const review of this.tourReview) {
      review.reviewImages = [];
      review.images.split(',').forEach(element => {
        this.imageService.getImage(Number(element).valueOf()).subscribe((blob: Blob) => {
          console.log(blob);  // Proveri sadržaj Blob-a
          if (blob.type.startsWith('image')) {
            review.reviewImages?.push(URL.createObjectURL(blob));
          } else {
            console.error("Blob nije slika:", blob);
          }
        });

      });
      //kraj
    }
  }

  getReviews(): void {
    this.isLoading=true;
    this.service.getReviews().subscribe({
      next: (result: PagedResults<TourReview>) => {
        this.tourReview = result.results;
        this.getImages()
        this.isLoading=false
      },
      error: () => {
        this.isLoading=false;
        this.snackBar.open('Failed to load reviews. Please try again.', 'Close', {
          duration: 3000,
          panelClass:"succesful"
        });
      }
    })
  }

}
