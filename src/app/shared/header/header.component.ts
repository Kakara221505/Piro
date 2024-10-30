import { Component, OnInit } from '@angular/core';
import { ManagementConsoleService } from '../../services/event-management-module/management-console.service';
import { ProfileService } from '../../services/profile-module/profile.service';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/authenticate/user.service';
import { ethers } from 'ethers';
import web3 from "web3";
import { JoinSesionService } from 'src/app/services/join-module/join-sesion.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  profileName: any;
  ethereum: any;
  data: any;
  user: any;
  publicKey: any;
  token: any;
  loginBased: Promise<string>;
  address: string | null;
  signature: string | null;
  shortenedAddress: string;
  provider:any
  chainId:any
  constructor(private eventService: ManagementConsoleService,   private toastr: ToastrService, private joinService: JoinSesionService, private authService: UserService, private profileService: ProfileService, private router: Router) 
  {
    this.ethereum = authService.window.ethereum;
  }
  account:boolean=false
  displayStyle = 'none';

  ngOnInit(): void {
   
    this.getDetails();
    this.signature = localStorage.getItem('signature');
    this.address = localStorage.getItem('address');
    this.shortenedAddress = this.address?.substring(0, 8) + '...';
   

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
     location.reload();
    console.log("account changed")
    this.account=true
    console.log(this.account)
    localStorage.removeItem('signature');
    localStorage.removeItem('address');
   
  }
  

  getDetails() {
    this.profileService.getAllDetails().subscribe((data: any) => {
      this.profileName = data.fullName;
    });
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
            // this.switchChain(provider,chainId)
           
           }
           console.log("vivek12",provider.networkVersion)
        //    if(provider.networkVersion == chainId){
        //   this.signMessage(provider)
        // }
        
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
          // this.switchChain(this.ethereum,chainId)
         }
         console.log("vivek12",this.data)
        //  if(this.ethereum.networkVersion == chainId){
        //   this.signMessage(this.ethereum)
        // }
   
      
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
        console.log("187")
            const ethProvider = new ethers.BrowserProvider(provider);
           
            const accounts = await ethProvider.send("eth_requestAccounts", []);
            console.log(accounts);
            console.log("192")
            const signer = ethProvider.getSigner();
            this.loginBased  = (await signer).getAddress()
            console.log("195")
            // Send 1 ether to an ens name.
            let msg = "Hello World";
            console.log("196")
            let signature = await (await signer).signMessage( msg );
            console.log("197")
          localStorage.setItem('signature',signature );
          console.log("200")
          let signature1=signature.substring(2,signature.length) 
          console.log(signature1)
          let address =ethers.verifyMessage(msg,signature)
          console.log(address)
          localStorage.setItem('address',address );
            let body={
              signedSignature:signature1
            }
            console.log("208")
            this.joinService.meetamask(body).subscribe((res: any) => {
              this.data=res.data
              this.user=res.data.user 
              location.reload();
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
        
          
          } 
          catch(e:any){
            location.reload();
            console.log(e)
          }
         
   }

   closePopup2(){
    this.displayStyle = 'none';
    this.router.navigate(['/dashboard']);
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

  signout() {
    this.router.navigate(['/login']);
    localStorage.removeItem('X-Custom-Token');
    localStorage.removeItem('event-id');
    localStorage.removeItem('spaceId');
    localStorage.removeItem('isLoggedin');
    localStorage.removeItem('signature');
    localStorage.removeItem('address');
    window.location.reload();
  }
}
