import { AfterContentChecked, AfterContentInit, AfterViewChecked, AfterViewInit, Component, DoCheck, OnInit } from '@angular/core';
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
import { of } from 'rxjs';

@Component({
    selector: 'app-event-create-edit',
    templateUrl: './event-create-edit.component.html',
    styleUrls: ['./event-create-edit.component.sass']
})
export class EventCreateEditComponent implements OnInit, AfterViewChecked {

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
    private readonly URLRegex: string = '^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$';


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
            eventUrl: new FormControl('', [Validators.required, Validators.pattern(this.URLRegex)])
        });

    }

    ngAfterViewChecked(): void {
        if (this.labels.length > 0) { 
            this.initLabelCheckboxes();
        }
    }

    ngOnInit(): void {
        this.mode = UtilsService.getMode(this.router.url);

        this.getLabels();
        this.getCategories();
        this.getEventOrganizers();

        if (this.mode && this.mode === 'create') {
            this.createMode();
        } else if (this.mode && this.mode === 'edit') {
            this.editMode();
            this.title = 'Edita l\'acte';
            this.btnText = 'Edita';
        }
    }

    private async getLabels(): Promise<void> {
        this.labels = await this.labelService.listAllLabels();
    }

    private async getCategories(): Promise<void> {
        this.categories = await this.categoryService.listAllCategories();
    }

    private async getEventOrganizers(): Promise<void> {
        this.eventOrganizers = await this.eventOrganizerService.listAllEventOrganizers();
    }

    private initLabelCheckboxes(): void {
        if (this.mode === 'create') {
            this.labels.forEach(() => this.labelIdsFormArray.push(new FormControl(false)));

        } else if (this.mode === 'edit') {
            let isSelected = false;

            if (this.labels && this.labels.length > 0 && this.event.labels) {
                this.labels.forEach(label => {
                    isSelected = false;
    
                    this.event.labels.forEach(eventLabel => {
                        if (eventLabel.id === label.id) {
                            isSelected = true;
                        }
                    })
    
                    this.labelIdsFormArray.push(new FormControl(isSelected))
                })
            }
        }
    }

    private createMode(): void {
        this.form.reset();
    }

    private editMode(): void {
        this.eventId = UtilsService.getResourceIdFromURI(this.router.url);
        this.eventId
            ? this.getEvent()
            : this.router.navigate(['/profile/dashboard/events/list']);
    }

    get labelIdsFormArray(): FormArray {
        return this.form.controls.labelIds as FormArray;
    }

    private async getEvent(): Promise<void> {
        this.spinner.show();

        this.event = await this.eventService.showEvent(this.eventId);

        this.eventId = this.event.id;

        this.form.patchValue({
            name: this.event.name,
            description: this.event.description,
            headerImage: this.event.headerImage,
            eventUrl: this.event.eventUrl,
            category: this.event.category.name,
            organizerId: this.event.eventOrganizer.id,
            startDate: new Date(this.event.startDate * 1000).toISOString().split('T')[0],
            endDate: new Date(this.event.endDate * 1000).toISOString().split('T')[0]
        });

        this.spinner.hide();
    }

    private prepareDatesToBeSendIt(): void {
        this.form.value.startDate = this.form.value.startDate !== ''
            ? new Date(this.form.get('startDate').value).getTime() / 1000
            : null;
        this.form.value.endDate = this.form.value.endDate !== ''
            ? new Date(this.form.get('endDate').value).getTime() / 1000
            : null;
    }

    private prepareLabelIdsToBeSendIt(): void {
        this.form.value.labelIds =
            this.form.value.labelIds
                .map((checked, i) => checked && (i < this.labels.length) ? this.labels[i].id : null)
                .filter(v => v !== null);
    }

    private redirectUser(): void {
        this.router.navigate(['/profile/dashboard/events/list']).then(() => {
            let result: Boolean = this.event.hasOwnProperty('id');

            if (this.mode === 'create') {
                this.modalResultService.createResultModal(result);
            } else if (this.mode === 'edit') {
                this.modalResultService.editResultModal(result);
            }
        }).then(() => this.spinner.hide());
    }

    onSubmit(): void {
        if (this.form.valid) {
            this.spinner.show();

            this.prepareDatesToBeSendIt();
            this.prepareLabelIdsToBeSendIt();

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
}

