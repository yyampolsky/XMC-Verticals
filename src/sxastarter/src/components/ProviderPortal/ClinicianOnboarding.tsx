'use client';

import React from 'react';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  UserPlus,
  BookOpen,
  GraduationCap,
  ClipboardList,
  CheckCircle2,
  Circle,
  Check,
  ChevronRight,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

// ============================================
// MOCK DATA - Edit this section as needed
// ============================================
const MOCK_DATA = {
  clinicianName: 'Dr. Jane Smith',
  testName: 'BRCA Genetic Test',
  onboardingSteps: [
    {
      id: 1,
      title: 'Account Creation / Login',
      description: 'Create your clinician account and verify your credentials',
      icon: UserPlus,
      content:
        'Welcome to the Myriad Genetics LMS platform. Your account has been created and verified. You can now access all training materials and test ordering systems.',
      estimatedTime: '5 minutes',
    },
    {
      id: 2,
      title: 'LMS Orientation',
      description: 'Get familiar with the dashboard and navigation',
      icon: BookOpen,
      content:
        'Learn how to navigate the LMS dashboard, access resources, and find important information. This orientation will help you understand the platform layout and key features.',
      estimatedTime: '10 minutes',
    },
    {
      id: 3,
      title: 'Complete Mandatory Training',
      description: 'Complete required training modules for test ordering',
      icon: GraduationCap,
      content:
        'Complete the mandatory training modules covering test protocols, patient consent, sample collection, and result interpretation. All modules must be completed to proceed.',
      estimatedTime: '45 minutes',
    },
    {
      id: 4,
      title: 'Access Test Workflow',
      description: 'Learn the test ordering and result management system',
      icon: ClipboardList,
      content:
        'Explore the test ordering workflow, learn how to submit orders, track samples, and access patient results. Practice with sample orders in the training environment.',
      estimatedTime: '20 minutes',
    },
    {
      id: 5,
      title: 'Onboarding Complete',
      description: 'You are ready to start ordering tests',
      icon: CheckCircle2,
      content:
        'Congratulations! You have completed the onboarding process and are now authorized to order tests and access patient results. Your certification is valid for 12 months.',
      estimatedTime: 'Complete',
    },
  ],
};

export default function ClinicianOnboarding() {
  // ============================================
  // STATE MANAGEMENT
  // ============================================
  const [currentStep, setCurrentStep] = useState(1);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);

  // ============================================
  // HANDLERS
  // ============================================
  const handleCompleteStep = () => {
    if (!completedSteps.includes(currentStep)) {
      setCompletedSteps([...completedSteps, currentStep]);
    }
    if (currentStep < MOCK_DATA.onboardingSteps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleGoToStep = (stepId: number) => {
    // Can only go to completed steps or the next step after last completed
    const maxAccessibleStep = Math.max(...completedSteps, 0) + 1;
    if (stepId <= maxAccessibleStep) {
      setCurrentStep(stepId);
    }
  };

  const isStepCompleted = (stepId: number) => completedSteps.includes(stepId);
  const isStepCurrent = (stepId: number) => currentStep === stepId;
  const isStepAccessible = (stepId: number) => {
    const maxAccessibleStep = Math.max(...completedSteps, 0) + 1;
    return stepId <= maxAccessibleStep;
  };

  const currentStepData = MOCK_DATA.onboardingSteps.find((step) => step.id === currentStep);
  const progressPercentage = (completedSteps.length / MOCK_DATA.onboardingSteps.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div>
                <h1 className="text-3xl font-bold text-slate-900 mb-2">Clinician Onboarding</h1>
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-slate-600">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">Clinician:</span>
                    <span className="text-cyan-600 font-semibold">{MOCK_DATA.clinicianName}</span>
                  </div>
                  <span className="hidden sm:inline text-slate-300">|</span>
                  <div className="flex items-center gap-2">
                    <span className="font-medium">Test:</span>
                    <span className="text-cyan-600 font-semibold">{MOCK_DATA.testName}</span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm text-slate-500 mb-1">Overall Progress</div>
                <div className="text-3xl font-bold text-cyan-600">
                  {Math.round(progressPercentage)}%
                </div>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="mt-6">
              <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-cyan-500 to-blue-500"
                  initial={{ width: 0 }}
                  animate={{ width: `${progressPercentage}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>
            </div>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Timeline Sidebar */}
          <div className="lg:col-span-1">
            <Card className="p-6 bg-white shadow-sm border-slate-200">
              <h2 className="text-lg font-semibold text-slate-900 mb-6">Onboarding Steps</h2>
              <div className="space-y-1">
                {MOCK_DATA.onboardingSteps.map((step, index) => {
                  const Icon = step.icon;
                  const completed = isStepCompleted(step.id);
                  const current = isStepCurrent(step.id);
                  const accessible = isStepAccessible(step.id);

                  return (
                    <div key={step.id}>
                      <button
                        onClick={() => handleGoToStep(step.id)}
                        disabled={!accessible}
                        className={`w-full text-left p-4 rounded-lg transition-all ${
                          current
                            ? 'bg-cyan-50 border-2 border-cyan-500'
                            : completed
                            ? 'bg-green-50 border border-green-200 hover:bg-green-100'
                            : accessible
                            ? 'bg-slate-50 border border-slate-200 hover:bg-slate-100'
                            : 'bg-slate-50 border border-slate-200 opacity-50 cursor-not-allowed'
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <div
                            className={`flex-shrink-0 mt-0.5 ${
                              completed
                                ? 'text-green-600'
                                : current
                                ? 'text-cyan-600'
                                : 'text-slate-400'
                            }`}
                          >
                            {completed ? (
                              <CheckCircle2 className="w-6 h-6" />
                            ) : current ? (
                              <Circle className="w-6 h-6 fill-current" />
                            ) : (
                              <Icon className="w-6 h-6" />
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div
                              className={`font-medium mb-1 ${
                                current
                                  ? 'text-cyan-900'
                                  : completed
                                  ? 'text-green-900'
                                  : 'text-slate-700'
                              }`}
                            >
                              Step {step.id}: {step.title}
                            </div>
                            <div className="text-sm text-slate-500">{step.estimatedTime}</div>
                          </div>
                          {current && (
                            <ChevronRight className="w-5 h-5 text-cyan-600 flex-shrink-0" />
                          )}
                        </div>
                      </button>
                      {index < MOCK_DATA.onboardingSteps.length - 1 && (
                        <div
                          className={`ml-7 h-8 w-0.5 ${
                            completed ? 'bg-green-300' : 'bg-slate-200'
                          }`}
                        />
                      )}
                    </div>
                  );
                })}
              </div>
            </Card>
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-2">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="p-8 bg-white shadow-sm border-slate-200">
                {currentStepData && (
                  <>
                    {/* Step Header */}
                    <div className="flex items-start gap-4 mb-6">
                      <div className="flex-shrink-0">
                        <div
                          className={`w-16 h-16 rounded-full flex items-center justify-center ${
                            isStepCompleted(currentStep)
                              ? 'bg-green-100 text-green-600'
                              : 'bg-cyan-100 text-cyan-600'
                          }`}
                        >
                          {React.createElement(currentStepData.icon, { className: 'w-8 h-8' })}
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="text-sm font-medium text-cyan-600 mb-1">
                          Step {currentStep} of {MOCK_DATA.onboardingSteps.length}
                        </div>
                        <h2 className="text-2xl font-bold text-slate-900 mb-2">
                          {currentStepData.title}
                        </h2>
                        <p className="text-slate-600">{currentStepData.description}</p>
                      </div>
                    </div>

                    {/* Step Content */}
                    <div className="bg-slate-50 rounded-lg p-6 mb-6 border border-slate-200">
                      <p className="text-slate-700 leading-relaxed">{currentStepData.content}</p>

                      {/* Additional Info */}
                      <div className="mt-4 pt-4 border-t border-slate-200">
                        <div className="flex items-center gap-2 text-sm text-slate-600">
                          <span className="font-medium">Estimated Time:</span>
                          <span>{currentStepData.estimatedTime}</span>
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center justify-between gap-4">
                      <Button
                        variant="outline"
                        onClick={() => handleGoToStep(Math.max(1, currentStep - 1))}
                        disabled={currentStep === 1}
                        className="border-slate-300"
                      >
                        Previous Step
                      </Button>

                      {currentStep < MOCK_DATA.onboardingSteps.length ? (
                        <Button
                          onClick={handleCompleteStep}
                          className="bg-cyan-600 hover:bg-cyan-700 text-white"
                        >
                          {isStepCompleted(currentStep) ? 'Next Step' : 'Complete & Continue'}
                          <ChevronRight className="w-4 h-4 ml-2" />
                        </Button>
                      ) : (
                        <Button
                          onClick={handleCompleteStep}
                          disabled={isStepCompleted(currentStep)}
                          className="bg-green-600 hover:bg-green-700 text-white"
                        >
                          {isStepCompleted(currentStep) ? (
                            <>
                              <Check className="w-4 h-4 mr-2" />
                              Onboarding Complete
                            </>
                          ) : (
                            <>
                              Finish Onboarding
                              <Check className="w-4 h-4 ml-2" />
                            </>
                          )}
                        </Button>
                      )}
                    </div>

                    {/* Completion Message */}
                    {isStepCompleted(currentStep) &&
                      currentStep === MOCK_DATA.onboardingSteps.length && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg"
                        >
                          <div className="flex items-center gap-3">
                            <CheckCircle2 className="w-6 h-6 text-green-600 flex-shrink-0" />
                            <div>
                              <div className="font-semibold text-green-900">
                                Congratulations, {MOCK_DATA.clinicianName}!
                              </div>
                              <div className="text-sm text-green-700">
                                You are now certified to order {MOCK_DATA.testName} tests.
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      )}
                  </>
                )}
              </Card>
            </motion.div>

            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-4 mt-6">
              <Card className="p-4 bg-white border-slate-200">
                <div className="text-sm text-slate-600 mb-1">Completed</div>
                <div className="text-2xl font-bold text-green-600">{completedSteps.length}</div>
              </Card>
              <Card className="p-4 bg-white border-slate-200">
                <div className="text-sm text-slate-600 mb-1">Current Step</div>
                <div className="text-2xl font-bold text-cyan-600">{currentStep}</div>
              </Card>
              <Card className="p-4 bg-white border-slate-200">
                <div className="text-sm text-slate-600 mb-1">Remaining</div>
                <div className="text-2xl font-bold text-slate-600">
                  {MOCK_DATA.onboardingSteps.length - completedSteps.length}
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
