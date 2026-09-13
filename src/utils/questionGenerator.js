// src/utils/questionGenerator.js
// Deterministic Question Generator for Infinite Practice Drills

export const questionGenerator = {
  // Generate a dynamic batch of questions based on a type or seed
  generatePracticeSet: (count = 10, category = 'all') => {
    const pool = [];

    // 1. Headquarters Generator
    const hqData = [
      { name: 'Small Industries Development Bank of India (SIDBI)', city: 'Lucknow', wrong: ['Mumbai', 'New Delhi', 'Kolkata', 'Bengaluru'] },
      { name: 'Insurance Regulatory and Development Authority of India (IRDAI)', city: 'Hyderabad', wrong: ['Mumbai', 'New Delhi', 'Chennai', 'Pune'] },
      { name: 'National Bank for Agriculture and Rural Development (NABARD)', city: 'Mumbai', wrong: ['New Delhi', 'Lucknow', 'Bengaluru', 'Bhopal'] },
      { name: 'National Housing Bank (NHB)', city: 'New Delhi', wrong: ['Mumbai', 'Kolkata', 'Hyderabad', 'Chennai'] },
      { name: 'Pension Fund Regulatory and Development Authority (PFRDA)', city: 'New Delhi', wrong: ['Mumbai', 'Bengaluru', 'Hyderabad', 'Ahmedabad'] },
      { name: 'International Financial Services Centres Authority (IFSCA)', city: 'Gandhinagar (GIFT City)', wrong: ['Mumbai', 'New Delhi', 'Bengaluru', 'Gurugram'] },
      { name: 'Export-Import Bank of India (EXIM Bank)', city: 'Mumbai', wrong: ['New Delhi', 'Kolkata', 'Chennai', 'Ahmedabad'] }
    ];

    hqData.forEach((item, idx) => {
      const options = [item.city, ...item.wrong].sort(() => 0.5 - Math.random());
      const correctIdx = options.indexOf(item.city);
      pool.push({
        id: `gen_hq_${idx}_${Date.now()}`,
        topic: 'Institutions & Committees',
        subtopic: 'Headquarters',
        question: `Where is the permanent headquarters of the ${item.name} located?`,
        question_hi: `${item.name} का स्थायी मुख्यालय कहाँ स्थित है?`,
        options,
        options_hi: options,
        correct_option: correctIdx,
        provenance: 'ORIGINAL PRACTICE QUESTION',
        exam_tag: 'Dynamic Institution Drill',
        difficulty: 'Easy',
        explanation: `The headquarters of ${item.name} is situated in ${item.city}.`,
        exam_shortcut: `${item.name} = ${item.city}`,
        trap_alert: 'Do not default to Mumbai for all bank headquarters!'
      });
    });

    // 2. Committee Landmark Generator
    const commData = [
      { rec: 'Creation of Reserve Bank of India (RBI)', comm: 'Hilton Young Commission (1926)', wrong: ['Narasimham Committee', 'Gorwala Committee', 'Sivaraman Committee', 'Urjit Patel Committee'] },
      { rec: 'Creation of State Bank of India (SBI)', comm: 'A.D. Gorwala Committee (1954)', wrong: ['Hilton Young Commission', 'Narasimham Committee', 'R.V. Gupta Committee', 'Bimal Jalan Committee'] },
      { rec: 'Establishment of NABARD', comm: 'B. Sivaraman Committee (CRAFICARD, 1979)', wrong: ['Hilton Young Commission', 'Malhotra Committee', 'Nachiket Mor Committee', 'Khan Committee'] },
      { rec: 'Reforms in the Insurance sector and setting up of IRDAI', comm: 'R.N. Malhotra Committee (1994)', wrong: ['Narasimham Committee', 'P.J. Nayak Committee', 'Deepak Mohanty Committee', 'S.H. Khan Committee'] },
      { rec: 'Introduction of the Kisan Credit Card (KCC) scheme', comm: 'R.V. Gupta Committee (1998)', wrong: ['Narasimham Committee', 'Hilton Young Commission', 'Nachiket Mor Committee', 'Sivaraman Committee'] },
      { rec: 'Introduction of Differentiated Banking Licences (Payments & SFBs)', comm: 'Dr. Nachiket Mor Committee (2014)', wrong: ['Urjit Patel Committee', 'Raghuram Rajan Committee', 'Bimal Jalan Committee', 'P.J. Nayak Committee'] },
      { rec: 'Adoption of CPI anchor and Flexible Inflation Targeting (MPC)', comm: 'Dr. Urjit Patel Committee (2014)', wrong: ['Nachiket Mor Committee', 'Bimal Jalan Committee', 'Deepak Mohanty Committee', 'N.K. Singh Committee'] }
    ];

    commData.forEach((item, idx) => {
      const options = [item.comm, ...item.wrong].sort(() => 0.5 - Math.random());
      const correctIdx = options.indexOf(item.comm);
      pool.push({
        id: `gen_comm_${idx}_${Date.now()}`,
        topic: 'Institutions & Committees',
        subtopic: 'Banking Committees',
        question: `Which committee or commission recommended the ${item.rec}?`,
        question_hi: `किस समिति या आयोग ने ${item.rec} की सिफारिश की थी?`,
        options,
        options_hi: options,
        correct_option: correctIdx,
        provenance: 'ORIGINAL PRACTICE QUESTION',
        exam_tag: 'Dynamic Committee Drill',
        difficulty: 'Moderate',
        explanation: `${item.rec} was directly recommended by the ${item.comm}.`,
        exam_shortcut: `${item.rec} -> ${item.comm}`,
        trap_alert: 'Memorise the committee chairman name and primary mandate.'
      });
    });

    // 3. Banking Acronym & Full Form Generator
    const acronyms = [
      { term: 'CASA', letter: 'S', stand: 'Savings', wrong: ['Security', 'Settlement', 'System', 'Statutory'] },
      { term: 'LAF', letter: 'A', stand: 'Adjustment', wrong: ['Asset', 'Advance', 'Authorised', 'Allocation'] },
      { term: 'LEI', letter: 'E', stand: 'Entity', wrong: ['Electronic', 'Equity', 'Exchange', 'Exemption'] },
      { term: 'SARFAESI', letter: 'R', stand: 'Reconstruction', wrong: ['Reserve', 'Resolution', 'Recovery', 'Regulation'] },
      { term: 'ANBC', letter: 'A', stand: 'Adjusted', wrong: ['Agricultural', 'Annual', 'Asset', 'Allocated'] },
      { term: 'MCLR', letter: 'M', stand: 'Marginal', wrong: ['Monetary', 'Market', 'Maximum', 'Managed'] },
      { term: 'CRAR', letter: 'A', stand: 'Assets', wrong: ['Advance', 'Annual', 'Allocation', 'Authorization'] },
      { term: 'DICGC', letter: 'C (second)', stand: 'Corporation', wrong: ['Company', 'Committee', 'Council', 'Commission'] }
    ];

    acronyms.forEach((item, idx) => {
      const options = [item.stand, ...item.wrong].sort(() => 0.5 - Math.random());
      const correctIdx = options.indexOf(item.stand);
      pool.push({
        id: `gen_acronym_${idx}_${Date.now()}`,
        topic: 'Banking Terminology',
        subtopic: 'Full Forms & Abbreviations',
        question: `In the banking abbreviation '${item.term}', what does the letter '${item.letter}' stand for?`,
        question_hi: `बैंकिंग संक्षेप '${item.term}' में, अक्षर '${item.letter}' का क्या अर्थ है?`,
        options,
        options_hi: options,
        correct_option: correctIdx,
        provenance: 'ORIGINAL PRACTICE QUESTION',
        exam_tag: 'Acronym Precision Drill',
        difficulty: 'Easy',
        explanation: `In ${item.term}, the letter '${item.letter}' stands for '${item.stand}'.`,
        exam_shortcut: `${item.term} = ${item.stand}`,
        trap_alert: 'Pay close attention to similar-sounding banking words.'
      });
    });

    // Filter by category if requested
    let filtered = pool;
    if (category !== 'all') {
      filtered = pool.filter(q => q.topic.toLowerCase().includes(category.toLowerCase()));
    }

    // Shuffle and slice to desired count
    return filtered.sort(() => 0.5 - Math.random()).slice(0, count);
  },

  // Calculate dynamic economic formulas
  generateCalculationQuestion: () => {
    const fd = Math.floor(Math.random() * 8 + 12); // e.g. 15 Lakh Crore
    const interest = Math.floor(Math.random() * 5 + 6); // e.g. 8 Lakh Crore
    const pd = fd - interest;

    const wrongOptions = [pd + 2, pd - 2, fd + interest, Math.abs(interest - 2)].map(v => `₹${v} Lakh Crore`);
    const correctVal = `₹${pd} Lakh Crore`;
    const options = [correctVal, ...wrongOptions].sort(() => 0.5 - Math.random());
    const correctIdx = options.indexOf(correctVal);

    return {
      id: `gen_calc_${Date.now()}`,
      topic: 'Banking Terminology',
      subtopic: 'Fiscal Mathematics',
      question: `If the Government of India estimates a Fiscal Deficit of ₹${fd} Lakh Crore and total Interest Payments of ₹${interest} Lakh Crore for a fiscal year, what is the estimated Primary Deficit?`,
      question_hi: `यदि भारत सरकार किसी वित्तीय वर्ष के लिए ₹${fd} लाख करोड़ के राजकोषीय घाटे और ₹${interest} लाख करोड़ के कुल ब्याज भुगतान का अनुमान लगाती है, तो अनुमानित प्राथमिक घाटा क्या है?`,
      options,
      options_hi: options,
      correct_option: correctIdx,
      provenance: 'ORIGINAL PRACTICE QUESTION',
      exam_tag: 'Fiscal Formula Drill',
      difficulty: 'Moderate',
      explanation: `Formula: Primary Deficit = Fiscal Deficit - Interest Payments. Here: Primary Deficit = ₹${fd} Lakh Crore - ₹${interest} Lakh Crore = ₹${pd} Lakh Crore.`,
      exam_shortcut: `Primary Deficit = Fiscal Deficit - Interest Payments`,
      trap_alert: 'Do NOT add the two values. Primary Deficit is strictly the difference!'
    };
  }
};
