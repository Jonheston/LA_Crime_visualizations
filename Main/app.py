from flask import (
    Flask,
    render_template,
    jsonify,
    request,
    redirect)
import pymongo
import pandas as pd

# flask setup
app = Flask(__name__)

conn = "mongodb://localhost:27017"
client = pymongo.MongoClient(conn)

db = client.crime_db
collection = db.violent_crime
# template rendering
@app.route("/")
def home():
    return render_template("index.html")

@app.route("/choropleth1")
def choro1():
    return render_template("VisJH1.html")

@app.route("/choropleth2")
def choro2():
    return render_template("VisJH2.html")

@app.route("/scatter1")
def scatter1():
    return render_template("VisSS1.html")

@app.route("/scatter2")
def scatter2():
    return render_template("VisSS2.html")

@app.route("/chartjs1")
def chart1():
    return render_template("timelines.html")

# @app.route("/chartjs2")
# def chart2():
#     return render_template("VisBK2.html")

if __name__ == "__main__":
    app.run(debug=True, port=8000)