const WebSocket = require('ws');
const express = require('express');
const cors = require('cors');
const axios = require('axios'); 

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3001;

// ==================== DATABASE THUẬT TOÁN ĐA MÔ HÌNH CỨNG (T8) ====================
const THUATTOAN8_DATA = {
    "TXXTTXTX": "Xỉu",     "XXTTXTXX": "Xỉu",     "XTTXTXXT": "Xỉu",     "TTXTXXTT": "Xỉu",
    "TXTXXTTT": "Xỉu",     "XTXXTTTX": "Tài",     "TXXTTTXX": "Xỉu",     "XXTTTXXT": "Tài",
    "XTTTXXTX": "Tài",     "TTTXXTXX": "Xỉu",     "TTXXTXXX": "Xỉu",     "TXXTXXXX": "Xỉu",
    "XXTXXXXX": "Xỉu",     "XTXXXXXT": "Tài",     "TXXXXXTX": "Tài",     "XXXXXTXX": "Xỉu",
    "XXXXTXXX": "Tài",     "XXXTXXXT": "Tài",     "XXTXXXTX": "Xỉu",     "XTXXXTXX": "Tài",
    "TXXXTXXX": "Tài",     "XXXTXXXX": "Xỉu",     "XXTXXXXT": "Xỉu",     "XTXXXXTT": "Xỉu",
    "TXXXXTTX": "Xỉu",     "XXXXTTXX": "Xỉu",     "XXXTTXXX": "Tài",     "XXTTXXXT": "Tài",
    "XTTXXXTX": "Tài",     "TTXXXTXT": "Tài",     "TXXXTXTX": "Tài",     "XXXTXTXT": "Xỉu",
    "XXTXTXTT": "Tài",     "XTXTXTTT": "Xỉu",     "TXTXTTTT": "Tài",     "XTXTTTTT": "Xỉu",
    "TXTTTTTT": "Xỉu",     "XTTTTTTX": "Xỉu",     "TTTTTTXT": "Xỉu",     "TTTTTXTX": "Xỉu",
    "TTTTXTXT": "Xỉu",     "TTTXTXTT": "Xỉu",     "TTXTXTTX": "Xỉu",     "TXTXTTXT": "Xỉu",
    "XTXTTXTX": "Tài",     "TXTTXTXT": "Tài",     "XTTXTXTT": "Xỉu",     "TXTTXTXX": "Xỉu",
    "XTTXTXXX": "Xỉu",     "TTXTXXXT": "Tài",     "TXTXXXTT": "Xỉu",     "XTXXXTTX": "Tài",
    "TXXXTTXX": "Tài",     "XXXTTXXT": "Xỉu",     "XXTTXXTX": "Tài",     "XTTXXTXX": "Xỉu",
    "TXXTXXXT": "Xỉu",     "XXTXXXTT": "Tài",     "XTXXXTTT": "Tài",     "TXXXTTTT": "Xỉu",
    "XXXTTTTT": "Tài",     "XXTTTTTT": "Xỉu",     "TTTTTTXX": "Xỉu",     "TTTTTXXX": "Tài",
    "TTTTXXXT": "Xỉu",     "TTTXXXTX": "Xỉu",     "TXXXTXTT": "Xỉu",     "XXXTXTTX": "Xỉu",
    "XXTXTTXX": "Tài",     "XTXTTXXT": "Tài",     "TXTTXXTT": "Tài",     "XTTXXTTT": "Xỉu",
    "TTXXTTTX": "Tài",     "TXXTTTXT": "Xỉu",     "XXTTTXTX": "Tài",     "XTTTXTXX": "Xỉu",
    "TTTXTXXX": "Xỉu",     "XTXTTXXX": "Xỉu",     "TXTTXXXT": "Xỉu",     "TTXXXTXX": "Xỉu",
    "TXXXTXXT": "Tài",     "XXXTXXTX": "Xỉu",     "XXTXXTXT": "Xỉu",     "XTXXTXTX": "Tài",
    "TXXTXTXT": "Xỉu",     "XTXTXTTX": "Xỉu",     "XTXTTXTT": "Tài",     "TXTTXTTT": "Tài",
    "XTTXTTTX": "Xỉu",     "TTXTTTXT": "Xỉu",     "TXTTTXTT": "Xỉu",     "XTTTXTTX": "Tài",
    "TTTXTTXT": "Xỉu",     "TTXTTXTX": "Tài",     "TTXTXXTX": "Tài",     "TXTXXTXT": "Xỉu",
    "XTXXTXTT": "Tài",     "TXXTXTTT": "Tài",     "XXTXTTTT": "Xỉu",     "TXTTTTTX": "Tài",
    "XTTTTTXX": "Tài",     "TTTTXXXX": "Tài",     "TTTXXXXX": "Xỉu",     "TTXXXXXX": "Xỉu",
    "TXXXXXXT": "Tài",     "XXXXXXTT": "Xỉu",     "XXXXXTTX": "Xỉu",     "XTTXXTXT": "Xỉu",
    "TTXXTXTT": "Tài",     "XTXTTTTX": "Tài",     "TXTTTTXT": "Xỉu",     "XTTTTXTX": "Tài",
    "TTTTXTXX": "Xỉu",     "TTTXTXXT": "Tài",     "TXTXTTTX": "Tài",     "XTXTTTXX": "Tài",
    "TXTTTXXT": "Tài",     "XTTTXXTT": "Tài",     "TTTXXTTT": "Tài",     "TTXXTTTT": "Xỉu",
    "TXXTTTTX": "Tài",     "XXTTTTXT": "Xỉu",     "TXTXTTXX": "Xỉu",     "TXTTXXXX": "Tài",
    "XTTXXXXT": "Xỉu",     "TTXXXXTX": "Xỉu",     "TXXXXTXT": "Xỉu",     "XXXXTXTX": "Tài",
    "TXTTTTXX": "Tài",     "XTTTTXXT": "Tài",     "TTTTXXTX": "Tài",     "XXXTXXTT": "Tài",
    "XXTXXTTT": "Xỉu",     "XXTTTXTT": "Xỉu",     "TTTXTTXX": "Tài",     "TTXTTXXX": "Xỉu",
    "XTTXXXXX": "Tài",     "TTXXXXXT": "Tài",     "TXXXXXTT": "Tài",     "XXXXXTTT": "Xỉu",
    "XXXXTTTT": "Tài",     "XXXTTTTX": "Tài",     "XTTXTXTX": "Tài",     "TTXTXTXT": "Xỉu",
    "TXTXTXTX": "Xỉu",     "XTXTXTXT": "Xỉu",     "XTXTXTXX": "Xỉu",     "TXTXTXXT": "Xỉu",
    "XTXTXXTX": "Tài",     "XXTXTXTX": "Xỉu",     "TXTXTXTT": "Xỉu",     "TXTTTXXX": "Tài",
    "XTTTXXXX": "Xỉu",     "TTTXXXXT": "Xỉu",     "TTXXXXTT": "Xỉu",     "XXXTXTXX": "Tài",
    "XXTXTXXX": "Xỉu",     "XTXTXXXT": "Xỉu",     "XXTTXXTT": "Tài",     "TXXTTTTT": "Xỉu",
    "TTTTTXTT": "Xỉu",     "TTTTXTTT": "Tài",     "TTTXTTTT": "Xỉu",     "TTXTTTTX": "Xỉu",
    "XTXXTTTT": "Tài",     "XTTTTXTT": "Tài",     "XTTTTXXX": "Xỉu",     "TXXXXTTT": "Xỉu",
    "XXXXTTTX": "Tài",     "XXXTTTXX": "Xỉu",     "TXTXTXXX": "Xỉu",     "XXTTTTXX": "Xỉu",
    "TTTXXXTT": "Tài",     "TTXXXTTX": "Tài",     "TXXXTTXT": "Xỉu",     "XXXTTXTT": "Tài",
    "XXTTXTTX": "Xỉu",     "XTTXTTXX": "Xỉu",     "TTXTTXXT": "Tài",     "TTTXXTXT": "Xỉu",
    "TTXXTXTX": "Xỉu",     "TXTXXXTX": "Xỉu",     "TTTTXXTT": "Tài",     "XTTTTTTT": "Tài",
    "TTTTTTTT": "Xỉu",     "TTTTTTTX": "Tài",     "TTTTTXXT": "Tài",     "TTTXXTTX": "Tài",
    "TTXXTTXX": "Tài",     "TXXTTXXT": "Xỉu",     "TTXXTXXT": "Tài",     "TXXTXXTX": "Tài",
    "XXTXXTXX": "Xỉu",     "XTXXTXXX": "Xỉu",     "XTXXXXTX": "Tài",     "XXXXTXTT": "Tài",
    "XXXTXTTT": "Xỉu",     "TXXTXXTT": "Tài",     "XXXXXTXT": "Tài",     "XTTXXXTT": "Tài",
    "XXTTXXXX": "Xỉu",     "TXTTXTTX": "Tài",     "XTTXTTXT": "Xỉu",     "TTXTTXTT": "Tài",
    "XTTXTTTT": "Xỉu",     "TTXTTTTT": "Xỉu",     "TTTTXTTX": "Xỉu",     "TTXTXXXX": "Tài",
    "TXTXXXXT": "Tài",     "XXTTTTTX": "Xỉu",     "XTTTTTXT": "Tài",     "TTTXTXTX": "Xỉu",
    "TXTXXTXX": "Xỉu",     "XTXXTXXT": "Tài",     "XTXTXXXX": "Tài",     "TXXXXTXX": "Tài",
    "TTXTXTXX": "Xỉu",     "XTXTXXTT": "Tài",     "TXXXTTTX": "Xỉu",     "XXXTTTXT": "Xỉu",
    "XXTTTXXX": "Tài",     "XTTTXXXT": "Xỉu",     "TTXXXTTT": "Xỉu",     "TXXTXTTX": "Tài",
    "TXTTXXTX": "Xỉu",     "XXTXTTTX": "Xỉu",     "XTXXXXXX": "Tài",     "TXXXXXXX": "Xỉu",
    "XXXXXXXT": "Xỉu",     "XXXXTTXT": "Tài",     "XXXTTXTX": "Xỉu",     "TXTXXXXX": "Xỉu",
    "XXXXTXXT": "Xỉu",     "TXXTXTXX": "Tài",     "XXTXTXXT": "Tài",     "TXTXXTTX": "Xỉu",
    "XTXXTTXX": "Xỉu",     "TXXTTXXX": "Xỉu",     "XXTTXTTT": "Tài",     "TTXTTTXX": "Tài",
    "XXXXXXTX": "Xỉu",     "TTTXTTTX": "Xỉu",     "XTTTXTTT": "Tài",     "TXTTTXTX": "Xỉu",
    "XTXXXTXT": "Xỉu",     "XTTXXTTX": "Tài",     "TTXXTTXT": "Xỉu",     "XXTTXTXT": "Xỉu",
    "XXTXXTTX": "Xỉu",     "T": "Xỉu",     "TX": "Xỉu",     "TXT": "Tài",
    "TXTT": "Xỉu",     "TXTTT": "Xỉu",     "TXTTTX": "Xỉu",     "TXTTTXX": "Xỉu",
    "XXTXTTXT": "Xỉu",     "TTXTXTTT": "Xỉu",     "XTXTTTXT": "Tài",     "XTTTXTXT": "Xỉu",
    "XTXXTTXT": "Xỉu",     "TXXTTXTT": "Xỉu",     "X": "Xỉu",     "XX": "Tài",
    "XXT": "Xỉu",     "XXTT": "Tài",     "XXTTT": "Tài",     "XXTTTT": "Xỉu",
    "XXTTTTX": "Xỉu",     "XT": "Tài",     "XTX": "Xỉu",     "XTXX": "Tài",
    "XTXXT": "Tài",     "XTXXTT": "Tài",     "XTXXTTT": "Tài",     "XXXXXXXX": "Tài",
    "TXX": "Xỉu",     "TXXT": "Tài",     "TXXTT": "Tài",     "TXXTTT": "Xỉu",
    "TXXTTTX": "Tài",     "XTT": "Tài",     "XTTT": "Xỉu",     "XTTTX": "Xỉu",
    "XTTTXX": "Tài",     "XTTTXXX": "Tài",     "TT": "Xỉu",     "TTX": "Tài",
    "TTXT": "Xỉu",     "TTXTX": "Xỉu",     "TTXTXX": "Xỉu",     "TTXTXXX": "Xỉu",
    "XTTTXXT": "Tài",     "TXTTX": "Tài",     "TXTTXT": "Tài",     "TXTTXTT": "Tài",
    "TXXX": "Tài",     "TXXXT": "Tài",     "TXXXTT": "Tài",     "TXXXTTT": "Xỉu",
    "XXTX": "Tài",     "XXTXT": "Xỉu",     "XXTXTX": "Xỉu",     "XXTXTXX": "Xỉu",
};

let modelPredictions = { trend: {}, short: {}, mean: {}, switch: {}, bridge: {} };

// ==================== HỆ THỐNG PHÂN TÍCH MA TRẬN PHÂN PHỐI AI TỐI ƯU ====================
class UltraDicePredictionSystem {
    constructor() {
        this.history = []; // Chứa mảng ký tự ["T", "X"] phục vụ các hàm T8 nền
        this.fullHistoryObjects = []; // Chứa mảng object chuẩn [{result: "Tài", score: 11}]
        this.models = {};
        this.weights = {};
        this.performance = {};
        this.patternDatabase = {};
        this.advancedPatterns = {};
        this.sessionStats = {
            streaks: { T: 0, X: 0, maxT: 0, maxX: 0 },
            transitions: { TtoT: 0, TtoX: 0, XtoT: 0, XtoX: 0 },
            volatility: 0.5,
            recentAccuracy: 0,
            bias: { T: 0, X: 0 }
        };
        this.marketState = { trend: 'neutral', momentum: 0, stability: 0.5, regime: 'normal', currentPatternReport: "Chưa xác định" };
        this.adaptiveParameters = {
            patternMinLength: 3, patternMaxLength: 8,
            volatilityThreshold: 0.7, trendStrengthThreshold: 0.6
        };
        this.initAllModels();
    }

    updateHistory(cleanHistoryArray, rawApiList = []) {
        this.history = [...cleanHistoryArray].slice(-200);
        
        if (rawApiList && rawApiList.length > 0) {
            const sorted = [...rawApiList].sort((a, b) => a.id - b.id);
            this.fullHistoryObjects = sorted.map(item => ({
                session: item.id,
                result: item.resultTruyenThong === "TAI" ? 'Tài' : 'Xỉu',
                score: item.point || 0
            })).slice(-200);
        } else {
            this.fullHistoryObjects = this.history.map((res, index) => ({
                session: index,
                result: res === 'T' ? 'Tài' : 'Xỉu',
                score: res === 'T' ? 12 : 7
            }));
        }
        
        if (this.history.length >= 10) {
            this.updateVolatility();
            this.updateMarketState();
            this.analyzeCurrentChain(); 
        }
    }

    initAllModels() {
        for (let i = 1; i <= 21; i++) {
            this.models[`model${i}`] = this[`model${i}`] ? this[`model${i}`].bind(this) : null;
            this.weights[`model${i}`] = 1;
        }
        this.initAdvancedPatterns();
    }

    initAdvancedPatterns() {
        // Đồng bộ hóa chuẩn hóa ngôn ngữ quét của THANH NHÃ mở rộng sang chữ Tiếng Việt đầy đủ
        this.advancedPatterns = {
            'dynamic-1': {
                detect: (data) => { if (data.length < 6) return false; const last6 = data.slice(-6); return last6.filter(x => x === 'Tài').length === 4 && last6[last6.length-1] === 'Tài'; },
                predict: () => 'Xỉu', confidence: 0.72, description: "Mật độ Tài cao tụ đỉnh -> Hồi tụ Xỉu"
            },
            'dynamic-2': {
                detect: (data) => { if (data.length < 8) return false; const last8 = data.slice(-8); return last8.filter(x => x === 'Tài').length >= 6 && last8[last8.length-1] === 'Tài'; },
                predict: () => 'Xỉu', confidence: 0.78, description: "Bệt Tài dài quá giới hạn -> Bẻ Xỉu mạnh"
            },
            'alternating-3': {
                detect: (data) => { if (data.length < 5) return false; const last5 = data.slice(-5); for (let i = 1; i < last5.length; i++) { if (last5[i] === last5[i-1]) return false; } return true; },
                predict: (data) => data[data.length-1] === 'Tài' ? 'Xỉu' : 'Tài', confidence: 0.68, description: "Cầu đảo sóng 1-1 nhịp đều"
            }
        };
    }

    analyzeCurrentChain() {
        if (this.fullHistoryObjects.length < 5) {
            this.marketState.currentPatternReport = "Đang thu thập chuỗi kết quả...";
            return;
        }
        const last5 = this.fullHistoryObjects.slice(-5).map(x => x.result);
        const last5Str = last5.map(x => x === "Tài" ? "T" : "X").join('');
        
        if (last5.every(x => x === 'Tài')) { this.marketState.currentPatternReport = "CẦU BỆT TÀI ĐANG CHẠY DÀI"; return; }
        if (last5.every(x => x === 'Xỉu')) { this.marketState.currentPatternReport = "CẦU BỆT XỈU ĐANG CHẠY DÀI"; return; }
        if (last5Str === "TXTXT" || last5Str === "XTXTX") { this.marketState.currentPatternReport = "CẦU ĐAN XEN (1-1) MƯỢT SÓNG"; return; }
        if (last5Str === "TTXXT" || last5Str === "XXTTX") { this.marketState.currentPatternReport = "CẦU SONG HÀNH (2-2) ĐỊNH HÌNH"; return; }
        
        this.marketState.currentPatternReport = "MA TRẬN CẦU HỖN HỢP BIẾN ĐỘNG";
    }

    updateVolatility() {
        const recent = this.history.slice(-10);
        let changes = 0;
        for (let i = 1; i < recent.length; i++) { if (recent[i] !== recent[i-1]) changes++; }
        this.sessionStats.volatility = changes / (recent.length - 1);
    }

    updateMarketState() {
        const recent = this.history.slice(-15);
        const tCount = recent.filter(x => x === 'T').length;
        this.marketState.stability = 1 - this.sessionStats.volatility;
    }

    // --- CORE ĐỊNH NGHĨA CÁC MODEL AI ---
    model1() {
        if (this.history.length < 4) return null;
        const last4 = this.history.slice(-4).join('');
        if (THUATTOAN8_DATA[last4]) return { prediction: THUATTOAN8_DATA[last4] === "Tài" ? "T" : "X", confidence: 0.65, reason: "Quét mẫu nén T8 ngắn hạn" };
        return null;
    }

    model2() {
        if (this.history.length < 5) return null;
        const tCount = this.history.slice(-5).filter(x => x === 'T').length;
        return { prediction: tCount > 2 ? 'T' : 'X', confidence: 0.58, reason: "Động lượng xu hướng 5 phiên" };
    }

    model3() {
        if (this.fullHistoryObjects.length < 12) return null;
        const res = meanDeviation(this.fullHistoryObjects);
        return { prediction: res === 1 ? 'T' : 'X', confidence: 0.70, reason: "Phân phối lệch chuẩn Mean Deviation" };
    }

    model4() {
        if (this.fullHistoryObjects.length < 5) return null;
        const res = smartBridgeBreak(this.fullHistoryObjects);
        return { prediction: res.prediction === 1 ? 'T' : 'X', confidence: res.breakProb, reason: res.reason };
    }

    model5() {
        // Sửa lỗi cô lập thuật toán tuần hoàn động lượng THANH NHÃ mở rộng
        const stringHistory = this.fullHistoryObjects.map(x => x.result);
        for (const [pName, pConfig] of Object.entries(this.advancedPatterns)) { 
            if (pConfig.detect(stringHistory)) {
                return { prediction: pConfig.predict(stringHistory) === 'Tài' ? 'T' : 'X', confidence: pConfig.confidence, reason: `Thanh Nhã Mở Rộng: ${pConfig.description}` };
            } 
        } 
        return null;
    }

    getAllPredictions() {
        const list = {};
        for (let i = 1; i <= 5; i++) { // Quét tập trung vào các mẫu model lõi đã sửa đổi hoàn chỉnh
            if (this.models[`model${i}`]) {
                try {
                    const pred = this.models[`model${i}`]();
                    if (pred && pred.prediction) list[`model${i}`] = pred;
                } catch(e) { console.log(e); }
            }
        }
        return list;
    }

    getFinalPrediction() {
        const predictions = this.getAllPredictions();
        let totalTWeight = 0, totalXWeight = 0;
        let explanations = [];

        for (const [mName, pData] of Object.entries(predictions)) {
            const w = this.weights[mName] || 1;
            if (pData.prediction === 'T') totalTWeight += pData.confidence * w;
            else if (pData.prediction === 'X') totalXWeight += pData.confidence * w;
            explanations.push(`[${mName}]: ${pData.prediction === 'T' ? 'TÀI' : 'XỈU'}`);
        }

        // Tích hợp bổ sung biến động logic lõi từ THANH NHÃ vào điểm tổng của Ma Trận
        const tnResult = runThanhNhaLogic(this.fullHistoryObjects);
        totalTWeight += tnResult.taiWeight;
        totalXWeight += tnResult.xiuWeight;
        if(tnResult.detected.length > 0) explanations.push(`[ThanhNhã]: ${tnResult.detected.join(',')}`);

        const totalWeightSum = totalTWeight + totalXWeight;
        if (totalWeightSum === 0) return { du_doan: "?", ty_le_thanh_cong: "50%", giai_thich: "Quét phân tán cấu trúc ma trận." };

        const finalPrediction = totalTWeight >= totalXWeight ? 'TÀI' : 'XỈU';
        const finalConfidence = Math.max(totalTWeight, totalXWeight) / totalWeightSum;
        return {
            du_doan: finalPrediction,
            ty_le_thanh_cong: `${(finalConfidence * 100).toFixed(1)}%`,
            giai_thich: explanations.slice(0, 4).join(' | ')
        };
    }
}

const predictionSystem = new UltraDicePredictionSystem();

let apiResponseData = {
    id: "@mrtinhios", phien_vua_ra: null, xuc_xac_1: null, xuc_xac_2: null, xuc_xac_3: null,
    tong: null, ket_qua_vua_ra: "", phien: null, du_doan: "?", ty_le_thanh_cong: "0%",
    giai_thich: "Đang nạp dữ liệu ma trận mạng...", pattern: "N/A", phân_tích_chuỗi: "Vui lòng đợi..."
};

const TARGET_API_URL = "https://wtx.tele68.com/v1/tx/lite-sessions?cp=R&cl=R&pf=web&at=ac66e2c04bff27faef086d365f9b6897";

function applyThuattoan8Prediction(historyArray) {
    if (!historyArray || historyArray.length < 8) return { match: false, predict: null, pattern: null };
    const last8 = historyArray.slice(-8).join('');
    if (THUATTOAN8_DATA && THUATTOAN8_DATA[last8]) {
        return { match: true, predict: THUATTOAN8_DATA[last8] === "Tài" ? "TÀI" : "XỈU", pattern: last8, confidence: "98.5% (T8)" };
    }
    return { match: false, predict: null, pattern: last8 };
}

function fetchDataFromNewAPI() {
    axios.get(TARGET_API_URL, {
        headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36' }
    })
    .then(response => {
        const data = response.data;
        if (data && data.list && Array.isArray(data.list) && data.list.length > 0) {
            const sortedList = [...data.list].sort((a, b) => a.id - b.id);
            const cleanHistory = sortedList.map(item => item.resultTruyenThong === "TAI" ? "T" : "X");
            
            const latestSession = sortedList[sortedList.length - 1];
            const nextSessionId = latestSession.id + 1;
            
            if (cleanHistory.length < 10) return;

            predictionSystem.updateHistory(cleanHistory, sortedList);
            const t8 = applyThuattoan8Prediction(cleanHistory);
            
            let duDoanFinal = "?", tyLeFinal = "0%", giaiThichFinal = "";
            
            if (t8.match) {
                duDoanFinal = t8.predict; 
                tyLeFinal = t8.confidence;
                giaiThichFinal = `Khớp database khuôn cứng [${t8.pattern}] từ Bộ T8.`;
            } else {
                const aiResult = predictionSystem.getFinalPrediction();
                duDoanFinal = aiResult.du_doan;
                tyLeFinal = aiResult.ty_le_thanh_cong;
                giaiThichFinal = aiResult.giai_thich;
            }
            
            apiResponseData = {
                id: "@mrtinhios",
                phien_vua_ra: latestSession.id,
                xuc_xac_1: latestSession.dices ? latestSession.dices[0] : null,
                xuc_xac_2: latestSession.dices ? latestSession.dices[1] : null,
                xuc_xac_3: latestSession.dices ? latestSession.dices[2] : null,
                tong: latestSession.point,
                ket_qua_vua_ra: latestSession.resultTruyenThong === "TAI" ? "TÀI" : "XỈU",
                phien: nextSessionId,
                du_doan: duDoanFinal,
                ty_le_thanh_cong: tyLeFinal,
                giai_thich: giaiThichFinal,
                pattern: t8.pattern || cleanHistory.slice(-8).join(''),
                phân_tích_chuỗi: predictionSystem.marketState.currentPatternReport
            };
        }
    })
    .catch(err => console.error("[❌ Error API]:", err.message));
}

// ==================== ENGINE PHÂN TÍCH TOÁN HỌC BỔ TRỢ ĐƯỢC ĐỒNG BỘ ====================
function detectStreakAndBreak(history) {
    if (!history || history.length === 0) return { streak: 0, currentResult: null, breakProb: 0 };
    let streak = 1;
    const currentResult = history[history.length - 1].result;
    for (let i = history.length - 2; i >= 0; i--) {
        if (history[i].result === currentResult) streak++;
        else break;
    }
    return { streak, currentResult, breakProb: streak >= 5 ? 0.65 : 0.2 };
}

function smartBridgeBreak(history) {
    const { streak, currentResult, breakProb } = detectStreakAndBreak(history);
    let finalBreakProb = breakProb;
    let reason = '[Theo Cầu] Thuận động lượng dòng chảy';

    if (streak >= 5) {
        finalBreakProb = 0.80;
        reason = `[Bẻ Cầu] Đạt ngưỡng cực hạn bệt dài ${streak} phiên`;
    }
    let prediction = finalBreakProb > 0.65 ? (currentResult === 'Tài' ? 2 : 1) : (currentResult === 'Tài' ? 1 : 2);
    return { prediction, breakProb: finalBreakProb, reason };
}

function meanDeviation(history) {
    const last12 = history.slice(-12);
    const avgScore = last12.reduce((sum, item) => sum + item.score, 0) / last12.length;
    return avgScore > 10.5 ? 1 : 2; // 1: Tài, 2: Xỉu
}

// ==================== HỆ THỐNG BIẾN ĐỘNG CẦU THANH NHÃ CHUẨN ĐỊNH DẠNG ====================
function runThanhNhaLogic(historyObjects) {
    const h = historyObjects.map(x => x.result); // Chuẩn hóa chính xác về mảng ["Tài", "Xỉu", "Tài"...]
    let taiWeight = 0, xiuWeight = 0;
    let detected = [];
    if (h.length < 5) return { taiWeight, xiuWeight, detected };

    const lastResult = h[h.length - 1];
    const countOccur = (arr, val) => arr.filter(item => item === val).length;

    // 1. Quy luật nhận diện Bệt
    if (countOccur(h.slice(-3), lastResult) === 3) {
        detected.push("Bệt");
        if (lastResult === "Tài") taiWeight += 1.2; else xiuWeight += 1.2;
    }
    // 2. Quy luật cầu Đảo 1-1
    const last4 = h.slice(-4);
    if (last4.length === 4 && last4[0] !== last4[1] && last4[1] !== last4[2] && last4[2] !== last4[3]) {
        detected.push("Đảo1-1");
        if (lastResult === "Tài") xiuWeight += 1.5; else taiWeight += 1.5;
    }
    // 3. Cầu Song Hành 2-2
    const last4_2 = h.slice(-4);
    if (last4_2.length === 4 && last4_2[0] === last4_2[1] && last4_2[2] === last4_2[3] && last4_2[0] !== last4_2[2]) {
        detected.push("Kép2-2");
        if (lastResult === "Tài") taiWeight += 1.0; else xiuWeight += 1.0;
    }

    return { taiWeight, xiuWeight, detected };
}

setInterval(fetchDataFromNewAPI, 4000);
fetchDataFromNewAPI();

app.get('/api/lc', (req, res) => res.json(apiResponseData));
app.get('/', (req, res) => {
    res.send(`
        <body style="font-family: Arial, sans-serif; margin: 30px; background-color: #141414; color: #fff;">
            <h2 style="color: #ffcc00; border-bottom: 2px solid #ffcc00; padding-bottom: 10px;">🎯 Matrix Engine AI Sunwin - Bản Vá Đồng Bộ Lỗi Toàn Diện</h2>
            <p style="font-size: 1.1em;"><b>Phiên vừa ra:</b> Phiên ${apiResponseData.phien_vua_ra || '...'} ➜ Kết quả: <span style="color:#ffcc00; font-weight:bold;">${apiResponseData.tong || '...'} điểm (${apiResponseData.ket_qua_vua_ra || '...'})</span></p>
            <p style="font-size: 1.1em;"><b>Xác định chuỗi:</b> <span style="color: #00ff00; font-weight: bold; background: #222; padding: 4px 10px; border-radius: 4px;">${apiResponseData.phân_tích_chuỗi}</span></p>
            <div style="background: #000; padding: 15px; border-radius: 5px; margin: 20px 0; border-left: 5px solid cyan;">
                <h3 style="margin-top: 0; color: cyan;">🔮 DỰ ĐOÁN REALTIME PHIÊN KẾ KẬP (${apiResponseData.phien || '...'}):</h3>
                <span style="color:#fff; background:#ff3300; padding:8px 20px; font-weight:bold; border-radius: 4px; font-size: 1.4em; display: inline-block; margin-bottom: 10px;">${apiResponseData.du_doan}</span> 
                <b style="font-size: 1.2em; color: #00ff00; margin-left: 10px;">(Tỷ lệ: ${apiResponseData.ty_le_thanh_cong})</b>
            </div>
            <p><b>Ma trận Engine quét:</b> <span style="color: #ccc; font-style: italic;">${apiResponseData.giai_thich}</span></p>
            <p><b>Mã quét vết (8 phiên):</b> <span style="letter-spacing: 3px; font-family: monospace; font-size: 1.2em; color: #ff9900;">${apiResponseData.pattern}</span></p>
            <hr style="border: 0.5px solid #333; margin: 25px 0;"/>
            <p><a href="/api/ditmemaysun" style="color: #3399ff; text-decoration: none;" target="_blank">🔗 Mở cổng JSON API Realtime</a></p>
        </body>
    `);
});

app.listen(PORT, () => console.log(`[🚀 Server Matrix] Đã khởi chạy mượt mà tại cổng: ${PORT}`));