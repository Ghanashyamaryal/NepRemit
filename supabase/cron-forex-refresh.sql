-- ============================================
-- Daily NRB Forex Refresh Cron
-- ============================================
-- Runs every day at 00:05 Nepal Time (18:20 UTC)
-- and pings the Next.js revalidate endpoint so
-- /forex serves fresh NRB rates first thing after
-- NRB publishes (around midnight NPT).
--
-- BEFORE RUNNING:
--   1. Set these two Postgres settings (Supabase Dashboard → Database → Database Settings → Custom Postgres Config, or via SQL below):
--        app.revalidate_url   = 'https://YOUR-DOMAIN.com/api/revalidate/forex'
--        app.revalidate_token = 'the-same-value-as-REVALIDATE_TOKEN-in-.env'
--   2. Enable the required extensions (one-time).
-- ============================================

-- 1. Enable extensions (run once)
create extension if not exists pg_cron;
create extension if not exists pg_net;

-- 2. Store the URL + token as database settings so they aren't hard-coded
--    (run these in the SQL Editor as a Postgres superuser; edit the values first):
-- alter database postgres set app.revalidate_url   = 'https://nepremit.com/api/revalidate/forex';
-- alter database postgres set app.revalidate_token = 'replace-with-your-secret-token';

-- 3. Remove any prior schedule with the same name (safe to re-run)
select cron.unschedule('refresh-forex-daily')
where exists (
  select 1 from cron.job where jobname = 'refresh-forex-daily'
);

-- 4. Schedule the cron job
--    Cron expression: '5 18 * * *'  → 18:05 UTC every day = 23:50 NPT (just before midnight)
--    Adjust to '20 18 * * *' for 00:05 NPT if you want it just after NRB publishes.
select cron.schedule(
  'refresh-forex-daily',
  '20 18 * * *',
  $$
  select net.http_get(
    url := current_setting('app.revalidate_url') || '?token=' || current_setting('app.revalidate_token'),
    timeout_milliseconds := 10000
  );
  $$
);

-- 5. Inspect scheduled jobs
-- select * from cron.job;

-- 6. Inspect recent runs (useful for debugging)
-- select * from cron.job_run_details order by start_time desc limit 10;
