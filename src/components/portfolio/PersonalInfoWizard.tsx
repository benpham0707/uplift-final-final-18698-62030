import { useEffect, useMemo, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Textarea } from '@/components/ui/textarea';
import { useAuth } from '@/hooks/useAuth';
import { useNavigate } from 'react-router-dom';

type Basics = {
  firstName: string;
  lastName: string;
  preferredName?: string;
  pronouns?: string;
  dateOfBirth?: string;
  phone?: string;
  email?: string;
  location: { city?: string; state?: string; zip?: string; country: string };
};

type School = { name: string; type: string; city?: string; state?: string; country: string };

type Background = {
  firstGen: 'yes' | 'no' | 'unsure';
  languages: string[];
  workHoursPerWeek?: number;
  caregiving?: boolean;
  immigrationContext?: string;
};

type Communications = {
  contactPreference: 'sms' | 'email' | 'whatsapp' | 'none';
  marketingOptIn: boolean;
  guardian?: { name?: string; email?: string };
  consentAcknowledged: boolean;
};

export default function PersonalInfoWizard({ onComplete }: { onComplete?: () => void }) {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const total = 4;
  const progress = useMemo(() => (step / total) * 100, [step]);

  const [basics, setBasics] = useState<Basics>({
    firstName: '',
    lastName: '',
    preferredName: '',
    pronouns: '',
    dateOfBirth: '',
    phone: '',
    email: '',
    location: { city: '', state: '', zip: '', country: 'USA' },
  });

  const [school, setSchool] = useState<School>({ name: '', type: 'public', city: '', state: '', country: 'USA' });
  const [background, setBackground] = useState<Background>({ firstGen: 'unsure', languages: [], caregiving: false });
  const [communications, setCommunications] = useState<Communications>({ contactPreference: 'none', marketingOptIn: false, consentAcknowledged: false });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (user?.email) setBasics((b) => ({ ...b, email: user.email! }));
  }, [user?.email]);

  const canNext = () => {
    if (step === 1) return basics.firstName && basics.lastName && (basics.email || '').length > 0;
    if (step === 2) return school.name && school.type;
    if (step === 3) return true;
    if (step === 4) return communications.consentAcknowledged !== undefined;
    return false;
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    try {
      const payload = { basics, school, background, communications };
      // Try API first
      const { supabase } = await import('@/integrations/supabase/client');
      const { data } = await supabase.auth.getSession();
      const accessToken = data.session?.access_token;
      const resp = await fetch('/api/v1/personal/complete', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}) },
        credentials: 'include',
        body: JSON.stringify(payload),
      });
      if (!resp.ok) throw new Error('server_unavailable');
      onComplete?.();
      navigate('/portfolio-scanner');
    } catch (e) {
      // Client-side fallback using user's session
      try {
        const { supabase } = await import('@/integrations/supabase/client');
        const { data: sess } = await supabase.auth.getSession();
        const uid = sess.session?.user?.id;
        if (!uid) throw new Error('not_authenticated');
        // profile
        const { data: prof } = await supabase.from('profiles').select('id, demographics, completion_details, completion_score').eq('user_id', uid).single();
        if (!prof) throw new Error('profile_not_found');
        const demographics = { ...(prof.demographics as any ?? {}), basics, background, communications } as any;
        const details = (prof.completion_details as any) ?? { overall: 0, sections: { basic: 0, goals: 0, academic: 0, enrichment: 0, experience: 0 } };
        const nextDetails = { ...details, sections: { ...details.sections, basic: 1 } };
        const nextScore = Math.max(Number(prof.completion_score ?? 0), 0.5);
        await supabase.from('profiles').update({ demographics, completion_details: nextDetails, completion_score: nextScore }).eq('id', prof.id);
        await supabase.from('academic_records').upsert({
          profile_id: prof.id,
          current_grade: 'unknown',
          school: { name: school.name, city: school.city ?? '', state: school.state ?? '', country: school.country ?? 'USA', type: school.type } as any,
        }, { onConflict: 'profile_id' });
        // RLS may block events for anon; omit client-side events
        onComplete?.();
        navigate('/portfolio-scanner');
      } catch (err) {
        // eslint-disable-next-line no-alert
        alert('Could not save personal info. Please try again.');
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">Personal Information</h1>
        <p className="text-muted-foreground">Four quick steps to unlock the Portfolio Scanner.</p>
      </div>

      <div className="mb-6">
        <div className="flex items-center justify-between text-sm text-muted-foreground mb-2">
          <span>Step {step} of {total}</span>
          <span>{Math.round(progress)}% Complete</span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>
            {step === 1 && 'Basics'}
            {step === 2 && 'School'}
            {step === 3 && 'Background'}
            {step === 4 && 'Communications & Consent'}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {step === 1 && (
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label>First Name</Label>
                <Input value={basics.firstName} onChange={(e) => setBasics({ ...basics, firstName: e.target.value })} />
              </div>
              <div>
                <Label>Last Name</Label>
                <Input value={basics.lastName} onChange={(e) => setBasics({ ...basics, lastName: e.target.value })} />
              </div>
              <div>
                <Label>Preferred Name (optional)</Label>
                <Input value={basics.preferredName} onChange={(e) => setBasics({ ...basics, preferredName: e.target.value })} />
              </div>
              <div>
                <Label>Pronouns (optional)</Label>
                <Input value={basics.pronouns} onChange={(e) => setBasics({ ...basics, pronouns: e.target.value })} />
              </div>
              <div>
                <Label>Date of Birth (optional)</Label>
                <Input type="date" value={basics.dateOfBirth} onChange={(e) => setBasics({ ...basics, dateOfBirth: e.target.value })} />
              </div>
              <div>
                <Label>Phone</Label>
                <Input value={basics.phone} onChange={(e) => setBasics({ ...basics, phone: e.target.value })} />
              </div>
              <div className="md:col-span-2">
                <Label>Email</Label>
                <Input type="email" value={basics.email} onChange={(e) => setBasics({ ...basics, email: e.target.value })} />
              </div>
              <div>
                <Label>City</Label>
                <Input value={basics.location.city} onChange={(e) => setBasics({ ...basics, location: { ...basics.location, city: e.target.value } })} />
              </div>
              <div>
                <Label>State</Label>
                <Input value={basics.location.state} onChange={(e) => setBasics({ ...basics, location: { ...basics.location, state: e.target.value } })} />
              </div>
              <div>
                <Label>ZIP</Label>
                <Input value={basics.location.zip} onChange={(e) => setBasics({ ...basics, location: { ...basics.location, zip: e.target.value } })} />
              </div>
              <div>
                <Label>Country</Label>
                <Input value={basics.location.country} onChange={(e) => setBasics({ ...basics, location: { ...basics.location, country: e.target.value } })} />
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="grid md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <Label>School Name</Label>
                <Input value={school.name} onChange={(e) => setSchool({ ...school, name: e.target.value })} />
              </div>
              <div>
                <Label>School Type</Label>
                <Input placeholder="public / private / charter / etc." value={school.type} onChange={(e) => setSchool({ ...school, type: e.target.value })} />
              </div>
              <div>
                <Label>City</Label>
                <Input value={school.city} onChange={(e) => setSchool({ ...school, city: e.target.value })} />
              </div>
              <div>
                <Label>State</Label>
                <Input value={school.state} onChange={(e) => setSchool({ ...school, state: e.target.value })} />
              </div>
              <div>
                <Label>Country</Label>
                <Input value={school.country} onChange={(e) => setSchool({ ...school, country: e.target.value })} />
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4">
              <div>
                <Label>First-Gen College Student?</Label>
                <RadioGroup value={background.firstGen} onValueChange={(v) => setBackground({ ...background, firstGen: v as any })} className="mt-2">
                  {['yes','no','unsure'].map((v) => (
                    <label key={v} className="flex items-center gap-2 p-2 rounded border">
                      <RadioGroupItem value={v} id={`fg-${v}`} />
                      <span className="capitalize">{v}</span>
                    </label>
                  ))}
                </RadioGroup>
              </div>
              <div>
                <Label>Languages (comma separated)</Label>
                <Input value={background.languages.join(', ')} onChange={(e) => setBackground({ ...background, languages: e.target.value.split(',').map(s => s.trim()).filter(Boolean) })} />
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label>Work Hours / Week (optional)</Label>
                  <Input type="number" min={0} max={80} value={background.workHoursPerWeek ?? ''} onChange={(e) => setBackground({ ...background, workHoursPerWeek: e.target.value ? Number(e.target.value) : undefined })} />
                </div>
                <div>
                  <Label>Caregiving Responsibilities</Label>
                  <RadioGroup value={String(Boolean(background.caregiving))} onValueChange={(v) => setBackground({ ...background, caregiving: v === 'true' })} className="mt-2">
                    <label className="flex items-center gap-2 p-2 rounded border"><RadioGroupItem value="true" id="cg-yes" />Yes</label>
                    <label className="flex items-center gap-2 p-2 rounded border"><RadioGroupItem value="false" id="cg-no" />No</label>
                  </RadioGroup>
                </div>
              </div>
              <div>
                <Label>Immigration Context (optional)</Label>
                <Textarea value={background.immigrationContext ?? ''} onChange={(e) => setBackground({ ...background, immigrationContext: e.target.value })} />
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-4">
              <div>
                <Label>Contact Preference</Label>
                <RadioGroup value={communications.contactPreference} onValueChange={(v) => setCommunications({ ...communications, contactPreference: v as any })} className="mt-2">
                  {['sms','email','whatsapp','none'].map((v) => (
                    <label key={v} className="flex items-center gap-2 p-2 rounded border">
                      <RadioGroupItem value={v} id={`cp-${v}`} />
                      <span className="uppercase text-xs">{v}</span>
                    </label>
                  ))}
                </RadioGroup>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label>Guardian Name (optional)</Label>
                  <Input value={communications.guardian?.name ?? ''} onChange={(e) => setCommunications({ ...communications, guardian: { ...(communications.guardian ?? {}), name: e.target.value } })} />
                </div>
                <div>
                  <Label>Guardian Email (optional)</Label>
                  <Input type="email" value={communications.guardian?.email ?? ''} onChange={(e) => setCommunications({ ...communications, guardian: { ...(communications.guardian ?? {}), email: e.target.value } })} />
                </div>
              </div>
              <div className="flex items-center gap-2">
                <input id="consent" type="checkbox" checked={communications.consentAcknowledged} onChange={(e) => setCommunications({ ...communications, consentAcknowledged: e.target.checked })} />
                <Label htmlFor="consent">I acknowledge the consent policy.</Label>
              </div>
              <div className="flex items-center gap-2">
                <input id="mkt" type="checkbox" checked={communications.marketingOptIn} onChange={(e) => setCommunications({ ...communications, marketingOptIn: e.target.checked })} />
                <Label htmlFor="mkt">I’d like to receive occasional updates.</Label>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <div className="flex justify-between">
        <Button variant="outline" onClick={() => setStep((s) => Math.max(1, s - 1))} disabled={step === 1 || submitting}>Previous</Button>
        {step < total ? (
          <Button onClick={() => canNext() && setStep((s) => Math.min(total, s + 1))} disabled={!canNext() || submitting}>Next</Button>
        ) : (
          <Button onClick={handleSubmit} disabled={!canNext() || submitting}>{submitting ? 'Saving...' : 'Finish Personal Info'}</Button>
        )}
      </div>
    </div>
  );
}


