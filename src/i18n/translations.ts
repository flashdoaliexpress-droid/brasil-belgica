export type Locale = "pt" | "en" | "fr" | "nl";

export interface T {
  nav: {
    home: string;
    about: string;
    calendar: string;
    squad: string;
    news: string;
    league: string;
    presentations: string;
  };
  about: {
    title: string;
    titleHighlight: string;
    paragraphs: string[];
  };
  calendar: {
    title: string;
    subtitle: string;
    upcoming: string;
    results: string;
    live: string;
    finished: string;
    next: string;
    ourTeam: string;
    months: string[];
    weekdays: string[];
  };
  players: {
    title: string;
    clickHint: string;
    jersey: string;
    skillsLabel: string;
    positions: Partial<Record<string, string>>;
  };
  interviews: {
    title: string;
    seeAll: string;
    presentation: string;
  };
  news: {
    title: string;
    seeAll: string;
    readMore: string;
    publishedOn: string;
    backToAll: string;
    backToSite: string;
    allNewsTitle: string;
    allNewsTitleHighlight: string;
    allNewsSubtitle: string;
  };
  titles: {
    title: string;
    subtitle: string;
  };
  liga: {
    title: string;
    description: string;
    classification: string;
    round: string;
    us: string;
    colTeam: string;
    colPlayed: string;
    colWins: string;
    colDraws: string;
    colLosses: string;
    colPoints: string;
  };
  comissao: {
    title: string;
    subtitle: string;
    quote: string;
    quoteAuthor: string;
    roles: Partial<Record<string, string>>;
    staffBios: Record<number, string>;
  };
  sponsors: {
    title: string;
    description: string;
    alt: string;
  };
  footer: {
    tagline: string;
  };
  apresentacoes: {
    title: string;
    backToSite: string;
    countSuffix: string;
    presentation: string;
  };
  dateLocale: string;
}

const pt: T = {
  nav: {
    home: "INÍCIO",
    about: "SOBRE",
    calendar: "CALENDÁRIO",
    squad: "ELENCO",
    news: "NOTÍCIAS",
    league: "LIGA",
    presentations: "APRESENTAÇÕES",
  },
  about: {
    title: "NOSSA",
    titleHighlight: "HISTÓRIA",
    paragraphs: [
      "Fundado em 4 de abril de 2026, na cidade de Bruxelas, o Brasil nasceu com o propósito de representar a força, a união e a paixão da comunidade brasileira pelo futebol em território belga.",
      "Mais do que um clube de futebol, o Brasil é uma família. Cada treino, cada jogo, cada vitória — e cada derrota — é vivido em conjunto. Esse espírito de união é o que nos define dentro e fora de campo: um grupo que se cuida, se respeita e caminha junto em busca dos mesmos sonhos.",
      "Agora, o Brasil dá mais um passo importante em sua história: a participação na Liga Trabalhista de Bruxelas. Para um clube jovem e cheio de ambição, disputar a liga é uma conquista que representa reconhecimento, crescimento e a certeza de que o caminho que escolhemos é o certo.",
      "Hoje, o Brasil se consolida como um clube de nome forte e de grande importância para a comunidade brasileira na Bélgica, carregando consigo uma identidade de peso, orgulho e ambição para alcançar novos feitos dentro e fora de campo.",
    ],
  },
  calendar: {
    title: "CALENDÁRIO DE JOGOS",
    subtitle: "Acompanhe os próximos jogos e resultados do Brasil na Liga Trabalhista de Bruxelas.",
    upcoming: "Próximos jogos",
    results: "Últimos resultados",
    live: "Ao vivo",
    finished: "Resultado",
    next: "Próximo",
    ourTeam: "Nosso time",
    months: ["jan", "fev", "mar", "abr", "mai", "jun", "jul", "ago", "set", "out", "nov", "dez"],
    weekdays: ["dom", "seg", "ter", "qua", "qui", "sex", "sáb"],
  },
  players: {
    title: "NOSSOS JOGADORES",
    clickHint: "Clique num jogador para ver o perfil completo.",
    jersey: "Camisa nº",
    skillsLabel: "Habilidades",
    positions: {
      Goleiro: "Goleiro",
      Zagueiro: "Zagueiro",
      "Lateral Direito": "Lateral Direito",
      "Lateral Esquerdo": "Lateral Esquerdo",
      Volante: "Volante",
      "Meio Campo": "Meio Campo",
      Atacante: "Atacante",
      "Ponta Direita": "Ponta Direita",
      "Ponta Esquerda": "Ponta Esquerda",
      Centroavante: "Centroavante",
    },
  },
  interviews: {
    title: "APRESENTAÇÕES DOS JOGADORES",
    seeAll: "Ver todas",
    presentation: "Apresentação",
  },
  news: {
    title: "NOTÍCIAS",
    seeAll: "Ver todas as notícias",
    readMore: "Ler matéria",
    publishedOn: "Publicado em",
    backToAll: "Todas as notícias",
    backToSite: "Voltar ao site",
    allNewsTitle: "TODAS AS",
    allNewsTitleHighlight: "NOTÍCIAS",
    allNewsSubtitle: "O dia a dia do Brasil. Resultados, bastidores, parcerias e as histórias por trás de cada rodada na Liga Trabalhista de Bruxelas.",
  },
  titles: {
    title: "TÍTULOS & CONQUISTAS",
    subtitle: "A trajetória do Brasil se constrói rodada após rodada — cada conquista é uma marca da nossa história em Bruxelas.",
  },
  liga: {
    title: "LIGA TRABALHISTA",
    description: "A Liga Trabalhista é a principal competição amadora da comunidade imigrante em Bruxelas. Reúne clubes brasileiros, portugueses, marroquinos e africanos em uma disputa anual de pontos corridos, com 18 rodadas e acesso à divisão principal.",
    classification: "Classificação",
    round: "Rodada",
    us: "Nós",
    colTeam: "Time",
    colPlayed: "J",
    colWins: "V",
    colDraws: "E",
    colLosses: "D",
    colPoints: "Pts",
  },
  comissao: {
    title: "COMISSÃO TÉCNICA",
    subtitle: "Quem comanda o Brasil dentro e fora de campo. Profissionais qualificados, comprometidos e experientes — trabalhando com seriedade para desenvolver o clube e buscar grandes resultados.",
    quote: "Vamos trabalhar com seriedade para desenvolver a equipe e buscar grandes resultados dentro e fora de campo.",
    quoteAuthor: "— Comissão Brasil",
    roles: {
      Presidente: "Presidente",
      Diretor: "Diretor",
      Treinador: "Treinador",
    },
    staffBios: {
      1: "Liderança e visão estratégica do clube. Responsável pela direção institucional do Brasil e pelas relações com a comunidade brasileira em Bruxelas.",
      2: "Gestão executiva do dia a dia. Conecta atletas, comissão e parceiros, garantindo que a operação do clube siga firme dentro e fora de campo.",
      3: "Comanda os treinos e a estratégia em campo. Forma o time com seriedade técnica e a raiz do futebol brasileiro, sempre buscando evolução coletiva.",
    },
  },
  sponsors: {
    title: "PATROCINADORES & PARCEIROS",
    description: "Os patrocinadores apoiam o Brasil e fazem parte do crescimento do clube, fortalecendo o projeto dentro e fora de campo. Com esse apoio, seguimos mais preparados para buscar grandes conquistas.",
    alt: "Patrocinadores e parceiros do Brasil",
  },
  footer: {
    tagline: "A força do futebol amador.",
  },
  apresentacoes: {
    title: "TODAS AS APRESENTAÇÕES",
    backToSite: "Voltar ao site",
    countSuffix: "apresentações de jogadores do Brasil.",
    presentation: "Apresentação",
  },
  dateLocale: "pt-BR",
};

const en: T = {
  nav: {
    home: "HOME",
    about: "ABOUT",
    calendar: "SCHEDULE",
    squad: "SQUAD",
    news: "NEWS",
    league: "LEAGUE",
    presentations: "PRESENTATIONS",
  },
  about: {
    title: "OUR",
    titleHighlight: "STORY",
    paragraphs: [
      "Founded on 4 April 2026 in the city of Brussels, Brasil was born with the purpose of representing the strength, unity and passion of the Brazilian community for football on Belgian soil.",
      "More than a football club, Brasil is a family. Every training session, every match, every victory — and every defeat — is experienced together. This spirit of unity is what defines us on and off the pitch: a group that looks after each other, shows mutual respect and walks together in pursuit of the same dreams.",
      "Now, Brasil takes another important step in its history: competing in the Brussels Workers' League. For a young and ambitious club, entering the league is an achievement that represents recognition, growth and the certainty that the path we have chosen is the right one.",
      "Today, Brasil establishes itself as a club with a strong name and great importance to the Brazilian community in Belgium, carrying with it an identity of weight, pride and ambition to reach new heights on and off the pitch.",
    ],
  },
  calendar: {
    title: "MATCH SCHEDULE",
    subtitle: "Follow the upcoming matches and results of Brasil in the Brussels Workers' League.",
    upcoming: "Upcoming matches",
    results: "Recent results",
    live: "Live",
    finished: "Result",
    next: "Next",
    ourTeam: "Our team",
    months: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    weekdays: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
  },
  players: {
    title: "OUR SQUAD",
    clickHint: "Click on a player to view their full profile.",
    jersey: "Jersey no.",
    skillsLabel: "Skills",
    positions: {
      Goleiro: "Goalkeeper",
      Zagueiro: "Centre-back",
      "Lateral Direito": "Right Back",
      "Lateral Esquerdo": "Left Back",
      Volante: "Defensive Midfielder",
      "Meio Campo": "Midfielder",
      Atacante: "Forward",
      "Ponta Direita": "Right Winger",
      "Ponta Esquerda": "Left Winger",
      Centroavante: "Striker",
    },
  },
  interviews: {
    title: "PLAYER PRESENTATIONS",
    seeAll: "See all",
    presentation: "Presentation",
  },
  news: {
    title: "NEWS",
    seeAll: "See all news",
    readMore: "Read more",
    publishedOn: "Published on",
    backToAll: "All news",
    backToSite: "Back to site",
    allNewsTitle: "ALL THE",
    allNewsTitleHighlight: "NEWS",
    allNewsSubtitle: "The day-to-day of Brasil. Results, behind the scenes, partnerships and the stories behind each round in the Brussels Workers' League.",
  },
  titles: {
    title: "TITLES & ACHIEVEMENTS",
    subtitle: "Brasil's journey is built round after round — each achievement marks our history in Brussels.",
  },
  liga: {
    title: "WORKERS' LEAGUE",
    description: "The Workers' League is the main amateur competition for the immigrant community in Brussels. It brings together Brazilian, Portuguese, Moroccan and African clubs in an annual league format, with 18 rounds and promotion to the top division.",
    classification: "Standings",
    round: "Round",
    us: "Us",
    colTeam: "Team",
    colPlayed: "P",
    colWins: "W",
    colDraws: "D",
    colLosses: "L",
    colPoints: "Pts",
  },
  comissao: {
    title: "COACHING STAFF",
    subtitle: "The people leading Brasil on and off the pitch. Qualified, committed and experienced professionals — working seriously to develop the club and achieve great results.",
    quote: "We will work seriously to develop the squad and pursue great results on and off the pitch.",
    quoteAuthor: "— Brasil Staff",
    roles: {
      Presidente: "President",
      Diretor: "Director",
      Treinador: "Coach",
    },
    staffBios: {
      1: "Leadership and strategic vision for the club. Responsible for the institutional direction of Brasil and relations with the Brazilian community in Brussels.",
      2: "Day-to-day executive management. Connects athletes, staff and partners, ensuring the club's operations run smoothly on and off the pitch.",
      3: "Leads training sessions and on-pitch strategy. Shapes the team with technical rigour and the roots of Brazilian football, always pursuing collective growth.",
    },
  },
  sponsors: {
    title: "SPONSORS & PARTNERS",
    description: "Sponsors support Brasil and are part of the club's growth, strengthening the project on and off the pitch. With this support, we keep moving forward towards great achievements.",
    alt: "Brasil sponsors and partners",
  },
  footer: {
    tagline: "The strength of amateur football.",
  },
  apresentacoes: {
    title: "ALL PRESENTATIONS",
    backToSite: "Back to site",
    countSuffix: "player presentations from Brasil.",
    presentation: "Presentation",
  },
  dateLocale: "en-GB",
};

const fr: T = {
  nav: {
    home: "ACCUEIL",
    about: "À PROPOS",
    calendar: "CALENDRIER",
    squad: "ÉQUIPE",
    news: "ACTUALITÉS",
    league: "LIGUE",
    presentations: "PRÉSENTATIONS",
  },
  about: {
    title: "NOTRE",
    titleHighlight: "HISTOIRE",
    paragraphs: [
      "Fondé le 4 avril 2026 dans la ville de Bruxelles, Brasil est né avec pour objectif de représenter la force, l'union et la passion de la communauté brésilienne pour le football en territoire belge.",
      "Plus qu'un club de football, Brasil est une famille. Chaque entraînement, chaque match, chaque victoire — et chaque défaite — est vécu ensemble. Cet esprit d'union est ce qui nous définit sur et en dehors du terrain : un groupe qui prend soin de lui-même, se respecte et avance ensemble vers les mêmes rêves.",
      "Aujourd'hui, Brasil franchit une nouvelle étape importante de son histoire : la participation à la Ligue Travailliste de Bruxelles. Pour un jeune club plein d'ambition, disputer la ligue est une conquête qui représente la reconnaissance, la croissance et la certitude que le chemin que nous avons choisi est le bon.",
      "Brasil s'affirme comme un club au nom fort et d'une grande importance pour la communauté brésilienne en Belgique, portant avec lui une identité de poids, de fierté et d'ambition pour accomplir de nouveaux exploits sur et en dehors du terrain.",
    ],
  },
  calendar: {
    title: "CALENDRIER DES MATCHS",
    subtitle: "Suivez les prochains matchs et résultats de Brasil dans la Ligue Travailliste de Bruxelles.",
    upcoming: "Prochains matchs",
    results: "Derniers résultats",
    live: "En direct",
    finished: "Résultat",
    next: "Prochain",
    ourTeam: "Notre équipe",
    months: ["jan", "fév", "mar", "avr", "mai", "juin", "juil", "août", "sep", "oct", "nov", "déc"],
    weekdays: ["dim", "lun", "mar", "mer", "jeu", "ven", "sam"],
  },
  players: {
    title: "NOS JOUEURS",
    clickHint: "Cliquez sur un joueur pour voir son profil complet.",
    jersey: "Maillot n°",
    skillsLabel: "Compétences",
    positions: {
      Goleiro: "Gardien de but",
      Zagueiro: "Défenseur central",
      "Lateral Direito": "Latéral droit",
      "Lateral Esquerdo": "Latéral gauche",
      Volante: "Milieu défensif",
      "Meio Campo": "Milieu de terrain",
      Atacante: "Attaquant",
      "Ponta Direita": "Ailier droit",
      "Ponta Esquerda": "Ailier gauche",
      Centroavante: "Avant-centre",
    },
  },
  interviews: {
    title: "PRÉSENTATIONS DES JOUEURS",
    seeAll: "Voir tout",
    presentation: "Présentation",
  },
  news: {
    title: "ACTUALITÉS",
    seeAll: "Voir toutes les actualités",
    readMore: "Lire l'article",
    publishedOn: "Publié le",
    backToAll: "Toutes les actualités",
    backToSite: "Retour au site",
    allNewsTitle: "TOUTES LES",
    allNewsTitleHighlight: "ACTUALITÉS",
    allNewsSubtitle: "Le quotidien de Brasil. Résultats, coulisses, partenariats et les histoires derrière chaque journée de la Ligue Travailliste de Bruxelles.",
  },
  titles: {
    title: "TITRES & RÉCOMPENSES",
    subtitle: "Le parcours de Brasil se construit journée après journée — chaque conquête marque notre histoire à Bruxelles.",
  },
  liga: {
    title: "LIGUE TRAVAILLISTE",
    description: "La Ligue Travailliste est la principale compétition amateur de la communauté immigrante à Bruxelles. Elle réunit des clubs brésiliens, portugais, marocains et africains dans un championnat annuel en points, avec 18 journées et accès à la division principale.",
    classification: "Classement",
    round: "Journée",
    us: "Nous",
    colTeam: "Équipe",
    colPlayed: "J",
    colWins: "V",
    colDraws: "N",
    colLosses: "D",
    colPoints: "Pts",
  },
  comissao: {
    title: "STAFF TECHNIQUE",
    subtitle: "Ceux qui dirigent Brasil sur et en dehors du terrain. Professionnels qualifiés, engagés et expérimentés — travaillant sérieusement pour développer le club et obtenir de grands résultats.",
    quote: "Nous travaillerons sérieusement pour développer l'équipe et rechercher de grands résultats sur et en dehors du terrain.",
    quoteAuthor: "— Staff de Brasil",
    roles: {
      Presidente: "Président",
      Diretor: "Directeur",
      Treinador: "Entraîneur",
    },
    staffBios: {
      1: "Leadership et vision stratégique du club. Responsable de la direction institutionnelle de Brasil et des relations avec la communauté brésilienne à Bruxelles.",
      2: "Gestion exécutive au quotidien. Coordonne athlètes, staff et partenaires, assurant le bon fonctionnement du club sur et en dehors du terrain.",
      3: "Dirige les entraînements et la stratégie sur le terrain. Façonne l'équipe avec rigueur technique et les racines du football brésilien, toujours à la recherche de la progression collective.",
    },
  },
  sponsors: {
    title: "SPONSORS & PARTENAIRES",
    description: "Les sponsors soutiennent Brasil et font partie de la croissance du club, renforçant le projet sur et en dehors du terrain. Avec ce soutien, nous continuons à viser de grandes conquêtes.",
    alt: "Sponsors et partenaires de Brasil",
  },
  footer: {
    tagline: "La force du football amateur.",
  },
  apresentacoes: {
    title: "TOUTES LES PRÉSENTATIONS",
    backToSite: "Retour au site",
    countSuffix: "présentations de joueurs de Brasil.",
    presentation: "Présentation",
  },
  dateLocale: "fr-BE",
};

const nl: T = {
  nav: {
    home: "HOME",
    about: "OVER ONS",
    calendar: "AGENDA",
    squad: "ELFTAL",
    news: "NIEUWS",
    league: "COMPETITIE",
    presentations: "PRESENTATIES",
  },
  about: {
    title: "ONZE",
    titleHighlight: "GESCHIEDENIS",
    paragraphs: [
      "Brasil werd op 4 april 2026 opgericht in de stad Brussel met het doel de kracht, eenheid en passie van de Braziliaanse gemeenschap voor voetbal op Belgisch grondgebied te vertegenwoordigen.",
      "Meer dan een voetbalclub is Brasil een familie. Elke training, elke wedstrijd, elke overwinning — en elke nederlaag — wordt samen beleefd. Deze geest van eenheid is wat ons definieert op en naast het veld: een groep die voor elkaar zorgt, elkaar respecteert en samen optrekt naar dezelfde dromen.",
      "Nu zet Brasil een nieuwe belangrijke stap in zijn geschiedenis: deelname aan de Brusselse Arbeiderscompetitie. Voor een jonge en ambitieuze club is het disputeren van de competitie een prestatie die erkenning, groei en de zekerheid vertegenwoordigt dat de weg die we hebben gekozen de juiste is.",
      "Vandaag de dag bevestigt Brasil zijn positie als een club met een sterke naam en groot belang voor de Braziliaanse gemeenschap in België, met een identiteit van gewicht, trots en ambitie om nieuwe successen te behalen binnen en buiten het veld.",
    ],
  },
  calendar: {
    title: "WEDSTRIJDAGENDA",
    subtitle: "Volg de komende wedstrijden en resultaten van Brasil in de Brusselse Arbeiderscompetitie.",
    upcoming: "Komende wedstrijden",
    results: "Laatste resultaten",
    live: "Live",
    finished: "Resultaat",
    next: "Volgend",
    ourTeam: "Ons team",
    months: ["jan", "feb", "mrt", "apr", "mei", "jun", "jul", "aug", "sep", "okt", "nov", "dec"],
    weekdays: ["zo", "ma", "di", "wo", "do", "vr", "za"],
  },
  players: {
    title: "ONS ELFTAL",
    clickHint: "Klik op een speler om het volledige profiel te bekijken.",
    jersey: "Rugnummer",
    skillsLabel: "Vaardigheden",
    positions: {
      Goleiro: "Doelman",
      Zagueiro: "Centrale verdediger",
      "Lateral Direito": "Rechtsback",
      "Lateral Esquerdo": "Linksback",
      Volante: "Defensieve middenvelder",
      "Meio Campo": "Middenvelder",
      Atacante: "Aanvaller",
      "Ponta Direita": "Rechtsbuiten",
      "Ponta Esquerda": "Linksbuiten",
      Centroavante: "Spits",
    },
  },
  interviews: {
    title: "SPELERSVIDEO'S",
    seeAll: "Alles bekijken",
    presentation: "Presentatie",
  },
  news: {
    title: "NIEUWS",
    seeAll: "Alle nieuwsberichten",
    readMore: "Lees meer",
    publishedOn: "Gepubliceerd op",
    backToAll: "Alle nieuwsberichten",
    backToSite: "Terug naar de site",
    allNewsTitle: "AL HET",
    allNewsTitleHighlight: "NIEUWS",
    allNewsSubtitle: "Het dagelijkse leven van Brasil. Resultaten, achter de schermen, partnerships en de verhalen achter elke speelronde in de Brusselse Arbeiderscompetitie.",
  },
  titles: {
    title: "TITELS & TROFEEËN",
    subtitle: "Het traject van Brasil wordt ronde na ronde opgebouwd — elke verovering is een stempel in onze geschiedenis in Brussel.",
  },
  liga: {
    title: "ARBEIDERSCOMPETITIE",
    description: "De Arbeiderscompetitie is de belangrijkste amateurcompetitie van de immigrantengemeenschap in Brussel. Ze brengt Braziliaanse, Portugese, Marokkaanse en Afrikaanse clubs samen in een jaarlijks competitieformat met 18 speelronden en promotie naar de hoofddivisie.",
    classification: "Klassement",
    round: "Speelronde",
    us: "Wij",
    colTeam: "Team",
    colPlayed: "GS",
    colWins: "W",
    colDraws: "G",
    colLosses: "V",
    colPoints: "Ptn",
  },
  comissao: {
    title: "TECHNISCHE STAF",
    subtitle: "De mensen die Brasil leiden op en naast het veld. Gekwalificeerde, betrokken en ervaren professionals — serieus werkend aan de ontwikkeling van de club en het behalen van grote resultaten.",
    quote: "We zullen serieus werken aan de ontwikkeling van het elftal en streven naar grote resultaten op en naast het veld.",
    quoteAuthor: "— Staf Brasil",
    roles: {
      Presidente: "Voorzitter",
      Diretor: "Directeur",
      Treinador: "Trainer",
    },
    staffBios: {
      1: "Leiderschap en strategische visie voor de club. Verantwoordelijk voor de institutionele richting van Brasil en de relaties met de Braziliaanse gemeenschap in Brussel.",
      2: "Dagelijkse uitvoerende leiding. Verbindt sporters, staf en partners en zorgt ervoor dat de cluboperaties soepel verlopen op en naast het veld.",
      3: "Leidt trainingen en bepaalt de tactische aanpak op het veld. Vormt het team met technische degelijkheid en de roots van het Braziliaanse voetbal, altijd gericht op collectieve groei.",
    },
  },
  sponsors: {
    title: "SPONSORS & PARTNERS",
    description: "Sponsors steunen Brasil en maken deel uit van de groei van de club, het project versterkend op en naast het veld. Met deze steun blijven we ons klaarstomen voor grote prestaties.",
    alt: "Sponsors en partners van Brasil",
  },
  footer: {
    tagline: "De kracht van het amateurvoetbal.",
  },
  apresentacoes: {
    title: "ALLE PRESENTATIES",
    backToSite: "Terug naar de site",
    countSuffix: "spelersvideo's van Brasil.",
    presentation: "Presentatie",
  },
  dateLocale: "nl-BE",
};

export const translations: Record<Locale, T> = { pt, en, fr, nl };
