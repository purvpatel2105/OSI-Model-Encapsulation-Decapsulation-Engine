🌐 Working of OSI Layer (OSI Layer Visualizer Pro)

💻 Local Installation & Setup
To run and evaluate this project locally:
1. Clone the repository:
   ```bash
   git clone [https://github.com/your-username/working-of-osi-layer.git](https://github.com/your-username/working-of-osi-layer.git) 
"Working of OSI Layer" is an advanced, interactive web-based network simulation engine engineered to demonstrate the end-to-end traversal of data across a computer network via the 7-layer OSI (Open Systems Interconnection) reference model. It provides a real-time, visual architectural breakdown of communication between a Source node and a Destination node.

---

🚀 Access My Project
Live Demo / Repository:** [Insert Your GitHub Pages or Project Link Here]

---

✨ Key Features
Dual-PC Topology & Live Flow:** Simulates full duplex-style communication from a Source host (`192.168.1.10`) to a Destination host (`192.168.1.50`).
Encapsulation Engine (Layer 7 ➔ Layer 1):** Dynamically wraps raw user payloads step-by-step—appending application data, TLS cryptographic security layers, session identifiers, transport segments, network routing headers, MAC frames, and physical bit streams.
Physical Transmission Medium:** Simulates animated packet flight across the network transmission channel.
Decapsulation Engine (Layer 1 ➔ Layer 7):** Demonstrates upward layer processing where the destination node verifies and strips headers/trailers sequentially to extract the original payload.
Interactive Control Matrix:** Fully equipped with asynchronous execution control (Play, Pause/Resume, Reset) alongside a real-time inspector log tracking protocol actions and Protocol Data Units (PDUs).
Comprehensive OSI Knowledge Base:** Includes a dedicated deep-dive architectural documentation page detailing the exact roles, working methodologies, and protocol stacks for all 7 layers.

---

🔄 Architectural Workflow (A to Z Data Flow)

When a message is submitted and transmission is initiated, the engine executes two foundational phases:

1. Encapsulation Phase (Source Node: Layer 7 Down to Layer 1)
Layer 7 (Application Layer):** Interacts with user software, capturing input data and initializing communication services (HTTP/HTTPS, DNS). *(PDU: Data)*
Layer 6 (Presentation Layer):** Handles data formatting, text syntax translation, and TLS/SSL cryptographic encryption. *(PDU: Data)*
Layer 5 (Session Layer):** Establishes, maintains, and manages session synchronization tokens between applications. *(PDU: Data)*
Layer 4 (Transport Layer):** Splits data streams into manageable chunks, assigning TCP/UDP port numbers. *(PDU: Segment / Datagram)*
Layer 3 (Network Layer):** Wraps transport segments into logical network packets by appending Source and Destination IP addresses. *(PDU: Packet)*
Layer 2 (Data Link Layer):** Encapsulates packets into data frames by binding physical MAC addresses and appending error-checking trailers (FCS). *(PDU: Frame)*
Layer 1 (Physical Layer):** Converts the finalized frame into raw physical bits ($0$s and $1$s) transmitted over physical cabling or wireless frequencies. *(PDU: Bits)*

2. Transmission & Decapsulation Phase (Destination Node: Layer 1 Up to Layer 7)
Raw signals traverse the physical transmission medium.
The destination workstation ingests the raw bits at Layer 1 and executes upward **Decapsulation**, systematically parsing and stripping headers/trailers at each ascending level until the pristine user message is successfully extracted and rendered.

---

🛠️ Technology Stack
Frontend Markup & Layout:** HTML5, CSS3 (Modern Glassmorphism, Advanced Flexbox/Grid Systems, Responsive Media Queries)
Scripting Engine:** JavaScript (ES6+, Asynchronous State Machine, Event-driven UI Rendering)

---

