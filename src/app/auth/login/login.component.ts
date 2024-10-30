import { Component, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgOtpInputComponent, NgOtpInputConfig } from 'ng-otp-input';
import { UserService } from '../../services/authenticate/user.service';
import { Location } from '@angular/common';
import { ethers } from 'ethers';
import web3 from "web3";
import { ToastrService } from 'ngx-toastr';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  imgloading: boolean = false;
  bookForm!: FormGroup;
  otpForm!: FormGroup;
  submitted = false;
  otps: string | undefined;
  showOtpComponent = true;
  @ViewChild(NgOtpInputComponent, { static: false }) ngOtpInput: NgOtpInputComponent | undefined;
  config: NgOtpInputConfig = {
    allowNumbersOnly: true,
    length: 6,
    isPasswordInput: false,
    disableAutoFocus: false,
    placeholder: ''
  };
  otpStyle = 'none';
  formStyle = 'block';
  displayStyleModel = 'none';
  value: any;
  body: any;
  public emails: any;
  errorMessage: any = null;
  errorMessageVerify: any = null;

  btnState: boolean = false;
  btnState2: boolean = false;

  otpCheckLength: boolean = false;
  displayStyle: string;
  ethereum: any;
  data: any;
  user: any;
  publicKey: any;
  token: any;
  loginBased: Promise<string>;
  constructor(
    private router: Router,
    private formbuilder: FormBuilder,
    private authService: UserService,
    private location: Location,
    private toastr: ToastrService,
  ) {
    this.ethereum = authService.window.ethereum;
  }

  
  forbiddenEmailStartingWithDot(control: AbstractControl): ValidationErrors | null {
    const email = control.value as string;
    if (email.startsWith('.')) {
      return { forbiddenEmail: true };
    }
    return null;
  }

  ngOnInit(): void {
    this.bookForm = this.formbuilder.group({
      email: ['', [Validators.required,this.forbiddenEmailStartingWithDot]],
    });
    this.otpForm = this.formbuilder.group({
      emailOtp: ['', Validators.required]
    });

    if(localStorage.getItem('X-Custom-Token')){
      this.router.navigate(['/dashboard'])
    }

    if(this.ethereum!==undefined){

   if(this.ethereum.providers!==undefined){
      const provider = this.ethereum.providers.find((provider:any) => provider.isMetaMask);
      provider.on("accountsChanged",this.handleAccountsChanged)

    }
    else{
      if(this.ethereum ! == undefined){
        this.ethereum.on("accountsChanged",this.handleAccountsChanged)
      }
      else{
        console.log("metamask not installed")
      }
    }

    if(this.ethereum.providers!==undefined){
      const provider = this.ethereum.providers.find((provider:any) => provider.isMetaMask);
      provider.on("chainChanged",this.handleAccountsChanged)

    }
    else{
      if(this.ethereum ! == undefined){
        this.ethereum.on("chainChanged",this.handleAccountsChanged)
      }
      else{
        console.log("metamask not installed")
      }
    }
  }
  }

  handleAccountsChanged(){
    console.log("account changed")
    localStorage.removeItem('signature');
    localStorage.removeItem('address');
    location.reload();
  }

  onOtpChange(val: any) {
    this.value = val;
    console.log(val);
    console.log(this.value);
  }

  setOtp(val:any){
    this.value = val;
    console.log(val);
    console.log(this.value);
  }
  get f() {
    return this.bookForm.controls;
  }

  get o() {
    return this.otpForm.controls;
  }

  keyFunc(x:any){
    this.errorMessage = ''
  }
  onSubmit() {
    this.submitted = true;

    if (this.bookForm.invalid) {
      return;
    }

    this.loginNext();
  }

  loginNext() {
    this.btnState = true;
    this.imgloading = true;
    this.submitted = true;
    localStorage.setItem('email-login', JSON.stringify(this.bookForm.value.email));
    this.emails = (localStorage.getItem('email-login') || '').replace(/['"]+/g, '');
    if (this.bookForm.value.email === '') {
      this.imgloading = false;
    } else {
      this.authService.userLogin(this.bookForm.value).subscribe(
        (data: any) => {
          this.imgloading = false;
          this.submitted = false;
          this.formStyle = 'none';
          this.otpStyle = 'block';
          this.errorMessage = '';
          this.btnState = true;
          this.value = '';
          this.otpForm.value.emailOtp = '';
        },
        (error) => {
          this.imgloading = false;
          this.btnState = false;
          this.errorMessage = error.error.message;
        }
      );
    }
  }

  loginOtpVerify() {
    this.submitted = true;

    if (this.otpForm.invalid) {
      return;
    }

    this.login();
  }

  login() {
    this.btnState2 = true;
    this.imgloading = true;
    this.body = JSON.parse(localStorage.getItem('email-login') || '');
    console.log(this.value);
    this.authService.verifyLoginOtp({ emailOtp: this.value, email: this.body }).subscribe(
      (res: any) => {
        this.imgloading = false;
        this.submitted = false;
        localStorage.removeItem('email-login');
        localStorage.setItem('X-Custom-Token', res.token);
        localStorage.setItem('isLoggedin', 'true');
        this.router.navigate(['/dashboard']);
        this.errorMessageVerify = '';
        this.btnState2 = true;
      },
      (error) => {
        this.btnState2 = false;
        this.imgloading = false;
        this.errorMessageVerify = error.error.message;
      }
    );
  }

  resendOtp(){
    this.btnState = true;
    this.imgloading = true;
    this.submitted = true;
    this.errorMessage = '';
    this.errorMessageVerify = '';
    this.body = JSON.parse(localStorage.getItem('email-login') || '');
      this.authService.userLogin({email: this.body}).subscribe(
        (data: any) => {
          this.imgloading = false;
          this.submitted = false;
          this.errorMessage = '';
          this.btnState = true;
          this.value = '';
          this.otpForm.value.emailOtp = '';
        },
        (error) => {
          this.imgloading = false;
          this.btnState = false;
          this.errorMessage = error.error.message;
        }
      )
  }

  keyFuncOtp(x:any){
    this.errorMessageVerify = ''
    console.log(this.errorMessage)
  }
  closePopup() {
    this.router.navigate(['']);
  }
  closePopup2() {
    this.router.navigate(['']);
  }

  imgClick() {
    this.router.navigate(['/']);
  }

  getBack() {
    this.formStyle = 'block';
    this.otpStyle = 'none';
    this.errorMessageVerify = '';
    this.value = '';
    this.otpForm.value.emailOtp = '';
    this.btnState = false;
    this.btnState2 = false;
  }


  async meetaMask() {

    if(this.ethereum.providers !== undefined){
      const provider = this.ethereum.providers.find((provider:any) => provider.isMetaMask);

      let chainId = 1;
      let network = "testnet";
      if (network == "testnet") {
        console.log("Testnet environment");
        chainId = 80001; 
      } else {
        chainId = 1;
      }
      if (provider !== undefined) {
        console.log("Metamask detected");
        if (provider.displayStyleModel !== chainId) {
          this.displayStyleModel = 'block';
          // this.switchChain(provider,chainId)
         
         }
        console.log("vivek12",this.data)
  
     
    }
      else {
        alert("install metamask extension!!");
      }
      
    }
    else{
    
    let chainId = 1;
    let network = "testnet";
    if (network == "testnet") {
      console.log("Testnet environment");
      chainId = 80001; 
    } else {
      chainId = 1;
    }
    if (this.ethereum !== undefined) {
      console.log("Metamask detected");
      if (this.ethereum.networkVersion !== chainId) {
        if (this.ethereum.networkVersion !== chainId) {
          this.displayStyleModel = 'block';
          // this.switchChain(this.ethereum,chainId)
         }
      }
      console.log("vivek12",this.data)
      // if(this.ethereum.networkVersion == chainId){
      //   this.signMessage(this.ethereum)
      // }
   
  }
    else {
      alert("install metamask extension!!");
    }
  }
}


async switchChain(provider:any,chainId:any){
  this.displayStyleModel = 'none';
  try {
    await  provider.request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId: web3.utils.toHex(chainId) }],
    });
  } catch (err:any) {
    // This error code indicates that the chain has not been added to MetaMask
    if (err.code === 4902) {
      await provider.request({
        method: "wallet_addEthereumChain",
        params: [
          {
            chainName: "Polygon testnet",
            chainId: web3.utils.toHex(chainId),
            nativeCurrency: {
              name: "MATIC",
              decimals: 18,
              symbol: "MATIC",
            },
            rpcUrls: ["https://polygon-mumbai.g.alchemy.com/v2/uZn30J-TzHcBz5M-7lJgPwxvS_nEXeaw"],
          },
        ],
      });
    }
  }
  this.signMessage(provider)
 }

 async signMessage(provider:any){

  try{
   
    const ethProvider = new ethers.BrowserProvider(provider);
   
    const accounts = await ethProvider.send("eth_requestAccounts", []);
    console.log(accounts);
    const signer = ethProvider.getSigner();
    this.loginBased  = (await signer).getAddress()

    // Send 1 ether to an ens name.
    let msg = "Hello World";
    let signature = await (await signer).signMessage( msg );
  localStorage.setItem('signature',signature );
  
  let signature1=signature.substring(2,signature.length) 
  console.log(signature1)
  let address =ethers.verifyMessage(msg,signature)
  console.log(address)
  localStorage.setItem('address',address );
    let body={
      signedSignature:signature1
    }
    this.authService.meetamask(body).subscribe((res: any) => {
      this.data=res.data
      this.user=res.data.user
      this.publicKey=res.data.publicKey
      localStorage.setItem('publicKey',  this.publicKey);
      localStorage.setItem('newUser',  this.user);
      this.token=res.data.jwtToken
      console.log("viv",this.user,this.token)
      if( this.user === 'NEW_USER'){
        this.router.navigate(['/signup']);
  
      }
      else{
        localStorage.setItem('X-Custom-Token',  this.token);
        localStorage.setItem('isLoggedin', 'true');
        this.router.navigate(['/dashboard']);
      }

  },(error: any) => {
    if (error.status === 400) {
      
      this.toastr.error(error.error.message, `.`, {
        timeOut: 4000,
        progressBar: true,
        closeButton: true,
        easeTime: 400,
        extendedTimeOut: 2000,
    })
   
    }
    else{

      this.toastr.error(error.error.message, `!`, {
        timeOut: 4000,
        progressBar: true,
        closeButton: true,
        easeTime: 400,
        extendedTimeOut: 2000,
    })
  
    }
  }  );
  
 
  
  } 
  catch(e:any){
    console.log(e)
  }
       
 }

//  closePopup2(){
//   this.displayStyle = 'none';
//   this.router.navigate(['/dashboard']);
// }

handleSwitchChain() {
  var provider;
  if (this.ethereum.providers !== undefined)
    provider = this.ethereum.providers.find((provider: any) => provider.isMetaMask);

  else
    provider = this.ethereum;

  const chainId = 80001;
  this.switchChain(provider, chainId);
}



  
}
