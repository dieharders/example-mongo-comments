import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommentsComponent } from '../comments-list/comments-list.component';
import { AddCommentComponent } from '../add-comment/add-comment.component';
import { CommentDetailsComponent } from '../comment-details/comment-details.component';

const routes: Routes = [
   {
     path: 'comments',
     component: CommentsComponent
   },
   {
     path: 'comment/add', 
     component: AddCommentComponent
   },
   {
     path: 'comments/:id',
     component: CommentDetailsComponent
   },
   {
     path: '',
     redirectTo: 'comments',
     pathMatch: 'full'
   },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})

export class AppRoutingModule {}