import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { NgxSpinnerService } from 'ngx-spinner';
import { IEvent } from 'src/app/event/models/event.model';
import { EventService } from 'src/app/event/services/event.service';
import { ModalResultIcon } from 'src/app/helpers/modal.icon.enum';
import { ModalResultService } from 'src/app/helpers/modal.service';
import { IComment } from 'src/app/media/models/comment.model';
import { CommentService } from 'src/app/media/services/comment.service';
import { FavoriteService } from 'src/app/media/services/favorite.service';
import { AuthService } from 'src/app/profile/services/auth/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-event-detail',
  templateUrl: './event-detail.component.html',
  styleUrls: ['./event-detail.component.sass']
})
export class EventDetailComponent implements OnInit, AfterViewInit {

  parent: string;
  event: IEvent = {} as IEvent;
  rating: number;
  faFavorite = faHeart;

  @ViewChild('eventDetailContainer') eventDetailContainer: any;

  constructor(
    private route: ActivatedRoute,
    private eventService: EventService,
    private spinner: NgxSpinnerService,
    private authService: AuthService,
    private commentService: CommentService,
    private modalResultService: ModalResultService,
    private router: Router,
    private favoriteService: FavoriteService
  ) { }

  ngOnInit(): void {
    this.getEventById(this.route.snapshot.params.id);
  }

  ngAfterViewInit(): void {
    if (this.router.url.includes('dashboard')) {
      this.eventDetailContainer.nativeElement.style.backgroundColor = 'white';
    }
  }

  getEventById(eventId: string): void {
    this.spinner.show();

    this.eventService.findEventById(eventId).then(res => {
      this.event = res;
    });

    this.spinner.hide();
  }

  addToMyFavorites(): void {
    if (!this.authService.isLogged()) {
      this.router.navigate(['profile/login']);

    } else if (this.authService.isLogged() && this.authService.getRoleOfAuthUser() !== 'USER') {
      this.modalResultService.youCanNotDoThisAction();

    } else if (this.authService.isLogged() && this.authService.getRoleOfAuthUser() === 'USER') {
      if (this.event.isFavorite) {
        this.favoriteService.removeToFavorties(this.event.id).then(() => {
          this.event.isFavorite = false;
          this.modalResultService.showModal('Eliminat dels favorits', 'S\'ha eliminat correctament dels teus favorits', ModalResultIcon.success)
        }).catch(err => {
          if (err) {
            this.modalResultService.showModal('Error al eliminar', 'S\'ha produït un error al eliminar el favorit', ModalResultIcon.error)
          }
        });

      } else {
        this.favoriteService.addToFavorites(this.event.id).then(() => {
          this.event.isFavorite = true;
          this.modalResultService.showModal('Afegit als favorits', 'S\'ha afegit correctament als teus favorits', ModalResultIcon.success);
        }).catch(err => {
          if (err) {
            this.modalResultService.showModal('Error al afegir', 'S\'ha produït un error al afegir el favorit', ModalResultIcon.error)
          }
        });
      }
    }
  }

  isUserRole(): boolean {
    return this.authService.getRoleOfAuthUser() === 'USER';
  }

  sendComment(): void {
    let comment: IComment = {} as IComment;
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
      this.commentService.sendComment(this.event.id, comment).then(res => {
        this.modalResultService.successPostComment();
      }).catch(err => {
        this.modalResultService.errorResultModal();
      })
    });
  }
}
