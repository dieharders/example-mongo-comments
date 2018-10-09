import { Component, OnInit } from '@angular/core';
import { Comment } from '../commentSchema';
import { CommentService } from '../comment.service';
import { animView } from '../animations/transitions.animation'; // Anim file

import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-comment-details',
  templateUrl: './comment-details.component.html',
  styleUrls: ['./comment-details.component.css'],
  animations: [animView] // add our animations
})
export class CommentDetailsComponent implements OnInit {

  comment = new Comment();
  submitted: boolean = false;
  message: string;
  hobbyInputVal: string;
  showSpinner: boolean = true; // Loading spinner stuff

  constructor(
    private commentService: CommentService,
    private route: ActivatedRoute,
    private location: Location
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.hobbyInputVal = '';
    // Get the comment details via their id in url from server
    this.commentService.getComment(id)
      .subscribe(comment => {
        this.comment = comment;
        this.showSpinner = false; // Hide spinner
        this.hobbyInputVal = '';
      });
  }

  deleteHobby(hobby): void {
    for (let index = 0; index < this.comment.hobbies.length; index++) {
      if (this.comment.hobbies[index] == hobby) {
        // Delete this item from array
        this.comment.hobbies.splice(index, 1);
      }
    }
  }

  formSubmitHobby(hobby): void {
    if (hobby != '') {
      console.log(hobby+', added to hobbies');
      // Add a hobby to start of array
      if (!this.comment.hobbies) {
        this.comment.hobbies = [];
      }
      this.comment.hobbies.unshift(hobby);
      this.hobbyInputVal = ''; // Clear hobby input val
    }
  }

  update(): void {
    this.submitted = true;
    this.commentService.updateComment(this.comment)
        .subscribe(result => {
          this.message = "Comment Updated Successfully!";
          this.hobbyInputVal = ''; // Clear hobby input val
        });
  }

  delete(): void {
    this.submitted = true;
    this.commentService.deleteComment(this.comment._id)
        .subscribe(result => this.message = "Comment Deleted Successfully!");
  }

  goBack(): void {
    this.location.back();
  }
}