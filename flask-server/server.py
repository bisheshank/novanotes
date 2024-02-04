from flask import Flask
import flask
from flask_cors import CORS

########################## GLOBAL VARIABLES ##########################

# each journal post will be a dictionary
journal_posts = []


######################################################################

app = Flask(__name__)
CORS(app)

# getDataJournal API Route
@app.route("/getDataJournal", methods=['GET'])
def get_data_journal():
    response = flask.jsonify({"members": ["Member1", "Member2", "Member3"]})
    response.headers.add('Access-Control-Allow-Origin', '*')
    print("GET_DATA_JOURNAL WORKED!!!")
    return response

# postDataJournal API Route
@app.route("/postDataJournal", methods=['POST'])
def post_data_journal():
    data = flask.request.json
    tmp_journal_post = {}
    tmp_journal_post["topic"] = data.get('topic', '')
    tmp_journal_post["body"] = data.get('body', '')
    tmp_journal_post["date"] = data.get('date', '')
    tmp_journal_post["timeTaken"] = data.get('timeTaken', '')
    print("POST_DATA_JOURNAL WORKED!!!")
    print('Received journal data: ', tmp_journal_post)
    journal_posts.append(tmp_journal_post)

    response = flask.jsonify({'message': 'Data received successfully'})
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

# getDataMain API Route
@app.route("/getDataMain", methods=['GET'])
def get_data_main():
    response = flask.jsonify(journal_posts)
    print("GET_DATA_MAIN WORKED!!!")
    print(journal_posts)
    print(response)
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

if __name__ == "__main__":
    # app.run(debug=True)
    app.run(host='0.0.0.0',port=4997)