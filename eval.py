import json
from os import listdir, getcwd
from os.path import join

VAL_PATH = join(getcwd(), 'dist', 'images', 'validation')
folders = listdir(VAL_PATH)

val_images = []
for folder in folders:
  FOLDER_PATH = join(VAL_PATH, folder)
  images = listdir(FOLDER_PATH)

  for name in images:
    image = {}
    image['name'] = name
    image['folder'] = folder
    image['modality1'] = ''
    image['modality2'] = ''
    image['modality3'] = ''
    image['modality4'] = ''
    image['other_modality1'] = ''
    image['state'] = 'to review'
    image['last_update'] = None
    image['last_modifier'] = None
    image['observations'] = ''
    image['is_compound'] = False
    image['shared_modality'] = False
    image['needs_cropping'] = False
    image['curator'] = ''
    val_images.append(image)
json_data = json.dumps(val_images)
with open('dump.json', 'w') as outfile:
    json.dump(json_data, outfile)

