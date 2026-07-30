/* ==========================================
   Packet & PDU Formatting Engine
   ================================---------- */

/**
 * Generates a detailed packet structural breakdown for a given layer
 * @param {number} layerId - OSI Layer ID (1 to 7)
 * @param {string} rawPayload - Current message or data payload
 * @returns {Object} Structured packet object containing headers and trailers
 */
function buildLayerPacketStructure(layerId, rawPayload) {
    const layerData = OSI_LAYERS.find(l => l.id === layerId);
    if (!layerData) return null;

    let packetStructure = {
        layerId: layerId,
        layerName: layerData.name,
        pdu: layerData.pdu,
        protocol: layerData.protocols[0] || "N/A",
        header: generateHeaderForLayer(layerId),
        payload: rawPayload,
        trailer: generateTrailerForLayer(layerId)
    };

    return packetStructure;
}

/**
 * Helper to simulate realistic protocol headers added at each layer
 * @param {number} layerId 
 * @returns {string} Formatted header string
 */
function generateHeaderForLayer(layerId) {
    switch (layerId) {
        case 7:
            return "HTTP/1.1 POST /send (Content-Type: application/json)";
        case 6:
            return "TLSv1.3 Record Layer (Encrypted AES-GCM)";
        case 5:
            return "RPC Session ID #8492 - Token Validated";
        case 4:
            return "TCP Src Port: 51240, Dst Port: 443, Seq: 1, Ack: 0";
        case 3:
            return "IPv4 Src: 192.168.1.10, Dst: 192.168.1.50, TTL: 64";
        case 2:
            return "Ethernet II Src MAC: 00:1A:2B:3C:4D:5E, Dst MAC: 00:5F:6E:7D:8C:9B";
        case 1:
            return "Physical Preamble (Start Frame Delimiter 10101011)";
        default:
            return "Generic Header";
    }
}

/**
 * Helper to simulate layer trailers (such as FCS checksum at Layer 2)
 * @param {number} layerId 
 * @returns {string|null} Trailer string or null
 */
function generateTrailerForLayer(layerId) {
    if (layerId === 2) {
        return "FCS (Frame Check Sequence): CRC32 = 0x4A8F2B1C";
    }
    if (layerId === 1) {
        return "EOF (End of Frame / Voltage Drop)";
    }
    return null;
}