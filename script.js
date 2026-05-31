let assets = JSON.parse(localStorage.getItem("batEquipment")) || [];

const form = document.getElementById("assetForm");
const assetList = document.getElementById("assetList");
const totalWealth = document.getElementById("totalWealth");

displayAssets();

form.addEventListener("submit", function (event) {
    event.preventDefault();

    const name = document.getElementById("name").value;
    const type = document.getElementById("type").value;
    const value = Number(document.getElementById("value").value);

    const asset = {
        name: name,
        type: type,
        value: value
    };

    assets.push(asset);

    localStorage.setItem("batEquipment", JSON.stringify(assets));

    displayAssets();

    form.reset();
});

function displayAssets() {
    assetList.innerHTML = "";

    let total = 0;

    for (let i = 0; i < assets.length; i++) {
        const li = document.createElement("li");

        li.textContent =
            assets[i].name +
            " | " +
            assets[i].type +
            " | $" +
            assets[i].value;

        assetList.appendChild(li);

        total += assets[i].value;
    }

    totalWealth.textContent = total;
}