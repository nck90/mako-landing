import React, { useEffect, useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import ArrowRight from "lucide-react/dist/esm/icons/arrow-right.mjs";
import BadgeCheck from "lucide-react/dist/esm/icons/badge-check.mjs";
import BarChart3 from "lucide-react/dist/esm/icons/chart-bar.mjs";
import CalendarDays from "lucide-react/dist/esm/icons/calendar-days.mjs";
import Check from "lucide-react/dist/esm/icons/check.mjs";
import ChevronDown from "lucide-react/dist/esm/icons/chevron-down.mjs";
import FileCheck2 from "lucide-react/dist/esm/icons/file-check-2.mjs";
import FolderSearch from "lucide-react/dist/esm/icons/folder-search.mjs";
import Gift from "lucide-react/dist/esm/icons/gift.mjs";
import Languages from "lucide-react/dist/esm/icons/languages.mjs";
import Menu from "lucide-react/dist/esm/icons/menu.mjs";
import MessageSquareText from "lucide-react/dist/esm/icons/message-square-text.mjs";
import Moon from "lucide-react/dist/esm/icons/moon.mjs";
import MousePointer2 from "lucide-react/dist/esm/icons/mouse-pointer-2.mjs";
import Send from "lucide-react/dist/esm/icons/send.mjs";
import ShieldCheck from "lucide-react/dist/esm/icons/shield-check.mjs";
import Sparkles from "lucide-react/dist/esm/icons/sparkles.mjs";
import Sun from "lucide-react/dist/esm/icons/sun.mjs";
import Users from "lucide-react/dist/esm/icons/users.mjs";
import Wand2 from "lucide-react/dist/esm/icons/wand-sparkles.mjs";
import X from "lucide-react/dist/esm/icons/x.mjs";
import "./landing.css";

const screen = (name) => `${import.meta.env.BASE_URL}cardops-screen-${name}.webp`;
const eventAsset = (name) => `${import.meta.env.BASE_URL}events/${name}`;
const betaEvent = {
  popupImage: eventAsset("mako-beta-popup.png"),
  detailImage: eventAsset("mako-beta-detail.png"),
  deadline: "2026년 6월 5일",
};
const olidiaCardNews = [1, 2, 3, 4, 5].map((number) => ({
  number,
  src: `${import.meta.env.BASE_URL}olidia-cardnews-0${number}.png`,
}));

const initialForm = {
  interestPlan: "beta-workspace",
  company: "",
  website: "",
  name: "",
  role: "",
  email: "",
  phone: "",
  teamSize: "",
  monthlyVolume: "",
  channels: "",
  problem: "",
  timeline: "",
  budget: "",
  memo: "",
  consent: false,
};

const copy = {
  ko: {
    nav: { reviews: "Reviews", features: "Features", pricing: "Beta", faq: "FAQ", contact: "Contact", cta: "Take a look" },
    heroKicker: "AI Marketing All-in-One Tool",
    heroPrefix: "SNS 마케팅,",
    heroMid: "10분 만에 끝납니다.",
    lead: "마케터와 대행사를 위한 SNS 운영 자동화 도구. 업로드된 게시물 반응을 학습하고, 캠페인 주기에 맞춰 콘텐츠 추천·생성·자동 발행까지 한 흐름으로 운영합니다.",
    trusted: "검토 기반 베타 온보딩 중",
    look: "Take a look",
    reviewsTitle: "User Reviews",
    featuresTitle: "Features",
    featuresLead: "SNS 계정 반응 학습, 캠페인 캘린더, 콘텐츠 생성과 자동 발행을 한 흐름으로 연결합니다.",
    betaTitle: "Beta Access",
    betaLead: "카드뉴스와 블로그만 보는 체험이 아니라, SNS 계정 반응 분석, 바이럴 방향 학습, 주간·월간 캠페인 생성과 자동 발행 흐름까지 함께 엽니다.",
    faqTitle: "FAQ",
    formTitle: "베타 신청",
    formLead: "접수 즉시 대기번호가 발급되고, 검토된 팀에게 온보딩 가능 여부를 안내합니다.",
    submit: "베타 신청 제출",
  },
  en: {
    nav: { reviews: "Reviews", features: "Features", pricing: "Beta", faq: "FAQ", contact: "Contact", cta: "Take a look" },
    heroKicker: "AI Marketing All-in-One Tool",
    heroPrefix: "SNS marketing,",
    heroMid: "finished in 10 minutes.",
    lead: "SNS operations automation for marketers and agencies. MAKO learns from uploaded post performance, recommends viral directions, generates campaign content, and schedules publishing in one flow.",
    trusted: "Closed beta onboarding",
    look: "Take a look",
    reviewsTitle: "User Reviews",
    featuresTitle: "Features",
    featuresLead: "Everything a brand team needs to run content operations in one flow.",
    betaTitle: "Beta Access",
    betaLead: "Approved teams receive the full SNS operating flow: account performance learning, viral direction modeling, campaign generation, scheduling, publishing, and team controls.",
    faqTitle: "FAQ",
    formTitle: "Beta application",
    formLead: "Submit once, get a wait number, and receive an onboarding review after submission.",
    submit: "Submit beta application",
  },
};

const heroRotations = {
  ko: [
    "카드뉴스 미리 보기",
    "콘텐츠 초안 생성",
    "브랜드 톤 반영",
    "예약 게시 준비",
    "성과 반응 학습",
  ],
  en: [
    "generates card news",
    "drafts content",
    "keeps brand voice",
    "prepares scheduling",
    "learns performance signals",
  ],
};

const previewTabs = [
  {
    key: "workspace",
    icon: Wand2,
    label: "워크스페이스",
    title: "브랜드 자료에서 실행물까지 한 화면에서 진행",
    text: "제품 USP, 콘텐츠 흐름, 브랜드 톤을 정리하고 바로 카드뉴스/블로그/카페/스레드 실행으로 넘어갑니다.",
    image: screen("workspace"),
    metric: "5개 채널 실행물 준비",
    outputs: ["카드뉴스 5장", "블로그 초안", "카페/스레드 카피", "검수 리포트"],
  },
  {
    key: "reference",
    icon: FolderSearch,
    label: "자료 학습",
    title: "브랜드 자료를 생성 근거로 정리",
    text: "브로슈어, 후기, 제품 자료, 금칙 표현을 의미별 폴더로 정리하고 생성 근거로 사용합니다.",
    image: screen("references"),
    metric: "자료 42개 분류 완료",
    outputs: ["제품 USP", "고객 고민", "금칙 표현", "브랜드 톤"],
  },
  {
    key: "content",
    icon: CalendarDays,
    label: "콘텐츠 생성",
    title: "카드뉴스 미리 보기와 채널별 게시물을 바로 검수",
    text: "후킹, 문제 인식, 근거, 체크포인트, CTA 흐름으로 구성된 카드뉴스 미리 보기와 블로그·카페·스레드 카피를 함께 검수합니다.",
    image: screen("content"),
    metric: "카드뉴스 미리 보기 준비 완료",
    outputs: ["후킹", "문제 인식", "근거", "체크포인트", "CTA"],
  },
  {
    key: "sns",
    icon: Users,
    label: "SNS 계정 관리",
    title: "업로드된 게시물 반응을 학습해 다음 콘텐츠에 반영",
    text: "좋아요, 저장, 공유, 댓글 반응을 분석해 바이럴이 잘 된 후킹·소재·톤을 모델에 학습시키고 다음 추천과 생성 방향에 반영합니다.",
    image: screen("crm"),
    metric: "반응 학습 128개 게시물",
    outputs: ["후킹 패턴", "저장 유도", "공유 소재", "다음 추천"],
  },
  {
    key: "campaign",
    icon: ShieldCheck,
    label: "캠페인 자동 운영",
    title: "주간·월간 캠페인을 세팅하면 주기에 맞춰 생성·발행",
    text: "마케터가 월간 또는 주간 캠페인 목표와 채널을 잡으면, MAKO가 일정에 맞춰 콘텐츠를 만들고 승인 후 자동 발행까지 진행합니다.",
    image: screen("teams"),
    metric: "4주 캠페인 캘린더 준비",
    outputs: ["월간 목표", "주간 소재", "예약 발행", "반응 재학습"],
  },
];

const reviews = [
  {
    role: "brand lead",
    avatar: "BL",
    text: "레퍼런스, 카드뉴스, 검수 요청이 한 흐름으로 이어져 매주 반복하던 운영 시간이 줄었습니다.\n\n자료가 흩어져 있을 때는 생성 결과를 믿기 어려웠는데, 근거와 승인 상태가 같이 남아서 팀 리뷰가 빨라졌습니다.",
  },
  {
    role: "content ops",
    avatar: "OP",
    text: "생성 결과만 주는 도구가 아니라 제품 자료, 금칙 표현, 브랜드 톤이 같이 보입니다.\n\n카드뉴스, 블로그, 카페 글, 스레드까지 한 요청에서 이어지고 반응까지 다시 학습되는 점이 실제 운영에 맞습니다.",
  },
  {
    role: "growth marketer",
    avatar: "GM",
    text: "게시물 반응이 다음 생성 기준으로 돌아오는 구조라 운영자가 감으로만 판단하지 않아도 됩니다.\n\n저장·공유가 잘 나온 포맷을 학습해서 다음 주 콘텐츠 추천이 바로 달라지는 점이 실무에 맞습니다.",
  },
  {
    role: "agency PM",
    avatar: "PM",
    text: "브랜드별 자료가 섞이지 않고 검토 기반으로 열려서 고객사 온보딩에 맞습니다.\n\n시안 공유보다 운영 단계 전체를 보여줄 수 있어 출시 전 체크리스트로 쓰기 좋았습니다.",
  },
  {
    role: "clinic marketer",
    avatar: "CM",
    text: "제품 자료와 리뷰를 학습한 뒤 바로 카드뉴스 초안을 만들 수 있어 실무 흐름과 잘 맞습니다.\n\n과장 표현을 줄이고 상담형 톤으로 바꿔주는 부분이 특히 유용했습니다.",
  },
];

const featureModules = [
  { icon: Wand2, label: "Workspace", text: "브랜드 실행 흐름" },
  { icon: FolderSearch, label: "Reference", text: "브랜드 자료 학습" },
  { icon: MessageSquareText, label: "Voice", text: "보이스/금칙어 반영" },
  { icon: CalendarDays, label: "Content", text: "5장 카드뉴스/블로그/카페/스레드" },
  { icon: BarChart3, label: "SNS Learning", text: "게시물 반응 학습" },
  { icon: FileCheck2, label: "Campaign", text: "주간·월간 자동 운영" },
  { icon: ShieldCheck, label: "Team", text: "검토 기반 조직" },
  { icon: BadgeCheck, label: "Approval", text: "승인 상태 관리" },
];

const featureScreens = [
  { title: "브랜드 실행 워크스페이스", text: "대화형 요청, 기준 정리, 실행 CTA가 한 화면에 모입니다.", image: screen("workspace"), badge: "콘텐츠 패키지 생성 중" },
  { title: "자료 학습 보드", text: "파일과 리뷰를 넣으면 생성 근거로 쓸 수 있게 정리합니다.", image: screen("references"), badge: "42개 자료 분류" },
  { title: "카드뉴스 미리 보기", text: "각 카드가 후킹, 문제 인식, 근거, 체크포인트, CTA 역할로 다르게 구성됩니다.", image: screen("content"), badge: "미리 보기 준비" },
  { title: "SNS 계정 반응 학습", text: "업로드된 게시물의 저장, 공유, 댓글 반응을 분석해 바이럴이 잘 된 방향을 학습합니다.", image: screen("crm"), badge: "반응 128건 학습" },
  { title: "캠페인 자동 운영", text: "주간·월간 캠페인을 세팅하면 주기에 맞춰 콘텐츠를 추천, 생성, 예약 발행합니다.", image: screen("teams"), badge: "4주 캘린더 운영" },
];

const betaPlans = [
  {
    key: "beta-workspace",
    title: "베타 워크스페이스",
    badge: "제품 체험",
    summary: "승인된 팀에게 MAKO 웹 워크스페이스를 열고 SNS 계정 반응 학습, 콘텐츠 생성, 검수, 예약 발행 준비까지 제공합니다.",
    bestFor: "이미 콘텐츠 운영자가 있고, 직접 제품을 써보려는 팀",
    timeline: "승인 후 순차 안내",
    proof: "검토 후 스타터 브랜드",
    deliverables: ["브랜드 자료/이미지 학습", "5장 카드뉴스/블로그/카페/스레드 생성", "SNS 반응 기반 바이럴 학습", "발행 캘린더와 승인 상태"],
    cta: "베타 신청하기",
  },
  {
    key: "launch-consulting",
    title: "도입 컨설팅",
    badge: "런칭 지원",
    summary: "브랜드 자료와 기존 SNS 반응을 정리하고 첫 캠페인 구조, 생성 기준, 검수 흐름, 자동 발행 주기까지 함께 세팅합니다.",
    bestFor: "자료는 있는데 어떤 흐름으로 자동화할지 정리가 필요한 팀",
    timeline: "상담 후 1차 세팅",
    proof: "첫 캠페인 패키지 설계",
    featured: true,
    deliverables: ["브랜드 톤/금칙어 정리", "첫 5장 카드뉴스/블로그/카페 패키지", "SNS 반응 분석 리포트", "주간·월간 발행 캘린더"],
    cta: "컨설팅 신청하기",
  },
  {
    key: "custom-build",
    title: "맞춤 툴 제작",
    badge: "전용 제작",
    summary: "브랜드나 대행사 업무 방식에 맞춰 MAKO를 전용 마케팅 툴처럼 커스터마이징합니다.",
    bestFor: "고객사별 운영, 내부 승인, 전용 기능이 필요한 팀",
    timeline: "요구사항 검토 후 제안",
    proof: "브랜드 전용 워크플로우",
    deliverables: ["전용 화면/기능 구성", "자료 구조와 권한 설계", "채널별 승인/발행 워크플로우", "운영 리포트/내보내기"],
    cta: "제작 상담하기",
  },
];

const faqs = [
  ["어떤 팀이 베타에 적합한가요?", "반복적인 카드뉴스, 블로그, SNS 계정 운영, 캠페인 예약 발행을 한 흐름으로 관리해야 하는 브랜드팀과 에이전시에 적합합니다."],
  ["기존 자료를 업로드해야 하나요?", "네. 브로슈어, 제품 자료, 리뷰, 이미지, 금칙 표현이 많을수록 생성 근거와 브랜드 보이스가 명확해집니다."],
  ["가격은 어디서 확인하나요?", "현재 공개 가격표는 열지 않습니다. 베타 신청 후 도입 범위와 사용량을 확인해 별도로 안내합니다."],
  ["베타 신청 후 무엇을 받나요?", "신청서를 제출하면 대기번호가 발급되고, 운영자 검토 후 온보딩 가능 여부와 다음 안내를 이메일로 전달합니다."],
  ["계정과 자료는 조직별로 분리되나요?", "승인된 조직 기준으로 브랜드와 자료 접근을 분리하는 구조로 운영합니다."],
];

const isStaticDeploy = import.meta.env.VITE_STATIC_DEPLOY === "true";

function buildApplicationMailto(form) {
  const subject = `[MAKO 베타 신청] ${form.company || form.name || "신규 신청"}`;
  const lines = [
    `회사/브랜드: ${form.company}`,
    `웹사이트: ${form.website}`,
    `이름: ${form.name}`,
    `역할: ${form.role}`,
    `이메일: ${form.email}`,
    `전화번호: ${form.phone}`,
    `팀 규모: ${form.teamSize}`,
    `월 콘텐츠량: ${form.monthlyVolume}`,
    `주요 채널: ${form.channels}`,
    `도입 시점: ${form.timeline}`,
    `예산 범위: ${form.budget}`,
    "",
    "현재 콘텐츠 운영 문제:",
    form.problem,
    "",
    "추가 메모:",
    form.memo,
  ];
  return `mailto:contact@hyphen.it.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(lines.join("\n"))}`;
}

function track(eventType, metadata = {}) {
  if (isStaticDeploy) return Promise.resolve(null);
  return fetch("/api/public/beta-applications/events", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ eventType, path: window.location.pathname, metadata }),
  }).catch(() => null);
}

function Landing() {
  const [form, setForm] = useState(initialForm);
  const [notice, setNotice] = useState({ type: "", text: "" });
  const [submitting, setSubmitting] = useState(false);
  const [activeTab, setActiveTab] = useState("content");
  const [theme, setTheme] = useState(() => localStorage.getItem("cardops.landing.theme") || "light");
  const [lang, setLang] = useState(() => localStorage.getItem("cardops.landing.lang") || "ko");
  const [menuOpen, setMenuOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const [eventPopupOpen, setEventPopupOpen] = useState(window.location.pathname !== "/event");
  const [path, setPath] = useState(window.location.pathname);
  const [openFaq, setOpenFaq] = useState(faqs[0][0]);
  const [heroLineIndex, setHeroLineIndex] = useState(0);
  const t = copy[lang] || copy.ko;
  const heroLines = heroRotations[lang] || heroRotations.ko;
  const currentHeroLine = heroLines[heroLineIndex % heroLines.length];
  const activePreview = useMemo(() => previewTabs.find((tab) => tab.key === activeTab) || previewTabs[0], [activeTab]);

  useEffect(() => {
    track("view");
  }, []);

  useEffect(() => {
    const onPop = () => setPath(window.location.pathname);
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  useEffect(() => {
    if (!window.location.hash) return undefined;
    const id = window.location.hash.slice(1);
    const timer = window.setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ block: "start" });
    }, 80);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem("cardops.landing.theme", theme);
  }, [theme]);

  useEffect(() => {
    localStorage.setItem("cardops.landing.lang", lang);
  }, [lang]);

  useEffect(() => {
    setHeroLineIndex(0);
    const timer = window.setInterval(() => {
      setHeroLineIndex((value) => value + 1);
    }, 2200);
    return () => window.clearInterval(timer);
  }, [lang]);

  useEffect(() => {
    const nodes = Array.from(document.querySelectorAll(".reveal"));
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add("is-visible");
      });
    }, { threshold: 0.16, rootMargin: "0px 0px -8% 0px" });
    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  function update(field, value) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  function scrollToApply() {
    setContactOpen(false);
    if (path === "/event") {
      window.history.pushState({}, "", "/#apply");
      setPath("/");
      window.setTimeout(() => {
        document.getElementById("apply")?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 40);
      return;
    }
    document.getElementById("apply")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function selectPlan(planKey) {
    update("interestPlan", planKey);
    document.getElementById("apply")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function openEventDetail() {
    setEventPopupOpen(false);
    window.history.pushState({}, "", "/event");
    setPath("/event");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function closeEventDetail() {
    window.history.pushState({}, "", "/");
    setPath("/");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function submit(event) {
    event.preventDefault();
    setSubmitting(true);
    setNotice({ type: "", text: "" });
    try {
      if (isStaticDeploy) {
        window.location.href = buildApplicationMailto(form);
        setNotice({ type: "ok", text: "메일 작성 창을 열었습니다. 작성된 신청 내용을 확인한 뒤 발송해 주세요." });
        return;
      }
      const res = await fetch("/api/public/beta-applications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, path: window.location.pathname }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || "신청 접수에 실패했습니다.");
      setNotice({ type: "ok", text: `신청이 접수되었습니다. 대기번호: ${data.waitNumber}` });
      setForm(initialForm);
    } catch (error) {
      await track("error", { message: error.message || "submit_failed" });
      setNotice({ type: "error", text: error.message || "신청 접수에 실패했습니다." });
    } finally {
      setSubmitting(false);
    }
  }

  if (path === "/event") {
    return (
      <EventDetailPage
        onBack={closeEventDetail}
        onApply={scrollToApply}
      />
    );
  }

  return (
    <div className="landing-page">
      <header className="site-nav">
        <a className="brand-lockup" href="#hero" onClick={() => setMenuOpen(false)}>
          <strong>MAKO</strong>
          <small>AI Marketing All-in-One Tool</small>
        </a>
        <nav className={menuOpen ? "is-open" : ""} aria-label="랜딩 내비게이션">
          <a href="#reviews" onClick={() => setMenuOpen(false)}>{t.nav.reviews}</a>
          <a href="#features" onClick={() => setMenuOpen(false)}>{t.nav.features}</a>
          <a href="#pricing" onClick={() => setMenuOpen(false)}>{t.nav.pricing}</a>
          <a href="#faq" onClick={() => setMenuOpen(false)}>{t.nav.faq}</a>
          <button type="button" className="nav-text-button" onClick={() => { setContactOpen(true); setMenuOpen(false); }}>{t.nav.contact}</button>
          <button type="button" className="icon-button" aria-label="Change language" onClick={() => setLang(lang === "ko" ? "en" : "ko")}><Languages size={17} /></button>
          <button type="button" className="icon-button" aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"} onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
            {theme === "dark" ? <Sun size={17} /> : <Moon size={17} />}
          </button>
          <a className="nav-cta" href="#features">{t.nav.cta} <ArrowRight size={15} /></a>
        </nav>
        <button className="mobile-menu" type="button" aria-label="Toggle menu" onClick={() => setMenuOpen((value) => !value)}>
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </header>

      <main>
        <section className="hero-section" id="hero">
          <div className="hero-copy reveal is-visible">
            <p className="hero-kicker">{t.heroKicker}</p>
            <h1>
              <span>{t.heroPrefix}</span>
              <span>{t.heroMid}</span>
              <span className="hero-dynamic-line">
                <span>AI가</span>
                <span className="hero-rotator" key={currentHeroLine}>{currentHeroLine}</span>
              </span>
            </h1>
            <p className="hero-lead">{t.lead}</p>
            <div className="hero-actions">
              <a className="primary-action" href="#features">{t.look} <ArrowRight size={18} /></a>
              <div className="trust-stack" aria-label="베타 사용자 신뢰 지표">
                <span>CM</span><span>AD</span><span>OP</span><span>BR</span><span>MK</span>
                <em>{t.trusted}</em>
              </div>
            </div>
          </div>

          <div className="preview-tabs reveal is-visible" role="tablist" aria-label="제품 기능 탭">
            {previewTabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  type="button"
                  role="tab"
                  aria-selected={tab.key === activeTab}
                  className={tab.key === activeTab ? "is-active" : ""}
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                >
                  <Icon size={16} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          <ProductShowcase activePreview={activePreview} />
        </section>

        <section className="review-section" id="reviews">
          <Sparkles className="section-mark reveal" size={34} />
          <h2 className="reveal">{t.reviewsTitle}</h2>
          <div className="review-marquee-shell reveal" aria-label="사용자 리뷰">
            <div className="review-marquee">
              {[...reviews, ...reviews].map((review, index) => (
              <article key={`${review.role}-${index}`}>
                <div className="review-author">
                  <span>{review.avatar}</span>
                  <strong>{review.role}</strong>
                </div>
                <p>{review.text}</p>
                <a href="#apply">View full content</a>
              </article>
            ))}
            </div>
          </div>
        </section>

        <section className="features-section" id="features">
          <Sparkles className="section-mark reveal" size={34} />
          <h2 className="reveal">{t.featuresTitle}</h2>
          <p className="reveal">{t.featuresLead}</p>
          <div className="feature-icon-grid reveal">
            {featureModules.map((item) => {
              const Icon = item.icon;
              return (
                <article key={item.label}>
                  <Icon size={31} />
                  <strong>{item.label}</strong>
                  <span>{item.text}</span>
                </article>
              );
            })}
          </div>
          <div className="feature-screen-grid reveal" aria-label="실제 기능 화면">
            {featureScreens.map((item) => (
              <article key={item.title}>
                <div className="feature-shot">
                  <img src={item.image} alt={`${item.title} 실제 UI`} loading="lazy" decoding="async" />
                  <span>{item.badge}</span>
                </div>
                <div>
                  <strong>{item.title}</strong>
                  <p>{item.text}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="beta-access-section" id="pricing">
          <Sparkles className="section-mark reveal" size={34} />
          <h2 className="reveal">{t.betaTitle}</h2>
          <p className="reveal">{t.betaLead}</p>
          <div className="beta-plan-grid reveal">
            {betaPlans.map((plan, index) => (
              <article className={plan.featured ? "is-featured" : ""} key={plan.key} style={{ "--stagger": index }}>
                <div className="plan-card-head">
                  <span>{plan.badge}</span>
                  {plan.featured ? <em>Recommended</em> : null}
                </div>
                <h3>{plan.title}</h3>
                <p>{plan.summary}</p>
                <div className="plan-meta">
                  <span>추천 대상</span>
                  <strong>{plan.bestFor}</strong>
                </div>
                <div className="plan-proof">
                  <BadgeCheck size={18} />
                  <div>
                    <span>{plan.timeline}</span>
                    <strong>{plan.proof}</strong>
                  </div>
                </div>
                <button type="button" onClick={() => selectPlan(plan.key)}>{plan.cta}</button>
                <ul>
                  {plan.deliverables.map((item) => <li key={item}><Check size={15} />{item}</li>)}
                </ul>
              </article>
            ))}
          </div>
        </section>

        <section className="faq-section" id="faq">
          <Sparkles className="section-mark reveal" size={34} />
          <h2 className="reveal">{t.faqTitle}</h2>
          <div className="faq-list reveal">
            {faqs.map(([question, answer]) => {
              const open = openFaq === question;
              return (
                <article className={open ? "is-open" : ""} key={question}>
                  <button type="button" onClick={() => setOpenFaq(open ? "" : question)}>
                    <span>{question}</span>
                    <ChevronDown size={18} />
                  </button>
                  <p>{answer}</p>
                </article>
              );
            })}
          </div>
        </section>

        <section className="application-section" id="apply">
          <div className="form-copy reveal">
            <p className="eyebrow">Beta application</p>
            <h2>{t.formTitle}</h2>
            <p>{t.formLead}</p>
            <div className="review-flow">
              <span><MousePointer2 size={15} /> 신청 접수</span>
              <span><BadgeCheck size={15} /> 운영자 검토</span>
              <span><Send size={15} /> 온보딩 안내</span>
            </div>
          </div>
          <form className="beta-form reveal" onSubmit={submit}>
            {notice.text ? <p className={`form-notice ${notice.type}`}>{notice.text}</p> : null}
            <div className="plan-picker" role="radiogroup" aria-label="관심 플랜">
              {betaPlans.map((plan) => (
                <button
                  type="button"
                  role="radio"
                  aria-checked={form.interestPlan === plan.key}
                  className={form.interestPlan === plan.key ? "is-selected" : ""}
                  key={plan.key}
                  onClick={() => update("interestPlan", plan.key)}
                >
                  <span>{plan.badge}</span>
                  <strong>{plan.title}</strong>
                </button>
              ))}
            </div>
            <div className="form-grid">
              <Field name="company" label="회사/브랜드" value={form.company} onChange={(v) => update("company", v)} required />
              <Field name="website" label="웹사이트" value={form.website} onChange={(v) => update("website", v)} required placeholder="https://" />
              <Field name="name" label="이름" value={form.name} onChange={(v) => update("name", v)} required />
              <Field name="role" label="역할" value={form.role} onChange={(v) => update("role", v)} required placeholder="예: 브랜드 마케터" />
              <Field name="email" label="이메일" type="email" value={form.email} onChange={(v) => update("email", v)} required />
              <Field name="phone" label="전화번호" type="password" inputMode="tel" autoComplete="tel" value={form.phone} onChange={(v) => update("phone", v)} placeholder="010-****-1234" />
              <SelectField name="teamSize" label="팀 규모" value={form.teamSize} onChange={(v) => update("teamSize", v)} options={["1-3명", "4-10명", "11-30명", "31명 이상"]} />
              <SelectField name="monthlyVolume" label="월 콘텐츠량" value={form.monthlyVolume} onChange={(v) => update("monthlyVolume", v)} options={["10건 이하", "11-30건", "31-100건", "100건 이상"]} />
              <Field name="channels" label="주요 채널" value={form.channels} onChange={(v) => update("channels", v)} required placeholder="Instagram, Naver Blog 등" />
              <SelectField name="timeline" label="도입 시점" value={form.timeline} onChange={(v) => update("timeline", v)} options={["즉시", "1개월 내", "3개월 내", "검토 중"]} />
              <SelectField name="budget" label="예산 범위" value={form.budget} onChange={(v) => update("budget", v)} options={["미정", "월 50만원 이하", "월 50-200만원", "월 200만원 이상"]} />
            </div>
            <TextArea name="problem" label="현재 콘텐츠 운영 문제" value={form.problem} onChange={(v) => update("problem", v)} required placeholder="예: 게시물 반응 분석, 검수, 주간 캠페인 예약 발행이 분리되어 있습니다." />
            <TextArea name="memo" label="추가 메모" value={form.memo} onChange={(v) => update("memo", v)} />
            <label className="agree-row">
              <input name="consent" type="checkbox" checked={form.consent} onChange={(event) => update("consent", event.target.checked)} required />
              개인정보 수집 및 베타 심사 연락에 동의합니다.
            </label>
            <button className="submit-button" type="submit" disabled={submitting}>
              {submitting ? "접수 중" : t.submit}
            </button>
          </form>
        </section>
      </main>

      <footer>
        <a className="footer-brand" href="#hero"><span>M</span> MAKO</a>
        <a href="#features">Features</a>
        <a href="/terms">Terms</a>
        <a href="/privacy">Privacy</a>
      </footer>

      {contactOpen ? (
        <div className="modal-backdrop" role="presentation" onMouseDown={() => setContactOpen(false)}>
          <section className="contact-modal" role="dialog" aria-modal="true" aria-label="Contact MAKO" onMouseDown={(event) => event.stopPropagation()}>
            <button type="button" className="modal-close" aria-label="닫기" onClick={() => setContactOpen(false)}><X size={18} /></button>
            <h2>Contact MAKO</h2>
            <p>베타 도입 검토, 팀 온보딩, 자료 학습 범위를 남겨주시면 신청서 기준으로 검토합니다.</p>
            <div className="modal-actions">
              <button type="button" onClick={scrollToApply}>신청서 작성</button>
              <a href="mailto:contact@hyphen.it.com">이메일 문의</a>
            </div>
          </section>
        </div>
      ) : null}
      {eventPopupOpen ? (
        <BetaEventPopup
          onClose={() => setEventPopupOpen(false)}
          onDetail={openEventDetail}
          onApply={() => {
            setEventPopupOpen(false);
            scrollToApply();
          }}
        />
      ) : null}
    </div>
  );
}

function EventDetailPage({ onBack, onApply }) {
  return (
    <div className="landing-page event-page">
      <header className="site-nav">
        <button type="button" className="brand-lockup event-back-brand" onClick={onBack}>
          <strong>MAKO</strong>
          <small>Beta Event</small>
        </button>
        <nav aria-label="이벤트 내비게이션">
          <button type="button" className="nav-text-button" onClick={onBack}>서비스 보기</button>
          <button type="button" className="nav-cta" onClick={onApply}>베타 신청 <ArrowRight size={15} /></button>
        </nav>
      </header>
      <main className="event-detail-page">
        <section className="event-detail-visual">
          <img src={betaEvent.detailImage} alt="MAKO 베타 신청 이벤트 안내" />
        </section>
        <section className="event-detail-copy">
          <p className="eyebrow">BETA APPLICATION EVENT</p>
          <h1>6월 5일까지 신청하면, MAKO 도입 방향을 함께 설계해드립니다.</h1>
          <p>초기 베타 신청 팀에게 무료 컨설팅과 맞춤형 제작비 지원 검토를 제공합니다. 브랜드 자료와 운영 목표를 기준으로 랜딩페이지, 카드뉴스, 블로그, 카페, 쓰레드까지 실제 실행 가능한 산출물 패키지로 정리합니다.</p>
          <button type="button" className="primary-action" onClick={onApply}>베타 신청하기 <ArrowRight size={18} /></button>
        </section>
        <section className="event-benefits">
          <article><span>01</span><h2>무료 컨설팅</h2><p>현재 콘텐츠 운영 구조, 브랜드 자료, 전환 목표를 기준으로 우선 제작해야 할 산출물과 캠페인 흐름을 정리합니다.</p></article>
          <article><span>02</span><h2>맞춤형 제작비 지원</h2><p>베타 대상 팀은 초기 제작 범위에 따라 랜딩페이지와 콘텐츠 제작비 지원 가능 여부를 함께 검토합니다.</p></article>
          <article><span>03</span><h2>실행 산출물 제안</h2><p>카드뉴스, 블로그, 카페, 쓰레드의 역할을 나누고 브랜드별 후킹과 메시지를 실제 검수 가능한 형태로 제안합니다.</p></article>
        </section>
        <section className="event-process">
          <h2>진행 방식</h2>
          <ol>
            <li><strong>신청 접수</strong><span>베타 신청서로 브랜드와 필요한 채널을 남깁니다.</span></li>
            <li><strong>자료 검토</strong><span>브로슈어, 기존 게시물, 제품 설명을 바탕으로 맞춤 범위를 확인합니다.</span></li>
            <li><strong>컨설팅</strong><span>콘텐츠 운영 우선순위와 제작 방향을 함께 결정합니다.</span></li>
            <li><strong>제작 제안</strong><span>지원 가능 범위, 일정, 첫 산출물 패키지를 안내합니다.</span></li>
          </ol>
        </section>
      </main>
    </div>
  );
}

function BetaEventPopup({ onClose, onDetail, onApply }) {
  return (
    <div className="event-popup-backdrop" role="dialog" aria-modal="true" aria-label="MAKO 베타 신청 이벤트">
      <section className="event-popup">
        <button type="button" className="event-popup-close" aria-label="닫기" onClick={onClose}><X size={18} /></button>
        <img src={betaEvent.popupImage} alt="6월 5일까지 MAKO 베타 신청 이벤트" />
        <div className="event-popup-copy">
          <span><Gift size={15} /> {betaEvent.deadline}까지</span>
          <h2>무료 컨설팅과 맞춤형 제작비 지원을 받을 수 있는 베타 신청 이벤트입니다.</h2>
          <p>브랜드 자료를 기반으로 랜딩페이지, 카드뉴스, 블로그, 카페, 쓰레드까지 실제 운영 가능한 산출물 방향을 함께 잡아드립니다.</p>
          <div>
            <button type="button" onClick={onApply}>지금 신청하기</button>
            <button type="button" onClick={onDetail}>상세 안내 보기</button>
          </div>
        </div>
      </section>
    </div>
  );
}

function ProductShowcase({ activePreview }) {
  return (
    <aside className="product-showcase reveal is-visible" aria-label="MAKO 제품 화면 미리보기">
      <div className="browser-frame">
        <div className="browser-bar"><i /><i /><i /><span>mako.ai.hyphen.it.com</span></div>
        <img key={activePreview.key} src={activePreview.image} alt={`${activePreview.title} 실제 UI 캡처`} fetchPriority="high" decoding="async" />
      </div>
    </aside>
  );
}

function Field({ name, label, value, onChange, type = "text", required = false, placeholder = "", inputMode, autoComplete }) {
  return (
    <label>
      {label}
      <input name={name} type={type} inputMode={inputMode} autoComplete={autoComplete} value={value} onChange={(event) => onChange(event.target.value)} required={required} placeholder={placeholder} />
    </label>
  );
}

function SelectField({ name, label, value, onChange, options }) {
  return (
    <label>
      {label}
      <select name={name} value={value} onChange={(event) => onChange(event.target.value)} required>
        <option value="">선택</option>
        {options.map((option) => <option key={option} value={option}>{option}</option>)}
      </select>
    </label>
  );
}

function TextArea({ name, label, value, onChange, required = false, placeholder = "" }) {
  return (
    <label className="wide-field">
      {label}
      <textarea name={name} value={value} onChange={(event) => onChange(event.target.value)} required={required} placeholder={placeholder} />
    </label>
  );
}

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Landing />
  </React.StrictMode>,
);
