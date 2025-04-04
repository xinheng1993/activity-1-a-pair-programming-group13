from flask import Flask, request, jsonify
from flask_cors import CORS
import requests

app = Flask(__name__)
CORS(app)

apiKey = "e2224ddc5efcf07f251db8f7a554d1b2"
url = "https://api.openweathermap.org/data/2.5/weather"

@app.route('/lookup', methods=['POST'])
def lookup():
    city = request.json.get('cityName')
    
    # Check if the cityName was provided in the request
    if not city:
        return jsonify({"Error": "City name is required"}), 400
    
    try:
        response = requests.get(url, params={"q": city, "units": "metric", "appid": apiKey})       
        data = response.json()
        return data
    
    except Exception as error:
        print(f"Error occurred: {error}")
        return jsonify({"Error": "Error fetching weather data"}), 500

if __name__ == '__main__':
    app.run(debug=True)
