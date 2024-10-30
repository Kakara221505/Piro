import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { JoinSesionService } from '../../services/join-module/join-sesion.service';
import { DomSanitizer } from '@angular/platform-browser';
import { ProfileService } from '../../services/profile-module/profile.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { NgxSpinnerService } from 'ngx-spinner';
import { UserService } from 'src/app/services/authenticate/user.service';
import { ethers } from 'ethers';
import web3 from "web3";
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-join-now',
  templateUrl: './join-now.component.html',
  styleUrls: ['./join-now.component.css']
})
export class JoinNowComponent implements OnInit {
  date: any;
  now: any;
  targetDate: any = new Date(2022, 12, 1);
  targetTime: any = this.targetDate.getTime();
  difference: number;
  months: Array<string> = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ];
  currentTime: any = `${this.months[this.targetDate.getMonth()]} ${this.targetDate.getDate()}, ${this.targetDate.getFullYear()}`;
  showContent = false;
  @ViewChild('days') days: ElementRef;
  @ViewChild('hours') hours: ElementRef;
  @ViewChild('minutes') minutes: ElementRef;
  @ViewChild('seconds') seconds: ElementRef;

  imgloading: boolean = false;
  imgloading2: boolean = false;
  value: any;
  formStyle = 'block';
  otpStyle = 'none';

  access = {
    email: ''
  };

  emailOtp = {
    email: ''
  };

  pass = {
    password: ''
  };
  identifier2: any;
  identifier: any;
  accessType: any;
  errorMessage: any = null;
  errorMessageVerify: any = null;
  body: any;
  iframe: any;
  iframeLink: any;

  hostIframe: any;
  showIframe: boolean = false;
  passwordRequired: any;

  passwordStyle = 'block';
  nftBased='none'
  NonnftBased='none'
  nftNotBased='none'
  emailandOTPStyle = 'block';
  emailOtpReq: any;

  profileName: any;
  profileEmail: any;
  avatarResponse: any;
  userEventType: any;
  lastUserJoin: any;
  userName: any;
  userGender: any;
  userStages: any;
  userCanShareScreen: any;
  notstarted: boolean = false;
  isover: boolean = false;
  eventStatus: any;
  timer: any;
  currentDate: any;
  showDate: any;
  showHours: any;
  showMintues: any;
  currentHours: any;
  currentSeconds: any;
  currentMinutes: any;
  token: any;
  showSeconds: any;
  dates: any;
  tokens: any;
  emailandOTPNotLogginStyle='none';
  notLoginOtpStyle='none'
  notLoginformStyle='none'
  displayStyle='none'
  displayStyleNonLogin='none'

  customUserEventType = 'ATTENDEE';
  linkUrl:any;
  changeMetaMaskAccount:boolean=false

  spaceUrl = `https://dev.pirospace.com/space/index.html`;
  // spaceUrl = `https://stage-v1.pirospace.com/space/index.html`;
  fieldTextType: boolean;
  userRole: any;
  data: any;
  user: any;
  publicKey: any;
  ethereum: any;
  loginBased: Promise<string>;
  signature: string;
  signature1: string;


  constructor(
    private joinService: JoinSesionService,
    private sanitizer: DomSanitizer,
    private profileService: ProfileService,
    private router: Router,
    public datepipe: DatePipe,
    private spinner: NgxSpinnerService,
    private activatedRoute: ActivatedRoute,
    private authService: UserService,
    private toastr: ToastrService,
  ) {
   
      this.ethereum = authService.window.ethereum;
    
  }

  ngOnInit(): void {
    this.linkUrl =  window.location.protocol  + "//" + window.location.hostname
    this.activatedRoute.queryParams.subscribe((params) => {
      let avatar = params['avatar'];
      if(avatar != undefined && avatar != '')
        this.customUserEventType = avatar;
    },
    
    ); 

    this.token = localStorage.getItem('X-Custom-Token');
    this.spinner.show();
    setTimeout(() => {
      /** spinner ends after 5 seconds */
      this.showContent=true;
      this.spinner.hide();
    }, 1700);

    //this.identifier = window.location.href.split('/').pop();

    this.identifier = this.activatedRoute.snapshot.paramMap.get('id')

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



    if (this.token !== null) {
      this.byIdentifierUserLogin();
      this.getDetails();
    } else if (this.token === null) {
      this.byIdentifierUserNotLogin();
      this.getDetails();
    }
  }

  handleAccountsChanged(){
    console.log("account changed")
    this.changeMetaMaskAccount=true
    localStorage.removeItem('signature');
    localStorage.removeItem('address');
    location.reload();
  }

  byIdentifierUserLogin() {
    this.spinner.show();
    this.joinService.getIdentifierWhenLogin(this.identifier).subscribe((data: any) => {
     
      if (data.eventJoinStatus === 'NOTSTARTED') {
        this.eventStatus = data.eventJoinStatus;
      }
      this.accessType = data.acessType;
      this.identifier2 = data.eventIdentifier;
      this.passwordRequired = data.isPasswordRequired
      this.emailOtpReq = data.isEmailOtpRequired;
      if (this.accessType === 'PASSWORD_PROTECTED' && this.passwordRequired === false) {
        this.passwordStyle = 'none';
        this.joinPasswordWithoutPasswor();
      } 
      
      else if (this.accessType === 'OPEN') {
        this.joinAccess();
      } else if (this.accessType === 'EMAIL_AND_OTP' && this.emailOtpReq === false) {
        this.emailandOTPStyle = 'none';
        this.joinWithourEmailOtpAsk();
      }
      else if (this.accessType === 'NFT_BASED') {
       
        console.log(this.nftBased )
        this.nftBaseLogin();
      }

      if (this.accessType === 'EMAIL_AND_OTP' && this.emailOtpReq === true) {
        this.joinWithourEmailOtpAskCheck();
      }
      

    },
    (error: any) => {
      console.log("hii2")
      if (error.status === 401 || error.status === 500) {
        this.router.navigate(['/login']);
      }
      else{
      this.toastr.error(error.error.message, `Please Enter correct eventId`, {
        timeOut: 3000,
        progressBar: true,
        closeButton: true,
        easeTime: 300,
        extendedTimeOut: 1000,
    })
  }
 
   // Redirect to the login page or any other desired page
     this.router.navigate(['/login']);
      
    });
    this.spinner.hide();
    
  }
  byIdentifierUserNotLogin() {
    this.spinner.show();
    this.joinService.getIdentifierWhenNotLogin(this.identifier).subscribe((data: any) => {
      if (data.eventJoinStatus === 'NOTSTARTED') {
        this.eventStatus = data.eventJoinStatus;
      }
      this.accessType = data.acessType;
      this.identifier2 = data.eventIdentifier;
      this.passwordRequired = data.isPasswordRequired;
      
      this.emailOtpReq = data.isEmailOtpRequired;
      if (this.accessType === 'PASSWORD_PROTECTED' && this.passwordRequired === false) {
        this.passwordStyle = 'none';
        this.joinPasswordWithoutPasswor();
      } else if (this.accessType === 'OPEN') {
        this.joinAccess();
      } else if (this.accessType === 'EMAIL_AND_OTP' && this.emailOtpReq === false) {
        this.emailandOTPStyle = 'none';
        this.joinWithourEmailOtpAsk();
      }
      else if (this.accessType === 'NFT_BASED') {
        this.nftBaseNotLogin();
      }    
      if (this.accessType === 'EMAIL_AND_OTP' && this.emailOtpReq === true) {
        this.joinWithourEmailOtpAskCheck();
      }
      if (this.accessType === 'EMAIL_AND_OTP' && this.emailOtpReq === true && this.token === null ) {
        this.emailandOTPStyle='none';
        this.emailandOTPNotLogginStyle='block'
        this.notLoginformStyle='block'
        this.joinWithourEmailOtpAskCheck();
      }
    },
    (error: any) => {
      if (error.status === 401) {
        this.router.navigate(['/login']);
      }
      else if (error.status === 500) {
       
        this.router.navigate(['/login']);
      }
      else{
      this.toastr.error(error.error.message, `Please Enter correct eventId`, {
        timeOut: 3000,
        progressBar: true,
        closeButton: true,
        easeTime: 300,
        extendedTimeOut: 1000,
    })
  }
    
     
        // Redirect to the login page or any other desired page
        this.router.navigate(['/login']);
      
    }
    );
    this.spinner.hide();
  }

  async meetaMask() {
 console.log(this.ethereum.providers)
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
        if (provider.networkVersion !== chainId) {
          this.displayStyle = 'block';
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
        this.displayStyle = 'block';
        this.switchChain(this.ethereum,chainId)
      }
      console.log("vivek12",this.data)
try{
 
      const provider = new ethers.BrowserProvider(this.ethereum);
      const accounts = await provider.send("eth_requestAccounts", []);
      console.log(accounts);
      const signer = provider.getSigner();
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
      this.joinService.meetamask1(body).subscribe((res: any) => {
        this.data=res.data
        this.user=res.data.user
      

    } );
    this.nftBaseLogin()
    
   
    
    } 
    catch(e:any){
      console.log(e)
    }
   
  }
    else {
      alert("install metamask extension!!");
    }
  }
}


async meetaMask1() {
  console.log(this.ethereum.providers)
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
         if (provider.networkVersion !== chainId) {
          this.displayStyleNonLogin = 'block';
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
        this.displayStyleNonLogin = 'block';
       }
       console.log("vivek12",this.data)

    
   }
     else {
       alert("install metamask extension!!");
     }
   }
 }

 async switchChain(provider:any,chainId:any){
  this.displayStyle = 'none';
  console.log("154")
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
  console.log("179")
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
    this.joinService.meetamask1(body).subscribe((res: any) => {
      this.data=res.data
      this.user=res.data.user 

  },(error: any) => {
    if (error.status === 400) {
      
      this.toastr.error(error.error.message, `.`, {
        timeOut: 4000,
        progressBar: true,
        closeButton: true,
        easeTime: 400,
        extendedTimeOut: 2000,
    })
    location.reload();
    }
    else{

      this.toastr.error(error.error.message, `!`, {
        timeOut: 4000,
        progressBar: true,
        closeButton: true,
        easeTime: 400,
        extendedTimeOut: 2000,
    })
    location.reload();
    }
  } );
  this.nftBaseLogin();
  
  } 
  catch(e:any){
    console.log(e)
  }
       
 }

 async switchChainNonLogin(provider:any,chainId:any){
  this.displayStyleNonLogin = 'none';
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
 
  this.signMessageNonLogin(provider)
 }

 async signMessageNonLogin(provider:any){

  try{
    
    const ethProvider = new ethers.BrowserProvider(provider);
   
    const accounts = await ethProvider.send("eth_requestAccounts", []);
    console.log(accounts);
    const signer = ethProvider.getSigner();
    this.loginBased  = (await signer).getAddress()

    // Send 1 ether to an ens name.
    let msg = "Hello World";
    this.signature = await (await signer).signMessage( msg );
 
  
  this.signature1=this.signature.substring(2,this.signature.length) 
  console.log(this.signature1)
  let address =ethers.verifyMessage(msg,this.signature)
  console.log(address)
  this.nftBaseNotLogin();
  
  } 
  catch(e:any){
    console.log(e)
  }
       
 }

 handleSwitchChain() {
  var provider;
  if (this.ethereum.providers !== undefined)
    provider = this.ethereum.providers.find((provider: any) => provider.isMetaMask);

  else
    provider = this.ethereum;

  const chainId = 80001;
  this.switchChain(provider, chainId);
}
handleSwitchChainNonLogin() {
//   const provider = this.ethereum.providers.find((provider:any) => provider.isMetaMask);
//  const  chainId = 80001; 
var provider;
if (this.ethereum.providers !== undefined)
  provider = this.ethereum.providers.find((provider: any) => provider.isMetaMask);

else
  provider = this.ethereum;

const chainId = 80001;
  this.switchChainNonLogin(provider, chainId);
}

  onOtpChange(val: any) {
    this.value = val;
  }

  toggleFieldTextType() {
    this.fieldTextType = !this.fieldTextType;
  }

  dateAndTime(): any {
    var countDownDate = new Date(this.timer).getTime();
    var now = new Date();
    var d2 = new Date(
      now.getUTCFullYear(),
      now.getUTCMonth(),
      now.getUTCDate(),
      now.getUTCHours(),
      now.getUTCMinutes(),
      now.getUTCSeconds()
    );
    var distance = countDownDate - d2.getTime();
    this.showDate = Math.floor(distance / (1000 * 60 * 60 * 24));
    this.showHours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    this.showMintues = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    this.showSeconds = Math.floor((distance % (1000 * 60)) / 1000);
  }

  eventDataResponse(data: any) {
    if (data.eventJoinStatus === 'NOTSTARTED' && data.url === null) {
      this.timer = data.eventStartDateUtc;
      setInterval(() => {
        this.dateAndTime();
      }, 1000);
    } else if(data.eventJoinStatus === 'CLOSED' && data.url === null){
      this.eventStatus = data.eventJoinStatus
    }else if(data.eventJoinStatus === 'EVENTMAXLIMITREACHED' && data.url === null){
      this.eventStatus = data.eventJoinStatus
    }
    else {
      this.userEventType = data.userEventRoleType;
      this.lastUserJoin = data.lastJoin;
      this.userRole =data.userEventRoleType
      this.userName = data.fullName;
      this.userGender = data.gender;
      this.userStages = data.stagesAllocated;

      this.userCanShareScreen = data.canShareScreen;
      //this.iframeLink = this.sanitizer.bypassSecurityTrustResourceUrl(data.url);
      this.iframeLink = this.sanitizer.bypassSecurityTrustResourceUrl(this.spaceUrl);
      this.showIframe = true;
    }
  }

  //join by OPEN access api
  joinAccess() {
    let body = {
      eventIdentifier: this.identifier
    };
    if (this.token !== null) {
      this.joinService.joinByAccess(body).subscribe(
        (data: any) => {
          if (data.eventJoinStatus !== null) {
            this.eventStatus = data.eventJoinStatus;
          }
          this.eventDataResponse(data);
          this.tokens = data.token;
        },
        (error) => {
          // this.timer = error.error.eventStartDateUtc;
          // setInterval(() => {
          //   this.dateAndTime();
          // }, 1000);
        }
      );
    } else if (this.token === null) {
      this.joinService.notLoginOpenAccess(body).subscribe(
        (data: any) => {
          if (data.eventJoinStatus !== null) {
            this.eventStatus = data.eventJoinStatus;
          }
          this.eventDataResponse(data);
          this.tokens = data.token;
        },
        (error) => {}
      );
    }
  }

  //join by password protected access api
  joinPassword(password: any) {
    this.imgloading = true;
    let body = {
      eventIdentifier: this.identifier,
      password: this.pass.password
    };
    if (this.token !== null) {
      this.joinService.joinByPassword(body).subscribe(
        (data: any) => {
          this.eventDataResponse(data);
          this.tokens = data.token;
        },
        (error) => {
          this.errorMessage = error.error.message;
          this.imgloading = false;
        }
      );
    } else if (this.token === null) {
      this.joinService.notLoginSavePassword(body).subscribe(
        (data: any) => {
          this.eventDataResponse(data);
          this.tokens = data.token;
        },
        (error) => {
          this.errorMessage = error.error.message;
          this.imgloading = false;
        }
      );
    }
  }

  joinPasswordWithoutPasswor() {
    let body = {
      eventIdentifier: this.identifier
    };
    if (this.token !== null) {
      this.joinService.joinByPassword(body).subscribe(
        (data: any) => {
          this.eventDataResponse(data);
          this.tokens = data.token;
        },
        (error) => {
          this.errorMessage = error.error.message;

          // this.eventStatus = error.error.eventJoinStatus;
        }
      );
    } else if (this.token === null) {
      this.joinService.notLoginSavePassword(body).subscribe(
        (data: any) => {
          this.eventDataResponse(data);
          this.tokens = data.token;
        },
        (error) => {
          this.errorMessage = error.error.message;

          // this.eventStatus = error.error.eventJoinStatus;
        }
      );
    }
  }

  //join by OTP access for whitelist domains
  joinViaOTP() {
    this.imgloading2 = true;
    let body = {
      otp: this.value,
      email: this.profileEmail,
      eventIdentifier: this.identifier,
      fullName: this.profileName
    };
    this.joinService.joinByEmailVerify(body).subscribe(
      (data: any) => {
        this.eventStatus = data.eventJoinStatus;
        console.log(this.eventStatus);
        this.eventDataResponse(data);
        this.tokens = data.token;
        this.imgloading2 = false;
      },
      (error) => {
        this.imgloading2 = false;
        this.errorMessageVerify = error.error.message;
      }
    );
  }

  //join by without OTP access for whitelist domains
  joinWithourEmailOtpAsk() {
    this.joinService.joinWithoutEmailOtp(this.identifier, 'email').subscribe(
      (data: any) => {
        this.eventDataResponse(data);
        this.tokens = data.token;
      },
      (error) => {
        this.imgloading2 = false;
        this.errorMessageVerify = error.error.message;
      }
    );
  }

  nftBaseLogin() {
    this.spinner.show();
    this.joinService.nftLogin(this.identifier, this.body).subscribe(
      (data: any) => {
        console.log(data.ownedNft)
        if(data.status == 201 ){
          this.nftBased='block'
          console.log(this.nftBased )
        }
        else{
          this.joinAccess()
        }
      },
      (error) => {
        this.imgloading2 = false;
        this.errorMessageVerify = error.error.message;
        if (error.status == 400) {
          // Redirect to another page or perform any other action
          this.NonnftBased='block'
        }
        
      }
    );
    this.spinner.hide();
  }


  nftBaseNotLogin() {
    this.spinner.show();
    this.nftNotBased='block'
    this.joinService.nftNotLogin(this.identifier,this.signature1,this.body).subscribe(
      
      (data: any) => {
        console.log(data.ownedNft)
        if(data.ownedNft){
          this.joinAccess()

          
        }
        // else{
        //   this.joinAccess()
        // }
      },
      (error) => {
        this.imgloading2 = false;
        this.errorMessageVerify = error.error.message;
        if (error.status == 400) {
          // Redirect to another page or perform any other action
          this.NonnftBased='block'
          this.nftNotBased='none'
        }
        
      }
    );
    this.spinner.hide();
  }



  joinByEmailOtpNotLogin(emailForm: any) {
    this.imgloading = true;
    let body = {
      email: this.emailOtp.email,
      eventIdentifier: this.identifier,
      fullName:null
    };
    localStorage.setItem('join-session-email', JSON.stringify(body.email));
    this.profileEmail = (localStorage.getItem('join-session-email') || '').replace(/['"]+/g, '');
    this.joinService.notLoginAskEmail(body).subscribe(
      (data: any) => {
        this.imgloading = false;
        this.notLoginformStyle = 'none';
        this.notLoginOtpStyle = 'block';
      },
      (error) => {
        this.errorMessage = error.error.message;
        this.imgloading = false;
      }
    );
  }
  joinViaOTPNotLogin() {
    this.imgloading2 = true;
    let body = {
      otp: this.value,
      email:  JSON.parse(localStorage.getItem('join-session-email') || ''),
      eventIdentifier: this.identifier,
      fullName: null
    };
    this.joinService.joinByEmailVerifyNotLogin(body).subscribe(
      (data: any) => {
        this.eventStatus = data.eventJoinStatus;
        console.log(this.eventStatus);
        this.eventDataResponse(data);
        this.tokens = data.token;
        this.imgloading2 = false;
        localStorage.removeItem('join-session-email');

      },
      (error) => {
        this.imgloading2 = false;
        this.errorMessageVerify = error.error.message;
      }
    );
  }

  joinWithourEmailOtpAskCheck() {
    this.joinService.joinWithoutEmailOtp(this.identifier, 'email').subscribe(
      (data: any) => {
        this.eventStatus = data.eventJoinStatus;

        this.userEventType = data.userEventRoleType;
        this.lastUserJoin = data.lastJoin;
        this.userName = data.fullName;
        this.userGender = data.gender;
        this.userRole =data.userEventRoleType
        this.userStages = data.stagesAllocated;
        this.userCanShareScreen = data.canShareScreen;
        this.eventStatus = data.eventJoinStatus;
      },
      (error) => {
        this.imgloading2 = false;
        this.errorMessageVerify = error.error.message;
        this.eventStatus = error.error.eventJoinStatus;
      }
    );
  }

  joinWithRegistrationBased() {
    let body = {
      eventIdentifier: this.identifier,
      eventTicketId: 0
    };
    this.joinService.joinByRegistrationBased(body).subscribe(
      (data: any) => {
        this.eventStatus = data.eventJoinStatus;

        //this.iframeLink = this.sanitizer.bypassSecurityTrustResourceUrl(data.url);
        this.iframeLink = this.sanitizer.bypassSecurityTrustResourceUrl(this.spaceUrl);
        this.showIframe = true;
      },
      (error) => {
        this.imgloading2 = false;
        this.errorMessageVerify = error.error.message;
        this.eventStatus = error.error.eventJoinStatus;
        this.timer = error.error.eventStartDate;
      }
    );
  }

  sendEnv() {
    let body = {
      eventIdentifier: this.identifier,
      token: this.tokens,
      userEventRoleType: this.userRole,
      lastJoin: this.lastUserJoin,
      fullName: this.userName,
      gender: this.userGender,
      stagesAllocated: this.userStages,
      canShareScreen: this.userCanShareScreen
    };
    this.iframe = document.querySelector('iframe');
    setTimeout(() => {
      this.iframe.contentWindow.postMessage(JSON.stringify(body), '*');
    }, 2000);
  }

  getDetails() {
    this.profileService.getAllDetails().subscribe((data: any) => {
      this.profileName = data.fullName;
      this.profileEmail = data.email;
     
    });
  }
  frameLoad() {
    setTimeout(() => {
      this.sendEnv();
    }, 1000);
  }

  goDashboard() {
    this.router.navigate(['/dashboard']);
  }
  explore(){
    this.router.navigate(['/explore']);
  }
}

// this.currentDate = this.datepipe.transform(new Date(), 'dd');
// this.currentHours = this.datepipe.transform(new Date(), 'hh');
// this.currentMinutes = this.datepipe.transform(new Date(), 'mm');
// this.currentSeconds = this.datepipe.transform(new Date(), 'ss');
