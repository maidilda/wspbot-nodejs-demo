from flask import Flask, render_template


app = Flask(__name__)

##RUTA 
@app.route('/')
def index():
    return render_template('front.html')

