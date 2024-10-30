import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class Contact {
  formOne =
  {
    email: '',
    phone: '',
    name: '',
    utmContent:'',
    utmTerm:'',
    utmCampaign:'',
    utmMedium:'',
    utmSource:''
  }

  projectDetails=
  {
    budget: '',
    category: '',
    date: '',
    describeProject: '',
    fileName: '',
    formName: '',
    id: 0,
    statusNDA: '',
    timeSlot: '',
    timeZone: '',
    consultationId:0,
    utmContent:'',
    utmTerm:'',
    utmCampaign:'',
    utmMedium:'',
    utmSource:''
  }

  companyDetails ={
    companyAddress: '',
    companyName: '',
    contactPersonName: '',
    designation: '',
    formName: '',
    consultationId:0,
    utmContent:'',
    utmTerm:'',
    utmCampaign:'',
    utmMedium:'',
    utmSource:''
  }

  contactus ={
    email: '',
    fullname: '',
    phone: '',
    source: ''
  }

  getFreeQuote =  {
    category: '',
    email: '',
    file: '',
    formName: '',
    name: '',
    number: '',
    projectBrife: ''
  }

  flagModel= {
    countryCode: '',
    dialCode: '',
    e164Number: '',
    internationalNumber: '',
    nationalNumber: '',
    number: '',
  }
}
