import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Question } from '../../models/question';
import { ForumService } from '../../services/forum.service';

@Component({
  selector: 'app-forum',
  templateUrl: './forum.component.html',
  styleUrls: ['./forum.component.sass']
})
export class ForumComponent implements OnInit {

  lastQuestions: Question[] = [];
  actualPage: number = 1;
  newQuestion = {} as Question;

  constructor(private forumService: ForumService) { }

  ngOnInit(): void {
    this.lastQuestions = this.forumService.listAllQuestions('0');
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

}
