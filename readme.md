Installing zookeeper


Run zookeeper
-------------
C:\>zkserver

Run kafka Server
----------------
C:\kafka_2.12-2.3.0>.\bin\windows\kafka-server-start.bat .\config\server.properties


Setup intstructions:
--------------------

Install Java SE Server JRE

Download Server JRE according to your OS and  CPU architecture from here.
Start JRE installation and installation directory can be selected as per your need or you can keep the default one.
Create an environment variable JAVA_HOME in “System Variables” section and set your JRE path in value.
Edit the environment variable “Path” in “System Variables” section and type “;%JAVA_HOME%\bin” at the end of the text already written there.
To confirm the Java installation, open the command prompt and type “java –version”. You should see the version of the java you just installed.
Zookeeper Installation

Download and extract Zookeeper using 7-zip from here. You can extract Zookeeper anywhere. For me, its C:\zookeeper-3.4.9
Go to your Zookeeper config directory. For me its C:\zookeeper-3.4.9\conf
Rename file “zoo_sample.cfg” to “zoo.cfg”
Open zoo.cfg in any text editor and edit dataDir=/tmp/zookeeper to C:\zookeeper-3.4.9\data(set as per your)
Create an environment variable ZOOKEEPER_HOME in “System Variables” section and set your Zookeeper path in value.
Edit the environment variable “Path” in “System Variables” section and type “;%ZOOKEEPER_HOME%\bin” at the end of the text already written there.
You can change the default Zookeeper port in zoo.cfg file (Default port 2181).
Open command prompt and type “zkserver” to start the Zookeeper on port 2181!
Setting Up Kafka

Download Apache Kafka binary and extract it using 7-zip from here. You can extract Zookeeper anywhere. For me, its C:\kafka_2.10-0.10.0.1.
Go to your Kafka config directory. For me its C:\kafka_2.10-0.10.0.1\config
Edit file “server.properties” and edit line “log.dirs=/tmp/kafka-logs” to “log.dir= C:\kafka_2.10-0.10.0.1\kafka-logs”.
Your Kafka will run on default port 9092 & connect to zookeeper’s default port which is 2181.
If your Zookeeper is running on some other machine, then you can edit “zookeeper.connect:2181″ to your custom IP and port. Kafka port & broker id are configurable in this file.
Open config\zookeeper.properties, change dataDir=/tmp/zookeeper to dataDir=c:/kafka_2.10-0.10.0.1/zookeeper-data
Start Zookeeper

Kafka uses Zookeeper so you need to first start a Zookeeper server. Open command prompt and move to directory C:/kafka_2.10-0.10.0.1/z(For my case)
Enter and hit: .\bin\windows\zookeeper-server-start.bat .\config\zookeeper.properties
This will start the Zookeeper.
Start Kafka

Open another command prompt and and move to directory C:/kafka_2.10-0.10.0.1/z(For my case)
Enter and hit: .\bin\windows\kafka-server-start.bat .\config\server.properties
This will start the Kafka.


------------------------------------------------------------------------------------------------

setting up parity in dev mode:
download parity.exe 
run :
parity --config dev --jsonrpc-apis "web3","eth","net","private","parity","personal" --jsonrpc-cors "https://remix.ethereum.org"
(OR)
parity --config dev --ws-origins all --ws-hosts all --jsonrpc-interface all --jsonrpc-cors all

Setting up web3 environment:
----------------------------
npm install web3 --save
npm install express --save
npm install ethereumjs-tx --save

Test RPC:
---------
curl --data "{\"method\":\"web3_clientVersion\",\"params\":[],\"id\":1,\"jsonrpc\":\"2.0\"}" -H "Content-Type: application/json" -X POST localhost:8545

this should, return
{"jsonrpc":"2.0","result":"Parity-Ethereum//v2.5.7-stable-6bd7db96fe-20190829/x86_64-windows-msvc/rustc1.37.0","id":1}


parity POA:

 https://wiki.parity.io/Demo-PoA-tutorial
----------
curl --data "{\"jsonrpc\":\"2.0\",\"method\":\"parity_newAccountFromPhrase\",\"params\":[\"node0\", \"node0\"],\"id\":0}" -H "Content-Type: application/json" -X POST localhost:8540

returns : 0x00bd138abd70e2f00903268f3db08f2d25677c9e

curl --data "{\"jsonrpc\":\"2.0\",\"method\":\"parity_newAccountFromPhrase\",\"params\":[\"user\", \"user\"],\"id\":0}" -H "Content-Type: application/json" -X POST localhost:8540

returns:0x004ec07d2329997267ec62b4166639513386f32e

curl --data "{\"jsonrpc\":\"2.0\",\"method\":\"parity_newAccountFromPhrase\",\"params\":[\"node1\", \"node1\"],\"id\":0}" -H "Content-Type: application/json" -X POST localhost:8541
returns:0x00aa39d30f0d20ff03a22ccfc30b7efbfca597c2

finding ENODE
-------------
curl --data "{\"jsonrpc\":\"2.0\",\"method\":\"parity_enode\",\"params\":[],\"id\":0}" -H "Content-Type: application/json" -X POST localhost:8540

enode://bd077a41ff75ee65a320c5a76bbc853faf62af6130b2f95d5a00c44ad2c221900665f7f525dd77c6608954abb1bb98b90de1764f06e392abe16c91741f120af1@127.0.0.1:30300

curl --data "{\"jsonrpc\":\"2.0\",\"method\":\"parity_addReservedPeer\",\"params\":[\"enode://bd077a41ff75ee65a320c5a76bbc853faf62af6130b2f95d5a00c44ad2c221900665f7f525dd77c6608954abb1bb98b90de1764f06e392abe16c91741f120af1@127.0.0.1:30300\"],\"id\":0}" -H "Content-Type: application/json" -X POST localhost:8541