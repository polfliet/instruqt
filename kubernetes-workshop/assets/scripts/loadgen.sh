
while true; do  
    for i in {1..1000}
    do
        HOST=`kubectl get svc frontend -n demo-app | grep frontend | awk '{print $3}'`
        curl -d "message=automated_message_$i" -X POST http://$HOST/message 
        sleep $(( ( RANDOM % 10 )  + 1 ))
    done
done
