#!/bin/bash
if [ "$#" -ne 1 ]; then
    echo "Specify the frontend service IP, for example: ./loadgen.sh <frontend_svc_ip>"
    exit
fi

HOST=$1

while true; do  
for i in {1..1000}
do
        curl -d "message=automated_message_$i" -X POST http://$HOST/message 
        sleep $(( ( RANDOM % 10 )  + 1 ))
done
done
