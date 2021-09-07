from flask import Flask, jsonify
from flask_cors import CORS, cross_origin
import pymongo


#################################################
# Flask Setup
#################################################
app = Flask(__name__)
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
# setup mongo connection
conn = "mongodb://localhost:27017"
client = pymongo.MongoClient(conn)

# connect to mongo db and collection
db = client.bushfires
produce = db.fire

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

@app.route("/")
def welcome():
    return (
        f"Welcome to the Justice League API!<br/>"
        f"Available Routes:<br/>"
        f"/foo"
    )


if __name__ == "__main__":
    app.run(debug=True)
