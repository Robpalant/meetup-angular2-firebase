import { Component, OnInit, Renderer } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Product } from '../../models/product.model';
import { ProductsService } from '../../services/products.service';
import { ProductsListComponent } from '../shared/products-list/products-list.component';

@Component({
  selector: 'app-products-viewer',
  templateUrl: './products-viewer.component.html',
  styleUrls: ['./products-viewer.component.scss'],
	providers: [ ProductsService ]  
})
export class ProductsViewerComponent implements OnInit {

  count: number = 0;
  offset: number = 0;
  limit: number = 2; // choose an appropriate number
	products: Product[];
  loading: boolean = false;
  failed: boolean = false;

  constructor(
		private router: Router,
		private route: ActivatedRoute,    
		private productsService: ProductsService
  ) { }

  ngOnInit() {
		let observable = this.route.params
		  .map(params => params['nr'])
			.map(pageNr => (pageNr - 1) * this.limit);
		observable.subscribe(offset => this.offset = offset);
		observable.share().subscribe(offset => this.getAll(offset, this.limit));
  }

	getAll(offset: number, limit: number) {
	  console.log("getAll - offset = ", offset, " limit = ", limit);
		this.products = [];
		this.loading = true;
		this.failed = false;
		this.productsService.getAll(offset, limit).subscribe(result => {
			//this.products = result.products;
			//this.count = result.count;
	    console.log("getAll - result = ", result);
	    this.products = result[0]; // ORIGINAL result['products'];
	    this.count = 70; // ORIGINAL result['count'];
			this.loading = false;
		}, () => {
			this.loading = false;
			this.failed = true;
		});
	}

	viewProduct(productId: number) {
		this.router.navigate(['product', productId]);
	}

	editProduct(productId: number) {
		this.router.navigate(['product', productId, 'edit']);
	}

  onPageChange(offset) {
    this.offset = offset;
    this.router.navigate(['/page', (offset / this.limit) + 1]);
  }

}