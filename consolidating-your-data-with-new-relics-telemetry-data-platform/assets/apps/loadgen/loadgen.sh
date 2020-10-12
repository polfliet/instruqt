while true; do  
    for i in {1..1000}
    do
        curl -S -X POST http://proxy/checkout > /dev/null
        sleep $(( ( RANDOM % 3 )  + 1 ))
    done
done