class View {
  constructor() {
    this.Inputs = [...this.GetAllElement(".form-input")];
    this.TextArea = this.GetElement("textarea");
    this.Checkbox = this.GetElement(".checkbox");
    this.BtnContainers = [...this.GetAllElement(".btn-container-item")];
    this.AddPhoneNumberBtn = this.GetElement(".add-pn");
    this.PhoneNumberInputCount = 1;
    this.ClearBtn = this.GetElement(".clear-btn");
    this.ConfirmBtn = this.GetElement(".add-btn");
    this.latitude = 40.409264;
    this.longitude = 49.867092;
    this.AlertPopup = this.GetElement(".alert-popup");


    this.geocodeUrl = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${this.latitude}&lon=${this.longitude}`;

    this.map = L.map("map").setView([this.latitude, this.longitude], 7);
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(this.map);
    this.marker = L.marker([this.latitude, this.longitude]).addTo(this.map);
  }
  _bindFunctions = (_modelAddUser) => {
    this.AddUserCallback = _modelAddUser;
  };
  ActivateAlertBorder = (input) => {
    input.classList.add("err");
  };
  ClearAlertBorders = () =>
    [...this.GetAllElement(".err")].forEach((inp) =>
      inp.classList.remove("err")
    );
  Alert(message, className = "danger") {
    this.AlertPopup.classList.add(className);
    this.AlertPopup.textContent = message;
    setTimeout(() => {
      this.AlertPopup.classList.remove(className);
    }, 1800);
  }
  AddUser = () => {
    this.ClearAlertBorders();
    let isErr = false;
    const obj = {};
    this.Inputs.filter(
      (input) => ![...input.classList].includes("invalid")
    ).forEach((input) => {
      if (input.value === "") {
        if (input.name !== "phoneNumber2" && input.name !== "phoneNumber3") {
          this.ActivateAlertBorder(input);
          return (isErr = true);
        }
      }
      obj[input.name] = input.value;
    });

    if (!isErr) {
      obj.cordinates = {
        latitude: this.latitude,
        longitude: this.longitude,
      };
      obj.geouri = this.geocodeUrl;
      this.AddUserCallback(obj);
    }
  };

  ActivateBorder = (e) => {
    this.GetElement(".typing")?.classList.remove("typing");
    e.target.classList.add("typing");
  };
  ChangeBg = (btn) => {
    this.GetElement(".active")?.classList?.remove("active");
    btn.classList.add("active");
  };
  ClearInputs = () => {
    this.Inputs.forEach((input) => (input.value = ""));
  };
  AddPhoneNumber = () => {
    this.PhoneNumberInputCount++;
    if (this.PhoneNumberInputCount < 4) {
      return (this.GetElement(
        ".pn" + this.PhoneNumberInputCount
      ).style.display = "block");
    }
  };
  RedirectUserToMap = () => {
    fetch(this.geocodeUrl)
      .then((response) => response.json())
      .then((data) => {
        const locationName = data.display_name;

        const geoUri = `geo:${this.latitude},${
          this.longitude
        }?q=${encodeURIComponent(locationName)}`;
        window.location.href = geoUri;
      })
      .catch((error) => {
        console.error("Hata:", error);
      });
  };
  GetCordinates = (event) => {
    this.map.removeLayer(this.marker);

    const latlng = event.latlng;
    this.latitude = latlng.lat;
    this.longitude = latlng.lng;
    this.marker = L.marker([this.latitude, this.longitude]).addTo(this.map);

    this.geocodeUrl = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${this.latitude}&lon=${this.longitude}`;
    // this.RedirectUserToMap();
  };
  Listeners = () => {
    this.map.addEventListener("click", (e) => {
      this.GetCordinates(e);
    });

    this.ConfirmBtn.addEventListener("click", this.AddUser);
    this.ClearBtn.addEventListener("click", this.ClearInputs);
    this.AddPhoneNumberBtn.addEventListener("click", (e) => {
      this.AddPhoneNumber();
    });
    this.BtnContainers.forEach((btn) => {
      btn.addEventListener("click", () => {
        this.ChangeBg(btn);
      });
    });
    this.Checkbox.addEventListener("change", (e) => {
      if (e.target.checked) {
        this.GetElement("body").style.overflow = "hidden";
      } else {
        this.GetElement("body").style.overflow = "auto";
      }
    });
    this.Inputs.forEach((input, index) => {
      input.addEventListener("focus", (e) => {
        this.ActivateBorder(e);
      });
      input.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
          if ([...this.Inputs[index + 1].classList].includes("pnt")) {
            this.Inputs[index + 3]?.focus();
          }
          this.Inputs[index + 1]?.focus();
        }
      });
    });
  };

  GetElement = (query) => {
    return document.querySelector(query);
  };
  GetAllElement = (query) => {
    return document.querySelectorAll(query);
  };
  CreateElement = (tag, classname, id) => {
    const element = document.createElement(tag);
    classname ? element.classList.add(classname) : false;
    id ? (element.id = id) : false;
    return element;
  };
}
