import firebase_admin
from firebase_admin import credentials ,db, firestore
from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt
import os
from safesteps.utils import read_n_to_last_line
import datetime
cred = credentials.Certificate('privateKey.json')
firebase_admin.initialize_app(cred)

#Make sure to pip3 install firebase-admin
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


def about(request):
    return HttpResponse("SafeSteps is a project by a group of students in XC475. Contact BU Spark! for more information.")

def home(request):
    return JsonResponse({"info": "Django REST Framework", "name": "safesteps", "version": "0.0.1", "message": "Hello World!"})

@csrf_exempt
def form(request, name, value):
    ct = datetime.datetime.now()
    if request.method == 'POST':
        if not os.path.isfile("data.txt"):
            with open("data.txt", "w") as f:
                f.write(f"1.\t{name}\t{value}\t{ct}\n")
        else:
            with open("data.txt", "a") as f:
                last_line = read_n_to_last_line("data.txt")
                last_line_num = int(last_line.split(".")[0])
                f.write(f"{last_line_num + 1}.\t{name}\t{value}\t{ct}\n")
        return HttpResponse(f"Received! {name} {value} @ {ct}")
    else:
        return HttpResponse("Try again with a POST request!")
