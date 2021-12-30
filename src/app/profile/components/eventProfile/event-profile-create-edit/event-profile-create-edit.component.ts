import { Component, OnInit } from '@angular/core';
import { IEvent } from 'src/app/event/models/event.model';
import { Form, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { IEventOrganizer } from 'src/app/administration/models/event-organizer.model';
import { AdministratorService } from 'src/app/administration/services/administrator/administrator.service';
import { EventOrganizerService } from 'src/app/administration/services/event-organizer/event-organizer.service';
import { ModalResultService } from 'src/app/helpers/modal.service';
import { UtilsService } from 'src/app/helpers/utils.helper.service';
import { EventProfileService } from 'src/app/profile/services/event/eventProfile.service';
import { Category } from 'src/app/administration/models/category.model';
import { CategoryService } from 'src/app/administration/services/category/category.service';
import { Label } from 'src/app/administration/models/label.model';
import { LabelService } from 'src/app/administration/services/label/label.service';

@Component({
    selector: 'app-event-create-edit',
    templateUrl: './event-profile-create-edit.component.html',
    styleUrls: ['./event-profile-create-edit.component.sass']
})
export class EventCreateEditComponent implements OnInit {

    title: string = 'Crea un nou acte'
    btnText: string = 'Crear'
    form: FormGroup
    mode: string
    eventId: string
    event: IEvent = {} as IEvent
    categories: Category[] = []
    eventOrganizers: IEventOrganizer[] = []
    labels: Label[] = []
    selectedLabels = []


    constructor(
        private fb: FormBuilder,
        private eventService: EventProfileService,
        private router: Router,
        private spinner: NgxSpinnerService,
        private modalResultService: ModalResultService,
        private categoryService: CategoryService,
        private eventOrganizerService: EventOrganizerService,
        private labelService: LabelService
    ) {
        this.form = this.fb.group({
            name: new FormControl('', Validators.required),
            description: new FormControl('', Validators.required),
            headerImage: new FormControl(''),
            startDate: new FormControl('', Validators.required),
            endDate: new FormControl('', Validators.required),
            category: new FormControl('', Validators.required),
            organizerId: new FormControl('', Validators.required),
            labelIds: new FormArray([]),
            eventUrl: new FormControl('', Validators.required)
        });
    }

    ngOnInit(): void {
        this.mode = UtilsService.getMode(this.router.url);

        if (this.mode && this.mode === 'create') {
            this.createMode();
        } else if (this.mode && this.mode === 'edit') {
            this.editMode();
            this.title = 'Crea un nou acte';
            this.btnText = 'Edita';
        }

        this.getCategories()
        this.getEventOrganizers()
        this.getLabels()
    }

    createMode(): void {
        this.form.reset();
    }

    editMode(): void {
        this.eventId = UtilsService.getResourceIdFromURI(this.router.url);
        this.eventId
            ? this.getEvent()
            : this.router.navigate(['/profile/dashboard/events/list']);
    }


    getEvent() {
        this.eventService.showEvent(this.eventId).then(res => {
            this.spinner.show();

            if (res) {
                this.event = res;
                this.eventId = this.event.id;
                this.form.patchValue({
                    name: this.event.name,
                    description: this.event.description,
                    headerImage: this.event.headerImage,
                    eventUrl: this.event.eventUrl,
                    category: this.event.category,
                });
            }
            this.spinner.hide();
        });
    }

    onSubmit(): void {
        if (this.form.valid) {
            this.spinner.show();

            this.form.patchValue({
                startDate: new Date(this.form.get('startDate').value).getTime() / 1000,
                endDate: new Date(this.form.get('endDate').value).getTime() / 1000
            })

            if (this.mode && this.mode === 'create') {
                this.eventService.addEvent(this.form.value).then(res => {
                    this.event = res;
                }).then(() => this.redirectUser());
            } else if (this.mode && this.mode === 'edit') {
                this.eventService.updateEvent(this.eventId, this.form.value).then(res => {
                    this.event = res;
                }).then(() => this.redirectUser());
            }
        }
    }

    redirectUser(): void {
        this.router.navigate(['/profile/dashboard/events/list']).then(() => {
            let result: Boolean = this.event.hasOwnProperty('id');

            if (this.mode === 'create') {
                this.modalResultService.createResultModal(result);
            } else if (this.mode === 'edit') {
                this.modalResultService.editResultModal(result);
            }
        }).then(() => this.spinner.hide());
    }

    getCategories(): void {
        this.categoryService.listAllCategories().then(res => {
            this.categories = res
        })
    }

    getEventOrganizers(): void {
        this.eventOrganizerService.listAllEventOrganizers().then(res => {
            this.eventOrganizers = res
        })
    }

    getLabels(): void {
        this.labelService.listAllLabels().then(res => {
            this.labels = res
        })
    }

    get eventLabels(): FormArray {
        return this.form.get('eventLabels') as FormArray
    }

    onChange(name: string, event) {
        if (event.target.checked) {
            this.selectedLabels.push(name)
        } else {
            const index = this.selectedLabels.find(label => label === name)
            this.selectedLabels.splice(index)
        }
        this.form.get('labelIds').setValue(this.selectedLabels)
        console.log(this.form.value)
    }
}
