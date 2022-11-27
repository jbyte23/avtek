$(function () {
    nastaviSeznamAvtomobilov(1);
    loadDatePicker();
});

/**
 * Manipuliranje z DATUMI
 */

function loadDatePicker() {

    const today = new Date();
    today.setMinutes(Math.floor(today.getMinutes() / 15 + 1) * 15);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    const afterTomorrow = new Date(tomorrow);
    afterTomorrow.setDate(tomorrow.getDate() + 1);
    const diffSec = Math.abs(afterTomorrow - tomorrow);

    sessionStorage.datumNajema = tomorrow;
    sessionStorage.datumOddaje = afterTomorrow;
    sessionStorage.stDniNajema = Math.ceil(diffSec / (1000 * 60 * 60 * 24));

    $('#obdobjeNajema').daterangepicker({
        "timePicker": true,
        "timePicker24Hour": true,
        "timePickerIncrement": 15,
        "showDropdowns": true,
        "minDate": tomorrow,
        "autoUpdateInput": true,
        "singleDatePicker": false,
        "locale": {
            "format": "D.M.YYYY HH:mm",
            "separator": " do ",
            "applyLabel": "Potrdi",
            "cancelLabel": "Pobriši",
            "fromLabel": "Od",
            "toLabel": "Do",
            "customRangeLabel": "Custom",
            "weekLabel": "W",
            "daysOfWeek": [
                "Ne",
                "Po",
                "To",
                "Sr",
                "Če",
                "Pe",
                "So"
            ],
            "monthNames": [
                "januar",
                "februar",
                "marec",
                "april",
                "maj",
                "junij",
                "julij",
                "avgust",
                "september",
                "oktober",
                "november",
                "december"
            ],
            "firstDay": 1
        },
        "startDate": tomorrow,
        "endDate": afterTomorrow
    }, function (start, end, label) {
        const diffSec = Math.abs(end - start);
        sessionStorage.stDniNajema = Math.ceil(diffSec / (1000 * 60 * 60 * 24));
    });
}

// $('#datumPrevzema').on('apply.daterangepicker', function (ev, picker) {
//     $(this).val(picker.startDate.format('DD.MM.YYYY') + ' ob ' + picker.startDate.format('HH:mm'));
//     if (sessionStorage.datumOddaje) {
//         const diffSec = new Date(sessionStorage.datumOddaje) - new Date(picker.startDate);
//         if (diffSec <= 0) {
//             // ev.target.className = 'form-control is-invalid';
//             sessionStorage.removeItem("stDniNajema")
//         }
//         else {
//             // ev.target.className = 'form-control is-valid';
//             sessionStorage.stDniNajema = Math.ceil(diffSec / (1000 * 60 * 60 * 24));
//         }
//     }

//     // else {
//     //     ev.target.className = 'form-control is-valid';
//     // }
// });

// $('#datumPrevzema').on('cancel.daterangepicker', function (ev, picker) {
//     $(this).val('');
//     sessionStorage.removeItem("datumPrevzema");
//     sessionStorage.removeItem("stDniNajema");
// });

// $('#datumOddaje').on('apply.daterangepicker', function (ev, picker) {
//     $(this).val(picker.startDate.format('DD.MM.YYYY') + ' ob ' + picker.endDate.format('HH:mm'));
//     if (sessionStorage.datumPrevzema) {
//         const diffSec = new Date(picker.startDate) - new Date(sessionStorage.datumPrevzema);
//         if (diffSec <= 0) {
//             // ev.target.className = 'form-control is-invalid';
//             sessionStorage.removeItem("stDniNajema")
//         }
//         else {
//             // ev.target.className = 'form-control is-valid';
//             sessionStorage.stDniNajema = Math.ceil(diffSec / (1000 * 60 * 60 * 24));
//         }
//     }

//     // else {
//     //     ev.target.className = 'form-control is-valid';
//     // }
// });

// $('#datumOddaje').on('cancel.daterangepicker', function (ev, picker) {
//     $(this).val('');
//     sessionStorage.removeItem("datumOddaje");
//     sessionStorage.removeItem("stDniNajema");
// });


function nastaviSeznamAvtomobilov(type) {
    let items = [];
    switch (type) {
        case 1:
            items = ['Audi A3', 'Audi A4', 'BMW 2 Series', 'Dacia Sandero', 'Fiat 500', 'Fiat 500x', 'Ford Kuga', 'Ford Mondeo', 'Hyundai Solaris', 'Opel Astra', 'Peugeot 2008', 'Renault Kadjar', 'Renault Mégane', 'Skoda Octavia', 'Toyota RAV4', 'Toyota Yaris', 'Volkswagen Golf', 'Volkswagen Polo', 'Volkswagen Tiguan', 'Volvo XC60'];
            break;
        case 2:
            items = ['Audi A1', 'Audi Q3', 'BMW 1 Series', 'BMW 5 Series', 'BMW X1', 'Citroen C3', 'Citroen C4', 'Citroen C4 Picasso', 'Dacia Duster', 'Fiat 500L', 'Fiat Panda', 'Ford C-max', 'Ford Fiesta', 'Hyundai Tucson', 'Hyundai i10', 'Kia Rio', 'Kia Sportage', 'Lada Granta', 'Mercedes A Class', 'Mercedes C Class', 'Nissan Qashqai', 'Opel Mokka', 'Peugeot 208', 'Peugeot 308', 'Renault Captur', 'Renault Scénic', 'Renault Twingo', 'Skoda Fabia', 'Skoda Rapid', 'Skoda Superb', 'Suzuki Vitara', 'Toyota Auris', 'Volkswagen Up!'];
            break;
        case 3:
            items = ['Audi A6', 'BMW 3 Series', 'Ford Focus', 'Hyundai i20', 'Hyundai i30', 'Kia Ceed', 'Mercedes E Class', 'Nissan Juke', 'Opel Corsa', 'Opel Insignia', 'Renault Clio', 'Seat Ibiza', 'Seat Leon', 'Toyota Aygo', 'Volkswagen Passat', 'Volkswagen Touran'];
    }
    let str = ""
    for (let item of items) {
        str += "<option value='" + (Math.floor(Math.random() * 100 * type) + 60) + "' name='" + item + "'>" + item + "</option>"
    }
    document.getElementById("modelAvto").innerHTML = str;
}

document.getElementById("majhenAvto").addEventListener("click", function () {
    nastaviSeznamAvtomobilov(1);
});

document.getElementById("srednjiAvto").addEventListener("click", function () {
    nastaviSeznamAvtomobilov(2);
});

document.getElementById("velikAvto").addEventListener("click", function () {
    nastaviSeznamAvtomobilov(3);
});

function test() {
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    const forms = document.querySelectorAll('.needs-validation')

    // Loop over them and prevent submission
    Array.prototype.filter.call(forms, form => {
        if (form.checkValidity() === true) {
            sessionStorage.obdobjeNajema = document.getElementById("obdobjeNajema").value;
            const obdobjeNajemaSplit = sessionStorage.obdobjeNajema.split(' do ');
            sessionStorage.krajPrevzema = document.getElementById("krajPrevzema").value;
            sessionStorage.krajOddaje = document.getElementById("krajOddaje").value;
            sessionStorage.velikostAvto = document.querySelector('input[name="velikostAvtoOptions"]:checked').value;
            sessionStorage.vrstaMenjalnika = document.querySelector('input[name="menjalnikOptions"]:checked').value;
            sessionStorage.tipMotorja = document.querySelector('input[name="tipMotorjaOptions"]:checked').value;
            modelEl = document.getElementById("modelAvto");
            sessionStorage.modelAvto = modelEl.options[modelEl.selectedIndex].text;
            sessionStorage.cenaAvto = modelEl.options[modelEl.selectedIndex].value;
            sessionStorage.dodatnoZavarovanje = document.querySelector('#dodatnoZavarovanje').checked;
            sessionStorage.stresniPritljaznik = document.querySelector('#stresniPritljaznik').checked;
            window.location.href = "najem.html";
        }
        form.classList.add('was-validated');
    });

}