#Dependencies and Setup
from flask import Flask, jsonify, render_template, redirect,request
# from flask_cors import CORS, cross_origin
import pymongo
from bson import json_util, ObjectId
import json

#use flask_pymongo to set up mongo connection
app = Flask(__name__)
conn = "mongodb://localhost:27017"
client = pymongo.MongoClient(conn)

# connect to mongo db and collection
db2 = client.barchart
weatherbar = db2.aus_weather_barchart


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

@app.route('/barsnscatters')
def barsnscatters():

    # use the input from html as a filter
    # stationid = request.form.get('selDataset2')
    # return(str(stationid )) # just to see what select is

    # stationid =str("ACT-Canberra Airport")
    bar_data = []
    for bdata in weatherbar.find():
        bdata.pop('_id') 
        bdata=bdata.copy()
        # bdatafilter={ key:value for (key,value) in bdata.items() if key [3] == stationid}
        # bdatafilter=bdatafilter.copy()
        bar_data.append(bdata)
    return jsonify(bar_data)

      
    

@app.route("/")
def welcome():
    return (
        f"Welcome to the Justice League API!<br/>"
        f"barsnscatters:<br/>"
        f"/foo"
    )


if __name__ == "__main__":
    app.run(debug=True)