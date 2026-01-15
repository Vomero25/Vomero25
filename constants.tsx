
import { Injury, FAQItem, CommercialStrategy, StoryCase } from './types';

// Tabella Premi Integrale estratta dai PDF
export const PREMIUM_DATA: Record<number, { NF: Record<number, Record<number, number | null>>, F: Record<number, Record<number, number | null>> }> = {
  50000: {
    NF: {
      30: { 5: 159.0, 10: 163.5, 15: 169.5, 20: 180.5 },
      40: { 5: 187.0, 10: 201.5, 15: 219.0, 20: 248.5 },
      50: { 5: 265.5, 10: 307.5, 15: 353.5, 20: 429.5 },
      55: { 5: 349.5, 10: 414.5, 15: 488.5, 20: 605.5 },
      60: { 5: 516.0, 10: 632.5, 15: 756.0, 20: null },
      65: { 5: 753.0, 10: 930.5, 15: null, 20: null },
      70: { 5: 1118.0, 10: null, 15: null, 20: null }
    },
    F: {
      30: { 5: 176.0, 10: 183.5, 15: 194.0, 20: 212.5 },
      40: { 5: 224.0, 10: 250.0, 15: 279.0, 20: 329.5 },
      50: { 5: 360.5, 10: 431.0, 15: 509.5, 20: 638.0 },
      55: { 5: 503.5, 10: 615.5, 15: 740.0, 20: 932.5 },
      60: { 5: 791.5, 10: 989.5, 15: 1194.5, 20: null },
      65: { 5: 1200.5, 10: 1500.0, 15: null, 20: null },
      70: { 5: 1828.0, 10: null, 15: null, 20: null }
    }
  },
  75000: {
    NF: {
      30: { 5: 170.50, 10: 177.25, 15: 186.25, 20: 202.75 },
      40: { 5: 212.50, 10: 234.25, 15: 260.50, 20: 304.75 },
      50: { 5: 330.25, 10: 393.25, 15: 462.25, 20: 576.25 },
      55: { 5: 456.25, 10: 553.75, 15: 664.75, 20: 840.25 },
      60: { 5: 706.00, 10: 880.75, 15: 1066.00, 20: null },
      65: { 5: 1061.50, 10: 1327.75, 15: null, 20: null },
      70: { 5: 1609.00, 10: null, 15: null, 20: null }
    },
    F: {
      30: { 5: 196.00, 10: 207.25, 15: 223.00, 20: 250.75 },
      40: { 5: 268.00, 10: 307.00, 15: 350.50, 20: 426.25 },
      50: { 5: 472.75, 10: 578.50, 15: 696.25, 20: 889.00 },
      55: { 5: 687.25, 10: 855.25, 15: 1042.00, 20: 1330.75 },
      60: { 5: 1119.25, 10: 1416.25, 15: 1723.75, 20: null },
      65: { 5: 1732.75, 10: 2182.00, 15: null, 20: null },
      70: { 5: 2674.00, 10: null, 15: null, 20: null }
    }
  },
  100000: {
    NF: {
      30: { 5: 182, 10: 191, 15: 203, 20: 225 },
      40: { 5: 238, 10: 267, 15: 302, 20: 361 },
      50: { 5: 395, 10: 479, 15: 571, 20: 723 },
      55: { 5: 563, 10: 693, 15: 841, 20: 1075 },
      60: { 5: 896, 10: 1129, 15: 1376, 20: null },
      65: { 5: 1370, 10: 1725, 15: null, 20: null },
      70: { 5: 2100, 10: null, 15: null, 20: null }
    },
    F: {
      30: { 5: 216, 10: 231, 15: 252, 20: 289 },
      40: { 5: 312, 10: 364, 15: 422, 20: 523 },
      50: { 5: 585, 10: 726, 15: 883, 20: 1140 },
      55: { 5: 871, 10: 1095, 15: 1344, 20: 1729 },
      60: { 5: 1447, 10: 1843, 15: 2253, 20: null },
      65: { 5: 2265, 10: 2864, 15: null, 20: null },
      70: { 5: 3520, 10: null, 15: null, 20: null }
    }
  },
  150000: {
    NF: {
      30: { 5: 205.0, 10: 218.5, 15: 236.5, 20: 269.5 },
      40: { 5: 289.0, 10: 332.5, 15: 385.0, 20: 473.5 },
      50: { 5: 524.5, 10: 650.5, 15: 788.5, 20: 1016.5 },
      55: { 5: 776.5, 10: 971.5, 15: 1193.5, 20: 1544.5 },
      60: { 5: 1276.0, 10: 1625.5, 15: 1996.0, 20: null },
      65: { 5: 1987.0, 10: 2519.5, 15: null, 20: null },
      70: { 5: 3082.0, 10: null, 15: null, 20: null }
    },
    F: {
      30: { 5: 256.0, 10: 278.5, 15: 310.0, 20: 365.5 },
      40: { 5: 400.0, 10: 478.0, 15: 565.0, 20: 716.5 },
      50: { 5: 809.5, 10: 1021.0, 15: 1256.5, 20: 1642.0 },
      55: { 5: 1238.5, 10: 1574.5, 15: 1948.0, 20: 2525.5 },
      60: { 5: 2102.5, 10: 2696.5, 15: 3311.5, 20: null },
      65: { 5: 3329.5, 10: 4228.0, 15: null, 20: null },
      70: { 5: 5212.0, 10: null, 15: null, 20: null }
    }
  },
  200000: {
    NF: {
      30: { 5: 228, 10: 246, 15: 270, 20: 314 },
      40: { 5: 340, 10: 398, 15: 468, 20: 586 },
      50: { 5: 654, 10: 822, 15: 1006, 20: 1310 },
      55: { 5: 990, 10: 1250, 15: 1546, 20: 2014 },
      60: { 5: 1656, 10: 2122, 15: 2616, 20: null },
      65: { 5: 2604, 10: 3314, 15: null, 20: null },
      70: { 5: 4064, 10: null, 15: null, 20: null }
    },
    F: {
      30: { 5: 296, 10: 326, 15: 368, 20: 442 },
      40: { 5: 488, 10: 592, 15: 708, 20: 910 },
      50: { 5: 1034, 10: 1316, 15: 1630, 20: 2144 },
      55: { 5: 1606, 10: 2054, 15: 2552, 20: 3322 },
      60: { 5: 2758, 10: 3550, 15: 4370, 20: null },
      65: { 5: 4394, 10: 5592, 15: null, 20: null },
      70: { 5: 6904, 10: null, 15: null, 20: null }
    }
  },
  250000: {
    NF: {
      30: { 5: 251.0, 10: 273.5, 15: 303.5, 20: 358.5 },
      40: { 5: 391.0, 10: 463.5, 15: 551.0, 20: 698.5 },
      50: { 5: 783.5, 10: 993.5, 15: 1223.5, 20: 1603.5 },
      55: { 5: 1203.5, 10: 1528.5, 15: 1898.5, 20: 2483.5 },
      60: { 5: 2036.0, 10: 2618.5, 15: 3236.0, 20: null },
      65: { 5: 3221.0, 10: 4108.5, 15: null, 20: null },
      70: { 5: 5046.0, 10: null, 15: null, 20: null }
    },
    F: {
      30: { 5: 336.0, 10: 373.5, 15: 426.0, 20: 518.5 },
      40: { 5: 576.0, 10: 706.0, 15: 851.0, 20: 1103.5 },
      50: { 5: 1258.5, 10: 1611.0, 15: 2003.5, 20: 2646.0 },
      55: { 5: 1973.5, 10: 2533.5, 15: 3156.0, 20: 4118.5 },
      60: { 5: 3413.5, 10: 4403.5, 15: 5428.5, 20: null },
      65: { 5: 5458.5, 10: 6956.0, 15: null, 20: null },
      70: { 5: 8596.0, 10: null, 15: null, 20: null }
    }
  }
};

export const CAPITALS = [50000, 75000, 100000, 150000, 200000, 250000];
export const DURATIONS = [5, 10, 15, 20];

export const INJURIES: Injury[] = [
  { id: 1, category: "Apparato Scheletrico", description: "FRATTURA ACETABOLARE SCOMPOSTA", amount: 2500, level: 1 },
  { id: 2, category: "Apparato Scheletrico", description: "FRATTURA ASTRAGALO", amount: 2500, level: 1 },
  { id: 3, category: "Apparato Scheletrico", description: "FRATTURA BIOSSEA RADIO E ULNA SCOMPOSTA", amount: 2500, level: 1 },
  { id: 4, category: "Apparato Scheletrico", description: "FRATTURA BIOSSEA TIBIA E PERONE SCOMPOSTA", amount: 2500, level: 1 },
  { id: 7, category: "Apparato Scheletrico", description: "FRATTURA FEMORE", amount: 2500, level: 1 },
  { id: 12, category: "Apparato Scheletrico", description: "TRAUMA CRANICO COMMOTIVO CON LESIONE CEREBRALE", amount: 2500, level: 1 },
  { id: 19, category: "Apparato Scheletrico", description: "FRATTURA CALCAGNO", amount: 7500, level: 2 },
  { id: 25, category: "Apparato Scheletrico", description: "FRATTURA FEMORE (CON PROTESI D'ANCA)", amount: 7500, level: 2 },
  { id: 34, category: "Lesioni Particolari", description: "PERDITA ANATOMICA DI UN GLOBO OCULARE", amount: 15000, level: 3 },
  { id: 40, category: "Lesioni Particolari", description: "CECITÀ COMPLETA", amount: 25000, level: 4 }
];

export const FAQS: FAQItem[] = [
  {
    category: "Proposizione",
    question: "L’Assicurato ha già sottoscritto una polizza TCM con Zurich, posso proporre la Smart Protection?",
    answer: "Sì, è possibile proporla. Il capitale massimo assicurabile dipende dal cumulo: fino a 400.000€ (età ≤45), 300.000€ (46-55) e 200.000€ (≥56).",
  },
  {
    category: "Normativa",
    question: "Che cos’è l’oblio oncologico e si applica alla Smart Protection?",
    answer: "È il diritto di non fornire informazioni su patologie oncologiche guarite da più di 10 anni (5 se insorte prima dei 21). Zurich recepisce pienamente la Legge 193/2023.",
  }
];

export const COMMERCIAL_STRATEGIES: CommercialStrategy[] = [
  {
    segment: "FAMIGLIE CON MUTUO O FIGLI",
    targetDescription: "Nuclei familiari con impegni finanziari a lungo termine.",
    needs: ["Protezione mutuo", "Garanzia studi figli", "Tutela stile di vita"],
    elevatorPitch: "Garantiamo che la tua casa e il futuro dei tuoi figli restino un luogo sicuro, qualunque cosa accada, con un capitale immediato esentasse.",
    strategies: [
      { title: "L'Integrità del Patrimonio", description: "Presenta la polizza come uno scudo che impedisce al patrimonio di essere intaccato da eventi imprevisti." },
      { title: "Successione Semplificata", description: "Spiega che il capitale è fuori dall'asse ereditario, garantendo liquidità immediata per le imposte di successione." }
    ],
    keyBenefits: ["Liquidità esentasse", "Fuori asse ereditario", "Nessuna visita medica"],
    objections: [
      { doubt: "Costa troppo per il mio bilancio familiare.", answer: "Con Zurich Smart Protection puoi proteggere la tua famiglia con meno di 1,50€ al giorno. Costa meno di un caffè al bar ma garantisce il loro futuro." },
      { doubt: "Ho già l'assicurazione sulla vita legata al mutuo.", answer: "Quella banca copre solo il debito verso la banca. Smart Protection dà i soldi direttamente alla tua famiglia per le spese quotidiane e l'università dei figli." }
    ]
  },
  {
    segment: "PROFESSIONISTI E PARTITE IVA",
    targetDescription: "Lavoratori autonomi con tutele previdenziali statali ridotte.",
    needs: ["Incapacità lavorativa temporanea", "Copertura h24", "Indennizzi rapidi"],
    elevatorPitch: "Il tuo reddito dipende solo dalla tua salute. Smart Protection trasforma una diagnosi in liquidità immediata senza aspettare commissioni mediche infinite.",
    strategies: [
      { title: "Focus Allegato Lesioni", description: "Mostra come fratture comuni paghino indennizzi cash utili a coprire i costi fissi dello studio/attività." },
      { title: "Indennizzo vs Invalidità", description: "Sottolinea che paghiamo sulla diagnosi del pronto soccorso, non dopo mesi di perizie per l'invalidità permanente." }
    ],
    keyBenefits: ["Indennizzi certi", "Velocità liquidazione", "Copertura professionale ed extra"],
    objections: [
      { doubt: "Ho già la polizza infortuni classica.", answer: "La polizza infortuni classica paga solo dopo che il danno è diventato permanente. Questa paga SUBITO sulla diagnosi per permetterti di non preoccuparti dei guadagni persi." },
      { doubt: "Preferisco risparmiare e auto-assicurarmi.", answer: "Per accumulare 100.000€ risparmiando 30€ al mese ti servirebbero 270 anni. Zurich te li mette a disposizione da oggi." }
    ]
  },
  {
    segment: "GIOVANI ADULTI (UNDER 35)",
    targetDescription: "Single o giovani coppie che iniziano a costruire la loro indipendenza.",
    needs: ["Blocco premi bassi", "Tutela attività sportiva", "Libertà finanziaria"],
    elevatorPitch: "Assicurati oggi per pagare per sempre la tariffa di un ventenne. È l'investimento più intelligente sulla tua capacità futura di produrre reddito.",
    strategies: [
      { title: "La Strategia del Lock-in", description: "Entrare da giovani e sani permette di bloccare premi bassissimi per i prossimi 20 anni." },
      { title: "Protezione Tempo Libero", description: "Enfatizza la copertura per infortuni durante sport amatoriali o viaggi, tipici della fascia d'età." }
    ],
    keyBenefits: ["Premi minimi bloccati", "Senza visite mediche", "Sottoscrizione digitale veloce"],
    objections: [
      { doubt: "Sono giovane e sano, non ne ho bisogno.", answer: "Proprio perché sei sano oggi puoi assicurarti a costi irrisori. Se aspetti il primo problema di salute, nessuna compagnia potrà più accettarti." },
      { doubt: "Ho già la polizza dell'auto.", answer: "Quella copre solo se sei in auto. Questa ti copre se cadi in bici, se inciampi in casa o se hai un malore improvviso, ovunque nel mondo." }
    ]
  },
  {
    segment: "SENIOR E PASSAGGIO GENERAZIONALE",
    targetDescription: "Clienti maturi con patrimoni immobiliari o finanziari da tutelare per gli eredi.",
    needs: ["Liquidità imposte successione", "Tutela partner", "Patrimonio protetto"],
    elevatorPitch: "Non lasciare ai tuoi figli un debito fiscale. Regala loro la liquidità necessaria per ereditare i tuoi immobili senza dover svendere nulla.",
    strategies: [
      { title: "La Polizza Paga-Tasse", description: "Presenta il capitale come la riserva pronta per pagare le imposte di successione immobiliari degli eredi." },
      { title: "Tutela del Convivente", description: "Strategico per coppie non sposate che non godono delle franchigie di legge per la successione." }
    ],
    keyBenefits: ["Esenzione tasse successione", "Impignorabile", "Frazionamento mensile"],
    objections: [
      { doubt: "Costa troppo alla mia età.", answer: "È vero, il premio è più alto, ma le tasse di successione che i tuoi figli dovrebbero pagare sono molto più elevate. È uno scambio vantaggioso per proteggere il loro lascito." },
      { doubt: "I miei figli hanno già i loro soldi.", answer: "Avere un capitale 'fresco' e pronto evita tensioni tra eredi e permette di gestire le pratiche legali con serenità senza intaccare i risparmi personali." }
    ]
  }
];

export const STORY_CASES: StoryCase[] = [
  {
    id: 1,
    title: "Il Mutuo non è più un peso",
    protagonist: "Marco e Giulia",
    scenario: "Coppia con mutuo di 180k.",
    event: "Decesso improvviso di Marco.",
    impact: "Impossibilità di pagare la rata.",
    benefit: "Liquidazione 200k in 30 giorni: mutuo estinto e riserva figli.",
    lesson: "La protezione è per chi resta.",
    tags: ["TCM", "Mutuo"]
  }
];

// NUOVE COSTANTI DA DOCUMENTI (Assumibilità, Questionario, Oblio)
export const ELIGIBILITY_RULES = {
  residency: "Persone fisiche/giuridiche residenti in Italia con codice fiscale italiano.",
  ageRange: "Dai 18 ai 70 anni all'ingresso. Scadenza massima 75 anni.",
  medicalForm: "Questionario Medico Semplificato (obbligatorio)."
};

export const MEDICAL_QUESTIONS = [
  { id: 3, text: "Le è stato diagnosticato negli ultimi 10 anni un tumore maligno o sta effettuando esami per sospette malattie tumorali?" },
  { id: 4, text: "Soffre o ha sofferto negli ultimi 10 anni di una grave patologia dell'apparato cardiocircolatorio (infarto, ictus, aneurisma, ecc.)?" },
  { id: 5, text: "Soffre o ha sofferto negli ultimi 10 anni di gravi patologie (Neurodegenerative, Sclerosi Multipla, difficoltà respiratoria a riposo, bronchiti croniche, insufficienza renale, HIV, diabete, epatopatie croniche)?" }
];

export const OBLIO_ALLEGATO_1 = [
  { path: "Colon-retto Stadio I", term: "1 anno" },
  { path: "Colon-retto Stadio II-III", term: "7 anni" },
  { path: "Melanoma (diagnosi >21 anni)", term: "6 anni" },
  { path: "Mammella Stadio I-II", term: "1 anno" },
  { path: "Utero (collo) diagnosi >21 anni", term: "6 anni" },
  { path: "Utero (corpo)", term: "5 anni" },
  { path: "Testicolo", term: "1 anno" },
  { path: "Tiroide (diagnosi <45y, no anaplastici)", term: "1 anno" },
  { path: "Linfomi Hodgkin (diagnosi <45y)", term: "5 anni" },
  { path: "Leucemie (linfoblastiche/mieloidi)", term: "5 anni" }
];
