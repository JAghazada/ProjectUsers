class UserView {
  constructor() {
    this.ContainerItems = [...this.GetAllElement(".container-item")];
    this.ShowInMapBtns = [...this.GetAllElement(".show-in-map")];
    this.SearchBtn = this.GetElement(".search-btn");
    this.SearchInputs = [...this.GetAllElement(".search-input")];
    this.TableContainer = this.GetElement("#table-container")
  }
  _bindFuncs =(_modelSearch) =>{
    this.SearchCallback = _modelSearch;
  }
  OpenDetailedInfo = (e) =>{
    const active = this.GetElement(".more-details.active");
    e.currentTarget.querySelector(".more-details").classList.toggle("active");
    if (active) active.classList.remove("active")

  }
  ShowInMap = (info)=>{
    let {uri,cordinates} =JSON.parse(info)
    const {latitude,longitude} = cordinates 
    fetch(uri)
      .then((response) => response.json())
      .then((data) => {
        const geoUri = `geo:${latitude},${
          longitude
        }`;
        window.location.href = geoUri;
      })
      .catch((error) => {
        console.error("Hata:", error);
      });
  }

  CreateSearchObject = () =>{
    let obj = {}
    this.SearchInputs.forEach(input=>{
        obj[input.name] =input.value.trim();
    })
    return obj
  }
  ListUsers=(users)=>{
        this.TableContainer.innerHTML = ``;
    users.forEach(user=>{
        const table_item = this.CreateElement("div","container-item");
        table_item.onclick=(e=>{
            console.log(e.currentTarget);
                this.OpenDetailedInfo(e)
        })
        const short_details = this.CreateElement("div","short-details");
        const short_infos = this.CreateElement("div","short-infos");
        short_infos.innerHTML =   `<img src="/icons/profile-icon.svg" alt="">
        <div class="personal-short-info">${user.name}  ${user.surname} ${user.fatherName}</div>
        `
        const button = this.CreateElement("button","show-in-map");
        button.classList.add("btn");
        button.innerHTML =   `<a href="#">Xəritədə Göstər</a>`
        button.onclick  = (()=>{this.ShowInMap(JSON.stringify({cordinates:user.cordinates,uri:user.geouri}))})
        short_details.append(short_infos,button);
const more_details = this.CreateElement("div","more-details");
more_details.innerHTML=` 
<section>
    <div class="details-sections">
        <div class="detail-header">Qohumluq</div>
        <div class="detail-value">${user.relation }</div>
    </div>
    <div class="details-sections">
        <div class="detail-header">Təvəllüd</div>
        <div class="detail-value">${user.birthDate}</div>
    </div>
    <div class="details-sections">
        <div class="detail-header">İşğalRayon</div>
        <div class="detail-value">${user.occupationDistrict}</div>
    </div>
</section>
<section>
    <div class="details-sections">
        <div class="detail-header">Kənd</div>
        <div class="detail-value">${user.village}</div>
    </div>
    <div class="details-sections">
        <div class="detail-header">FIN</div>
        <div class="detail-value">${user.fin}</div>
    </div>

    <div class="details-sections">
        <div class="detail-header">Telefon nömrəsi</div>
        <div class="detail-value">${user.phoneNumber}</div>
        <div class="detail-value">${user.phoneNumber2}</div>
        <div class="detail-value">${user.phoneNumber3}</div>


    </div>
</section>
<section>
    <div class="details-sections">
        <div class="detail-header">Rayon</div>
        <div class="detail-value">${user.district}</div>
    </div>
    <div class="details-sections">
        <div class="detail-header">Obyekt tipi</div>
        <div class="detail-value">${user.objectType}</div>
    </div>
    <div class="details-sections">
        <div class="detail-header">Ünvan</div>
        <div class="detail-value">${user.address}</div>
    </div>
</section>
<section>
    <div class="details-sections">
        <div class="detail-header">Təhsil</div>
        <div class="detail-value">${user.education}</div>
    </div>
    <div class="details-sections">
        <div class="detail-header">Xüsusi Status</div>
        <div class="detail-value">${user.specialStatus}</div>
    </div>
</section>
<section>
    <div class="details-sections">
        <div class="detail-header">Peşə adı</div>
        <div class="detail-value">${user.occupationName}</div>
    </div>
    <div class="details-sections">
        <div class="detail-header">İş strukturu</div>
        <div class="detail-value">${user.jobStructure}</div>
    </div>
    <div class="details-sections">
        <div class="detail-header">İş vəzifəsi</div>
        <div class="detail-value">${user.jobPosition}</div>
    </div>
</section>
<div class="details-sections">
    <div class="detail-header">Hal=hazırdakı vəzifə</div>
    <div class="detail-value">${user.currentPosition}</div>
</div>
<div class="details-sections">
    <div class="detail-header">Ümumi məlumat</div>
    <div class="detail-value">${user.generalInfo}</div>
</div>
`
        table_item.append(short_details,more_details);
       
        this.TableContainer.append(table_item)
    })
  }
  Listeners = () => {
    this.SearchBtn.addEventListener("click",e=>{
        this.SearchCallback(this.CreateSearchObject());        
    })
    this.ContainerItems.forEach(item => {
        item.addEventListener("click", e => {
            if (![...e.target.classList].includes("btn") && [...e.currentTarget.classList].includes("container-item")) {
                   const searchObject=  this.OpenDetailedInfo(e);
                   this.SearchCallback(searchObject)

            }
        })
    })
    this.ShowInMapBtns.forEach(btn=>{
        btn.addEventListener("click",e=>{
          this.ShowInMap(btn.getAttribute("data-cordinates"))
        })
    })


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
