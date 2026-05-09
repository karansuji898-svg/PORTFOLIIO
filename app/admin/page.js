"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { CldUploadWidget } from 'next-cloudinary';
import styles from './admin.module.css';

export default function AdminDashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState('');
  const router = useRouter();

  useEffect(() => {
    fetch('/api/portfolio')
      .then(res => res.json())
      .then(json => {
        setData(json);
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to fetch data:', err);
        router.push('/login');
      });
  }, [router]);

  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await fetch('/api/portfolio', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        setToast('Changes saved successfully!');
        setTimeout(() => setToast(''), 3000);
      } else {
        alert('Failed to save changes.');
      }
    } catch (err) {
      console.error(err);
      alert('An error occurred while saving.');
    } finally {
      setSaving(false);
    }
  };

  const handleLogout = async () => {
    try {
      await fetch('/api/logout', { method: 'POST' });
      router.push('/login');
    } catch (err) {
      console.error('Logout failed:', err);
    }
  };

  const updateHero = (field, value) => {
    setData(prev => ({ ...prev, hero: { ...prev.hero, [field]: value } }));
  };

  const updateIntro = (field, value) => {
    setData(prev => ({ ...prev, introduction: { ...prev.introduction, [field]: value } }));
  };

  // Content Category Handlers
  const updateContentCategoryTitle = (index, title) => {
    const newContents = [...data.contents];
    newContents[index].title = title;
    setData(prev => ({ ...prev, contents: newContents }));
  };

  const addContentCategory = () => {
    setData(prev => ({ ...prev, contents: [...prev.contents, { title: 'New Category', images: [] }] }));
  };

  const removeContentCategory = (index) => {
    const newContents = data.contents.filter((_, i) => i !== index);
    setData(prev => ({ ...prev, contents: newContents }));
  };

  const addCategoryImage = (catIndex, url) => {
    const newContents = [...data.contents];
    newContents[catIndex].images.push(url);
    setData(prev => ({ ...prev, contents: newContents }));
  };

  const updateCategoryImage = (catIndex, imgIndex, url) => {
    const newContents = [...data.contents];
    newContents[catIndex].images[imgIndex] = url;
    setData(prev => ({ ...prev, contents: newContents }));
  };

  const removeCategoryImage = (catIndex, imgIndex) => {
    const newContents = [...data.contents];
    newContents[catIndex].images = newContents[catIndex].images.filter((_, i) => i !== imgIndex);
    setData(prev => ({ ...prev, contents: newContents }));
  };

  const updateEducation = (index, field, value) => {
    const newEdu = [...data.education];
    newEdu[index][field] = value;
    setData(prev => ({ ...prev, education: newEdu }));
  };

  const addEducation = () => {
    setData(prev => ({
      ...prev,
      education: [...prev.education, { level: 'New Level', institution: 'New Institution' }]
    }));
  };

  const removeEducation = (index) => {
    const newEdu = data.education.filter((_, i) => i !== index);
    setData(prev => ({ ...prev, education: newEdu }));
  };

  if (loading) return <div className={styles.adminSection}><div className="container">Loading dashboard...</div></div>;

  return (
    <div className={styles.adminSection}>
      <div className={styles.dashboard}>
        <div className={styles.header}>
          <h1 className={styles.heading}>Portfolio Admin</h1>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <button className={styles.addBtn} onClick={handleLogout}>Logout</button>
            <button
              className={styles.saveBtn}
              onClick={handleSave}
              disabled={saving}
            >
              {saving ? 'Saving...' : 'Save All Changes'}
            </button>
          </div>
        </div>

        {/* HERO SECTION */}
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Hero Section</h2>
          <div className={styles.formGroup}>
            <label className={styles.label}>Title</label>
            <input className={styles.input} value={data.hero.title} onChange={e => updateHero('title', e.target.value)} />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label}>Subtitle</label>
            <input className={styles.input} value={data.hero.subtitle} onChange={e => updateHero('subtitle', e.target.value)} />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label}>Author Name</label>
            <input className={styles.input} value={data.hero.name} onChange={e => updateHero('name', e.target.value)} />
          </div>
        </div>

        {/* INTRODUCTION SECTION */}
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Introduction Section</h2>
          <div className={styles.formGroup}>
            <label className={styles.label}>Profile Image</label>
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '1rem' }}>
              <img src={data.introduction.imageUrl} alt="Profile" style={{ width: '80px', height: '80px', borderRadius: '50%', objectFit: 'cover', border: '1px solid #333' }} />
              <CldUploadWidget
                signatureEndpoint="/api/cloudinary-signature"
                uploadPreset="ml_default"
                options={{
                  multiple: false,
                  cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
                }}
                onSuccess={(result) => {
                  console.log('Profile upload success:', result);
                  updateIntro('imageUrl', result.info.secure_url);
                }}
                onError={(error) => {
                  console.error('Profile upload error:', error);
                }}
              >
                {({ open }) => (
                  <button className={styles.addBtn} onClick={() => open()}>Change Profile Photo</button>
                )}
              </CldUploadWidget>
            </div>
            <input className={styles.input} value={data.introduction.imageUrl} onChange={e => updateIntro('imageUrl', e.target.value)} placeholder="Or paste Image URL" />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label}>Biography Text</label>
            <textarea className={styles.textarea} value={data.introduction.text} onChange={e => updateIntro('text', e.target.value)} />
          </div>
        </div>

        {/* EDUCATION SECTION */}
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Education Qualifications</h2>
          <div className={styles.dynamicList}>
            {data.education.map((item, index) => (
              <div key={index} className={styles.listItem}>
                <input
                  className={styles.input}
                  value={item.level}
                  onChange={e => updateEducation(index, 'level', e.target.value)}
                  placeholder="Level (e.g. 10th)"
                />
                <input
                  className={styles.input}
                  value={item.institution}
                  onChange={e => updateEducation(index, 'institution', e.target.value)}
                  placeholder="Institution Name"
                />
                <button className={styles.removeBtn} onClick={() => removeEducation(index)}>Remove</button>
              </div>
            ))}
          </div>
          <button className={styles.addBtn} onClick={addEducation}>+ Add Education</button>
        </div>

        {/* CONTENTS / GALLERY SECTION */}
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Portfolio Categories & Galleries</h2>
          <div className={styles.dynamicList}>
            {data.contents.map((category, catIndex) => (
              <div key={catIndex} className={styles.formGroup} style={{ border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', padding: '1.5rem', background: 'rgba(0,0,0,0.2)' }}>
                <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
                  <input
                    className={styles.input}
                    value={category.title}
                    onChange={e => updateContentCategoryTitle(catIndex, e.target.value)}
                    placeholder="Category Title"
                    style={{ fontWeight: 'bold' }}
                  />
                  <button className={styles.removeBtn} onClick={() => removeContentCategory(catIndex)}>Remove Category</button>
                </div>

                <div style={{ paddingLeft: '2rem', borderLeft: '2px solid rgba(255,255,255,0.1)' }}>
                  <h4 style={{ marginBottom: '1rem', color: 'var(--color-text-muted)' }}>Images in {category.title}</h4>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.5rem' }}>
                    {category.images.map((imgUrl, imgIndex) => (
                      <div key={imgIndex} style={{ position: 'relative', width: '120px', height: '120px', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', overflow: 'hidden' }}>
                        <img src={imgUrl} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        <button
                          onClick={() => removeCategoryImage(catIndex, imgIndex)}
                          style={{ position: 'absolute', top: '5px', right: '5px', background: 'rgba(255, 68, 68, 0.9)', color: 'white', border: 'none', borderRadius: '50%', width: '24px', height: '24px', cursor: 'pointer', fontSize: '14px', display: 'flex', alignItems: 'center', justifyCenter: 'center', fontWeight: 'bold' }}
                        >✕</button>
                      </div>
                    ))}
                  </div>

                  <CldUploadWidget
                    signatureEndpoint="/api/cloudinary-signature"
                    uploadPreset="ml_default"
                    options={{
                      multiple: true,
                      maxFiles: 10,
                      cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
                    }}
                    onSuccess={(result) => {
                      console.log('Upload success:', result);
                      if (result.event === 'success') {
                        addCategoryImage(catIndex, result.info.secure_url);
                      }
                    }}
                    onError={(error) => {
                      console.error('Upload error:', error);
                    }}
                  >
                    {({ open }) => (
                      <button className={styles.addBtn} onClick={() => open()}>+ Upload Multiple Photos to {category.title}</button>
                    )}
                  </CldUploadWidget>
                </div>
              </div>
            ))}
          </div>
          <button className={styles.addBtn} onClick={addContentCategory}>+ Add New Category</button>
        </div>

      </div>

      {toast && <div className={styles.toast}>{toast}</div>}
    </div>
  );
}
