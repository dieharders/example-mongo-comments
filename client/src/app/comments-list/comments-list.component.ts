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

export class CommentsComponent implements OnInit {

  // Data from server
  comments: Comment[];
  // New comment being entered in input field
  comment = new Comment();

  constructor(private commentService: CommentService) {}

  // Loading spinner stuff
  showSpinner: boolean = true;
  // Show the main hero list?
  showComments: boolean = false;

  ngOnInit(): void {
     this.getComments();
  }

  // Sort comments newest => oldest
  sortByRecent() {
    function compare(a,b) {
      if (a.timestamp > b.timestamp)
          return -1;
      if (a.timestamp < b.timestamp)
        return 1;
      return 0;
    }
    this.comments.sort(compare);
  }

  // Sort comments highest liked => lowest liked
  sortByLikes() {
    function compare(a,b) {
      if (a.likes > b.likes)
          return -1;
      if (a.likes < b.likes)
        return 1;
      return 0;
    }
    this.comments.sort(compare);
  }

  getComments() {
    return this.commentService.getComments()
      .subscribe(
        comments => {
          //console.log(comments);
          
          this.comments = comments;
          this.showSpinner = false; // Hide spinner
          // Check timestamps and label the difference in time (1 month ago) since post
          for (let index = 0; index < this.comments.length; index++) {
            let t = new Date(this.comments[index].timestamp);
            let daysElapsed = Math.floor( (Date.now() - t.getTime()) / (1000*60*60*24) );
            let monthsElapsed = Math.floor( (daysElapsed / 30) );
            if (monthsElapsed < 1) {
              if (daysElapsed <= 0) {
                this.comments[index].elapsed = 'less than a day ago';
              } else {
                this.comments[index].elapsed = daysElapsed + ' days ago';
              }
            } else {
              this.comments[index].elapsed = monthsElapsed + ' months ago';
            }
          }
          this.sortByRecent();
        }
      );
  }

  showCommentsList() {
    this.showComments = true;
  }

  clearComment() {
    // clear input
    this.comment.comment = '';
  }

  addComment() {
    this.save();
    // clear input
    this.clearComment();
  }

  private save(): void {
    //console.log(this.comment);
    
    this.commentService.addComment(this.comment)
        .subscribe( () => {
          // Reload the comments
          this.getComments();
    });
  }

  // Increment the likes button for a given comment
  updateComment(id): void {
    // Get comment by its' _id
    function findById(e) {
      return e._id === id; // give us the element matching our passed id
    }
    const index = this.comments.findIndex(findById);
    const elem = this.comments[index];
    
    // Update this comment on server
    this.commentService.updateComment(elem)
        .subscribe(result => {
          //console.log("Comment Updated Successfully! " + JSON.stringify(result) );
          
          // Get back result and update the local data model (in this case only 'likes')
          this.comments[index].likes = result.likes;
    });
  }
}
