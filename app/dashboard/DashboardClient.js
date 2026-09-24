'use client';

import { useEffect, useState } from 'react';
import { signOut } from 'next-auth/react';
import styles from './DashboardClient.module.css';
import { prisma } from '@/lib/prisma';

const TEAM_NAMES = {
  social: 'تيم السوشيال ميديا',
  prayer: 'تيم الصلاة',
  fun: 'التيم الترفيهي',
  hymns: 'تيم الترانيم',
  content: 'تيم المحتوى'
};

const TEAM_COLORS = {
  social: '#3E7C82',
  prayer: '#8B3A3A',
  fun: '#B8792A',
  hymns: '#6A5590',
  content: '#3D6B47'
};

const TEAM_EMOJIS = {
  social: '📱',
  prayer: '🙏',
  fun: '🎉',
  hymns: '🎶',
  content: '💡'
};

export default function DashboardClient({ username }) {
  const [stats, setStats] = useState(null);
  const [submissions, setSubmissions] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [expandedSubmission, setExpandedSubmission] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch('/api/stats');
        if (!response.ok) throw new Error('Failed to fetch stats');
        const data = await response.json();
        setStats(data);
      } catch (err) {
        setError('خطأ في تحميل الإحصائيات');
        console.error(err);
      } finally {
        setLoading(false);
      }}

    fetchStats();
  }, []);

  const filteredSubmissions = selectedTeam
    ? stats?.submissions?.filter(sub => sub.teams.includes(selectedTeam)) || []
    : stats?.submissions || [];

  if (loading) {
    return (
      <div className={styles.container}>
        <div className={styles.loading}>جاري التحميل...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.container}>
        <div className={styles.error}>{error}</div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div>
          <h1>لوحة التحكم</h1>
          <p>أهلاً {username}</p>
        </div>
        <button onClick={() => signOut({ callbackUrl: '/' })} className={styles.logoutBtn}>
          تسجيل الخروج
        </button>
      </div>

      {/* Stats Overview */}
      <div className={styles.statsOverview}>
        <div className={styles.statCard}>
          <div className={styles.statNumber}>{stats?.totalSubmissions || 0}</div>
          <div className={styles.statLabel}>إجمالي الردود</div>
        </div>
      </div>

      {/* Teams Stats */}
      <div className={styles.section}>
        <h2>إحصائيات التيمات</h2>
        <div className={styles.teamsGrid}>
          {Object.entries(stats?.teamCounts || {}).map(([key, count]) => (
            <button
              key={key}
              className={`${styles.teamCard} ${selectedTeam === TEAM_NAMES[key] ? styles.active : ''}`}
              onClick={() => setSelectedTeam(selectedTeam === TEAM_NAMES[key] ? null : TEAM_NAMES[key])}
              style={{
                borderColor: selectedTeam === TEAM_NAMES[key] ? TEAM_COLORS[key] : 'transparent',
              }}
            >
              <div className={styles.teamEmoji}>{TEAM_EMOJIS[key]}</div>
              <div className={styles.teamName}>{TEAM_NAMES[key]}</div>
              <div className={styles.teamCount}>{count}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Submissions List */}
      <div className={styles.section}>
        <h2>
          {selectedTeam ? `الردود - ${selectedTeam}` : 'جميع الردود'}
          {filteredSubmissions.length > 0 && (
            <span className={styles.count}>({filteredSubmissions.length})</span>
          )}
        </h2>

        {filteredSubmissions.length === 0 ? (
          <p className={styles.noData}>لا توجد ردود حتى الآن</p>
        ) : (
          <div className={styles.submissionsList}>
            {filteredSubmissions.map((submission) => (
              <div key={submission.id} className={styles.submissionItem}>
                <button
                  className={styles.submissionHeader}
                  onClick={() => setExpandedSubmission(expandedSubmission === submission.id ? null : submission.id)}
                >
                  <div>
                    <strong>{submission.name}</strong>
                    <span className={styles.phone}>{submission.phone}</span>
                  </div>
                  <span className={styles.arrow}>
                    {expandedSubmission === submission.id ? '▼' : '▶'}
                  </span>
                </button>

                {expandedSubmission === submission.id && (
                  <div className={styles.submissionDetails}>
                    <div className={styles.detail}>
                      <strong>التيمات:</strong>
                      <div className={`w-full text-bold ${styles.teams}`}>
                        {submission.teams.map((team, idx) => (
                          <div className="flex flex-col w-full items-start p-5 gap-2 space-y-1" key={idx}>
                          <span key={idx} className={` ${styles.teamBadge} text-bold`}>
                            {team}
                          </span>
                          
                          <span className=" text-bold">ت/يخدم في SJSMF: {submission.currentServed}</span>
                          <span className=" text-bold">خدمته/ا في SJSMF: {submission.currentTeams.join(', ') || "no current teams"}</span>
                          <span className=" text-bold">ت/يخدم في كنيسته/ا: {submission.prevServed}</span>
                          <span className=" text-bold"> خدمته/ا في كنيسته/ا: {submission.prevTeams.join(', ') || "no previous teams"}</span>
                          <span className=" text-bold">المهارات: {submission.skills.map((skill) => <span key={skill}>{skill}</span>) || "no skills"}</span>
                          <span className=" text-bold">مهارات عاوز/ه يتعلمها: {submission.wantTry.join(', ') || "no wanted skills"}</span>
                        </div>
                        ))}
                        
                      </div>
                    </div>

                    {submission.notes && (
                      <div className={styles.detail}>
                        <strong>ملاحظات:</strong>
                        <p>{submission.notes}</p>
                      </div>
                    )}

                    <div className={styles.detail}>
                      <strong>تاريخ الإرسال:</strong>
                      <p>{new Date(submission.submittedAt).toLocaleString('ar-EG')}</p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
