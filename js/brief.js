(() => {
  "use strict";

  const STORAGE_KEY = "chavana-brief-draft-v1";
  const LANG_KEY = "chavana-brief-language";
  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];

  const copy = {
    fa: {
      langButton: "EN", save: "ذخیره پیش‌نویس", saved: "پیش‌نویس ذخیره شد", progress: "{n}٪ تکمیل شده",
      eyebrow: "CHAVANA / PROJECT INTAKE", title: "پروژه‌ات را برای ما<br><em>تعریف کن.</em>", intro: "این بریف کمک می‌کند هدف، خروجی، سبک بصری و محدودیت‌های پروژه را قبل از شروع تولید دقیق‌تر بشناسیم.", time: "حدود ۱۰–۱۵ دقیقه", requiredNote: "فیلدهای ضروری با * مشخص شده‌اند",
      reviewButton: "مرور و تأیید اطلاعات", clear: "پاک‌کردن پیش‌نویس", clearConfirm: "پیش‌نویس و همه پاسخ‌ها پاک شوند؟", addReference: "+ افزودن لینک مرجع", optional: "اختیاری",
      required: "تکمیل این فیلد ضروری است.", contactRequired: "حداقل یک راه ارتباطی معتبر وارد کنید.", invalidEmail: "ایمیل معتبر وارد کنید.", invalidUrl: "لینک معتبر وارد کنید.", validationTitle: "چند مورد ضروری هنوز کامل نشده است.",
      reviewEyebrow: "یک نگاه آخر", reviewTitle: "مرور اطلاعات پروژه", reviewIntro: "لطفاً اطلاعات زیر را بررسی کنید. قبل از ارسال می‌توانید هر بخش را ویرایش کنید.", edit: "ویرایش", emptySection: "پاسخی ثبت نشده است.", confirm: "اطلاعات بالا را بررسی کردم و برای ارسال تأیید می‌کنم.", confirmError: "برای ارسال، تأیید نهایی را فعال کنید.", back: "بازگشت و ویرایش", submit: "تأیید و ارسال بریف", submitting: "در حال ارسال…",
      successEyebrow: "بریف دریافت شد", successTitle: "بریف شما با موفقیت ارسال شد.", successText: "اطلاعات پروژه به استودیو چاوانا رسید. بعد از بررسی، برای مرحله بعد با شما در ارتباط خواهیم بود.", download: "دانلود نسخه متنی", home: "بازگشت به سایت", newBrief: "بریف جدید", briefId: "شناسه بریف",
      errorEyebrow: "ارسال انجام نشد", errorTitle: "اطلاعات شما حفظ شده است.", errorText: "اتصال به سرویس ارسال برقرار نشد. دوباره تلاش کنید یا نسخه متنی را دانلود و برای ما ارسال کنید.", retry: "تلاش دوباره", contact: "ارتباط با چاوانا",
      yes: "بله", no: "خیر", choose: "انتخاب کنید", other: "سایر", noAnswer: "—"
    },
    en: {
      langButton: "فا", save: "Save draft", saved: "Draft saved", progress: "{n}% complete",
      eyebrow: "CHAVANA / PROJECT INTAKE", title: "Tell us what you want<br><em>to create.</em>", intro: "This brief helps us understand the objective, deliverables, visual direction and production requirements before we begin.", time: "About 10–15 minutes", requiredNote: "Required fields are marked with *",
      reviewButton: "Review your brief", clear: "Clear draft", clearConfirm: "Clear the draft and all answers?", addReference: "+ Add reference", optional: "Optional",
      required: "This field is required.", contactRequired: "Add at least one reliable contact method.", invalidEmail: "Enter a valid email address.", invalidUrl: "Enter a valid URL.", validationTitle: "A few required details are still missing.",
      reviewEyebrow: "One last look", reviewTitle: "Review project information", reviewIntro: "Please check the information below. You can edit any section before sending.", edit: "Edit", emptySection: "No answer provided.", confirm: "I have reviewed the information above and confirm it is ready to send.", confirmError: "Please confirm the brief before sending.", back: "Back to edit", submit: "Confirm & Send Brief", submitting: "Sending…",
      successEyebrow: "Brief received", successTitle: "Your brief has been sent.", successText: "Chavana Studio has received your project information. We’ll review it and contact you regarding the next step.", download: "Download a copy", home: "Back to website", newBrief: "New brief", briefId: "Brief ID",
      errorEyebrow: "Submission failed", errorTitle: "Your information is still saved.", errorText: "We could not connect to the delivery service. Try again or download the brief and send it to us.", retry: "Try again", contact: "Contact Chavana",
      yes: "Yes", no: "No", choose: "Choose an option", other: "Other", noAnswer: "—"
    }
  };

  const bi = (en, fa) => ({ en, fa });
  const opt = (...items) => items.map(([en, fa, value]) => ({ label: bi(en, fa), value: value || en }));
  const yesNo = opt(["Yes", "بله", "yes"], ["No", "خیر", "no"]);
  const field = (name, en, fa, type = "text", extra = {}) => ({ name, label: bi(en, fa), type, ...extra });

  const sections = [
    { id: "client", title: bi("CLIENT", "اطلاعات کارفرما"), description: bi("Who should we speak with about this project?", "برای این پروژه با چه کسی در ارتباط باشیم؟"), fields: [
      field("brand", "Brand / Company Name", "نام برند / شرکت", "text", { required: true, autocomplete: "organization" }),
      field("contactPerson", "Contact Person", "شخص رابط", "text", { required: true, autocomplete: "name" }),
      field("role", "Position / Role", "سمت / نقش"), field("email", "Email", "ایمیل", "email", { autocomplete: "email" }),
      field("phone", "Phone", "تلفن", "tel", { autocomplete: "tel" }), field("messenger", "Telegram / WhatsApp", "تلگرام / واتساپ"),
      field("websiteUrl", "Website", "وب‌سایت", "url"), field("socialUrl", "Instagram / Social URL", "اینستاگرام / شبکه اجتماعی", "url"),
      field("industry", "Industry", "حوزه فعالیت"), field("location", "Country / City", "کشور / شهر")
    ]},
    { id: "project", title: bi("PROJECT", "مشخصات پروژه"), description: bi("Define the scope and context in your own words.", "محدوده و زمینه پروژه را با زبان خودتان تعریف کنید."), fields: [
      field("projectName", "Project Name", "نام پروژه", "text", { required: true }),
      field("projectType", "Project Type", "نوع پروژه", "select", { required: true, options: opt(["AI Commercial Production","تولید تبلیغ با هوش مصنوعی"],["Campaign Visual System","سیستم بصری کمپین"],["Product Film","فیلم محصول"],["Social Media Content","محتوای شبکه‌های اجتماعی"],["Creative Concept Development","توسعه کانسپت خلاق"],["AI-Assisted Post Production","پس‌تولید با کمک هوش مصنوعی"],["Brand Film","فیلم برند"],["Music / Entertainment Visual","تصویرسازی موسیقی / سرگرمی"],["Other","سایر"]) }),
      field("projectSentence", "Describe the project in one sentence", "پروژه را در یک جمله توصیف کنید", "textarea", { wide: true }),
      field("createRequest", "What do you want us to create?", "می‌خواهید چه چیزی برایتان بسازیم؟", "textarea", { wide: true }),
      field("whyNow", "Why is this project being made now?", "چرا این پروژه اکنون ساخته می‌شود؟", "textarea", { wide: true }),
      field("campaignState", "Existing campaign or completely new project?", "کمپین موجود یا پروژه‌ای کاملاً جدید؟", "radio", { options: opt(["Existing campaign","کمپین موجود"],["Completely new","کاملاً جدید"],["Not sure yet","هنوز مشخص نیست"]) })
    ]},
    { id: "objective", title: bi("OBJECTIVE", "هدف پروژه"), description: bi("What business or communication outcome should the work create?", "این پروژه باید چه نتیجه‌ای برای کسب‌وکار یا ارتباطات برند ایجاد کند؟"), fields: [
      field("objectiveTags", "Objectives", "هدف‌ها", "chips", { wide: true, options: opt(["Brand Awareness","آگاهی از برند"],["Product Launch","معرفی محصول"],["Sales / Conversion","فروش / تبدیل"],["Social Engagement","تعامل اجتماعی"],["Brand Image","تصویر برند"],["Explain a Product","معرفی عملکرد محصول"],["Event / Campaign","رویداد / کمپین"],["Entertainment","سرگرمی"],["Experimental / Artistic","تجربی / هنری"],["Other","سایر"]) }),
      field("primaryObjective", "Primary project objective", "هدف اصلی پروژه", "textarea", { required: true, wide: true }),
      field("audienceResponse", "What should the audience think, feel or do after watching?", "مخاطب بعد از دیدن اثر باید چه فکر، احساس یا اقدامی داشته باشد؟", "textarea", { wide: true }),
      field("mainCta", "Main CTA", "دعوت به اقدام اصلی"), field("successDefinition", "What would make this project successful?", "چه چیزی این پروژه را موفق می‌کند؟", "textarea", { wide: true }), field("kpi", "Any measurable KPI or target?", "شاخص یا هدف قابل‌اندازه‌گیری", "textarea", { wide: true })
    ]},
    { id: "audience", title: bi("AUDIENCE", "مخاطب"), description: bi("Help us understand who the work must connect with.", "کمک کنید بدانیم اثر باید با چه کسانی ارتباط برقرار کند."), fields: [
      field("primaryAudience", "Primary Audience", "مخاطب اصلی", "textarea", { required: true, wide: true }), field("ageRange", "Age Range", "بازه سنی"), field("gender", "Gender, if relevant", "جنسیت، در صورت اهمیت"), field("market", "Country / Market", "کشور / بازار"),
      field("interests", "Interests / Lifestyle", "علایق / سبک زندگی", "textarea", { wide: true }), field("customerType", "Existing Customers or New Audience", "مشتریان فعلی یا مخاطبان جدید؟", "radio", { options: opt(["Existing customers","مشتریان فعلی"],["New audience","مخاطبان جدید"],["Both","هر دو"]) }),
      field("audienceDesire", "Main Audience Problem / Desire", "مسئله / خواسته اصلی مخاطب", "textarea", { wide: true }), field("secondaryAudience", "Secondary Audience", "مخاطب ثانویه"), field("culturalNotes", "Anything we should understand culturally?", "نکات فرهنگی مهم", "textarea", { wide: true })
    ]},
    { id: "message", title: bi("MESSAGE & TONE", "پیام و لحن"), description: bi("Clarify what must be said and how it should feel.", "مشخص کنید چه چیزی باید گفته شود و چه حسی داشته باشد."), fields: [
      field("mainMessage", "Main Message", "پیام اصلی", "textarea", { required: true, wide: true }), field("benefits", "Key Product / Brand Benefits", "مزیت‌های اصلی محصول / برند", "textarea", { wide: true }), field("mandatoryClaims", "Mandatory phrases or claims", "عبارت‌ها یا ادعاهای اجباری", "textarea", { wide: true }), field("forbiddenWords", "Words/messages that must NOT be used", "کلمات / پیام‌های ممنوع", "textarea", { wide: true }),
      field("tone", "Tone", "لحن", "chips", { wide: true, options: opt(["Premium","پریمیوم"],["Cinematic","سینمایی"],["Minimal","مینیمال"],["Bold","جسور"],["Emotional","احساسی"],["Luxury","لوکس"],["Energetic","پرانرژی"],["Futuristic","آینده‌نگر"],["Human","انسانی"],["Playful","بازیگوش"],["Serious","جدی"],["Documentary","مستند"],["Experimental","تجربی"]) }), field("toneOther", "Other tone", "لحن دیگر")
    ]},
    { id: "visual", title: bi("VISUAL DIRECTION", "جهت هنری"), description: bi("Share the visual world, references and boundaries you have in mind.", "دنیای بصری، رفرنس‌ها و مرزهای مورد نظرتان را توضیح دهید."), fields: [
      field("visualWorld", "Describe the visual world you imagine", "دنیای بصری مورد تصورتان را توصیف کنید", "textarea", { wide: true }), field("visualStyles", "Preferred visual styles", "سبک‌های بصری ترجیحی", "textarea", { wide: true }), field("preferredColors", "Preferred colors", "رنگ‌های ترجیحی"), field("brandColors", "Brand colors", "رنگ‌های برند"),
      field("mustVisual", "Must-have visual elements", "عناصر بصری ضروری", "textarea", { wide: true }), field("avoidVisual", "Elements / styles to avoid", "عناصر / سبک‌های ممنوع", "textarea", { wide: true }), field("competitors", "Competitors or similar brands", "رقبا یا برندهای مشابه", "textarea", { wide: true }), field("referenceCampaigns", "Reference campaigns", "کمپین‌های مرجع", "textarea", { wide: true }), field("referenceFilms", "Reference films / videos", "فیلم‌ها / ویدیوهای مرجع", "textarea", { wide: true }),
      field("visualDirections", "Visual direction", "جهت بصری", "chips", { wide: true, options: opt(["Cinematic","سینمایی"],["Clean","تمیز"],["Dark","تیره"],["Bright","روشن"],["Surreal","سوررئال"],["Realistic","واقع‌گرا"],["Editorial","ادیتوریال"],["Fashion","مد"],["Product-focused","محصول‌محور"],["Organic","ارگانیک"],["Tech","تکنولوژیک"],["Retro","رترو"],["Luxury","لوکس"],["Raw","خام"],["Minimal","مینیمال"]) }),
      field("references", "Pinterest / Instagram / Behance / Drive URLs", "لینک‌های پینترست / اینستاگرام / بیهنس / درایو", "references", { wide: true })
    ]},
    { id: "deliverables", title: bi("DELIVERABLES", "خروجی‌ها"), description: bi("Select every format and version the project needs.", "همه فرمت‌ها و نسخه‌های مورد نیاز پروژه را مشخص کنید."), fields: [
      field("deliverableTypes", "Deliverables", "خروجی‌ها", "chips", { wide: true, options: opt(["Hero Film","فیلم اصلی"],["Commercial","تبلیغ"],["Social Reel","ریل شبکه اجتماعی"],["Instagram Story","استوری اینستاگرام"],["TikTok / Short-form","تیک‌تاک / ویدیوی کوتاه"],["Product Film","فیلم محصول"],["Campaign Stills","تصاویر ثابت کمپین"],["Key Visual","کی‌ویژوال"],["Motion Graphics","موشن گرافیک"],["Teaser","تیزر"],["Cutdowns","نسخه‌های کوتاه"],["Other","سایر"]) }),
      field("deliverableCount", "Number of deliverables", "تعداد خروجی‌ها", "number"), field("mainDuration", "Main film duration", "مدت فیلم اصلی"), field("additionalDurations", "Additional durations", "مدت نسخه‌های دیگر"), field("platforms", "Platforms", "پلتفرم‌ها", "textarea", { wide: true }),
      field("aspectRatios", "Aspect Ratios", "نسبت تصویر", "chips", { wide: true, options: opt(["16:9","16:9"],["9:16","9:16"],["1:1","1:1"],["4:5","4:5"],["Other","سایر"]) }), field("resolution", "Resolution", "رزولوشن", "radio", { options: opt(["1080p","1080p"],["4K","4K"],["Other","سایر"]) }), field("languages", "Language(s)", "زبان‌ها"),
      field("subtitles", "Subtitles?", "زیرنویس؟", "radio", { options: yesNo }), field("subtitleDetails", "Subtitle languages / details", "زبان / جزئیات زیرنویس", "textarea", { wide: true, showWhen: ["subtitles", "yes"] }),
      field("voiceover", "Voice-over?", "نریشن؟", "radio", { options: yesNo }), field("voiceoverDetails", "Voice-over language, voice and style", "زبان، صدا و سبک نریشن", "textarea", { wide: true, showWhen: ["voiceover", "yes"] }),
      field("music", "Music?", "موسیقی؟", "radio", { options: yesNo }), field("musicDetails", "Music direction / licensing notes", "جهت موسیقی / نکات لایسنس", "textarea", { wide: true, showWhen: ["music", "yes"] }),
      field("soundDesign", "Sound Design?", "طراحی صدا؟", "radio", { options: yesNo }), field("soundDetails", "Sound design notes", "توضیحات طراحی صدا", "textarea", { wide: true, showWhen: ["soundDesign", "yes"] }),
      field("onscreenType", "On-screen typography?", "تایپوگرافی روی تصویر؟", "radio", { options: yesNo }), field("typeDetails", "Typography / copy details", "جزئیات تایپوگرافی / متن", "textarea", { wide: true, showWhen: ["onscreenType", "yes"] }),
      field("platformVersions", "Master + platform-specific versions?", "نسخه مستر + نسخه‌های مخصوص پلتفرم؟", "radio", { options: yesNo }), field("technicalRequirements", "Technical delivery requirements", "الزامات فنی تحویل", "textarea", { wide: true })
    ]},
    { id: "production", title: bi("PRODUCTION", "جزئیات تولید"), description: bi("Flag the details that must remain exact throughout production.", "جزئیاتی را مشخص کنید که در تمام تولید باید دقیق و ثابت بمانند."), fields: [
      field("realPerson", "Does the project feature a real person?", "آیا پروژه شامل فرد واقعی است؟", "radio", { options: yesNo }), field("personDetails", "Who, and how will they appear?", "چه کسی و به چه شکل حضور دارد؟", "textarea", { wide: true, showWhen: ["realPerson", "yes"] }),
      field("identityConsistency", "Must facial identity remain consistent?", "آیا هویت / چهره باید کاملاً ثابت بماند؟", "radio", { options: yesNo }), field("identityDetails", "Identity consistency requirements", "الزامات ثبات هویت", "textarea", { wide: true, showWhen: ["identityConsistency", "yes"] }),
      field("productAccuracy", "Product accuracy requirements", "الزامات دقت محصول", "textarea", { wide: true }), field("packagingAccuracy", "Packaging / logo accuracy requirements", "الزامات دقت بسته‌بندی / لوگو", "textarea", { wide: true }), field("locations", "Required locations / environments", "لوکیشن‌ها / محیط‌های ضروری", "textarea", { wide: true }), field("existingFootage", "Existing footage to integrate?", "فوتیج موجود برای ترکیب؟", "radio", { options: yesNo }), field("existingFootageDetails", "Footage details / link", "جزئیات / لینک فوتیج", "textarea", { wide: true, showWhen: ["existingFootage", "yes"] }),
      field("productionMode", "Production approach", "روش تولید", "radio", { options: opt(["AI-generated only","فقط تولید با هوش مصنوعی"],["Live-action only","فقط لایو اکشن"],["Hybrid","ترکیبی"],["Open to recommendation","نیازمند پیشنهاد چاوانا"]) }), field("characterConsistency", "Character consistency requirements", "الزامات ثبات کاراکتر", "textarea", { wide: true }), field("productAngles", "Required product angles", "زوایای ضروری محصول", "textarea", { wide: true }), field("legalVisuals", "Legally sensitive / restricted visual elements", "عناصر بصری حساس / محدود از نظر حقوقی", "textarea", { wide: true }), field("aiMustNotChange", "Anything AI must NOT change?", "هوش مصنوعی چه چیزی را نباید تغییر دهد؟", "textarea", { wide: true })
    ]},
    { id: "assets", title: bi("BRAND ASSETS", "فایل‌ها و دارایی‌ها"), description: bi("Tell us what already exists and where we can access it.", "مشخص کنید چه دارایی‌هایی موجود است و از کجا به آن‌ها دسترسی داریم."), fields: [
      field("availableAssets", "Available assets", "دارایی‌های موجود", "chips", { wide: true, options: opt(["Logo","لوگو"],["Brand Guidelines","راهنمای برند"],["Product Photos","عکس محصول"],["Product Packaging","بسته‌بندی محصول"],["Fonts","فونت‌ها"],["Brand Copy","متن برند"],["Existing Campaign Assets","دارایی‌های کمپین موجود"],["Video Footage","فوتیج ویدیویی"],["3D Assets","فایل‌های سه‌بعدی"]) }), field("assetLinks", "Google Drive / Dropbox / WeTransfer links", "لینک گوگل درایو / دراپ‌باکس / وی‌ترنسفر", "textarea", { wide: true }), field("assetNotes", "Asset access notes / passwords", "توضیحات دسترسی / رمزها", "textarea", { wide: true })
    ]},
    { id: "timeline", title: bi("TIMELINE & BUDGET", "زمان‌بندی و بودجه"), description: bi("Share the practical boundaries for scheduling and scope.", "محدودیت‌های اجرایی زمان‌بندی و محدوده پروژه را مشخص کنید."), fields: [
      field("startDate", "Desired Start Date", "تاریخ شروع مطلوب", "date"), field("reviewDate", "First Review Date", "تاریخ اولین بازبینی", "date"), field("deadline", "Final Deadline", "ددلاین نهایی", "date", { required: true }), field("fixedDeadline", "Is the deadline fixed?", "آیا ددلاین قطعی است؟", "radio", { options: yesNo }), field("deadlineReason", "Reason for deadline", "دلیل ددلاین", "textarea", { wide: true, showWhen: ["fixedDeadline", "yes"] }),
      field("budgetRange", "Budget Range", "محدوده بودجه", "select", { options: opt(["Prefer to discuss","ترجیح می‌دهم گفتگو کنیم"],["Under 1,000","کمتر از ۱٬۰۰۰"],["1,000–3,000","۱٬۰۰۰ تا ۳٬۰۰۰"],["3,000–7,500","۳٬۰۰۰ تا ۷٬۵۰۰"],["7,500–15,000","۷٬۵۰۰ تا ۱۵٬۰۰۰"],["15,000+","بیش از ۱۵٬۰۰۰"]) }), field("currency", "Currency", "واحد پول", "select", { options: opt(["USD","دلار آمریکا"],["EUR","یورو"],["GBP","پوند"],["AED","درهم"],["IRR / Toman","ریال / تومان"],["Other","سایر"]) }), field("budgetFlexibility", "Is the budget fixed or flexible?", "بودجه قطعی است یا انعطاف‌پذیر؟", "radio", { options: opt(["Fixed","قطعی"],["Flexible","انعطاف‌پذیر"],["Open to scope options","وابسته به محدوده پیشنهادی"]) })
    ]},
    { id: "approval", title: bi("APPROVAL", "تأیید و بازخورد"), description: bi("Map the decision and feedback process.", "فرآیند تصمیم‌گیری و بازخورد را مشخص کنید."), fields: [
      field("decisionMaker", "Main decision maker", "تصمیم‌گیرنده اصلی"), field("finalApprover", "Who gives final approval?", "تأیید نهایی با چه کسی است؟"), field("stakeholders", "Number of stakeholders", "تعداد افراد درگیر", "number"), field("communication", "Preferred communication channel", "روش ارتباط ترجیحی", "select", { options: opt(["Telegram","تلگرام"],["WhatsApp","واتساپ"],["Email","ایمیل"],["Video call","تماس ویدیویی"],["Other","سایر"]) }), field("revisionRounds", "Expected revision rounds", "تعداد دور بازبینی مورد انتظار", "number"), field("feedbackSpeed", "How quickly can feedback normally be provided?", "بازخورد معمولاً در چه مدت ارائه می‌شود؟"), field("internalApproval", "Any internal legal / brand approval required?", "آیا تأیید داخلی حقوقی / برند لازم است؟", "textarea", { wide: true })
    ]},
    { id: "usage", title: bi("USAGE", "نحوه استفاده"), description: bi("For information gathering only; this is not legal advice.", "فقط برای جمع‌آوری اطلاعات است و مشاوره حقوقی محسوب نمی‌شود."), fields: [
      field("usageChannels", "Where will the final work be used?", "اثر نهایی کجا استفاده می‌شود؟", "chips", { wide: true, options: opt(["Organic Social","شبکه اجتماعی ارگانیک"],["Paid Advertising","تبلیغات پولی"],["Website","وب‌سایت"],["Television","تلویزیون"],["Cinema","سینما"],["Outdoor / DOOH","تبلیغات محیطی / DOOH"],["Events","رویدادها"],["Internal","استفاده داخلی"],["Other","سایر"]) }), field("territory", "Territory / countries", "محدوده جغرافیایی / کشورها"), field("usageDuration", "Usage duration", "مدت استفاده"), field("paidMedia", "Paid media involved?", "آیا رسانه پولی درگیر است؟", "radio", { options: yesNo }), field("exclusivity", "Exclusivity requirements", "الزامات انحصار", "textarea", { wide: true }), field("rights", "Specific rights / licensing requirements", "الزامات حقوق / لایسنس", "textarea", { wide: true })
    ]},
    { id: "notes", title: bi("FINAL NOTES", "توضیحات نهایی"), description: bi("One last space for context we have not asked about.", "فضایی برای هر نکته‌ای که در سؤال‌ها به آن نپرداخته‌ایم."), fields: [
      field("finalNotes", "Tell us anything else we should know before starting the project.", "هر چیزی که فکر می‌کنید قبل از شروع پروژه باید بدانیم اینجا بنویسید.", "textarea", { wide: true, large: true })
    ]}
  ];

  const state = { lang: localStorage.getItem(LANG_KEY) || "fa", answers: {}, briefId: "", submittedAt: "", submitting: false };
  try { state.answers = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}") || {}; } catch { state.answers = {}; }

  const app = $("#brief");
  if (!app) return;
  const form = $("#brief-form");
  const sectionRoot = $("#brief-sections");
  let saveTimer;

  function t(key) { return copy[state.lang][key]; }
  function label(value) { return value[state.lang]; }
  function escapeHtml(value) { return String(value ?? "").replace(/[&<>'\"]/g, char => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", "\"": "&quot;" }[char])); }
  function isFilled(value) { return Array.isArray(value) ? value.length > 0 : String(value ?? "").trim().length > 0; }

  function inputMarkup(item) {
    const value = state.answers[item.name] ?? (item.type === "chips" || item.type === "references" ? [] : "");
    const common = `id="brief-${item.name}" name="${item.name}" ${item.required ? "aria-required=\"true\"" : ""}`;
    if (item.type === "textarea") return `<textarea ${common} rows="${item.large ? 8 : 4}">${escapeHtml(value)}</textarea>`;
    if (item.type === "select") return `<select ${common}><option value="">${t("choose")}</option>${item.options.map(o => `<option value="${escapeHtml(o.value)}" ${value === o.value ? "selected" : ""}>${escapeHtml(label(o.label))}</option>`).join("")}</select>`;
    if (item.type === "radio") return `<div class="brief-choice-row" role="radiogroup">${item.options.map(o => `<label class="brief-choice"><input type="radio" name="${item.name}" value="${escapeHtml(o.value)}" ${value === o.value ? "checked" : ""}><span>${escapeHtml(label(o.label))}</span></label>`).join("")}</div>`;
    if (item.type === "chips") return `<div class="brief-chip-grid">${item.options.map(o => `<label class="brief-chip"><input type="checkbox" name="${item.name}" value="${escapeHtml(o.value)}" ${value.includes(o.value) ? "checked" : ""}><span>${escapeHtml(label(o.label))}</span></label>`).join("")}</div>`;
    if (item.type === "references") {
      const refs = value.length ? value : [""];
      return `<div class="brief-reference-list" data-reference-list>${refs.map((url, i) => `<div class="brief-reference-row"><input type="url" name="${item.name}-${i}" value="${escapeHtml(url)}" inputmode="url" placeholder="https://"><button type="button" data-remove-reference aria-label="Remove reference">×</button></div>`).join("")}</div><button class="brief-add-reference" type="button" data-add-reference>${t("addReference")}</button>`;
    }
    return `<input ${common} type="${item.type}" value="${escapeHtml(value)}" ${item.autocomplete ? `autocomplete="${item.autocomplete}"` : ""}>`;
  }

  function renderSections() {
    sectionRoot.innerHTML = sections.map((section, index) => `<section class="brief-card" id="brief-section-${section.id}">
      <div class="brief-card-head"><span>${String(index + 1).padStart(2, "0")}</span><div><h2>${escapeHtml(label(section.title))}</h2><p>${escapeHtml(label(section.description))}</p></div></div>
      <div class="brief-field-grid">${section.fields.map(item => `<div class="brief-field ${item.wide ? "brief-field-wide" : ""} ${item.showWhen ? "brief-conditional" : ""}" data-field="${item.name}" ${item.showWhen ? `data-show-name="${item.showWhen[0]}" data-show-value="${item.showWhen[1]}"` : ""}>
        <label class="brief-label" ${!["radio","chips","references"].includes(item.type) ? `for="brief-${item.name}"` : ""}>${escapeHtml(label(item.label))}${item.required ? " <b>*</b>" : ""}</label>
        ${inputMarkup(item)}<p class="brief-inline-error" id="error-${item.name}" hidden></p>
      </div>`).join("")}</div>
    </section>`).join("");
    updateConditionals();
  }

  function syncAnswersFromForm() {
    sections.flatMap(s => s.fields).forEach(item => {
      if (item.type === "chips") state.answers[item.name] = $$(`input[name="${item.name}"]:checked`, form).map(el => el.value);
      else if (item.type === "radio") state.answers[item.name] = $(`input[name="${item.name}"]:checked`, form)?.value || "";
      else if (item.type === "references") state.answers[item.name] = $$(`[name^="${item.name}-"]`, form).map(el => el.value.trim()).filter(Boolean);
      else state.answers[item.name] = $(`[name="${item.name}"]`, form)?.value ?? "";
    });
    state.answers.website = $(`[name="website"]`, form)?.value || "";
  }

  function saveDraft(showToast = false) {
    syncAnswersFromForm();
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state.answers));
    if (showToast) toast(t("saved"));
    updateProgress();
  }

  function scheduleSave() { clearTimeout(saveTimer); saveTimer = setTimeout(() => saveDraft(true), 650); }
  function toast(message) { const el = $("#brief-toast"); el.textContent = message; el.classList.add("is-visible"); clearTimeout(el._timer); el._timer = setTimeout(() => el.classList.remove("is-visible"), 1800); }

  function updateConditionals() {
    $$(".brief-conditional", form).forEach(el => {
      const visible = String(state.answers[el.dataset.showName] || "") === el.dataset.showValue;
      el.hidden = !visible;
      if (!visible) {
        const key = el.dataset.field;
        state.answers[key] = "";
        $$('input, textarea, select', el).forEach(input => { if (input.type === "radio" || input.type === "checkbox") input.checked = false; else input.value = ""; });
      }
    });
  }

  function updateProgress() {
    const all = sections.flatMap(s => s.fields).filter(f => !f.showWhen || state.answers[f.showWhen[0]] === f.showWhen[1]);
    const score = all.reduce((sum, f) => sum + (isFilled(state.answers[f.name]) ? 1 : 0), 0);
    const percent = Math.round((score / all.length) * 100);
    $("#brief-progress-label").textContent = t("progress").replace("{n}", state.lang === "fa" ? percent.toLocaleString("fa-IR") : percent);
    $("#brief-progress-bar").style.width = `${percent}%`;
  }

  function setLanguage(lang) {
    if (sectionRoot.childElementCount) syncAnswersFromForm();
    state.lang = lang;
    localStorage.setItem(LANG_KEY, lang);
    app.lang = lang; app.dir = lang === "fa" ? "rtl" : "ltr";
    $("#brief-lang").textContent = t("langButton"); $("#brief-save").textContent = t("save");
    $("#brief-eyebrow").textContent = t("eyebrow"); $("#brief-title").innerHTML = t("title"); $("#brief-intro").textContent = t("intro"); $("#brief-time").textContent = t("time"); $("#brief-required-note").textContent = t("requiredNote");
    $("#brief-review-button").firstChild.textContent = `${t("reviewButton")} `; $("#brief-clear").textContent = t("clear");
    $("#review-eyebrow").textContent = t("reviewEyebrow"); $("#review-title").textContent = t("reviewTitle"); $("#review-intro").textContent = t("reviewIntro"); $("#brief-confirm-text").textContent = t("confirm"); $("#brief-back").textContent = t("back"); $("#brief-submit").textContent = t("submit");
    $("#success-eyebrow").textContent = t("successEyebrow"); $("#success-title").textContent = t("successTitle"); $("#success-text").textContent = t("successText"); $("#success-download").textContent = t("download"); $("#success-home").textContent = t("home");
    $("#error-eyebrow").textContent = t("errorEyebrow"); $("#error-title").textContent = t("errorTitle"); $("#error-text").textContent = t("errorText"); $("#brief-retry").textContent = t("retry"); $("#error-download").textContent = t("download"); $("#brief-contact").textContent = t("contact");
    renderSections(); updateProgress();
  }

  function clearErrors() { $$(".brief-inline-error", form).forEach(el => { el.hidden = true; el.textContent = ""; }); $$(".has-error", form).forEach(el => el.classList.remove("has-error")); }
  function setError(name, message) { const wrap = $(`[data-field="${name}"]`, form); const error = $(`#error-${name}`, form); if (!wrap || !error) return; wrap.classList.add("has-error"); error.textContent = message; error.hidden = false; }

  function validate() {
    syncAnswersFromForm(); clearErrors();
    const errors = [];
    sections.flatMap(s => s.fields).forEach(item => { if (item.required && !isFilled(state.answers[item.name])) { errors.push(item.name); setError(item.name, t("required")); } });
    if (!["email", "phone", "messenger"].some(name => isFilled(state.answers[name]))) { errors.push("email"); setError("email", t("contactRequired")); }
    if (state.answers.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(state.answers.email)) { errors.push("email"); setError("email", t("invalidEmail")); }
    ["websiteUrl", "socialUrl"].forEach(name => { if (state.answers[name]) { try { new URL(state.answers[name]); } catch { errors.push(name); setError(name, t("invalidUrl")); } } });
    if (errors.length) {
      const first = $(`[data-field="${errors[0]}"]`, form); first?.scrollIntoView({ behavior: "smooth", block: "center" }); first?.querySelector("input,textarea,select")?.focus({ preventScroll: true }); toast(t("validationTitle")); return false;
    }
    return true;
  }

  function displayValue(item, value) {
    if (Array.isArray(value)) return value.map(v => item.options?.find(o => o.value === v)?.label?.[state.lang] || v).join("، ");
    return item.options?.find(o => o.value === value)?.label?.[state.lang] || value;
  }

  function renderReview() {
    syncAnswersFromForm();
    $("#brief-review-content").innerHTML = sections.map((section, index) => {
      const rows = section.fields.filter(item => isFilled(state.answers[item.name])).map(item => `<div class="brief-review-row"><dt>${escapeHtml(label(item.label))}</dt><dd>${escapeHtml(displayValue(item, state.answers[item.name])).replace(/\n/g, "<br>")}</dd></div>`).join("");
      return `<section class="brief-review-card"><div class="brief-review-head"><span>${String(index + 1).padStart(2, "0")}</span><h3>${escapeHtml(label(section.title))}</h3><button type="button" data-edit-section="${section.id}">${t("edit")}</button></div><dl>${rows || `<p class="brief-empty">${t("emptySection")}</p>`}</dl></section>`;
    }).join("");
    showView("review"); window.scrollTo(0, 0);
  }

  function showView(view) {
    $("#brief-form-view").hidden = view !== "form";
    $("#brief-review-view").hidden = view !== "review";
    $("#brief-success-view").hidden = view !== "success";
    $("#brief-error-view").hidden = view !== "error";
  }

  function generateId() {
    const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
    const random = Array.from(crypto.getRandomValues(new Uint8Array(5)), n => chars[n % chars.length]).join("");
    return `CHV-${String(new Date().getFullYear()).slice(-2)}-${random}`;
  }

  function briefText() {
    if (!state.briefId) state.briefId = generateId();
    if (!state.submittedAt) state.submittedAt = new Date().toISOString();
    const line = "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━";
    const body = sections.map((section, index) => {
      const rows = section.fields.filter(item => isFilled(state.answers[item.name])).map(item => `${item.label.en} / ${item.label.fa}:\n${Array.isArray(state.answers[item.name]) ? state.answers[item.name].join(", ") : state.answers[item.name]}`).join("\n\n");
      return rows ? `${line}\n${String(index + 1).padStart(2, "0")} — ${section.title.en} / ${section.title.fa}\n${line}\n${rows}` : "";
    }).filter(Boolean).join("\n\n");
    return `CHAVANA STUDIO\nPROJECT BRIEF\n\nBRIEF ID: ${state.briefId}\nSUBMITTED: ${new Date(state.submittedAt).toLocaleString("en-GB")}\nLANGUAGE: ${state.lang.toUpperCase()}\nBRAND: ${state.answers.brand || "—"}\nPROJECT: ${state.answers.projectName || "—"}\n\n${body}\n\n${line}\nCHAVANA STUDIO — PROJECT INTAKE\nBrief ID: ${state.briefId}\n${line}\n`;
  }

  function filename() {
    const brand = (state.answers.brand || "Brand").replace(/[^\p{L}\p{N}_-]+/gu, "-").slice(0, 40);
    return `Chavana-Brief_${brand}_${new Date().toISOString().slice(0, 10)}_${state.briefId || generateId()}.txt`;
  }

  function downloadBrief() {
    syncAnswersFromForm(); const text = briefText(); const url = URL.createObjectURL(new Blob(["\uFEFF", text], { type: "text/plain;charset=utf-8" })); const a = document.createElement("a"); a.href = url; a.download = filename(); a.click(); setTimeout(() => URL.revokeObjectURL(url), 1000);
  }

  async function submitBrief() {
    if (state.submitting) return;
    if (!$("#brief-confirm").checked) { $("#brief-confirm-error").textContent = t("confirmError"); $("#brief-confirm-error").hidden = false; $("#brief-confirm").focus(); return; }
    $("#brief-confirm-error").hidden = true; state.submitting = true; $("#brief-submit").disabled = true; $("#brief-submit").textContent = t("submitting");
    if (!state.briefId) state.briefId = generateId(); state.submittedAt = new Date().toISOString(); saveDraft(false);
    try {
      const response = await fetch("/api/submit-brief", { method: "POST", headers: { "Content-Type": "application/json", "Accept": "application/json" }, body: JSON.stringify({ briefId: state.briefId, language: state.lang, answers: state.answers, honeypot: state.answers.website || "", clientTimestamp: state.submittedAt }) });
      const result = await response.json().catch(() => ({}));
      if (!response.ok || !result.success) throw new Error("Delivery was not confirmed");
      state.briefId = result.briefId || state.briefId; $("#success-id").textContent = `${t("briefId")}: ${state.briefId}`; localStorage.removeItem(STORAGE_KEY); showView("success");
    } catch { showView("error"); }
    finally { state.submitting = false; $("#brief-submit").disabled = false; $("#brief-submit").textContent = t("submit"); window.scrollTo(0, 0); }
  }

  function openBrief() { document.body.classList.add("brief-open"); app.setAttribute("aria-hidden", "false"); if (location.hash !== "#brief") history.pushState(null, "", "#brief"); setTimeout(() => $("#brief-title").focus?.(), 0); }
  function closeBrief(event) { event?.preventDefault(); document.body.classList.remove("brief-open"); app.setAttribute("aria-hidden", "true"); showView("form"); if (location.hash === "#brief") history.replaceState(null, "", `${location.pathname}${location.search}#top`); }

  document.addEventListener("click", event => { const opener = event.target.closest('a[href="#brief"]'); if (opener) { event.preventDefault(); openBrief(); } });
  $$('[data-brief-close]').forEach(button => button.addEventListener("click", closeBrief));
  $("#brief-lang").addEventListener("click", () => setLanguage(state.lang === "fa" ? "en" : "fa"));
  $("#brief-save").addEventListener("click", () => saveDraft(true));
  form.addEventListener("input", () => { syncAnswersFromForm(); updateConditionals(); updateProgress(); scheduleSave(); });
  form.addEventListener("change", () => { syncAnswersFromForm(); updateConditionals(); updateProgress(); scheduleSave(); });
  form.addEventListener("submit", event => { event.preventDefault(); if (validate()) renderReview(); });
  sectionRoot.addEventListener("click", event => {
    const add = event.target.closest("[data-add-reference]"); const remove = event.target.closest("[data-remove-reference]");
    if (add) { syncAnswersFromForm(); state.answers.references = [...(state.answers.references || []), ""]; renderSections(); const inputs = $$('[name^="references-"]', form); inputs.at(-1)?.focus(); }
    if (remove) { const row = remove.closest(".brief-reference-row"); const index = $$(".brief-reference-row", row.parentElement).indexOf(row); syncAnswersFromForm(); state.answers.references.splice(index, 1); renderSections(); saveDraft(false); }
  });
  $("#brief-clear").addEventListener("click", () => { if (!confirm(t("clearConfirm"))) return; state.answers = {}; state.briefId = ""; localStorage.removeItem(STORAGE_KEY); renderSections(); updateProgress(); });
  $("#brief-back").addEventListener("click", () => { showView("form"); window.scrollTo(0, 0); });
  $("#brief-review-content").addEventListener("click", event => { const button = event.target.closest("[data-edit-section]"); if (!button) return; showView("form"); setTimeout(() => $(`#brief-section-${button.dataset.editSection}`)?.scrollIntoView({ behavior: "smooth", block: "start" }), 20); });
  $("#brief-submit").addEventListener("click", submitBrief); $("#brief-retry").addEventListener("click", () => { showView("review"); submitBrief(); });
  $$('[data-brief-download]').forEach(button => button.addEventListener("click", downloadBrief));
  window.addEventListener("hashchange", () => { if (location.hash === "#brief") openBrief(); else if (document.body.classList.contains("brief-open")) closeBrief(); });
  document.addEventListener("keydown", event => { if (event.key === "Escape" && document.body.classList.contains("brief-open") && !state.submitting) closeBrief(); });

  setLanguage(state.lang);
  if (location.hash === "#brief") openBrief();
})();
