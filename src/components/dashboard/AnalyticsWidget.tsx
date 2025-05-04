import React, { useEffect, useState } from 'react';
import Card from '../ui/Card';
import ProgressBar from '../ui/ProgressBar';
import { BarChart, Clock, Zap, Target } from 'lucide-react';
import { getPersonalizedRecommendations } from '../../lib/analytics';

interface AnalyticsSummary {
  learningVelocity: number;
  topicStrengths: { [key: string]: number };
  recommendedContent: any[];
}

const AnalyticsWidget: React.FC = () => {
  const [analytics, setAnalytics] = useState<AnalyticsSummary>({
    learningVelocity: 0,
    topicStrengths: {},
    recommendedContent: []
  });

  useEffect(() => {
    const loadAnalytics = async () => {
      const recommendations = await getPersonalizedRecommendations();
      setAnalytics(prev => ({
        ...prev,
        recommendedContent: recommendations
      }));
    };

    loadAnalytics();
  }, []);

  return (
    <Card>
      <div className="flex items-center gap-2 mb-6">
        <BarChart className="h-5 w-5 text-indigo-500" />
        <h2 className="text-xl font-bold text-gray-800">Learning Analytics</h2>
      </div>

      <div className="space-y-6">
        {/* Learning Velocity */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Zap className="h-4 w-4 text-amber-500" />
              <span className="font-medium text-gray-700">Learning Velocity</span>
            </div>
            <span className="text-sm text-gray-500">
              {analytics.learningVelocity.toFixed(1)} lessons/day
            </span>
          </div>
          <ProgressBar
            value={analytics.learningVelocity * 10}
            max={50}
            variant="warning"
            height="sm"
          />
        </div>

        {/* Topic Strengths */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Target className="h-4 w-4 text-emerald-500" />
            <span className="font-medium text-gray-700">Topic Strengths</span>
          </div>
          <div className="space-y-2">
            {Object.entries(analytics.topicStrengths).map(([topic, strength]) => (
              <div key={topic}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600">{topic}</span>
                  <span className="text-gray-500">{strength}%</span>
                </div>
                <ProgressBar
                  value={strength}
                  max={100}
                  variant="success"
                  height="sm"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Recommended Content */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Clock className="h-4 w-4 text-blue-500" />
            <span className="font-medium text-gray-700">Recommended Next</span>
          </div>
          <div className="space-y-2">
            {analytics.recommendedContent.map((content) => (
              <div
                key={content.id}
                className="p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-medium text-gray-800">{content.title}</h4>
                    <p className="text-sm text-gray-600">{content.reason}</p>
                  </div>
                  <div className="text-xs font-medium text-indigo-600">
                    {Math.round(content.score * 100)}% match
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
};

export default AnalyticsWidget;