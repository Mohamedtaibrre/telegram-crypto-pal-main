
import React from 'react';
import { CheckCircle2, Circle, RefreshCcw } from 'lucide-react';

const RewardsTasks = () => {
  const tasks = [
    { 
      id: 1, 
      title: 'تسجيل الدخول اليومي', 
      points: 10, 
      completed: true, 
      description: 'قم بتسجيل الدخول إلى المنصة يوميًا' 
    },
    { 
      id: 2, 
      title: 'إجراء معاملة', 
      points: 20, 
      completed: false, 
      description: 'إرسال أو استلام أي مبلغ من MTG' 
    },
    { 
      id: 3, 
      title: 'تبادل العملات', 
      points: 25, 
      completed: false, 
      description: 'قم بتبديل MTG مع أي عملة أخرى' 
    },
    { 
      id: 4, 
      title: 'إضافة عملة إلى المفضلة', 
      points: 5, 
      completed: false, 
      description: 'أضف عملة إلى قائمة المفضلة الخاصة بك' 
    },
    { 
      id: 5, 
      title: 'قفل MTG', 
      points: 50, 
      completed: false, 
      description: 'قفل أي مبلغ من MTG لمدة 30 يومًا على الأقل' 
    }
  ];

  return (
    <div className="space-y-3">
      {tasks.map((task) => (
        <div key={task.id} className="bg-crypto-card rounded-lg p-4 flex items-center justify-between">
          <div className="flex-1">
            <div className="flex items-center">
              {task.completed ? (
                <CheckCircle2 className="w-5 h-5 text-green-500 mr-2" />
              ) : (
                <Circle className="w-5 h-5 text-gray-500 mr-2" />
              )}
              <h3 className="font-medium">{task.title}</h3>
            </div>
            <p className="text-gray-400 text-sm mt-1">{task.description}</p>
          </div>
          <div className="text-end">
            <div className="text-amber-500 font-medium">+{task.points}</div>
            {!task.completed && (
              <button className="text-xs text-blue-400 flex items-center mt-1">
                <RefreshCcw className="w-3 h-3 mr-1" />
                إكمال
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default RewardsTasks;
