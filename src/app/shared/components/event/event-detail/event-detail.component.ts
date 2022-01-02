import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subscription } from 'rxjs';
import { IEvent } from 'src/app/event/models/event.model';
import { IRating } from 'src/app/event/models/rating.model';
import { EventService } from 'src/app/event/services/event.service';
import { ModalResultIcon } from 'src/app/helpers/modal.icon.enum';
import { ModalResultService } from 'src/app/helpers/modal.service';
import { UtilsService } from 'src/app/helpers/utils.helper.service';
import { IComment } from 'src/app/media/models/comment.model';
import { CommentService } from 'src/app/media/services/comment.service';
import { FavoriteService } from 'src/app/media/services/favorite.service';
import { AuthService } from 'src/app/profile/services/auth/auth.service';
import { EventSearcher } from 'src/app/shared/models/event-searcher.model';
import { EventSearcherService } from 'src/app/shared/services/event-searcher.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-event-detail',
  templateUrl: './event-detail.component.html',
  styleUrls: ['./event-detail.component.sass']
})
export class EventDetailComponent implements OnInit, AfterViewInit, OnDestroy {

  parent: string;
  event: IEvent = {} as IEvent;
  rating: number;
  faFavorite = faHeart;
  comments: IComment[];
  today: Date;
  searchParams: EventSearcher;
  subscription: Subscription;

  @ViewChild('eventDetailContainer') eventDetailContainer: any;

  constructor(
    private route: ActivatedRoute,
    private eventService: EventService,
    private spinner: NgxSpinnerService,
    private authService: AuthService,
    private commentService: CommentService,
    private modalResultService: ModalResultService,
    private router: Router,
    private favoriteService: FavoriteService,
    private messageService: EventSearcherService
  ) {
    this.today = new Date();
  }

  ngOnInit(): void {
    this.getEventById(this.route.snapshot.params.id);
    this.subscription = this.messageService.currentMessage.subscribe(message => this.searchParams = message);
    this.messageService.deleteMessage();
  }

  ngAfterViewInit(): void {
    if (this.router.url.includes('dashboard')) {
      this.eventDetailContainer.nativeElement.style.backgroundColor = 'white';
    }
  }

  getEventById(eventId: string): void {
    this.spinner.show();

    this.eventService.findEventById(eventId).then(res => {
      if (res) {
        this.event = res;
      }
    })
      .then(() => {
        if (this.isLogged()) {
          this.commentService.getCommentsByEventId(this.event.id).then(res => {
            if (res && res.length > 0) {
              this.comments = res;
            }
          });
        }
      });

    this.spinner.hide();
  }

  addToMyFavorites(): void {
    if (!this.authService.isLogged()) {
      this.router.navigate(['profile/login']);

    } else if (this.authService.isLogged() && !this.isUserRole()) {
      this.modalResultService.youCanNotDoThisAction();

    } else if (this.authService.isLogged() && this.isUserRole()) {
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

  subscribeIt(): void {
    if (!this.authService.isLogged()) {
      this.router.navigate(['profile/login']);

    } else if (this.authService.isLogged() && !this.isUserRole()) {
      this.modalResultService.youCanNotDoThisAction();

    } else if (this.authService.isLogged() && this.isUserRole()) {
      if (!this.event.isUserSubscribed) {
        this.eventService.subscribe(this.event.id).then(() => {
          this.event.isUserSubscribed = true;
          this.modalResultService.showModal('Te has subscrit', 'La teva subscripció s\'ha guardat correctament!', ModalResultIcon.success);
        }).catch(err => {
          if (err) {
            this.modalResultService.showModal('No se t\'ha pogut subscriure', 'La teva subscripció no s\'ha guardat correctament!', ModalResultIcon.error);
          }
        })
      } else {
        this.eventService.unsubscribe(this.event.id).then(() => {
          this.event.isUserSubscribed = false;
          this.modalResultService.showModal('Te has donat de baixa', 'Se t\'ha donat de baixa de la teva subscripció!', ModalResultIcon.success);
        }).catch(err => {
          if (err) {
            this.modalResultService.showModal('No se t\'ha pogut desubscriure', 'No se t\'ha pogut donar de baixa de la teva subscripció!', ModalResultIcon.error);
          }
        })
      }
    }
  }

  sendComment(): void {
    if (this.isLogged()) {
      let comment: IComment = {} as IComment;
      comment.createdAt = new Date().getTime() / 1000;

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
        this.commentService.sendComment(this.event.id, comment).then(res => {
          this.modalResultService.successPostComment();

          this.commentService.getCommentsByEventId(this.event.id).then(res => {
            if (res && res.length > 0) {
              this.comments = res;
            }
          });
        }).catch(err => {
          const title = 'Event ja comentat!';
          const text = 'Ja has fet un comentari sobre aquest event';
          const icon = ModalResultIcon.warning;

          this.modalResultService.showModal(title, text, icon);
        })
      });
    }
  }

  rateIt(): void {
    if (this.isLogged()) {
      let rate: IRating = {} as IRating;

      Swal.fire({
        title: 'Puntua del 1 al 5',
        input: 'select',
        inputOptions: {
          'Puntuacions': {
            1: '1',
            2: '2',
            3: '3',
            4: '4',
            5: '5'
          }
        },
        inputValidator: (rating) => {
          if (!rating) {
            return 'Necessites escollir una puntuació';
          } else {
            this.event.rating.rating = Number(rating);
            return null;
          }
        }
      }).then(() => {
        this.commentService.addRating(this.event.id, this.event.rating.rating).then(() => {
          const title: string = 'Puntuació enviada';
          const text: string = 'S\'ha registrat correctament la teva puntuació!'
          const icon: ModalResultIcon = ModalResultIcon.success;
          this.ngOnInit();
          this.modalResultService.showModal(title, text, icon);
        }).catch(() => this.modalResultService.errorResultModal())
      });
    }
  }

  shareIt(): void {
    if (this.isLogged()) {
      Swal.fire({
        title: 'Input email address',
        input: 'email',
        inputLabel: 'Your email address',
        inputPlaceholder: 'Enter your email address'
      }).then(() => {
        Swal.fire({
          icon: 'success',
          title: 'Enviada correctament!',
          text: 'La teva recomenació s\'ha enviat correctament.',
        })
      });
    }
  }

  isUserRole(): boolean {
    return this.authService.getRoleOfAuthUser() === 'USER';
  }

  isLogged(): boolean {
    return this.authService.isLogged();
  }

  isTheDayOfEvent(): boolean {
    const eventStartDate = UtilsService.humanitizeEpochDate(this.event.startDate);
    const eventEndDate = UtilsService.humanitizeEpochDate(this.event.endDate);
    const today = UtilsService.getFullDate(this.today);

    return this.event.startDate && (eventStartDate <= today) && (today <= eventEndDate);
  }

  hasEventCelebrated(): boolean {
    const eventEndDate = UtilsService.humanitizeEpochDate(this.event.endDate);
    const today = UtilsService.getFullDate(this.today);

    return this.event.endDate && eventEndDate < today;
  }

  goToCategoryResult(event: Event): void {
    const categoryName = (event.target as HTMLElement).attributes[2].value;
    const redirectUrl: string = this.isLogged() ? 'event/dashboard/event/search' : '/search';

    this.searchParams.category = [];
    this.searchParams.category.push(categoryName);
    this.searchParams.redirect = true;
    console.log(this.searchParams);

    this.messageService.changeMessage(this.searchParams);

    this.router.navigate([redirectUrl]);
  }

  goToLabelResults(event: Event): void {
    const labelName = (event.target as HTMLElement).attributes[2].value;
    const redirectUrl: string = this.isLogged() ? 'event/dashboard/event/search' : '/search';

    this.searchParams.label = [];
    this.searchParams.label.push(labelName);
    this.searchParams.redirect = true;
    console.log(this.searchParams);

    this.messageService.changeMessage(this.searchParams);

    this.router.navigate([redirectUrl]);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
