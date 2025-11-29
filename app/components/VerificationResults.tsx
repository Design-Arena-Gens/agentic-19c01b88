'use client';

import { VerificationResult } from '../types';

interface VerificationResultsProps {
  result: VerificationResult;
}

export default function VerificationResults({ result }: VerificationResultsProps) {
  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 80) return 'text-green-600 bg-green-50 border-green-200';
    if (confidence >= 60) return 'text-yellow-600 bg-yellow-50 border-yellow-200';
    return 'text-red-600 bg-red-50 border-red-200';
  };

  const getStatusColor = (status: string) => {
    if (status === 'pass') return 'bg-green-100 text-green-800';
    if (status === 'warning') return 'bg-yellow-100 text-yellow-800';
    return 'bg-red-100 text-red-800';
  };

  const getStatusIcon = (status: string) => {
    if (status === 'pass') return '✓';
    if (status === 'warning') return '⚠';
    return '✗';
  };

  return (
    <div className="space-y-6">
      {/* Summary Card */}
      <div className={`rounded-xl shadow-lg p-8 border-2 ${getConfidenceColor(result.overallConfidence)}`}>
        <div className="flex items-start justify-between mb-4">
          <h2 className="text-3xl font-bold">Verification Complete</h2>
          <div className="text-right">
            <div className="text-sm font-semibold opacity-80">Overall Confidence</div>
            <div className="text-4xl font-bold">{result.overallConfidence}%</div>
          </div>
        </div>
        <p className="text-lg leading-relaxed">{result.summary}</p>
      </div>

      {/* Extracted Data */}
      <div className="bg-white rounded-xl shadow-lg p-8">
        <h3 className="text-2xl font-bold text-gray-800 mb-6">📋 Extracted Data</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Object.entries(result.extractedData).map(([key, value]) => {
            if (typeof value === 'object' && value !== null && 'value' in value) {
              return (
                <div key={key} className="border border-gray-200 rounded-lg p-4">
                  <div className="text-sm font-semibold text-gray-600 mb-1">
                    {key.replace(/([A-Z])/g, ' $1').trim()}
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="text-lg font-medium text-gray-900">{value.value || 'N/A'}</div>
                    <div className={`text-sm font-bold ${
                      value.confidence >= 80 ? 'text-green-600' :
                      value.confidence >= 60 ? 'text-yellow-600' : 'text-red-600'
                    }`}>
                      {value.confidence}%
                    </div>
                  </div>
                </div>
              );
            }
            if (key.startsWith('mrz') && value) {
              return (
                <div key={key} className="col-span-full border border-gray-200 rounded-lg p-4 bg-gray-50">
                  <div className="text-sm font-semibold text-gray-600 mb-1">
                    {key.toUpperCase()}
                  </div>
                  <div className="font-mono text-sm text-gray-800">{value}</div>
                </div>
              );
            }
            return null;
          })}
        </div>
      </div>

      {/* Validation Checks */}
      <div className="bg-white rounded-xl shadow-lg p-8">
        <h3 className="text-2xl font-bold text-gray-800 mb-6">✓ Validation Checks</h3>
        <div className="space-y-3">
          {result.validationChecks.map((check, index) => (
            <div
              key={index}
              className={`flex items-start gap-3 p-4 rounded-lg border ${getStatusColor(check.status)}`}
            >
              <div className="text-xl font-bold">{getStatusIcon(check.status)}</div>
              <div className="flex-1">
                <div className="font-semibold">{check.field}</div>
                <div className="text-sm mt-1">{check.message}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Eligibility Assessment */}
      <div className={`rounded-xl shadow-lg p-8 border-2 ${
        result.eligibilityAssessment.eligible
          ? 'bg-green-50 border-green-200'
          : 'bg-red-50 border-red-200'
      }`}>
        <div className="flex items-center gap-3 mb-6">
          <div className="text-4xl">{result.eligibilityAssessment.eligible ? '✓' : '✗'}</div>
          <div>
            <h3 className="text-2xl font-bold text-gray-800">
              {result.eligibilityAssessment.eligible ? 'Eligible for Visa' : 'Not Eligible'}
            </h3>
            <div className="text-sm font-semibold text-gray-600">
              Confidence: {result.eligibilityAssessment.confidence}%
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <h4 className="font-bold text-gray-800 mb-2">Reasons:</h4>
            <ul className="list-disc list-inside space-y-1">
              {result.eligibilityAssessment.reasons.map((reason, index) => (
                <li key={index} className="text-gray-700">{reason}</li>
              ))}
            </ul>
          </div>

          {result.eligibilityAssessment.recommendedVisaType && (
            <div>
              <h4 className="font-bold text-gray-800 mb-2">Recommended Visa Type:</h4>
              <p className="text-gray-700">{result.eligibilityAssessment.recommendedVisaType}</p>
            </div>
          )}

          {result.eligibilityAssessment.requiredDocuments && (
            <div>
              <h4 className="font-bold text-gray-800 mb-2">Required Documents:</h4>
              <ul className="list-disc list-inside space-y-1">
                {result.eligibilityAssessment.requiredDocuments.map((doc, index) => (
                  <li key={index} className="text-gray-700">{doc}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* Next Actions */}
      <div className="bg-white rounded-xl shadow-lg p-8">
        <h3 className="text-2xl font-bold text-gray-800 mb-6">→ Next Actions</h3>
        <div className="space-y-3">
          {result.nextActions.map((action, index) => (
            <div key={index} className="flex items-start gap-3 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <div className="text-blue-600 font-bold">{index + 1}.</div>
              <div className="text-gray-800">{action}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Raw JSON */}
      <details className="bg-gray-900 rounded-xl shadow-lg p-6">
        <summary className="text-white font-bold cursor-pointer text-lg mb-4">
          View Raw JSON Response
        </summary>
        <pre className="text-green-400 text-xs overflow-auto p-4 bg-black rounded">
          {JSON.stringify(result, null, 2)}
        </pre>
      </details>
    </div>
  );
}
