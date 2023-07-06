pkill -f "openvpn"

ifconfig br_phishclient down
brctl delbr br_phishclient
ifconfig tap1 down
brctl delif br_phishclient tap1
ifconfig ens36 down
brctl delif br_phishclient ens36

iptables -D FORWARD -i br_phishclient -j ACCEPT