//today
let day= document.getElementById('day')
let date= document.getElementById('date')
let city= document.getElementById('city')
let temp= document.getElementById('temp')
let icon= document.getElementById('icon')
let humidity= document.getElementById('humidity')
let wind= document.getElementById('wind')
let way= document.getElementById('way')
let condition= document.getElementById('condition')

//tomorrow
let day2= document.getElementsByClassName('day2')
let icon2= document.getElementsByClassName('icon2')
let temp2= document.getElementsByClassName('temp2')
let night2= document.getElementsByClassName('night2')
let desc2= document.getElementsByClassName('desc2')

let search=document.getElementById('search')


let weatherData= new XMLHttpRequest()

weatherData.open('POST',`https://api.weatherapi.com/v1/forecast.json?key=6bd418a0fe7448c2bae232035240407&q=alexandria&days=3`)

weatherData.send()

weatherData.addEventListener('load',function start(){
    data=JSON.parse(weatherData.response)
    console.log(data);
    display()
    
})

//  async function searchdata(city=london){
//     let wdata= await start()
//     display()

// }

function display(){
    //today
    let today= new Date()
    date.innerHTML=today.toLocaleDateString("en-us",{weekday:"long"})
    day.innerHTML=today.toLocaleDateString("en-us", {date})
    city.innerHTML=data.location.name
    temp.innerHTML=data.current.temp_c
    condition.innerHTML=data.current.condition.text
    humidity.innerHTML=data.current.wind_degree
    wind.innerHTML=data.current.wind_kph
    way.innerHTML=data.current.wind_dir
    icon.setAttribute("src",data.current.condition.icon)

    //tomorrow

    let forecastinfo = data.forecast.forecastday;
    for (let i = 0; i < 2; i++) {
    let nextDay=new Date(forecastinfo[i+1].date)
    day2[i].innerHTML= nextDay.toLocaleDateString("en-us",{weekday:"long"})
    icon2[i].setAttribute("src",forecastinfo[i+1].day.condition.icon)
    night2[i].innerHTML=forecastinfo[i+1].day.maxtemp_c
    temp2[i].innerHTML=forecastinfo[i+1].day.mintemp_c
    desc2[i].innerHTML=forecastinfo[i+1].day.condition.text
    
   }
   

}

search.addEventListener("input",function(){
    start(search.value)

})

