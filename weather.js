const wrapper = document.querySelector(".wrapper"),
inputTxt= wrapper.querySelector(".input-txt"),
infoError = inputTxt.querySelector(".info-error"),
Input = inputTxt.querySelector("input")
locationBtn = inputTxt.querySelector("button");
let api;

wIcon = document.querySelector(".weather-part img");

Input.addEventListener("keyup", e =>{
    if(e.key=="Enter"&& Input.value != ""){
        requestApi(Input.value);
    }
});
locationBtn.addEventListener("click", ()=>{
    if(navigator.geolocation){
navigator.geolocation.getCurrentPosition(onSuccess , onError);
    }
    else{
        alert("Your Browser doesn't support geolocation api");
    }
});
 function onSuccess(position){
     const{latitude, longitude}=position.coords;
api = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`
 fetchData();
}
 function onError(error){
    infoError.innerText="User denied Location";
     infoError.classList.add("notvalid");
 }
let apiKey='4a2e13587d37140bb1e7d065120ce50c';
function requestApi(city){
     api =`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
    fetchData();
    
}
function fetchData(){
    infoError.innerText="Getting Weather Details...";
     infoError.classList.add("pending");
 fetch(api).then(response=> response.json()).then(result=> weatherDetails(result));

}
function weatherDetails(info){
    infoError.classList.replace("pending", "notvalid");
    if(info.cod == "404"){
        infoError.innerText = `${Input.value} isn't a valid city name`;
    }
    else{
        const city= info.name;
        const country= info.sys.country;
        const {description,id}= info.weather[0];
        const {feels_like,humidity , temp}= info.main;

        if(id == 800){

            wIcon.src="icons/clear.svg";
        }
        else if(id>=200 && id<=232){
            wIcon.src="icons/storm.svg";
        }
        else if(id>=600 && id<=622){
            wIcon.src="icons/snow.svg";
        }
        else if(id>=701 && id<=781){
            wIcon.src="icons/haze.svg";
        }
        else if(id>=801 && id<=804){
            wIcon.src="icons/cloud.svg";
        }
        else if((id>=300 && id<=321)|| 
        (id>=500 && id<=531)){
            wIcon.src="icons/rain.svg";
        }

        wrapper.querySelector(".temp .numb").innerText = Math.floor(temp);
        wrapper.querySelector(".weather").innerText = description
        wrapper.querySelector(".location span").innerText = `${city},${country}`;
        wrapper.querySelector(".temp .numb-2").innerText = Math.floor(feels_like);
        wrapper.querySelector(".humidity span").innerText = `${humidity}%`;

        infoError.classList.remove("pending","notvalid");
        wrapper.classList.add("active");
        console.log(info);
    }
   
}