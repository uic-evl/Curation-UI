const { MongoClient, ObjectID } = require ('mongodb');
const { images } = require('./microscopy_images');
const { modalities } = require('./modalities');
const { accessControlList } = require('./accessControl');

MongoClient.connect('mongodb://curator_:curator_@localhost:27017/curation', (err, db) => {
  if (err) {
    return console.log('Unable to connect to MongoDB server.');
  }
  console.log('Connected to MongoDB Energy server');
  //createModalities(db);
  //createTrainingData(db);
  createAccessControl(db);
});

function createTrainingData(db) {
  let training_collection = db.collection("training");
  images.forEach(image => {
    training_image = {
      'name': image.name,
      'modality1': 'Experimental',
      'modality2': 'Microscopy',
      'modality3': '',
      'modality4': '',
      'other_modality1': '',
      'state': 'to review',
      'last_update': null,
      'lost_modifier': null,
      'observations': '',
      'is_compound': false,
      'shared_modality': false,
      'needs_cropping': false,
    };

    training_collection.save(training_image);
  });
  console.log("Inserted " + images.length + " training images");
}

function createModalities(db) {
  let modalities_collection = db.collection("modalities");
  modalities.forEach(modality => {
    modalities_collection.save(modality);
  });
  console.log("Inserted " + modalities.length + " entries");
}

function createAccessControl(db){
  let accessCollection = db.collection("accessControlList");
  accessControlList.forEach(rule => {
    accessCollection.save(rule);
  });
  console.log("Inserted " + accessControlList.length + " access control rules");
}