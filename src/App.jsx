import React, { useState, useEffect } from 'react';
import { Github, Linkedin, Mail, ExternalLink, Menu, X } from 'lucide-react';
import image from '../public/akhrors.jpg';

const Portfolio = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [isVisible, setIsVisible] = useState({});
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  // Scroll animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsVisible((prev) => ({
            ...prev,
            [entry.target.id]: entry.isIntersecting,
          }));
        });
      },
      { threshold: 0.1 }
    );

    const sections = document.querySelectorAll('section');
    sections.forEach((section) => observer.observe(section));

    return () => sections.forEach((section) => observer.unobserve(section));
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: 'smooth' });
    setActiveSection(sectionId);
    setIsMenuOpen(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleClickTG = async (e) => {
    e.preventDefault();

    const { name, email, message } = formData;

    // Telegram bot token and chat ID
    const BOT_TOKEN = '7682238116:AAFdyCOGb4mKutJDpVJySgecqkjtPfRZy_g'; // Telegram bot token
    const CHAT_ID = '6895267546'; // Telegram chat ID

    const text = `Ism: ${name}\nEmail: ${email}\nXabar: ${message}`;
    const url = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage?chat_id=${CHAT_ID}&text=${encodeURIComponent(text)}`;

    try {
      const response = await fetch(url);
      if (response.ok) {
        alert('Xabar yuborildi!');
        setFormData({ name: '', email: '', message: '' });
      } else {
        alert('Xabar yuborishda xatolik yuz berdi.');
      }
    } catch (error) {
      alert('Xabar yuborishda xatolik yuz berdi.');
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 text-white relative overflow-hidden">
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(17,24,39,0.9),rgba(17,24,39,1))]" />
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="star"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `twinkle ${Math.random() * 3 + 2}s infinite`,
            }}
          />
        ))}
      </div>

      <nav className="fixed w-full bg-gray-900/80 backdrop-blur-lg z-50 border-b border-blue-500/20">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            <a href="#" className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent hover:scale-110 transition-transform duration-300">
              Portfolio
            </a>

            <button
              className="md:hidden p-2 rounded-lg hover:bg-blue-500/20 transition-colors duration-300"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className="animate-spin-slow" />
              ) : (
                <Menu className="animate-pulse" />
              )}
            </button>

            <div className="hidden md:flex space-x-8">
              {['home', 'about', 'projects', 'contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item)}
                  className={`capitalize hover:scale-110 transition-all duration-300 ${
                    activeSection === item
                      ? 'text-blue-400 font-bold'
                      : 'text-gray-300'
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden absolute w-full bg-gray-900/95 backdrop-blur-lg animate-slideDown">
            <div className="container mx-auto px-4 py-2">
              {['home', 'about', 'projects', 'contact'].map((item, index) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item)}
                  className="block w-full text-left py-2 px-4 capitalize hover:bg-blue-500/20 transition-colors duration-300"
                  style={{ animation: `slideIn 0.${index + 2}s ease-out` }}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>

      <section id="home" className="min-h-screen flex items-center justify-center pt-16 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-900/20 to-purple-900/30" />
        <div className="container mx-auto px-4 relative">
          <div className="flex flex-col items-center text-center">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-tilt"></div>
              <div className="relative w-48 h-48 rounded-full overflow-hidden ring-2 ring-blue-500/50">
                <img
                  src={image}
                  alt="Profile"
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                />
              </div>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mt-8 mb-4">
              Salom, Men{' '}
              <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 text-transparent bg-clip-text animate-gradient">
                Akhror Dev
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-blue-200 mb-8 animate-slideUp">
              Frontend Developer
            </p>
            <div className="flex space-x-4 animate-bounce">
              <SocialButton icon={<Github />} href="https://github.com/" />
              <SocialButton icon={<Linkedin />} href="https://www.linkedin.com/feed/" />
              <SocialButton icon={<Mail />} href="https://mail.google.com/mail/u/0/#inbox" />
            </div>
          </div>
        </div>
      </section>

      <section id="about" className={`py-20 relative ${isVisible.about ? 'animate-fadeIn' : 'opacity-0'}`}>
  <div className="absolute inset-0 bg-gradient-to-b from-purple-900/30 to-blue-900/30" />
  <div className="container mx-auto px-4 relative">
    <h2 className="text-3xl font-bold text-center mb-12 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
      Men Haqimda
    </h2>
    <div className="flex justify-center">
      <div className="rounded-md shadow-xl border-2 p-8 w-full md:w-1/2 mx-2">
        <h3 className="text-xl font-semibold text-blue-400">Ko'nikmalar</h3>
        <div className="space-y-4">
          {[
            { name: 'React' },
            { name: 'JavaScript' },
            { name: 'TypeScript' },
            { name: 'React Native' },
            { name: 'Next.js' },
            { name: 'Tailwind CSS' },
            { name: 'Firebase' },
            { name: 'Redux Toolkit' },
            { name: 'Ant Design'},
            { name: 'DaisyUI'},
            { name: 'Bootstrap'},
          ].map(skill => (
            <div key={skill.name} className="flex justify-between">
              <span>{skill.name}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="border-2 rounded-md shadow-xl p-8 w-full md:w-1/2 mx-2">
        <h3 className="text-xl font-semibold text-blue-400">Tajriba</h3>
        <ul className="list-disc list-inside space-y-2">
          <li>Frontend Developer - INTERNSHIP man, (2023 - 2024 Najot ta'limni bitirdim.)</li>
          <li>Amaliyot uchun ish qidiryabman agar sizda frontend dasturchiga ehtiyoj bo'lsa menga murojaat qiling.</li>
          <li>Freelance xizmati ham mavjud.</li>
          <li>O'z ustimda ishlab shu soha bo'yicha bilim va ko'nikmalarimni yanada oshirmoqchiman.</li>
          <li>Loyihalarga keladigan bo'lsak, hozircha tugatmadim, backendchi qidiryabman loyihalarimni oxiriga yetkazish uchun.</li>
        </ul>
      </div>
    </div>
  </div>
</section>


      <section id="projects" className={`py-20 relative ${isVisible.projects ? 'animate-fadeIn' : 'opacity-0'}`}>
        <div className="absolute inset-0 bg-gradient-to-b from-blue-900/30 to-purple-900/30" />
        <div className="container mx-auto px-4 relative">
          <h2 className="text-3xl font-bold text-center mb-12 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            Loyihalar
          </h2>
          <h3 className='text-2xl flex justify-center mb-8 items-center'>Ushbu loyihalar mobile uchun moslanmagan...</h3>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: 'Project 1', link: 'https://the-final-exam-of-the-eighth-month.vercel.app/', description: 'Bu loyiha spotify clone vercel sabab bazi xatoliklar kelib chiqishi mumkin!' },
              { title: 'Project 2', link: 'https://school-crm-system-project.vercel.app/', description: 'Bu loyiha Maktab, Xususiy muassasalar uchun CRM tizim, backendi yozilmoqda...' },
              { title: 'Project 3', link: '', description: '' },
            ].map((project) => (
              <div key={project.title} className="bg-gray-800 p-4 rounded-lg hover:shadow-lg transition-shadow duration-300">
                <h3 className="text-lg font-bold text-blue-400">{project.title}</h3>
                <p className="text-gray-300">{project.description}</p>
                <a
                  href={project.link}
                  className="text-blue-500 underline mt-2 block"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Ko'rish
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className={`py-20 relative ${isVisible.contact ? 'animate-fadeIn' : 'opacity-0'}`}>
        <div className="absolute inset-0 bg-gradient-to-b from-purple-900/30 to-blue-900/30" />
        <div className="container mx-auto px-4 relative">
          <h2 className="text-3xl font-bold text-center mb-12 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            Bog'laning
          </h2>
          <form className="max-w-lg mx-auto space-y-4" onSubmit={handleClickTG}>
            <input
              type="text"
              name="name"
              placeholder="Ism"
              value={formData.name}
              onChange={handleChange}
              className="w-full bg-gray-800 text-white rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full bg-gray-800 text-white rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
              required
            />
            <textarea
              name="message"
              rows="4"
              placeholder="Xabar"
              value={formData.message}
              onChange={handleChange}
              className="w-full bg-gray-800 text-white rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
              required
            />
            <button className="w-full bg-blue-500 hover:bg-blue-600 transition-colors duration-300 text-white font-semibold rounded-md px-4 py-2">
              Yuborish
            </button>
          </form>
        </div>
      </section>

      <footer className="py-6 text-center">
        <p className="text-gray-400">&copy; 2024 Akhror Dev. Barcha huquqlar himoyalangan.</p>
      </footer>
    </div>
  );
};

const SocialButton = ({ icon, href }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="text-gray-300 hover:text-blue-500 transition-colors duration-300"
  >
    {icon}
  </a>
);

export default Portfolio;
