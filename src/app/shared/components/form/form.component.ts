import { FormBuilder, FormGroup } from '@angular/forms';
import { Component, ElementRef, Input, OnDestroy, ViewChild } from '@angular/core';
import { GrowlService } from '../../services/growl.service';
import { ActivatedRoute, Router } from '@angular/router';
import { EventHubService } from '../../services/event-hub.service';
import { ServiceLocator } from '../../misc/service-locator';
import { FormHelperComponent } from './from-helper/form-helper.component';
import { ObservableService } from '../../services/observable.service';
import { User } from '../../models/user';
import { AuthService } from '../../services/auth.service';

export abstract class FormComponent extends FormHelperComponent implements OnDestroy {
    @Input() blocked: boolean;
    @ViewChild('formElement') formElement: ElementRef;

    public editMode: boolean;
    public form: FormGroup;
    protected user: User;

    // DI
    protected formBuilder: FormBuilder;
    protected growlService: GrowlService;
    protected router: Router;
    protected eventHubService: EventHubService;
    protected observableService: ObservableService;
    protected authService: AuthService;

    constructor() {
        super();
        this.formBuilder = ServiceLocator.injector.get(FormBuilder);
        this.growlService = ServiceLocator.injector.get(GrowlService);
        this.router = ServiceLocator.injector.get(Router);
        this.eventHubService = ServiceLocator.injector.get(EventHubService);
        this.observableService = ServiceLocator.injector.get(ObservableService);
        this.authService = ServiceLocator.injector.get(AuthService),

        this.user =  this.authService.getConnectedUser();
    }

    abstract getFormContent();

    abstract onSave();

    protected getFormExtra() {
        return null;
    }

    protected initFormBuilder() {
        this.initForm();
    }

    public onCancel() {
        this.initForm();
    }

    private initForm() {
        this.form = this.formBuilder.group(this.getFormContent(), this.getFormExtra());
    }

    ngOnDestroy() {
        this.observableService.unsubscribe();
    }
}
