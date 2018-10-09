import { Component, OnInit } from '@angular/core';

import { Comment } from '../commentSchema';
import { CommentService } from '../comment.service';
import { animView } from '../animations/transitions.animation'; // Anim file

import { Location } from '@angular/common';

@Component({
  selector: 'app-add-comment',
  templateUrl: './add-comment.component.html',
  styleUrls: ['./add-comment.component.css'],
  animations: [animView] // add our animations
})

export class AddCommentComponent{

  comment = new Comment();
  submitted = false;
  hobbyInputVal: string;

  constructor(
    private commentService: CommentService,
    private location: Location
  ) { }
  
  formSubmitHobby(hobby): void {
    if (hobby != '') {
      console.log(hobby+', added to hobbies');
      // Add a hobby to start of array
      if (!this.comment.hobbies) {
        this.comment.hobbies = [];
      }
      this.comment.hobbies.unshift(hobby);
      // Clear hobby input val
      this.hobbyInputVal = '';
    }
  }

  deleteHobby(hobby): void {
    for (let index = 0; index < this.comment.hobbies.length; index++) {
      if (this.comment.hobbies[index] == hobby) {
        // Delete this item from array
        this.comment.hobbies.splice(index, 1);
      }
    }
  }

  newComment(): void {
    this.submitted = false;
    this.comment = new Comment();
  }

  addComment() {
    this.submitted = true;
    this.hobbyInputVal = ''; // Clear hobby input val
    this.save();
  }

  goBack(): void {
    this.location.back();
  }

  private save(): void {
    console.log(this.comment);
    this.commentService.addComment(this.comment)
        .subscribe();
  }
}
