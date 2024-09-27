/* 
CHALLENGE CHAPTER 2
NAMA: AFIF NAUFAL TAUFIQI (BES2409KM7027)
KELAS: BEJS-2
*/

class BankAccount {
    constructor(initialBalance = 0) {
        this.saldo = initialBalance;
    }

    deposit(amount, callback) {
        if (!isNaN(amount) && amount > 0) {
            this.saldo += Number(amount);
            setTimeout(() =>  {
                alert(`Rp ${amount} berhasil ditambahkan! Saldo saat ini: Rp ${this.saldo}`);
                if (callback) callback();
            }, 2000); // menunda selama 2 detik
        } else {
            alert('Jumlah yang dimasukkan tidak valid. Harus berupa angka positif.');
            if (callback) callback();
        }
    }

    withdraw(amount, callback) {
        if (isNaN(amount) || amount <= 0) {
            alert('Jumlah yang dimasukkan tidak valid. Harus berupa angka positif.');
            if (callback) callback();
        } else if (amount > this.saldo) {
            alert(`Saldo tidak mencukupi! Saldo saat ini: Rp ${this.saldo}`);
            if (callback) callback();
        } else {
            setTimeout(() => {
                this.saldo -= Number(amount);
                alert(`Rp ${amount} berhasil ditarik! Saldo saat ini: Rp ${this.saldo}`);
                if (callback) callback();
            }, 2000); // menunda selama 2 detik
        }
    }

    getBalance() {
        return this.saldo;
    }
}

function bankingSystem() {
    const myAccount = new BankAccount();

    function performAction() {
        let action = prompt("Apa yang ingin Anda lakukan?\n1. Deposit\n2. Withdraw\n3. Cek Saldo\n4. Keluar\nMasukkan pilihan angka (1-4):");

        switch (action) {
            case '1':
                let depositAmount = prompt("Masukkan jumlah yang ingin didepositkan:");
                if (!isNaN(depositAmount) && depositAmount !== '') {
                    myAccount.deposit(Number(depositAmount), performAction);
                } else {
                    alert("Masukkan angka yang valid.");
                    performAction();
                }
                break;
            case '2':
                let withdrawAmount = prompt("Masukkan jumlah yang ingin ditarik:");
                if (!isNaN(withdrawAmount) && withdrawAmount !== '') {
                    myAccount.withdraw(Number(withdrawAmount), performAction);
                } else {
                    alert("Masukkan angka yang valid.");
                    performAction()
                }
                break;
            case '3':
                alert("Saldo saat ini: Rp " + myAccount.getBalance());
                performAction();
                break;
            case '4':
                alert("Terima kasih! Saldo akhir Anda: Rp " + myAccount.getBalance());
                return;
            default:
                alert("Pilihan tidak valid, silahkan masukkan angka 1-4.");
                performAction();
        }
    }
    // Memulai loop
    performAction();
}

// Memanggil fungsi
bankingSystem();