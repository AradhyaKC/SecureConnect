array1=$1
array2=$2

# echo $array1
# echo ips are $array2

# use this command to see the entries in the iptables:
# sudo iptables-legacy -L

command=$(sudo iptables-legacy -F)

for port in $array1; do
    for ipAddress in $array2;do
        echo $port $ipAddress 
        allowIp=$(sudo iptables-legacy -A INPUT -s $ipAddress -p tcp  --dport $port -j ACCEPT)
    done
done

for port in $array1;do
    reject_command=$(sudo iptables-legacy -A INPUT -p tcp --dport $port -j REJECT)
done