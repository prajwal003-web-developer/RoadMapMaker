import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Progress = ({ project }) => {
  const { id } = useParams();

  const [percent, setPercent] = useState("0.00");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let total = 0;
    let completed = 0;

    project?.roadmap?.forEach(item => {
      item?.topics?.[0]?.subtopics?.forEach(sub => {
        total++;
        if (sub?.isCompleted) completed++;
      });
    });

    // avoid NaN on empty lists
    const rawPercent = total === 0 ? 0 : (completed / total) * 100;

    // keep 2 digits after decimal
    const formatted = rawPercent.toFixed(2); // <-- two decimals always

    setPercent(formatted);

    // Tailwind arbitrary width
    

    setLoading(false);
  }, [id, project]);

  return (
    <div className="my-3 bg-gradient-to-br from-purple-800 to-blue-700 p-4 rounded-lg">
      <div className="font-semibold text-gray-200">
        Progress of: <span className="text-sm">{project?.name}</span>
      </div>

      <div className="flex justify-between gap-3 py-6 items-center">
        <div className="h-6 rounded-xl overflow-clip w-full bg-gray-300">
          {!loading && (
            <div
              style={{
                width:`${percent}%`
              }}
              className={`h-full bg-gradient-to-br from-green-600 to-green-900 transition-all duration-500 `}
            ></div>
          )}
        </div>

        <div className="font-semibold text-sm flex w-12">
          {loading ? "??%" : `${percent}%`}
        </div>
      </div>
    </div>
  );
};

export default Progress;
