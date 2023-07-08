# Setup Environment

![images](images/design.png)

## Overview
* AP: An access point functioning as a router and a Wi-Fi hotspot, with the additional capability of being a VPN client to redirect packets to remote Host.
* Host: A server serving as a VPN server, responsible for receiving packets redirected from AP and further redirecting them to Guest.
* Guest: A network namespace within a server, providing an isolated network environment separate from Host, designed to receive packets redirected from Host.

## Steps
### AP
#### Openvpn client
```
openvpn client.ovpn &
```

#### Bridge - br_phishclient
Bridge Openvpn client (tap1) and LAN (ens36)
```
brctl addbr br_phishclient
ifconfig br_phishclient up
brctl addif br_phishclient tap1
ifconfig tap1 up
brctl addif br_phishclient ens36
ifconfig ens36 up
```

### Host
#### Openvpn Server
Server config.
```
port 843
proto tcp-server
dev tap0
ca phish-ca.crt
cert phish-server1.crt
key phish-server1.key
dh dh2048.pem
server-bridge
client-to-client
keepalive 10 120
cipher AES-256-CBC
tls-auth phish_ta.key 0
push "dhcp-option DNS 10.198.0.1"
comp-lzo
verb 3
mute 20
```

Client config.
```
remote dev.hitcon2023.online 843
dev tap1
proto tcp-client
ca phish_ca.crt
cert phish_client.crt
key phish_client.key
tls-auth phish_ta.key 1
keepalive 10 120
cipher AES-256-CBC
key-direction 1
tls-client
comp-lzo
verb 3
mute 20
```

Enable tap0.
```
iptables -A FORWARD -i tap0 -j ACCEPT
ifconfig tap0 up
```

#### Namespace phish_ns
Create namespace phish_ns
```
ip netns add phishns
```

#### veth peer
Create veth peer veth_ph and veth_pg
```
ip link add veth_ph type veth peer name veth_pg
ip link set veth_ph up
ip link set veth_pg netns phishns
iptables -A FORWARD -i veth_ph -j ACCEPT

ip netns exec phishns ip link set veth_pg up
ip netns exec phishns ip addr add 10.198.0.1/16 dev veth_pg
```

#### Bridge - br_phish
Bridge Openvpn server (tap0) and veth_ph
```
brctl addbr br_phish
ifconfig br_phish up
brctl addif br_phish tap0
brctl addif br_phish veth_ph

iptables -A FORWARD -i br_phish -j ACCEPT
```

#### Dashboard
```
socat UNIX-LISTEN:/tmp/wall.sock,fork TCP4:127.0.0.1:5002 &
ip netns exec phishns socat TCP-LISTEN:5002,fork,reuseaddr UNIX-CONNECT:/tmp/wall.sock &

node ../dashboard-backend/server.js &
```

### Guest
#### DHCP Server
Dynamically assign IP to WiFi client and specify the DNS server. Implement [DHCP server](./dhcp_server/dhcp_server.js) with nodejs.

```
ip netns exec phishns node ./setup/dhcp_server/dhcp_server.js &
```

#### DNS Server
Resolve all domains to the IP of the phishing sites. Implement [DNS server](./dns_server/dns_server.js) with nodejs.
```
ip netns exec phishns node ./setup/dns_server/dns_server.js &
```

#### Phishing Site
Redirect all packets to 80 port and 443 port to 5080 port and 5443 port respectively.
```
ip netns exec phishns iptables -t nat -A PREROUTING -p tcp -m tcp --dport 80 -j DNAT --to-destination 10.198.0.1:5080
ip netns exec phishns iptables -t nat -A PREROUTING -p tcp -m tcp --dport 443 -j DNAT --to-destination 10.198.0.1:5443
ip netns exec phishns socat TCP-LISTEN:80,fork,reuseaddr TCP4:10.198.0.1:5080 &
ip netns exec phishns socat TCP-LISTEN:443,fork,reuseaddr TCP4:10.198.0.1:5443 &

ip netns exec phishns node ../backend/server.js &
```