#Dependencies and Setup
from flask import Flask, jsonify
from flask_cors import CORS, cross_origin
import pymongo


#use flask_pymongo to set up mongo connection
app = Flask(__name__)
cors = CORS(app, resources={r"/letitgo": {"origins": "*"}})
cors = CORS(app, resources={r"/barsnscatters": {"origins": "*"}})
cors = CORS(app, resources={r"/january": {"origins": "*"}})
cors = CORS(app, resources={r"/february": {"origins": "*"}})
cors = CORS(app, resources={r"/march": {"origins": "*"}})
cors = CORS(app, resources={r"/april": {"origins": "*"}})
cors = CORS(app, resources={r"/may": {"origins": "*"}})
cors = CORS(app, resources={r"/june": {"origins": "*"}})
cors = CORS(app, resources={r"/july": {"origins": "*"}})
cors = CORS(app, resources={r"/august": {"origins": "*"}})
cors = CORS(app, resources={r"/september": {"origins": "*"}})
cors = CORS(app, resources={r"/october": {"origins": "*"}})
cors = CORS(app, resources={r"/november": {"origins": "*"}})
cors = CORS(app, resources={r"/december": {"origins": "*"}})
app.config['CORS_HEADERS'] = 'Content-Type'
app.config["MONGO_URI"] = "mongodb://localhost:27017/bushfires"

conn = "mongodb://localhost:27017"
client = pymongo.MongoClient(conn)

db11 = client.bushfires
produce = db11.fire

# connect to mongo db and collection
db11 = client.bushfires
slidebar = db11.harmful_gas

# connect to mongo db and collection - below are from echo & rachel==============
db2 = client.barchart
weatherbar = db2.aus_weather_barchart
#================================================================================

#################################################
# Flask Routes
#################################################

@app.route('/january', methods=['GET'])
@cross_origin()
def january():
    output = []
    for s in produce.find():
        if  s['acq_date'] < "2019-02-01":
            output.append({'date': s['acq_date'],
                            'latitude': s['latitude'],
                            'longitude': s['longitude'],
                            'brightness': s['brightness']})
    return jsonify(output)

@app.route('/february', methods=['GET'])
@cross_origin()
def february():
    output = []
    for s in produce.find():
        if  s['acq_date'] >= "2019-02-01":
            if s['acq_date'] < "2019-03-01":
                output.append({'date': s['acq_date'],
                                'latitude': s['latitude'],
                                'longitude': s['longitude'],
                                'brightness': s['brightness']})
    return jsonify(output)


@app.route('/march', methods=['GET'])
@cross_origin()
def march():
    output = []
    for s in produce.find():
        if  s['acq_date'] >= "2019-03-01":
            if s['acq_date'] < "2019-04-01":
                output.append({'date': s['acq_date'],
                                'latitude': s['latitude'],
                                'longitude': s['longitude'],
                                'brightness': s['brightness']})
    return jsonify(output)

@app.route('/april', methods=['GET'])
@cross_origin()
def april():
    output = []
    for s in produce.find():
        if  s['acq_date'] >= "2019-04-01":
            if s['acq_date'] < "2019-05-01":
                output.append({'date': s['acq_date'],
                                'latitude': s['latitude'],
                                'longitude': s['longitude'],
                                'brightness': s['brightness']})
    return jsonify(output)

@app.route('/may', methods=['GET'])
@cross_origin()
def may():
    output = []
    for s in produce.find():
        if  s['acq_date'] >= "2019-05-01":
            if s['acq_date'] < "2019-06-01":
                output.append({'date': s['acq_date'],
                                'latitude': s['latitude'],
                                'longitude': s['longitude'],
                                'brightness': s['brightness']})
    return jsonify(output)

@app.route('/june', methods=['GET'])
@cross_origin()
def june():
    output = []
    for s in produce.find():
        if  s['acq_date'] >= "2019-06-01":
            if s['acq_date'] < "2019-07-01":
                output.append({'date': s['acq_date'],
                                'latitude': s['latitude'],
                                'longitude': s['longitude'],
                                'brightness': s['brightness']})
    return jsonify(output)

@app.route('/july', methods=['GET'])
@cross_origin()
def july():
    output = []
    for s in produce.find():
        if  s['acq_date'] >= "2019-07-01":
            if s['acq_date'] < "2019-08-01":
                output.append({'date': s['acq_date'],
                                'latitude': s['latitude'],
                                'longitude': s['longitude'],
                                'brightness': s['brightness']})
    return jsonify(output)


@app.route('/august', methods=['GET'])
@cross_origin()
def august():
    output = []
    for s in produce.find():
        if  s['acq_date'] >= "2019-08-01":
            if s['acq_date'] < "2019-09-01":
                output.append({'date': s['acq_date'],
                                'latitude': s['latitude'],
                                'longitude': s['longitude'],
                                'brightness': s['brightness']})
    return jsonify(output)


@app.route('/september', methods=['GET'])
@cross_origin()
def september():
    output = []
    for s in produce.find():
        if  s['acq_date'] >= "2019-09-01":
            if s['acq_date'] < "2019-10-01":
                output.append({'date': s['acq_date'],
                                'latitude': s['latitude'],
                                'longitude': s['longitude'],
                                'brightness': s['brightness']})
    return jsonify(output)

@app.route('/october', methods=['GET'])
@cross_origin()
def october():
    output = []
    for s in produce.find():
        if  s['acq_date'] >= "2019-10-01":
            if s['acq_date'] < "2019-11-01":
                output.append({'date': s['acq_date'],
                                'latitude': s['latitude'],
                                'longitude': s['longitude'],
                                'brightness': s['brightness']})
    return jsonify(output)


@app.route('/november', methods=['GET'])
@cross_origin()
def november():
    output = []
    for s in produce.find():
        if  s['acq_date'] >= "2019-11-01":
            if s['acq_date'] < "2019-12-01":
                output.append({'date': s['acq_date'],
                                'latitude': s['latitude'],
                                'longitude': s['longitude'],
                                'brightness': s['brightness']})
    return jsonify(output)


@app.route('/december', methods=['GET'])
@cross_origin()
def december():
    output = []
    for s in produce.find():
        if  s['acq_date'] >= "2019-12-01":
            if s['acq_date'] < "2020-01-01":
                output.append({'date': s['acq_date'],
                                'latitude': s['latitude'],
                                'longitude': s['longitude'],
                                'brightness': s['brightness']})
    return jsonify(output)

#==================echo & rachel========================

#========================================================

@app.route("/")
def welcome():
    return (
        f"Matt Part: Sliding bar<br/>"
        f"SO2 and PM2.5 over time on monthly avg:<br/>"
        f"/letitgo<br/>"
        f"/barsnscatters"
    )
@app.route('/barsnscatters')
@cross_origin()
def barsnscatters():

    bar_data = []
    for bdata in weatherbar.find():
        bdata.pop('_id') 
        bdata=bdata.copy()
        bar_data.append(bdata)
    return jsonify(bar_data)

@app.route('/letitgo')
@cross_origin()
def sliding():

    plots = []
    for pdata in slidebar.find():
        pdata.pop('_id') 
        pdata=pdata.copy()
        plots.append(pdata)
    return jsonify(plots)



if __name__ == "__main__":
    app.run(debug=True)