//** This shows list of all comments **//
import { Component, OnInit } from '@angular/core';

import { Comment } from '../commentSchema';
import { CommentService } from '../comment.service';
import { animView } from '../animations/transitions.animation'; // Anim file

@Component({
  selector: 'app-comments-list',
  templateUrl: './comments-list.component.html',
  styleUrls: ['./comments-list.component.css'],
  animations: [animView] // add our animations
})

export class CommentsComponent  implements OnInit {

  comments: Comment[];

  constructor(private commentService: CommentService) {}

  // Loading spinner stuff
  showSpinner: boolean = true;
  // Show the main hero list?
  showComments: boolean = false;
  // Lookup array of emoji avatars
  emojis: string[] = ['😄', '😀', '🤣', '😂', '😉', '🤢', '😎', '😋', '🤩', '🤐', '😴', '😱', '😭', '🤑', '🤔'];

  ngOnInit(): void {
     this.getComments();
  }

  getComments() {
    return this.commentService.getComments()
      .subscribe(
        comments => {
          console.log(comments);
          this.comments = comments;
          this.showSpinner = false; // Hide spinner
          // Assign random avatars
          for (let index = 0; index < this.comments.length; index++) {
            let randNum = Math.floor(Math.random() * (this.emojis.length-1) ); // get random index in comments
            console.log(randNum);
            
            this.comments[index].avatar = this.emojis[randNum]; // assign emoji to comment avatar
          }
        }
      );
  }

  showCommentsList() {
    this.showComments = true;
  }
}
