'use client';

import { motion } from 'framer-motion';
import { CheckCircle, AlertTriangle, FileText, Download, UserPlus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

// ============================================
// MOCK DATA - Edit this section to customize
// ============================================

const mockPatientData = {
  testName: 'FirstGene™ Multiple Prenatal Screen',
  patientName: 'Sarah Johnson',
  dob: '03/15/1988',
  gestationalAge: '12 weeks 3 days',
  reportDate: '01/15/2025',
  status: 'Results Ready',
  orderingProvider: 'Dr. Emily Chen, MD',
  facilityName: "Women's Health Center",
};

const mockSummary = {
  overallResult: 'No high-risk findings detected',
  description:
    'This comprehensive prenatal screening test evaluates fetal aneuploidy risk, maternal and fetal carrier status for recessive genetic conditions, and RhD compatibility between mother and fetus.',
};

const mockCarrierScreening = [
  {
    condition: 'Cystic Fibrosis',
    result: 'Not Detected',
    interpretation: 'Reduced carrier risk',
    risk: 'low',
  },
  {
    condition: 'Spinal Muscular Atrophy',
    result: 'Not Detected',
    interpretation: 'Reduced carrier risk',
    risk: 'low',
  },
  {
    condition: 'Fragile X Syndrome',
    result: 'Not Detected',
    interpretation: 'Reduced carrier risk',
    risk: 'low',
  },
  {
    condition: 'Sickle Cell Disease',
    result: 'Not Detected',
    interpretation: 'Reduced carrier risk',
    risk: 'low',
  },
];

const mockFetalAneuploidy = [
  {
    chromosome: 'Trisomy 21 (Down Syndrome)',
    result: 'Low Risk',
    interpretation: 'No evidence of aneuploidy',
    risk: 'low',
  },
  {
    chromosome: 'Trisomy 18 (Edwards Syndrome)',
    result: 'Low Risk',
    interpretation: 'No evidence of aneuploidy',
    risk: 'low',
  },
  {
    chromosome: 'Trisomy 13 (Patau Syndrome)',
    result: 'Low Risk',
    interpretation: 'No evidence of aneuploidy',
    risk: 'low',
  },
  {
    chromosome: 'Monosomy X (Turner Syndrome)',
    result: 'Low Risk',
    interpretation: 'No evidence of aneuploidy',
    risk: 'low',
  },
];

const mockFetalRecessive = [
  {
    condition: 'HBB (Hemoglobinopathy)',
    fetalResult: 'Carrier',
    interpretation: 'Fetus is a carrier; not expected to be affected',
    risk: 'carrier',
  },
  {
    condition: 'CFTR (Cystic Fibrosis)',
    fetalResult: 'Not Detected',
    interpretation: 'Reduced risk for condition',
    risk: 'low',
  },
];

const mockRhDCompatibility = {
  motherStatus: 'RhD Negative',
  fetusStatus: 'RhD Negative',
  interpretation: 'No incompatibility risk. RhoGAM prophylaxis not required.',
};

const mockInterpretation = {
  summary:
    'This screening test did not identify increased risk for the tested conditions. The fetus is a carrier for hemoglobinopathy but is not expected to be affected.',
  recommendations: [
    'Continue standard prenatal care',
    'Genetic counseling available if desired',
    'Partner testing recommended for hemoglobinopathy carrier status',
    'Follow-up ultrasound as scheduled',
  ],
  disclaimer:
    'This test is a screening tool and not diagnostic. Residual risk may remain. Clinical correlation and additional testing may be warranted based on family history, ultrasound findings, or other clinical factors.',
};

// ============================================
// COMPONENT
// ============================================

export default function FirstGeneTestResultCard() {
  // Helper function to get risk badge styling
  const getRiskBadge = (risk: string) => {
    switch (risk) {
      case 'low':
        return (
          <Badge className="bg-emerald-100 text-emerald-800 border-emerald-300">
            <CheckCircle className="w-3 h-3 mr-1" />
            Low Risk
          </Badge>
        );
      case 'carrier':
        return (
          <Badge className="bg-amber-100 text-amber-800 border-amber-300">
            <AlertTriangle className="w-3 h-3 mr-1" />
            Carrier
          </Badge>
        );
      case 'high':
        return (
          <Badge className="bg-red-100 text-red-800 border-red-300">
            <AlertTriangle className="w-3 h-3 mr-1" />
            High Risk
          </Badge>
        );
      default:
        return null;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-6xl mx-auto"
    >
      <div className="bg-gradient-to-b from-slate-50 to-white rounded-lg shadow-lg border border-slate-200 overflow-hidden">
        {/* ============================================ */}
        {/* HEADER */}
        {/* ============================================ */}
        <div className="bg-slate-900 text-white p-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h1 className="text-2xl font-bold mb-2">{mockPatientData.testName}</h1>
              <div className="text-sm text-slate-300 space-y-1">
                <p>
                  <span className="font-semibold">Patient:</span> {mockPatientData.patientName}
                </p>
                <p>
                  <span className="font-semibold">DOB:</span> {mockPatientData.dob}
                </p>
                <p>
                  <span className="font-semibold">Gestational Age:</span>{' '}
                  {mockPatientData.gestationalAge}
                </p>
              </div>
            </div>
            <div className="text-right">
              <Badge className="bg-cyan-600 text-white mb-2">{mockPatientData.status}</Badge>
              <div className="text-sm text-slate-300">
                <p>
                  <span className="font-semibold">Report Date:</span> {mockPatientData.reportDate}
                </p>
                <p>
                  <span className="font-semibold">Provider:</span>{' '}
                  {mockPatientData.orderingProvider}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ============================================ */}
        {/* SUMMARY OVERVIEW */}
        {/* ============================================ */}
        <div className="p-6 border-b border-slate-200 bg-emerald-50">
          <div className="flex items-start gap-3">
            <CheckCircle className="w-6 h-6 text-emerald-600 flex-shrink-0 mt-1" />
            <div>
              <h2 className="text-xl font-bold text-slate-900 mb-2">{mockSummary.overallResult}</h2>
              <p className="text-slate-700 leading-relaxed">{mockSummary.description}</p>
            </div>
          </div>
        </div>

        <div className="p-6 space-y-8">
          {/* ============================================ */}
          {/* CARRIER SCREENING (MOTHER) */}
          {/* ============================================ */}
          <section>
            <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
              <FileText className="w-5 h-5 text-cyan-600" />
              Carrier Screening (Mother)
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full border border-slate-200 rounded-lg overflow-hidden">
                <thead className="bg-slate-100">
                  <tr>
                    <th className="text-left p-3 text-sm font-semibold text-slate-700">
                      Condition
                    </th>
                    <th className="text-left p-3 text-sm font-semibold text-slate-700">Result</th>
                    <th className="text-left p-3 text-sm font-semibold text-slate-700">
                      Interpretation
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white">
                  {mockCarrierScreening.map((item, index) => (
                    <tr key={index} className="border-t border-slate-200">
                      <td className="p-3 text-sm text-slate-900">{item.condition}</td>
                      <td className="p-3 text-sm">{getRiskBadge(item.risk)}</td>
                      <td className="p-3 text-sm text-slate-700">{item.interpretation}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* ============================================ */}
          {/* FETAL ANEUPLOIDY */}
          {/* ============================================ */}
          <section>
            <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
              <FileText className="w-5 h-5 text-cyan-600" />
              Fetal Aneuploidy Screening
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full border border-slate-200 rounded-lg overflow-hidden">
                <thead className="bg-slate-100">
                  <tr>
                    <th className="text-left p-3 text-sm font-semibold text-slate-700">
                      Chromosome
                    </th>
                    <th className="text-left p-3 text-sm font-semibold text-slate-700">Result</th>
                    <th className="text-left p-3 text-sm font-semibold text-slate-700">
                      Interpretation
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white">
                  {mockFetalAneuploidy.map((item, index) => (
                    <tr key={index} className="border-t border-slate-200">
                      <td className="p-3 text-sm text-slate-900">{item.chromosome}</td>
                      <td className="p-3 text-sm">{getRiskBadge(item.risk)}</td>
                      <td className="p-3 text-sm text-slate-700">{item.interpretation}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* ============================================ */}
          {/* FETAL RECESSIVE DISEASES */}
          {/* ============================================ */}
          <section>
            <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
              <FileText className="w-5 h-5 text-cyan-600" />
              Fetal Recessive Disease Screening
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full border border-slate-200 rounded-lg overflow-hidden">
                <thead className="bg-slate-100">
                  <tr>
                    <th className="text-left p-3 text-sm font-semibold text-slate-700">
                      Condition
                    </th>
                    <th className="text-left p-3 text-sm font-semibold text-slate-700">
                      Fetal Result
                    </th>
                    <th className="text-left p-3 text-sm font-semibold text-slate-700">
                      Interpretation
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white">
                  {mockFetalRecessive.map((item, index) => (
                    <tr key={index} className="border-t border-slate-200">
                      <td className="p-3 text-sm text-slate-900">{item.condition}</td>
                      <td className="p-3 text-sm">{getRiskBadge(item.risk)}</td>
                      <td className="p-3 text-sm text-slate-700">{item.interpretation}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* ============================================ */}
          {/* RHD COMPATIBILITY */}
          {/* ============================================ */}
          <section>
            <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
              <FileText className="w-5 h-5 text-cyan-600" />
              RhD Compatibility
            </h3>
            <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <p className="text-sm font-semibold text-slate-700 mb-1">Mother</p>
                  <p className="text-base text-slate-900">{mockRhDCompatibility.motherStatus}</p>
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-700 mb-1">Fetus</p>
                  <p className="text-base text-slate-900">{mockRhDCompatibility.fetusStatus}</p>
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-700 mb-1">Interpretation</p>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-600" />
                    <p className="text-sm text-slate-900">{mockRhDCompatibility.interpretation}</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* ============================================ */}
          {/* INTERPRETATION NOTES */}
          {/* ============================================ */}
          <section>
            <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
              <FileText className="w-5 h-5 text-cyan-600" />
              Clinical Interpretation
            </h3>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 space-y-3">
              <p className="text-slate-900 leading-relaxed">{mockInterpretation.summary}</p>
              <div>
                <p className="font-semibold text-slate-900 mb-2">Recommendations:</p>
                <ul className="list-disc list-inside space-y-1 text-slate-700">
                  {mockInterpretation.recommendations.map((rec, index) => (
                    <li key={index} className="text-sm">
                      {rec}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>
        </div>

        {/* ============================================ */}
        {/* FOOTER */}
        {/* ============================================ */}
        <div className="bg-slate-100 p-6 border-t border-slate-200">
          <div className="mb-4">
            <p className="text-xs text-slate-600 leading-relaxed">
              <span className="font-semibold">Disclaimer:</span> {mockInterpretation.disclaimer}
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button className="bg-cyan-600 hover:bg-cyan-700 text-white">
              <Download className="w-4 h-4 mr-2" />
              Download Full Report (PDF)
            </Button>
            <Button
              variant="outline"
              className="border-cyan-600 text-cyan-600 hover:bg-cyan-50 bg-transparent"
            >
              <UserPlus className="w-4 h-4 mr-2" />
              Refer to Genetic Counselor
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
