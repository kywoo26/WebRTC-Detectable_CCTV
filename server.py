import tensorflowlite_api as tflite
import os
from PIL import Image
from flask import Flask, request, Response
from flask_cors import CORS, cross_origin

app = Flask(__name__)
CORS(app)

# for CORS
@app.after_request
def after_request(response):
    response.headers.add('Access-Control-Allow-Origin', '*')
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
    response.headers.add('Access-Control-Allow-Methods', 'GET,POST') # Put any other methods you need here
    return response


@app.route('/')
def index():
    return Response('4885')


@app.route('/local')
def local():
    return Response(open('./static/local.html').read(), mimetype="text/html")


@app.route('/video')
def remote():
    return Response(open('./static/video.html').read(), mimetype="text/html")


@app.route('/test')
def test():
    image_path = 'test.jpg'
    objects = tflite.get_objects(image_path)

    return objects


@app.route('/image', methods=['POST'])
@cross_origin()
def image():
    try:
        image_path = request.files['image']  # get the image

        # Set an image confidence threshold value to limit returned data
        #threshold = request.form.get('threshold')
        #if threshold is None:
        #    threshold = 0.5
        #else:
        #    threshold = float(threshold)
        
        # finally run the image through tensor flow object detection`
        #image_object = Image.open(image_file)
        
        
        #objects = object_detection_api.get_objects(image_object, threshold)
        objects = tflite.get_objects(image_path)
        return objects

    except Exception as e:
        print('POST /image error: %e' % e)
        return e


if __name__ == '__main__':
    # without SSL
    #app.run(debug=True, host='0.0.0.0')

    # with SSL
    
    app.run(debug=True, host='0.0.0.0', ssl_context=('SSL/cert.pem', 'SSL/key.pem'))
