# Business search catalog

## Requirements

1. [Node.js](https://nodejs.org/en/)
2. Bower ('npm install -g bower' or 'npm install')
3. Karma ('npm install -g karma' or 'npm install')
4. [Curl](https://curl.haxx.se/dlwiz/)
5. [ES](https://www.elastic.co/products/elasticsearch) (repository consist it)
6. [Java](http://www.oracle.com/technetwork/java/javase/downloads/index.html) (JAVA_HOME variable in environment)
7. [Postman](https://chrome.google.com/webstore/detail/postman-rest-client-short/mkhojklkhkdaghjjfdnphfphiaiohkef) (Chrome plugin, optionally)
8. CORS Plugin [Mozilla Firefox] (https://addons.mozilla.org/ru/firefox/addon/cors-everywhere/) [Google Chrome] (https://chrome.google.com/webstore/detail/allow-control-allow-origi/nlfbmbojpeacfghkpbjhddihlkkiljbi)

## How to start

1. Clone/download this repo
2. 1st cmd: Go to bs-catalog-master/elasticsearch-2.2.0/bin, then run elasticsearch.bat
3. Create an index in ES through Postman or curl (index description in [es-index-create.txt](https://github.com/EmperorPeter3/bs-catalog/blob/master/es-index-create.txt) file)
4. Import generated data by running command: curl -XPUT localhost:9200/_bulk --data-binary @es_index_data.json
5. 2nd cmd: Go to bs-catalog-master/bs-catalog, then run npm start (If you get an error with server starting, try to change in script 'package.json' value of'http-server' to '^0.6.1' or '^0.8.5')
6. Go to main ES page (default: http://localhost:9200/) and get CORS on.
7. Go to main node.js page (default: http://localhost:8000/app/index.html) , get CORS on and than you have access.
