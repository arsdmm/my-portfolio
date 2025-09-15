// src/Components/Skills.jsx
export default function Skills() {
  const skills = [
    { name: "SQL", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg" },
    { name: "Oracle", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/oracle/oracle-original.svg" },
    { name: "Azure", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/azure/azure-original.svg" },
    { name: "AWS", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/Amazon_Web_Services_Logo.svg/1024px-Amazon_Web_Services_Logo.svg.png" },
    { name: "Python", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
    { name: "Power BI", logo: "https://img.icons8.com/color/48/power-bi.png" },
    { name: "Tableau", logo: "https://cdn.worldvectorlogo.com/logos/tableau-software.svg" },
    { name: "Excel", logo: "https://img.icons8.com/color/48/microsoft-excel-2019--v1.png" },
    { name: "MongoDB", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" },
    { name: "Hadoop", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/apache/apache-original.svg" },
    { name: "Weka", logo: "https://dashboard.snapcraft.io/site_media/appmedia/2021/10/weka.png" },
    { name: "Git", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" },
  ];

  return (
    <section className="h-screen flex flex-col items-center justify-center bg-black text-white snap-start">
      {/* Section title */}
      <h2 className="text-3xl font-semibold mb-12">Skills</h2>

      {/* Skills grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8 max-w-5xl">
        {skills.map((skill) => (
          <div
            key={skill.name}
            className="flex flex-col items-center justify-center p-4 border border-gray-700 rounded-lg 
                       bg-gray-900/40 backdrop-blur-sm shadow-md transition-transform duration-300 
                       hover:scale-105"
          >
            <img src={skill.logo} alt={skill.name} className="w-12 h-12 object-contain mb-3" />
            <p className="text-sm text-gray-300">{skill.name}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
