export interface RandomQuestion {
  id: string;
  segmentId: string;
  questionNumber: number;
  originalQuestion: string;
  wheelLabel: string;
}

export interface RandomSegment {
  id: string;
  name: string;
  description: string;
  questions: RandomQuestion[];
}

export interface RandomInterviewDataSet {
  segments: RandomSegment[];
}

export const CANONICAL_RANDOM_INTERVIEW_DATA: RandomInterviewDataSet = {
  segments: [
    {
      id: "SEG-01",
      name: "Experience & Judgment",
      description: "أسئلة تركز على الخبرة العملية، تغيير الأحكام، التعامل مع الـevidence، والـintuition، والتعلّم من التجربة.",
      questions: [
        {
          id: "RQ-001",
          segmentId: "SEG-01",
          questionNumber: 1,
          originalQuestion: "إيه قرار في بداية رحلتك غيّر حكمك على طريقة شغلك؟",
          wheelLabel: "قرار غيّر طريقة شغلك"
        },
        {
          id: "RQ-002",
          segmentId: "SEG-01",
          questionNumber: 2,
          originalQuestion: "إيه تجربة عملية غيّرت طريقة تفكيرك في مشكلة؟",
          wheelLabel: "تجربة غيّرت طريقة تفكيرك"
        },
        {
          id: "RQ-003",
          segmentId: "SEG-01",
          questionNumber: 3,
          originalQuestion: "إيه افتراض عن الناس اللي شغلك بيخدمهم اكتشفت بالتجربة إنه مش دقيق؟",
          wheelLabel: "افتراض اتضح إنه غير دقيق"
        },
        {
          id: "RQ-004",
          segmentId: "SEG-01",
          questionNumber: 4,
          originalQuestion: "إمتى بتعتبر إن خبرتك القديمة محتاجة تتراجع؟",
          wheelLabel: "مراجعة الخبرة القديمة"
        },
        {
          id: "RQ-005",
          segmentId: "SEG-01",
          questionNumber: 5,
          originalQuestion: "إيه نوع الـevidence اللي بتدور عليه لما الصورة تكون مش واضحة؟",
          wheelLabel: "نوع الـevidence اللي بتدور عليه"
        },
        {
          id: "RQ-006",
          segmentId: "SEG-01",
          questionNumber: 6,
          originalQuestion: "إمتى الـintuition تكون useful في قرار مهم؟",
          wheelLabel: "متى تعتمد على الـintuition"
        },
        {
          id: "RQ-007",
          segmentId: "SEG-01",
          questionNumber: 7,
          originalQuestion: "إيه اللي بيخليك تغيّر رأيك بعد feedback جديد؟",
          wheelLabel: "ما الذي يغيّر رأيك"
        },
        {
          id: "RQ-008",
          segmentId: "SEG-01",
          questionNumber: 8,
          originalQuestion: "إيه العلامة اللي بتقول لك إنك محتاج تختبر افتراض بدل ما تكمل؟",
          wheelLabel: "علامة تستحق اختبار الافتراض"
        },
        {
          id: "RQ-009",
          segmentId: "SEG-01",
          questionNumber: 9,
          originalQuestion: "إزاي بتتعامل مع قرار لسه مفيش عنه data كفاية؟",
          wheelLabel: "قرار بدون data كفاية"
        },
        {
          id: "RQ-010",
          segmentId: "SEG-01",
          questionNumber: 10,
          originalQuestion: "إيه skill اتطورت عندك بسبب تكرار التجربة؟",
          wheelLabel: "Skill تطورت مع التجربة"
        }
      ]
    },
    {
      id: "SEG-02",
      name: "Problem, Value & Validation",
      description: "أسئلة تركز على فهم الـproblem، اختبار الأفكار، evidence، الـexperiments، وقياس القيمة والـadoption.",
      questions: [
        {
          id: "RQ-011",
          segmentId: "SEG-02",
          questionNumber: 1,
          originalQuestion: "إزاي بتحدد إن problem معينة تستحق وقت ومجهود؟",
          wheelLabel: "تحديد قيمة الـproblem"
        },
        {
          id: "RQ-012",
          segmentId: "SEG-02",
          questionNumber: 2,
          originalQuestion: "إيه أول evidence بتدور عليه عشان تتأكد إن problem حقيقية؟",
          wheelLabel: "أول evidence عن المشكلة"
        },
        {
          id: "RQ-013",
          segmentId: "SEG-02",
          questionNumber: 3,
          originalQuestion: "إزاي بتعرف إن الحل اللي بتقدمه بيخلق قيمة فعلية؟",
          wheelLabel: "معرفة قيمة الحل"
        },
        {
          id: "RQ-014",
          segmentId: "SEG-02",
          questionNumber: 4,
          originalQuestion: "إيه أول حاجة بتراجعها لما النتيجة تطلع أقل من المتوقع؟",
          wheelLabel: "مراجعة النتيجة الأقل"
        },
        {
          id: "RQ-015",
          segmentId: "SEG-02",
          questionNumber: 5,
          originalQuestion: "إيه اللي يخلي feedback معين يستحق الثقة؟",
          wheelLabel: "الثقة في الـfeedback"
        },
        {
          id: "RQ-016",
          segmentId: "SEG-02",
          questionNumber: 6,
          originalQuestion: "إزاي تختبر فكرة قبل ما تستثمر فيها بشكل كبير؟",
          wheelLabel: "اختبار الفكرة قبل الاستثمار"
        },
        {
          id: "RQ-017",
          segmentId: "SEG-02",
          questionNumber: 7,
          originalQuestion: "إمتى تعتبر تجربة صغيرة خطوة مناسبة قبل التوسع؟",
          wheelLabel: "التجربة الصغيرة قبل التوسع"
        },
        {
          id: "RQ-018",
          segmentId: "SEG-02",
          questionNumber: 8,
          originalQuestion: "إيه اللي يخلي الـexperiment مفيد فعلًا في اتخاذ decision؟",
          wheelLabel: "قيمة الـexperiment في القرار"
        },
        {
          id: "RQ-019",
          segmentId: "SEG-02",
          questionNumber: 9,
          originalQuestion: "إزاي تتعامل مع adoption أقل من المتوقع؟",
          wheelLabel: "التعامل مع adoption منخفض"
        },
        {
          id: "RQ-020",
          segmentId: "SEG-02",
          questionNumber: 10,
          originalQuestion: "إيه اللي يفرق بين فكرة جديدة وحل أثبت قيمة فعلية؟",
          wheelLabel: "فكرة جديدة أم قيمة مثبتة"
        }
      ]
    },
    {
      id: "SEG-03",
      name: "Decision-Making & Prioritization",
      description: "أسئلة تركز على ترتيب الأولويات، القرارات تحت القيود، uncertainty، الـrisk، وتعارض الإشارات والاحتياجات.",
      questions: [
        {
          id: "RQ-021",
          segmentId: "SEG-03",
          questionNumber: 1,
          originalQuestion: "إزاي تحدد أول priority لما الـresources تكون محدودة؟",
          wheelLabel: "تحديد الـpriority مع القيود"
        },
        {
          id: "RQ-022",
          segmentId: "SEG-03",
          questionNumber: 2,
          originalQuestion: "إيه العامل اللي بتديه الوزن الأكبر في قرار مهم؟",
          wheelLabel: "عامل الحسم في القرار"
        },
        {
          id: "RQ-023",
          segmentId: "SEG-03",
          questionNumber: 3,
          originalQuestion: "إمتى تغيّر priority بعد ما تبدأ التنفيذ؟",
          wheelLabel: "تغيير الـpriority أثناء التنفيذ"
        },
        {
          id: "RQ-024",
          segmentId: "SEG-03",
          questionNumber: 4,
          originalQuestion: "إزاي تتصرف لما الـdata والـintuition يدّوا إشارتين مختلفتين؟",
          wheelLabel: "تعارض الـdata والـintuition"
        },
        {
          id: "RQ-025",
          segmentId: "SEG-03",
          questionNumber: 5,
          originalQuestion: "إيه نوع القرارات اللي الـexperience تكون فيه أقوى مصدر عندك؟",
          wheelLabel: "قوة الـexperience في القرار"
        },
        {
          id: "RQ-026",
          segmentId: "SEG-03",
          questionNumber: 6,
          originalQuestion: "إيه اللي يخليك توقف اتجاه بدأت فيه؟",
          wheelLabel: "متى توقف اتجاهك"
        },
        {
          id: "RQ-027",
          segmentId: "SEG-03",
          questionNumber: 7,
          originalQuestion: "إزاي بتتعامل مع قرار فيه uncertainty عالية؟",
          wheelLabel: "التعامل مع uncertainty عالية"
        },
        {
          id: "RQ-028",
          segmentId: "SEG-03",
          questionNumber: 8,
          originalQuestion: "إيه تجربة غيّرت طريقة تقييمك للـrisk؟",
          wheelLabel: "تقييم الـrisk من التجربة"
        },
        {
          id: "RQ-029",
          segmentId: "SEG-03",
          questionNumber: 9,
          originalQuestion: "إزاي تحمي الـlong-term direction وقت الـshort-term pressure؟",
          wheelLabel: "حماية الـlong-term direction"
        },
        {
          id: "RQ-030",
          segmentId: "SEG-03",
          questionNumber: 10,
          originalQuestion: "إزاي تتعامل مع تعارض احتياجات أكتر من stakeholder في نفس القرار؟",
          wheelLabel: "تعارض احتياجات الـstakeholders"
        }
      ]
    },
    {
      id: "SEG-04",
      name: "Execution, Systems & People",
      description: "أسئلة تركز على التنفيذ، بناء الـsystems، delegation، اختيار الأشخاص، الـaccountability، الـcommunication، والحفاظ على الجودة.",
      questions: [
        {
          id: "RQ-031",
          segmentId: "SEG-04",
          questionNumber: 1,
          originalQuestion: "إزاي تستخدم القيود في تحسين طريقة شغلك؟",
          wheelLabel: "استخدام القيود بشكل أفضل"
        },
        {
          id: "RQ-032",
          segmentId: "SEG-04",
          questionNumber: 2,
          originalQuestion: "إمتى تعرف إن طريقة الشغل محتاجة تتحول لـsystem؟",
          wheelLabel: "متى تحتاج إلى system"
        },
        {
          id: "RQ-033",
          segmentId: "SEG-04",
          questionNumber: 3,
          originalQuestion: "إيه اللي يخلي الـsystem قابل للتطبيق فعلًا؟",
          wheelLabel: "قابلية تطبيق الـsystem"
        },
        {
          id: "RQ-034",
          segmentId: "SEG-04",
          questionNumber: 4,
          originalQuestion: "إمتى التفويض يبقى ضروري؟",
          wheelLabel: "متى يصبح التفويض ضروريًا"
        },
        {
          id: "RQ-035",
          segmentId: "SEG-04",
          questionNumber: 5,
          originalQuestion: "إيه اللي يخلي اختيار الشخص المناسب لدور معين قرارًا ناجحًا؟",
          wheelLabel: "اختيار الشخص المناسب للدور"
        },
        {
          id: "RQ-036",
          segmentId: "SEG-04",
          questionNumber: 6,
          originalQuestion: "إيه أول علامة بتشير إن المشكلة مرتبطة بطريقة تعاون الناس؟",
          wheelLabel: "علامة مشكلة التعاون"
        },
        {
          id: "RQ-037",
          segmentId: "SEG-04",
          questionNumber: 7,
          originalQuestion: "إزاي تحافظ على accountability من غير ما تتحول لمراقبة؟",
          wheelLabel: "Accountability بدون مراقبة"
        },
        {
          id: "RQ-038",
          segmentId: "SEG-04",
          questionNumber: 8,
          originalQuestion: "إيه اللي يخلي الـcommunication تمنع مشكلة في الشغل قبل ما تكبر؟",
          wheelLabel: "Communication تمنع المشكلة"
        },
        {
          id: "RQ-039",
          segmentId: "SEG-04",
          questionNumber: 9,
          originalQuestion: "إمتى تبقى خبرة شخص واحد نقطة اختناق في الشغل؟",
          wheelLabel: "خبرة شخص كنقطة اختناق"
        },
        {
          id: "RQ-040",
          segmentId: "SEG-04",
          questionNumber: 10,
          originalQuestion: "إيه اللي يساعدك تحافظ على الجودة مع زيادة حجم الشغل؟",
          wheelLabel: "الحفاظ على الجودة مع النمو"
        }
      ]
    },
    {
      id: "SEG-05",
      name: "People, Audience & Value Delivery",
      description: "أسئلة تركز على فهم الناس، الثقة، الـattention، الـengagement، تحويل الـexpertise إلى قيمة، والـvisibility وتجربة المستفيد.",
      questions: [
        {
          id: "RQ-041",
          segmentId: "SEG-05",
          questionNumber: 1,
          originalQuestion: "إزاي تعرف الناس اللي شغلك بيخدمهم محتاجين إيه بجد؟",
          wheelLabel: "فهم احتياجات الناس"
        },
        {
          id: "RQ-042",
          segmentId: "SEG-05",
          questionNumber: 2,
          originalQuestion: "إيه اللي يخلي الناس تثق في اللي بتقدمه؟",
          wheelLabel: "ما الذي يبني الثقة"
        },
        {
          id: "RQ-043",
          segmentId: "SEG-05",
          questionNumber: 3,
          originalQuestion: "إيه العلامة اللي تفرق بين attention وengagement حقيقي؟",
          wheelLabel: "Attention أم engagement حقيقي"
        },
        {
          id: "RQ-044",
          segmentId: "SEG-05",
          questionNumber: 4,
          originalQuestion: "إيه أصعب خطوة في تحويل خبرتك لحاجة يقدر غيرك يستفيد منها؟",
          wheelLabel: "تحويل الخبرة لفائدة"
        },
        {
          id: "RQ-045",
          segmentId: "SEG-05",
          questionNumber: 5,
          originalQuestion: "إيه اللي يخلي الرسالة اللي بتقدمها توصل بوضوح؟",
          wheelLabel: "وضوح الرسالة المقدمة"
        },
        {
          id: "RQ-046",
          segmentId: "SEG-05",
          questionNumber: 6,
          originalQuestion: "إيه اللي بيحوّل الـvisibility إلى فرصة فعلية؟",
          wheelLabel: "تحويل الـvisibility لفرصة"
        },
        {
          id: "RQ-047",
          segmentId: "SEG-05",
          questionNumber: 7,
          originalQuestion: "إيه اللي يخلي تجربة الشخص معاك ناجحة؟",
          wheelLabel: "نجاح تجربة الشخص"
        },
        {
          id: "RQ-048",
          segmentId: "SEG-05",
          questionNumber: 8,
          originalQuestion: "إزاي تتعامل مع expectations مش واقعية؟",
          wheelLabel: "التعامل مع expectations غير الواقعية"
        },
        {
          id: "RQ-049",
          segmentId: "SEG-05",
          questionNumber: 9,
          originalQuestion: "إيه نوع الـfeedback اللي تعتبره أهم feedback في شغلك؟",
          wheelLabel: "أهم feedback في شغلك"
        },
        {
          id: "RQ-050",
          segmentId: "SEG-05",
          questionNumber: 10,
          originalQuestion: "إيه اللي يخلي الناس ترجع لك بعد أول تجربة؟",
          wheelLabel: "لماذا يعود الناس إليك"
        }
      ]
    },
    {
      id: "SEG-06",
      name: "Learning, Adaptation & Long-Term Growth",
      description: "أسئلة تركز على التعلم السلوكي، الـperformance، الـlessons، الـconsistency، تطور المهارات، الأنماط، والمبادئ طويلة المدى.",
      questions: [
        {
          id: "RQ-051",
          segmentId: "SEG-06",
          questionNumber: 1,
          originalQuestion: "إيه اللي يخليك تعرف إن المعرفة اتحولت لسلوك؟",
          wheelLabel: "المعرفة تتحول إلى سلوك"
        },
        {
          id: "RQ-052",
          segmentId: "SEG-06",
          questionNumber: 2,
          originalQuestion: "إيه جانب من الـperformance الناس بتهمله لأنه مش ظاهر بسرعة؟",
          wheelLabel: "جانب مهمل من الـperformance"
        },
        {
          id: "RQ-053",
          segmentId: "SEG-06",
          questionNumber: 3,
          originalQuestion: "إيه أكبر lesson اكتشفته متأخر؟",
          wheelLabel: "أكبر lesson متأخر"
        },
        {
          id: "RQ-054",
          segmentId: "SEG-06",
          questionNumber: 4,
          originalQuestion: "إيه حاجة كنت فاكرها مهمة وبعدين اكتشفت إنها أقل أهمية؟",
          wheelLabel: "شيء فقد أهميته"
        },
        {
          id: "RQ-055",
          segmentId: "SEG-06",
          questionNumber: 5,
          originalQuestion: "إيه practice كان لها أكبر أثر على الـconsistency بتاعتك؟",
          wheelLabel: "أثر الـpractice على الـconsistency"
        },
        {
          id: "RQ-056",
          segmentId: "SEG-06",
          questionNumber: 6,
          originalQuestion: "إزاي بتحافظ على الـconsistency وقت الضغط؟",
          wheelLabel: "الحفاظ على الـconsistency تحت الضغط"
        },
        {
          id: "RQ-057",
          segmentId: "SEG-06",
          questionNumber: 7,
          originalQuestion: "إيه skill بتظهر أهميتها أكتر كل ما المسؤولية تكبر؟",
          wheelLabel: "أهمية الـskill مع المسؤولية"
        },
        {
          id: "RQ-058",
          segmentId: "SEG-06",
          questionNumber: 8,
          originalQuestion: "إيه pattern بدأت تشوفه بوضوح بعد سنين من الخبرة؟",
          wheelLabel: "Pattern ظهر مع الخبرة"
        },
        {
          id: "RQ-059",
          segmentId: "SEG-06",
          questionNumber: 9,
          originalQuestion: "إيه مبدأ بقيت تعتمد عليه في قراراتك؟",
          wheelLabel: "مبدأ تعتمد عليه"
        },
        {
          id: "RQ-060",
          segmentId: "SEG-06",
          questionNumber: 10,
          originalQuestion: "إيه اللي محتاج تتأكد منه قبل ما تنقل خبرتك من مجال لمجال جديد؟",
          wheelLabel: "التأكد قبل نقل الخبرة"
        }
      ]
    }
  ]
};

/**
 * Validate canonical data integrity:
 * - 6 segments
 * - 60 total questions (10 per segment)
 * - Unique IDs RQ-001 -> RQ-060
 * - All required fields present
 */
export function validateRandomInterviewDataSet(data: RandomInterviewDataSet = CANONICAL_RANDOM_INTERVIEW_DATA): boolean {
  if (!data || !Array.isArray(data.segments) || data.segments.length !== 6) {
    throw new Error(`Data validation failed: expected 6 segments, got ${data?.segments?.length}`);
  }

  const seenIds = new Set<string>();
  let totalQuestions = 0;

  for (let sIdx = 0; sIdx < data.segments.length; sIdx++) {
    const seg = data.segments[sIdx];
    if (!seg.id || !seg.name || !Array.isArray(seg.questions)) {
      throw new Error(`Data validation failed: invalid segment structure at index ${sIdx}`);
    }

    if (seg.questions.length !== 10) {
      throw new Error(`Data validation failed: Segment ${seg.id} must have 10 questions, found ${seg.questions.length}`);
    }

    for (let qIdx = 0; qIdx < seg.questions.length; qIdx++) {
      const q = seg.questions[qIdx];
      if (!q.id || !q.segmentId || !q.originalQuestion || !q.wheelLabel) {
        throw new Error(`Data validation failed: Question at index ${qIdx} in ${seg.id} missing required fields.`);
      }

      if (q.segmentId !== seg.id) {
        throw new Error(`Data validation failed: Question ${q.id} segmentId ${q.segmentId} does not match segment ${seg.id}`);
      }

      if (seenIds.has(q.id)) {
        throw new Error(`Data validation failed: Duplicate question ID ${q.id}`);
      }

      seenIds.add(q.id);
      totalQuestions++;
    }
  }

  if (totalQuestions !== 60) {
    throw new Error(`Data validation failed: Total questions must be 60, found ${totalQuestions}`);
  }

  return true;
}

// Flat list of all 60 questions in deterministic order (0 to 59)
export const ALL_RANDOM_QUESTIONS: RandomQuestion[] = CANONICAL_RANDOM_INTERVIEW_DATA.segments.flatMap(
  (seg) => seg.questions
);

// Map of questions by ID for O(1) lookup
export const RANDOM_QUESTIONS_BY_ID: Record<string, RandomQuestion> = ALL_RANDOM_QUESTIONS.reduce(
  (acc, q) => {
    acc[q.id] = q;
    return acc;
  },
  {} as Record<string, RandomQuestion>
);

// Map of segments by ID
export const RANDOM_SEGMENTS_BY_ID: Record<string, RandomSegment> = CANONICAL_RANDOM_INTERVIEW_DATA.segments.reduce(
  (acc, seg) => {
    acc[seg.id] = seg;
    return acc;
  },
  {} as Record<string, RandomSegment>
);

// Auto-validate on module load
validateRandomInterviewDataSet();
