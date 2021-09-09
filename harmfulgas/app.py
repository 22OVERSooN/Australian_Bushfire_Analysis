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

@app.route("/")
def welcome():
    return (
        f"Matt Part: Sliding bar<br/>"
        f"SO2 and PM2.5 over time on monthly avg:<br/>"
        f"/letitgo"
    )


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