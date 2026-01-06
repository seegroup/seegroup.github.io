(function() {
  const translations = {
    en: {
      nav: {
        home: 'Home',
        people: 'People',
        projects: 'Projects',
        publications: 'Publications',
        contact: 'Contact'
      },
      index: {
        intro: 'We are a research group at Mid Sweden University focusing on **software engineering**, **software testing**, and **generative AI in development and education**.',
        context: 'Worldwide, there is an increasing demand for software professionals, and software engineers are the fifth most common profession in Sweden today. The SEE Research Group consists of social scientists and computer scientists with the goal of understanding how software is successfully created and how to best learn software development.',
        invested: 'We are particularly invested into:',
        researchDir1: '**The quality assurance of software and AI through testing and test augmentation** (contact <a href="mailto:felix.dobslaw@miun.se">Felix Dobslaw</a>)',
        researchDir2: '**The gap between education and industry demands and the role of life-long learning** (contact <a href="mailto:lena-maria.oberg@miun.se">Lena-Maria Öberg</a>)',
        researchDir3: '**Forms of distance collaboration and their implications for individuals and organizations** (contact <a href="mailto:thomas.persson@miun.se">Thomas Persson</a>)',
        researchTitle: 'What we do',
        researchDesc: 'Applied research in software testing, trustworthy AI, and empirical studies of developer work and learning.',
        researchBadge: 'Research',
        researchLink: 'See projects →',
        peopleTitle: 'Who we are',
        peopleDesc: 'Senior researchers, postdocs, and PhD students collaborating across software engineering and education.',
        peopleBadge: 'People',
        peopleLink: 'Meet the group →',
        contactTitle: 'Collaborate',
        contactDesc: 'Interested in collaborating with us or supervising a thesis project?',
        contactBadge: 'Contact',
        contactLink: 'Get in touch →',
        newsBadge: 'Latest News',
        newsLink: 'Read more news →',
        news: 'News'
      },
      contact: {
        title: 'Contact',
        groupLead: 'Group lead',
        email: 'Email',
        location: 'Location',
        formed: 'The group was formed in 2023.',
        collaboration: 'Collaboration',
        collaborationDesc: 'We welcome collaboration with industry and public partners, and offer supervision for thesis projects.',
        openPositions: 'Open Positions',
        openPositionsDesc: 'If you are searching for a position (PhD student, postdoc, or researcher), please reach out to us. We are always interested in connecting with talented individuals who share our research interests.'
      },
      people: {
        title: 'People',
        currentMembers: 'Current Members',
        formerMembers: 'Former Members, Affiliates and Collaborators',
        alumni: 'Alumni Hall of Fame',
        alumniDesc: 'A list of former undergraduate alumni we co-published software engineering articles with, organized by graduation year.',
        graduated: 'Graduated'
      },
      projects: {
        title: 'Projects'
      },
      publications: {
        title: 'Publications'
      },
      footer: {
        researchGroup: 'Research group at Mid Sweden University',
        updated: 'Updated content via Markdown'
      },
      brand: {
        subtitle: 'Mid Sweden University (MIUN)'
      }
    },
    sv: {
      nav: {
        home: 'Hem',
        people: 'Personer',
        projects: 'Projekt',
        publications: 'Publikationer',
        contact: 'Kontakt'
      },
      index: {
        intro: 'Vi är en forskningsgrupp vid Mittuniversitetet som fokuserar på **programvaruteknik**, **programvarutestning** och **generativ AI inom utveckling och utbildning**.',
        context: 'Världen över finns en ökande efterfrågan på programvaruprofessionella, och programvaruingenjörer är det femte vanligaste yrket i Sverige idag. SEE Research Group består av samhällsvetare och datavetare med målet att förstå hur programvara skapas framgångsrikt och hur man bäst lär sig programvaruutveckling.',
        invested: 'Vi är särskilt investerade i:',
        researchDir1: '**Kvalitetssäkring av programvara och AI genom testning och testförstärkning** (kontakta <a href="mailto:felix.dobslaw@miun.se">Felix Dobslaw</a>)',
        researchDir2: '**Gapet mellan utbildning och industrins krav och livslångt lärandes roll** (kontakta <a href="mailto:lena-maria.oberg@miun.se">Lena-Maria Öberg</a>)',
        researchDir3: '**Former av distanssamarbete och deras implikationer för individer och organisationer** (kontakta <a href="mailto:thomas.persson@miun.se">Thomas Persson</a>)',
        researchTitle: 'Vad vi gör',
        researchDesc: 'Tillämpad forskning inom programvarutestning, pålitlig AI och empiriska studier av utvecklares arbete och lärande.',
        researchBadge: 'Forskning',
        researchLink: 'Se projekt →',
        peopleTitle: 'Vilka vi är',
        peopleDesc: 'Seniora forskare, postdocs och doktorander som samarbetar inom programvaruteknik och utbildning.',
        peopleBadge: 'Personer',
        peopleLink: 'Träffa gruppen →',
        contactTitle: 'Samarbeta',
        contactDesc: 'Intresserad av att samarbeta med oss eller handleda ett examensarbete?',
        contactBadge: 'Kontakt',
        contactLink: 'Kontakta oss →',
        newsBadge: 'Senaste nyheter',
        newsLink: 'Läs fler nyheter →',
        news: 'Nyheter'
      },
      contact: {
        title: 'Kontakt',
        groupLead: 'Gruppledare',
        email: 'E-post',
        location: 'Plats',
        formed: 'Gruppen bildades 2023.',
        collaboration: 'Samarbete',
        collaborationDesc: 'Vi välkomnar samarbete med industri och offentliga partners och erbjuder handledning för examensarbeten.',
        openPositions: 'Öppna tjänster',
        openPositionsDesc: 'Om du söker en tjänst (doktorand, postdoktor eller forskare), kontakta oss gärna. Vi är alltid intresserade av att koppla samman med begåvade individer som delar våra forskningsintressen.'
      },
      people: {
        title: 'Personer',
        currentMembers: 'Nuvarande medlemmar',
        formerMembers: 'Tidigare medlemmar, anknutna och samarbetspartners',
        alumni: 'Alumni Hall of Fame',
        alumniDesc: 'En lista över tidigare grundutbildningsalumner som vi har sampublikerat programvaruteknikartiklar med, organiserad efter examenår.',
        graduated: 'Examen'
      },
      projects: {
        title: 'Projekt'
      },
      publications: {
        title: 'Publikationer'
      },
      footer: {
        researchGroup: 'Forskningsgrupp vid Mittuniversitetet',
        updated: 'Uppdaterat innehåll via Markdown'
      },
      brand: {
        subtitle: 'Mittuniversitetet (MIUN)'
      }
    }
  };

  function getCurrentLang() {
    const params = new URLSearchParams(window.location.search);
    const langParam = params.get('lang');
    if (langParam === 'sv' || langParam === 'en') {
      localStorage.setItem('preferredLang', langParam);
      return langParam;
    }
    return localStorage.getItem('preferredLang') || 'en';
  }

  function setLang(lang) {
    const currentUrl = new URL(window.location);
    currentUrl.searchParams.set('lang', lang);
    window.history.replaceState({}, '', currentUrl);
    localStorage.setItem('preferredLang', lang);
    applyTranslations(lang);
  }

  function markdownToHtml(text) {
    return text
      .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.+?)\*/g, '<em>$1</em>');
  }

  function applyTranslations(lang) {
    const t = translations[lang];
    if (!t) return;

    document.documentElement.lang = lang;

    const navLinks = document.querySelectorAll('.nav a');
    if (navLinks.length >= 5) {
      navLinks[0].textContent = t.nav.home;
      navLinks[1].textContent = t.nav.people;
      navLinks[2].textContent = t.nav.projects;
      navLinks[3].textContent = t.nav.publications;
      navLinks[4].textContent = t.nav.contact;
    }

    const langButtons = document.querySelectorAll('.lang-btn');
    langButtons.forEach(btn => {
      btn.classList.remove('active');
      if (btn.dataset.lang === lang) {
        btn.classList.add('active');
      }
    });

    const pagePath = window.location.pathname;
    
    if (pagePath === '/' || pagePath.endsWith('/index.html')) {
      const intro = document.querySelector('#content h1 + p');
      if (intro && !intro.hasAttribute('data-translate')) {
        intro.innerHTML = markdownToHtml(t.index.intro);
      }
      
      const contextPara = document.querySelector('[data-translate="context"]');
      if (contextPara) {
        contextPara.textContent = t.index.context;
      }
      
      const investedPara = document.querySelector('[data-translate="invested"]');
      if (investedPara) {
        investedPara.textContent = t.index.invested;
      }

      const researchDir1 = document.querySelector('[data-translate="researchDir1"]');
      if (researchDir1) {
        researchDir1.innerHTML = markdownToHtml(t.index.researchDir1);
      }
      
      const researchDir2 = document.querySelector('[data-translate="researchDir2"]');
      if (researchDir2) {
        researchDir2.innerHTML = markdownToHtml(t.index.researchDir2);
      }
      
      const researchDir3 = document.querySelector('[data-translate="researchDir3"]');
      if (researchDir3) {
        researchDir3.innerHTML = markdownToHtml(t.index.researchDir3);
      }
      
      const researchBadge = document.querySelector('[data-translate="researchBadge"]');
      if (researchBadge) researchBadge.textContent = t.index.researchBadge;
      
      const researchTitle = document.querySelector('[data-translate="researchTitle"]');
      if (researchTitle) researchTitle.textContent = t.index.researchTitle;
      
      const researchDesc = document.querySelector('[data-translate="researchDesc"]');
      if (researchDesc) researchDesc.textContent = t.index.researchDesc;
      
      const researchLink = document.querySelector('[data-translate="researchLink"]');
      if (researchLink) researchLink.textContent = t.index.researchLink;
      
      const peopleBadge = document.querySelector('[data-translate="peopleBadge"]');
      if (peopleBadge) peopleBadge.textContent = t.index.peopleBadge;
      
      const peopleTitle = document.querySelector('[data-translate="peopleTitle"]');
      if (peopleTitle) peopleTitle.textContent = t.index.peopleTitle;
      
      const peopleDesc = document.querySelector('[data-translate="peopleDesc"]');
      if (peopleDesc) peopleDesc.textContent = t.index.peopleDesc;
      
      const peopleLink = document.querySelector('[data-translate="peopleLink"]');
      if (peopleLink) peopleLink.textContent = t.index.peopleLink;
      
      const contactBadge = document.querySelector('[data-translate="contactBadge"]');
      if (contactBadge) contactBadge.textContent = t.index.contactBadge;
      
      const contactTitle = document.querySelector('[data-translate="contactTitle"]');
      if (contactTitle) contactTitle.textContent = t.index.contactTitle;
      
      const contactDesc = document.querySelector('[data-translate="contactDesc"]');
      if (contactDesc) contactDesc.textContent = t.index.contactDesc;
      
      const contactLink = document.querySelector('[data-translate="contactLink"]');
      if (contactLink) contactLink.textContent = t.index.contactLink;
      
      const newsBadge = document.querySelector('[data-translate="newsBadge"]');
      if (newsBadge) newsBadge.textContent = t.index.newsBadge;
      
      const newsLink = document.querySelector('[data-translate="newsLink"]');
      if (newsLink) {
        const link = newsLink;
        const href = link.getAttribute('href');
        const onclick = link.getAttribute('onclick');
        link.textContent = t.index.newsLink;
        if (href) link.setAttribute('href', href);
        if (onclick) link.setAttribute('onclick', onclick);
      }
      
      const newsHeading = document.querySelector('[data-translate="news"]');
      if (newsHeading) {
        newsHeading.textContent = t.index.news;
      }
    }

    if (pagePath.includes('/contact')) {
      const h1 = document.querySelector('#content h1');
      if (h1) h1.textContent = t.contact.title;

      const contactItems = document.querySelectorAll('#content ul li strong');
      contactItems.forEach(item => {
        const text = item.textContent.trim().toLowerCase();
        if (text.includes('group lead') || text.includes('gruppledare')) {
          item.textContent = t.contact.groupLead + ':';
        } else if (text.includes('email') || text.includes('e-post')) {
          item.textContent = t.contact.email + ':';
        } else if (text.includes('location') || text.includes('plats')) {
          item.textContent = t.contact.location + ':';
        }
      });

      const allParagraphs = document.querySelectorAll('#content p');
      allParagraphs.forEach(p => {
        const text = p.textContent.toLowerCase();
        if (text.includes('formed') || text.includes('bildades')) {
          p.textContent = t.contact.formed;
        }
      });

      const h2s = document.querySelectorAll('#content h2');
      h2s.forEach(h2 => {
        const text = h2.textContent.toLowerCase();
        if (text.includes('collaboration') || text.includes('samarbete')) {
          h2.textContent = t.contact.collaboration;
          const nextP = h2.nextElementSibling;
          if (nextP && nextP.tagName === 'P') {
            nextP.textContent = t.contact.collaborationDesc;
          }
        }
      });
      
      const openPositionsHeading = document.querySelector('[data-translate="openPositions"]');
      if (openPositionsHeading) {
        openPositionsHeading.textContent = t.contact.openPositions;
      }
      
      const openPositionsDesc = document.querySelector('[data-translate="openPositionsDesc"]');
      if (openPositionsDesc) {
        openPositionsDesc.textContent = t.contact.openPositionsDesc;
      }
    }

    if (pagePath.includes('/people')) {
      const h1 = document.querySelector('#content h1');
      if (h1) h1.textContent = t.people.title;

      const h2s = document.querySelectorAll('#content h2');
      h2s.forEach(h2 => {
        const text = h2.textContent.toLowerCase();
        if (text.includes('current members') || text.includes('nuvarande medlemmar')) {
          h2.textContent = t.people.currentMembers;
        } else if (text.includes('former members') || text.includes('tidigare medlemmar')) {
          h2.textContent = t.people.formerMembers;
        } else if (text.includes('alumni')) {
          h2.textContent = t.people.alumni;
        }
      });

      const allParagraphs = document.querySelectorAll('#content p');
      allParagraphs.forEach(p => {
        const text = p.textContent.toLowerCase();
        if (text.includes('undergraduate alumni') || text.includes('grundutbildningsalumner')) {
          p.textContent = t.people.alumniDesc;
        }
      });

      const badges = document.querySelectorAll('.badge');
      badges.forEach(badge => {
        const text = badge.textContent.toLowerCase();
        if (text.includes('graduated') || text.includes('examen')) {
          const year = badge.textContent.match(/\d{4}/);
          if (year) badge.textContent = t.people.graduated + ' ' + year[0];
        }
      });
    }

    if (pagePath.includes('/projects')) {
      const h1 = document.querySelector('#content h1');
      if (h1) h1.textContent = t.projects.title;
    }

    if (pagePath.includes('/publications')) {
      const h1 = document.querySelector('#content h1');
      if (h1) h1.textContent = t.publications.title;
    }

    const brandSubtitle = document.querySelector('.brand-subtitle');
    if (brandSubtitle) {
      brandSubtitle.textContent = t.brand.subtitle;
    }

    const footerText = document.querySelector('.footer-inner');
    if (footerText) {
      const footerP = footerText.querySelector('div:first-child');
      if (footerP) {
        const br = footerP.querySelector('br');
        if (br && br.nextSibling) {
          br.nextSibling.textContent = ' ' + t.footer.researchGroup;
        }
      }
      const updated = footerText.querySelector('.footer-meta span');
      if (updated) updated.textContent = t.footer.updated;
    }

    const footerResearchGroup = document.querySelector('[data-translate="footerResearchGroup"]');
    if (footerResearchGroup) {
      footerResearchGroup.textContent = t.footer.researchGroup;
    }
  }

  document.addEventListener('DOMContentLoaded', function() {
    const currentLang = getCurrentLang();
    applyTranslations(currentLang);

    document.querySelectorAll('.lang-btn').forEach(btn => {
      btn.addEventListener('click', function() {
        setLang(this.dataset.lang);
      });
    });
  });
})();
