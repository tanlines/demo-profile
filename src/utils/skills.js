class Skill {
  constructor(name, relatedSections = []) {
    this.name = name;
    this.relatedSections = relatedSections;
  }
}

export const createSkill = (name, relatedSections = []) => {
  return new Skill(name, relatedSections);
};

export const extractSkillsFromExperiences = (experiences) => {
  const skillMap = new Map();
  
  // Process experiences in chronological order (most recent first)
  experiences.forEach(exp => {
    exp.technologies.forEach(tech => {
      if (!skillMap.has(tech)) {
        skillMap.set(tech, {
          name: tech,
          relatedSections: [exp.title],
          lastUsed: exp.period
        });
      } else {
        // Add the experience to related sections if not already present
        const skill = skillMap.get(tech);
        if (!skill.relatedSections.includes(exp.title)) {
          skill.relatedSections.push(exp.title);
        }
      }
    });
  });

  // Convert to array and sort by most recent usage
  return Array.from(skillMap.values())
    .sort((a, b) => {
      // Sort by most recent period first
      const getYear = (period) => {
        const year = period.split('-')[0].trim();
        return year === 'Present' ? new Date().getFullYear() : parseInt(year);
      };
      return getYear(b.lastUsed) - getYear(a.lastUsed);
    })
    .map(skill => createSkill(skill.name, skill.relatedSections));
}; 