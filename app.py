from flask import Flask, jsonify, render_template
from flask_frozen import Freezer
from flask_cors import CORS
import pandas as pd
import urllib.parse

app = Flask(__name__)
freezer = Freezer(app)
CORS(app)  

@app.route('/catalogue.json', methods=['GET'])
def get_catalogue_data():
    df = pd.read_excel('data/SPUR_Catalogue_Manual - Copy (3).xlsx')  
    columns_order = ['Title', 'Author', 'Year', 'Series', 'Edition', 'ISBN', 'Book Website', 'Owner', 'Format', 'Subject Matter', 'Shelf']
    existing_columns = [col for col in columns_order if col in df.columns]
    df = df.reindex(columns=columns_order)
    data = df.to_dict(orient='records')
    response = jsonify(data)
    response.headers.add('Content-Type', 'application/json')
    print(data[0].keys())  
    return jsonify(data)

@app.route('/')
def home():
    return render_template('webpage.html')

if __name__ == '__main__':
    app.run(debug=True)