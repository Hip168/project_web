import React from 'react';

interface Score {
  tongDiem: number;
  xepLoai: string;
}

interface ScoreCardProps {
  score: Score | null;
}

const ScoreCard: React.FC<ScoreCardProps> = ({ score }) => {
  return (
    <div className="bg-linear-to-br from-indigo-600 to-purple-700 rounded-xl shadow-lg p-6 text-white flex flex-col justify-between">
      <div>
        <h4 className="text-indigo-100 font-medium mb-1">Điểm Rèn Luyện (Học kỳ này)</h4>
        <div className="text-5xl font-bold">{score?.tongDiem || 0}</div>
      </div>
      <div className="mt-4">
        <div className="text-indigo-200 text-sm mb-1">Xếp loại</div>
        <div className="text-2xl font-bold">{score?.xepLoai || 'Chưa xếp loại'}</div>
      </div>
    </div>
  );
};

export default ScoreCard;
