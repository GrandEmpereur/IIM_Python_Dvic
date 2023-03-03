from machine import Pin
import time
from dht import DHT11
import network   #import des fonction lier au wifi
import urequests	#import des fonction lier au requetes http
import utime	#import des fonction lier au temps
import ujson	#import des fonction lier aà la convertion en Json

# DHT11 sensor
sensor = DHT11(Pin(19, Pin.OUT, Pin.PULL_DOWN))
#sensor.measure()
print("ok")
# Sensor function
def Temperature():
    if sensor.temperature() > 40:
        return 1
    # if temperature is lower than 20 degrees turn on green led
    elif sensor.temperature() < 20:
        return 2
    # if temperature is between 30 and 40 degrees turn on blue led
    elif sensor.temperature() > 20 and sensor.temperature() < 40 :
        return 3

def Humidity():
    if sensor.humidity() > 80:
        return 1
    # if humidity is lower than 40% turn on green led
    elif sensor.humidity() < 40:
        return 2
    # if humidity is between 40 and 80% turn on blue led
    elif sensor.humidity() > 40 and sensor.humidity() < 80 :
        return 3

# RGB led
redTemp = Pin(16, Pin.OUT)
greenTemp = Pin(17, Pin.OUT)
blueTemp = Pin(18, Pin.OUT)

redHum = Pin(15, Pin.OUT)
greenHum = Pin(14, Pin.OUT)
blueHum = Pin(13, Pin.OUT)


# Response function
def Response(Temperature, Humidity):
    if Temperature == 1:
        redTemp.on()
        greenTemp.off()
        blueTemp.off()
    elif Temperature == 2:
        redTemp.off()
        greenTemp.off()
        blueTemp.on()
    elif Temperature == 3:
        redTemp.off()
        greenTemp.on()
        blueTemp.off()

    if Humidity == 1:
        redHum.on()
        greenHum.off()
        blueHum.off()
    elif Humidity == 2:
        redHum.off()
        greenHum.off()
        blueHum.on()
    elif Humidity == 3:
        redHum.off()
        greenHum.on()
        blueHum.off()

# network
wlan = network.WLAN(network.STA_IF) # met la raspi en mode client wifi
wlan.active(True) # active le mode client wifi

ssid = 'iPhone de L’Empereur ⚜️'
password = 'Empereurbkn1'
wlan.connect(ssid, password) # connecte la raspi au réseau
url = "http://172.20.10.9:4200/api/create/sensors"

# Loop
while True:
    sensor.measure()
    print("Temperature: %3.1f C" % sensor.temperature())
    print("Humidity: %3.1f %%" % sensor.humidity())
    Response(Temperature(), Humidity())

    # send data to api 
    try:
        print("POST")
        data = ujson.dumps({
            "temperature": {
                "value": sensor.temperature(),
                "ledActivate": Temperature()
            },
            "humidity": {
                "value": sensor.humidity(),
                "ledActivate": Humidity()
            }
        })
        print(data)
        headers = {'Content-Type': 'application/json'}
        r = urequests.post(url, data=data, headers=headers)
        print(f"data send to database with data : {data}")
        r.close()
    except Exception as e:
        print(e)
        utime.sleep(5)

    time.sleep(10)

