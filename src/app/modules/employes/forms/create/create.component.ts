import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

// Services
import { EmployeService } from '../../services/employe.service';

@Component({
  selector: 'app-create-employer',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateEmployeeComponent implements OnInit {

  subjectId: string = null;

  form: FormGroup;
  formAddreses: FormArray;
  formMessage: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private _employe: EmployeService,
  ) {

    this.form = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      addresses: this.formBuilder.array([]),
    })

    this.subjectId = this.route.snapshot.params.id;

    if(this.subjectId) {

      this.form.addControl('id', new FormControl(this.subjectId, Validators.required));
      this._employe.get(this.subjectId).subscribe((data) => {
        this.form.patchValue(data);
      })
    }

  }

  ngOnInit() {
    this.addAddresses();
  }

  onSubmit() {
    console.log('test', this.form.value);
    if (this.form.invalid) return true;
    this.formMessage = '';

    let actionType = (this.subjectId) ? 'edit' : 'create';
    console.log(actionType);
    
    this._employe[actionType](this.form.value)
      .toPromise()
      .then((data) => {
        this.router.navigateByUrl('/employes/list');
      })
      .catch((err) => {
        console.log(err.error);
        this.formMessage = err.error;
      })
    ;
  }

  addAddresses(): void {
    // this.formAddreses = this.form.get('addresses') as FormArray;
    // this.formAddreses.push(this.createAddresses());
    this.addresses.push(this.createAddresses());
  }

  get addresses(): FormArray {
    return this.form.get("addresses") as FormArray
  }

  createAddresses(): FormGroup {
    return this.formBuilder.group({
      streetName: [''],
      postalCode: [''],
      apartmentNumber: [''],
      state: [''],
      country: [''],
    });
  }

}
