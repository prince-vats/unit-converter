const R = 0.082057;
const AVOGADRO = 6.022e23;

const gas = document.getElementById("gas");

gas.addEventListener("change", () => {

  const box =
    document.getElementById("customMWBox");

  if(gas.value === "custom"){

    box.style.display = "block";

  }

  else{

    box.style.display = "none";

  }

});

function getMW(){

  if(gas.value === "custom"){

    return parseFloat(
      document.getElementById("customMW").value
    );

  }

  return parseFloat(gas.value);

}

function convertTempToK(temp, unit){

  if(unit === "°C") return temp + 273.15;

  if(unit === "°F")
    return (temp - 32)*(5/9)+273.15;

  return temp;

}

function convertPressureToAtm(value, unit){

  switch(unit){

    case "atm":
      return value;

    case "Pa":
      return value / 101325;

    case "hPa":
      return value / 1013.25;

    case "kPa":
      return value / 101.325;

    case "bar":
      return value / 1.01325;

    case "mmHg":
      return value / 760;

  }

}

function setSTP(){

  document.getElementById("temp").value = 0;
  document.getElementById("tempUnit").value = "°C";

  document.getElementById("pressure").value = 1;
  document.getElementById("pressureUnit").value = "atm";

}

function setNTP(){

  document.getElementById("temp").value = 20;
  document.getElementById("tempUnit").value = "°C";

  document.getElementById("pressure").value = 1;
  document.getElementById("pressureUnit").value = "atm";

}

function setAmbient(){

  document.getElementById("temp").value = 25;
  document.getElementById("tempUnit").value = "°C";

  document.getElementById("pressure").value = 1;
  document.getElementById("pressureUnit").value = "atm";

}

document.getElementById("swapBtn")
.addEventListener("click", () => {

  const from =
    document.getElementById("fromUnit");

  const to =
    document.getElementById("toUnit");

  const temp = from.value;

  from.value = to.value;
  to.value = temp;

});

document.getElementById("copyBtn")
.addEventListener("click", () => {

  navigator.clipboard.writeText(
    document.getElementById("result").innerText
  );

});

function convert(){

  const value =
    parseFloat(
      document.getElementById("inputValue").value
    );

  const from =
    document.getElementById("fromUnit").value;

  const to =
    document.getElementById("toUnit").value;

  const MW = getMW();

  let temp =
    parseFloat(
      document.getElementById("temp").value
    );

  const tempUnit =
    document.getElementById("tempUnit").value;

  temp = convertTempToK(temp, tempUnit);

  let pressure =
    parseFloat(
      document.getElementById("pressure").value
    );

  pressure = convertPressureToAtm(
    pressure,
    document.getElementById("pressureUnit").value
  );

  if(isNaN(value) || isNaN(MW)){

    alert("Invalid input");
    return;

  }

  let ppm;

  switch(from){

    case "ppm":
      ppm = value;
      break;

    case "ppb":
      ppm = value / 1000;
      break;

    case "ppt":
      ppm = value / 1e6;
      break;

    case "vol %":
      ppm = value * 10000;
      break;

    case "mg/m³":
      ppm =
      (value * R * temp) /
      (MW * pressure);
      break;

    case "µg/m³":
      ppm =
      ((value/1000) * R * temp) /
      (MW * pressure);
      break;

    case "g/m³":
      ppm =
      ((value*1000) * R * temp) /
      (MW * pressure);
      break;

    case "ng/m³":
      ppm =
      ((value/1e6) * R * temp) /
      (MW * pressure);
      break;

    case "mol/m³":

      ppm =
      ((value * R * temp) /
      pressure) * 1e6;

      break;

  }

  let result;

  switch(to){

    case "ppm":
      result = ppm;
      break;

    case "ppb":
      result = ppm * 1000;
      break;

    case "ppt":
      result = ppm * 1e6;
      break;

    case "vol %":
      result = ppm / 10000;
      break;

    case "mg/m³":
      result =
      (ppm * MW * pressure) /
      (R * temp);
      break;

    case "µg/m³":
      result =
      ((ppm * MW * pressure) /
      (R * temp))*1000;
      break;

    case "g/m³":
      result =
      ((ppm * MW * pressure) /
      (R * temp))/1000;
      break;

    case "ng/m³":
      result =
      ((ppm * MW * pressure) /
      (R * temp))*1e6;
      break;

    case "molecules/cm³":

      const mol_m3 =
      (ppm/1e6)*
      pressure/
      (R*temp);

      result =
      mol_m3 *
      AVOGADRO /
      1e6;

      break;

  }

  document.getElementById("result")
  .innerHTML =

  result.toExponential(6)
  + " "
  + to;

}