-- ============================================
-- 레코딩카페 공연·교육·소식 테이블
-- ============================================

-- 공연 프로그램
CREATE TABLE IF NOT EXISTS public.rc_performances (
  id BIGSERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  subtitle TEXT,
  category TEXT NOT NULL DEFAULT '공연',
  description TEXT,
  image_url TEXT,
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  venue TEXT DEFAULT '레코딩카페 스튜디오',
  price TEXT,
  max_participants INTEGER,
  current_participants INTEGER DEFAULT 0,
  status TEXT NOT NULL DEFAULT 'open',
  is_published BOOLEAN NOT NULL DEFAULT false,
  site_id TEXT NOT NULL DEFAULT 'recordingcafe',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.rc_performances ENABLE ROW LEVEL SECURITY;

-- 교육 프로그램
CREATE TABLE IF NOT EXISTS public.rc_education (
  id BIGSERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  subtitle TEXT,
  category TEXT NOT NULL DEFAULT '교육',
  description TEXT,
  image_url TEXT,
  instructor TEXT,
  instructor_bio TEXT,
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  schedule TEXT,
  total_sessions INTEGER,
  venue TEXT DEFAULT '레코딩카페',
  price TEXT,
  max_participants INTEGER,
  current_participants INTEGER DEFAULT 0,
  status TEXT NOT NULL DEFAULT 'open',
  is_published BOOLEAN NOT NULL DEFAULT false,
  site_id TEXT NOT NULL DEFAULT 'recordingcafe',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.rc_education ENABLE ROW LEVEL SECURITY;

-- 프로그램 신청 (공연·교육·체험 공통)
CREATE TABLE IF NOT EXISTS public.rc_program_applications (
  id BIGSERIAL PRIMARY KEY,
  program_type TEXT NOT NULL,
  program_id BIGINT,
  program_title TEXT NOT NULL,
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT,
  headcount INTEGER DEFAULT 1,
  message TEXT,
  status TEXT NOT NULL DEFAULT 'pending',
  site_id TEXT NOT NULL DEFAULT 'recordingcafe',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.rc_program_applications ENABLE ROW LEVEL SECURITY;

-- 언론보도
CREATE TABLE IF NOT EXISTS public.rc_press (
  id BIGSERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  media_name TEXT NOT NULL,
  media_url TEXT,
  summary TEXT,
  published_date DATE,
  is_published BOOLEAN NOT NULL DEFAULT true,
  site_id TEXT NOT NULL DEFAULT 'recordingcafe',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.rc_press ENABLE ROW LEVEL SECURITY;

-- 공지사항
CREATE TABLE IF NOT EXISTS public.rc_notices (
  id BIGSERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  content TEXT,
  category TEXT DEFAULT '공지',
  is_pinned BOOLEAN DEFAULT false,
  is_published BOOLEAN DEFAULT true,
  site_id TEXT NOT NULL DEFAULT 'recordingcafe',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.rc_notices ENABLE ROW LEVEL SECURITY;
