-- 1. Fix the Academic Impact constraint
ALTER TABLE mood_logs DROP CONSTRAINT IF EXISTS mood_logs_academic_impact_check;
ALTER TABLE mood_logs ADD CONSTRAINT mood_logs_academic_impact_check 
CHECK (academic_impact IN ('None', 'Minor', 'Moderate', 'Severe'));

-- 2. Fix the Sleep Quality constraint (Updating from 1-10 to 1-5)
ALTER TABLE mood_logs DROP CONSTRAINT IF EXISTS mood_logs_sleep_quality_check;
ALTER TABLE mood_logs ADD CONSTRAINT mood_logs_sleep_quality_check 
CHECK (sleep_quality BETWEEN 1 AND 5);