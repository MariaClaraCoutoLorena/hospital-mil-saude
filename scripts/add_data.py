import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore
from json import load, loads, dumps
cred = credentials.Certificate("../hospital-mil-saude-firebase-adminsdk-fbsvc-5dea73190e.json")

app = firebase_admin.initialize_app(cred)
db = firestore.client()

with open('data.json') as json_file:

    data = load(json_file)
    schema = data["schema"]
    data_list = data["data"]
    collection_data = data["collection"]

final_json = [dict(zip(schema, data_set)) for data_set in data_list]

print(f"Adding the following json to {collection_data}: {final_json}")
for document in final_json:
    ref = db.collection(collection_data).add(document)

