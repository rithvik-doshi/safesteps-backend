import firebase_admin
from firebase_admin import credentials, db, firestore
from django.shortcuts import render
import requests
from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt
import os
from os import path
# from safesteps.utils import read_n_to_last_line
import datetime
from dotenv import load_dotenv
load_dotenv()
import sys

cred_path = 'firebase.json'
bundle_dir = getattr(sys, '_MEIPASS', path.abspath(path.dirname(__file__)))
path_to_dat = path.abspath(path.join(bundle_dir, cred_path))

cred = credentials.Certificate(path_to_dat)
firebase_admin.initialize_app(cred)

#Make sure to pip3 install firebase-admin
#The object to connect with the firestore database
db = firestore.client()

data1 = {
    'Email1': 'kityan3002@gmail.com',
    'Name1': 'Kit Chung Yan'
}

doc_ref = db.collection('Users').document('Kit')
doc_ref.set(data1)
data2 = {
    'Email2': '001@gmail.com',
    'Name2': 'Tyreek Hill',
}
doc_ref = db.collection('Users').document('Tyreek Hill')
doc_ref.set(data2)

print(doc_ref.id)

weather_api_key = os.getenv("WEATHER_API_KEY")

#A function to get the current weather of a city in the US
def getCurrentWeather(city):
    
    weather_json = requests.get( f"https://api.openweathermap.org/data/2.5/weather?q={city}&units=imperial&APPID={weather_api_key}")

    if weather_json.status_code != 200:
        return "NO CITIES FOUND"
    else:
        weather_json = weather_json.json()
        weather = f"The current weather in {weather_json['name']} is {weather_json['weather'][0]['main']} with {weather_json['weather'][0]['description']}"
        temperature = f"Temperatures around {weather_json['main']['temp']}ºF feels like {weather_json['main']['feels_like']}ºF"
        return f"{weather}\n{temperature}"

def getWeatherForecast():
    #Gets the latitude and longitude of a area to display the temperature for one full day in 3 hour intervals
    latitude = 42.3601
    longitude = -71.0589
    weather_forecast = ""
    weather_forecast_json = requests.get(
        f"http://api.openweathermap.org/data/2.5/forecast?lat={latitude}&lon={longitude}&appid={weather_api_key}")
    if weather_forecast_json.status_code != 200:
        return "NO CITIES FOUND"
    else:
        for i in range(6):
            date_time = weather_forecast_json.json()['list'][i]['dt_txt']
            forecast = (weather_forecast_json.json()['list'][i]['main']['temp']-273.15)* 9/5 + 32
            weather_forecast += f"The current date and time is {date_time} with temperatures around {round(forecast,2)}ºF\n"
        return weather_forecast
print(getWeatherForecast())

def weather_view(request):
    city_name = 'boston'
    weather_data = getCurrentWeather(city_name)
    return HttpResponse(weather_data)

def forecast_view(request):
    forecast = getWeatherForecast()
    return HttpResponse(forecast)

def healthcheck_view(request):
    return HttpResponse("HEALTHY")



#JSON format for weather forecast
# {'coord': {'lon': -71.0598, 'lat': 42.3584}, 
#  'weather': [{'id': 800, 'main': 'Clear', 'description': 'clear sky', 'icon': '01n'}], 
#  'base': 'stations', 
#  'main': {'temp': 35.28, 
#  'feels_like': 26.64, 
#  'temp_min': 30.58, 
#  'temp_max': 38.52, 'pressure': 1030, 'humidity': 64}, 
#  'visibility': 10000, 
#  'wind': {'speed': 12.66, 'deg': 350}, 
#  'clouds': {'all': 0}, 'dt': 1699756031, 
#  'sys': {'type': 2, 'id': 2013408, 
#  'country': 'US', 
#  'sunrise': 1699702185, 'sunset': 1699738011}, 
#  'timezone': -18000, 'id': 4930956, 
#  'name': 'Boston', 'cod': 200}