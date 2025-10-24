'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Info, Paperclip } from 'lucide-react';

// ============================================
// ORDER FORM COMPONENT - Multi-Step Form
// ============================================

type FormStep = 'patient' | 'insurance' | 'test' | 'place-order' | 'complete';

interface FormData {
  // Patient Information
  clinic: string;
  clinician: string;
  clinicReference: string;
  firstName: string;
  lastName: string;
  dob: string;
  sex: 'male' | 'female' | '';
  address: string;
  aptSte: string;
  phone: string;
  email: string;
  shipKitToPatient: 'yes' | 'no';
  fedexTracking: string;

  // Insurance Information
  insuranceProvider: string;
  policyNumber: string;
  groupNumber: string;
  subscriberName: string;
  subscriberDob: string;
  relationshipToPatient: string;

  // Test Information
  testType: string;
  reasonForTest: string[];
  additionalTests: string[];
  sampleCollected: 'yes' | 'no';
  sampleDate: string;
  barcode: string;

  // Place Order
  physicianName: string;
  physicianNpi: string;
  physicianPhone: string;
  billingType: string;
  specialInstructions: string;
}

export default function OrderForm() {
  const [currentStep, setCurrentStep] = useState<FormStep>('patient');
  const [formData, setFormData] = useState<FormData>({
    clinic: '',
    clinician: '',
    clinicReference: '',
    firstName: '',
    lastName: '',
    dob: '',
    sex: '',
    address: '',
    aptSte: '',
    phone: '',
    email: '',
    shipKitToPatient: 'no',
    fedexTracking: '',
    insuranceProvider: '',
    policyNumber: '',
    groupNumber: '',
    subscriberName: '',
    subscriberDob: '',
    relationshipToPatient: '',
    testType: '',
    reasonForTest: [],
    additionalTests: [],
    sampleCollected: 'no',
    sampleDate: '',
    barcode: '',
    physicianName: '',
    physicianNpi: '',
    physicianPhone: '',
    billingType: '',
    specialInstructions: '',
  });

  // Mock data for dropdowns
  const clinics = ['Demo Clinic', 'Main Street Clinic', 'Downtown Medical Center'];
  const clinicians = ['Dr. Sarah Johnson', 'Dr. Michael Chen', 'Dr. Emily Rodriguez'];
  const insuranceProviders = [
    'Blue Cross Blue Shield',
    'Aetna',
    'UnitedHealthcare',
    'Cigna',
    'Medicare',
  ];
  const testTypes = [
    'Prequel® Prenatal Screen',
    'Foresight® Carrier Screen',
    'MyRisk® Hereditary Cancer',
  ];
  const reasonsForTest = [
    'Abnormal maternal serum screen',
    'Advanced maternal age',
    'Family history',
    'Previous pregnancy with chromosome abnormality',
  ];
  const additionalTestOptions = [
    'Sex chromosome analysis',
    'Microdeletions',
    'Expanded Aneuploidy Analysis (EAA)',
  ];

  const steps: { id: FormStep; label: string }[] = [
    { id: 'patient', label: 'Patient' },
    { id: 'insurance', label: 'Insurance' },
    { id: 'test', label: 'Test' },
    { id: 'place-order', label: 'Place Order' },
    { id: 'complete', label: 'Complete' },
  ];

  const handleInputChange = (field: keyof FormData, value: string | string[]) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleStepClick = (stepId: FormStep) => {
    setCurrentStep(stepId);
  };

  const handleNext = () => {
    const currentIndex = steps.findIndex((s) => s.id === currentStep);
    if (currentIndex < steps.length - 1) {
      setCurrentStep(steps[currentIndex + 1].id);
    }
  };

  const handlePrevious = () => {
    const currentIndex = steps.findIndex((s) => s.id === currentStep);
    if (currentIndex > 0) {
      setCurrentStep(steps[currentIndex - 1].id);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Top Bar */}
      <div className="bg-white border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <span className="text-sm text-muted-foreground">Patient Notification Sheet</span>
              <select className="text-sm border border-border rounded px-3 py-1">
                <option>Default (Patient Pay)</option>
                <option>Insurance Billing</option>
                <option>Self Pay</option>
              </select>
            </div>
            <div className="flex items-center gap-4">
              <Button variant="link" size="sm" className="text-cyan-600 hover:text-cyan-700">
                <Paperclip className="w-4 h-4 mr-1" />
                add attachments
              </Button>
              <Button variant="link" size="sm" className="text-cyan-600 hover:text-cyan-700">
                cancel order
              </Button>
              <Button variant="link" size="sm" className="text-cyan-600 hover:text-cyan-700">
                exit
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Breadcrumb */}
      <div className="bg-white border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2">
          <div className="text-sm text-muted-foreground">Home / Order a Test</div>
        </div>
      </div>

      {/* Step Navigation Tabs */}
      <div className="bg-white border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-1 overflow-x-auto">
            {steps.map((step) => (
              <button
                key={step.id}
                onClick={() => handleStepClick(step.id)}
                className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
                  currentStep === step.id
                    ? 'text-cyan-600 border-cyan-600'
                    : 'text-muted-foreground border-transparent hover:text-foreground hover:border-border'
                }`}
              >
                {step.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Form Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Patient Step */}
        {currentStep === 'patient' && (
          <div className="space-y-8">
            {/* Clinic Information */}
            <Card className="p-6">
              <h2 className="text-xl font-semibold text-foreground mb-6">Clinic Information</h2>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-[150px_1fr] gap-4 items-center">
                  <Label htmlFor="clinic" className="text-right">
                    Clinic
                  </Label>
                  <select
                    id="clinic"
                    value={formData.clinic}
                    onChange={(e) => handleInputChange('clinic', e.target.value)}
                    className="border border-border rounded px-3 py-2 w-full"
                  >
                    <option value="">Select clinic...</option>
                    {clinics.map((clinic) => (
                      <option key={clinic} value={clinic}>
                        {clinic}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-[150px_1fr] gap-4 items-center">
                  <Label htmlFor="clinician" className="text-right">
                    Clinician
                  </Label>
                  <select
                    id="clinician"
                    value={formData.clinician}
                    onChange={(e) => handleInputChange('clinician', e.target.value)}
                    className="border border-border rounded px-3 py-2 w-full"
                  >
                    <option value="">Select clinician...</option>
                    {clinicians.map((clinician) => (
                      <option key={clinician} value={clinician}>
                        {clinician}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-[150px_1fr] gap-4 items-center">
                  <Label htmlFor="clinicReference" className="text-right">
                    Clinic Reference
                  </Label>
                  <div className="flex items-center gap-2">
                    <Input
                      id="clinicReference"
                      placeholder="(optional)"
                      value={formData.clinicReference}
                      onChange={(e) => handleInputChange('clinicReference', e.target.value)}
                    />
                    <Info className="w-4 h-4 text-cyan-600 flex-shrink-0" />
                  </div>
                </div>
              </div>
            </Card>

            {/* Patient Information */}
            <Card className="p-6">
              <h2 className="text-xl font-semibold text-foreground mb-6">Patient Information</h2>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-[150px_1fr] gap-4 items-start">
                  <Label className="text-right pt-2">Patient Name</Label>
                  <div className="space-y-2">
                    <div className="flex gap-2">
                      <Input
                        placeholder="First Name"
                        value={formData.firstName}
                        onChange={(e) => handleInputChange('firstName', e.target.value)}
                      />
                      <Input
                        placeholder="Last Name"
                        value={formData.lastName}
                        onChange={(e) => handleInputChange('lastName', e.target.value)}
                      />
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Enter the name as it appears on the insurance card.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-[150px_1fr] gap-4 items-center">
                  <Label htmlFor="dob" className="text-right">
                    DOB
                  </Label>
                  <div className="flex items-center gap-2">
                    <Input
                      id="dob"
                      type="text"
                      placeholder="mm/dd/yyyy"
                      value={formData.dob}
                      onChange={(e) => handleInputChange('dob', e.target.value)}
                      className="max-w-xs"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-[150px_1fr] gap-4 items-center">
                  <Label className="text-right">Sex</Label>
                  <div className="flex gap-2">
                    <Button
                      type="button"
                      variant={formData.sex === 'male' ? 'default' : 'outline'}
                      onClick={() => handleInputChange('sex', 'male')}
                      className={formData.sex === 'male' ? 'bg-cyan-600 hover:bg-cyan-700' : ''}
                    >
                      Male
                    </Button>
                    <Button
                      type="button"
                      variant={formData.sex === 'female' ? 'default' : 'outline'}
                      onClick={() => handleInputChange('sex', 'female')}
                      className={formData.sex === 'female' ? 'bg-cyan-600 hover:bg-cyan-700' : ''}
                    >
                      Female
                    </Button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-[150px_1fr] gap-4 items-center">
                  <Label htmlFor="address" className="text-right">
                    Address
                  </Label>
                  <div className="flex items-center gap-2">
                    <Input
                      id="address"
                      placeholder="Example: 123 Main St."
                      value={formData.address}
                      onChange={(e) => handleInputChange('address', e.target.value)}
                    />
                    <Button
                      variant="link"
                      size="sm"
                      className="text-cyan-600 hover:text-cyan-700 flex-shrink-0"
                    >
                      enter manually
                    </Button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-[150px_1fr] gap-4 items-center">
                  <Label htmlFor="aptSte" className="text-right">
                    Apt, Ste, etc.
                  </Label>
                  <Input
                    id="aptSte"
                    placeholder="(optional)"
                    value={formData.aptSte}
                    onChange={(e) => handleInputChange('aptSte', e.target.value)}
                    className="max-w-xs"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-[150px_1fr] gap-4 items-center">
                  <Label htmlFor="phone" className="text-right">
                    Phone
                  </Label>
                  <Input
                    id="phone"
                    placeholder="mobile preferred"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    className="max-w-xs"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-[150px_1fr] gap-4 items-center">
                  <Label htmlFor="email" className="text-right">
                    Email Address
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="(optional)"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-[150px_1fr] gap-4 items-center pt-4">
                  <Label className="text-right">Ship Kit to Patient</Label>
                  <div className="flex items-center gap-2">
                    <Button
                      type="button"
                      variant={formData.shipKitToPatient === 'yes' ? 'default' : 'outline'}
                      onClick={() => handleInputChange('shipKitToPatient', 'yes')}
                      className={
                        formData.shipKitToPatient === 'yes' ? 'bg-cyan-600 hover:bg-cyan-700' : ''
                      }
                    >
                      Yes
                    </Button>
                    <Button
                      type="button"
                      variant={formData.shipKitToPatient === 'no' ? 'default' : 'outline'}
                      onClick={() => handleInputChange('shipKitToPatient', 'no')}
                      className={
                        formData.shipKitToPatient === 'no' ? 'bg-cyan-600 hover:bg-cyan-700' : ''
                      }
                    >
                      No
                    </Button>
                    <Info className="w-4 h-4 text-cyan-600" />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-[150px_1fr] gap-4 items-center">
                  <Label htmlFor="fedexTracking" className="text-right">
                    FedEx® Tracking Number
                  </Label>
                  <div className="flex items-center gap-2">
                    <Input
                      id="fedexTracking"
                      placeholder="(optional)"
                      value={formData.fedexTracking}
                      onChange={(e) => handleInputChange('fedexTracking', e.target.value)}
                    />
                    <Info className="w-4 h-4 text-cyan-600 flex-shrink-0" />
                  </div>
                </div>
              </div>
            </Card>
          </div>
        )}

        {/* Insurance Step */}
        {currentStep === 'insurance' && (
          <div className="space-y-8">
            <Card className="p-6">
              <h2 className="text-xl font-semibold text-foreground mb-6">Insurance Information</h2>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-[180px_1fr] gap-4 items-center">
                  <Label htmlFor="insuranceProvider" className="text-right">
                    Insurance Provider
                  </Label>
                  <select
                    id="insuranceProvider"
                    value={formData.insuranceProvider}
                    onChange={(e) => handleInputChange('insuranceProvider', e.target.value)}
                    className="border border-border rounded px-3 py-2 w-full"
                  >
                    <option value="">Select insurance provider...</option>
                    {insuranceProviders.map((provider) => (
                      <option key={provider} value={provider}>
                        {provider}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-[180px_1fr] gap-4 items-center">
                  <Label htmlFor="policyNumber" className="text-right">
                    Policy Number
                  </Label>
                  <Input
                    id="policyNumber"
                    placeholder="Enter policy number"
                    value={formData.policyNumber}
                    onChange={(e) => handleInputChange('policyNumber', e.target.value)}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-[180px_1fr] gap-4 items-center">
                  <Label htmlFor="groupNumber" className="text-right">
                    Group Number
                  </Label>
                  <Input
                    id="groupNumber"
                    placeholder="Enter group number (if applicable)"
                    value={formData.groupNumber}
                    onChange={(e) => handleInputChange('groupNumber', e.target.value)}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-[180px_1fr] gap-4 items-center">
                  <Label htmlFor="subscriberName" className="text-right">
                    Subscriber Name
                  </Label>
                  <Input
                    id="subscriberName"
                    placeholder="Name of policy holder"
                    value={formData.subscriberName}
                    onChange={(e) => handleInputChange('subscriberName', e.target.value)}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-[180px_1fr] gap-4 items-center">
                  <Label htmlFor="subscriberDob" className="text-right">
                    Subscriber DOB
                  </Label>
                  <Input
                    id="subscriberDob"
                    type="text"
                    placeholder="mm/dd/yyyy"
                    value={formData.subscriberDob}
                    onChange={(e) => handleInputChange('subscriberDob', e.target.value)}
                    className="max-w-xs"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-[180px_1fr] gap-4 items-center">
                  <Label htmlFor="relationshipToPatient" className="text-right">
                    Relationship to Patient
                  </Label>
                  <select
                    id="relationshipToPatient"
                    value={formData.relationshipToPatient}
                    onChange={(e) => handleInputChange('relationshipToPatient', e.target.value)}
                    className="border border-border rounded px-3 py-2 max-w-xs"
                  >
                    <option value="">Select relationship...</option>
                    <option value="self">Self</option>
                    <option value="spouse">Spouse</option>
                    <option value="child">Child</option>
                    <option value="parent">Parent</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>
            </Card>

            <Card className="p-6 bg-blue-50 border-blue-200">
              <div className="flex gap-3">
                <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <div className="text-sm text-blue-900">
                  <p className="font-medium mb-1">Insurance Verification</p>
                  <p>
                    Please ensure all insurance information is accurate. We will verify coverage
                    before processing the order.
                  </p>
                </div>
              </div>
            </Card>
          </div>
        )}

        {/* Test Step */}
        {currentStep === 'test' && (
          <div className="space-y-8">
            <Card className="p-6">
              <h2 className="text-xl font-semibold text-foreground mb-6">Test Selection</h2>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-[180px_1fr] gap-4 items-center">
                  <Label htmlFor="testType" className="text-right">
                    Test Type
                  </Label>
                  <select
                    id="testType"
                    value={formData.testType}
                    onChange={(e) => handleInputChange('testType', e.target.value)}
                    className="border border-border rounded px-3 py-2 w-full"
                  >
                    <option value="">Select test type...</option>
                    {testTypes.map((test) => (
                      <option key={test} value={test}>
                        {test}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-[180px_1fr] gap-4 items-start">
                  <Label className="text-right pt-2">Reason for Test</Label>
                  <div className="space-y-2">
                    {reasonsForTest.map((reason) => (
                      <label key={reason} className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={formData.reasonForTest.includes(reason)}
                          onChange={(e) => {
                            const newReasons = e.target.checked
                              ? [...formData.reasonForTest, reason]
                              : formData.reasonForTest.filter((r) => r !== reason);
                            handleInputChange('reasonForTest', newReasons);
                          }}
                          className="w-4 h-4 text-cyan-600 border-border rounded"
                        />
                        <span className="text-sm">{reason}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-[180px_1fr] gap-4 items-start">
                  <Label className="text-right pt-2">Additional Testing Options</Label>
                  <div className="space-y-2">
                    {additionalTestOptions.map((option) => (
                      <label key={option} className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={formData.additionalTests.includes(option)}
                          onChange={(e) => {
                            const newTests = e.target.checked
                              ? [...formData.additionalTests, option]
                              : formData.additionalTests.filter((t) => t !== option);
                            handleInputChange('additionalTests', newTests);
                          }}
                          className="w-4 h-4 text-cyan-600 border-border rounded"
                        />
                        <span className="text-sm">{option}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <h2 className="text-xl font-semibold text-foreground mb-6">Sample Collection</h2>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-[180px_1fr] gap-4 items-center">
                  <Label className="text-right">Sample Collected?</Label>
                  <div className="flex items-center gap-2">
                    <Button
                      type="button"
                      variant={formData.sampleCollected === 'yes' ? 'default' : 'outline'}
                      onClick={() => handleInputChange('sampleCollected', 'yes')}
                      className={
                        formData.sampleCollected === 'yes' ? 'bg-cyan-600 hover:bg-cyan-700' : ''
                      }
                    >
                      Yes
                    </Button>
                    <Button
                      type="button"
                      variant={formData.sampleCollected === 'no' ? 'default' : 'outline'}
                      onClick={() => handleInputChange('sampleCollected', 'no')}
                      className={
                        formData.sampleCollected === 'no' ? 'bg-cyan-600 hover:bg-cyan-700' : ''
                      }
                    >
                      No
                    </Button>
                  </div>
                </div>

                {formData.sampleCollected === 'yes' && (
                  <>
                    <div className="grid grid-cols-1 md:grid-cols-[180px_1fr] gap-4 items-center">
                      <Label htmlFor="sampleDate" className="text-right">
                        Collection Date
                      </Label>
                      <Input
                        id="sampleDate"
                        type="text"
                        placeholder="mm/dd/yyyy"
                        value={formData.sampleDate}
                        onChange={(e) => handleInputChange('sampleDate', e.target.value)}
                        className="max-w-xs"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-[180px_1fr] gap-4 items-center">
                      <Label htmlFor="barcode" className="text-right">
                        Barcode
                      </Label>
                      <Input
                        id="barcode"
                        placeholder="Enter sample barcode"
                        value={formData.barcode}
                        onChange={(e) => handleInputChange('barcode', e.target.value)}
                      />
                    </div>
                  </>
                )}
              </div>
            </Card>
          </div>
        )}

        {/* Place Order Step */}
        {currentStep === 'place-order' && (
          <div className="space-y-8">
            <Card className="p-6">
              <h2 className="text-xl font-semibold text-foreground mb-6">
                Ordering Physician Information
              </h2>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-[180px_1fr] gap-4 items-center">
                  <Label htmlFor="physicianName" className="text-right">
                    Physician Name
                  </Label>
                  <Input
                    id="physicianName"
                    placeholder="Dr. First Last"
                    value={formData.physicianName}
                    onChange={(e) => handleInputChange('physicianName', e.target.value)}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-[180px_1fr] gap-4 items-center">
                  <Label htmlFor="physicianNpi" className="text-right">
                    NPI Number
                  </Label>
                  <Input
                    id="physicianNpi"
                    placeholder="10-digit NPI"
                    value={formData.physicianNpi}
                    onChange={(e) => handleInputChange('physicianNpi', e.target.value)}
                    className="max-w-xs"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-[180px_1fr] gap-4 items-center">
                  <Label htmlFor="physicianPhone" className="text-right">
                    Phone Number
                  </Label>
                  <Input
                    id="physicianPhone"
                    placeholder="(555) 555-5555"
                    value={formData.physicianPhone}
                    onChange={(e) => handleInputChange('physicianPhone', e.target.value)}
                    className="max-w-xs"
                  />
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <h2 className="text-xl font-semibold text-foreground mb-6">Billing Information</h2>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-[180px_1fr] gap-4 items-center">
                  <Label htmlFor="billingType" className="text-right">
                    Billing Type
                  </Label>
                  <select
                    id="billingType"
                    value={formData.billingType}
                    onChange={(e) => handleInputChange('billingType', e.target.value)}
                    className="border border-border rounded px-3 py-2 max-w-xs"
                  >
                    <option value="">Select billing type...</option>
                    <option value="patient">Patient Pay</option>
                    <option value="insurance">Insurance</option>
                    <option value="institutional">Institutional</option>
                  </select>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-[180px_1fr] gap-4 items-start">
                  <Label htmlFor="specialInstructions" className="text-right pt-2">
                    Special Instructions
                  </Label>
                  <textarea
                    id="specialInstructions"
                    placeholder="Enter any special instructions or notes..."
                    value={formData.specialInstructions}
                    onChange={(e) => handleInputChange('specialInstructions', e.target.value)}
                    className="border border-border rounded px-3 py-2 w-full min-h-[100px]"
                  />
                </div>
              </div>
            </Card>

            <Card className="p-6 bg-amber-50 border-amber-200">
              <div className="flex gap-3">
                <Info className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                <div className="text-sm text-amber-900">
                  <p className="font-medium mb-1">Review Before Submitting</p>
                  <p>
                    Please review all information carefully before placing your order. Click [next]
                    to continue.
                  </p>
                </div>
              </div>
            </Card>
          </div>
        )}

        {/* Complete Step */}
        {currentStep === 'complete' && (
          <div className="space-y-8">
            <Card className="p-8 text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-foreground mb-2">Order Summary</h2>
              <p className="text-muted-foreground mb-6">
                Review your order details before final submission
              </p>
            </Card>

            <Card className="p-6">
              <h3 className="text-lg font-semibold text-foreground mb-4">Patient Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-muted-foreground">Name:</span>
                  <span className="ml-2 font-medium">
                    {formData.firstName} {formData.lastName}
                  </span>
                </div>
                <div>
                  <span className="text-muted-foreground">DOB:</span>
                  <span className="ml-2 font-medium">{formData.dob || 'Not provided'}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Sex:</span>
                  <span className="ml-2 font-medium capitalize">
                    {formData.sex || 'Not provided'}
                  </span>
                </div>
                <div>
                  <span className="text-muted-foreground">Phone:</span>
                  <span className="ml-2 font-medium">{formData.phone || 'Not provided'}</span>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="text-lg font-semibold text-foreground mb-4">Test Information</h3>
              <div className="space-y-2 text-sm">
                <div>
                  <span className="text-muted-foreground">Test Type:</span>
                  <span className="ml-2 font-medium">{formData.testType || 'Not selected'}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Sample Collected:</span>
                  <span className="ml-2 font-medium capitalize">{formData.sampleCollected}</span>
                </div>
                {formData.reasonForTest.length > 0 && (
                  <div>
                    <span className="text-muted-foreground">Reasons:</span>
                    <ul className="ml-6 mt-1 list-disc">
                      {formData.reasonForTest.map((reason) => (
                        <li key={reason}>{reason}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="text-lg font-semibold text-foreground mb-4">Billing Information</h3>
              <div className="space-y-2 text-sm">
                <div>
                  <span className="text-muted-foreground">Insurance Provider:</span>
                  <span className="ml-2 font-medium">
                    {formData.insuranceProvider || 'Not provided'}
                  </span>
                </div>
                <div>
                  <span className="text-muted-foreground">Policy Number:</span>
                  <span className="ml-2 font-medium">
                    {formData.policyNumber || 'Not provided'}
                  </span>
                </div>
                <div>
                  <span className="text-muted-foreground">Billing Type:</span>
                  <span className="ml-2 font-medium">{formData.billingType || 'Not selected'}</span>
                </div>
              </div>
            </Card>

            <Card className="p-6 bg-green-50 border-green-200">
              <div className="flex gap-3">
                <Info className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <div className="text-sm text-green-900">
                  <p className="font-medium mb-1">Ready to Submit</p>
                  <p>
                    Your order is ready to be submitted. Click the Submit button below to complete
                    complete the process.
                  </p>
                </div>
              </div>
            </Card>

            <div className="flex justify-center">
              <Button size="lg" className="bg-green-600 hover:bg-green-700 text-white px-8">
                Submit Order
              </Button>
            </div>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex justify-between items-center pt-8 border-t border-border mt-8">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={currentStep === 'patient'}
            className="min-w-[100px] bg-transparent"
          >
            Previous
          </Button>
          <div className="text-sm text-muted-foreground">
            Step {steps.findIndex((s) => s.id === currentStep) + 1} of {steps.length}
          </div>
          <Button
            onClick={handleNext}
            disabled={currentStep === 'complete'}
            className="bg-cyan-600 hover:bg-cyan-700 min-w-[100px]"
          >
            {currentStep === 'place-order' ? 'Review Order' : 'Next'}
          </Button>
        </div>
      </div>
    </div>
  );
}
