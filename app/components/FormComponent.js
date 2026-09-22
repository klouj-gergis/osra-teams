'use client';

import { useState } from 'react';
import styles from './FormComponent.module.css';

const TEAM_LABELS = {
  social: 'تيم السوشيال ميديا',
  prayer: 'تيم الصلاة',
  fun: 'التيم الترفيهي',
  hymns: 'تيم الترانيم',
  content: 'تيم المحتوى',
  theater: 'تيم المسرح',
};

const TEAMS_DATA = [
  {
    key: 'content',
    emoji: '💡',
    name: 'تيم المحتوى',
    desc: 'عندك فكرة ممكن تغيّر طريقة تفكير حد؟ بتحب تدور، تقرأ، تناقش وتفكر؟ 🤔 بتعرف تطلع أسئلة مختلفة؟\nإحنا التيم اللي ورا المواضيع اللي بنتكلم فيها في الاجتماع، من المناقشات والمواضيع الروحية للأسئلة اللي بتلمس حياتنا اليومية.\nمش لازم تكون عندك خبرة، المهم فضول وأفكار وحب إنك تتعلم وتشارك.'
  },
  {
    key: 'prayer',
    emoji: '🙏',
    name: 'تيم الصلاة',
    desc: 'يمكن تكون صلاتك سبب إن حد يكمل… يمكن كلمة منك في وقتها تغيّر يوم حد…\nلو بتحب الصلاة وعايز تخدم بيها، مستنيينك معانا. ❤️'
  },
  
  {
    key: 'hymns',
    emoji: '🎶',
    name: 'تيم الترانيم',
    desc: 'مش كل صوت حلو لازم يبقى على المسرح… بس كل قلب بيحب يرنم، ليه مكان معانا.\nحتى لو لسه بتتعلم، تعالى جرّب! ❤️'
  },
  {
    key: 'social',
    emoji: '📱',
    name: 'تيم السوشيال ميديا',
    desc: 'بتحب التصوير؟ 📸 بتعرف تعمل Reels؟ 🎥 عندك عين حلوة للتصميم؟ 🎨 بتحب تكتب وتطلع أفكار مختلفة؟ 💡\nنخلي الناس تشوف اللي بيحصل في اجتماعنا من خلالك 👀🔥\nمش شرط تكون محترف، المهم تكون عندك الرغبة تتعلم وتجرب ❤️'
  },
  {
    key: 'fun',
    emoji: '🎉',
    name: 'التيم الترفيهي',
    desc: 'لو عندك أفكار ألعاب محدش فكر فيها… لو بتحب المنافسة والضحك… ولو نفسك تخلي كل اجتماع فيه ذكريات 😂🔥\n- ابتكار ألعاب جديدة\n- تجهيز المسابقات\n- تقسيم الشباب لمجموعات\n- تنظيم وقت اللعب\n- خلق جو حلو في الاجتماع'
  },
  
  
  {
    key: 'theater',
    emoji: '🎭',
    name: 'تيم المسرح',
    desc: 'لو بتحب التمثيل، لو عندك موهبة في الإلقاء، لو نفسك تخش عالم المسرح… تعالى جرّب معانا! ❤️'
  }
];

export default function FormComponent() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    prevServed: '',
    prevTeams: [],
    currentServed: '',
    currentTeams: [],
    skills: [],
    wantTry: [],
    teams: [],
    notes: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [teamError, setTeamError] = useState(false);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleTeamToggle = (teamName) => {
    setFormData(prev => ({
      ...prev,
      teams: prev.teams.includes(teamName)
        ? prev.teams.filter(t => t !== teamName)
        : [...prev.teams, teamName]
    }));
    if (teamError) setTeamError(false);
  };

  const handleArrayChange = (fieldName, value, isChecked) => {
    setFormData(prev => ({
      ...prev,
      [fieldName]: isChecked
        ? [...prev[fieldName], value]
        : prev[fieldName].filter(v => v !== value)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.teams.length === 0) {
      setTeamError(true);
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/submit-form', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          submittedAt: new Date().toISOString()
        })
      });

      if (!response.ok) throw new Error('Failed to submit');

      setSubmitted(true);
      setTimeout(() => {
        setFormData({
          name: '',
          phone: '',
          prevServed: '',
          prevTeams: [],
          currentServed: '',
          currentTeams: [],
          skills: [],
          wantTry: [],
          teams: [],
          notes: ''
        });
        setSubmitted(false);
      }, 3000);
    } catch (err) {
      setError('حصلت مشكلة في الإرسال، حاول تاني.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className={styles.wrap}>
        <div className={styles.confirm}>
          <div className={styles.bigEmoji}>🎉</div>
          <h2>وصلت رغبتك! شكرًا ليك</h2>
          <p>هنكلمك قريب بخصوص التيم اللي اخترته. الأسرة مبسوطة بيك ❤️</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.wrap}>
      <style jsx>{`
        :root {
          --ink: #2A211B;
          --parchment: #FAF3E7;
          --parchment-deep: #F1E6D3;
          --gold: #C08A3E;
          --gold-deep: #9C6C28;
          --line: #E3D5B8;
          --c-social: #3E7C82;
          --c-social-bg: #EAF2F1;
          --c-prayer: #8B3A3A;
          --c-prayer-bg: #F6EAE8;
          --c-fun: #B8792A;
          --c-fun-bg: #F8EFDF;
          --c-hymns: #6A5590;
          --c-hymns-bg: #EFEAF5;
          --c-content: #3D6B47;
          --c-content-bg: #E9F1EA;
        }

        * {
          box-sizing: border-box;
        }

        body {
          margin: 0;
          background: var(--parchment);
          color: var(--ink);
          font-family: 'Tajawal', sans-serif;
          line-height: 1.7;
        }
      `}</style>

      <div className={styles.hero}>
        <a href="/dashboard" className={styles.heroEyebrow}>
          <img src="/osra.png" alt="Logo"  className="w-32 h-32 " width={52} height={52}/>
        </a>
        <h1>استمارة اختيار التيم</h1>
        <p>انضم للتيم اللي بيناسبك وساعدنا نخلي كل اجتماع ميتنسيش</p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4 items-center">
        {error && <div className={styles.errorMsg}>{error}</div>}

        {/* Personal Info */}
        <div className={`${styles.card} w-full`}>
          <label className={styles.fieldLabel} htmlFor="name">
            الاسم الكامل *
          </label>
          <input
            type="text"
            id="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="اكتب اسمك"
            required
          />
        </div>

        <div className={`${styles.card} w-full`}>
          <label className={styles.fieldLabel} htmlFor="phone">
            رقم الهاتف (عليه واتساب) *
          </label>
          <input
            type="tel"
            id="phone"
            value={formData.phone}
            onChange={handleInputChange}
            placeholder="رقمك"
            required
          />
        </div>

        {/* Previous Service */}
        <div className={`${styles.card} w-full`}>
          <label className={styles.fieldLabel}>
            هل خدمت معانا قبل كده؟
          </label>
          <div className={styles.yesnoRow}>
            <label className={`${styles.ynOption} ${formData.prevServed === 'أيوه' ? styles.checked : ''}`}>
              <input
                type="radio"
                name="prevServed"
                value="أيوه"
                checked={formData.prevServed === 'أيوه'}
                onChange={(e) => setFormData(prev => ({ ...prev, prevServed: e.target.value }))}
              />
              أيوه
            </label>
            <label className={`${styles.ynOption} ${formData.prevServed === 'لا' ? styles.checked : ''}`}>
              <input
                type="radio"
                name="prevServed"
                value="لا"
                checked={formData.prevServed === 'لا'}
                onChange={(e) => setFormData(prev => ({ ...prev, prevServed: e.target.value }))}
              />
              لا
            </label>
          </div>

          {formData.prevServed === 'أيوه' && (
            <div className={styles.subQuestion}>
              <label className={styles.fieldLabel}>خدمت في ايه؟</label>
              <div className={styles.chipList}>
                {['تنظيم', 'السوشيال ميديا', ' الصلاة', ' الالعاب', ' الترانيم', ' المحتوى (ورشة)', 'حاجة تانية'].map(team => (
                  <label key={team} className={`${styles.chip} ${formData.prevTeams.includes(team) ? styles.checked : ''}`}>
                    <input
                      type="checkbox"
                      value={team}
                      checked={formData.prevTeams.includes(team)}
                      onChange={(e) => handleArrayChange('prevTeams', team, e.target.checked)}
                    />
                    {team}
                  </label>
                ))}
              </div>
              {formData.prevTeams.includes('حاجة تانية') && (
                <input
                  type="text"
                  className={styles.otherInput}
                  placeholder="اكتب حاجة تانية..."
                  onBlur={(e) => {
                    if (e.target.value) {
                      setFormData(prev => ({
                        ...prev,
                        prevTeams: [...prev.prevTeams.filter(t => t !== 'حاجة تانية'), e.target.value]
                      }));
                    }
                  }}
                />
              )}
            </div>
          )}
        </div>

        {/* Current Service */}
        <div className={`${styles.card} w-full`}>
          <label className={styles.fieldLabel}>
            هل أنت بتخدم حالياً في كنيستك؟
          </label>
          <div className={styles.yesnoRow}>
            <label className={`${styles.ynOption} ${formData.currentServed === 'أيوه' ? styles.checked : ''}`}>
              <input
                type="radio"
                name="currentServed"
                value="أيوه"
                checked={formData.currentServed === 'أيوه'}
                onChange={(e) => setFormData(prev => ({ ...prev, currentServed: e.target.value }))}
              />
              أيوه
            </label>
            <label className={`${styles.ynOption} ${formData.currentServed === 'لا' ? styles.checked : ''}`}>
              <input
                type="radio"
                name="currentServed"
                value="لا"
                checked={formData.currentServed === 'لا'}
                onChange={(e) => setFormData(prev => ({ ...prev, currentServed: e.target.value }))}
              />
              لا
            </label>
          </div>

          {formData.currentServed === 'أيوه' && (
            <div className={styles.subQuestion}>
              <label className={styles.fieldLabel}>بتخدم في ايه؟</label>
              <div className={styles.chipList}>
                {['تنظيم', 'السوشيال ميديا', ' الصلاة', ' الالعاب', ' الترانيم', ' المحتوى (ورشة)', 'حاجة تانية'].map(team => (
                  <label key={team} className={`${styles.chip} ${formData.currentTeams.includes(team) ? styles.checked : ''}`}>
                    <input
                      type="checkbox"
                      value={team}
                      checked={formData.currentTeams.includes(team)}
                      onChange={(e) => handleArrayChange('currentTeams', team, e.target.checked)}
                    />
                    {team}
                  </label>
                ))}
              </div>
              {formData.currentTeams.includes('حاجة تانية') && (
                <input
                  type="text"
                  className={styles.otherInput}
                  placeholder="اكتب حاجة تانية..."
                  onBlur={(e) => {
                    if (e.target.value) {
                      setFormData(prev => ({
                        ...prev,
                        currentTeams: [...prev.currentTeams.filter(t => t !== 'حاجة تانية'), e.target.value]
                      }));
                    }
                  }}
                />
              )}
            </div>
          )}
        </div>

        {/* Skills */}
        <div className={styles.card}>
          <label className={styles.fieldLabel}>ايه المهارات اللي عندك؟</label>
          <div className={styles.chipList}>
            {[ 'ترانيم','التصوير', 'التصميم', 'الكتابة', 'مونتاج', 'الموسيقى', 'التنظيم', 'الإدارة', 'حاجة تانية'].map(skill => (
              <label key={skill} className={`${styles.chip} ${formData.skills.includes(skill) ? styles.checked : ''}`}>
                <input
                  type="checkbox"
                  name="skills"
                  value={skill}
                  checked={formData.skills.includes(skill)}
                  onChange={(e) => handleArrayChange('skills', skill, e.target.checked)}
                />
                {skill}
              </label>
            ))}
          </div>
          {formData.skills.includes('حاجة تانية') && (
            <input
              type="text"
              className={styles.otherInput}
              placeholder="اكتب مهارة تانية..."
              onBlur={(e) => {
                if (e.target.value) {
                  setFormData(prev => ({
                    ...prev,
                    skills: [...prev.skills.filter(s => s !== 'حاجة تانية'), e.target.value]
                  }));
                }
              }}
            />
          )}
        </div>

        {/* Want to Try */}
        <div className={styles.card}>
          <label className={styles.fieldLabel}>عايز تتعلم او تجرب حاجه جديدة ؟</label>
          <div className={styles.chipList}>
            {['التصوير', 'التصميم', 'الكتابة', 'الفيديو', 'الموسيقى', 'التنظيم', 'الإدارة', 'حاجة تانية'].map(want => (
              <label key={want} className={`${styles.chip} ${formData.wantTry.includes(want) ? styles.checked : ''}`}>
                <input
                  type="checkbox"
                  name="wantTry"
                  value={want}
                  checked={formData.wantTry.includes(want)}
                  onChange={(e) => handleArrayChange('wantTry', want, e.target.checked)}
                />
                {want}
              </label>
            ))}
          </div>
          {formData.wantTry.includes('حاجة تانية') && (
            <input
              type="text"
              className={styles.otherInput}
              placeholder="اكتب حاجة تانية..."
              onBlur={(e) => {
                if (e.target.value) {
                  setFormData(prev => ({
                    ...prev,
                    wantTry: [...prev.wantTry.filter(w => w !== 'حاجة تانية'), e.target.value]
                  }));
                }
              }}
            />
          )}
        </div>

        {/* Teams Selection */}
        <h2 className={styles.sectionTitle}>دلوقتي اختار حابب تخدم مع  S.J.S.M.F في انهي تيم</h2>
        <p className={styles.sectionSub}>تقدر تختار اكتر من تيم </p>

        {TEAMS_DATA.map(team => (
          <label
            key={team.key}
            className={`${styles.card} w-full cursor-pointer ${formData.teams.includes(team.name) ? styles.checked : ''}`}
            onClick={() => handleTeamToggle(team.name)}
          >
            <div className={styles.teamHead}>
              <input
                type="checkbox"
                value={team.name}
                checked={formData.teams.includes(team.name)}
                onChange={() => {
                  handleTeamToggle(team.name);
                }}
              />
              <span className={styles.teamEmoji}>{team.emoji}</span>
              <span className={styles.teamName}>{team.name}</span>
            </div>
            <div className={styles.teamDesc}>{team.desc}</div>
          </label>
        ))}

        {teamError && <p className={styles.errorMsg}>من فضلك اختار تيم واحد على الأقل.</p>}

        {/* Notes */} 
        <div className={`${styles.card} w-full`} style={{ marginTop: '8px' }}>
          <label className={styles.fieldLabel} htmlFor="notes">
            حابب تضيف حاجة؟ (اختياري)
          </label>
          <textarea
            id="notes"
            value={formData.notes}
            onChange={handleInputChange}
            placeholder="أي رغبة أو ملاحظة حابب تقولها..."
          />
        </div>

        <button type="submit" className={styles.submitBtn} disabled={loading}>
          {loading ? 'جاري الإرسال...' : 'إرسال الاستمارة'}
        </button>
      </form>
    </div>
  );
}
