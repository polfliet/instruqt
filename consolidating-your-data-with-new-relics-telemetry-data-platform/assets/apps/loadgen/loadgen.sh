while true; do  
    for i in {1..1000}
    do
        curl http://proxy/checkout 
        sleep $(( ( RANDOM % 10 )  + 1 ))
    done
done