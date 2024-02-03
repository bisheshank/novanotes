from flask import Flask
import flask

app = Flask(__name__)

# Members API Route
@app.route("/members")

def members():
    response = flask.jsonify({"members": ["Member1", "Member2", "Member3"]})
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

if __name__ == "__main__":
    # app.run(debug=True)
    app.run(host='0.0.0.0',port=4998)