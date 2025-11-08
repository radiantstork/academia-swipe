'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { useMatchForm } from '@/app/context/MatchFormContext';

const SUBJECT_BRANCHES: Record<string, string[]> = {
  'Computer Science': ['Databases', 'Data Structures', 'Algorithms', 'Operating Systems'],
  'Mathematics': ['Algebra', 'Calculus', 'Probability', 'Statistics'],
  'Physics': ['Mechanics', 'Electromagnetism', 'Quantum Physics'],
};

export default function MatchForm() {
  const router = useRouter();
  const { formData, setFormData } = useMatchForm();

  const [selectedSubject, setSelectedSubject] = useState<string>('');
  const [selectedBranches, setSelectedBranches] = useState<string[]>([]);

  const handleSubjectSelect = (subject: string) => {
    setSelectedSubject(subject);
    setSelectedBranches([]); // reset branches
    setFormData((prev) => ({
      ...prev,
      subjects: prev.subjects.includes(subject) ? prev.subjects : [...prev.subjects, subject],
    }));
  };

  const handleBranchToggle = (branch: string) => {
    setSelectedBranches((prev) =>
      prev.includes(branch) ? prev.filter((b) => b !== branch) : [...prev, branch]
    );
  };

  useEffect(() => {
    if (selectedSubject) {
      setFormData((prev) => ({
        ...prev,
        branches: { ...prev.branches, [selectedSubject]: selectedBranches },
      }));
    }
  }, [selectedBranches, selectedSubject, setFormData]);

  const handleSubmit = () => {
    console.log('Final Form Data:', formData);
    router.push('/match');
  };

  return (
    <Card className="max-w-lg mx-auto mt-10 shadow-md">
      <CardHeader>
        <CardTitle className="text-center">Find Your Perfect Study Match</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Step 1: Role */}
        <div>
          <Label className="block mb-2">I am a...</Label>
          <div className="flex gap-3">
            <Button
              type="button"
              variant={formData.role === 'teacher' ? 'default' : 'outline'}
              onClick={() => setFormData((prev) => ({ ...prev, role: 'teacher' }))}
            >
              Teacher
            </Button>
            <Button
              type="button"
              variant={formData.role === 'student' ? 'default' : 'outline'}
              onClick={() => setFormData((prev) => ({ ...prev, role: 'student' }))}
            >
              Student
            </Button>
          </div>
        </div>

        {/* Step 2: Target */}
        {formData.role && (
          <div>
            <Label className="block mb-2">I want to connect with...</Label>
            <div className="flex gap-3 flex-wrap">
              {formData.role === 'teacher' && (
                <>
                  <Button
                    type="button"
                    variant={formData.target === 'student' ? 'default' : 'outline'}
                    onClick={() => setFormData((prev) => ({ ...prev, target: 'student' }))}
                  >
                    Students
                  </Button>
                  <Button
                    type="button"
                    variant={formData.target === 'teacher' ? 'default' : 'outline'}
                    onClick={() => setFormData((prev) => ({ ...prev, target: 'teacher' }))}
                  >
                    Teachers
                  </Button>
                </>
              )}
              {formData.role === 'student' && (
                <>
                  <Button
                    type="button"
                    variant={formData.target === 'student' ? 'default' : 'outline'}
                    onClick={() => setFormData((prev) => ({ ...prev, target: 'student' }))}
                  >
                    Other Students
                  </Button>
                  <Button
                    type="button"
                    variant={formData.target === 'teacher' ? 'default' : 'outline'}
                    onClick={() => setFormData((prev) => ({ ...prev, target: 'teacher' }))}
                  >
                    Teachers
                  </Button>
                </>
              )}
            </div>
          </div>
        )}

        {/* Step 3: Select Subjects */}
        {formData.target && (
          <div>
            <Label className="block mb-2">Select Subjects</Label>
            <div className="flex flex-wrap gap-2">
              {Object.keys(SUBJECT_BRANCHES).map((subject) => (
                <Button
                  key={subject}
                  type="button"
                  variant={formData.subjects.includes(subject) ? 'default' : 'outline'}
                  onClick={() => handleSubjectSelect(subject)}
                >
                  {subject}
                </Button>
              ))}
            </div>
          </div>
        )}

        {/* Step 4: Select Branches dynamically */}
        {selectedSubject && SUBJECT_BRANCHES[selectedSubject] && (
          <div>
            <Label className="block mb-2">
              Select Branches for {selectedSubject}
            </Label>
            <div className="flex flex-wrap gap-2">
              {SUBJECT_BRANCHES[selectedSubject].map((branch) => (
                <Button
                  key={branch}
                  type="button"
                  variant={selectedBranches.includes(branch) ? 'default' : 'outline'}
                  onClick={() => handleBranchToggle(branch)}
                >
                  {branch}
                </Button>
              ))}
            </div>
          </div>
        )}

        <div className="text-center pt-4">
          <Button onClick={handleSubmit} className="w-full">
            Continue to Matching
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
