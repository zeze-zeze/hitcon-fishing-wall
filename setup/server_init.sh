# host
## network interface
ip netns add phishns
iptables -A FORWARD -d 10.198.0.0/16 -j ACCEPT
ip netns exec phishns iptables -t nat -A PREROUTING -d 10.198.0.0/16 -j ACCEPT
ip netns exec phishns iptables -P FORWARD ACCEPT

### veth
ip link add veth_ph type veth peer name veth_pg
ip link set veth_ph up
ip link set veth_pg netns phishns
iptables -A FORWARD -i veth_ph -j ACCEPT

ip netns exec phishns ip link set lo up
ip netns exec phishns ip link set veth_pg up
ip netns exec phishns ip addr add 10.198.0.1/16 dev veth_pg

### tap0
ifconfig tap0 up
iptables -A FORWARD -i tap0 -j ACCEPT

### br_phish: bridge tap0 and veth_ph
brctl addbr br_phish
ifconfig br_phish up
brctl addif br_phish tap0
brctl addif br_phish veth_ph
ip addr add 10.198.0.6/16 dev br_phish

iptables -A FORWARD -i br_phish -j ACCEPT

## DHCP
ip netns exec phishns node ./dhcp_server/dhcp_server.js &

## DNS
ip netns exec phishns node ./dns_server/dns_server.js &

## phishing site
### redirect to phishing site port
ip netns exec phishns iptables -t nat -A PREROUTING -p tcp -m tcp --dport 80 -j DNAT --to-destination 10.198.0.1:5080
ip netns exec phishns iptables -t nat -A PREROUTING -p tcp -m tcp --dport 443 -j DNAT --to-destination 10.198.0.1:5443
ip netns exec phishns socat TCP-LISTEN:80,fork,reuseaddr TCP4:10.198.0.1:5080 &
ip netns exec phishns socat TCP-LISTEN:443,fork,reuseaddr TCP4:10.198.0.1:5443 &

ip netns exec phishns node ../backend/server.js &

### dashboard: Use socat to communicate between Phishing site and dashboard. See ../dashboard/ to understand how to setup dashboard.
socat UNIX-LISTEN:/tmp/wall.sock,fork TCP4:127.0.0.1:15000 &
ip netns exec phishns socat TCP-LISTEN:15000,fork,reuseaddr UNIX-CONNECT:/tmp/wall.sock &
