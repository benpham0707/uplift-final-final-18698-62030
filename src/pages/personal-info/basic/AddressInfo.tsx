import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { BasicInfo } from '@/schemas/personal';

interface Props {
  data: BasicInfo;
  onUpdate: (updates: Partial<BasicInfo>) => void;
  onNext: () => void;
  onBack: () => void;
}

export default function AddressInfo({ data, onUpdate, onNext, onBack }: Props) {
  const updateAddress = (field: keyof BasicInfo['permanentAddress'], value: string) => {
    onUpdate({ 
      permanentAddress: { ...data.permanentAddress, [field]: value } 
    });
  };

  const canContinue = 
    data.permanentAddress.street &&
    data.permanentAddress.city &&
    data.permanentAddress.state &&
    data.permanentAddress.zip &&
    data.permanentAddress.country;

  return (
    <div className="bg-background">
      <div className="max-w-2xl mx-auto px-4 py-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-foreground mb-2">Permanent Address</h1>
          <p className="text-muted-foreground mb-4">
            Step 3 of 4: Your permanent address
          </p>
          
          <Progress value={75} className="h-2" />
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              Permanent Address
              <span className="text-destructive">*</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="street">Street Address *</Label>
              <Input
                id="street"
                value={data.permanentAddress.street}
                onChange={(e) => updateAddress('street', e.target.value)}
                placeholder="123 Main Street"
              />
            </div>
            
            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="city">City *</Label>
                <Input
                  id="city"
                  value={data.permanentAddress.city}
                  onChange={(e) => updateAddress('city', e.target.value)}
                  placeholder="City"
                />
              </div>
              <div>
                <Label htmlFor="state">State *</Label>
                <Input
                  id="state"
                  value={data.permanentAddress.state}
                  onChange={(e) => updateAddress('state', e.target.value)}
                  placeholder="State"
                />
              </div>
              <div>
                <Label htmlFor="zip">ZIP Code *</Label>
                <Input
                  id="zip"
                  value={data.permanentAddress.zip}
                  onChange={(e) => updateAddress('zip', e.target.value)}
                  placeholder="12345"
                />
              </div>
            </div>
            
            <div>
              <Label htmlFor="country">Country *</Label>
              <Input
                id="country"
                value={data.permanentAddress.country}
                onChange={(e) => updateAddress('country', e.target.value)}
                placeholder="Country"
              />
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-between mt-6">
          <Button 
            variant="outline" 
            onClick={onBack}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          
          <Button 
            onClick={onNext}
            disabled={!canContinue}
          >
            Continue
            <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
}