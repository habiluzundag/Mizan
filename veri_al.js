const firebaseConfig = {
    apiKey: "AIzaSyBUpAoBrJUXSu8QvSgdgbxgtb8TyRi2-Sk",
    authDomain: "fiyat-55130.firebaseapp.com",
    databaseURL: "https://fiyat-55130-default-rtdb.firebaseio.com",
    projectId: "fiyat-55130",
    storageBucket: "fiyat-55130.appspot.com",
    messagingSenderId: "811230924129",
    appId: "1:811230924129:web:72339a2c3143c22b438920",
    measurementId: "G-PKXT60NY52"
};

// Firebase'i başlat
firebase.initializeApp(firebaseConfig);

// Belirli bir dalı yükle ve tabloya veriyi ekle
function loadData(branchName) {
    var database = firebase.database();
    database.ref(`/json_files/product/${branchName}`).once('value').then(function(snapshot) {
        var data = snapshot.val();
        console.log(data); // JSON verisini konsola yazdır

        let output = '';
        let firstRow = true; // İlk satır kontrolü için bir değişken
        for (let key in data) {
            if (data.hasOwnProperty(key)) {
                let rowClass = firstRow ? 'highlight' : ''; // İlk satır için özel sınıf
                output += `<tr class="${rowClass}">
                            <td>
                                <a href="${data[key].site_url}" target="_blank">
                                    <img src="https://resim.epey.com/site/${data[key].site_name.toLowerCase().replace(/\s/g, '-')}.png" alt="${data[key].site_name}" style="width: 100px; height: auto;">
                                </a>
                            </td>
                            <td>${data[key].first_price} TL</td>
                            <td><a href="${data[key].site_url}" class="link" target="_blank">Ürüne git</a></td>
                           </tr>`;
                firstRow = false; // İlk satırın eklenmesi sonrası değişkeni güncelle
            }
        }
        document.getElementById("output").innerHTML = output;
    }).catch(function(error) {
        console.error("Veri çekme hatası:", error);
    });
}