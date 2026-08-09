(function () {
  "use strict";

  // EDIT PORTFOLIO HERE: titles, descriptions, tags and media paths live in one place.
  var projects = [
    { file:"sugar-macro", en:{title:"Crystal Sweet",category:"AI Product Film",description:"A tactile macro study where color, crystal texture and light turn a simple confection into a vivid product world.",tags:["Macro","Product storytelling","AI film"]}, fa:{title:"شیرینی بلورین",category:"فیلم محصول با هوش مصنوعی",description:"مطالعه‌ای ماکرو از رنگ، بافت بلوری و نور که یک شیرینی ساده را به جهانی زنده و چشم‌گیر تبدیل می‌کند.",tags:["ماکرو","روایت محصول","فیلم هوش مصنوعی"]}},
    { file:"skincare-drop", en:{title:"Skincare in Motion",category:"Beauty Visual Study",description:"A close, luminous beauty film built around the movement of serum, skin and warm reflected light.",tags:["Beauty","Cinematic AI","Material study"]}, fa:{title:"حرکت روی پوست",category:"مطالعه تصویری زیبایی",description:"فیلمی نزدیک و درخشان با محوریت حرکت سرم، بافت پوست و بازتاب نور گرم.",tags:["زیبایی","هوش مصنوعی سینمایی","مطالعه بافت"]}},
    { file:"cereal-vortex", en:{title:"Flavor Orbit",category:"Experimental Commercial",description:"A playful food concept that pulls product, color and motion into one irresistible visual orbit.",tags:["Food","Visual concept","Motion"]}, fa:{title:"مدار طعم",category:"تبلیغ تجربی",description:"ایده‌ای بازیگوش برای مواد غذایی که محصول، رنگ و حرکت را در یک مدار تصویری جذاب جمع می‌کند.",tags:["مواد غذایی","کانسپت بصری","حرکت"]}},
    { file:"fragrance-study", en:{title:"Amber Atmosphere",category:"Cinematic Product Film",description:"A fragrance study shaped through suspended particles, dramatic shadow and a warm, elemental palette.",tags:["Fragrance","Lighting","Art direction"]}, fa:{title:"فضای کهربایی",category:"فیلم سینمایی محصول",description:"مطالعه‌ای برای عطر با ذرات معلق، سایه‌های نمایشی و پالت گرم و عنصری.",tags:["عطر","نورپردازی","کارگردانی هنری"]}},
    { file:"automotive-interface", en:{title:"Future in Transit",category:"Automotive Visual Study",description:"A compact automotive sequence blending city movement, interface detail and a precise graphic rhythm.",tags:["Automotive","Interface","Campaign study"]}, fa:{title:"آینده در حرکت",category:"مطالعه تصویری خودرو",description:"روایتی کوتاه برای خودرو که حرکت شهری، جزئیات رابط و ریتم گرافیکی دقیق را ترکیب می‌کند.",tags:["خودرو","رابط کاربری","مطالعه کمپین"]}},
    { file:"beverage-pair", en:{title:"Object Duet",category:"AI Product Commercial",description:"Two products share a minimal stage in a clean study of proportion, balance and controlled reflection.",tags:["Packshot","Product","Minimal"]}, fa:{title:"دوئت محصول",category:"تبلیغ محصول با هوش مصنوعی",description:"دو محصول روی صحنه‌ای مینیمال؛ مطالعه‌ای دقیق از تناسب، تعادل و بازتاب کنترل‌شده.",tags:["پک‌شات","محصول","مینیمال"]}},
    { file:"sneaker-film", en:{title:"After Dark",category:"Fashion Product Film",description:"A sneaker portrait with sharp silhouettes and a nocturnal palette, designed around presence rather than spectacle.",tags:["Footwear","Fashion","Studio light"]}, fa:{title:"پس از تاریکی",category:"فیلم محصول فشن",description:"پرتره‌ای از کتانی با سیلوئت‌های تیز و پالت شبانه؛ متکی بر حضور محصول، نه اغراق تصویری.",tags:["کفش","فشن","نور استودیویی"]}},
    { file:"wearable-motion", en:{title:"Pulse / Pace",category:"Wearable Campaign Study",description:"A kinetic visual story connecting movement, time and wearable technology in one focused sequence.",tags:["Wearable","Performance","Motion design"]}, fa:{title:"نبض / سرعت",category:"مطالعه کمپین ابزار پوشیدنی",description:"روایتی پرتحرک که حرکت، زمان و فناوری پوشیدنی را در یک سکانس متمرکز پیوند می‌دهد.",tags:["ابزار پوشیدنی","عملکرد","موشن دیزاین"]}},
    { file:"dessert-cinema", en:{title:"Slow Indulgence",category:"Food Commercial Study",description:"A rich dessert film directed around anticipation, texture and the exact moment a product becomes irresistible.",tags:["Food","Slow motion","Sensory"]}, fa:{title:"لذت آهسته",category:"مطالعه تبلیغ مواد غذایی",description:"فیلمی غنی برای دسر، با تمرکز بر انتظار، بافت و همان لحظه‌ای که محصول مقاومت‌ناپذیر می‌شود.",tags:["مواد غذایی","حرکت آهسته","حسی"]}},
    { file:"amber-bottle", en:{title:"Elemental Essence",category:"AI Beauty Commercial",description:"A beauty product emerges through mineral light and atmospheric motion in a refined vertical composition.",tags:["Beauty","Vertical film","Atmosphere"]}, fa:{title:"عصاره عناصر",category:"تبلیغ زیبایی با هوش مصنوعی",description:"محصولی زیبایی در میان نور معدنی و حرکت اتمسفریک، با ترکیب‌بندی عمودی و ظریف آشکار می‌شود.",tags:["زیبایی","فیلم عمودی","فضاسازی"]}},
    { file:"product-on-water", en:{title:"Open Water",category:"Product Visual Concept",description:"A bright product story where clean color, scale and a surreal ocean setting create instant recognition.",tags:["Product","Surreal","Social film"]}, fa:{title:"آب‌های آزاد",category:"کانسپت تصویری محصول",description:"روایتی روشن که با رنگ خالص، مقیاس و فضای سوررئال اقیانوسی، محصول را به‌یادماندنی می‌کند.",tags:["محصول","سوررئال","فیلم شبکه اجتماعی"]}},
    { file:"wellness-bottle", en:{title:"Botanical Lift",category:"Wellness Product Film",description:"Botanical cues and buoyant motion frame a wellness product with energy, clarity and a premium finish.",tags:["Wellness","Botanical","Product film"]}, fa:{title:"اوج گیاهی",category:"فیلم محصول سلامت",description:"نشانه‌های گیاهی و حرکت سبک، محصول سلامت را با انرژی، شفافیت و پرداختی حرفه‌ای قاب می‌گیرند.",tags:["سلامت","گیاهی","فیلم محصول"]}}
  ];

  // The rest of the supplied Gallery folder. The 12 projects above keep their curated
  // names; these neutral study titles avoid inventing client or campaign identities.
  function toPersianDigits(value) {
    return String(value).replace(/\d/g, function (digit) { return "۰۱۲۳۴۵۶۷۸۹"[Number(digit)]; });
  }

  function makeStudioStudy(number) {
    var padded = String(number).padStart(3, "0");
    var group;
    if (number <= 20) {
      group = {
        enCategory: "AI Product & Lifestyle Study",
        faCategory: "مطالعه محصول و سبک زندگی با هوش مصنوعی",
        enDescription: "A studio exploration of product, texture and everyday imagery, developed through AI-assisted visual production.",
        faDescription: "کاوشی استودیویی در محصول، بافت و تصویر روزمره که با تولید بصری مبتنی بر هوش مصنوعی شکل گرفته است.",
        enTags: ["Product", "Lifestyle", "AI film"],
        faTags: ["محصول", "سبک زندگی", "فیلم هوش مصنوعی"]
      };
    } else if (number <= 40) {
      group = {
        enCategory: "Fashion & Brand Visual Study",
        faCategory: "مطالعه بصری فشن و برند",
        enDescription: "An AI visual study focused on styling, brand presence and a concise cinematic moment.",
        faDescription: "مطالعه‌ای بصری با تمرکز بر استایل، حضور برند و ساخت یک لحظه کوتاه سینمایی.",
        enTags: ["Fashion", "Brand", "Visual study"],
        faTags: ["فشن", "برند", "مطالعه بصری"]
      };
    } else if (number <= 60) {
      group = {
        enCategory: "Commercial Concept Study",
        faCategory: "مطالعه کانسپت تبلیغاتی",
        enDescription: "A compact commercial concept exploring composition, movement and product-led storytelling.",
        faDescription: "کانسپتی کوتاه برای تبلیغات که ترکیب‌بندی، حرکت و روایت محصول‌محور را بررسی می‌کند.",
        enTags: ["Commercial", "Concept", "Motion"],
        faTags: ["تبلیغات", "کانسپت", "حرکت"]
      };
    } else {
      group = {
        enCategory: "Character & Motion Study",
        faCategory: "مطالعه شخصیت و حرکت",
        enDescription: "An experimental character and motion piece created as part of Chavana Studio’s ongoing AI film studies.",
        faDescription: "قطعه‌ای تجربی در شخصیت و حرکت، از مجموعه مطالعات پیوسته فیلم هوش مصنوعی در استودیو چاوانا.",
        enTags: ["Character", "Animation", "AI film"],
        faTags: ["شخصیت", "انیمیشن", "فیلم هوش مصنوعی"]
      };
    }
    return {
      file: "studio-study-" + padded,
      en: { title: "Studio Study " + padded, category: group.enCategory, description: group.enDescription, tags: group.enTags },
      fa: { title: "مطالعه استودیویی " + toPersianDigits(padded), category: group.faCategory, description: group.faDescription, tags: group.faTags }
    };
  }

  var curatedSourceNumbers = [3, 7, 14, 19, 23, 29, 35, 42, 43, 50, 54, 58];
  for (var sourceNumber = 1; sourceNumber <= 85; sourceNumber += 1) {
    if (curatedSourceNumbers.indexOf(sourceNumber) === -1) projects.push(makeStudioStudy(sourceNumber));
  }

  // EDIT TRANSLATIONS HERE. Contact and social details can replace the placeholder strings below.
  var copy = {
    en: {
      skip:"Skip to content",navLabel:"Primary navigation",menu:"Menu",languageLabel:"Language",navHome:"Home",navAbout:"About",navServices:"Services",navProcess:"Process",navWork:"Work",navAI:"AI",navLearn:"Insights",navContact:"Contact",navCta:"Start a project",
      heroEyebrow:"Independent AI creative studio",heroTitle:"We turn ideas into <em>impossible</em> images.",heroText:"Chavana creates AI-powered commercials and visual campaigns, pairing human creative direction with a new production language.",heroPrimary:"Explore our work",heroSecondary:"Start a project",heroCardOne:"Skincare in Motion",heroVisualLabel:"Selected Chavana Studio work",heroFoot:"Creative direction · AI production · Post",scroll:"Scroll to discover ↓",
      capabilityLabel:"Capabilities",cap1:"AI Commercials",cap2:"Creative Direction",cap3:"AI Video Production",cap4:"Visual Development",cap5:"Campaign Concepts",cap6:"Post Production",
      aboutKicker:"About Chavana",aboutTitle:"Not an AI button.<br><em>A creative studio.</em>",aboutLead:"Technology expands the canvas. Taste decides what belongs on it.",aboutBody:"We combine concept development, storytelling, visual design, AI production and editorial craft. Every frame starts with an intention—and ends with a piece built to work in the real world.",stat1:"Integrated creative team",stat2:"Visual directions to explore",stat3:"Made for your brief",
      servicesKicker:"What we make",servicesTitle:"From first thought<br>to final frame.",servicesIntro:"A focused set of services for brands and agencies looking for fresh visual territory.",service1Title:"AI Commercial Production",service1Text:"End-to-end films built from strategy, concept and art direction through AI production, edit and delivery.",service2Title:"Campaign Visual Systems",service2Text:"A coherent world of hero visuals, short-form films and campaign assets designed to work together.",service3Title:"Product & Social Films",service3Text:"Scroll-stopping product stories shaped for social channels without losing cinematic craft.",service4Title:"Creative Concept Development",service4Text:"Narrative, look development and visual prototypes that make an ambitious idea tangible before production.",service5Title:"AI-Assisted Post Production",service5Text:"Image extension, transitions, cleanup, editorial refinement and finishing for existing productions.",
      processKicker:"How we work",processTitle:"A clear path through<br><em>new territory.</em>",p1Title:"Brief & Strategy",p1Text:"We define the audience, ambition, message and practical shape of the project.",p2Title:"Creative Concept",p2Text:"We find the central idea, story logic and visual point of view.",p3Title:"Visual Development",p3Text:"Style frames and motion tests turn the direction into something concrete.",p4Title:"AI Production",p4Text:"We produce and art-direct the shots, maintaining consistency across the film.",p5Title:"Edit & Refinement",p5Text:"Edit, sound, color and finishing bring rhythm and precision to the piece.",p6Title:"Final Delivery",p6Text:"We prepare the approved master and channel-ready formats for launch.",
      workKicker:"Selected work",workTitle:"Images with<br>something to say.",workIntro:"A curated selection of AI films, visual experiments and commercial studies made by Chavana Studio.",openProject:"Open project",
      aiKicker:"Our point of view",aiTitle:"AI is the instrument.<br><em>Direction is the voice.</em>",aiText:"AI lets us explore visual routes faster, prototype ambitious worlds and rethink production constraints. But the work still depends on human judgment: what to say, what to keep, and why a frame matters.",aiTag1:"Rapid exploration",aiTag2:"Cinematic generation",aiTag3:"Campaign iteration",aiTag4:"Human art direction",
      insightsKicker:"Notes from the studio",insightsTitle:"Learn the new<br>production language.",insightsIntro:"Practical thinking on AI advertising, visual storytelling and the craft behind the process.",insightType1:"Field note · 04 min",insight1Title:"What makes an AI commercial feel directed?",insight1Text:"Consistency is not enough. Point of view, rhythm and restraint turn generated shots into a film.",insightType2:"Process · 06 min",insight2Title:"From prompt to visual system",insight2Text:"How a campaign language grows from references, rules and deliberate iteration.",insightType3:"Perspective · 03 min",insight3Title:"Where AI belongs in production",insight3Text:"A grounded look at the stages where AI creates meaningful leverage—and where craft still leads.",insightNote:"Studio articles are being prepared. No external links yet.",
      contactKicker:"Have a project in mind?",contactTitle:"Let’s make the image<br><em>they haven’t seen yet.</em>",contactText:"For brands, agencies and creators ready to explore a new production language.",contactLabel:"Project inquiries",contactPending:"Contact channel coming soon",contactHint:"Contact details can be added in js/app.js.",footerText:"AI-powered advertising, shaped by human imagination.",footerExplore:"Explore",footerContact:"Contact",footerPending:"Details to be announced",footerEdit:"Editable in app.js",footerRights:"All rights reserved.",backTop:"Back to top ↑",closeModal:"Close project"
    },
    fa: {
      skip:"رفتن به محتوای اصلی",navLabel:"ناوبری اصلی",menu:"منو",languageLabel:"انتخاب زبان",navHome:"خانه",navAbout:"درباره ما",navServices:"خدمات",navProcess:"فرآیند",navWork:"نمونه‌کارها",navAI:"هوش مصنوعی",navLearn:"دیدگاه‌ها",navContact:"تماس",navCta:"شروع همکاری",
      heroEyebrow:"استودیوی مستقل خلاقیت با هوش مصنوعی",heroTitle:"ایده‌ها را به تصاویری <em>ناممکن</em> تبدیل می‌کنیم.",heroText:"چاوانا تبلیغات و کمپین‌های بصری مبتنی بر هوش مصنوعی می‌سازد؛ جایی که کارگردانی خلاق انسانی با زبان تازه تولید همراه می‌شود.",heroPrimary:"دیدن نمونه‌کارها",heroSecondary:"شروع همکاری",heroCardOne:"حرکت روی پوست",heroVisualLabel:"گزیده‌ای از آثار استودیو چاوانا",heroFoot:"کارگردانی خلاق · تولید با هوش مصنوعی · پس‌تولید",scroll:"برای کشف بیشتر پایین بروید ↓",
      capabilityLabel:"توانمندی‌ها",cap1:"تبلیغات هوش مصنوعی",cap2:"کارگردانی خلاق",cap3:"تولید ویدیوی هوش مصنوعی",cap4:"توسعه بصری",cap5:"ایده‌پردازی کمپین",cap6:"پس‌تولید",
      aboutKicker:"درباره چاوانا",aboutTitle:"فقط یک دکمه هوش مصنوعی نیستیم.<br><em>یک استودیوی خلاقیم.</em>",aboutLead:"فناوری بوم را بزرگ‌تر می‌کند؛ سلیقه تعیین می‌کند چه چیزی روی آن بماند.",aboutBody:"ایده‌پردازی، روایت، طراحی بصری، تولید با هوش مصنوعی و تدوین را یکپارچه می‌کنیم. هر فریم با یک هدف آغاز می‌شود و به اثری می‌رسد که در دنیای واقعی کاربرد دارد.",stat1:"تیم خلاق یکپارچه",stat2:"مسیر بصری برای کشف",stat3:"ویژه بریف شما",
      servicesKicker:"آنچه می‌سازیم",servicesTitle:"از نخستین فکر<br>تا آخرین فریم.",servicesIntro:"مجموعه‌ای متمرکز از خدمات برای برندها و آژانس‌هایی که به‌دنبال قلمرو بصری تازه‌اند.",service1Title:"تولید تبلیغ با هوش مصنوعی",service1Text:"تولید کامل فیلم؛ از استراتژی، ایده و کارگردانی هنری تا تولید، تدوین و تحویل نهایی.",service2Title:"سیستم بصری کمپین",service2Text:"جهانی منسجم از تصاویر کلیدی، فیلم‌های کوتاه و دارایی‌های کمپین که در کنار هم کار می‌کنند.",service3Title:"فیلم محصول و شبکه اجتماعی",service3Text:"روایت‌های جذاب محصول برای شبکه‌های اجتماعی، بدون قربانی کردن کیفیت سینمایی.",service4Title:"توسعه ایده خلاق",service4Text:"روایت، طراحی ظاهر و نمونه‌های بصری که ایده‌ای بلندپروازانه را پیش از تولید ملموس می‌کنند.",service5Title:"پس‌تولید با کمک هوش مصنوعی",service5Text:"گسترش تصویر، ترنزیشن، پاک‌سازی، اصلاح تدوین و پرداخت نهایی برای تولیدات موجود.",
      processKicker:"روش کار ما",processTitle:"مسیری روشن در<br><em>قلمرویی تازه.</em>",p1Title:"بریف و استراتژی",p1Text:"مخاطب، هدف، پیام و ابعاد اجرایی پروژه را دقیق تعریف می‌کنیم.",p2Title:"ایده خلاق",p2Text:"ایده مرکزی، منطق روایت و نگاه بصری پروژه را شکل می‌دهیم.",p3Title:"توسعه بصری",p3Text:"استایل‌فریم‌ها و تست‌های حرکت، مسیر را به تصویری ملموس تبدیل می‌کنند.",p4Title:"تولید با هوش مصنوعی",p4Text:"شات‌ها را تولید و کارگردانی می‌کنیم تا انسجام فیلم حفظ شود.",p5Title:"تدوین و پرداخت",p5Text:"تدوین، صدا، رنگ و پرداخت نهایی به اثر ریتم و دقت می‌بخشند.",p6Title:"تحویل نهایی",p6Text:"نسخه نهایی تأییدشده و خروجی‌های مناسب هر کانال را آماده می‌کنیم.",
      workKicker:"نمونه‌کارهای منتخب",workTitle:"تصاویری که<br>حرفی برای گفتن دارند.",workIntro:"گزیده‌ای از فیلم‌های هوش مصنوعی، تجربه‌های بصری و مطالعات تبلیغاتی ساخته‌شده در استودیو چاوانا.",openProject:"باز کردن پروژه",
      aiKicker:"نگاه ما",aiTitle:"هوش مصنوعی ساز است؛<br><em>کارگردانی، صدا.</em>",aiText:"هوش مصنوعی امکان می‌دهد مسیرهای بصری را سریع‌تر کشف کنیم، جهان‌های بلندپروازانه را بسازیم و محدودیت‌های تولید را از نو ببینیم. اما کیفیت اثر همچنان به قضاوت انسانی وابسته است: چه بگوییم، چه نگه داریم و چرا یک فریم اهمیت دارد.",aiTag1:"کشف سریع",aiTag2:"تولید سینمایی",aiTag3:"تکرار و توسعه کمپین",aiTag4:"کارگردانی هنری انسانی",
      insightsKicker:"یادداشت‌های استودیو",insightsTitle:"زبان تازه تولید<br>را یاد بگیرید.",insightsIntro:"نگاهی کاربردی به تبلیغات هوش مصنوعی، روایت بصری و مهارت‌های پشت فرآیند.",insightType1:"یادداشت · ۴ دقیقه",insight1Title:"چه چیزی به تبلیغ هوش مصنوعی حس کارگردانی می‌دهد؟",insight1Text:"انسجام کافی نیست؛ نگاه، ریتم و خویشتن‌داری شات‌های تولیدشده را به فیلم تبدیل می‌کنند.",insightType2:"فرآیند · ۶ دقیقه",insight2Title:"از پرامپت تا سیستم بصری",insight2Text:"زبان یک کمپین چگونه از رفرنس‌ها، قواعد و تکرار هدفمند شکل می‌گیرد.",insightType3:"دیدگاه · ۳ دقیقه",insight3Title:"جای درست هوش مصنوعی در تولید",insight3Text:"نگاهی واقع‌بینانه به مراحلی که هوش مصنوعی مزیت واقعی می‌سازد و جاهایی که مهارت انسانی راهبر است.",insightNote:"مقاله‌های استودیو در حال آماده‌سازی‌اند و فعلاً لینک خارجی ندارند.",
      contactKicker:"پروژه‌ای در ذهن دارید؟",contactTitle:"بیایید تصویری بسازیم<br><em>که هنوز ندیده‌اند.</em>",contactText:"برای برندها، آژانس‌ها و خالقانی که آماده‌اند زبان تازه‌ای در تولید تجربه کنند.",contactLabel:"درخواست همکاری",contactPending:"راه ارتباطی به‌زودی اعلام می‌شود",contactHint:"اطلاعات تماس را می‌توان در js/app.js وارد کرد.",footerText:"تبلیغات مبتنی بر هوش مصنوعی، شکل‌گرفته با تخیل انسانی.",footerExplore:"بخش‌ها",footerContact:"تماس",footerPending:"اطلاعات به‌زودی اعلام می‌شود",footerEdit:"قابل ویرایش در app.js",footerRights:"تمام حقوق محفوظ است.",backTop:"بازگشت به بالا ↑",closeModal:"بستن پروژه"
    }
  };

  var state = { lang: "en", lastFocus: null, activeProject: null };
  var root = document.documentElement;
  var gallery = document.getElementById("gallery");
  var modal = document.getElementById("project-modal");
  var modalVideo = document.getElementById("modal-video");
  var menuButton = document.querySelector(".menu-toggle");
  var header = document.querySelector(".site-header");

  function renderGallery() {
    gallery.innerHTML = projects.map(function (project, index) {
      var text = project[state.lang];
      return '<button class="project-card reveal visible" type="button" data-project="' + index + '" aria-label="' + escapeHtml(copy[state.lang].openProject + ': ' + text.title) + '">' +
        '<span class="project-media"><img loading="lazy" decoding="async" src="./asset/gallery/posters/' + project.file + '.webp" alt=""><i class="project-open" aria-hidden="true">▶</i></span>' +
        '<span class="project-info"><h3>' + escapeHtml(text.title) + '</h3><span>' + String(index + 1).padStart(2,"0") + ' / ' + projects.length + '</span><p>' + escapeHtml(text.category) + '</p></span></button>';
    }).join("");
  }

  function escapeHtml(value) {
    return String(value).replace(/[&<>"]/g, function (char) { return {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[char]; });
  }

  function setLanguage(lang) {
    if (!copy[lang]) return;
    state.lang = lang;
    root.lang = lang;
    root.dir = lang === "fa" ? "rtl" : "ltr";
    document.querySelectorAll("[data-i18n]").forEach(function (element) {
      var value = copy[lang][element.getAttribute("data-i18n")];
      if (typeof value === "string") element.innerHTML = value;
    });
    document.querySelectorAll("[data-i18n-aria]").forEach(function (element) {
      var value = copy[lang][element.getAttribute("data-i18n-aria")];
      if (typeof value === "string") element.setAttribute("aria-label", value);
    });
    document.querySelectorAll("[data-lang]").forEach(function (button) {
      button.setAttribute("aria-pressed", String(button.getAttribute("data-lang") === lang));
    });
    renderGallery();
    if (state.activeProject !== null && modal.classList.contains("open")) fillModal(state.activeProject);
    try { localStorage.setItem("chavana-language", lang); } catch (error) { /* Preference persistence is optional. */ }
  }

  function fillModal(index) {
    var project = projects[index];
    var text = project[state.lang];
    document.getElementById("modal-number").textContent = String(index + 1).padStart(2,"0");
    document.getElementById("modal-category").textContent = text.category;
    document.getElementById("modal-title").textContent = text.title;
    document.getElementById("modal-description").textContent = text.description;
    document.getElementById("modal-tags").innerHTML = text.tags.map(function (tag) { return "<span>" + escapeHtml(tag) + "</span>"; }).join("");
  }

  function openModal(index, trigger) {
    if (!projects[index]) return;
    state.lastFocus = trigger || document.activeElement;
    state.activeProject = index;
    fillModal(index);
    modalVideo.poster = "./asset/gallery/posters/" + projects[index].file + ".webp";
    modalVideo.src = "./asset/gallery/" + projects[index].file + ".mp4";
    modal.setAttribute("aria-hidden", "false");
    modal.classList.add("open");
    document.body.classList.add("modal-open");
    document.querySelector(".modal-close").focus();
  }

  function closeModal() {
    modalVideo.pause();
    modalVideo.removeAttribute("src");
    modalVideo.load();
    modal.classList.remove("open");
    modal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("modal-open");
    state.activeProject = null;
    if (state.lastFocus) state.lastFocus.focus();
  }

  document.addEventListener("click", function (event) {
    var languageButton = event.target.closest("[data-lang]");
    var projectButton = event.target.closest("[data-project]");
    if (languageButton) setLanguage(languageButton.getAttribute("data-lang"));
    if (projectButton) openModal(Number(projectButton.getAttribute("data-project")), projectButton);
    if (event.target.closest("[data-close-modal]")) closeModal();
    if (event.target.closest(".nav-links a") || event.target.closest(".nav-actions .button")) {
      header.classList.remove("menu-open");
      menuButton.setAttribute("aria-expanded", "false");
    }
  });

  menuButton.addEventListener("click", function () {
    var open = header.classList.toggle("menu-open");
    menuButton.setAttribute("aria-expanded", String(open));
  });

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
      if (modal.classList.contains("open")) closeModal();
      else if (header.classList.contains("menu-open")) menuButton.click();
    }
    if (event.key === "Tab" && modal.classList.contains("open")) {
      var focusable = modal.querySelectorAll("button, video, [href], [tabindex]:not([tabindex='-1'])");
      var first = focusable[0]; var last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    }
  });

  window.addEventListener("scroll", function () { header.classList.toggle("scrolled", window.scrollY > 24); }, {passive:true});

  var sectionNavLinks = Array.from(document.querySelectorAll(".nav-links a[href^='#']"));
  if ("IntersectionObserver" in window) {
    var navObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting || !entry.target.id) return;
        sectionNavLinks.forEach(function (link) {
          if (link.getAttribute("href") === "#" + entry.target.id) link.setAttribute("aria-current", "page");
          else link.removeAttribute("aria-current");
        });
      });
    }, { rootMargin: "-22% 0px -68%", threshold: 0 });
    document.querySelectorAll("main section[id]").forEach(function (section) { navObserver.observe(section); });
  }

  var observer = "IntersectionObserver" in window ? new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) { if (entry.isIntersecting) { entry.target.classList.add("visible"); observer.unobserve(entry.target); } });
  }, {threshold:.12, rootMargin:"0px 0px -40px"}) : null;

  document.querySelectorAll(".reveal").forEach(function (element) { if (observer) observer.observe(element); else element.classList.add("visible"); });
  document.getElementById("year").textContent = new Date().getFullYear();
  var saved = "en";
  try { saved = localStorage.getItem("chavana-language") || "en"; } catch (error) { saved = "en"; }
  setLanguage(saved === "fa" ? "fa" : "en");
})();
