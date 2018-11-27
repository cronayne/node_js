import { Post } from './posts.model';
import { Injectable } from '@angular/core';

@Injectable({providedIn: 'root'})
export class PostsService {
  private posts: Post[] = [];

  getPosts() {
    // Returns a copy of the array posts
    return [...this.posts];
  }

  addPost(title: string, content: string) {
    const post: Post = {title: title, content: content};
    this.posts.push(post);
  }
}
