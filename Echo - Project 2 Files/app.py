#Dependencies and Setup

from flask import Flask, render_template, redirect, jsonify
from flask_pymongo import PyMongo

#use flask_pymondo to set up mongo connection
app = Flask(__name__)
mongo = PyMongo(app, uri="mongodb://localhost:27017/bushfire_db")

#mainpage

@app.route("/")

def homepage():
    