from flask import Flask, jsonify
from flask_cors import CORS, cross_origin
import pymongo


#################################################
# Flask Setup
#################################################
app = Flask(__name__)
# cors = CORS(app, resources={r"/foo": {"origins": "*"}})
# app.config['CORS_HEADERS'] = 'Content-Type'
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

@app.route('/foo', methods=['GET'])
def foo():
    output = []
    for s in produce.find():
        if  s['acq_date'] > "2019-11-31":
            output.append({'date': s['acq_date'],
                            'latitude': s['latitude'],
                            'longitude': s['longitude'],
                            'brightness': s['brightness']})
    return jsonify({'result': output})



@app.route("/")
def welcome():
    return (
        f"Welcome to the Justice League API!<br/>"
        f"Available Routes:<br/>"
        f"/foo"
    )


if __name__ == "__main__":
    app.run(debug=True)
