import { supabase } from './supabase';

export interface AnalyticsEvent {
  activity_type: string;
  content_id?: string;
  time_spent?: number;
  completion_status?: boolean;
}

export const trackEvent = async (event: AnalyticsEvent) => {
  try {
    const { data: session } = await supabase.auth.getSession();
    if (!session?.session?.user) return;

    const { error } = await supabase.from('user_analytics').insert({
      user_id: session.session.user.id,
      session_start: new Date().toISOString(),
      ...event
    });

    if (error) throw error;
  } catch (err) {
    console.error('Error tracking analytics:', err);
  }
};

export const getPersonalizedRecommendations = async () => {
  try {
    const { data: recommendations, error } = await supabase
      .from('recommendations')
      .select('*')
      .gte('expires_at', new Date().toISOString())
      .order('score', { ascending: false })
      .limit(5);

    if (error) throw error;
    return recommendations;
  } catch (err) {
    console.error('Error fetching recommendations:', err);
    return [];
  }
};

export const updateLearningPatterns = async () => {
  try {
    const { data: analytics, error: analyticsError } = await supabase
      .from('user_analytics')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(100);

    if (analyticsError) throw analyticsError;

    // Calculate learning patterns
    const patterns = {
      preferred_time_slots: calculatePreferredTimes(analytics),
      topic_preferences: calculateTopicPreferences(analytics),
      learning_velocity: calculateLearningVelocity(analytics),
      difficulty_adaptability: calculateDifficultyAdaptability(analytics)
    };

    const { error: updateError } = await supabase
      .from('learning_patterns')
      .upsert(patterns);

    if (updateError) throw updateError;
  } catch (err) {
    console.error('Error updating learning patterns:', err);
  }
};

// Helper functions for pattern analysis
const calculatePreferredTimes = (analytics: any[]) => {
  // Group activities by hour of day
  const hourCounts: { [key: string]: number } = {};
  analytics.forEach(event => {
    const hour = new Date(event.session_start).getHours();
    hourCounts[hour] = (hourCounts[hour] || 0) + 1;
  });

  // Find peak activity hours
  return Object.entries(hourCounts)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 3)
    .map(([hour]) => parseInt(hour));
};

const calculateTopicPreferences = (analytics: any[]) => {
  // Group activities by content type/topic
  const topicCounts: { [key: string]: number } = {};
  analytics.forEach(event => {
    if (event.content_id) {
      topicCounts[event.content_id] = (topicCounts[event.content_id] || 0) + 1;
    }
  });

  return Object.entries(topicCounts)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5)
    .map(([topic]) => topic);
};

const calculateLearningVelocity = (analytics: any[]) => {
  if (analytics.length < 2) return 1.0;
  
  const completedActivities = analytics.filter(a => a.completion_status).length;
  const timeSpan = Math.abs(
    new Date(analytics[0].session_start).getTime() - 
    new Date(analytics[analytics.length - 1].session_start).getTime()
  ) / (1000 * 60 * 60 * 24); // Convert to days

  return completedActivities / (timeSpan || 1);
};

const calculateDifficultyAdaptability = (analytics: any[]) => {
  const completedActivities = analytics.filter(a => a.completion_status);
  if (completedActivities.length === 0) return 1.0;

  const averageEngagement = completedActivities.reduce(
    (sum, a) => sum + (a.engagement_score || 0), 
    0
  ) / completedActivities.length;

  return Math.min(Math.max(averageEngagement / 5, 0.5), 1.5);
};