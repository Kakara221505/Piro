import { ManagementConsoleService } from '../../services/event-management-module/management-console.service';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-access-management',
  templateUrl: './access-management.component.html',
  styleUrls: ['./access-management.component.css']
})
export class AccessManagementComponent implements OnInit {
  public todayDate: any = new Date();
  @Output() nextTabEvent = new EventEmitter<string>();
  fieldTextType: boolean;
  moralisMessage: boolean =false
  public eventData: any;
  public check: any;
  public domains: any;
  public visibles: any;
  public tickets: any;
  display = false;
  display1 = false;
  domain = false;
  select = false;
  imgloading: boolean = false;
  imgloadingPass: boolean = false;
  imgloadingFree: boolean = false;
  imgloadingPaid: boolean = false;
  emailPattern = '^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$';
  regex = '(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?.)+[a-z0-9][a-z0-9-]{0,61}[a-z0-9]';
  paidFrom!: FormGroup;
  FreeForm!: FormGroup;
  accessForm!: FormGroup;
  bookForm!: FormGroup;
  submitted = false;

  access = {
    acessType: ''
  };

  passwordProtect = {
    password: '' || null
  };
  whiteListEmailDomain: any;

  openStyle = 'none';
  passwordStyle = 'none';
  registrationStyle = 'none';
  nftStyle = 'none';
  emailStyle = 'none';
  errorStyle = 'none';
  deleteButton = 'block';
  spinnerButton = 'none';
  

  regisForm = {
    eventId: 0,
    noOfTickets: '',
    salesEndDate: '',
    salesStartDate: '',
    ticketName: '',
    ticketPrice: '',
    ticketType: '',
    visibilty: ''
  };
  nftDataForm = {
    eventId: 0,
    blockChain: '',
    contractAddress: '',
    nftTicketType: 'Existing_Nft_Collection',
    tokenId: 'All'
  };
  eventId: any;
  errorMessage: any = null;
  errorMessageFree: any = null;
  errorMessagePaid: any = null;
  errorMessageDomain: any = null;
  paidForm: any;
  nftForm: any;
  password: any;
  acessType: any;
  passwordRequired: boolean = false;
  nftRequired: boolean = false;
  emailRequired: boolean = false;
  nftBased: null;
  isNftData :boolean=false
  errorFileSize: string;
  moralisName: any;
  symbol: any;
  nftDetails: any;
  contractAddress: any;
  constructor(
    private formbuilder: FormBuilder,
    private eventService: ManagementConsoleService,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.eventId = this.route.snapshot.paramMap.get('id');
    this.paidFrom = this.formbuilder.group({
      title: ['', Validators.required],
      maxAttendees: ['', Validators.required],
      eventStartDate: ['', Validators.required],
      eventEndDate: ['', Validators.required],
      eventTypeId: [''],
      eventCategoryId: [''],
      eventPrivacy: [''],
      eventSummary: ['']
    });
    this.bookForm = this.formbuilder.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      phone: ['', Validators.required]
    });

    this.FreeForm = this.formbuilder.group({
      title: ['', Validators.required],
      maxAttendees: ['', Validators.required],
      eventStartDate: ['', Validators.required],
      eventEndDate: ['', Validators.required],
      eventTypeId: [''],
      eventCategoryId: [''],
      eventPrivacy: [''],
      eventSummary: ['']
    });

    this.accessForm = this.formbuilder.group({
      acessType: ['', Validators.required],
      eventId: this.eventId,
      password: ['']
    });
    if (this.eventId != null) {
      this.getEventDetails();
      this.getDomains();
      this.showTickets();
    }

    this.showVisibilty();

    this.openStyle = 'none';
    this.passwordStyle = ' none';
    this.emailStyle = 'none';
    this.nftStyle = 'none';
    this.registrationStyle = ' none';
  }

  toggleFieldTextType() {
    this.fieldTextType = !this.fieldTextType;
  }

  get f() {
    return this.paidFrom.controls;
  }
  get n() {
    return this.bookForm.controls;
  }

  get p() {
    return this.FreeForm.controls;
  }
  myFunction() {
    this.openStyle = ' block';
    this.passwordStyle = 'none';
    this.emailStyle = 'none';
    this.registrationStyle = 'none';
    this.nftStyle = 'none';
  }
  myFunction1() {
    this.openStyle = ' none';
    this.passwordStyle = ' block';
    this.emailStyle = 'none';
    this.registrationStyle = 'none';
    this.nftStyle = 'none';
  }
  myFunction2() {
    this.openStyle = ' none';
    this.passwordStyle = 'none';
    this.emailStyle = 'block';
    this.registrationStyle = 'none';
    this.nftStyle = 'none';
  }

  myFunction3() {
    this.openStyle = ' none';
    this.passwordStyle = 'none';
    this.emailStyle = 'none';
    this.registrationStyle = 'none';
    this.nftStyle = 'block';
  }

  anyone() {
    this.openStyle = ' none';
    this.passwordStyle = 'none';
    this.emailStyle = 'none';
    this.nftStyle = 'none';
    this.registrationStyle = 'block';
  }

  nextTabs(value: string) {
    this.nextTabEvent.emit(value);
  }

  onSubmitAcess() {
    this.submitted = true;

    if (this.accessForm.invalid) {
      return;
    }

    this.save();
  }

  keyFunc(x: any) {
    this.errorMessageDomain = '';
  }

  save() {
   
    if(!this.isNftData && this.acessType === 'NFT_BASED' && this.nftDetails == null){
      this.imgloading = true;
      this.errorFileSize = ''
        this.toastr.error(this.errorFileSize, 'Please Save The Nft Data', {
          timeOut: 5000,
        });
        this.imgloading = false;
    }
   
    else{

    
    if (this.acessType === 'PASSWORD_PROTECTED' && (this.password === null || this.password === '')) {
      this.passwordRequired = true;
      return;
    }
    this.submitted = true;
    this.imgloading = true;
    if (this.accessForm.invalid) {
      this.errorStyle = 'block';
      this.imgloading = false;
    } else {
      this.eventService.setAccessType(this.accessForm.value).subscribe(
        (data: any) => {
          this.router.navigateByUrl(`/add-events/role-management/${this.eventId}`);
          this.imgloading = false;
          window.scrollTo(0, 0);
          this.errorStyle = 'none;';
        },
        (error) => {
          this.imgloading = false;
        }
      );
    }
  }
  }
  getEventDetails() {
    this.eventService.getEvents(this.eventId).subscribe((data: any) => {
      this.eventData = data;
      this.password = data.password;
      this.check = data.acessType;
      this.acessType = data.acessType;
      this.nftDetails=data.nftBasedData
      this.nftDataForm.contractAddress=data.nftBasedData.contractAddress
      this.nftDataForm.blockChain=data.nftBasedData.blockChain
      this.moralisName=data.nftBasedData.name
      if (data.acessType === 'OPEN') {
        this.openStyle = 'block';
        this.passwordStyle = 'none';
        this.emailStyle = 'none';
        this.registrationStyle = 'none';
      } else if (data.acessType === 'PASSWORD_PROTECTED') {
        this.passwordStyle = 'block';
        this.emailStyle = 'none';
        this.registrationStyle = 'none';
        this.openStyle = 'none';
      } else if (data.acessType === 'EMAIL_AND_OTP') {
        this.emailStyle = 'block';
        this.registrationStyle = 'none';
        this.openStyle = 'none';
        this.passwordStyle = 'none';
      } else if (data.acessType === 'REGISTRATION') {
        this.registrationStyle = 'block';
        this.openStyle = 'none';
        this.passwordStyle = 'none';
        this.emailStyle = 'none';
      }
      else if (data.acessType === 'NFT_BASED') {
        this.nftStyle='block'
        this.registrationStyle = 'none';
        this.openStyle = 'none';
        this.passwordStyle = 'none';
        this.emailStyle = 'none';
        this.moralisMessage=true
      }
    });
  }

  copyLink() {
    this.imgloading = true;
    this.eventService.openAccess(this.eventId, '').subscribe((data: any) => {
      this.imgloading = false;
    });
  }

  savePassword(passwordForm: any) {
    this.imgloadingPass = true;
    let body = {
      password: this.passwordProtect.password || null,
      eventId: this.eventId
    };
    this.eventService.addPasswordProtected(body).subscribe(
      (data: any) => {
        this.submitted = true;
        this.imgloadingPass = false;
        passwordForm.resetForm();
      },
      (error) => {
        this.imgloadingPass = false;
        this.submitted = false;
      }
    );
  }

  getDomains() {
    this.eventService.getEmailDomains(this.eventId).subscribe((data: any) => {
      this.domains = data;
    });
  }

  addDomains(otpForm: any) {
    console.log('hii');
    let body = {
      eventId: this.eventId,
      whiteListEmailDomain: this.whiteListEmailDomain || null
    };
    if (body.whiteListEmailDomain != null) {
      this.eventService.addEmailOtp(body).subscribe(
        (data: any) => {
          // this.deleteButton='block';
          // this.spinnerButton='none';
          this.getDomains();
          otpForm.resetForm();
          this.errorMessageDomain = '';
        },
        (error) => {
          this.errorMessageDomain = error.error.message;
        }
      );
    }
  }

  moralisAddress() {
    let body = {
      blockChain: "mumbai" || null,
      contractAddress: this.nftDataForm.contractAddress || null,
    };
    this.eventService.getMetaMoralishAddress(body.contractAddress,body.blockChain).subscribe((data: any) => {
      this.moralisMessage=true
     this.moralisName=data.name
     console.log(this.moralisName)
     this.symbol=data.symbol
    });
  }

 addNft(nftForm: any) {
    this.submitted = true;
    this.imgloading = true;
    this.moralisAddress();
    // console.log(this.moralisName)
    let body = {
      eventId: this.eventId,
      blockChain: this.nftDataForm.blockChain || null,
      contractAddress: this.nftDataForm.contractAddress || null,
      nftTicketType: this.nftDataForm.nftTicketType || null,
      tokenId: this.nftDataForm.tokenId || null,
      name:this.moralisName

    };
    if (body.blockChain != null, body.contractAddress != null, body.nftTicketType != null, body.tokenId != null) {
     
      this.eventService.setNftType(body).subscribe(
        (data: any) => {
          console.log(data.message)
          this.toastr.success(data.message, 'NFT', {
            timeOut: 5000,
          });
          this.isNftData =true;
          this.imgloading = false;
          // nftForm.resetForm();
         
        },
        (error) => {
          this.imgloading = false;
          this.errorMessageDomain = error.error.message;
        }
      );
    }
   

  }

  deleteDomains(id: any) {
    this.eventService.deleteDomains(id).subscribe((data: any) => {
      // this.deleteButton='none';
      // this.spinnerButton='block'
      this.getDomains();
    });
  }



  showVisibilty() {
    this.eventService.getVisibilty().subscribe((data: any) => {
      this.visibles = data;
    });
  }

  showTickets() {
    this.eventService.getTickets(this.eventId).subscribe((data: any) => {
      this.tickets = data;
    });
  }

  onSubmit() {
    this.submitted = true;
    if (this.regisForm.ticketName === null || this.regisForm.noOfTickets === null) {
      return;
    }
    this.addPaidForm(this.paidForm);
  }

  addPaidForm(paidForm: any) {
    this.submitted = true;
    this.imgloadingPaid = true;
    let body = {
      eventId: this.eventId,
      noOfTickets: this.regisForm.noOfTickets,
      salesEndDate: this.regisForm.salesEndDate,
      salesStartDate: this.regisForm.salesStartDate,
      ticketName: this.regisForm.ticketName,
      ticketPrice: this.regisForm.ticketPrice,
      ticketType: 'PAID',
      visibilty: this.regisForm.visibilty
    };
    if (body.ticketName === null || body.noOfTickets === null || body.ticketPrice === null || body.salesStartDate === null) {
      this.imgloadingPaid = false;
    } else {
      this.eventService.addRegistration(body).subscribe(
        (data: any) => {
          this.submitted = false;
          this.imgloadingPaid = false;
          paidForm.resetForm();
          this.showTickets();
          this.errorMessagePaid = '';
        },
        (error) => {
          this.imgloadingPaid = false;
          this.errorMessagePaid = error.error.message;
        }
      );
    }
  }

  addFreeForm(freeForm: any) {
    this.submitted = true;
    this.imgloadingFree = true;
    let body = {
      eventId: this.eventId,
      noOfTickets: this.regisForm.noOfTickets,
      salesEndDate: this.regisForm.salesEndDate,
      salesStartDate: this.regisForm.salesStartDate,
      ticketName: this.regisForm.ticketName,
      ticketPrice: 0,
      ticketType: 'FREE',
      visibilty: this.regisForm.visibilty
    };
    if (body.ticketName === null || body.noOfTickets === null) {
      this.imgloadingFree = false;
    } else {
      this.eventService.addRegistration(body).subscribe(
        (data: any) => {
          this.imgloadingFree = false;
          freeForm.resetForm();
          this.showTickets();
          this.errorMessageFree = '';
        },
        (error) => {
          this.imgloadingFree = false;
          this.errorMessageFree = error.error.message;
        }
      );
    }
  }

  deleteAccessTickets(id: any) {
    this.eventService.deleteTickiets(id).subscribe((data: any) => {
      this.showTickets();
    });
  }
}
