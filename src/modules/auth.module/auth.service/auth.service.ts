import { Injectable } from '@angular/core';

import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore } from 'angularfire2/firestore';

import * as firebase from 'firebase';
import 'rxjs/add/operator/first';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class AuthService {

    constructor( private auth : AngularFireAuth, private database : AngularFirestore ){
       
    }

    public getFirebaseAuth(){
        return this.auth.auth;
    }

    public loginWithEmail(email, password){
        return this.auth.auth.signInWithEmailAndPassword(email, password);
    }

    public registerWithEmail(email, password){
        return this.auth.auth.createUserWithEmailAndPassword(email, password);
    }

    public resetPassword(email){
        return this.auth.auth.sendPasswordResetEmail(email);
    }

    public getUserDataFromID(userID){
        return this.database.collection('User').doc(userID).valueChanges().first().toPromise();
    }

    public getCountryList(){
        return this.database.collection("Country").valueChanges();
    }

    public getServiceList(){
        return this.database.collection("Service").valueChanges();
    }

    public getLanguageList(){
        return this.database.collection("Language").valueChanges();
    }

    public uploadImage(userID, name, image){
        return firebase.storage().ref('/Image/'+userID+'/'+name).putString(image, 'data_url');
    }

    public saveUserData(userInfo){
        return this.database.collection('User').doc(userInfo.id).set(Object.assign({}, userInfo));
    }

    public updateUserCardInfo(userID, cardInfo){
        // Check Card Validation First, if true then save to Database
        return this.database.collection('User').doc(userID).update({cardInfo : cardInfo});
    }

}
