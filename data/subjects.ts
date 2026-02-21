export type Flashcard = {
  question: string;
  answer: string;
};

export type Topic = {
  id: string;
  title: string;
  notes: string[];
  flashcards: Flashcard[];
};

export const topics: Topic[] = [
  {
    id: "networking",
    title: "Networking Fundamentals",
    notes: [
      "The OSI model has 7 layers: Physical, Data Link, Network, Transport, Session, Presentation, Application",
      "TCP is connection-oriented and reliable; UDP is connectionless and faster",
      "DNS translates domain names into IP addresses",
      "A firewall filters traffic based on rules to protect a network",
      "Common ports: HTTP (80), HTTPS (443), SSH (22), FTP (21), DNS (53)",
    ],
    flashcards: [
      { question: "What does DNS stand for?", answer: "Domain Name System" },
      { question: "What layer does IP operate on?", answer: "Layer 3 - Network layer" },
      { question: "What is the difference between TCP and UDP?", answer: "TCP is reliable and connection-oriented; UDP is faster but connectionless with no guaranteed delivery" },
      { question: "What port does HTTPS use?", answer: "Port 443" },
    ],
  },
  {
    id: "cryptography",
    title: "Cryptography",
    notes: [
      "Symmetric encryption uses the same key for encryption and decryption (e.g. AES)",
      "Asymmetric encryption uses a public/private key pair (e.g. RSA)",
      "Hashing is a one-way function that produces a fixed-length digest (e.g. SHA-256)",
      "A digital signature verifies the authenticity and integrity of a message",
      "TLS uses asymmetric crypto for key exchange, then symmetric for the session",
    ],
    flashcards: [
      { question: "What is AES?", answer: "Advanced Encryption Standard — a symmetric encryption algorithm" },
      { question: "What makes a hash function cryptographically secure?", answer: "It must be one-way, collision-resistant, and produce a fixed-length output" },
      { question: "What is a public key used for?", answer: "Encrypting data or verifying a digital signature" },
      { question: "What is the purpose of a salt in hashing?", answer: "To prevent rainbow table attacks by adding random data before hashing" },
    ],
  },
  {
    id: "web-security",
    title: "Web Application Security",
    notes: [
      "SQL Injection allows attackers to manipulate database queries via user input",
      "XSS (Cross-Site Scripting) injects malicious scripts into web pages viewed by others",
      "CSRF tricks a user into making unintended requests using their authenticated session",
      "The OWASP Top 10 is a standard list of the most critical web security risks",
      "Always validate and sanitize user input on the server side",
    ],
    flashcards: [
      { question: "What is SQL Injection?", answer: "An attack where malicious SQL is inserted into a query to manipulate the database" },
      { question: "What does XSS stand for?", answer: "Cross-Site Scripting" },
      { question: "What is CSRF?", answer: "Cross-Site Request Forgery — tricks a user into performing unintended actions" },
      { question: "What is the OWASP Top 10?", answer: "A list of the 10 most critical web application security risks, maintained by OWASP" },
    ],
  },
  {
    id: "malware",
    title: "Malware Analysis",
    notes: [
      "Static analysis examines malware without executing it (e.g. reading code, strings, headers)",
      "Dynamic analysis runs malware in a sandbox to observe its behaviour",
      "Common malware types: virus, worm, trojan, ransomware, spyware, rootkit",
      "Indicators of Compromise (IOCs) are evidence that a system has been attacked",
      "Tools like IDA Pro, Ghidra, and Wireshark are commonly used in malware analysis",
    ],
    flashcards: [
      { question: "What is the difference between static and dynamic analysis?", answer: "Static analysis examines code without running it; dynamic analysis observes behaviour during execution" },
      { question: "What is a rootkit?", answer: "Malware designed to hide its presence and maintain privileged access to a system" },
      { question: "What is ransomware?", answer: "Malware that encrypts a victim's files and demands payment for the decryption key" },
      { question: "What is an IOC?", answer: "Indicator of Compromise — evidence that a system or network has been breached" },
    ],
  },
  {
    id: "pentesting",
    title: "Penetration Testing",
    notes: [
      "The pentest lifecycle: Reconnaissance, Scanning, Exploitation, Post-Exploitation, Reporting",
      "Black box testing: no prior knowledge; White box: full knowledge; Grey box: partial knowledge",
      "Common tools: Nmap (scanning), Metasploit (exploitation), Burp Suite (web), Nikto (web scanner)",
      "Always obtain written permission before conducting a penetration test",
      "A pentest report should include findings, severity ratings, and remediation steps",
    ],
    flashcards: [
      { question: "What is the first phase of a penetration test?", answer: "Reconnaissance — gathering information about the target" },
      { question: "What is Metasploit?", answer: "A widely used exploitation framework for penetration testing" },
      { question: "What is the difference between black box and white box testing?", answer: "Black box: no prior knowledge of the system; White box: full knowledge including source code and architecture" },
      { question: "Why is written permission important in pentesting?", answer: "Without it, penetration testing is illegal regardless of intent" },
    ],
  },
  {
    id: "incident-response",
    title: "Incident Response",
    notes: [
      "The IR lifecycle: Preparation, Identification, Containment, Eradication, Recovery, Lessons Learned",
      "A SIEM (Security Information and Event Management) system aggregates and analyses log data",
      "Chain of custody ensures digital evidence is handled properly for legal proceedings",
      "Containment strategies: isolate affected systems, block malicious IPs, disable compromised accounts",
      "A post-incident review helps improve defences and prevent future incidents",
    ],
    flashcards: [
      { question: "What are the 6 phases of incident response?", answer: "Preparation, Identification, Containment, Eradication, Recovery, Lessons Learned" },
      { question: "What is a SIEM?", answer: "Security Information and Event Management — a system that collects and analyses security logs" },
      { question: "What is chain of custody?", answer: "The documented process of preserving and tracking digital evidence for legal use" },
      { question: "What is the goal of the containment phase?", answer: "To limit the spread and impact of the incident without destroying evidence" },
    ],
  },
  {
    id: "cissp",
    title: "CISSP",
    notes: [
      "CISSP covers 8 domains (CBK): Security & Risk Management, Asset Security, Security Architecture & Engineering, Communication & Network Security, Identity & Access Management, Security Assessment & Testing, Security Operations, Software Development Security",
      "The CIA Triad — Confidentiality, Integrity, Availability — is the foundation of all security decisions",
      "Risk management: Risk = Threat × Vulnerability × Impact; responses are Avoid, Transfer, Mitigate, or Accept",
      "Access control models: DAC (owner decides), MAC (labels enforced by system), RBAC (roles grant access), ABAC (attributes define access)",
      "Bell-LaPadula enforces confidentiality ('no read up, no write down'); Biba enforces integrity ('no read down, no write up')",
      "Business Continuity Planning (BCP) keeps operations running during a disaster; Disaster Recovery Planning (DRP) restores IT systems afterward",
      "PKI (Public Key Infrastructure) manages digital certificates; a CA (Certificate Authority) signs and validates certificates",
      "Secure SDLC integrates security into every development phase — requirements, design, coding, testing, and deployment",
    ],
    flashcards: [
      { question: "What are the 8 CISSP CBK domains?", answer: "Security & Risk Management, Asset Security, Security Architecture & Engineering, Communication & Network Security, Identity & Access Management, Security Assessment & Testing, Security Operations, Software Development Security" },
      { question: "What is the CIA Triad?", answer: "Confidentiality (data accessible only to authorised parties), Integrity (data is accurate and unaltered), Availability (systems are accessible when needed)" },
      { question: "What does Bell-LaPadula enforce and how?", answer: "Confidentiality — 'no read up' (cannot read data at a higher classification) and 'no write down' (cannot write to a lower classification)" },
      { question: "What are the four risk response strategies?", answer: "Avoid (eliminate the risk), Transfer (e.g. insurance), Mitigate (reduce likelihood or impact), Accept (acknowledge and tolerate the risk)" },
      { question: "What is the difference between BCP and DRP?", answer: "BCP ensures business operations continue during a disruption; DRP focuses on recovering IT systems and data after a disaster" },
      { question: "What is the principle of least privilege?", answer: "Users and systems should be granted only the minimum access rights required to perform their function" },
    ],
  },
];