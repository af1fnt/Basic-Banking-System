/* 
CHALLENGE CHAPTER 1
NAMA: AFIF NAUFAL TAUFIQI (BES2409KM7027)
KELAS: BEJS-2
*/

// Deklarasi variabel saldo
let saldo = 0;

// Menampilkan saldo awal
alert("Saldo saat ini: Rp " + saldo);

// Fungsi untuk menambahkan saldo
function tambahSaldo() {
    let jumlah = prompt("Masukkan jumlah saldo yang ingin ditambahkan:");

    // Validasi input apakah bukan angka atau kosong
    if (isNaN(jumlah) || jumlah === '') {
        alert("Invalid input, masukkan angka yang valid!");
        tambahSaldo(); // Panggil fungsi lagi untuk meminta input ulang
    } else {
        saldo += Number(jumlah); // Menambahkan saldo
        alert("Saldo berhasil ditambahkan! Saldo saat ini: Rp " + saldo);
    }
}

// Fungsi untuk mengurangi saldo
function kurangiSaldo() {
    let jumlah = prompt("Masukkan jumlah saldo yang ingin dikurangi:");

    // Validasi input apakah bukan angka atau kosong
    if (isNaN(jumlah) || jumlah === '') {
        alert("Invalid input, masukkan angka yang valid!");
        kurangiSaldo(); // Panggil fungsi lagi untuk meminta input ulang
    } else if (Number(jumlah) > saldo) {
        alert("Saldo tidak mencukupi! Saldo saat ini: Rp " + saldo);
    } else {
        saldo -= Number(jumlah); // Mengurangi saldo
        alert("Saldo berhasil dikurangi! Saldo saat ini: Rp " + saldo);       
    }
}

function pilihAksi() {
    let pilihan = prompt(`Saldo saat ini: Rp ${saldo}\nApakah Anda ingin menambahkan atau mengurangi saldo? Ketik 'tambah' atau 'kurang'. Ketik 'selesai' untuk keluar.`)

    if (pilihan === 'tambah') {
        tambahSaldo();
        pilihAksi();
    } else if (pilihan === 'kurang') {
        kurangiSaldo();
        pilihAksi();
    } else if (pilihan === 'selesai') {
        alert("Terima kasih! Saldo akhir Anda: Rp " + saldo);
    } else {
        alert("Pilihan tidak valid, silahkan coba lagi.")
        pilihAksi();
    }
}

// Memanggil Fungsi
pilihAksi();
