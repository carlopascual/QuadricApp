-------------------------
IMPORT JSON ARRAY SAMPLE:
-------------------------

While the database is running:

From the path of mongoDB,

./mongoimport --db quadric --collection companies --drop --file <path_to_companies.json> --jsonArray

So if mongoDB is located on 'QuadricApp-master/mongodb-osx-x86_64-3.2.5/bin/', the import can be setup like this:

./mongoimport --db quadric --collection companies --drop --file ../../src/app/resources/json/companies.json --jsonArray