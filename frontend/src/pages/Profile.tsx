import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import '../styles/Profile.css';

interface Education {
  institution: string;
  degree: string;
  year: string;
}

interface Experience {
  company: string;
  position: string;
  duration: string;
}

const Profile: React.FC = () => {
  const [name, setName] = useState('Nam Do San');
  const [email, setEmail] = useState('SamSan Tech.com');
  const [bio, setBio] = useState('Im a tech founder focused on the intersection between healthcare and AI. Looking forward to learning!');
  const [education, setEducation] = useState<Education[]>([
    { institution: 'University of California, Berkeley', degree: 'Bachelor of Science in Computer Science', year: '2020-2024' }
  ]);
  const [experience, setExperience] = useState<Experience[]>([
    { company: 'SamSan Tech', position: 'Founding Engineer', duration: 'Summer 2023' }
  ]);
  const [skills, setSkills] = useState<string[]>(['JavaScript', 'React', 'Node.js', 'Python']);
  const [isEditing, setIsEditing] = useState(false);
  const [image, setImage] = useState<string>("/Nam-Joo-Hyuk.jpg");

  useEffect(() => {
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      ctx?.drawImage(img, 0, 0);
      setImage(canvas.toDataURL('image/jpeg'));
    };
    img.src = image;
  }, []);

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleSave = () => {
    // Here you would typically send the updated profile data to a server
    setIsEditing(false);
  };

  const handleAddEducation = () => {
    setEducation([...education, { institution: '', degree: '', year: '' }]);
  };

  const handleAddExperience = () => {
    setExperience([...experience, { company: '', position: '', duration: '' }]);
  };

  const handleAddSkill = (skill: string) => {
    if (skill && !skills.includes(skill)) {
      setSkills([...skills, skill]);
    }
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="profile-page">
      <Sidebar />
      <div className="profile-main-content">
        <h1 className="page-title">My Profile</h1>
        
        <section className="profile-header">
          <div className="profile-image-container">
            <img src={image} alt="Profile" className="profile-image" />
            {isEditing && (
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="image-upload-input"
              />
            )}
          </div>
          {isEditing ? (
            <input 
              type="text" 
              value={name} 
              onChange={(e) => setName(e.target.value)} 
              className="edit-name"
            />
          ) : (
            <h2>{name}</h2>
          )}
          <button onClick={handleEditToggle} className="edit-button">
            {isEditing ? 'Cancel' : 'Edit Profile'}
          </button>
          {isEditing && <button onClick={handleSave} className="save-button">Save Changes</button>}
        </section>

        <section className="profile-details">
          <h3>Contact Information</h3>
          {isEditing ? (
            <input 
              type="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              className="edit-email"
            />
          ) : (
            <p>{email}</p>
          )}

          <h3>Bio</h3>
          {isEditing ? (
            <textarea 
              value={bio} 
              onChange={(e) => setBio(e.target.value)} 
              className="edit-bio"
            />
          ) : (
            <p>{bio}</p>
          )}
        </section>

        <section className="education-section">
          <h3>Education</h3>
          {education.map((edu, index) => (
            <div key={index} className="education-item">
              {isEditing ? (
                <>
                  <input 
                    type="text" 
                    value={edu.institution} 
                    onChange={(e) => {
                      const newEducation = [...education];
                      newEducation[index].institution = e.target.value;
                      setEducation(newEducation);
                    }} 
                    placeholder="Institution"
                  />
                  <input 
                    type="text" 
                    value={edu.degree} 
                    onChange={(e) => {
                      const newEducation = [...education];
                      newEducation[index].degree = e.target.value;
                      setEducation(newEducation);
                    }} 
                    placeholder="Degree"
                  />
                  <input 
                    type="text" 
                    value={edu.year} 
                    onChange={(e) => {
                      const newEducation = [...education];
                      newEducation[index].year = e.target.value;
                      setEducation(newEducation);
                    }} 
                    placeholder="Year"
                  />
                </>
              ) : (
                <p>{edu.institution} - {edu.degree} ({edu.year})</p>
              )}
            </div>
          ))}
          {isEditing && <button onClick={handleAddEducation} className="add-button">Add Education</button>}
        </section>

        <section className="experience-section">
          <h3>Experience</h3>
          {experience.map((exp, index) => (
            <div key={index} className="experience-item">
              {isEditing ? (
                <>
                  <input 
                    type="text" 
                    value={exp.company} 
                    onChange={(e) => {
                      const newExperience = [...experience];
                      newExperience[index].company = e.target.value;
                      setExperience(newExperience);
                    }} 
                    placeholder="Company"
                  />
                  <input 
                    type="text" 
                    value={exp.position} 
                    onChange={(e) => {
                      const newExperience = [...experience];
                      newExperience[index].position = e.target.value;
                      setExperience(newExperience);
                    }} 
                    placeholder="Position"
                  />
                  <input 
                    type="text" 
                    value={exp.duration} 
                    onChange={(e) => {
                      const newExperience = [...experience];
                      newExperience[index].duration = e.target.value;
                      setExperience(newExperience);
                    }} 
                    placeholder="Duration"
                  />
                </>
              ) : (
                <p>{exp.company} - {exp.position} ({exp.duration})</p>
              )}
            </div>
          ))}
          {isEditing && <button onClick={handleAddExperience} className="add-button">Add Experience</button>}
        </section>

        <section className="skills-section">
          <h3>Skills</h3>
          <div className="skills-list">
            {skills.map((skill, index) => (
              <span key={index} className="skill-tag">{skill}</span>
            ))}
          </div>
          {isEditing && (
            <div className="add-skill">
              <input 
                type="text" 
                placeholder="Add a skill" 
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    handleAddSkill(e.currentTarget.value);
                    e.currentTarget.value = '';
                  }
                }}
              />
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default Profile;