# WebRTC-Detectable_CCTV

## Introduction
The project is to find a specific car on alleys and highways. Using the Raspberry Pi's camera module, it will act as a CCTV. The alarm will sound and serve to identify the situation through the LCD by arduino, after finding a particular car.

This proceeds with only four CCTVs (Raspberry Pi). But considering this as a actual situation, it can be applied to CCTVs and control systems that manage them all over the country and contribute as a solution for crime prevention.

<img src="https://user-images.githubusercontent.com/63901518/104932677-43866580-59eb-11eb-8a5d-8078441061bc.png" height=300>

You can manage the CCTV connected to the browser on one web page.
Each CCTV location can be checked on the map and a real-time screen is transmitted.  
At any time, you can select the vehicle you want to detect. The exclamation mark will occur and the alarm will sound where the vehicle is located. Then if necessary, you can receive pictures from that point.

## Requirements
- Raspberry Pi and camera module

<img src="https://user-images.githubusercontent.com/63901518/104931462-c9091600-59e9-11eb-9545-b4b47e36048f.png" height=200> <img src="https://user-images.githubusercontent.com/63901518/104931621-fc4ba500-59e9-11eb-9009-15bd3aea548e.png" height=200>


- Package / Framework


```bash
# based on Python 3.7
sudo apt-get update
sudo apt-get install python3-flask
pip3 install https://dl.google.com/coral/python/tflite_runtime-2.1.0.post1-cp37-cp37m-linux_armv7l.whl
```
Please use this [link](https://www.raspberrypi.org/software/operating-systems/) to install os in raspberry pi.  
You can also check how to install TensorFlow Lite in [link](https://www.tensorflow.org/lite/guide/python).


- Arduino Uno

<img src="https://user-images.githubusercontent.com/63901518/104931820-49c81200-59ea-11eb-8cda-e51dcbdccccf.png" height=200>

## How to run

## How to train
Basically, you can see a friendly description through this [repository](https://github.com/EdjeElectronics/TensorFlow-Lite-Object-Detection-on-Android-and-Raspberry-Pi) to obtain a TF model for raspberry pi.	If you already have the model you want to use, the only important part you need to do is convert the model to the tf_lite model.  
We provide an example model for distinguishing between red, green, yellow, and orange vehicles and you can run 'server.py' to see if they are running properly.
