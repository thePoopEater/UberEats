import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductosService } from '../../services/producto-service/productos.service';

@Component({
  selector: 'app-test-api',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './test-api.component.html',
  styleUrl: './test-api.component.css'
})
export class TestAPIComponent implements OnInit{

  // http = inject(HttpClient)
  posts: any = [];

  private postService = inject(ProductosService);
  ngOnInit(): void {
    // this.loadPosts();
  }



  // fetchPosts(){
  //   this.http.get('https://jsonplaceholder.typicode.com/posts')
  //   .subscribe((posts: any) => {
  //     console.log(posts);
  //     this.posts = posts;
  //   });
  // }
  // loadPosts(){
  //   this.postService.getPosts().subscribe((posts:any) => {
  //     console.log("llamado desde el services papus");
  //     console.log(posts);
  //     this.posts = posts;
  //   })
  // }

  //suscribirse al service para llamar a los posts
  // loadPosts(){
  //   this.postService.getPosts().subscribe({
  //     next: (posts: any) => {
  //       this.posts = posts;
  //       console.log("Post fetched");
  //     },
  //     error: (error ) => console.log('Error fetched')
  //   })
  // }
}
