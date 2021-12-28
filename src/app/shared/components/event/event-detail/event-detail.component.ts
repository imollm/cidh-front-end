import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { IEvent } from 'src/app/event/models/event.model';
import { EventService } from 'src/app/event/services/event.service';
import { ModalResultService } from 'src/app/helpers/modal.service';
import { IComment } from 'src/app/media/models/comment.model';
import { CommentService } from 'src/app/media/services/comment.service';
import { AuthService } from 'src/app/profile/services/auth/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-event-detail',
  templateUrl: './event-detail.component.html',
  styleUrls: ['./event-detail.component.sass']
})
export class EventDetailComponent implements OnInit {

  parent: string;
  event: IEvent = {} as IEvent;
  rating: number;

  @ViewChild('eventDetailContainer') eventDetailContainer: ElementRef;

  constructor(
    private route: ActivatedRoute,
    private eventService: EventService,
    private spinner: NgxSpinnerService,
    private authService: AuthService,
    private commentService: CommentService,
    private modalResultService: ModalResultService,
    private er: ElementRef
  ) {
    this.eventDetailContainer = er;
  }

  ngOnInit(): void {
    this.getEventById(this.route.snapshot.params.id);
    this.onDashboard();
  }

  getEventById(eventId: string): void {
    this.spinner.show();

    this.eventService.findEventById(eventId).then(res => {
      this.event = res;
    });

    this.spinner.hide();
  }

  onDashboard(): void {
    this.eventDetailContainer.nativeElement.style.backgroundColor = 'white';
  }

  isLogged(): boolean {
    return this.authService.isLogged();
  }

  sendComment(): void {
    let comment: IComment = {} as IComment;
    comment.eventId = this.event.id;
    comment.createdAt = new Date();

    Swal.fire({
      title: 'Escriu el teu comentari',
      input: 'textarea',
      inputPlaceholder: 'El meu comentari...',
      showCancelButton: true,
      confirmButtonColor: '#00adb5',
      cancelButtonColor: '#8ea8c3',
      inputValidator: (message) => {
        if (!message) {
          return 'Necessites escriure un comentari';
        } else {
          comment.comment = message;
          return null;
        }
      }
    }).then(() => {
      console.log(comment);
      console.log(this.event);
      this.commentService.sendComment(comment).then(res => {
        this.modalResultService.successPostComment();
      }).catch(err => {
        this.modalResultService.errorResultModal();
      })
    });
  }
}
