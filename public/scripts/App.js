class App {
  constructor() {
    // this.clearButton = document.getElementById("clear-btn");
    this.filterButton = document.getElementById("filter-btn");
    this.carContainerElement = document.getElementById("cars-container");
    this.driverElement = document.querySelector(".form-driver");
    this.dateElement = document.querySelector(".form-date");
    this.timeElement = document.querySelector(".form-time");
  }

  async init() {
    await this.load();

    // Register click listener
    // this.clearButton.onclick = this.clear;
    this.filterButton.onclick = this.run;
  }

  run = () => {
    this.formDriver = document.getElementById("form-driver");
    this.formDate = document.getElementById("form-date");
    this.formTime = document.getElementById("form-time");
    this.formCapacity = document.getElementById("form-capacity");

    function addErrorMessage(form, parentElement) { 
      const alertText = parentElement.querySelector(".text-red-600") 
      if (!alertText) { 
        form.className = "border-red-600 rounded-md border-2 w-56";
        const redText = document.createElement('p');
        redText.innerText = "Field tidak boleh kosong"
        redText.className = "text-red-600"
        parentElement.appendChild(redText);
      }
    }

    if (this.formDriver.value === "" || this.formDate.value === "" || this.formTime.value === "") {
      if (this.formDriver.value === "") {
        addErrorMessage(this.formDriver, this.driverElement)
      }
      if (this.formDate.value === "") {
        addErrorMessage(this.formDate, this.dateElement)
      }
      if (this.formTime.value === "") {
        addErrorMessage(this.formTime, this.timeElement)
      }
      event.preventDefault();
      return;
    }
    else { 
      this.formDriver.className =
        this.formDate.className =
          this.formTime.className = "border-gray-100 rounded-md border-2 w-56";

      const formDriverText = this.driverElement.querySelector(".text-red-600") 
      if (formDriverText) formDriverText.remove("text-red-600")
      
      const formDateText = this.dateElement.querySelector(".text-red-600") 
      if (formDateText) formDateText.remove("text-red-600")
      
      const formTimeText = this.timeElement.querySelector(".text-red-600") 
      if (formTimeText) formTimeText.remove("text-red-600")
    }
    this.clear()

    const cars = Car.filterCars(this.formDriver.value,
      this.formDate.value,
      this.formTime.value,
      this.formCapacity.value)
    
    if (cars.length === 0) {
      const notFound = document.createElement("h1");
      notFound.innerHTML = `<h1 class="font-extrabold text-4xl text-red-800">MOBIL TIDAK DITEMUKAN</h1>`
      this.carContainerElement.appendChild(notFound);
    }
    else { 
      cars.forEach((car) => {
        const node = document.createElement("div");
        node.innerHTML = car.render();
        this.carContainerElement.appendChild(node);
      });
    }

    feather.replace();
    event.preventDefault();
  };

  async load() {
    const cars = await Binar.listCars();
    Car.init(cars);
  }

  clear = () => {
    let child = this.carContainerElement.firstElementChild;

    while (child) {
      child.remove();
      child = this.carContainerElement.firstElementChild;
    }
  };
}
