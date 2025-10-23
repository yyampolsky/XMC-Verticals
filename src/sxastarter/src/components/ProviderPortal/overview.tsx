'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Calendar,
  FileText,
  CreditCard,
  ChevronRight,
  User,
  CheckCircle2,
  Clock,
  AlertCircle,
} from 'lucide-react';

// ============================================
// OVERVIEW COMPONENT
// Contains: Recent Test Results, Upcoming Appointments, Results Ready, Billing Summary
// ============================================

export default function Overview() {
  // ============================================
  // MOCK DATA - Edit these objects to customize content
  // ============================================

  const recentTestResults = [
    {
      id: 1,
      testName: 'Prequel® Prenatal Screen',
      status: 'completed',
      date: '2024-01-15',
      result: 'Low Risk',
      description: 'Comprehensive prenatal genetic screening',
    },
    {
      id: 2,
      testName: 'MyRisk® Hereditary Cancer Test',
      status: 'in-progress',
      date: '2024-01-20',
      result: 'Pending',
      description: 'Hereditary cancer risk assessment',
    },
  ];

  const upcomingAppointments = [
    {
      id: 1,
      title: 'Genetic Counseling Session',
      date: '2024-02-05',
      time: '10:00 AM',
      provider: 'Dr. Sarah Mitchell',
      type: 'Virtual Visit',
    },
    {
      id: 2,
      title: 'Follow-up Consultation',
      date: '2024-02-12',
      time: '2:30 PM',
      provider: 'Dr. James Chen',
      type: 'In-Person',
    },
  ];

  const resultsReady = [
    {
      id: 1,
      testName: 'Prequel® Prenatal Screen',
      date: '2024-01-15',
      urgent: false,
    },
    {
      id: 2,
      testName: 'Carrier Screening Panel',
      date: '2024-01-10',
      urgent: false,
    },
  ];

  const billingSummary = {
    totalBalance: 245.0,
    lastPayment: {
      amount: 150.0,
      date: '2024-01-05',
    },
    upcomingPayment: {
      amount: 245.0,
      dueDate: '2024-02-01',
    },
  };

  // ============================================
  // STATE
  // ============================================
  const [selectedTest, setSelectedTest] = useState(recentTestResults[0]);

  return (
    <div className="space-y-8">
      {/* ============================================ */}
      {/* HERO SECTION - Recent Test Results Summary */}
      {/* ============================================ */}
      <Card className="border-accent/20 shadow-sm">
        <CardHeader className="bg-accent/5">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-xl">Recent Test Results</CardTitle>
              <CardDescription>Your latest genetic screening summary</CardDescription>
            </div>
            <FileText className="w-8 h-8 text-accent" />
          </div>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="grid md:grid-cols-2 gap-6">
            {/* Test Selection */}
            <div className="space-y-3">
              {recentTestResults.map((test) => (
                <button
                  key={test.id}
                  onClick={() => setSelectedTest(test)}
                  className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                    selectedTest.id === test.id
                      ? 'border-accent bg-accent/5'
                      : 'border-border hover:border-accent/50 bg-card'
                  }`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-semibold text-sm">{test.testName}</h3>
                    {test.status === 'completed' ? (
                      <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0" />
                    ) : (
                      <Clock className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground mb-2">{test.description}</p>
                  <div className="flex items-center gap-2">
                    <Badge
                      variant={test.status === 'completed' ? 'default' : 'secondary'}
                      className={test.status === 'completed' ? 'bg-accent hover:bg-accent' : ''}
                    >
                      {test.result}
                    </Badge>
                    <span className="text-xs text-muted-foreground">
                      {new Date(test.date).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </span>
                  </div>
                </button>
              ))}
            </div>

            {/* Test Details */}
            <div className="bg-muted/50 rounded-lg p-6">
              <h3 className="font-semibold mb-4 text-foreground">Test Details</h3>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Test Name</p>
                  <p className="font-medium">{selectedTest.testName}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Status</p>
                  <Badge
                    variant={selectedTest.status === 'completed' ? 'default' : 'secondary'}
                    className={
                      selectedTest.status === 'completed' ? 'bg-accent hover:bg-accent' : ''
                    }
                  >
                    {selectedTest.status === 'completed' ? 'Completed' : 'In Progress'}
                  </Badge>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Result</p>
                  <p className="font-medium text-lg">{selectedTest.result}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Date</p>
                  <p className="font-medium">
                    {new Date(selectedTest.date).toLocaleDateString('en-US', {
                      month: 'long',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </p>
                </div>
                <Button className="w-full mt-4 bg-accent hover:bg-accent/90">
                  View Full Report
                  <ChevronRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* ============================================ */}
      {/* SUMMARY CARDS SECTION */}
      {/* ============================================ */}
      <div className="grid md:grid-cols-3 gap-6">
        {/* Upcoming Appointments Card */}
        <Card className="shadow-sm hover:shadow-md transition-shadow">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">Upcoming Appointments</CardTitle>
              <Calendar className="w-5 h-5 text-accent" />
            </div>
            <CardDescription>Your scheduled visits</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingAppointments.map((appointment) => (
                <div
                  key={appointment.id}
                  className="p-3 bg-muted/50 rounded-lg border border-border"
                >
                  <h4 className="font-semibold text-sm mb-2">{appointment.title}</h4>
                  <div className="space-y-1 text-xs text-muted-foreground">
                    <p className="flex items-center gap-2">
                      <Calendar className="w-3 h-3" />
                      {new Date(appointment.date).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                      })}{' '}
                      at {appointment.time}
                    </p>
                    <p className="flex items-center gap-2">
                      <User className="w-3 h-3" />
                      {appointment.provider}
                    </p>
                    <Badge variant="outline" className="text-xs mt-2">
                      {appointment.type}
                    </Badge>
                  </div>
                </div>
              ))}
              <Button variant="outline" className="w-full mt-2 bg-transparent">
                View All Appointments
                <ChevronRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Results Ready for Review Card */}
        <Card className="shadow-sm hover:shadow-md transition-shadow">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">Results Ready</CardTitle>
              <FileText className="w-5 h-5 text-accent" />
            </div>
            <CardDescription>New results available</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {resultsReady.map((result) => (
                <div
                  key={result.id}
                  className="p-3 bg-muted/50 rounded-lg border border-border hover:border-accent/50 transition-colors cursor-pointer"
                >
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-semibold text-sm flex-1 text-pretty">{result.testName}</h4>
                    {result.urgent && (
                      <AlertCircle className="w-4 h-4 text-destructive flex-shrink-0 ml-2" />
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Available since{' '}
                    {new Date(result.date).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                    })}
                  </p>
                </div>
              ))}
              <Button className="w-full mt-2 bg-accent hover:bg-accent/90">
                Review Results
                <ChevronRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Billing Summary Card */}
        <Card className="shadow-sm hover:shadow-md transition-shadow">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">Billing Summary</CardTitle>
              <CreditCard className="w-5 h-5 text-accent" />
            </div>
            <CardDescription>Account balance & payments</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {/* Current Balance */}
              <div className="p-4 bg-accent/5 rounded-lg border border-accent/20">
                <p className="text-sm text-muted-foreground mb-1">Current Balance</p>
                <p className="text-2xl font-bold text-foreground">
                  ${billingSummary.totalBalance.toFixed(2)}
                </p>
              </div>

              {/* Last Payment */}
              <div className="p-3 bg-muted/50 rounded-lg">
                <p className="text-xs text-muted-foreground mb-1">Last Payment</p>
                <div className="flex items-center justify-between">
                  <p className="font-semibold">${billingSummary.lastPayment.amount.toFixed(2)}</p>
                  <p className="text-xs text-muted-foreground">
                    {new Date(billingSummary.lastPayment.date).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                    })}
                  </p>
                </div>
              </div>

              {/* Upcoming Payment */}
              <div className="p-3 bg-muted/50 rounded-lg">
                <p className="text-xs text-muted-foreground mb-1">Payment Due</p>
                <div className="flex items-center justify-between">
                  <p className="font-semibold">
                    ${billingSummary.upcomingPayment.amount.toFixed(2)}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Due{' '}
                    {new Date(billingSummary.upcomingPayment.dueDate).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                    })}
                  </p>
                </div>
              </div>

              <Button variant="outline" className="w-full bg-transparent">
                Make Payment
                <ChevronRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
