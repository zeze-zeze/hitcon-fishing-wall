var dhcpd = require('dhcp');
var i = 0;
var s = dhcpd.createServer({
  // System settings
  range: [
    "10.198.0.50", "10.198.254.254"
  ],
  forceOptions: ['hostname'], // Options that need to be sent, even if they were not requested
  static: {
  },
  // Option settings
  netmask: '255.255.0.0',
  router: [
    '10.198.0.1'
  ],
  dns: ["10.198.0.1"],
  server: '10.198.0.1', // This is us
  hostname: function () { return '2023hitcon' + i++; }
});

s.listen();

