# host
## network interface
iptables -A FORWARD -d 10.198.0.0/16 -j ACCEPT
ip netns exec phishns iptables -t nat -D PREROUTING -d 10.198.0.0/16 -j ACCEPT
ip netns exec phishns iptables -P FORWARD DROP

### veth
ifconfig veth_ph down
ip link delete veth_ph
iptables -D FORWARD -i veth_ph -j ACCEPT

ip netns exec phishns ip addr delete 10.198.0.1/16 dev veth_pg
ip netns exec phishns ifconfig veth_pg down

### tap0
iptables -D FORWARD -i tap0 -j ACCEPT
ifconfig tap0 down

### br_phish: bridge tap0 and veth_ph
brctl delif br_phish tap0
brctl delif br_phish veth_ph
ifconfig br_phish down
brctl delbr br_phish

iptables -D FORWARD -i br_phish -j ACCEPT

## DHCP
pkill -f "dhcp_server.js"

## DNS
pkill -f "dns_server.js"

## phishing site
### redirect to phishing site port
ip netns exec phishns iptables -t nat -D PREROUTING -p tcp -m tcp --dport 80 -j DNAT --to-destination 10.198.0.1:5080
ip netns exec phishns iptables -t nat -D PREROUTING -p tcp -m tcp --dport 443 -j DNAT --to-destination 10.198.0.1:5443
pkill -f "socat TCP-LISTEN:80,fork,reuseaddr TCP4:10.198.0.1:5080"
pkill -f "socat TCP-LISTEN:443,fork,reuseaddr TCP4:10.198.0.1:5443"

pkill -f "backend/server.js"

### dashboard
pkill -f "socat UNIX-LISTEN:/tmp/wall.sock,fork TCP4:127.0.0.1:5002"
pkill -f "socat TCP-LISTEN:5002,fork,reuseaddr UNIX-CONNECT:/tmp/wall.sock"

pkill -f "dashboard/server.js"
