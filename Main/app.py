from flask import (
    Flask,
    render_template,
    jsonify,
    request,
    redirect)

# flask setup
app = Flask(__name__)

# template rendering
@app.route("/")
def home():
    return render_template("index.html")

@app.route("/choropleth")
def home():
    return render_template("VisJH1.html")

@app.route("/choropleth")
def home():
    return render_template("VisJH2.html")

@app.route("/scatter")
def home():
    return render_template("VisSS1.html")

@app.route("/scatter")
def home():
    return render_template("VisSS2.html")

@app.route("/chartjs")
def home():
    return render_template("VisBK1.html")

@app.route("/chartjs")
def home():
    return render_template("VisBK2.html")

if __name__ == "__main__":
    app.run(debug=True, port=8000)