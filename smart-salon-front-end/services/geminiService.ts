
import { GoogleGenAI, FunctionDeclaration, Type } from "@google/genai";
import { apiClient } from "./apiClient";

// 1. Tool Definitions

const getServicesTool: FunctionDeclaration = {
  name: 'getServices',
  description: 'Get the list of all services, prices, and promotions available in the salon.',
  parameters: {
    type: Type.OBJECT,
    properties: {}, // No params needed
  },
};

const checkAvailabilityTool: FunctionDeclaration = {
  name: 'checkAvailability',
  description: 'Check if there are free slots for booking at a specific date and time.',
  parameters: {
    type: Type.OBJECT,
    properties: {
        date: { type: Type.STRING, description: 'Date in YYYY-MM-DD format or "tomorrow", "today"' },
        time: { type: Type.STRING, description: 'Time in HH:mm format, e.g. 10:00' }
    },
    required: ['date', 'time']
  },
};

const getPromotionsTool: FunctionDeclaration = {
  name: 'getPromotions',
  description: 'Get active promotion campaigns.',
  parameters: { type: Type.OBJECT, properties: {} }
};


// 2. AI Service Class

export class AIStylistService {
  private ai: GoogleGenAI;
  private modelName = 'gemini-2.5-flash';

  constructor(apiKey: string) {
    this.ai = new GoogleGenAI({ apiKey });
  }

  async sendMessage(userMessage: string, history: any[] = []): Promise<string> {
    try {
      // Fetch system config or settings if needed, for now we use a hardcoded instruction
      const systemInstruction = `You are a professional, witty, and helpful AI receptionist at "Smart Salon". 
      Your goal is to help customers choose hairstyles, check prices, and find booking slots.
      
      RULES:
      1. Always use Vietnamese.
      2. If asked about prices/services, CALL the "getServices" tool. Do NOT guess prices.
      3. If asked about booking/time, CALL "checkAvailability".
      4. If asked about discounts, CALL "getPromotions".
      5. Keep answers short (under 50 words) unless listing services.
      6. If you confirm a slot is free, tell the user "Giờ đó còn trống ạ, anh bấm nút Đặt Lịch bên dưới nhé!".
      `;

      // Define Tools
      const tools = [{ functionDeclarations: [getServicesTool, checkAvailabilityTool, getPromotionsTool] }];

      // Initial Call
      const response = await this.ai.models.generateContent({
        model: this.modelName,
        contents: [
            ...history, 
            { role: 'user', parts: [{ text: userMessage }] }
        ],
        config: {
            tools: tools,
            systemInstruction: systemInstruction,
            temperature: 0.7
        }
      });

      // Handle Function Calls
      const functionCalls = response.candidates?.[0]?.content?.parts?.filter(p => p.functionCall)?.map(p => p.functionCall);

      if (functionCalls && functionCalls.length > 0) {
        // We have tool requests!
        const toolResponses = [];

        for (const call of functionCalls) {
            if (!call) continue;
            let result;
            
            // Execute Tools
            if (call.name === 'getServices') {
                const services = await apiClient.getServices();
                // Simplify for AI token saving
                result = services.map(s => `${s.name}: ${s.price}d (${s.category})`).join('\n');
            } else if (call.name === 'checkAvailability') {
                // Mock availability check
                const args = call.args as any;
                result = `Checking ${args.date} at ${args.time}: Slot is Available (Mock).`;
            } else if (call.name === 'getPromotions') {
                const promos = await apiClient.getPromotions();
                result = promos.map(p => `${p.name}: ${p.description}`).join('\n');
            }

            toolResponses.push({
                functionResponse: {
                    name: call.name,
                    response: { result: result }
                }
            });
        }

        // Send tool results back to Gemini
        const finalResponse = await this.ai.models.generateContent({
            model: this.modelName,
            contents: [
                ...history,
                { role: 'user', parts: [{ text: userMessage }] },
                response.candidates![0].content, // The model's request
                { role: 'function', parts: toolResponses } // Our result
            ],
            config: { tools: tools } // Keep tools available
        });
        
        return finalResponse.text || "Xin lỗi, em đang bị rối. Anh hỏi lại giúp em nhé.";

      } else {
        // No tools needed, just return text
        return response.text || "...";
      }

    } catch (error) {
      console.error("AI Error:", error);
      return "Hệ thống AI đang bận. Anh vui lòng xem bảng giá bên dưới nhé!";
    }
  }
}

// Singleton instance helper
let aiInstance: AIStylistService | null = null;

export const getStylingAdvice = async (query: string, apiKey: string): Promise<string> => {
    if (!apiKey) return "Vui lòng cấu hình API Key trong trang Admin.";
    if (!aiInstance) aiInstance = new AIStylistService(apiKey);
    return aiInstance.sendMessage(query);
};
