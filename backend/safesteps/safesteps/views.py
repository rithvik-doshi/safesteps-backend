import firebase_admin
from firebase_admin import credentials ,db, firestore
cred = credentials.Certificate('privateKey.json')
firebase_admin.initialize_app(cred)

#The object to connect with the firestore database
db = firestore.client()

data1 = {
    'Email1': 'kityan3002@gmail.com',
    'Name1': 'Kit Chung Yan'
}

doc_ref = db.collection('Users').document('Kit')
doc_ref.set(data1)
data2 = {
    'Email2': '001@gmail.com',
    'Name2': 'Tyreek Hill',
}
doc_ref = db.collection('Users').document('Tyreek Hill')
doc_ref.set(data2)

#existing_data = doc_ref.get().to_dict()
# merged_data = {**existing_data, **data1, **data2}
# doc_ref.set(merged_data)
data_3 ={ 
    "Team": "New England Patriots",
    "Jersey Number": 12,
}
doc_ref = db.collection('Users').document('Tom Brady')
doc_ref.set(data_3)
print("Document id", doc_ref.id)