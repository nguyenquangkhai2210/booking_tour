import firebase from "./Firebase";

class FirebaseUitls {
  getLinkImages(name) {
    var value = firebase
      .storage()
      .ref()
      .child("productsImg/" + name)
      .getDownloadURL();
    return value;
  }

  async uploadImages(img) {
    let url = '';
    await firebase
      .storage()
      .ref()
      .child("productsImg/" + img.name)
      .put(img)
      .then(snapshot => {
        console.log("Uploaded", snapshot);
      });

      url = this.getLinkImages(img.name);
      
      return url;
  }
}

export default new FirebaseUitls();