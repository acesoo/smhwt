-- Clear the existing rows and reset the ID counter
TRUNCATE TABLE public.resources RESTART IDENTITY;

-- Insert the verified, highly-stable resources
INSERT INTO public.resources (title, url, tags) VALUES
  (
    'I’m So Stressed Out! Fact Sheet (NIH)',
    'https://www.nimh.nih.gov/health/publications/stress',
    ARRAY['#ActiveCoping', '#Planning', '#WorkOverload']
  ),
  (
    'Cognitive Reframing for Stress Management',
    'https://www.verywellmind.com/cognitive-reframing-for-stress-management-3144872',
    ARRAY['#PositiveReframing', '#Acceptance', '#TestStress']
  ),
  (
    'Manage Stress: Strengthen Your Support Network',
    'https://www.apa.org/topics/stress/manage-social-support',
    ARRAY['#EmotionalSupport', '#InstrumentalSupport', '#Isolation']
  ),
  (
    'How to Manage Your Perfectionism',
    'https://hbr.org/2019/04/how-to-manage-your-perfectionism',
    ARRAY['#Acceptance', '#PositiveReframing', '#Perfectionism']
  ),
  (
    '7 Time Management Strategies for Students',
    'https://www.coursera.org/articles/time-management-skills',
    ARRAY['#ActiveCoping', '#Planning', '#TimeManagement']
  );