'use client';

import { useState } from 'react';
import DocumentUploader from './components/DocumentUploader';
import ApplicantForm from './components/ApplicantForm';
import VerificationResults from './components/VerificationResults';
import { VerificationResult } from './types';

export default function Home() {
  const [image, setImage] = useState<string | null>(null);
  const [applicantData, setApplicantData] = useState<any>(null);
  const [result, setResult] = useState<VerificationResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleVerify = async () => {
    if (!image) {
      setError('Please upload a document image');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/verify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          image,
          applicantData,
        }),
      });

      if (!response.ok) {
        throw new Error('Verification failed');
      }

      const data = await response.json();
      setResult(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen p-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            🛂 AI Document Verifier
          </h1>
          <p className="text-xl text-gray-600">
            Advanced verification for passports, visas, IDs, and travel documents
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div>
            <DocumentUploader onImageSelect={setImage} />
          </div>
          <div>
            <ApplicantForm onDataChange={setApplicantData} />
          </div>
        </div>

        <div className="text-center mb-8">
          <button
            onClick={handleVerify}
            disabled={loading || !image}
            className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-bold py-4 px-12 rounded-lg text-lg transition-colors shadow-lg disabled:cursor-not-allowed"
          >
            {loading ? 'Verifying Document...' : 'Verify Document'}
          </button>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-lg mb-8">
            {error}
          </div>
        )}

        {result && <VerificationResults result={result} />}
      </div>
    </main>
  );
}
