while true; do  
    for i in {1..1000}
    do
        curl -X POST http://proxy/checkout 
        sleep $(( ( RANDOM % 10 )  + 1 ))
    done
done