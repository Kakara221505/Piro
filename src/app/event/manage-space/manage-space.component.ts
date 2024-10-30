import { ManagementConsoleService } from '../../services/event-management-module/management-console.service';
import { Component, EventEmitter, OnInit, Output, HostListener, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { of } from 'rxjs';
import { Dimensions, ImageCroppedEvent, ImageTransform, LoadedImage } from 'ngx-image-cropper';

class ImageSnippet {
  constructor(public src: string, public file: File) {}
}
@Component({
  selector: 'app-manage-space',
  templateUrl: './manage-space.component.html',
  styleUrls: ['./manage-space.component.css']
})
export class ManageSpaceComponent implements OnInit {
  imgloading: boolean = false;
  imgUpload: boolean = false;
  imageUrl: any;
  bannerUrl: any;
  fileToUpload: any;
  file1: '';
  public spaceEventId: any;
  public eventData: any;
  public imgs: any;
  public banners: any;
  public ids: any;
  eventId: any;
  @Output() nextTabEvent = new EventEmitter<string>();
  buttonDisabled: boolean = false;
  uploadImgs = false;
  selectedFile: ImageSnippet;
  public selectSpace: any;
  showFileOption = 'block';
  eventSpaceId: any;
  displayBackground: boolean = true;
  dragAreaClass: string;

  @ViewChild('btnOpenModal') btnOpenModal: ElementRef<HTMLElement>;

  //Crop Image
  imageChangedEvent: any = '';
  croppedImage: any = '';
  canvasRotation = 0;
  rotation = 0;
  scale = 1;
  showCropper = false;
  containWithinAspectRatio = false;
  transform: ImageTransform = {};
  bannerId: any;
  bannerHeight: any;
  bannerWidth: any;
  aspectRatio: number;
  aspectRatioX: number;
  aspectRatioY: number;

  constructor(
    private router: Router,
    private eventService: ManagementConsoleService,
    private route: ActivatedRoute,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.eventId = this.route.snapshot.paramMap.get('id');
    this.dragAreaClass = 'dragarea';

    this.getSpaceId();
    setTimeout(() => {
      this.getBannerInfo();
    }, 1000);
    if (this.eventId != null) {
      this.getEventDetails();
    }
  }
  getEventDetails() {
    this.eventService.getEvents(this.eventId).subscribe((data: any) => {
      this.eventData = data;
      this.selectSpace = data.venueName;
      this.imgs = data.eventBannerList;
      // for (let banImg of this.eventData.eventBannerList) {
      //   this.imageUrl = banImg;
      // }
    });
  }
  chooseEvent() {
    this.router.navigate([`/update-choose-event/${this.eventId}`]);
  }

  deleteBannerImage(id: any) {
    this.eventService.delteBannerById(id).subscribe((data: any) => {
      this.toastr.success('Image Deleted Successfully');
      this.getBannerInfo();
    });
  }

  uploadFile(fileInput: any, id: any) {
    this.file1 = fileInput.target.files[0];
    this.ids = id;
    var reader = new FileReader();
    reader.readAsDataURL(<File>fileInput.target.files[0]);
    reader.onload = (e: any) => {
      this.imageUrl = e.target.result;
    };
  }
  @HostListener('dragover', ['$event']) onDragOver(event: any) {
    this.dragAreaClass = 'droparea';
    event.preventDefault();
  }
  @HostListener('dragenter', ['$event']) onDragEnter(event: any) {
    this.dragAreaClass = 'droparea';
    event.preventDefault();
  }
  @HostListener('dragend', ['$event']) onDragEnd(event: any) {
    this.dragAreaClass = 'dragarea';
    event.preventDefault();
  }
  @HostListener('dragleave', ['$event']) onDragLeave(event: any) {
    this.dragAreaClass = 'dragarea';
    event.preventDefault();
  }
  @HostListener('drop', ['$event']) onDrop(event: any, id: any) {
    this.dragAreaClass = 'dragarea';
    event.preventDefault();
    event.stopPropagation();
  }

  processFile(imageInput: any, id: any) {
    const file: File = imageInput.files[0];
    this.ids = id;
    const reader = new FileReader();
    reader.readAsDataURL(<File>imageInput.files[0]);
    reader.onload = (e: any) => {
      this.imageUrl = e.target.result;
    };
    const formData = new FormData();
    formData.append('bannerId', this.ids);
    formData.append('file', file);
    formData.append('eventId', this.eventId || '{}');
    reader.addEventListener('load', (event: any) => {
      this.selectedFile = new ImageSnippet(event.target.result, file);
      this.eventService.adBanner(formData).subscribe(
        (res) => {
          this.toastr.success('Image Upload Successfully');
          this.imageUrl = '';
          this.ids = '';
          this.getBannerInfo();
          this.displayBackground = false;
        },
        (err) => {
          this.toastr.error('Something gone wrong!');
        }
      );
    });
  }

  deleteimg() {
    this.file1 = '';
    this.imageUrl = '';
  }

  getSpaceId() {
    this.eventService.getSpaceList(localStorage.getItem('spaceId')).subscribe((data: any) => {
      this.spaceEventId = data.data.venueSectionDTOs[0].id;
    });
  }

  getBannerInfo() {
    this.eventService.getBannerId(this.eventId).subscribe((data: any) => {
      this.banners = data;
      this.bannerHeight =data[0].height;
      this.bannerWidth =data[0].width;
      this.calculateAspectRatio();
      this.eventSpaceId = data.eventBannerId;
    });
  }
  
  calculateAspectRatio(): string {
    if (this.bannerHeight && this.bannerWidth) {
      const gcd = this.calculateGCD(this.bannerWidth, this.bannerHeight);
      this.aspectRatioX = this.bannerWidth / gcd;
      this.aspectRatioY = this.bannerHeight / gcd;
      console.log( "hii",this.aspectRatioX, this.aspectRatioY)
      return `${this.aspectRatioX}/${this.aspectRatioY}`;
    }
    return '1/1'; // Default aspect ratio
  }
  openCropper(width: number, height: number) {
    // Calculate aspect ratio based on the width and height of the banner
    const gcd = this.calculateGCD(width, height);
    this.aspectRatioX = width / gcd;
    this.aspectRatioY = height / gcd;

    // Trigger the modal to open here using your preferred method
  }
  
  calculateGCD(a: number, b: number): number {
    if (b === 0) {
      return a;
    }
    return this.calculateGCD(b, a % b);
  }
  

  nextTabs(value: string) {
    this.nextTabEvent.emit(value);
  }

  saveBanner(addBannerForm: any) {
    this.imgloading = true;
    this.router.navigateByUrl(`/add-events/access-manage/${this.eventId}`);
    window.scrollTo(0, 0);
    this.nextTabs('access-manage');
    setTimeout(() => {
      this.imgloading = false;
    }, 500);
  }

  deleteImage(url: any): void {
    this.banners = this.banners.filter((a: any) => a !== url);
  }

  /**
   * Crop Image Functions
   */
  fileChangeEvent(event: any, bannerId: any): void {
    let el: HTMLElement = this.btnOpenModal.nativeElement;
    el.click();
    this.imageChangedEvent = event;
    console.log(this.imageChangedEvent)
    this.bannerId = bannerId;
  }

  setCropperAspectRatio(width: number, height: number) {
    this.bannerWidth = width;
    this.bannerHeight = height;

    // Calculate aspect ratio based on the image dimensions
    const gcd = this.calculateGCD(this.bannerWidth, this.bannerHeight);
    this.aspectRatioX = this.bannerWidth / gcd;
    this.aspectRatioY = this.bannerHeight / gcd;
  }
  

  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
    //console.log(event, base64ToFile(event.base64));
  }

  imageLoaded() {
    this.showCropper = true;
    console.log('Image loaded');
  }

  cropperReady(sourceImageDimensions: Dimensions) {
    console.log('Cropper ready', sourceImageDimensions);
  }

  loadImageFailed() {
    console.log('Load failed');
  }

  rotateLeft() {
    this.canvasRotation--;
    this.flipAfterRotate();
  }

  rotateRight() {
    this.canvasRotation++;
    this.flipAfterRotate();
  }

  private flipAfterRotate() {
    const flippedH = this.transform.flipH;
    const flippedV = this.transform.flipV;
    this.transform = {
      ...this.transform,
      flipH: flippedV,
      flipV: flippedH
    };
  }

  flipHorizontal() {
    this.transform = {
      ...this.transform,
      flipH: !this.transform.flipH
    };
  }

  flipVertical() {
    this.transform = {
      ...this.transform,
      flipV: !this.transform.flipV
    };
  }

  resetImage() {
    this.scale = 1;
    this.rotation = 0;
    this.canvasRotation = 0;
    this.transform = {};
  }

  zoomOut() {
    this.scale -= 0.1;
    this.transform = {
      ...this.transform,
      scale: this.scale
    };
  }

  zoomIn() {
    this.scale += 0.1;
    this.transform = {
      ...this.transform,
      scale: this.scale
    };
  }

  toggleContainWithinAspectRatio() {
    this.containWithinAspectRatio = !this.containWithinAspectRatio;
  }

  updateRotation() {
    this.transform = {
      ...this.transform,
      rotate: this.rotation
    };
  }

  convertAndUploadFile() {
    const base64 = this.croppedImage;
    console.log(base64);
    const imageName = 'name.png';
    const imageBlob = this.dataURItoBlob(base64);
    const imageFile = new File([imageBlob], imageName, { type: 'image/png' });
    this.processFileConverted(imageFile, this.bannerId);
  }

  dataURItoBlob(dataURI: any) {
    //const byteString = window.atob(dataURI);
    const byteString = atob(dataURI.replace(/^data:image\/(png|jpeg|jpg);base64,/, ''));
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const int8Array = new Uint8Array(arrayBuffer);
    for (let i = 0; i < byteString.length; i++) {
      int8Array[i] = byteString.charCodeAt(i);
    }
    const blob = new Blob([int8Array], { type: 'image/png' });
    return blob;
  }

  processFileConverted(imageInput: any, id: any) {
    const file: File = imageInput;
    this.ids = id;
    const reader = new FileReader();
    this.imgUpload = true;
    this.uploadImgs = true;
    /*reader.readAsDataURL(<File>imageInput.files[0]);
  reader.onload = (e: any) => {
    this.imageUrl = e.target.result;
  };*/
    const formData = new FormData();
    formData.append('bannerId', this.ids);
    formData.append('file', file);
    formData.append('eventId', this.eventId || '{}');
    //reader.addEventListener('load', (event: any) => {
    // this.selectedFile = new ImageSnippet(event.target.result, file);
    this.eventService.adBanner(formData).subscribe(
      (res) => {
        this.uploadImgs = false;
        this.toastr.success('Image Upload Successfully');
        this.imageUrl = '';
        this.ids = '';
        this.getBannerInfo();
        this.displayBackground = false;
      },
      (err) => {
        this.toastr.error('Something gone wrong!');
      }
    );
    //});
  }
}
