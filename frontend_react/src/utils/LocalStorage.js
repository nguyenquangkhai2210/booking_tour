import JWT_Decode from "jwt-decode";

export const LOCAL_STORAGE_KEY = {
  JWT: "tour_jwt",
  CARD: "tour_card"
};

class LocalStorageUtils {
  getItem(key, defaultValue) {
    if (typeof localStorage !== "undefined") {
      return localStorage.getItem(key) || defaultValue;
    }

    return "undefined";
  }

  setItem(key, value) {
    if (typeof localStorage !== "undefined") {
      localStorage.setItem(key, value);
    }
  }

  removeItem(key) {
    if (typeof localStorage !== "undefined") {
      localStorage.removeItem(key);
    }
  }

  clear() {
    if (typeof localStorage !== "undefined") {
      localStorage.clear();
    }
  }

  isRole() {
    const jwt = this.getItem(LOCAL_STORAGE_KEY.JWT);

    if (jwt !== "undefined" && jwt !== undefined) {
      let decode = JWT_Decode(jwt);
      
      if (decode.isAdmin) {
        return decode.isAdmin;
      }
    }

    return "guest";
  }

  getJWT() {
    return this.getItem(LOCAL_STORAGE_KEY.JWT, "");
  }

  getName() {
    const jwt = this.getItem(LOCAL_STORAGE_KEY.JWT, "");

    if (jwt !== "undefined" && jwt !== undefined) {
      let decode = JWT_Decode(jwt);
      return decode.sub;
    }
    return null;
  }

  getCard() {
    let card = this.getItem(LOCAL_STORAGE_KEY.CARD, "");
    let count = 0;

    if (card) {
      let array = JSON.parse(card);

      array.forEach(data => {
        count += data.quantity;
      });
    } else {
      let card = [];
      this.setItem(LOCAL_STORAGE_KEY.CARD, JSON.stringify(card));
    }
    return count;
  }

  addCard(id, quantity, image, name, price) {
    let card = this.getItem(LOCAL_STORAGE_KEY.CARD, "");
    let check = false;

    if (card) {
      let array = JSON.parse(card);
      array.forEach(data => {
        if (data.id === id) {
          data.quantity += quantity;
          check = true;
        }
      });
      if (!check) {
        let tour = { "id": id, "quantity": quantity, "image": image, "name": name, "price": price};
        array = [...array, tour];
      }

      this.setItem(LOCAL_STORAGE_KEY.CARD, JSON.stringify(array));
    } else {
      let card = [];
      let tour = { "id": id, "quantity": quantity, "image": image, "name": name, "price": price };
     
      card = [...card, tour];

      this.setItem(LOCAL_STORAGE_KEY.CARD, JSON.stringify(card));
    }
  }
}

export default new LocalStorageUtils();
