import React from 'react';
import { Calendar, Clock, User, Phone, Mail, MessageSquare } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';

export default function BookingSection() {
  return (
    <section className="relative py-24 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left - Info */}
          <div>
            <div className="inline-block px-4 py-2 bg-black/5 rounded-full mb-6">
              <span className="text-sm font-bold uppercase tracking-wider text-black">Đặt lịch nhanh</span>
            </div>
            
            <h2 className="text-5xl md:text-6xl font-black text-black mb-6 tracking-tight leading-tight">
              Đặt lịch
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-gray-600 to-black">
                Chỉ 30 giây
              </span>
            </h2>

            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Điền thông tin bên dưới, chúng tôi sẽ liên hệ xác nhận lịch hẹn trong vòng 15 phút.
            </p>

            {/* Why book with us */}
            <div className="space-y-4 mb-8">
              <div className="flex items-start gap-4 p-4 rounded-2xl bg-white border border-gray-200">
                <div className="p-3 rounded-xl bg-black text-white">
                  <Calendar className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-black text-lg mb-1">Linh hoạt thời gian</h3>
                  <p className="text-sm text-gray-600">Mở cửa từ 8:00 - 22:00, kể cả cuối tuần</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-2xl bg-white border border-gray-200">
                <div className="p-3 rounded-xl bg-black text-white">
                  <User className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-black text-lg mb-1">Chọn stylist yêu thích</h3>
                  <p className="text-sm text-gray-600">Tự do chọn stylist phù hợp với phong cách</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-2xl bg-white border border-gray-200">
                <div className="p-3 rounded-xl bg-black text-white">
                  <Clock className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-black text-lg mb-1">Không phải chờ đợi</h3>
                  <p className="text-sm text-gray-600">Đúng giờ, không trễ hẹn</p>
                </div>
              </div>
            </div>

            {/* Contact Methods */}
            <div className="p-6 rounded-2xl bg-black text-white">
              <h3 className="font-black text-xl mb-4">Hoặc liên hệ trực tiếp</h3>
              <div className="space-y-3">
                <a href="tel:0901234567" className="flex items-center gap-3 text-gray-300 hover:text-white transition-colors">
                  <Phone className="w-5 h-5" />
                  <span className="font-bold">090 123 4567</span>
                </a>
                <a href="mailto:info@stylist.vn" className="flex items-center gap-3 text-gray-300 hover:text-white transition-colors">
                  <Mail className="w-5 h-5" />
                  <span className="font-bold">info@stylist.vn</span>
                </a>
              </div>
            </div>
          </div>

          {/* Right - Booking Form */}
          <div className="relative">
            <div className="sticky top-8">
              <div className="p-8 rounded-3xl bg-white border-2 border-black shadow-2xl">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 rounded-xl bg-black text-white">
                    <Calendar className="w-6 h-6" />
                  </div>
                  <h3 className="text-2xl font-black">Đặt lịch ngay</h3>
                </div>

                <form className="space-y-4">
                  <div>
                    <Label htmlFor="name" className="text-sm font-bold mb-2 block">
                      Họ và tên *
                    </Label>
                    <Input
                      id="name"
                      placeholder="Nguyễn Văn A"
                      className="h-12 rounded-xl border-2 border-gray-200 focus:border-black"
                    />
                  </div>

                  <div>
                    <Label htmlFor="phone" className="text-sm font-bold mb-2 block">
                      Số điện thoại *
                    </Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="090 123 4567"
                      className="h-12 rounded-xl border-2 border-gray-200 focus:border-black"
                    />
                  </div>

                  <div>
                    <Label htmlFor="email" className="text-sm font-bold mb-2 block">
                      Email
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="email@example.com"
                      className="h-12 rounded-xl border-2 border-gray-200 focus:border-black"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="date" className="text-sm font-bold mb-2 block">
                        Ngày hẹn *
                      </Label>
                      <Input
                        id="date"
                        type="date"
                        className="h-12 rounded-xl border-2 border-gray-200 focus:border-black"
                      />
                    </div>
                    <div>
                      <Label htmlFor="time" className="text-sm font-bold mb-2 block">
                        Giờ hẹn *
                      </Label>
                      <Input
                        id="time"
                        type="time"
                        className="h-12 rounded-xl border-2 border-gray-200 focus:border-black"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="service" className="text-sm font-bold mb-2 block">
                      Dịch vụ *
                    </Label>
                    <select
                      id="service"
                      className="w-full h-12 px-4 rounded-xl border-2 border-gray-200 focus:border-black focus:outline-none font-medium"
                    >
                      <option value="">Chọn dịch vụ</option>
                      <option value="cut">Cắt tóc & Tạo kiểu</option>
                      <option value="color">Nhuộm & Tẩy tóc</option>
                      <option value="perm">Uốn & Duỗi</option>
                      <option value="treatment">Phục hồi tóc</option>
                      <option value="vip">VIP Package</option>
                    </select>
                  </div>

                  <div>
                    <Label htmlFor="stylist" className="text-sm font-bold mb-2 block">
                      Chọn stylist (không bắt buộc)
                    </Label>
                    <select
                      id="stylist"
                      className="w-full h-12 px-4 rounded-xl border-2 border-gray-200 focus:border-black focus:outline-none font-medium"
                    >
                      <option value="">Salon sẽ chọn stylist phù hợp</option>
                      <option value="tuan">Nguyễn Minh Tuấn</option>
                      <option value="ha">Trần Thu Hà</option>
                      <option value="nam">Lê Hoàng Nam</option>
                      <option value="lan">Phạm Thị Lan</option>
                    </select>
                  </div>

                  <div>
                    <Label htmlFor="note" className="text-sm font-bold mb-2 block">
                      Ghi chú
                    </Label>
                    <textarea
                      id="note"
                      rows={3}
                      placeholder="Yêu cầu đặc biệt hoặc ghi chú thêm..."
                      className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-black focus:outline-none resize-none"
                    />
                  </div>

                  <Button 
                    type="submit"
                    className="w-full h-14 bg-black text-white font-black text-lg rounded-xl hover:bg-gray-800 transition-all duration-300 hover:scale-105 shadow-lg"
                  >
                    <Calendar className="w-5 h-5 mr-2" />
                    Xác nhận đặt lịch
                  </Button>

                  <p className="text-xs text-gray-500 text-center">
                    Bằng việc đặt lịch, bạn đồng ý với điều khoản dịch vụ của chúng tôi
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

