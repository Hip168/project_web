// File: client/src/pages/AdminReports.tsx
import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import api from '../utils/api';
// Thư viện PDF (Nhớ chạy: npm install jspdf jspdf-autotable tại thư mục client trước)
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

interface StudentScore {
    id: string;
    maSv: string;
    hoTen: string;
    lop: { tenLop: string };
    diemRenLuyens: {
        tongDiem: number;
        xepLoai: string;
        hocKy: { tenHocKy: string; namHoc: string };
    }[];
}

const AdminReports: React.FC = () => {
    const [students, setStudents] = useState<StudentScore[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchScores();
    }, []);

    const fetchScores = async () => {
        try {
            // SỬA QUAN TRỌNG: Đổi đường dẫn từ '/users/students' thành '/users'
            const response = await api.get('/users'); 
            setStudents(response.data);
        } catch (error) {
            console.error('Failed to fetch scores', error);
        } finally {
            setLoading(false);
        }
    };

    // Hàm xóa dấu tiếng Việt để xuất PDF không lỗi font
    const removeVietnameseTones = (str: string) => {
        str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
        str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
        str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
        str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
        str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
        str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
        str = str.replace(/đ/g, "d");
        str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, "A");
        str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, "E");
        str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, "I");
        str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, "O");
        str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, "U");
        str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, "Y");
        str = str.replace(/Đ/g, "D");
        return str;
    }

    const handleExportPDF = () => {
        const doc = new jsPDF();
        const today = new Date();
        const dateStr = `${today.getDate()}-${today.getMonth() + 1}-${today.getFullYear()}`;
        
        doc.setFontSize(18);
        doc.text("BAO CAO TONG HOP DIEM REN LUYEN", 14, 22);
        
        doc.setFontSize(11);
        doc.setTextColor(100);
        doc.text(`Ngay xuat: ${dateStr}`, 14, 30);

        const tableColumn = ["STT", "Ma SV", "Ho Ten", "Lop", "Tong Diem", "Xep Loai"];
        const tableRows: any[] = [];

        students.forEach((student, index) => {
            const latestScore = student.diemRenLuyens?.[0];
            const studentData = [
                index + 1,
                student.maSv,
                removeVietnameseTones(student.hoTen), 
                student.lop?.tenLop || 'N/A',
                latestScore?.tongDiem || 0,
                latestScore?.xepLoai || 'N/A',
            ];
            tableRows.push(studentData);
        });

        autoTable(doc, {
            head: [tableColumn],
            body: tableRows,
            startY: 35,
            theme: 'grid',
            headStyles: { fillColor: [79, 70, 229] }
        });

        doc.save(`Bao_Cao_${dateStr}.pdf`);
    };

    return (
        <Layout>
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="p-6 border-b border-gray-200 flex justify-between items-center bg-indigo-50">
                    <div>
                        <h3 className="text-lg font-bold text-indigo-900">Báo Cáo Điểm Rèn Luyện</h3>
                        <p className="text-sm text-indigo-700">Tổng hợp kết quả rèn luyện của sinh viên</p>
                    </div>
                    {/* NÚT XUẤT PDF ĐƯỢC THÊM TẠI ĐÂY */}
                    <button
                        onClick={handleExportPDF}
                        disabled={students.length === 0}
                        className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors shadow-sm font-medium"
                    >
                        Xuất PDF
                    </button>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-gray-50 text-gray-600 font-medium text-sm uppercase tracking-wider">
                            <tr>
                                <th className="px-6 py-4">Mã SV</th>
                                <th className="px-6 py-4">Họ Tên</th>
                                <th className="px-6 py-4">Lớp</th>
                                <th className="px-6 py-4">Tổng Điểm</th>
                                <th className="px-6 py-4">Xếp Loại</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {loading ? (
                                <tr><td colSpan={5} className="px-6 py-8 text-center text-gray-500">Đang tải...</td></tr>
                            ) : students.length === 0 ? (
                                <tr><td colSpan={5} className="px-6 py-8 text-center text-gray-500">Không có dữ liệu.</td></tr>
                            ) : (
                                students.map((student) => {
                                    const latestScore = student.diemRenLuyens?.[0];
                                    return (
                                        <tr key={student.id} className="hover:bg-gray-50">
                                            <td className="px-6 py-4 font-medium">{student.maSv}</td>
                                            <td className="px-6 py-4">{student.hoTen}</td>
                                            <td className="px-6 py-4">{student.lop?.tenLop || 'N/A'}</td>
                                            <td className="px-6 py-4 font-bold text-indigo-600">{latestScore?.tongDiem || 0}</td>
                                            <td className="px-6 py-4">{latestScore?.xepLoai || 'Chưa xếp loại'}</td>
                                        </tr>
                                    );
                                })
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </Layout>
    );
};
export default AdminReports;