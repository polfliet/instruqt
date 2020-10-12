while true; do  
    for i in {1..1000}
    do
        curl -S -X POST http://proxy/checkout > /dev/null
        sleep $(( ( RANDOM % 2000 )  + 1 )/100)
    done
done