import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import {AlertController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { ReportPage } from '../report/report';
import { ToastController } from 'ionic-angular';

/**
 * Generated class for the GalleryPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-gallery',
  templateUrl: 'gallery.html',
})
export class GalleryPage {
public photos: any;

public pic:any;
public base64Image : string;
  constructor( private toastCtrl: ToastController, public navCtrl: NavController, public navParams: NavParams, private camera: Camera, private alertCtrl: AlertController) {
    this.pic = this.navParams.data[0]
  }
  
showProfilePage() {
    this.navCtrl.push(ReportPage);

  this.ionViewDidLoad() ;{
    console.log('ionViewDidLoad GalleryPage');
  }

}
ionViewDidLoad() {
    console.log('ionViewDidLoad GalleryPage');
  }
ngOnInit(){
  this.photos=[];

}

takePhoto(){
const options: CameraOptions = {
  quality: 50,
  destinationType: this.camera.DestinationType.DATA_URL,
  encodingType: this.camera.EncodingType.JPEG,
  mediaType: this.camera.MediaType.PICTURE
}

this
.camera
.getPicture(options)
.then((imageData) => {
 // imageData is either a base64 encoded string or a file URI
 // If it's base64:
 this.base64Image = 'data:image/jpeg;base64,' + imageData;
 this.photos.push(this.base64Image);
 this.photos.reverse();
}, (err) => {
  console.log(err);
 // Handle error
});
 
}
deletePhoto(index){

  let confirm = this.alertCtrl.create({
      title: 'Delete this photo?',
      message: 'All deleted photos cannot be restored',
      buttons: [
        {
          text: 'No',
          handler: () => {
            console.log('Disagree clicked');
          }
        },
        {
          text: 'Yes',
          handler: () => {
           this.photos.splice(index, 1);
          }
        }
      ]
    });
    confirm.present();
  }
  
presentToast() {
  let toast = this.toastCtrl.create({
    message: 'User was added successfully',
    duration: 9000,
    position: 'bottom'
  });

  toast.onDidDismiss(() => {
    console.log('Dismissed toast');
  });

  toast.present();
}
//this.photos.splice(index, 1);
}

