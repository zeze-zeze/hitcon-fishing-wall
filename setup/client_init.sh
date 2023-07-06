openvpn client.ovpn &

sleep 5

brctl addbr br_phishclient
ifconfig br_phishclient up
brctl addif br_phishclient tap1
ifconfig tap1 up
brctl addif br_phishclient ens36
ifconfig ens36 up

iptables -A FORWARD -i br_phishclient -j ACCEPT