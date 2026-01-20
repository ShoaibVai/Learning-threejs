# Server, Web Hosting & Security
## Beginner → Expert Complete Course

> A practical, security-first, hands-on guide to understanding servers, hosting websites, exposing services publicly, and operating them safely in real-world environments.

---

## COURSE META

**Level:** Beginner to Expert  
**Format:** Guided Sessions (Learn → Practice → Test)  
**Target Audience:**  
- Web developers  
- Students learning infrastructure  
- Indie developers / game developers  
- Anyone hosting services publicly  

⚠️ **Important Safety Notice**  
This course uses **local machines for learning**.  
For real production use, always prefer **VPS or cloud servers**.

---

# TABLE OF CONTENTS

1. Foundations of Servers & Networking  
2. IP Addresses, Ports & NAT  
3. Local Servers & Hosting Basics  
4. Exposing a Local Machine Publicly  
5. Domain Names & DNS  
6. Reverse Proxies & Web Servers  
7. HTTPS, TLS & Certificates  
8. Server Security Fundamentals  
9. Advanced Server Hardening  
10. Monitoring, Logs & Maintenance  
11. Backups, Recovery & Incident Response  
12. Production Practices & Expert Concepts  

---

# MODULE 1 — FOUNDATIONS OF SERVERS & NETWORKING

## Goal
Build a **mental model** of how the internet works before touching hosting.

---

## Learn

### What Is a Server?
A server is a program that:
- Listens on a network port
- Receives requests
- Sends responses

A server is **not** defined by hardware — it is defined by **behavior**.

---

### Client–Server Model
- Client: Browser, app, game client
- Server: Web server, API, database

Flow:
```

Client → Request → Server → Response → Client

````

---

### How a Website Loads
1. Browser resolves domain via DNS
2. TCP connection established
3. HTTP request sent
4. Server processes request
5. Response returned
6. Browser renders content

---

## Practice

### Inspect a Live Request
1. Open browser DevTools
2. Go to Network tab
3. Visit any website
4. Inspect:
   - Request headers
   - Status codes
   - Remote address

---

## Test Yourself
- What role does DNS play?
- What happens before HTTP?
- Why is TCP important?

---

## References
- MDN: How the Web Works  
- Cloudflare Learning Center  
- RFC 2616 (HTTP)

---

# MODULE 2 — IP ADDRESSES, PORTS & NAT

## Goal
Understand why servers are **not reachable by default**.

---

## Learn

### IP Addresses
- Public IP: Visible on the internet
- Private IP: Internal network only

Private IP ranges:
- 192.168.0.0/16
- 10.0.0.0/8
- 172.16.0.0–172.31.255.255

---

### Ports
Ports identify services:
- 80 → HTTP
- 443 → HTTPS
- 22 → SSH

Multiple services can run on one IP using different ports.

---

### NAT (Network Address Translation)
Routers:
- Hide internal devices
- Block inbound traffic
- Translate public ↔ private IPs

This is why **port forwarding is required**.

---

## Practice

### Inspect Your Network
```bash
ipconfig        # Windows
ifconfig        # Linux/macOS
````

Find public IP:

```bash
curl ifconfig.me
```

List listening ports:

```bash
netstat -ano    # Windows
ss -tulpn       # Linux
```

---

## Test Yourself

* Why can’t private IPs be accessed publicly?
* What does NAT protect you from?

---

## References

* RFC 1918 (Private IPs)
* Cloudflare NAT Explained

---

# MODULE 3 — LOCAL SERVERS & HOSTING BASICS

## Goal

Run servers **correctly**, not accidentally.

---

## Learn

### localhost vs 0.0.0.0

* `localhost`: Local machine only
* `0.0.0.0`: All network interfaces

If you want LAN or public access, **0.0.0.0 is mandatory**.

---

## Practice — Build a Local Server

### Initialize Project

```bash
mkdir local-server
cd local-server
npm init -y
npm install express
```

### Create `server.js`

```js
const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("Server is running");
});

app.listen(3000, "0.0.0.0", () => {
  console.log("Listening on port 3000");
});
```

Run:

```bash
node server.js
```

Test:

* [http://localhost:3000](http://localhost:3000)
* http://<LAN-IP>:3000

---

## Test Yourself

* Why does binding matter?
* Why does localhost fail on other devices?

---

## References

* Node.js Documentation
* Express.js Guide

---

# MODULE 4 — EXPOSING A LOCAL MACHINE PUBLICLY

## Goal

Understand **how and why** machines become publicly reachable.

---

## Learn

### Port Forwarding

Maps:

```
PublicIP:ExternalPort → PrivateIP:InternalPort
```

Routers block inbound traffic by default for safety.

---

## Practice (Temporary & Controlled)

1. Login to router admin panel
2. Add port forwarding:

   * External port: 8080
   * Internal IP: local IP
   * Internal port: 3000
   * Protocol: TCP
3. Test from mobile data:

```
http://<public-ip>:8080
```

⚠️ Disable after testing.

---

## Test Yourself

* Why external and internal ports differ?
* What risks does port forwarding introduce?

---

## References

* Router NAT Documentation
* ISP CGNAT Explanations

---

# MODULE 5 — DOMAIN NAMES & DNS

## Goal

Control **how humans reach servers**.

---

## Learn

### DNS Records

* A Record → Domain → IP
* CNAME → Alias
* TTL → Cache duration

DNS is **cached heavily**, causing delayed updates.

---

## Practice — Local DNS Simulation

Edit hosts file:

**Windows**

```
C:\Windows\System32\drivers\etc\hosts
```

Add:

```
127.0.0.1 mysite.local
```

Test:

```
http://mysite.local
```

---

## Test Yourself

* Why DNS changes propagate slowly?
* What happens when TTL expires?

---

## References

* ICANN DNS Primer
* Cloudflare DNS Guides

---

# MODULE 6 — REVERSE PROXIES & WEB SERVERS

## Goal

Serve multiple services safely and cleanly.

---

## Learn

### Reverse Proxy

* Accepts public traffic
* Routes internally
* Hides internal ports
* Enables HTTPS

Common tools:

* Nginx
* Apache
* Caddy

---

## Practice — Nginx Reverse Proxy

Install:

```bash
sudo apt install nginx
```

Config example:

```nginx
server {
  listen 80;
  location / {
    proxy_pass http://localhost:3000;
  }
}
```

Reload:

```bash
sudo nginx -t
sudo systemctl reload nginx
```

---

## Test Yourself

* Why not expose app ports directly?
* How does proxy improve security?

---

## References

* Nginx Official Docs
* Mozilla Web Security Guidelines

---

# MODULE 7 — HTTPS, TLS & CERTIFICATES

## Goal

Secure data in transit.

---

## Learn

### TLS Does:

* Encrypts traffic
* Prevents MITM attacks
* Verifies server identity

HTTPS is **mandatory**, not optional.

---

## Learn (Conceptual)

* TLS handshake
* Certificates
* Certificate Authorities
* Let’s Encrypt

---

## References

* Let’s Encrypt Docs
* SSL Labs
* RFC 8446 (TLS 1.3)

---

# MODULE 8 — SERVER SECURITY FUNDAMENTALS

## Goal

Stop **automated attacks**.

---

## Learn

### Common Attacks

* Port scanning
* Brute-force SSH
* Exploit bots
* Credential stuffing

---

## Practice — Firewall (Linux Example)

```bash
sudo ufw allow ssh
sudo ufw allow 80
sudo ufw allow 443
sudo ufw enable
sudo ufw status
```

---

## Test Yourself

* Why “security by obscurity” fails?
* Why default-deny is safer?

---

## References

* OWASP Top 10
* Linux UFW Documentation

---

# MODULE 9 — ADVANCED SERVER HARDENING

## Learn

* Disable root login
* SSH key authentication
* Fail2Ban
* Least privilege
* Secrets management

---

## References

* CIS Benchmarks
* OpenSSH Security Docs

---

# MODULE 10 — MONITORING, LOGS & MAINTENANCE

## Learn

* CPU, RAM, disk monitoring
* Access vs error logs
* Detecting anomalies

---

## Practice

```bash
top
htop
df -h
```

---

## References

* Prometheus Docs
* Grafana Labs

---

# MODULE 11 — BACKUPS & INCIDENT RESPONSE

## Learn

* Backup types
* Restore testing
* Incident response flow

---

## Practice

Backup:

```bash
tar -czvf backup.tar.gz /var/www
```

Restore:

```bash
tar -xzvf backup.tar.gz
```

---

## Test Yourself

* Why untested backups are useless?
* What is RTO vs RPO?

---

## References

* NIST Backup Guidelines

---

# MODULE 12 — EXPERT PRACTICES & REAL-WORLD OPS

## Learn

* VPS vs cloud vs bare metal
* Scaling concepts
* Zero-downtime deployment
* Blue/green deployments
* Infrastructure as Code (intro)

---

## Expert Mindset Rules

* Assume breach
* Monitor everything
* Automate safely
* Document incidents
* Never trust client input

---

## Final Outcome

After completing this course, you can:

* Host servers confidently
* Expose services safely
* Secure infrastructure properly
* Maintain long-running systems
* Think like a production engineer

---

END OF COURSE