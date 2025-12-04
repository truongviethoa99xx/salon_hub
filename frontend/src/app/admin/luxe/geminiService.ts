// Mocked Gemini service for Luxe-style dashboard
// Không gọi API thật, chỉ trả về dữ liệu demo.

export const generateMarketingCampaign = async (revenue: number, slowDay: string) => {
  // Giả lập độ trễ mạng nhẹ cho cảm giác "real"
  await new Promise((resolve) => setTimeout(resolve, 600));

  return {
    strategy: `Tập trung đẩy booking vào ${slowDay} bằng flash sale cho khách cũ và ưu đãi giới thiệu bạn bè.`,
    smsContent:
      `FLASH SALE ${slowDay.toUpperCase()}! Giảm 20% dịch vụ uốn/nhuộm cho khách đặt lịch hôm nay. Số lượng có hạn, reply BOOK để giữ chỗ.`,
  };
};


