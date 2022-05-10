function handleSubmit(event) {
  // Stop form untuk merefresh page
  event.preventDefault();
  // Tangkap input user
  let userInput = event.target.note.value;
  // Membuat Waktu dan tanggal
  let uuid = Date.now();
  let noteDate = new Date();
  let tanggal = noteDate.getDate();
  let bulan = noteDate.getMonth();
  let tahun = noteDate.getFullYear();
  let jam = noteDate.getHours();
  let menit = noteDate.getMinutes();

  // generate waktu
  let waktu = `${tanggal}/ ${bulan}/${tahun} ${jam}:${menit}`;
  console.info(waktu);

  // menangkap prev data dari local storage
  let _note = localStorage.getItem("_note"); ///"[]"

  // check apakah sudah ada key _note
  if (!_note) {
    checkLocalStorage();
    _note = localStorage.getItem("_note");
  }

  _note = JSON.parse(_note); // mengubah string kearray

  // push data kedalam array _note
  _note.push({
    id: uuid,
    notes: userInput,
    date: waktu,
  });

  // Save kembali ke localstorage
  localStorage.setItem("_note", JSON.stringify(_note));

  // clear text area
  event.target.note.value = "";

  // mereload page
  window.location.reload();
}

// Function untuk mengecek / membuat local storage _note
function checkLocalStorage() {
  // buat variable yang akan menampung local storage dengan nama _note
  let _note = localStorage.getItem("_note");
  if (!_note) {
    localStorage.setItem("_note", "[]");
  }
  renderData();
}

// function untuk merender data dari localStorage kehalaman html
function renderData() {
  // tangkap data _note dari local storage
  let card_container = document.getElementById("card_container");
  let _note = localStorage.getItem("_note");
  _note = JSON.parse(_note).reverse();

  _note.forEach(function (item) {
    card_container.innerHTML += `
    <div class="card">
          <p class="card_content">
            ${item.notes}
          </p>
          <small class="card_date"> ${item.date} </small>
          <button class="card_btn" onclick="deleteData(${item.id})">
            <i class="material-icons">delete</i>
          </button>
        </div>
    `;
  });
}

function deleteData(id) {
  // Tangkap data note
  let _note = localStorage.getItem("_note");
  _note = JSON.parse(_note);

  // filter data tanpa id yang dituju
  let newData = _note.filter((e) => {
    return e.id !== id;
  });

  // kita tiban data lama dengan hasil filter tanpa data dengan id yang ingin didelete
  localStorage.setItem("_note", JSON.stringify(newData));

  window.location.reload();
}
