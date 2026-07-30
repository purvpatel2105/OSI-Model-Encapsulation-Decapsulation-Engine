/* ==========================================
   OSI Layers Static Data & Specifications
   ================================---------- */

const OSI_LAYERS = [
    {
        id: 7,
        name: "Application Layer",
        code: "L7",
        protocols: ["HTTP", "HTTPS", "FTP", "SMTP", "DNS", "DHCP"],
        ports: [80, 443, 21, 25, 53, 67],
        description: "Serves as the window between user applications and the network. It enables users to interact with software programs that implement network services.",
        working: "At the sender, user input is captured and formatted. At the receiver, application data is extracted and presented to the target software.",
        pdu: "Data"
    },
    {
        id: 6,
        name: "Presentation Layer",
        code: "L6",
        protocols: ["SSL/TLS", "JPEG", "MPEG", "ASCII", "GIF", "encryption"],
        ports: ["N/A (Data Formatting & Security)"],
        description: "Responsible for data translation, encryption, decryption, and compression so that data sent from one system can be read by another.",
        working: "Formats and encrypts data (e.g., TLS handshake) before passing it down, or decrypts and translates incoming formats on reception.",
        pdu: "Data"
    },
    {
        id: 5,
        name: "Session Layer",
        code: "L5",
        protocols: ["NetBIOS", "PPTP", "RPC", "SAP", "SDP"],
        ports: ["N/A (Session Management)"],
        description: "Establishes, manages, and terminates communication sessions between applications across a network.",
        working: "Manages dialog control, token management, and synchronization checkpoints to ensure session continuity.",
        pdu: "Data"
    },
    {
        id: 4,
        name: "Transport Layer",
        code: "L4",
        protocols: ["TCP", "UDP", "SCTP", "DCCP"],
        ports: ["Port-based multiplexing", "Flow Control"],
        description: "Ensures complete and reliable end-to-end data delivery. Handles error recovery, flow control, and packet sequencing (TCP) or fast transmission (UDP).",
        working: "Splits application data into smaller chunks called Segments and adds source/destination port numbers.",
        pdu: "Segment (TCP) / Datagram (UDP)"
    },
    {
        id: 3,
        name: "Network Layer",
        code: "L3",
        protocols: ["IPv4", "IPv6", "ICMP", "IPsec", "OSPF", "BGP"],
        ports: ["Logical Addressing (IP)", "Routing Tables"],
        description: "Handles logical addressing and determines the optimal physical path across interconnected networks (Routing and Forwarding).",
        working: "Encapsulates L4 segments into Packets by adding source and destination IP addresses.",
        pdu: "Packet"
    },
    {
        id: 2,
        name: "Data Link Layer",
        code: "L2",
        protocols: ["Ethernet", "Wi-Fi (802.11)", "PPP", "ARP", "MAC"],
        ports: ["MAC Addressing (Physical Address)"],
        description: "Facilitates node-to-node data transfer across a local physical network segment and handles error detection from physical media.",
        working: "Wraps L3 packets into Frames by attaching Source and Destination MAC addresses and trailer checksums (FCS).",
        pdu: "Frame"
    },
    {
        id: 1,
        name: "Physical Layer",
        code: "L1",
        protocols: ["CAT6 Cables", "Fiber Optics", "Radio Waves (Wi-Fi)", "Hubs", "Repeaters"],
        ports: ["Hardware Connectors (RJ45, SFP)"],
        description: "Manages raw physical transmission of bits (0s and 1s) over physical medium like cables, light pulses, or electromagnetic waves.",
        working: "Converts frames into physical signals (electrical voltages, light flashes, or radio frequency waves) for transmission over the channel.",
        pdu: "Bits"
    }
];