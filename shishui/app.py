#Dependencies and Setup
from flask import Flask, jsonify
from flask_cors import CORS, cross_origin
import pymongo


#use flask_pymongo to set up mongo connection
app = Flask(__name__)
CORS(app)
conn = "mongodb://localhost:27017"
client = pymongo.MongoClient(conn)

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

# @app.route('/january', methods=['GET'])
# @cross_origin()
# def foo():
#     output = []
#     for s in produce.find():
#         if  s['acq_date'] < "2019-02-01":
#             output.append({'date': s['acq_date'],
#                             'latitude': s['latitude'],
#                             'longitude': s['longitude'],
#                             'brightness': s['brightness']})
#     return jsonify(output)

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
def barsnscatters():

    bar_data = []
    for bdata in weatherbar.find():
        bdata.pop('_id') 
        bdata=bdata.copy()
        bar_data.append(bdata)
    return jsonify(bar_data)

@app.route('/letitgo')
def sliding():

    plots = []
    for pdata in slidebar.find():
        pdata.pop('_id') 
        pdata=pdata.copy()
        plots.append(pdata)
    return jsonify(plots)



if __name__ == "__main__":
    app.run(debug=True)