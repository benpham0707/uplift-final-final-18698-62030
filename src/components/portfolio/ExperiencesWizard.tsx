import { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { createExperience } from '@/app/experiences/api';

type WizardStep = 1 | 2 | 3 | 4;

const EXPERIENCE_TYPE = [
  { id: 'work', label: 'Work' },
  { id: 'volunteer', label: 'Volunteer' },
  { id: 'school_activity', label: 'School activity' },
  { id: 'project', label: 'Personal project' },
] as const;

const TIME_COMMITMENT = [
  { id: 'part_time', label: 'Part-time' },
  { id: 'full_time', label: 'Full-time' },
  { id: 'seasonal', label: 'Seasonal' },
  { id: 'one_time', label: 'One-time' },
] as const;

interface Props {
  onAdded?: (payload: { id: string }) => void;
  onClose?: () => void;
}

export default function ExperiencesWizard({ onAdded, onClose }: Props) {
  const { toast } = useToast();
  const [step, setStep] = useState<WizardStep>(1);
  const [saving, setSaving] = useState(false);
  const [savedId, setSavedId] = useState<string | null>(null);

  // Step 1
  const [category, setCategory] = useState<typeof EXPERIENCE_TYPE[number]['id'] | ''>('');
  const [title, setTitle] = useState('');
  const [organization, setOrganization] = useState('');

  // Step 2
  const [startDate, setStartDate] = useState('');
  const [isOngoing, setIsOngoing] = useState(false);
  const [endDate, setEndDate] = useState('');
  const [timeCommitment, setTimeCommitment] = useState<typeof TIME_COMMITMENT[number]['id'] | ''>('');
  const [totalHours, setTotalHours] = useState<string>('');

  // Step 3
  const [description, setDescription] = useState('');
  const [responsibilities, setResponsibilities] = useState<string[]>([]);
  const [achievements, setAchievements] = useState<string[]>([]);
  const [respInput, setRespInput] = useState('');
  const [achInput, setAchInput] = useState('');

  // Step 4
  const [metrics, setMetrics] = useState<Record<string, string | number>>({});
  const [metricKey, setMetricKey] = useState('');
  const [metricValue, setMetricValue] = useState('');
  const [skills, setSkills] = useState<string[]>([]);
  const [skillInput, setSkillInput] = useState('');
  const [verificationUrl, setVerificationUrl] = useState('');
  const [supervisorName, setSupervisorName] = useState('');
  const [canContact, setCanContact] = useState(false);

  const canContinue = useMemo(() => {
    if (step === 1) {
      return Boolean(category && title.trim().length >= 2 && organization.trim().length >= 1);
    }
    if (step === 2) {
      const hasStart = startDate && startDate.length >= 10;
      const endOk = isOngoing || !endDate || endDate.length >= 10;
      const timeOk = Boolean(timeCommitment);
      return hasStart && endOk && timeOk;
    }
    if (step === 3) {
      return description.trim().length >= 10;
    }
    return true;
  }, [step, category, title, organization, startDate, endDate, isOngoing, timeCommitment, description]);

  const addChip = (current: string[], set: (v: string[]) => void, value: string) => {
    const v = value.trim();
    if (!v) return;
    if (current.includes(v)) return;
    set([...current, v]);
  };

  const removeChip = (current: string[], set: (v: string[]) => void, value: string) => {
    set(current.filter((c) => c !== value));
  };

  const addMetric = () => {
    const k = metricKey.trim();
    const val = metricValue.trim();
    if (!k || !val) return;
    const num = Number(val);
    const parsed = isFinite(num) && val !== '' && /^[-+]?\d*\.?\d+$/.test(val) ? num : val;
    setMetrics({ ...metrics, [k]: parsed });
    setMetricKey('');
    setMetricValue('');
  };

  const removeMetric = (key: string) => {
    const next = { ...metrics };
    delete next[key];
    setMetrics(next);
  };

  const submit = async () => {
    try {
      setSaving(true);
      const payload = {
        category,
        title: title.trim(),
        organization: organization.trim() || 'Self',
        startDate,
        endDate: isOngoing ? null : endDate || null,
        isOngoing,
        timeCommitment,
        totalHours: totalHours ? Number(totalHours) : undefined,
        description: description.trim(),
        responsibilities,
        achievements,
        challenges: [],
        metrics,
        skills,
        verificationUrl,
        supervisorName: supervisorName || undefined,
        canContact,
      } as const;

      const res = await createExperience(payload as any);
      setSavedId(res.id);
      toast({ title: 'Added ✓', description: 'Your experience was saved.' });
      if (onAdded) onAdded({ id: res.id });
    } catch (e: any) {
      toast({ title: 'Save failed', description: e?.message || 'Please try again.' });
    } finally {
      setSaving(false);
    }
  };

  const resetForm = () => {
    setStep(1);
    setCategory('');
    setTitle('');
    setOrganization('');
    setStartDate('');
    setIsOngoing(false);
    setEndDate('');
    setTimeCommitment('');
    setTotalHours('');
    setDescription('');
    setResponsibilities([]);
    setAchievements([]);
    setRespInput('');
    setAchInput('');
    setMetrics({});
    setMetricKey('');
    setMetricValue('');
    setSkills([]);
    setSkillInput('');
    setVerificationUrl('');
    setSupervisorName('');
    setCanContact(false);
    setSavedId(null);
  };

  if (savedId) {
    return (
      <Card className="shadow-medium">
        <CardHeader>
          <CardTitle className="text-foreground">Experience added</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">You can add another or continue.</p>
          <div className="flex gap-2">
            <Button onClick={resetForm}>Add another</Button>
            <Button variant="outline" onClick={onClose}>Continue</Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="shadow-medium max-h-[80vh] overflow-y-auto">
      <CardHeader>
        <CardTitle className="text-foreground">
          {step === 1 && 'What kind of experience is this?'}
          {step === 2 && 'When did you do it and how much time did it take?'}
          {step === 3 && 'What did you do?'}
          {step === 4 && 'What impact did you have?'}
        </CardTitle>
        {step === 1 && category === 'school_activity' && (
          <p className="text-sm text-muted-foreground">
            <strong>Goal:</strong> Add at least 3 extracurricular activities to show colleges your engagement and interests
          </p>
        )}
      </CardHeader>
      <CardContent className="space-y-6">
        {step === 1 && (
          <div className="space-y-6">
            {category === 'school_activity' && (
              <div className="p-4 bg-primary/10 border border-primary/20 rounded-lg">
                <h4 className="font-semibold text-primary mb-2">🎯 Extracurricular Activities - Add as Many as Possible!</h4>
                <p className="text-sm text-muted-foreground mb-2">
                  <strong>Minimum requirement: 3 activities</strong> - but colleges want to see breadth and depth of engagement.
                </p>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Sports teams, clubs, student government, honor societies</li>
                  <li>• Music, theater, debate, academic competitions</li>
                  <li>• Community service, religious activities, cultural groups</li>
                  <li>• Part-time jobs, internships, research projects</li>
                </ul>
                <p className="text-sm font-medium text-primary mt-2">
                  💡 Pro tip: Include leadership roles, time commitment, and measurable impact!
                </p>
              </div>
            )}
            
            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <Label className="mb-1 block">Category</Label>
                <Select value={category} onValueChange={(v) => setCategory(v as any)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {EXPERIENCE_TYPE.map((c) => (
                      <SelectItem key={c.id} value={c.id}>{c.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="mb-1 block">Role / Title</Label>
                <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder={category === 'school_activity' ? 'e.g., President, Captain, Member' : 'e.g., Barista'} />
              </div>
              <div>
                <Label className="mb-1 block">Organization</Label>
                <Input value={organization} onChange={(e) => setOrganization(e.target.value)} placeholder={category === 'school_activity' ? 'e.g., Debate Team, NHS, Soccer Team' : 'e.g., Blue Bottle Coffee or Self'} />
              </div>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4">
            <div className="grid md:grid-cols-4 gap-4">
              <div>
                <Label className="mb-1 block">Start date</Label>
                <Input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
              </div>
              <div>
                <Label className="mb-1 block">End date</Label>
                <Input type="date" value={endDate} disabled={isOngoing} onChange={(e) => setEndDate(e.target.value)} />
                <div className="flex items-center gap-2 mt-2">
                  <Checkbox id="ongoing" checked={isOngoing} onCheckedChange={(v: any) => setIsOngoing(Boolean(v))} />
                  <Label htmlFor="ongoing" className="text-sm text-muted-foreground">Still doing this</Label>
                </div>
              </div>
              <div>
                <Label className="mb-1 block">Time commitment</Label>
                <Select value={timeCommitment} onValueChange={(v) => setTimeCommitment(v as any)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    {TIME_COMMITMENT.map((t) => (
                      <SelectItem key={t.id} value={t.id}>{t.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="mb-1 block">Total hours (optional)</Label>
                <Input type="number" inputMode="numeric" min={0} value={totalHours} onChange={(e) => setTotalHours(e.target.value)} placeholder="e.g., 320" />
              </div>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-4">
            <div>
              <Label className="mb-1 block">Short description</Label>
              <Textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="What did you do?" />
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label className="mb-1 block">Responsibilities</Label>
                <div className="flex gap-2 mb-2">
                  <Input value={respInput} onChange={(e) => setRespInput(e.target.value)} placeholder="Add and press Enter" onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); addChip(responsibilities, setResponsibilities, respInput); setRespInput(''); } }} />
                  <Button type="button" variant="outline" onClick={() => { addChip(responsibilities, setResponsibilities, respInput); setRespInput(''); }}>Add</Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {responsibilities.map((r) => (
                    <Badge key={r} variant="secondary" className="text-xs cursor-pointer" onClick={() => removeChip(responsibilities, setResponsibilities, r)}>{r} ×</Badge>
                  ))}
                </div>
              </div>
              <div>
                <Label className="mb-1 block">Notable achievements</Label>
                <div className="flex gap-2 mb-2">
                  <Input value={achInput} onChange={(e) => setAchInput(e.target.value)} placeholder="Add and press Enter" onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); addChip(achievements, setAchievements, achInput); setAchInput(''); } }} />
                  <Button type="button" variant="outline" onClick={() => { addChip(achievements, setAchievements, achInput); setAchInput(''); }}>Add</Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {achievements.map((a) => (
                    <Badge key={a} variant="secondary" className="text-xs cursor-pointer" onClick={() => removeChip(achievements, setAchievements, a)}>{a} ×</Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="space-y-6">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label className="mb-1 block">Metrics (optional)</Label>
                <div className="flex gap-2 mb-2">
                  <Input value={metricKey} onChange={(e) => setMetricKey(e.target.value)} placeholder="# customers, $ raised, etc." />
                  <Input value={metricValue} onChange={(e) => setMetricValue(e.target.value)} placeholder="Value" />
                  <Button variant="outline" onClick={addMetric}>Add</Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {Object.entries(metrics).map(([k, v]) => (
                    <Badge key={k} variant="outline" className="text-xs cursor-pointer" onClick={() => removeMetric(k)}>{k}: {String(v)} ×</Badge>
                  ))}
                </div>
              </div>
              <div>
                <Label className="mb-1 block">Skills used (optional)</Label>
                <div className="flex gap-2 mb-2">
                  <Input value={skillInput} onChange={(e) => setSkillInput(e.target.value)} placeholder="Add and press Enter" onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); addChip(skills, setSkills, skillInput); setSkillInput(''); } }} />
                  <Button type="button" variant="outline" onClick={() => { addChip(skills, setSkills, skillInput); setSkillInput(''); }}>Add</Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {skills.map((s) => (
                    <Badge key={s} variant="secondary" className="text-xs cursor-pointer" onClick={() => removeChip(skills, setSkills, s)}>{s} ×</Badge>
                  ))}
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <Label className="mb-1 block">Supervisor (optional)</Label>
                <Input value={supervisorName} onChange={(e) => setSupervisorName(e.target.value)} placeholder="Name" />
              </div>
              <div>
                <Label className="mb-1 block">Link to proof (optional)</Label>
                <Input value={verificationUrl} onChange={(e) => setVerificationUrl(e.target.value)} placeholder="https://..." />
              </div>
              <div className="flex items-center gap-2 pt-6">
                <Checkbox id="canContact" checked={canContact} onCheckedChange={(v: any) => setCanContact(Boolean(v))} />
                <Label htmlFor="canContact" className="text-sm">OK to contact</Label>
              </div>
            </div>
          </div>
        )}

        <div className="flex items-center justify-between pt-2">
          <div className="text-sm text-muted-foreground">Step {step} of 4</div>
          <div className="flex gap-2">
            {step > 1 && (
              <Button variant="outline" onClick={() => setStep((s) => (Math.max(1, (s - 1)) as WizardStep))}>Back</Button>
            )}
            {step < 4 && (
              <Button disabled={!canContinue} onClick={() => setStep((s) => (Math.min(4, (s + 1)) as WizardStep))}>Continue</Button>
            )}
            {step === 4 && (
              <Button onClick={submit} disabled={saving}>{saving ? 'Saving...' : 'Save experience'}</Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}


