export interface ExtractedField {
  value: string;
  confidence: number;
}

export interface ExtractedData {
  documentType: ExtractedField;
  documentNumber: ExtractedField;
  surname: ExtractedField;
  givenNames: ExtractedField;
  nationality: ExtractedField;
  dateOfBirth: ExtractedField;
  sex: ExtractedField;
  placeOfBirth?: ExtractedField;
  issuingCountry: ExtractedField;
  issueDate: ExtractedField;
  expiryDate: ExtractedField;
  mrzLine1?: string;
  mrzLine2?: string;
  mrzLine3?: string;
}

export interface ValidationCheck {
  field: string;
  status: 'pass' | 'fail' | 'warning';
  message: string;
}

export interface EligibilityAssessment {
  eligible: boolean;
  confidence: number;
  reasons: string[];
  recommendedVisaType?: string;
  requiredDocuments?: string[];
}

export interface VerificationResult {
  overallConfidence: number;
  extractedData: ExtractedData;
  validationChecks: ValidationCheck[];
  eligibilityAssessment: EligibilityAssessment;
  summary: string;
  nextActions: string[];
}

export interface ApplicantFormData {
  fullName: string;
  dateOfBirth: string;
  passportNumber: string;
  nationality: string;
  intendedVisaType: string;
  purposeOfVisit: string;
}
