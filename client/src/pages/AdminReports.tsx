import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import api from '../utils/api';
import ScoresTable from '../components/Tables/ScoresTable';
// 1. Import thư viện PDF
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

interface StudentScore {
    id: string;
    maSv: string;
    hoTen: string;
    lopId: string;
    lop: { id: string; tenLop: string };
    diemRenLuyens: {
        tongDiem: number;
        xepLoai: string;
        hocKy: { tenHocKy: string; namHoc: string };
    }[];
}

const AdminReports: React.FC = () => {
    const [students, setStudents] = useState<StudentScore[]>([]);
    const [classes, setClasses] = useState<{ id: string; tenLop: string }[]>([]);
    const [selectedClass, setSelectedClass] = useState<string>('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchInitialData();
    }, []);

    const fetchInitialData = async () => {
        try {
            setLoading(true);
            const [studentsRes, classesRes] = await Promise.all([
                api.get('/users'),
                api.get('/classes')
            ]);

            setStudents(studentsRes.data);
            setClasses(classesRes.data);

            if (classesRes.data.length > 0) {
                setSelectedClass(classesRes.data[0].id);
            }
        } catch (error) {
            console.error('Failed to fetch data', error);
        } finally {
            setLoading(false);
        }
    };

    const filteredStudents = selectedClass
        ? students.filter(s => s.lopId === selectedClass)
        : students;

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

        // Tiêu đề
        doc.setFontSize(16);
        doc.text("BAO CAO DIEM REN LUYEN", 14, 20);
        
        doc.setFontSize(11);
        doc.text(`Ngay xuat: ${dateStr}`, 14, 28);
        
    
        const currentClassName = classes.find(c => c.id === selectedClass)?.tenLop || "Tat ca";
        doc.text(`Lop: ${currentClassName}`, 14, 34);

        const tableColumn = ["STT", "Ma SV", "Ho Ten", "Lop", "Diem", "Xep Loai"];
        const tableRows: any[] = [];

        filteredStudents.forEach((student, index) => {
            const latestScore = student.diemRenLuyens?.[0];
            const rowData = [
                index + 1,
                student.maSv,
                removeVietnameseTones(student.hoTen), 
                student.lop?.tenLop || '',
                latestScore?.tongDiem || 0,
                latestScore?.xepLoai || 'N/A'
            ];
            tableRows.push(rowData);
        });

        // Tạo bảng
        autoTable(doc, {
            head: [tableColumn],
            body: tableRows,
            startY: 40,
            theme: 'grid',
            headStyles: { 
                fillColor: [63, 81, 181], 
                halign: 'center'
            },
            styles: {
                fontSize: 10
            },
            columnStyles: {
                0: { halign: 'center', cellWidth: 15 },
                4: { halign: 'center' }, 
                5: { halign: 'center' } 
            }
        });

    
        doc.save(`Bao_Cao_${currentClassName}_${dateStr}.pdf`);
    };

    return (
        <Layout>
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="p-6 border-b border-gray-200 flex flex-col md:flex-row justify-between items-center gap-4">
                    <h3 className="text-lg font-bold text-gray-800">Báo Cáo Điểm Rèn Luyện</h3>

                    <div className="flex items-center gap-3">
                        {/* Dropdown chọn lớp */}
                        <div className="flex items-center gap-2">
                            <label htmlFor="class-select" className="text-sm font-medium text-gray-700">Lớp:</label>
                            <select
                                id="class-select"
                                value={selectedClass}
                                onChange={(e) => setSelectedClass(e.target.value)}
                                className="block w-32 md:w-40 pl-3 pr-8 py-2 text-sm border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 rounded-md border"
                            >
                                {classes.map((cls) => (
                                    <option key={cls.id} value={cls.id}>
                                        {cls.tenLop}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* 4. Nút Xuất PDF */}
                        <button
                            onClick={handleExportPDF}
                            disabled={filteredStudents.length === 0}
                            className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-sm text-sm font-medium"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                            Xuất PDF
                        </button>
                    </div>
                </div>

                <ScoresTable
                    students={filteredStudents}
                    loading={loading}
                />
            </div>
        </Layout>
    );
};

export default AdminReports;