$(function () {
    zapolniPodatke();
});

function zapolniPodatke() {
    document.getElementById("velikostAvtomobilaInfo").innerHTML = sessionStorage.velikostAvto;
    document.getElementById("modelAvtomobilaInfo").innerHTML = sessionStorage.modelAvto;
    document.getElementById("terminNajema").innerHTML = sessionStorage.obdobjeNajema;
    document.getElementById("krajNajema").innerHTML = sessionStorage.krajPrevzema;
    document.getElementById("krajOddaje").innerHTML = sessionStorage.krajOddaje;
    document.getElementById("dodatnoZavarovanjeInfo").innerHTML = sessionStorage.dodatnoZavarovanje === "true" ? "Da" : "Ne";
    document.getElementById("stresniPritljaznikInfo").innerHTML = sessionStorage.stresniPritljaznik === "true" ? "Da" : "Ne";

    let cena = 0
    if (sessionStorage.dodatnoZavarovanje === "true") {
        document.getElementById("cenik").innerHTML = `
        <div class="d-flex justify-content-between">
            <div>
                <h6 class="my-0">Dodatno avtomobilsko zavarovanje</h6>
            </div>
            <span id="dodatnoZavarovanjeCena">2€/dan</span>
        </div>` + document.getElementById("cenik").innerHTML;
        cena += 2;
    }

    if (sessionStorage.stresniPritljaznik === "true") {
        document.getElementById("cenik").innerHTML = `
        <div class="d-flex justify-content-between">
            <div>
                <h6 class="my-0">Strešni pritljažnik</h6>
            </div>
            <span id="strešniPritljažnikCena">7€/dan</span>
        </div>
        ` + document.getElementById("cenik").innerHTML;
        cena += 5;
    }

    const skupnaCena = parseFloat(cena) + parseFloat(sessionStorage.cenaAvto);
    document.getElementById("cenaVozila").innerHTML = parseFloat(sessionStorage.cenaAvto).toFixed(2) + "€/dan";
    document.getElementById("skupnaCena").innerHTML = skupnaCena.toFixed(2) + "€/dan";
    document.getElementById("koncniZnesekText").innerHTML = "Končni znesek (" + sessionStorage.stDniNajema + " x " + document.getElementById("skupnaCena").innerHTML + ")";
    document.getElementById("koncniZnesek").innerHTML = (parseFloat(sessionStorage.cenaAvto) * parseFloat(sessionStorage.stDniNajema)).toFixed(2) + "€";
}

document.getElementById("gotovina").addEventListener("click", function () {
    document.getElementById("stKartice").disabled = true;
    document.getElementById("ccv").disabled = true;
    document.getElementById("stKartice").value = "";
    document.getElementById("ccv").value = "";
    $('#stKartice').removeClass("is-valid is-invalid");
    $('#ccv').removeClass("is-valid is-invalid");
});

document.getElementById("kartica").addEventListener("click", function () {
    document.getElementById("stKartice").disabled = false;
    document.getElementById("ccv").disabled = false;
});

function submit() {
    let valid = true;

    inputs.forEach((input) => {
        if (!((input.id === "stKartice" || input.id === "ccv") && document.getElementById("gotovina").checked)) {
            let inputValid = validate(input, patterns[input.id]);
            if (inputValid === false) {
                valid = false;
            }
        }
    });

    if (valid) {
        $('#porociloModal').modal('show');
    }
}

const inputs = document.querySelectorAll('input');

const patterns = {
    ime: /^[a-zA-ZžčćšđŽČĆŠĐ][a-zA-ZžčćšđŽČĆŠĐ]*$/i,
    priimek: /^[a-zA-ZžčćšđŽČĆŠĐ][a-zA-ZžčćšđŽČĆŠĐ]*$/i,
    starost: /^[1-9][0-9]?$/,
    starostIzpita: /^[1-9][0-9]?$/,
    ulica: /^[a-zA-ZžčćšđŽČĆŠĐ][a-zA-ZžčćšđŽČĆŠĐ ]*$/,
    hisnaSt: /^[0-9]+[a-z]?$/i,
    posta: /^[a-zA-ZžčćšđŽČĆŠĐ][a-zA-ZžčćšđŽČĆŠĐ ]*$/i,
    postnaSt: /^([1-8][0-9]{3}|9[0-8][0-9]{2}|99[0-8][0-9]|999[0-9])$/i,
    email: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i,
    telSt: /^((\+(9[976]\d|8[987530]\d|6[987]\d|5[90]\d|42\d|3[875]\d|2[98654321]\d|9[8543210]|8[6421]|6[6543210]|5[87654321]|4[987654310]|3[9643210]|2[70]|7|1))|(0))\d{1,14}$/i,
    stKartice: /^[0-9]{16}$/i,
    ccv: /^[0-9]{3}$/i
};

inputs.forEach((input) => {
    input.addEventListener('keyup', (e) => {
        validate(e.target, patterns[e.target.attributes.id.value]);
    });
});

function validate(field, regex) {
    if (regex) {
        if (regex && regex.test(field.value)) {
            field.className = 'form-control is-valid';
            return true;
        } else {
            field.className = 'form-control is-invalid';
            return false;
        }
    }
}