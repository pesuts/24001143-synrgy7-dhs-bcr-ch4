class Car {
  static list = [];

  static init(cars) {
    this.list = cars.map((i) => new this(i));
  }

  constructor({
    id,
    plate,
    manufacture,
    model,
    image,
    rentPerDay,
    capacity,
    description,
    transmission,
    available,
    type,
    year,
    options,
    specs,
    availableAt,
  }) {
    this.id = id;
    this.driver = (capacity > 2 && rentPerDay > 200000) ? true : false;
    this.plate = plate;
    this.manufacture = manufacture;
    this.model = model;
    this.image = image;
    this.rentPerDay = rentPerDay;
    this.capacity = capacity;
    this.description = description;
    this.transmission = transmission;
    this.available = available;
    this.type = type;
    this.year = year;
    this.options = options;
    this.specs = specs;
    this.availableAt = availableAt;
  }

  static filterCars(
    formDriver,
    formTanggal,
    formWaktu,
    formPenumpang
  ) {
    if (formDriver !== "" 
      && formTanggal !== "" 
      && formWaktu !== "" 
      && formPenumpang !== "") return this.filterCarsWithAllParams(formDriver, formTanggal, formWaktu, formPenumpang)
    if (formDriver !== "" 
      && formTanggal !== "" 
      && formWaktu !== "") return this.filterCarsWithDriverDateTime(formDriver, formTanggal, formWaktu)
  }

  static filterCarsWithAllParams(formDriver,
    formTanggal,
    formWaktu,
    formPenumpang) {
    
    let cars = []

    this.list.forEach((car) => {
      if (car.driver == formDriver
        && car.capacity === parseInt(formPenumpang)
        && car.availableAt < new Date(formTanggal + " " + formWaktu)) {
            cars = [...cars, car]
      }
    })

    return cars;
  }

  static filterCarsWithDriverDateTime(formDriver, formTanggal, formWaktu) { 
    let cars = []

    this.list.forEach((car) => {
      if (car.driver == formDriver
        && car.availableAt < new Date(formTanggal + " " + formWaktu)) {
        cars = [...cars, car]
      }
    })

    return cars;
  }

  render() {
    return `
    <div class="max-w-sm">
      <div class="bg-white shadow-[0_0_3px_3px_rgba(0,0,0,0.1)] rounded-md p-8 border-1">
        <img src="img/jpg/${this.image.split("/")[2]}"
          class="object-cover py-4 h-64 w-80"
          alt="User 1" />
        <p class="text-[.9rem]">${this.manufacture}/${this.type}</p>
        <p class="font-bold py-2">Rp ${this.rentPerDay.toLocaleString('id')}/hari</p>
        <p class="py-2 text-[.9rem] h-24">${this.description}</p>
        <p class="py-2 text-[.9rem] flex gap-x-3"><i data-feather="users"></i> ${this.capacity} Orang</p>
        <p class="py-2 text-[.9rem] flex gap-x-3"><i data-feather="settings"></i> ${this.transmission}</p>
        <p class="py-2 text-[.9rem] flex gap-x-3"><i data-feather="calendar"></i> Tahun ${this.year}</p>
        <button class="bg-lime-green text-white font-bold w-full mt-4 py-4 rounded-sm">Pilih Mobil</button>  
      </div>
  </div>
    `;
  }
}
