import { Component, OnInit } from '@angular/core';
import { CarouselModule } from 'primeng/carousel';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { ProductService } from '../../../services/product-service/product.service';
import { Product } from '../../../interfaces/product/product';

@Component({
  selector: 'app-course-info',
  templateUrl: './course-info.component.html',
  styleUrls: ['./course-info.component.scss']
})
export class CourseInfoComponent implements OnInit {
  products: Product[] = []; // Initialized to an empty array
  responsiveOptions: any[] = []; // Initialized to an empty array

  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.loadProducts();
    this.initializeResponsiveOptions();
  }

  private loadProducts(): void {
    this.productService.getProductsSmall()
      .then((products) => this.products = products)
      .catch((error) => console.error('Error fetching products:', error));
  }

  private initializeResponsiveOptions(): void {
    this.responsiveOptions = [
      {
        breakpoint: '1199px',
        numVisible: 1,
        numScroll: 1
      },
      {
        breakpoint: '991px',
        numVisible: 2,
        numScroll: 1
      },
      {
        breakpoint: '767px',
        numVisible: 1,
        numScroll: 1
      }
    ];
  }

  getSeverity(status: string): string {
    switch (status) {
      case 'INSTOCK':
        return 'success';
      case 'LOWSTOCK':
        return 'warning';
      case 'OUTOFSTOCK':
        return 'danger';
      default:
        return 'default'; // Add a default case for safety
    }
  }
}
