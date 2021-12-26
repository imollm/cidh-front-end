import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Question } from '../../../media/models/question.model';
import { ForumService } from '../../../media/services/forum.service';

@Component({
  selector: 'app-forum',
  templateUrl: './forum.component.html',
  styleUrls: ['./forum.component.sass']
})
export class ForumComponent implements OnInit {

  lastQuestions: Question[] = [];
  actualPage: number = 1;
  newQuestion = {} as Question;

  @ViewChild('forumContainer') forumContainer: ElementRef;

  constructor(
    private forumService: ForumService,
    private router: Router,
    private er: ElementRef,
  ) {
    this.forumContainer = er;
  }

  ngOnInit(): void {
    this.lastQuestions = this.forumService.listAllQuestions('0');
    this.borderStyle();
  }

  addQuestion(): void {
    Swal.fire({
      title: 'Selecciona un event',
      input: 'select',
      inputOptions: {
        event1: 'Event 1',
        event2: 'Event 2',
        event3: 'Event 3',
      },
      inputPlaceholder: 'Selecciona un event',
      showCancelButton: true,
      confirmButtonColor: '#00adb5',
      cancelButtonColor: '#8ea8c3',
      inputValidator: (eventId) => {
        return new Promise((resolve) => {
          this.newQuestion.eventId = eventId;
          resolve(null)
        })
      }
    }).then(() => {
      Swal.fire({
        title: 'Escriu la teva pregunta',
        input: 'textarea',
        inputPlaceholder: 'Quina pregunta tens...',
        showCancelButton: true,
        confirmButtonColor: '#00adb5',
        cancelButtonColor: '#8ea8c3',
        inputValidator: (message) => {
          return new Promise((resolve) => {
            this.newQuestion.message = message;
            resolve(null)
          })
        }
      })
    }).then(() => {
      console.log(this.newQuestion)
    })
  }

  borderStyle(): void {
    if (this.router.url.includes('event-detail')) {
      this.forumContainer.nativeElement.style.borderRadius = '25px';
      console.log(this.forumContainer.nativeElement.style.borderRadius);
    }
  }

}
