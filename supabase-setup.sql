-- =============================================
-- recordingcafe Supabase 테이블 생성 SQL
-- Supabase Dashboard → SQL Editor에서 실행
-- =============================================

-- 1. 예약 테이블 (기존에 없다면 생성)
CREATE TABLE IF NOT EXISTS rc_bookings (
  id              BIGSERIAL PRIMARY KEY,
  booking_path    TEXT NOT NULL,           -- 'docent' | 'recording' | 'pro'
  booking_type    TEXT,
  session_date    TEXT,
  session_time    TEXT,
  customer_name   TEXT NOT NULL,
  customer_phone  TEXT NOT NULL,
  customer_email  TEXT,
  platform        TEXT,
  drinks          TEXT[],
  mixing          TEXT,
  video           TEXT[],
  total_price     INTEGER DEFAULT 0,
  status          TEXT DEFAULT 'confirmed', -- 'confirmed' | 'pending' | 'completed' | 'cancelled'
  site_id         TEXT DEFAULT 'recordingcafe',
  notes           TEXT,
  created_at      TIMESTAMPTZ DEFAULT now()
);

-- 2. 회원 테이블 (마이페이지 / 멤버십용)
CREATE TABLE IF NOT EXISTS rc_members (
  id              BIGSERIAL PRIMARY KEY,
  user_id         UUID NOT NULL UNIQUE,     -- Supabase auth.users.id
  email           TEXT NOT NULL,
  full_name       TEXT,
  avatar_url      TEXT,
  membership_tier TEXT DEFAULT 'none',     -- 'none' | 'basic' | 'plus' | 'pro'
  membership_start TIMESTAMPTZ,
  membership_end   TIMESTAMPTZ,
  created_at      TIMESTAMPTZ DEFAULT now(),
  updated_at      TIMESTAMPTZ DEFAULT now()
);

-- 3. 파트너 신청 테이블
CREATE TABLE IF NOT EXISTS rc_partner_applications (
  id          BIGSERIAL PRIMARY KEY,
  company     TEXT NOT NULL,
  type        TEXT NOT NULL,
  name        TEXT NOT NULL,
  phone       TEXT NOT NULL,
  email       TEXT NOT NULL,
  message     TEXT,
  status      TEXT DEFAULT 'pending',
  created_at  TIMESTAMPTZ DEFAULT now()
);

-- 4. 단체 예약 신청 테이블
CREATE TABLE IF NOT EXISTS rc_group_applications (
  id          BIGSERIAL PRIMARY KEY,
  org         TEXT NOT NULL,
  package     TEXT NOT NULL,
  name        TEXT NOT NULL,
  phone       TEXT NOT NULL,
  email       TEXT NOT NULL,
  count       INTEGER,
  date        TEXT,
  message     TEXT,
  status      TEXT DEFAULT 'pending',
  created_at  TIMESTAMPTZ DEFAULT now()
);

-- 5. RLS(Row Level Security) 설정
ALTER TABLE rc_bookings             ENABLE ROW LEVEL SECURITY;
ALTER TABLE rc_members              ENABLE ROW LEVEL SECURITY;
ALTER TABLE rc_partner_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE rc_group_applications   ENABLE ROW LEVEL SECURITY;

-- 서비스 롤(서버)에서 모든 접근 허용
CREATE POLICY "service_role_all" ON rc_bookings             FOR ALL TO service_role USING (true);
CREATE POLICY "service_role_all" ON rc_members              FOR ALL TO service_role USING (true);
CREATE POLICY "service_role_all" ON rc_partner_applications FOR ALL TO service_role USING (true);
CREATE POLICY "service_role_all" ON rc_group_applications   FOR ALL TO service_role USING (true);

-- 회원은 본인 데이터 조회 가능
CREATE POLICY "user_select_own_bookings" ON rc_bookings
  FOR SELECT TO authenticated
  USING (customer_email = auth.jwt() ->> 'email');

CREATE POLICY "user_select_own_member" ON rc_members
  FOR SELECT TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "user_update_own_member" ON rc_members
  FOR UPDATE TO authenticated
  USING (user_id = auth.uid());

-- 누구나 예약·신청 INSERT 가능 (비회원도 예약 허용)
CREATE POLICY "anon_insert_booking" ON rc_bookings
  FOR INSERT TO anon, authenticated WITH CHECK (true);

CREATE POLICY "anon_insert_partner" ON rc_partner_applications
  FOR INSERT TO anon, authenticated WITH CHECK (true);

CREATE POLICY "anon_insert_group" ON rc_group_applications
  FOR INSERT TO anon, authenticated WITH CHECK (true);

-- =============================================
-- Google OAuth 설정 안내 (Supabase Dashboard에서)
-- Authentication → Providers → Google
-- Client ID: Google Cloud Console에서 발급
-- Client Secret: Google Cloud Console에서 발급
-- Redirect URL: https://[프로젝트ID].supabase.co/auth/v1/callback
-- =============================================
