const R = 0.082057;

const gasSelect = document.getElementById("gasSelect");
const customMWContainer = document.getElementById("customMWContainer");

gasSelect.addEventListener("change", () => {

  if(gasSelect.value === "custom"){
    customMWContainer.style.display = "block";
  }

  else{
    customMWContainer.style.display = "none";
  }

});

function getMolecularWeight(){

  if(gasSelect.value === "custom"){

    return parseFloat(
      document.getElementById("customMW").value
    );

  }

  return parseFloat(gasSelect.value);

}

function setSTP(){

  document.getElementById("temperature").value = 0;
  document.getElementById("pressure").value = 1;

}

function setNTP(){

  document.getElementById("temperature").value = 20;
  document.getElementById("pressure").value = 1;

}

function convertUnits(){

  const value = parseFloat(
    document.getElementById("inputValue").value
  );

  const fromUnit =
    document.getElementById("fromUnit").value;

  const toUnit =
    document.getElementById("toUnit").value;

  const tempC =
    parseFloat(document.getElementById("temperature").value);

  const pressure =
    parseFloat(document.getElementById("pressure").value);

  const MW = getMolecularWeight();

  if(isNaN(value) || isNaN(MW)){

    alert("Please enter valid values.");
    return;

  }

  const tempK = tempC + 273.15;

  let ppm;

  // STEP 1: Convert input to ppm

  switch(fromUnit){

    case "ppm":
      ppm = value;
      break;

    case "ppb":
      ppm = value / 1000;
      break;

    case "mg/m³":
      ppm =
        (value * R * tempK) /
        (MW * pressure);
      break;

    case "µg/m³":
      ppm =
        ((value / 1000) * R * tempK) /
        (MW * pressure);
      break;

  }

  let result;

  // STEP 2: Convert ppm to desired unit

  switch(toUnit){

    case "ppm":
      result = ppm;
      break;

    case "ppb":
      result = ppm * 1000;
      break;

    case "mg/m³":
      result =
        (ppm * MW * pressure) /
        (R * tempK);
      break;

    case "µg/m³":
      result =
        ((ppm * MW * pressure) /
        (R * tempK)) * 1000;
      break;

  }

  document.getElementById("result").innerHTML =
    `${result.toFixed(4)} ${toUnit}`;

}