-- ============================================
-- 레코딩카페 파트너 프로그램 테이블
-- Supabase SQL Editor에서 실행하세요
-- https://supabase.com/dashboard/project/vilyjpopucetqntstlqr/sql/new
-- ============================================

-- 1. 브랜드 앰배서더 신청
CREATE TABLE IF NOT EXISTS public.rc_ambassador_applications (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  channel_name TEXT NOT NULL,
  channel_url TEXT NOT NULL,
  platform TEXT NOT NULL,
  subscribers INTEGER NOT NULL DEFAULT 0,
  content_type TEXT,
  message TEXT,
  status TEXT NOT NULL DEFAULT 'pending', -- pending | approved | rejected
  site_id TEXT NOT NULL DEFAULT 'recordingcafe',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.rc_ambassador_applications ENABLE ROW LEVEL SECURITY;

-- 2. UGC 인증 제출
CREATE TABLE IF NOT EXISTS public.rc_ugc_submissions (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  platform TEXT NOT NULL,
  post_url TEXT NOT NULL,
  hashtags TEXT,
  message TEXT,
  status TEXT NOT NULL DEFAULT 'pending', -- pending | approved | featured | rejected
  points_awarded INTEGER DEFAULT 0,
  site_id TEXT NOT NULL DEFAULT 'recordingcafe',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.rc_ugc_submissions ENABLE ROW LEVEL SECURITY;

-- 3. 제휴 마케팅 파트너
CREATE TABLE IF NOT EXISTS public.rc_affiliates (
  id BIGSERIAL PRIMARY KEY,
  business_name TEXT NOT NULL,
  contact_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  website_url TEXT,
  platform_type TEXT,   -- blog | youtube | community | sns | hotel | travel | other
  audience_size TEXT,
  description TEXT,
  affiliate_code TEXT UNIQUE,  -- 승인 시 자동 생성, 슬러그 형태
  status TEXT NOT NULL DEFAULT 'pending', -- pending | approved | rejected
  commission_rate INTEGER NOT NULL DEFAULT 20,
  total_bookings INTEGER NOT NULL DEFAULT 0,
  total_commission INTEGER NOT NULL DEFAULT 0,
  site_id TEXT NOT NULL DEFAULT 'recordingcafe',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.rc_affiliates ENABLE ROW LEVEL SECURITY;

-- 4. 제휴 예약 (affiliate link 통한 예약)
CREATE TABLE IF NOT EXISTS public.rc_affiliate_bookings (
  id BIGSERIAL PRIMARY KEY,
  affiliate_id BIGINT REFERENCES public.rc_affiliates(id),
  affiliate_code TEXT NOT NULL,
  customer_name TEXT NOT NULL,
  customer_phone TEXT NOT NULL,
  customer_email TEXT,
  service_type TEXT NOT NULL,  -- experience | docent | group | pro | membership
  desired_date TEXT NOT NULL,
  desired_time TEXT,
  headcount INTEGER DEFAULT 1,
  message TEXT,
  total_amount INTEGER,
  commission_amount INTEGER,   -- total_amount * commission_rate / 100
  status TEXT NOT NULL DEFAULT 'pending',
  site_id TEXT NOT NULL DEFAULT 'recordingcafe',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.rc_affiliate_bookings ENABLE ROW LEVEL SECURITY;

-- 5. 리퍼럴 코드
CREATE TABLE IF NOT EXISTS public.rc_referral_codes (
  id BIGSERIAL PRIMARY KEY,
  code TEXT UNIQUE NOT NULL,
  member_name TEXT NOT NULL,
  member_email TEXT NOT NULL,
  referred_count INTEGER NOT NULL DEFAULT 0,
  reward_count INTEGER NOT NULL DEFAULT 0,
  site_id TEXT NOT NULL DEFAULT 'recordingcafe',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.rc_referral_codes ENABLE ROW LEVEL SECURITY;
