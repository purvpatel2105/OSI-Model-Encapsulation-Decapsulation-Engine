/* ==========================================
   Protocol Database & Lookup Engine
   ================================---------- */

const NETWORK_PROTOCOLS = {
    HTTP: {
        name: "Hypertext Transfer Protocol",
        layer: 7,
        type: "Application Layer",
        description: "An application-layer protocol for distributed, collaborative, hypermedia information systems. Used for transmitting hypermedia documents, such as HTML.",
        port: 80,
        transport: "TCP"
    },
    HTTPS: {
        name: "HTTP Secure",
        layer: 7,
        type: "Application Layer",
        description: "An extension of the HTTP for secure communication over a computer network, heavily used on the Internet. Encrypted using TLS/SSL.",
        port: 443,
        transport: "TCP"
    },
    FTP: {
        name: "File Transfer Protocol",
        layer: 7,
        type: "Application Layer",
        description: "Standard network protocol used for the transfer of computer files between a client and server on a computer network.",
        port: "20 / 21",
        transport: "TCP"
    },
    DNS: {
        name: "Domain Name System",
        layer: 7,
        type: "Application Layer",
        description: "Hierarchical decentralized naming system for computers, services, or other resources connected to the Internet.",
        port: 53,
        transport: "UDP / TCP"
    },
    TLS: {
        name: "Transport Layer Security",
        layer: 6,
        type: "Presentation Layer",
        description: "Cryptographic protocols designed to provide communications security over a computer network.",
        port: "N/A (Encryption)",
        transport: "TCP"
    },
    TCP: {
        name: "Transmission Control Protocol",
        layer: 4,
        type: "Transport Layer",
        description: "Provides reliable, ordered, and error-checked delivery of a stream of octets between applications running on hosts communicating via an IP network.",
        port: "Port multiplexing",
        transport: "Layer 4 Protocol"
    },
    UDP: {
        name: "User Datagram Protocol",
        layer: 4,
        type: "Transport Layer",
        description: "Uses a simple connectionless communication model with a minimum of protocol mechanisms. Ideal for real-time streaming and gaming.",
        port: "Port multiplexing",
        transport: "Layer 4 Protocol"
    },
    IPv4: {
        name: "Internet Protocol version 4",
        layer: 3,
        type: "Network Layer",
        description: "Uses 32-bit addresses which limits the address space to 4.2 billion hosts. Provides packet routing and logical addressing.",
        port: "N/A (Logical IP)",
        transport: "Network Layer"
    },
    IPv6: {
        name: "Internet Protocol version 6",
        layer: 3,
        type: "Network Layer",
        description: "Most recent version of the Internet Protocol, using 128-bit addresses to provide an astronomically large pool of unique IP addresses.",
        port: "N/A (Logical IP)",
        transport: "Network Layer"
    },
    Ethernet: {
        name: "Ethernet (IEEE 802.3)",
        layer: 2,
        type: "Data Link Layer",
        description: "System of synchronous framed data transmission commonly used in local area networks (LANs), utilizing MAC addresses.",
        port: "MAC Addressing",
        transport: "Data Link Layer"
    }
};

/**
 * Looks up protocol specifications by name
 * @param {string} protocolName 
 * @returns {Object|null} Protocol info or null
 */
function getProtocolDetails(protocolName) {
    const key = protocolName.toUpperCase();
    return NETWORK_PROTOCOLS[key] || {
        name: protocolName,
        layer: "Unknown",
        description: "Custom or auxiliary network protocol.",
        port: "N/A",
        transport: "N/A"
    };
}