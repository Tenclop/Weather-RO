const city = document.querySelector("#city");
const searchBtn = document.querySelector("#searchCity");
const currentConditions = document.querySelector(".weather__section--info");
const currentTemp = document.querySelector("#currentTemp");

let cards = document.querySelector(".weather__section--info-5cards");
let card = document.querySelector(".weather__section--info-5cards__card");

searchBtn.addEventListener("click", function () {
  fetchData(city.value);
  // city.value = "";
});

//search via enter btn from keyboard

city.addEventListener("keyup", (e) => {
  if (e.key === "Enter") {
    fetchData(city.value);
  }
});

const fetchData = async (cityName) => {
  let urlCity = await axios
    .get(
      `http://dataservice.accuweather.com/locations/v1/cities/search?apikey=W7Fs6dfscPqtVA83pPle2i7qGSAiBHmV&q=${cityName}&language=en-us&details=false`
    )
    .then((res) => {
      return res.data[0].Key;
    })
    .catch((err) => {
      console.log(err);
    });

  console.log(urlCity);

  let urlConditions = await axios
    .get(
      `http://dataservice.accuweather.com/currentconditions/v1/${urlCity}?apikey=W7Fs6dfscPqtVA83pPle2i7qGSAiBHmV&language=en-us&details=false`
    )
    .then((res) => {
      displayConditions(res.data[0].Temperature.Metric.Value);
      return res.data[0].Temperature.Metric.Value;
    })
    .catch((err) => {
      console.log(err);
    });

  console.log(urlConditions);

  let urlForecast = await axios
    .get(
      `http://dataservice.accuweather.com/forecasts/v1/daily/5day/${urlCity}?apikey=W7Fs6dfscPqtVA83pPle2i7qGSAiBHmV&language=en-us&details=false&metric=true`
    )
    .then((res) => {
      show5DaysForecast(res.data.DailyForecasts);
      // console.log(res.data.DailyForecasts);
      // return res.data[0].Temperature.Metric.Value;
    })
    .catch((err) => {
      console.log(err);
    });

  // console.log(urlForecast);
};
fetchData();

const displayConditions = (temp) => {
  currentTemp.innerHTML = `${temp} <pow>&#8451</pow>`;
  currentConditions.style.display = "flex";
};

const show5DaysForecast = (data) => {
  console.log(data);
  let card = ``;

  data.forEach((el) => {
    console.log(el);

    card += `
    <div class="weather__section--info-5cards__card">
           <p class='three'>Date: ${displayNewDate(el.Date)}</p>
            <p class='one'><span id="currentTemp">Min: ${
              el.Temperature.Minimum.Value
            } </span>&#8451</p>
            <p class='two'><span id="currentTemp">Max: ${
              el.Temperature.Maximum.Value
            } </span>&#8451</p>
    </div>
          
  `;
  });
  cards.innerHTML = card;
  cards.style.display = "grid";
  console.log(card);
};

const displayNewDate = (date) => {
  let dateNow = new Date(date);
  let days = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
  const dayName = days[dateNow.getDay()];
  const day =
    dateNow.getDay() < 10
      ? ("0" + dateNow.getDate().toString()).slice(-2)
      : dateNow.getDate().toString();

  let month = dateNow.getMonth() + 1;
  month = month < 10 ? ("0" + month.toString()).slice(-2) : month.toString();

  const newDate = `${day}(${dayName})/${month}`;
  return newDate;
};

displayNewDate();
